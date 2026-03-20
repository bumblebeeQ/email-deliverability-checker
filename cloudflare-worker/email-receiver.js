/**
 * Cloudflare Email Worker - MailProbe Email Receiver
 * 测试ID从邮件主题中提取，格式: TEST-{testId}
 */

export default {
  async email(message, env, ctx) {
    try {
      console.log('Received email from:', message.from, 'to:', message.to);

      const rawEmail = await new Response(message.raw).text();
      
      const headers = {};
      const headerSection = rawEmail.split('\r\n\r\n')[0] || rawEmail.split('\n\n')[0];
      const headerLines = headerSection.split(/\r?\n/);
      
      let currentHeader = '';
      let currentValue = '';
      
      for (const line of headerLines) {
        if (line.match(/^\s/)) {
          currentValue += ' ' + line.trim();
        } else {
          if (currentHeader) {
            headers[currentHeader.toLowerCase()] = currentValue;
          }
          const colonIndex = line.indexOf(':');
          if (colonIndex > 0) {
            currentHeader = line.substring(0, colonIndex).trim();
            currentValue = line.substring(colonIndex + 1).trim();
          }
        }
      }
      if (currentHeader) {
        headers[currentHeader.toLowerCase()] = currentValue;
      }

      // 解码邮件主题（处理 MIME 编码）
      let subject = headers['subject'] || '';
      subject = decodeMimeHeader(subject);
      console.log('Decoded subject:', subject);

      // 从邮件主题中提取测试ID，格式: TEST-{testId}
      const testIdMatch = subject.match(/TEST-([a-zA-Z0-9]+)/i);
      
      if (!testIdMatch) {
        console.log('No test ID found in subject:', subject);
        return;
      }

      const testId = testIdMatch[1];
      console.log('Processing email for test:', testId);

      const authResults = parseAuthenticationResults(headers['authentication-results'] || '');
      
      const receivedHeader = headers['received'] || '';
      const ipMatch = receivedHeader.match(/\[(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\]/);
      const sendingIp = ipMatch ? ipMatch[1] : null;

      const rdnsMatch = receivedHeader.match(/from\s+([a-zA-Z0-9.-]+)\s+\(/);
      const reverseDns = rdnsMatch ? rdnsMatch[1] : null;

      const dkimSig = headers['dkim-signature'] || '';
      const selectorMatch = dkimSig.match(/s=([^;]+)/);
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
 * 解码 MIME 编码的邮件头（支持 Base64 和 Quoted-Printable）
 * 格式: =?charset?encoding?encoded_text?=
 */
function decodeMimeHeader(header) {
  if (!header) return header;
  
  // 匹配 MIME 编码模式: =?charset?B?base64?= 或 =?charset?Q?quoted-printable?=
  const mimePattern = /=\?([^?]+)\?([BQ])\?([^?]*)\?=/gi;
  
  return header.replace(mimePattern, (match, charset, encoding, text) => {
    try {
      if (encoding.toUpperCase() === 'B') {
        // Base64 解码
        const decoded = atob(text);
        // 尝试 UTF-8 解码
        try {
          return decodeURIComponent(escape(decoded));
        } catch (e) {
          return decoded;
        }
      } else if (encoding.toUpperCase() === 'Q') {
        // Quoted-Printable 解码
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

  const spfMatch = authHeader.match(/spf=(\w+)/i);
  if (spfMatch) {
    const status = spfMatch[1].toLowerCase();
    results.spf = {
      status: status === 'pass' ? 'pass' : status === 'fail' || status === 'softfail' ? 'fail' : 'none',
      details: `SPF ${status}`,
    };
  }

  const dkimMatch = authHeader.match(/dkim=(\w+)/i);
  if (dkimMatch) {
    const status = dkimMatch[1].toLowerCase();
    results.dkim = {
      status: status === 'pass' ? 'pass' : status === 'fail' ? 'fail' : 'none',
      details: `DKIM ${status}`,
    };
  }

  const dmarcMatch = authHeader.match(/dmarc=(\w+)/i);
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
  const spamScore = headers['x-spam-score'];
  if (spamScore) return parseFloat(spamScore);
  const spamStatus = headers['x-spam-status'];
  if (spamStatus) {
    const scoreMatch = spamStatus.match(/score=([\d.]+)/);
    if (scoreMatch) return parseFloat(scoreMatch[1]);
  }
  return null;
}

function parseSpamDetails(headers) {
  const details = [];
  const spamStatus = headers['x-spam-status'];
  if (spamStatus) {
    const testsMatch = spamStatus.match(/tests=([^,\s]+(?:,[^,\s]+)*)/);
    if (testsMatch) {
      details.push(...testsMatch[1].split(',').slice(0, 10));
    }
  }
  return details.length > 0 ? details : null;
}
