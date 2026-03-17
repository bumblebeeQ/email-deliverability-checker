// 检测结果类型定义

export interface CheckResult {
  score: number;
  maxScore: number;
  status: 'pass' | 'warning' | 'fail';
  record?: string;
  records?: any[];
  selectors?: string[];
  issues: string[];
  suggestions: string[];
}

export interface SPFResult extends CheckResult {
  mechanism?: string;
  includes?: string[];
  lookupCount?: number;
}

export interface DKIMResult extends CheckResult {
  selectors: string[];
  keyLength?: number;
}

export interface DMARCResult extends CheckResult {
  policy?: 'none' | 'quarantine' | 'reject';
  rua?: string;
  ruf?: string;
  pct?: number;
}

export interface MXResult extends CheckResult {
  records: {
    priority: number;
    host: string;
    ip?: string;
  }[];
}

export interface BlacklistResult extends CheckResult {
  ip?: string;
  listed: string[];
  checked: number;
}

export interface DomainCheckResult {
  domain: string;
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  checks: {
    spf: SPFResult;
    dkim: DKIMResult;
    dmarc: DMARCResult;
    mx: MXResult;
    blacklist: BlacklistResult;
  };
  summary: {
    issues: number;
    warnings: number;
    passed: number;
  };
  checkedAt: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
