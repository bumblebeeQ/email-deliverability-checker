# 邮件测试功能 - 真实实现方案

## 方案选择：Cloudflare Email Workers

### 为什么选择这个方案？
1. **免费** - 每天100K次邮件处理
2. **简单** - 几分钟配置完成
3. **可靠** - Cloudflare全球基础设施
4. **无需服务器** - Serverless架构

---

## 架构设计

```
用户发送邮件
    ↓
test-xxx@test.EmailDiag.xyz
    ↓
Cloudflare Email Routing
    ↓
Email Worker (解析邮件)
    ↓
调用 EmailDiag API (存储结果)
    ↓
用户页面轮询获取结果
```

---

## 配置步骤

### Step 1: 添加测试子域名到Cloudflare

1. 登录 Cloudflare Dashboard
2. 选择 EmailDiag.xyz 域名
3. 确保 `test.EmailDiag.xyz` 子域名已配置

### Step 2: 启用 Email Routing

1. 在Cloudflare Dashboard，进入 **Email** > **Email Routing**
2. 点击 **Enable Email Routing**
3. 添加 MX 记录（Cloudflare会自动配置）

### Step 3: 创建 Email Worker

1. 进入 **Workers & Pages**
2. 点击 **Create Worker**
3. 命名为 `EmailDiag-email-receiver`
4. 粘贴下面的Worker代码

### Step 4: 配置 Email Route

1. 回到 **Email** > **Email Routing** > **Routing rules**
2. 添加规则：
   - Custom address: `test-*@test.EmailDiag.xyz`
   - Action: Send to Worker
   - Worker: `EmailDiag-email-receiver`

### Step 5: 配置环境变量

在Worker设置中添加：
- `EmailDiag_API_URL`: `https://EmailDiag.xyz/api/test/receive`
- `EmailDiag_API_SECRET`: 生成一个随机密钥

---

## 数据库配置（Supabase）

需要在Supabase创建表来存储测试数据：

```sql
-- 邮件测试表
CREATE TABLE email_tests (
  id VARCHAR(32) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '24 hours',
  received_at TIMESTAMP WITH TIME ZONE,
  raw_headers TEXT,
  from_address VARCHAR(255),
  subject VARCHAR(500),
  sending_ip VARCHAR(45),
  reverse_dns VARCHAR(255),
  spf_result VARCHAR(20),
  spf_details TEXT,
  dkim_result VARCHAR(20),
  dkim_details TEXT,
  dkim_selector VARCHAR(100),
  dmarc_result VARCHAR(20),
  dmarc_details TEXT,
  spam_score DECIMAL(5,2),
  spam_details JSONB,
  analysis JSONB
);

-- 索引
CREATE INDEX idx_email_tests_email ON email_tests(email);
CREATE INDEX idx_email_tests_status ON email_tests(status);
CREATE INDEX idx_email_tests_expires ON email_tests(expires_at);

-- 自动清理过期测试（可选，用pg_cron）
-- SELECT cron.schedule('cleanup-expired-tests', '0 * * * *', 
--   $$DELETE FROM email_tests WHERE expires_at < NOW()$$);
```

---

## 环境变量

在 `.env.local` 中配置：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Email Test Security
EMAIL_TEST_API_SECRET=your-random-secret-key
```

---

## 安全考虑

1. **速率限制** - 每IP每小时最多10次测试
2. **过期清理** - 24小时后自动删除
3. **API密钥** - Worker和API之间使用密钥验证
4. **邮件大小限制** - 最大10MB
