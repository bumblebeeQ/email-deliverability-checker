import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidDomain(domain: string): boolean {
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
  return domainRegex.test(domain);
}

export function extractDomain(input: string): string {
  // 去除协议
  let domain = input.replace(/^https?:\/\//i, '');
  // 去除路径
  domain = domain.split('/')[0];
  // 去除端口
  domain = domain.split(':')[0];
  // 去除邮箱前缀
  if (domain.includes('@')) {
    domain = domain.split('@')[1];
  }
  return domain.toLowerCase().trim();
}
