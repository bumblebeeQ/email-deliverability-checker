import dns from 'dns';
import { promisify } from 'util';
import type { SPFResult, DKIMResult, DMARCResult, MXResult, BlacklistResult, DomainCheckResult } from '@/types';

const resolveTxt = promisify(dns.resolveTxt);
const resolveMx = promisify(dns.resolveMx);
const resolve4 = promisify(dns.resolve4);

// ==================== SPF Check ====================

export async function checkSPF(domain: string): Promise<SPFResult> {
  const result: SPFResult = {
    score: 0,
    maxScore: 25,
    status: 'fail',
    issues: [],
    suggestions: [],
  };

  try {
    const records = await resolveTxt(domain);
    const spfRecords = records.flat().filter(r => r.startsWith('v=spf1'));

    if (spfRecords.length === 0) {
      result.issues.push('No SPF record found');
      result.suggestions.push('Add an SPF record, e.g.: v=spf1 include:_spf.google.com ~all');
      return result;
    }

    if (spfRecords.length > 1) {
      result.issues.push('Multiple SPF records found, should only have one');
      result.suggestions.push('Merge multiple SPF records into one');
    }

    const spfRecord = spfRecords[0];
    result.record = spfRecord;

    // Check all mechanism
    if (spfRecord.includes('-all')) {
      result.score = 25;
      result.status = 'pass';
      result.mechanism = '-all (hard fail)';
    } else if (spfRecord.includes('~all')) {
      result.score = 20;
      result.status = 'warning';
      result.mechanism = '~all (soft fail)';
      result.issues.push('SPF uses soft fail (~all), recommend hard fail (-all)');
      result.suggestions.push('Change ~all to -all for better security');
    } else if (spfRecord.includes('+all')) {
      result.score = 5;
      result.status = 'fail';
      result.mechanism = '+all (pass all)';
      result.issues.push('SPF set to +all, allows any server to send emails - very insecure');
      result.suggestions.push('Immediately change +all to -all');
    } else if (spfRecord.includes('?all')) {
      result.score = 10;
      result.status = 'warning';
      result.mechanism = '?all (neutral)';
      result.issues.push('SPF set to neutral (?all), provides no protection');
      result.suggestions.push('Change ?all to -all');
    }

    // Extract includes
    const includes = spfRecord.match(/include:([^\s]+)/g);
    if (includes) {
      result.includes = includes.map(i => i.replace('include:', ''));
    }

    // Check DNS lookup count (simplified)
    const lookupCount = (spfRecord.match(/include:|a:|mx:|ptr:|exists:/g) || []).length;
    result.lookupCount = lookupCount;
    if (lookupCount > 10) {
      result.issues.push(`Too many SPF lookups (${lookupCount}/10), may cause validation failure`);
      result.suggestions.push('Reduce include count or use ip4/ip6 directly');
      result.score = Math.max(result.score - 5, 0);
    }

  } catch (error: any) {
    if (error.code === 'ENODATA' || error.code === 'ENOTFOUND') {
      result.issues.push('No SPF record found');
      result.suggestions.push('Add an SPF record to prevent email spoofing');
    } else {
      result.issues.push(`Query failed: ${error.message}`);
    }
  }

  return result;
}

// ==================== DKIM Check ====================

const COMMON_DKIM_SELECTORS = [
  'google', 'default', 'selector1', 'selector2', 'k1', 'k2',
  'mail', 'email', 'dkim', 's1', 's2', 'mx', 'cm', 'pm'
];

