// DNS Provider Fix Guides - Step-by-step guides for major DNS providers

export type DNSProvider = 'cloudflare' | 'godaddy' | 'aliyun' | 'dnspod' | 'route53';
export type RecordType = 'spf' | 'dkim' | 'dmarc';

export interface FixStep {
  step: number;
  title: string;
  description: string;
  tip?: string;
  image?: string;
}

export interface FixGuide {
  provider: DNSProvider;
  providerName: string;
  recordType: RecordType;
  recordTypeName: string;
  prerequisites?: string[];
  steps: FixStep[];
  exampleValue: string;
  verifyCommand?: string;
  commonMistakes?: string[];
}

// DNS Provider Info
export const DNS_PROVIDERS: Record<DNSProvider, { name: string; logo?: string; url: string }> = {
  cloudflare: {
    name: 'Cloudflare',
    url: 'https://dash.cloudflare.com',
  },
  godaddy: {
    name: 'GoDaddy',
    url: 'https://dcc.godaddy.com',
  },
  aliyun: {
    name: 'Alibaba Cloud DNS',
    url: 'https://dns.console.aliyun.com',
  },
  dnspod: {
    name: 'Tencent Cloud DNSPod',
    url: 'https://console.dnspod.cn',
  },
  route53: {
    name: 'AWS Route 53',
    url: 'https://console.aws.amazon.com/route53',
  },
};

// ==================== SPF Guides ====================

