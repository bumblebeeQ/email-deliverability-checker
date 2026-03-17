# 邮探 - 邮件送达率诊断工具

免费检测您的邮件送达率，诊断 SPF、DKIM、DMARC 配置问题，检查黑名单状态，获取具体修复建议。

## 功能特性

- ✅ **SPF 检测** - 验证发件人策略框架配置
- ✅ **DKIM 检测** - 检测域名密钥签名
- ✅ **DMARC 检测** - 验证基于域的消息认证策略
- ✅ **MX 记录检测** - 检查邮件交换服务器配置
- ✅ **黑名单扫描** - 扫描 50+ 主流黑名单
- ✅ **修复建议** - 提供具体可执行的配置建议

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **DNS**: Node.js 内置 dns 模块
- **部署**: Vercel

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 访问

打开 http://localhost:3000

## 部署到 Vercel

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 部署
vercel
```

或者直接连接 GitHub 仓库到 Vercel，自动部署。

## 项目结构

```
src/
├── app/
│   ├── api/
│   │   └── check/
│   │       └── route.ts    # 检测 API
│   ├── globals.css         # 全局样式
│   ├── layout.tsx          # 布局
│   └── page.tsx            # 首页
├── components/             # 组件 (待扩展)
├── lib/
│   ├── dns-checker.ts      # DNS 检测核心逻辑
│   └── utils.ts            # 工具函数
└── types/
    └── index.ts            # 类型定义
```

## API 使用

### POST /api/check

```bash
curl -X POST http://localhost:3000/api/check \
  -H "Content-Type: application/json" \
  -d '{"domain": "example.com"}'
```

### GET /api/check

```bash
curl "http://localhost:3000/api/check?domain=example.com"
```

## 开发计划

### Phase 1 (当前) ✅
- [x] 核心检测功能
- [x] 基础 UI
- [x] API 接口

### Phase 2
- [ ] 用户系统 (Supabase Auth)
- [ ] 检测历史记录
- [ ] 报告导出 PDF

### Phase 3
- [ ] 付费系统 (Stripe)
- [ ] 域名监控
- [ ] 告警通知

## License

MIT
