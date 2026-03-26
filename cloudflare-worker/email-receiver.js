/**
 * Cloudflare Email Worker - EmailDiag Email Receiver
 * Extracts test ID from email subject in format: TEST-{testId}
 */

export default {
  async email(message, env, ctx) {
    try {
      console.log('Received email from:', message.from, 'to:', message.to);

      const rawEmail = await new Response(message.raw).text();
      
      // Parse all headers (including multiple Received headers)
      const headers = {};
      const receivedHeaders = [];
      const headerSection = rawEmail.split('\r\n\r\n')[0] || rawEmail.split('\n\n')[0];
      const headerLines = headerSection.split(/\r?\n/);
      
      let currentHeader = '';
      let currentValue = '';
      
      for (const line of headerLines) {
        if (line.match(/^\s/)) {
          // Continuation of previous header
          currentValue += ' ' + line.trim();
        } else {
          // Save previous header
          if (currentHeader) {
            const lowerHeader = currentHeader.toLowerCase();
            if (lowerHeader === 'received') {
              receivedHeaders.push(currentValue);
            }
            headers[lowerHeader] = currentValue;
          }
          // Start new header
          const colonIndex = line.indexOf(':');
          if (colonIndex > 0) {
            currentHeader = line.substring(0, colonIndex).trim();
            currentValue = line.substring(colonIndex + 1).trim();
          }
        }
      }
      // Don't forget the last header
      if (currentHeader) {
        const lowerHeader = currentHeader.toLowerCase();
        if (lowerHeader === 'received') {
          receivedHeaders.push(currentValue);
        }
        headers[lowerHeader] = currentValue;
      }

      // Decode MIME-encoded subject
      let subject = headers['subject'] || '';
      subject = decodeMimeHeader(subject);
      console.log('Decoded subject:', subject);

      // Extract test ID from subject: TEST-{testId}
      const testIdMatch = subject.match(/TEST-([a-zA-Z0-9]+)/i);
      
      if (!testIdMatch) {
        console.log('No test ID found in subject:', subject);
        return;
      }

      const testId = testIdMatch[1];
      console.log('Processing email for test:', testId);

      // Parse authentication results
      const authResults = parseAuthenticationResults(headers['authentication-results'] || '');
      
      // Extract sending IP and reverse DNS from Received headers
      const { sendingIp, reverseDns } = extractSendingInfo(receivedHeaders, headerSection);
      
      console.log('Extracted sending IP:', sendingIp, 'Reverse DNS:', reverseDns);

      // Extract DKIM selector
      const dkimSig = headers['dkim-signature'] || '';
      const selectorMatch = dkimSig.match(/s=([^;\s]+)/);
      const dkimSelector = selectorMatch ? selectorMatch[1].trim() : null;

      const analysis = {
        spf: authResults.spf || { status: 'none', details: 'No SPF result found' },
        dkim: {
          ...authResults.dkim || { status: 'none', details: 'No DKIM result found' },
          selector: dkimSelector
        },
        dmarc: authResults.dmarc || { status: 'none', details: 'No DMARC result found' },
        sendingIp,
        reverseDns,
        from: message.from,
        subject: subject,
        spamScore: parseSpamScore(headers),
        spamDetails: parseSpamDetails(headers),
      };

      const apiResponse = await fetch(`${env.MAILPROBE_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.MAILPROBE_API_SECRET}`,
        },
        body: JSON.stringify({
          testId,
          analysis,
          headers: headerSection,
          receivedAt: new Date().toISOString(),
        }),
      });

      if (!apiResponse.ok) {
        console.error('Failed to send result to API:', await apiResponse.text());
      } else {
        console.log('Successfully processed email for test:', testId);
      }

    } catch (error) {
      console.error('Error processing email:', error);
    }
  },
};

/**
 * Extract sending IP and reverse DNS from Received headers
 * Tries multiple patterns to find the original sending server
 */