const SPF_GUIDES: Record<DNSProvider, Omit<FixGuide, 'provider' | 'recordType' | 'recordTypeName'>> = {
  cloudflare: {
    providerName: 'Cloudflare',
    prerequisites: [
      'Logged into Cloudflare dashboard',
      'Domain added to Cloudflare',
    ],
    steps: [
      {
        step: 1,
        title: 'Go to DNS Management',
        description: 'Log in to Cloudflare → Select your domain → Click "DNS" in the left menu → "Records"',
      },
      {
        step: 2,
        title: 'Add TXT Record',
        description: 'Click the "Add record" button',
      },
      {
        step: 3,
        title: 'Configure SPF Record',
        description: 'Select Type "TXT", Name "@" (represents root domain), Content is your SPF value',
        tip: 'If an SPF record already exists, edit it instead of creating a new one. Only one SPF record per domain is allowed.',
      },
      {
        step: 4,
        title: 'Save and Verify',
        description: 'Click "Save". DNS propagation may take a few minutes to hours.',
        tip: 'Use "dig TXT yourdomain.com" command to verify it\'s working',
      },
    ],
    exampleValue: 'v=spf1 include:_spf.google.com include:spf.protection.outlook.com -all',
    verifyCommand: 'dig TXT yourdomain.com +short',
    commonMistakes: [
      'Creating multiple SPF records (should only have one)',
      'Using ~all instead of -all (recommend using -all for stricter policy)',
      'Forgetting to add include for all email sending services',
    ],
  },
  godaddy: {
    providerName: 'GoDaddy',
    prerequisites: [
      'Logged into GoDaddy account',
      'Domain managed at GoDaddy',
    ],
    steps: [
      {
        step: 1,
        title: 'Go to Domain Management',
        description: 'Log in to GoDaddy → Click your username (top right) → "My Products" → Find your domain → Click "DNS"',
      },
      {
        step: 2,
        title: 'Find DNS Records Section',
        description: 'Scroll down to "DNS Records" section',
      },
      {
        step: 3,
        title: 'Add TXT Record',
        description: 'Click "Add" → Type: "TXT" → Name: "@" → Value: SPF value → TTL: 1 Hour',
      },
      {
        step: 4,
        title: 'Save',
        description: 'Click "Save" to save the record',
      },
    ],
    exampleValue: 'v=spf1 include:_spf.google.com -all',
    verifyCommand: 'nslookup -type=txt yourdomain.com',
    commonMistakes: [
      'Entering full domain name in Name field instead of @',
      'Adding quotes around the Value',
    ],
  },
  aliyun: {
    providerName: 'Alibaba Cloud DNS',
    prerequisites: [
      'Logged into Alibaba Cloud console',
      'Domain DNS hosted at Alibaba Cloud',
    ],
    steps: [
      {
        step: 1,
        title: 'Go to DNS Console',
        description: 'Log in to Alibaba Cloud console → Search for "DNS" → Click to enter',
      },
      {
        step: 2,
        title: 'Select Domain',
        description: 'Find your domain in the list → Click "DNS Settings"',
      },
      {
        step: 3,
        title: 'Add Record',
        description: 'Click "Add Record" → Record Type: "TXT" → Host: "@" → Value: SPF content',
        tip: 'TTL can keep default value of 10 minutes',
      },
      {
        step: 4,
        title: 'Confirm',
        description: 'Click "Confirm" to save',
      },
    ],
    exampleValue: 'v=spf1 include:spf.mxhichina.com -all',
    verifyCommand: 'dig TXT yourdomain.com @dns9.hichina.com',
    commonMistakes: [
      'Including quotes in the value',
      'Entering full domain name in host field',
    ],
  },
  dnspod: {
    providerName: 'Tencent Cloud DNSPod',
    prerequisites: [
      'Logged into Tencent Cloud/DNSPod console',
      'Domain added to DNSPod',
    ],
    steps: [
      {
        step: 1,
        title: 'Go to DNS Console',
        description: 'Log in to Tencent Cloud console → Search for "DNS" → Click to enter',
      },
      {
        step: 2,
        title: 'Select Domain',
        description: 'In "My Domains" list, find target domain → Click domain to enter records page',
      },
      {
        step: 3,
        title: 'Add Record',
        description: 'Click "Add Record" → Host: "@" → Record Type: "TXT" → Value: SPF content',
      },
      {
        step: 4,
        title: 'Save',
        description: 'Click "Confirm" to save',
        tip: 'Tencent enterprise email users need include:spf.mail.qq.com',
      },
    ],
    exampleValue: 'v=spf1 include:spf.mail.qq.com -all',
    verifyCommand: 'dig TXT yourdomain.com @f1g1ns1.dnspod.net',
    commonMistakes: [
      'Wrong line type selection (should select "Default")',
      'Multiple SPF records conflict',
    ],
  },
  route53: {
    providerName: 'AWS Route 53',
    prerequisites: [
      'Logged into AWS console',
      'Domain hosted in Route 53',
    ],
    steps: [
      {
        step: 1,
        title: 'Go to Route 53',
        description: 'Log in to AWS console → Search for "Route 53" → Click to enter',
      },
      {
        step: 2,
        title: 'Select Hosted Zone',
        description: 'Click "Hosted zones" → Select your domain',
      },
      {
        step: 3,
        title: 'Create Record',
        description: 'Click "Create record" → Record name: leave empty (root domain) → Record type: "TXT" → Value: SPF value (must be wrapped in double quotes)',
        tip: 'Route 53 TXT record values must be wrapped in double quotes',
      },
      {
        step: 4,
        title: 'Create',
        description: 'Click "Create records" to create',
      },
    ],
    exampleValue: '"v=spf1 include:amazonses.com -all"',
    verifyCommand: 'dig TXT yourdomain.com @ns-xxx.awsdns-xx.com',
    commonMistakes: [
      'TXT value not wrapped in double quotes',
      'Entering domain name in Record name instead of leaving empty',
    ],
  },
};

// ==================== DKIM Guides ====================

