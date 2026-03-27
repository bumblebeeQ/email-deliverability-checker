# How-to 问题解答型模板

## 适用场景
- 用户搜索具体问题的解答
- 技术故障排查
- 配置教程

## 文章结构

```
1. 开头 (100-150字)
   - 承认问题的痛点
   - 简短说明解决方案存在
   - 不要啰嗦，直接进入主题

2. 快速诊断 (可选)
   - 工具链接
   - 自检步骤

3. 原因分析 (200-400字)
   - 2-4 个可能原因
   - 按可能性排序
   - 每个原因简短解释

4. 解决方案 (主体，600-1000字)
   - 针对每个原因的具体步骤
   - 代码/配置示例
   - 截图说明

5. 验证步骤 (100-200字)
   - 如何确认问题已解决
   - 工具链接

6. 常见问题 (可选，2-3个)
   
7. 结尾 (50-100字)
   - 总结
   - CTA
```

## 写作风格

### 开头示例

❌ 不要这样写:
```
SPF records are an essential component of email authentication. 
In this comprehensive guide, we will explore the common causes 
of SPF record errors and provide step-by-step solutions.
```

✅ 这样写:
```
Getting "SPF record not found" errors? Yeah, this one's annoying 
but usually quick to fix.

I see this issue about 3-4 times a week with clients. Nine times 
out of ten, it's one of these three problems...
```

### 技术内容示例

❌ 不要这样写:
```
To configure your SPF record, you need to add a TXT record to your 
DNS configuration. The record should follow the SPF specification 
format, beginning with "v=spf1" followed by the appropriate mechanisms.
```

✅ 这样写:
```
Here's what you need to add to your DNS:

```
v=spf1 include:_spf.google.com -all
```

That's it. Seriously. If you're only using Google Workspace, 
that one line is all you need.

Using something else too? Just add more `include:` statements:

```
v=spf1 include:_spf.google.com include:sendgrid.net -all
```

**One important thing**: you can only have ONE SPF record. 
If you add a second one, both will fail. Ask me how I know. 🙃
```

## 元数据模板

```yaml
---
title: "How to Fix [Problem] - [Quick/Complete] Guide"
slug: "how-to-fix-[problem-slug]"
description: "[Problem] 导致 [后果]. 本文介绍 [N] 个常见原因和具体解决方法."
date: "[YYYY-MM-DD]"
author: "Mike Chen"  # 或 Sarah Kim
category: "Troubleshooting"
tags: ["[tag1]", "[tag2]", "[tag3]"]
readingTime: "[N] min read"
---
```

## 图片使用

### 必须包含
- 问题截图 (错误信息)
- 解决方案截图 (正确配置)

### 可选包含
- 工具诊断结果截图
- 社区相同问题截图 (证明普遍性)

### 图片标注格式
```markdown
![SPF record configuration in Cloudflare DNS](/blog/images/spf-fix/cloudflare-dns.png)
*Cloudflare DNS 面板中添加 SPF 记录*
```

## CTA 策略

### 文章开头 CTA
```markdown
> 💡 **Quick check**: Run your domain through our 
> [free SPF checker](/tools/spf-checker) to see if this is your issue.
```

### 文章结尾 CTA
```markdown
---

Fixed your issue? Great. But SPF is just one piece of the puzzle.

**[Run a full deliverability check →](/)** to make sure your 
DKIM and DMARC are also set up correctly.
```

## 内部链接要求

每篇文章至少包含:
- 1 个工具页面链接
- 1 个相关指南链接
- 1 个首页链接 (CTA)