function extractSendingInfo(receivedHeaders, fullHeaders) {
  let sendingIp = null;
  let reverseDns = null;

  // Common patterns in Received headers:
  // 1. from hostname (IP) by ...
  // 2. from hostname [IP] by ...
  // 3. from [IP] by ...
  // 4. from hostname (helo=xxx) by ... with ... (IP)
  
  const ipPatterns = [
    // Standard: from host.example.com (1.2.3.4) or from host.example.com [1.2.3.4]
    /from\s+([a-zA-Z0-9.-]+)\s+\(?\[?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\]?\)?/i,
    // From with parentheses: from host (host [1.2.3.4])
    /from\s+([a-zA-Z0-9.-]+)\s+\([^)]*\[(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\]/i,
    // Just IP in brackets: [1.2.3.4]
    /\[(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\]/,
    // IP in parentheses: (1.2.3.4)
    /\((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\)/,
    // Bare IP after "from"
    /from\s+(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/i,
  ];

  const rdnsPatterns = [
    // from hostname (IP) - hostname before IP
    /from\s+([a-zA-Z0-9][a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\s+[\(\[]/i,
    // from hostname by - hostname at start
    /from\s+([a-zA-Z0-9][a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\s+by/i,
    // helo=hostname
    /helo=([a-zA-Z0-9][a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i,
  ];

  // Process Received headers in reverse order (oldest first = original sender)
  // But we want the first external hop, so check from newest to oldest
  // and look for the first public IP
  
  for (const received of receivedHeaders) {
    // Skip internal/private IPs
    const privateIpPattern = /^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.|127\.)/;
    
    // Try to extract IP
    for (const pattern of ipPatterns) {
      const match = received.match(pattern);
      if (match) {
        // Check if it's a public IP
        const possibleIp = match[2] || match[1];
        if (possibleIp && /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(possibleIp)) {
          if (!privateIpPattern.test(possibleIp) && possibleIp !== '127.0.0.1') {
            sendingIp = possibleIp;
            break;
          }
        }
      }
    }
    
    // Try to extract reverse DNS
    if (!reverseDns) {
      for (const pattern of rdnsPatterns) {
        const match = received.match(pattern);
        if (match && match[1]) {
          // Validate it looks like a hostname
          const hostname = match[1];
          if (hostname.includes('.') && !hostname.match(/^\d+\.\d+\.\d+\.\d+$/)) {
            reverseDns = hostname;
            break;
          }
        }
      }
    }
    
    // If we found a public IP, stop searching
    if (sendingIp) break;
  }

  // Fallback: try X-Originating-IP header
  if (!sendingIp) {
    const xOrigIpMatch = fullHeaders.match(/X-Originating-IP:\s*\[?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\]?/i);
    if (xOrigIpMatch) {
      sendingIp = xOrigIpMatch[1];
    }
  }

  // Fallback: try X-Sender-IP header
  if (!sendingIp) {
    const xSenderIpMatch = fullHeaders.match(/X-Sender-IP:\s*(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/i);
    if (xSenderIpMatch) {
      sendingIp = xSenderIpMatch[1];
    }
  }

  return { sendingIp, reverseDns };
}

/**
 * Decode MIME-encoded headers (supports Base64 and Quoted-Printable)
 * Format: =?charset?encoding?encoded_text?=
 */
function decodeMimeHeader(header) {
  if (!header) return header;
  
  const mimePattern = /=\?([^?]+)\?([BQ])\?([^?]*)\?=/gi;
  
  return header.replace(mimePattern, (match, charset, encoding, text) => {
    try {
      if (encoding.toUpperCase() === 'B') {
        // Base64 decode
        const decoded = atob(text);
        try {
          return decodeURIComponent(escape(decoded));
        } catch (e) {
          return decoded;
        }
      } else if (encoding.toUpperCase() === 'Q') {
        // Quoted-Printable decode
        return text
          .replace(/_/g, ' ')
          .replace(/=([0-9A-F]{2})/gi, (m, hex) => 
            String.fromCharCode(parseInt(hex, 16))
          );
      }
    } catch (e) {
      console.error('Failed to decode MIME header:', e);
    }
    return match;
  });
}

function parseAuthenticationResults(authHeader) {
  const results = { spf: null, dkim: null, dmarc: null };
  if (!authHeader) return results;

  // SPF result
  const spfMatch = authHeader.match(/spf=(\w+)(?:\s+\([^)]*\))?/i);
  if (spfMatch) {
    const status = spfMatch[1].toLowerCase();
    results.spf = {
      status: status === 'pass' ? 'pass' : (status === 'fail' || status === 'softfail' || status === 'hardfail') ? 'fail' : 'none',
      details: `SPF ${status}`,
    };
  }

  // DKIM result
  const dkimMatch = authHeader.match(/dkim=(\w+)(?:\s+\([^)]*\))?(?:\s+header\.[id]=([^\s;]+))?/i);
  if (dkimMatch) {
    const status = dkimMatch[1].toLowerCase();
    results.dkim = {
      status: status === 'pass' ? 'pass' : status === 'fail' ? 'fail' : 'none',
      details: `DKIM ${status}${dkimMatch[2] ? ` (${dkimMatch[2]})` : ''}`,
    };
  }

  // DMARC result
  const dmarcMatch = authHeader.match(/dmarc=(\w+)(?:\s+\([^)]*\))?/i);
  if (dmarcMatch) {
    const status = dmarcMatch[1].toLowerCase();
    results.dmarc = {
      status: status === 'pass' ? 'pass' : status === 'fail' ? 'fail' : 'none',
      details: `DMARC ${status}`,
    };
  }

  return results;
}

function parseSpamScore(headers) {
  // Try X-Spam-Score header
  const spamScore = headers['x-spam-score'];
  if (spamScore) return parseFloat(spamScore);
  
  // Try X-Spam-Status header
  const spamStatus = headers['x-spam-status'];
  if (spamStatus) {
    const scoreMatch = spamStatus.match(/score=([\d.-]+)/);
    if (scoreMatch) return parseFloat(scoreMatch[1]);
  }
  
  // Try SpamAssassin-Style header
  const spamAssassin = headers['x-spam-check-by'];
  if (spamAssassin) {
    const scoreMatch = spamAssassin.match(/([\d.]+)/);
    if (scoreMatch) return parseFloat(scoreMatch[1]);
  }
  
  return null;
}

function parseSpamDetails(headers) {
  const details = [];
  
  const spamStatus = headers['x-spam-status'];
  if (spamStatus) {
    // Extract tests from SpamAssassin
    const testsMatch = spamStatus.match(/tests=([^\s]+)/);
    if (testsMatch) {
      const tests = testsMatch[1].split(/[,\s]+/).filter(t => t.length > 0);
      details.push(...tests.slice(0, 10));
    }
  }
  
  return details.length > 0 ? details : null;
}