const DKIM_GUIDES: Record<DNSProvider, Omit<FixGuide, 'provider' | 'recordType' | 'recordTypeName'>> = {
  cloudflare: {
    providerName: 'Cloudflare',
    prerequisites: [
      'Obtained DKIM selector and public key from your email provider',
      'Logged into Cloudflare dashboard',
    ],
    steps: [
      {
        step: 1,
        title: 'Get DKIM Information',
        description: 'Get the DKIM selector and public key from your email provider (Google Workspace, Microsoft 365, etc.)',
        tip: 'Google\'s selector is usually "google", Microsoft\'s are "selector1" and "selector2"',
      },
      {
        step: 2,
        title: 'Go to DNS Management',
        description: 'Log in to Cloudflare → Select domain → DNS → Records',
      },
      {
        step: 3,
        title: 'Add DKIM Record',
        description: 'Click "Add record" → Type: "TXT" or "CNAME" (depends on provider) → Name: "selector._domainkey" (replace selector with actual value) → Content: public key value',
        tip: 'Cloudflare handles long public keys automatically',
      },
      {
        step: 4,
        title: 'Save and Verify',
        description: 'After saving, wait for DNS propagation, then verify DKIM in your email provider\'s admin console',
      },
    ],
    exampleValue: 'v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBA...',
    verifyCommand: 'dig TXT selector._domainkey.yourdomain.com +short',
    commonMistakes: [
      'Wrong Name format - should be selector._domainkey, not full domain',
      'Public key copied with line breaks',
      'Wrong record type (CNAME vs TXT)',
    ],
  },
  godaddy: {
    providerName: 'GoDaddy',
    prerequisites: [
      'Obtained DKIM configuration from email provider',
    ],
    steps: [
      {
        step: 1,
        title: 'Get DKIM Configuration',
        description: 'Log in to email provider admin, find DKIM settings page, copy selector name and public key',
      },
      {
        step: 2,
        title: 'Go to GoDaddy DNS',
        description: 'GoDaddy → My Products → Domain → DNS',
      },
      {
        step: 3,
        title: 'Add Record',
        description: 'Add → Type: TXT → Name: selector._domainkey → Value: DKIM public key → TTL: 1 Hour',
        tip: 'GoDaddy automatically appends domain name to Name',
      },
      {
        step: 4,
        title: 'Save',
        description: 'Click Save to save',
      },
    ],
    exampleValue: 'v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3...',
    verifyCommand: 'nslookup -type=txt selector._domainkey.yourdomain.com',
    commonMistakes: [
      'Name field filled with selector._domainkey.yourdomain.com (should only be selector._domainkey)',
    ],
  },
  aliyun: {
    providerName: 'Alibaba Cloud DNS',
    prerequisites: [
      'Obtained DKIM configuration from email provider',
    ],
    steps: [
      {
        step: 1,
        title: 'Get DKIM Information',
        description: 'Get DKIM selector and public key from email provider (Alibaba enterprise email: admin console)',
      },
      {
        step: 2,
        title: 'Go to DNS Settings',
        description: 'Alibaba Cloud console → DNS → Select domain → DNS Settings',
      },
      {
        step: 3,
        title: 'Add Record',
        description: 'Add Record → Type: TXT → Host: selector._domainkey → Value: public key content',
        tip: 'Alibaba enterprise email selector is usually "default"',
      },
      {
        step: 4,
        title: 'Confirm',
        description: 'Click Confirm to save',
      },
    ],
    exampleValue: 'v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4...',
    verifyCommand: 'dig TXT selector._domainkey.yourdomain.com',
    commonMistakes: [
      'Wrong host record format',
      'Incomplete public key copied',
    ],
  },
  dnspod: {
    providerName: 'Tencent Cloud DNSPod',
    prerequisites: [
      'Obtained DKIM configuration',
    ],
    steps: [
      {
        step: 1,
        title: 'Get DKIM',
        description: 'Tencent enterprise email users: Enterprise email admin → Domain management → View DKIM config',
      },
      {
        step: 2,
        title: 'Go to DNS Console',
        description: 'Tencent Cloud console → DNS DNSPod → Select domain',
      },
      {
        step: 3,
        title: 'Add Record',
        description: 'Add Record → Host: selector._domainkey → Type: TXT → Value: public key',
      },
      {
        step: 4,
        title: 'Save and Verify',
        description: 'After saving, go back to email provider admin to verify',
      },
    ],
    exampleValue: 'v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3...',
    verifyCommand: 'dig TXT selector._domainkey.yourdomain.com',
    commonMistakes: [
      'Line type not set to "Default"',
    ],
  },
  route53: {
    providerName: 'AWS Route 53',
    prerequisites: [
      'Obtained DKIM configuration from SES or other email service',
    ],
    steps: [
      {
        step: 1,
        title: 'Get DKIM (SES Users)',
        description: 'AWS SES → Verified identities → Select domain → Authentication → DKIM → View CNAME records',
        tip: 'SES provides CNAME records, not TXT',
      },
      {
        step: 2,
        title: 'Go to Route 53',
        description: 'Route 53 → Hosted zones → Select domain',
      },
      {
        step: 3,
        title: 'Create Record',
        description: 'Create record → Record type: CNAME → Record name: fill in name from SES → Value: fill in value from SES',
      },
      {
        step: 4,
        title: 'Create and Verify',
        description: 'After creating record, go back to SES and wait for verification (may take up to 72 hours)',
      },
    ],
    exampleValue: 'xxxxxxxx.dkim.amazonses.com',
    verifyCommand: 'dig CNAME xxxxxx._domainkey.yourdomain.com',
    commonMistakes: [
      'SES DKIM uses CNAME not TXT',
      'Did not create all 3 CNAME records',
    ],
  },
};

