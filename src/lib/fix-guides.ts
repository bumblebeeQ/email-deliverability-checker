// DNS Provider Fix Guides - 针对主流DNS提供商的分步修复指南

export type DNSProvider = 'cloudflare' | 'godaddy' | 'aliyun' | 'dnspod' | 'route53';
export type RecordType = 'spf' | 'dkim' | 'dmarc';

export interface FixStep {
  step: number;
  title: string;
  description: string;
  tip?: string;
  image?: string; // 可选的截图路径
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

// DNS提供商信息
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
    name: '阿里云 DNS',
    url: 'https://dns.console.aliyun.com',
  },
  dnspod: {
    name: '腾讯云 DNSPod',
    url: 'https://console.dnspod.cn',
  },
  route53: {
    name: 'AWS Route 53',
    url: 'https://console.aws.amazon.com/route53',
  },
};

// ==================== SPF 修复指南 ====================

const SPF_GUIDES: Record<DNSProvider, Omit<FixGuide, 'provider' | 'recordType' | 'recordTypeName'>> = {
  cloudflare: {
    providerName: 'Cloudflare',
    prerequisites: [
      '已登录 Cloudflare 控制台',
      '已将域名添加到 Cloudflare',
    ],
    steps: [
      {
        step: 1,
        title: '进入 DNS 管理页面',
        description: '登录 Cloudflare → 选择你的域名 → 点击左侧菜单的 "DNS" → "Records"',
      },
      {
        step: 2,
        title: '添加 TXT 记录',
        description: '点击 "Add record" 按钮',
      },
      {
        step: 3,
        title: '配置 SPF 记录',
        description: '选择类型为 "TXT"，Name 填写 "@"（代表根域名），Content 填写 SPF 值',
        tip: '如果已存在 SPF 记录，请编辑而不是新增，一个域名只能有一条 SPF 记录',
      },
      {
        step: 4,
        title: '保存并验证',
        description: '点击 "Save" 保存。DNS 生效可能需要几分钟到几小时',
        tip: '可以使用 dig TXT yourdomain.com 命令验证是否生效',
      },
    ],
    exampleValue: 'v=spf1 include:_spf.google.com include:spf.protection.outlook.com -all',
    verifyCommand: 'dig TXT yourdomain.com +short',
    commonMistakes: [
      '创建了多条 SPF 记录（应该只有一条）',
      '使用 ~all 而不是 -all（建议使用 -all）',
      '忘记添加所有邮件发送服务的 include',
    ],
  },
  godaddy: {
    providerName: 'GoDaddy',
    prerequisites: [
      '已登录 GoDaddy 账户',
      '域名在 GoDaddy 管理',
    ],
    steps: [
      {
        step: 1,
        title: '进入域名管理',
        description: '登录 GoDaddy → 点击右上角用户名 → "My Products" → 找到你的域名 → 点击 "DNS"',
      },
      {
        step: 2,
        title: '找到 DNS 记录区域',
        description: '滚动到 "DNS Records" 部分',
      },
      {
        step: 3,
        title: '添加 TXT 记录',
        description: '点击 "Add" 按钮 → Type 选择 "TXT" → Name 填写 "@" → Value 填写 SPF 值 → TTL 选择 1 Hour',
      },
      {
        step: 4,
        title: '保存',
        description: '点击 "Save" 保存记录',
      },
    ],
    exampleValue: 'v=spf1 include:_spf.google.com -all',
    verifyCommand: 'nslookup -type=txt yourdomain.com',
    commonMistakes: [
      'Name 字段填写了完整域名而不是 @',
      'Value 两端多加了引号',
    ],
  },
  aliyun: {
    providerName: '阿里云 DNS',
    prerequisites: [
      '已登录阿里云控制台',
      '域名已在阿里云 DNS 解析',
    ],
    steps: [
      {
        step: 1,
        title: '进入云解析 DNS',
        description: '登录阿里云控制台 → 搜索 "云解析 DNS" → 点击进入',
      },
      {
        step: 2,
        title: '选择域名',
        description: '在域名列表中找到你的域名 → 点击 "解析设置"',
      },
      {
        step: 3,
        title: '添加记录',
        description: '点击 "添加记录" → 记录类型选择 "TXT" → 主机记录填写 "@" → 记录值填写 SPF 内容',
        tip: 'TTL 可以保持默认值 10 分钟',
      },
      {
        step: 4,
        title: '确认保存',
        description: '点击 "确认" 保存记录',
      },
    ],
    exampleValue: 'v=spf1 include:spf.mxhichina.com -all',
    verifyCommand: 'dig TXT yourdomain.com @dns9.hichina.com',
    commonMistakes: [
      '记录值包含了引号',
      '主机记录填写了完整域名',
    ],
  },
  dnspod: {
    providerName: '腾讯云 DNSPod',
    prerequisites: [
      '已登录腾讯云/DNSPod 控制台',
      '域名已添加到 DNSPod',
    ],
    steps: [
      {
        step: 1,
        title: '进入 DNS 解析',
        description: '登录腾讯云控制台 → 搜索 "DNS 解析 DNSPod" → 点击进入',
      },
      {
        step: 2,
        title: '选择域名',
        description: '在 "我的域名" 列表中找到目标域名 → 点击域名进入解析记录页面',
      },
      {
        step: 3,
        title: '添加记录',
        description: '点击 "添加记录" → 主机记录填写 "@" → 记录类型选择 "TXT" → 记录值填写 SPF 内容',
      },
      {
        step: 4,
        title: '保存',
        description: '点击 "确定" 保存',
        tip: '腾讯企业邮箱用户需要 include:spf.mail.qq.com',
      },
    ],
    exampleValue: 'v=spf1 include:spf.mail.qq.com -all',
    verifyCommand: 'dig TXT yourdomain.com @f1g1ns1.dnspod.net',
    commonMistakes: [
      '线路类型选择错误（应选择"默认"）',
      '多条 SPF 记录冲突',
    ],
  },
  route53: {
    providerName: 'AWS Route 53',
    prerequisites: [
      '已登录 AWS 控制台',
      '域名托管在 Route 53',
    ],
    steps: [
      {
        step: 1,
        title: '进入 Route 53',
        description: '登录 AWS 控制台 → 搜索 "Route 53" → 点击进入',
      },
      {
        step: 2,
        title: '选择托管区域',
        description: '点击 "Hosted zones" → 选择你的域名',
      },
      {
        step: 3,
        title: '创建记录',
        description: '点击 "Create record" → Record name 留空（根域名）→ Record type 选择 "TXT" → Value 填写 SPF 值（需要用双引号包裹）',
        tip: 'Route 53 的 TXT 记录值必须用双引号包裹',
      },
      {
        step: 4,
        title: '创建',
        description: '点击 "Create records" 创建记录',
      },
    ],
    exampleValue: '"v=spf1 include:amazonses.com -all"',
    verifyCommand: 'dig TXT yourdomain.com @ns-xxx.awsdns-xx.com',
    commonMistakes: [
      'TXT 值没有用双引号包裹',
      'Record name 填写了域名而不是留空',
    ],
  },
};