export async function checkDKIM(domain: string): Promise<DKIMResult> {
  const result: DKIMResult = {
    score: 0,
    maxScore: 25,
    status: 'fail',
    selectors: [],
    issues: [],
    suggestions: [],
  };

  const foundSelectors: string[] = [];

  for (const selector of COMMON_DKIM_SELECTORS) {
    try {
      const records = await resolveTxt(`${selector}._domainkey.${domain}`);
      const dkimRecord = records.flat().join('');
      
      if (dkimRecord.includes('v=DKIM1') || dkimRecord.includes('k=rsa')) {
        foundSelectors.push(selector);
        
        // Check key length
        const pMatch = dkimRecord.match(/p=([A-Za-z0-9+/=]+)/);
        if (pMatch) {
          const keyLength = Math.floor(pMatch[1].length * 6 / 8) * 8;
          result.keyLength = keyLength;
          
          if (keyLength >= 2048) {
            result.score = 25;
            result.status = 'pass';
          } else if (keyLength >= 1024) {
            result.score = 20;
            result.status = 'warning';
            result.issues.push(`DKIM key length is ${keyLength} bits, recommend upgrading to 2048 bits`);
            result.suggestions.push('Contact your email provider to upgrade DKIM key to 2048 bits');
          } else {
            result.score = 10;
            result.status = 'warning';
            result.issues.push(`DKIM key length only ${keyLength} bits, security is low`);
            result.suggestions.push('Immediately upgrade DKIM key to 2048 bits');
          }
        }
      }
    } catch (error) {
      // Selector doesn't exist, continue checking next
    }
  }

  result.selectors = foundSelectors;

  if (foundSelectors.length === 0) {
    result.issues.push('No DKIM record found (checked common selectors)');
    result.suggestions.push('Configure DKIM, or provide the correct DKIM selector');
  }

  return result;
}

// ==================== DMARC Check ====================

export async function checkDMARC(domain: string): Promise<DMARCResult> {
  const result: DMARCResult = {
    score: 0,
    maxScore: 25,
    status: 'fail',
    issues: [],
    suggestions: [],
  };

  try {
    const records = await resolveTxt(`_dmarc.${domain}`);
    const dmarcRecord = records.flat().find(r => r.startsWith('v=DMARC1'));

    if (!dmarcRecord) {
      result.issues.push('No DMARC record found');
      result.suggestions.push('Add a DMARC record, e.g.: v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com');
      return result;
    }

    result.record = dmarcRecord;

    // Parse policy
    const policyMatch = dmarcRecord.match(/p=(none|quarantine|reject)/i);
    if (policyMatch) {
      result.policy = policyMatch[1].toLowerCase() as 'none' | 'quarantine' | 'reject';
    }

    // Parse report email
    const ruaMatch = dmarcRecord.match(/rua=mailto:([^\s;]+)/i);
    if (ruaMatch) {
      result.rua = ruaMatch[1];
    }

    const rufMatch = dmarcRecord.match(/ruf=mailto:([^\s;]+)/i);
    if (rufMatch) {
      result.ruf = rufMatch[1];
    }

    // Parse pct
    const pctMatch = dmarcRecord.match(/pct=(\d+)/i);
    if (pctMatch) {
      result.pct = parseInt(pctMatch[1]);
    }

    // Scoring logic
    if (result.policy === 'reject' && result.rua) {
      result.score = 25;
      result.status = 'pass';
    } else if (result.policy === 'quarantine' && result.rua) {
      result.score = 20;
      result.status = 'warning';
      result.issues.push('DMARC policy is quarantine, recommend upgrading to reject');
      result.suggestions.push('After confirming emails work normally, change p=quarantine to p=reject');
    } else if (result.policy === 'none' && result.rua) {
      result.score = 15;
      result.status = 'warning';
      result.issues.push('DMARC policy is none, only monitoring without blocking');
      result.suggestions.push('After monitoring period, gradually upgrade to p=quarantine then p=reject');
    } else if (result.policy && !result.rua) {
      result.score = 10;
      result.status = 'warning';
      result.issues.push('DMARC has no report email configured (rua)');
      result.suggestions.push('Add rua=mailto:dmarc@yourdomain.com to receive aggregate reports');
    }

    if (result.pct && result.pct < 100) {
      result.issues.push(`DMARC only applies to ${result.pct}% of emails`);
      result.suggestions.push('Recommend setting pct to 100 for full protection');
    }

  } catch (error: any) {
    if (error.code === 'ENODATA' || error.code === 'ENOTFOUND') {
      result.issues.push('No DMARC record found');
      result.suggestions.push('Add a DMARC record to monitor and protect your domain');
    } else {
      result.issues.push(`Query failed: ${error.message}`);
    }
  }

  return result;
}

// ==================== MX Check ====================

