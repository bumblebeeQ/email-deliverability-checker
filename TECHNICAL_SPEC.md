# 邮件送达率诊断工具 - 技术方案

## 产品名称建议

- **MailCheck** / **邮探**
- **DeliverScore** / **送达卫士**
- **InboxReady** / **进箱宝**

---

## 一、系统架构

```
┌─────────────────────────────────────────────────────────┐
│                      前端 (Next.js)                      │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │ 首页    │  │ 检测页  │  │ 报告页  │  │ 仪表盘  │    │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │
└─────────────────────────┬───────────────────────────────┘
                          │ API 调用
┌─────────────────────────▼───────────────────────────────┐
│                    后端 API (Node.js)                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │               /api/check                         │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────┐ │    │
│  │  │SPF检测  │ │DKIM检测 │ │DMARC检测│ │MX检测 │ │    │
│  │  └─────────┘ └─────────┘ └─────────┘ └───────┘ │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐           │    │
│  │  │黑名单   │ │评分计算 │ │建议生成 │           │    │
│  │  └─────────┘ └─────────┘ └─────────┘           │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│                     数据层                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ PostgreSQL  │  │   Redis     │  │  Supabase   │     │
│  │ (用户/历史) │  │  (缓存)     │  │  (可选)     │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

---

## 二、技术栈选型

| 层级 | 技术 | 理由 |
|------|------|------|
| 前端 | Next.js 14 + TypeScript | SSR 利于 SEO，App Router 现代化 |
| UI | Tailwind CSS + shadcn/ui | 快速开发，美观 |
| 后端 | Next.js API Routes | 全栈统一，部署简单 |
| DNS | dns.promises (Node.js 内置) | 免费，无依赖 |
| 数据库 | Supabase (PostgreSQL) | 免费额度大，自带 Auth |
| 缓存 | Upstash Redis | 免费额度，Serverless |
| 部署 | Vercel | 免费，自动 CI/CD |
| 域名 | Cloudflare | 免费 DNS + CDN |

---

## 三、核心功能模块

### 3.1 SPF 检测

```typescript
// 检测逻辑
1. 查询 TXT 记录: dig TXT example.com
2. 筛选以 "v=spf1" 开头的记录
3. 解析 SPF 语法，检测:
   - 是否存在 SPF 记录 ✓/✗
   - 是否有 ~all 或 -all (推荐 -all)
   - 是否包含过多 include (不超过 10 层)
   - DNS 查询次数是否超限 (≤10)
```

**评分规则:**
| 状态 | 分数 |
|------|------|
| 有 SPF 且 -all | 25/25 |
| 有 SPF 但 ~all | 20/25 |
| 有 SPF 但 +all | 5/25 |
| 无 SPF | 0/25 |

### 3.2 DKIM 检测

```typescript
// 检测逻辑
1. 常见 selector 列表: google, default, selector1, selector2, k1, mail
2. 查询: dig TXT {selector}._domainkey.example.com
3. 检测:
   - 是否存在 DKIM 记录
   - 密钥长度 (推荐 2048 位)
   - 是否过期
```

**评分规则:**
| 状态 | 分数 |
|------|------|
| 有 DKIM 且 2048 位 | 25/25 |
| 有 DKIM 但 1024 位 | 20/25 |
| 无 DKIM | 0/25 |

### 3.3 DMARC 检测

```typescript
// 检测逻辑
1. 查询: dig TXT _dmarc.example.com
2. 解析 DMARC 策略:
   - p=none / p=quarantine / p=reject
   - rua (聚合报告邮箱)
   - ruf (取证报告邮箱)
   - pct (策略应用百分比)
```

**评分规则:**
| 状态 | 分数 |
|------|------|
| p=reject + rua | 25/25 |
| p=quarantine + rua | 20/25 |
| p=none + rua | 15/25 |
| 有 DMARC 无 rua | 10/25 |
| 无 DMARC | 0/25 |

### 3.4 MX 记录检测

```typescript
// 检测逻辑
1. 查询: dig MX example.com
2. 检测:
   - 是否有 MX 记录
   - 优先级设置是否合理
   - MX 服务器是否可达
```

**评分规则:**
| 状态 | 分数 |
|------|------|
| 有效 MX 记录 | 15/15 |
| MX 指向 IP (不推荐) | 10/15 |
| 无 MX | 0/15 |

### 3.5 黑名单检测

```typescript
// 检测逻辑
1. 获取域名对应 IP
2. 反转 IP: 1.2.3.4 → 4.3.2.1
3. 查询 DNSBL: dig 4.3.2.1.{blacklist}.
4. 常见黑名单列表 (50+):
   - zen.spamhaus.org
   - bl.spamcop.net
   - b.barracudacentral.org
   - ...
```

**评分规则:**
| 状态 | 分数 |
|------|------|
| 未在任何黑名单 | 10/10 |
| 在 1-2 个黑名单 | 5/10 |
| 在 3+ 个黑名单 | 0/10 |

---

## 四、数据库设计

### 4.1 用户表 (users)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  plan VARCHAR(20) DEFAULT 'free', -- free, pro, team
  checks_today INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4.2 检测记录表 (checks)

```sql
CREATE TABLE checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  domain VARCHAR(255) NOT NULL,
  score INT NOT NULL, -- 0-100
  grade CHAR(1) NOT NULL, -- A/B/C/D/F
  spf_score INT,
  spf_record TEXT,
  dkim_score INT,
  dkim_selectors JSONB,
  dmarc_score INT,
  dmarc_record TEXT,
  mx_score INT,
  mx_records JSONB,
  blacklist_score INT,
  blacklist_results JSONB,
  suggestions JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_checks_user ON checks(user_id);