// ==================== DKIM 修复指南 ====================

const DKIM_GUIDES: Record<DNSProvider, Omit<FixGuide, 'provider' | 'recordType' | 'recordTypeName'>> = {
  cloudflare: {
    providerName: 'Cloudflare',
    prerequisites: [
      '已从邮件服务商获取 DKIM 选择器(selector)和公钥',
      '已登录 Cloudflare 控制台',
    ],
    steps: [
      {
        step: 1,
        title: '获取 DKIM 信息',
        description: '从你的邮件服务商（如 Google Workspace、Microsoft 365）获取 DKIM 选择器和公钥值',
        tip: 'Google 的选择器通常是 "google"，Microsoft 的是 "selector1" 和 "selector2"',
      },
      {
        step: 2,
        title: '进入 DNS 管理',
        description: '登录 Cloudflare → 选择域名 → DNS → Records',
      },
      {
        step: 3,
        title: '添加 DKIM 记录',
        description: '点击 "Add record" → Type 选择 "TXT" 或 "CNAME"（取决于邮件服务商）→ Name 填写 "selector._domainkey"（将 selector 替换为实际值）→ Content 填写公钥值',
        tip: '如果公钥很长，Cloudflare 会自动处理',
      },
      {
        step: 4,
        title: '保存并验证',
        description: '保存后，等待 DNS 生效，然后在邮件服务商后台验证 DKIM',
      },
    ],
    exampleValue: 'v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBA...',
    verifyCommand: 'dig TXT selector._domainkey.yourdomain.com +short',
    commonMistakes: [
      'Name 格式错误，应该是 selector._domainkey 而不是完整域名',
      '复制公钥时包含了换行符',
      'CNAME 和 TXT 类型选错',
    ],
  },
  godaddy: {
    providerName: 'GoDaddy',
    prerequisites: [
      '已从邮件服务商获取 DKIM 配置信息',
    ],
    steps: [
      {
        step: 1,
        title: '获取 DKIM 配置',
        description: '登录邮件服务商后台，找到 DKIM 设置页面，复制选择器名称和公钥',
      },
      {
        step: 2,
        title: '进入 GoDaddy DNS',
        description: 'GoDaddy → My Products → 域名 → DNS',
      },
      {
        step: 3,
        title: '添加记录',
        description: 'Add → Type: TXT → Name: selector._domainkey → Value: DKIM 公钥 → TTL: 1 Hour',
        tip: 'GoDaddy 会自动在 Name 后追加域名',
      },
      {
        step: 4,
        title: '保存',
        description: '点击 Save 保存',
      },
    ],
    exampleValue: 'v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3...',
    verifyCommand: 'nslookup -type=txt selector._domainkey.yourdomain.com',
    commonMistakes: [
      'Name 字段填写了 selector._domainkey.yourdomain.com（应该只填 selector._domainkey）',
    ],
  },
  aliyun: {
    providerName: '阿里云 DNS',
    prerequisites: [
      '已获取邮件服务商的 DKIM 配置',
    ],
    steps: [
      {
        step: 1,
        title: '获取 DKIM 信息',
        description: '从邮件服务商获取 DKIM 选择器和公钥（阿里企业邮箱在邮箱管理后台获取）',
      },
      {
        step: 2,
        title: '进入解析设置',
        description: '阿里云控制台 → 云解析 DNS → 选择域名 → 解析设置',
      },
      {
        step: 3,
        title: '添加记录',
        description: '添加记录 → 记录类型: TXT → 主机记录: selector._domainkey → 记录值: 公钥内容',
        tip: '阿里企业邮箱的选择器通常是 "default"',
      },
      {
        step: 4,
        title: '确认',
        description: '点击确认保存',
      },
    ],
    exampleValue: 'v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4...',
    verifyCommand: 'dig TXT selector._domainkey.yourdomain.com',
    commonMistakes: [
      '主机记录填写错误',
      '公钥值复制不完整',
    ],
  },
  dnspod: {
    providerName: '腾讯云 DNSPod',
    prerequisites: [
      '已获取 DKIM 配置信息',
    ],
    steps: [
      {
        step: 1,
        title: '获取 DKIM',
        description: '腾讯企业邮箱用户：企业邮箱管理后台 → 域名管理 → 查看 DKIM 配置',
      },
      {
        step: 2,
        title: '进入 DNS 解析',
        description: '腾讯云控制台 → DNS 解析 DNSPod → 选择域名',
      },
      {
        step: 3,
        title: '添加记录',
        description: '添加记录 → 主机记录: selector._domainkey → 记录类型: TXT → 记录值: 公钥',
      },
      {
        step: 4,
        title: '保存验证',
        description: '保存后回到邮件服务商后台点击验证',
      },
    ],
    exampleValue: 'v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3...',
    verifyCommand: 'dig TXT selector._domainkey.yourdomain.com',
    commonMistakes: [
      '线路类型未选择"默认"',
    ],
  },
  route53: {
    providerName: 'AWS Route 53',
    prerequisites: [
      '已从 SES 或其他邮件服务获取 DKIM 配置',
    ],
    steps: [
      {
        step: 1,
        title: '获取 DKIM（SES 用户）',
        description: 'AWS SES → Verified identities → 选择域名 → Authentication → DKIM → 查看 CNAME 记录',
        tip: 'SES 提供的是 CNAME 记录而不是 TXT',
      },
      {
        step: 2,
        title: '进入 Route 53',
        description: 'Route 53 → Hosted zones → 选择域名',
      },
      {
        step: 3,
        title: '创建记录',
        description: 'Create record → Record type: CNAME → Record name: 填写 SES 提供的名称 → Value: 填写 SES 提供的值',
      },
      {
        step: 4,
        title: '创建并验证',
        description: '创建记录后，回到 SES 等待验证通过（可能需要 72 小时）',
      },
    ],
    exampleValue: 'xxxxxxxx.dkim.amazonses.com',
    verifyCommand: 'dig CNAME xxxxxx._domainkey.yourdomain.com',
    commonMistakes: [
      'SES 的 DKIM 是 CNAME 不是 TXT',
      '没有创建全部 3 条 CNAME 记录',
    ],
  },
};