// ==================== DMARC Guides ====================

const DMARC_GUIDES: Record<DNSProvider, Omit<FixGuide, 'provider' | 'recordType' | 'recordTypeName'>> = {
  cloudflare: {
    providerName: 'Cloudflare',
    prerequisites: [
      'SPF and DKIM already configured',
      'Email address ready to receive reports',
    ],
    steps: [
      {
        step: 1,
        title: 'Go to DNS Management',
        description: 'Cloudflare → Select domain → DNS → Records',
      },
      {
        step: 2,
        title: 'Add DMARC Record',
        description: 'Add record → Type: TXT → Name: _dmarc → Content: DMARC policy value',
      },
      {
        step: 3,
        title: 'Choose Policy Level',
        description: 'Recommended gradual deployment: Start with p=none (monitor) → After confirmation, change to p=quarantine → Finally upgrade to p=reject',
        tip: 'rua is the email for aggregate reports, recommended to configure for monitoring',
      },
      {
        step: 4,
        title: 'Save',
        description: 'Save the record. DMARC usually takes effect within minutes.',
      },
    ],
    exampleValue: 'v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@yourdomain.com; pct=100',
    verifyCommand: 'dig TXT _dmarc.yourdomain.com +short',
    commonMistakes: [
      'Name written as _dmarc.yourdomain.com (should just be _dmarc)',
      'Starting with p=reject causing legitimate emails to be rejected',
      'No rua email configured, unable to receive reports',
    ],
  },
  godaddy: {
    providerName: 'GoDaddy',
    prerequisites: [
      'SPF and DKIM already configured',
    ],
    steps: [
      {
        step: 1,
        title: 'Go to DNS Management',
        description: 'GoDaddy → My Products → Domain → DNS',
      },
      {
        step: 2,
        title: 'Add TXT Record',
        description: 'Add → Type: TXT → Name: _dmarc → Value: DMARC policy → TTL: 1 Hour',
      },
      {
        step: 3,
        title: 'Save',
        description: 'Click Save',
      },
    ],
    exampleValue: 'v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com',
    verifyCommand: 'nslookup -type=txt _dmarc.yourdomain.com',
    commonMistakes: [
      'Name field includes domain name',
    ],
  },
  aliyun: {
    providerName: 'Alibaba Cloud DNS',
    prerequisites: [
      'SPF and DKIM already configured',
    ],
    steps: [
      {
        step: 1,
        title: 'Go to DNS Settings',
        description: 'DNS Console → Select domain → DNS Settings',
      },
      {
        step: 2,
        title: 'Add DMARC Record',
        description: 'Add Record → Type: TXT → Host: _dmarc → Value: DMARC policy',
      },
      {
        step: 3,
        title: 'Confirm and Save',
        description: 'Click Confirm',
      },
    ],
    exampleValue: 'v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com',
    verifyCommand: 'dig TXT _dmarc.yourdomain.com',
    commonMistakes: [
      'Host written as _dmarc.yourdomain.com',
    ],
  },
  dnspod: {
    providerName: 'Tencent Cloud DNSPod',
    prerequisites: [
      'SPF and DKIM configuration complete',
    ],
    steps: [
      {
        step: 1,
        title: 'Go to DNS Console',
        description: 'DNSPod → Select domain → Record Management',
      },
      {
        step: 2,
        title: 'Add Record',
        description: 'Add Record → Host: _dmarc → Type: TXT → Value: DMARC policy',
      },
      {
        step: 3,
        title: 'Save',
        description: 'Confirm to save',
      },
    ],
    exampleValue: 'v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com',
    verifyCommand: 'dig TXT _dmarc.yourdomain.com',
    commonMistakes: [
      'Wrong line type selection',
    ],
  },
  route53: {
    providerName: 'AWS Route 53',
    prerequisites: [
      'SPF and DKIM already configured',
    ],
    steps: [
      {
        step: 1,
        title: 'Go to Hosted Zone',
        description: 'Route 53 → Hosted zones → Select domain',
      },
      {
        step: 2,
        title: 'Create Record',
        description: 'Create record → Record name: _dmarc → Record type: TXT → Value: DMARC policy (wrapped in double quotes)',
      },
      {
        step: 3,
        title: 'Create',
        description: 'Click Create records',
      },
    ],
    exampleValue: '"v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com"',
    verifyCommand: 'dig TXT _dmarc.yourdomain.com',
    commonMistakes: [
      'TXT value not wrapped in double quotes',
    ],
  },
};