CREATE INDEX idx_checks_domain ON checks(domain);
```

### 4.3 监控域名表 (monitored_domains) - Pro 功能

```sql
CREATE TABLE monitored_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  domain VARCHAR(255) NOT NULL,
  last_score INT,
  last_check TIMESTAMP,
  alert_threshold INT DEFAULT 70,
  alert_email VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 五、API 设计

### 5.1 检测接口

```
POST /api/check
Request:
{
  "domain": "example.com"
}

Response:
{
  "success": true,
  "data": {
    "domain": "example.com",
    "score": 85,
    "grade": "B",
    "checks": {
      "spf": {
        "score": 25,
        "maxScore": 25,
        "status": "pass",
        "record": "v=spf1 include:_spf.google.com ~all",
        "issues": [],
        "suggestions": []
      },
      "dkim": {
        "score": 20,
        "maxScore": 25,
        "status": "warning",
        "selectors": ["google"],
        "issues": ["密钥长度为 1024 位，建议升级到 2048 位"],
        "suggestions": ["联系邮件服务商升级 DKIM 密钥长度"]
      },
      "dmarc": {
        "score": 15,
        "maxScore": 25,
        "status": "warning",
        "record": "v=DMARC1; p=none; rua=mailto:dmarc@example.com",
        "issues": ["策略设置为 none，不会拦截伪造邮件"],
        "suggestions": ["建议逐步升级到 p=quarantine 或 p=reject"]
      },
      "mx": {
        "score": 15,
        "maxScore": 15,
        "status": "pass",
        "records": [
          {"priority": 10, "host": "aspmx.l.google.com"}
        ],
        "issues": [],
        "suggestions": []
      },
      "blacklist": {
        "score": 10,
        "maxScore": 10,
        "status": "pass",
        "listed": [],
        "checked": 50,
        "issues": [],
        "suggestions": []
      }
    },
    "summary": {
      "issues": 2,
      "warnings": 2,
      "passed": 3
    }
  }
}
```

### 5.2 用户接口

```
POST /api/auth/register   - 注册
POST /api/auth/login      - 登录
GET  /api/user/profile    - 获取用户信息
GET  /api/user/history    - 获取检测历史
POST /api/user/upgrade    - 升级套餐
```

### 5.3 监控接口 (Pro)

```
GET  /api/monitors           - 获取监控列表
POST /api/monitors           - 添加监控域名
DELETE /api/monitors/:id     - 删除监控
PUT  /api/monitors/:id       - 更新监控配置
```

---

## 六、部署方案

### 6.1 Vercel 部署 (推荐)

```bash
# 1. 推送代码到 GitHub
git push origin main

# 2. Vercel 自动部署
# 连接 GitHub 仓库，自动 CI/CD

# 3. 环境变量配置
SUPABASE_URL=xxx
SUPABASE_ANON_KEY=xxx
UPSTASH_REDIS_URL=xxx
```

### 6.2 成本预估

| 服务 | 免费额度 | 超出价格 |
|------|---------|---------|
| Vercel | 100GB 带宽/月 | $20/100GB |
| Supabase | 500MB 数据库 | $25/月起 |
| Upstash | 10K 请求/天 | $0.2/10K |
| **总计** | **$0/月** | 按量付费 |

---

## 七、SEO 优化策略

### 7.1 目标关键词

| 关键词 | 搜索量 | 难度 |
|--------|--------|------|
| 邮件进垃圾箱 | 高 | 低 |
| SPF 配置检测 | 中 | 低 |
| DMARC 检测工具 | 中 | 低 |
| 邮件送达率检测 | 中 | 低 |
| email deliverability check | 高 | 中 |

### 7.2 内容页面规划

```
/                     - 首页 (检测工具)
/check/[domain]       - 检测结果页 (可分享)
/guides/spf           - SPF 配置指南
/guides/dkim          - DKIM 配置指南
/guides/dmarc         - DMARC 配置指南
/guides/blacklist     - 黑名单移除指南
/blog                 - 博客 (SEO 内容)
```

---

## 八、开发里程碑

### Phase 1: MVP (2 周)

- [x] 项目初始化
- [ ] 核心检测功能 (SPF/DKIM/DMARC/MX)
- [ ] 结果展示页面
- [ ] 基础 UI

### Phase 2: 完善 (2 周)

- [ ] 黑名单检测
- [ ] 用户系统
- [ ] 检测历史
- [ ] 报告导出

### Phase 3: 商业化 (2 周)

- [ ] 付费系统
- [ ] 域名监控
- [ ] 告警通知
- [ ] SEO 内容页

---

## 九、风险与对策

| 风险 | 对策 |
|------|------|
| DNS 查询被限速 | 使用缓存 + 多 DNS 服务器 |
| 黑名单 API 不稳定 | 设置超时 + 降级处理 |
| 恶意刷接口 | Rate Limit + Captcha |
| SEO 效果慢 | 同时做社区推广 |
