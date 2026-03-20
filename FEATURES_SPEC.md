# MailProbe 新功能技术方案

## 功能1：公开检测结果页

### 目标
每次域名检测后生成永久可访问的公开URL，可被Google索引，支持社交分享。

### 路由设计
```
/report/[domain]         → 显示最新检测结果
/report/[domain]/[id]    → 显示特定历史检测结果（后续扩展）
```

### 技术实现

#### 1. 数据存储
使用Supabase存储检测结果（项目已有supabase依赖）

```sql
-- 检测结果表
CREATE TABLE domain_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain VARCHAR(255) NOT NULL,
  score INTEGER NOT NULL,
  grade CHAR(1) NOT NULL,
  checks JSONB NOT NULL,
  summary JSONB NOT NULL,
  checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 域名索引
CREATE INDEX idx_domain_reports_domain ON domain_reports(domain);
CREATE INDEX idx_domain_reports_checked_at ON domain_reports(checked_at DESC);
```

#### 2. API修改
`/api/check` 检测完成后自动保存结果，返回报告URL

#### 3. 页面特性
- SSR渲染，对SEO友好
- Open Graph + Twitter Cards支持
- 一键复制分享链接
- 检测结果有效期（如7天/30天）
- 重新检测按钮

### SEO优化
- 动态生成meta标签
- JSON-LD结构化数据
- Canonical URL

---

## 功能2：邮件测试发送

### 目标
提供测试邮箱地址，用户发送邮件后显示完整header分析（类似mail-tester.com）

### 路由设计
```
/test                    → 测试入口页面
/test/[testId]           → 测试结果页面
```

### 技术实现

#### 1. 邮件接收方案

**方案A: 使用第三方服务（推荐MVP）**
- 使用 Mailgun/SendGrid Inbound Webhook
- 或使用 Postmark Inbound
- 成本低，实现快

**方案B: 自建邮件服务器**
- 部署Haraka/Postal等
- 需要VPS和域名MX配置
- 控制力强但复杂

**推荐方案A**：使用 **Mailgun Inbound Routing** 或 **CloudMailin**

#### 2. 流程设计

```
1. 用户点击"开始测试"
2. 系统生成唯一测试ID和测试邮箱地址
   例如: test-abc123@test.mailprobe.xyz
3. 用户发送邮件到该地址
4. Webhook接收邮件，解析headers
5. 用户访问 /test/abc123 查看结果
```

#### 3. 数据模型

```sql
-- 邮件测试表
CREATE TABLE email_tests (
  id VARCHAR(32) PRIMARY KEY,  -- 短ID: abc123
  test_email VARCHAR(255) NOT NULL UNIQUE,
  status VARCHAR(20) DEFAULT 'pending', -- pending, received, expired
  raw_email TEXT,
  headers JSONB,
  analysis JSONB,  -- 分析结果
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  received_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '24 hours'
);
```

#### 4. Header分析内容
- SPF验证结果 (Authentication-Results)
- DKIM签名验证
- DMARC对齐状态
- 发送IP和rDNS
- 邮件客户端识别
- 垃圾邮件评分（如有）
- 完整header展示

#### 5. 页面功能
- 实时轮询等待邮件到达
- 倒计时显示（24小时有效）
- 详细分析报告
- 问题诊断和修复建议
- 分享功能

---

## 开发优先级

### Phase 1（本周）
1. ✅ 公开检测结果页 `/report/[domain]`
   - Supabase表结构
   - 保存逻辑
   - 结果展示页
   - SEO标签

### Phase 2（下周）
2. 邮件测试发送 `/test`
   - 选择邮件接收服务
   - 实现webhook
   - 结果分析页

---

## 环境变量需求

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# 邮件测试（Phase 2）
MAILGUN_API_KEY=
MAILGUN_DOMAIN=test.mailprobe.xyz
# 或
CLOUDMAILIN_SECRET=
```