export async function checkMX(domain: string): Promise<MXResult> {
  const result: MXResult = {
    score: 0,
    maxScore: 15,
    status: 'fail',
    records: [],
    issues: [],
    suggestions: [],
  };

  try {
    const mxRecords = await resolveMx(domain);
    
    if (mxRecords.length === 0) {
      result.issues.push('No MX record found');
      result.suggestions.push('Add MX records to receive emails');
      return result;
    }

    // Sort and format
    const sorted = mxRecords.sort((a, b) => a.priority - b.priority);
    
    for (const mx of sorted) {
      const record: { priority: number; host: string; ip?: string } = {
        priority: mx.priority,
        host: mx.exchange,
      };

      // Try to resolve IP
      try {
        const ips = await resolve4(mx.exchange);
        record.ip = ips[0];
      } catch (e) {
        // Ignore IP resolution failure
      }

      result.records.push(record);
    }

    result.score = 15;
    result.status = 'pass';

    // Check for redundancy
    if (mxRecords.length === 1) {
      result.issues.push('Only one MX record, recommend adding backup');
      result.suggestions.push('Add backup MX servers for better reliability');
      result.status = 'warning';
    }

  } catch (error: any) {
    if (error.code === 'ENODATA' || error.code === 'ENOTFOUND') {
      result.issues.push('No MX record found');
      result.suggestions.push('Add MX records');
    } else {
      result.issues.push(`Query failed: ${error.message}`);
    }
  }

  return result;
}

// ==================== Blacklist Check ====================

const BLACKLISTS = [
  'zen.spamhaus.org',
  'bl.spamcop.net',
  'b.barracudacentral.org',
  'dnsbl.sorbs.net',
  'spam.dnsbl.sorbs.net',
  'dul.dnsbl.sorbs.net',
  'cbl.abuseat.org',
  'dnsbl-1.uceprotect.net',
  'psbl.surriel.com',
  'db.wpbl.info',
];

export async function checkBlacklist(domain: string): Promise<BlacklistResult> {
  const result: BlacklistResult = {
    score: 10,
    maxScore: 10,
    status: 'pass',
    listed: [],
    checked: BLACKLISTS.length,
    issues: [],
    suggestions: [],
  };

  try {
    // Get domain IP
    const ips = await resolve4(domain);
    if (ips.length === 0) {
      result.issues.push('Cannot resolve domain IP');
      return result;
    }

    const ip = ips[0];
    result.ip = ip;

    // Reverse IP
    const reversedIp = ip.split('.').reverse().join('.');

    // Parallel blacklist check
    const checks = BLACKLISTS.map(async (bl) => {
      try {
        await resolve4(`${reversedIp}.${bl}`);
        return bl; // If resolvable, it's on the blacklist
      } catch (e) {
        return null; // Not on blacklist
      }
    });

    const results = await Promise.all(checks);
    result.listed = results.filter((r): r is string => r !== null);

    if (result.listed.length > 0) {
      result.status = 'fail';
      result.score = result.listed.length <= 2 ? 5 : 0;
      result.issues.push(`IP ${ip} is listed on ${result.listed.length} blacklist(s)`);
      result.suggestions.push('Contact blacklist operators to request removal');
      result.suggestions.push('Check if server has been compromised or abused');
    }

  } catch (error: any) {
    result.issues.push(`Check failed: ${error.message}`);
  }

  return result;
}

// ==================== Combined Check ====================

function calculateGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 40) return 'D';
  return 'F';
}

export async function checkDomain(domain: string): Promise<DomainCheckResult> {
  // Run all checks in parallel
  const [spf, dkim, dmarc, mx, blacklist] = await Promise.all([
    checkSPF(domain),
    checkDKIM(domain),
    checkDMARC(domain),
    checkMX(domain),
    checkBlacklist(domain),
  ]);

  const totalScore = spf.score + dkim.score + dmarc.score + mx.score + blacklist.score;
  const maxScore = spf.maxScore + dkim.maxScore + dmarc.maxScore + mx.maxScore + blacklist.maxScore;
  const score = Math.round((totalScore / maxScore) * 100);

  const checks = { spf, dkim, dmarc, mx, blacklist };
  
  // Count stats
  let issues = 0;
  let warnings = 0;
  let passed = 0;

  Object.values(checks).forEach(check => {
    if (check.status === 'fail') issues++;
    else if (check.status === 'warning') warnings++;
    else passed++;
  });

  return {
    domain,
    score,
    grade: calculateGrade(score),
    checks,
    summary: { issues, warnings, passed },
    checkedAt: new Date().toISOString(),
  };
}