// ==================== DMARC 修复指南 ====================

const DMARC_GUIDES: Record<DNSProvider, Omit<FixGuide, 'provider' | 'recordType' | 'recordTypeName'>> = {
  cloudflare: {
    providerName: 'Cloudflare',
    prerequisites: [
      '已配置好 SPF 和 DKIM',
      '已准备好接收报告的邮箱',
    ],
    steps: [
      {
        step: 1,
        title: '进入 DNS 管理',
        description: 'Cloudflare → 选择域名 → DNS → Records',
      },
      {
        step: 2,
        title: '添加 DMARC 记录',
        description: 'Add record → Type: TXT → Name: _dmarc → Content: DMARC 策略值',
      },
      {
        step: 3,
        title: '选择策略级别',
        description: '建议渐进式部署：先用 p=none 监控 → 确认无误后改为 p=quarantine → 最终升级为 p=reject',
        tip: 'rua 是接收聚合报告的邮箱，建议配置以监控邮件认证情况',
      },
      {
        step: 4,
        title: '保存',
        description: '保存记录，DMARC 通常几分钟内生效',
      },
    ],
    exampleValue: 'v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@yourdomain.com; pct=100',
    verifyCommand: 'dig TXT _dmarc.yourdomain.com +short',
    commonMistakes: [
      'Name 写成 _dmarc.yourdomain.com（应该只写 _dmarc）',
      '一开始就用 p=reject 导致正常邮件被拒绝',
      '没有配置 rua 邮箱，无法收到报告',
    ],
  },
  godaddy: {
    providerName: 'GoDaddy',
    prerequisites: [
      'SPF 和 DKIM 已配置',
    ],
    steps: [
      {
        step: 1,
        title: '进入 DNS 管理',
        description: 'GoDaddy → My Products → 域名 → DNS',
      },
      {
        step: 2,
        title: '添加 TXT 记录',
        description: 'Add → Type: TXT → Name: _dmarc → Value: DMARC 策略 → TTL: 1 Hour',
      },
      {
        step: 3,
        title: '保存',
        description: '点击 Save',
      },
    ],
    exampleValue: 'v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com',
    verifyCommand: 'nslookup -type=txt _dmarc.yourdomain.com',
    commonMistakes: [
      'Name 字段包含了域名',
    ],
  },
  aliyun: {
    providerName: '阿里云 DNS',
    prerequisites: [
      'SPF 和 DKIM 已配置完成',
    ],
    steps: [
      {
        step: 1,
        title: '进入解析设置',
        description: '云解析 DNS → 选择域名 → 解析设置',
      },
      {
        step: 2,
        title: '添加 DMARC 记录',
        description: '添加记录 → 记录类型: TXT → 主机记录: _dmarc → 记录值: DMARC 策略',
      },
      {
        step: 3,
        title: '确认保存',
        description: '点击确认',
      },
    ],
    exampleValue: 'v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com',
    verifyCommand: 'dig TXT _dmarc.yourdomain.com',
    commonMistakes: [
      '主机记录写成 _dmarc.yourdomain.com',
    ],
  },
  dnspod: {
    providerName: '腾讯云 DNSPod',
    prerequisites: [
      'SPF 和 DKIM 配置完成',
    ],
    steps: [
      {
        step: 1,
        title: '进入 DNS 解析',
        description: 'DNSPod → 选择域名 → 记录管理',
      },
      {
        step: 2,
        title: '添加记录',
        description: '添加记录 → 主机记录: _dmarc → 记录类型: TXT → 记录值: DMARC 策略',
      },
      {
        step: 3,
        title: '保存',
        description: '确定保存',
      },
    ],
    exampleValue: 'v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com',
    verifyCommand: 'dig TXT _dmarc.yourdomain.com',
    commonMistakes: [
      '线路类型选择错误',
    ],
  },
  route53: {
    providerName: 'AWS Route 53',
    prerequisites: [
      'SPF 和 DKIM 已配置',
    ],
    steps: [
      {
        step: 1,
        title: '进入托管区域',
        description: 'Route 53 → Hosted zones → 选择域名',
      },
      {
        step: 2,
        title: '创建记录',
        description: 'Create record → Record name: _dmarc → Record type: TXT → Value: DMARC 策略（用双引号包裹）',
      },
      {
        step: 3,
        title: '创建',
        description: '点击 Create records',
      },
    ],
    exampleValue: '"v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com"',
    verifyCommand: 'dig TXT _dmarc.yourdomain.com',
    commonMistakes: [
      'TXT 值没有用双引号包裹',
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