// ==================== 获取修复指南 ====================

export function getFixGuide(provider: DNSProvider, recordType: RecordType): FixGuide {
  let guideData: Omit<FixGuide, 'provider' | 'recordType' | 'recordTypeName'>;
  let recordTypeName: string;

  switch (recordType) {
    case 'spf':
      guideData = SPF_GUIDES[provider];
      recordTypeName = 'SPF (Sender Policy Framework)';
      break;
    case 'dkim':
      guideData = DKIM_GUIDES[provider];
      recordTypeName = 'DKIM (DomainKeys Identified Mail)';
      break;
    case 'dmarc':
      guideData = DMARC_GUIDES[provider];
      recordTypeName = 'DMARC (Domain-based Message Authentication)';
      break;
  }

  return {
    provider,
    recordType,
    recordTypeName,
    ...guideData,
  };
}

// 获取所有提供商列表
export function getAllProviders(): Array<{ id: DNSProvider; name: string; url: string }> {
  return Object.entries(DNS_PROVIDERS).map(([id, info]) => ({
    id: id as DNSProvider,
    name: info.name,
    url: info.url,
  }));
}

// 根据问题类型推荐需要修复的记录
export function getRecommendedFixes(checks: {
  spf: { status: string };
  dkim: { status: string };
  dmarc: { status: string };
}): RecordType[] {
  const fixes: RecordType[] = [];
  
  if (checks.spf.status === 'fail') fixes.push('spf');
  if (checks.dkim.status === 'fail') fixes.push('dkim');
  if (checks.dmarc.status === 'fail') fixes.push('dmarc');
  
  // 即使是 warning 也可以优化
  if (checks.spf.status === 'warning' && !fixes.includes('spf')) fixes.push('spf');
  if (checks.dkim.status === 'warning' && !fixes.includes('dkim')) fixes.push('dkim');
  if (checks.dmarc.status === 'warning' && !fixes.includes('dmarc')) fixes.push('dmarc');
  
  return fixes;
}

// 生成用户特定的修复值建议
export function generateFixValue(
  recordType: RecordType,
  domain: string,
  options?: {
    emailProvider?: 'google' | 'microsoft' | 'amazon' | 'tencent' | 'aliyun';
    reportEmail?: string;
  }
): string {
  const reportEmail = options?.reportEmail || `dmarc-reports@${domain}`;
  
  switch (recordType) {
    case 'spf': {
      const includes: string[] = [];
      switch (options?.emailProvider) {
        case 'google':
          includes.push('include:_spf.google.com');
          break;
        case 'microsoft':
          includes.push('include:spf.protection.outlook.com');
          break;
        case 'amazon':
          includes.push('include:amazonses.com');
          break;
        case 'tencent':
          includes.push('include:spf.mail.qq.com');
          break;
        case 'aliyun':
          includes.push('include:spf.mxhichina.com');
          break;
        default:
          includes.push('include:_spf.google.com'); // 默认示例
      }
      return `v=spf1 ${includes.join(' ')} -all`;
    }
    case 'dkim':
      return 'v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY_HERE';
    case 'dmarc':
      return `v=DMARC1; p=quarantine; rua=mailto:${reportEmail}; pct=100`;
  }
}
