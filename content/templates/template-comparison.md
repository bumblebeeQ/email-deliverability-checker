# 对比分析型模板

## 适用场景
- 工具/服务对比
- 方案选择指导
- 技术选型

## 文章结构

```
1. 开头 (100-150字)
   - 说明对比的意义
   - 简短预告结论 (不要藏着掖着)

2. TL;DR 快速对比表 (放在开头!)
   - 核心差异一目了然
   - 让读者快速判断是否需要继续读

3. 详细对比 (每个维度 150-300字)
   - 3-5 个对比维度
   - 每个维度有明确"胜者"
   - 用真实数据/体验支撑

4. 适用场景推荐
   - 什么情况用 A
   - 什么情况用 B
   - 什么情况都行

5. 作者观点
   - 个人推荐 (带理由)
   - 不要中立骑墙

6. 结尾
   - CTA (通常是 "不管选哪个，先检查配置")
```

## 写作风格

### 开头示例

❌ 不要这样写:
```
SendGrid and Mailgun are both popular email delivery services. 
In this article, we will compare their features, pricing, and 
deliverability to help you make an informed decision.
```

✅ 这样写:
```
SendGrid vs Mailgun — which one actually delivers better?

**Short answer**: For most people, SendGrid. But if you're a 
developer who wants more control and doesn't mind a steeper 
learning curve, Mailgun's worth a look.

Let me break down why.
```

### 对比表示例

❌ 不要这样写:
```markdown
| Feature | SendGrid | Mailgun |
|---------|----------|---------|
| Pricing | Various plans | Various plans |
| API | Good | Good |
| Support | Available | Available |
```

✅ 这样写:
```markdown
## The TL;DR

| If you want... | Go with |
|----------------|---------|
| Easiest setup | **SendGrid** |
| Best free tier | **Mailgun** (5,000/mo) |
| Marketing + transactional | **SendGrid** |
| Pure API, no fluff | **Mailgun** |
| Better docs | Tie |
| Enterprise support | **SendGrid** |

Still here? Alright, let's dig into the details.
```

### 对比维度示例

❌ 不要这样写:
```
### Pricing

SendGrid offers multiple pricing tiers starting from free.
Mailgun also offers multiple pricing tiers starting from free.
Both services provide good value for their respective price points.
```

✅ 这样写:
```
### Pricing: Mailgun wins (barely)

**Mailgun**: 5,000 emails/month free, then $0.80/1,000
**SendGrid**: 100 emails/day free (~3,000/mo), then $0.65/1,000

At first glance, Mailgun's free tier is better. But here's 
the thing — SendGrid's free tier includes their marketing 
tools. Mailgun's is API-only.

If you're sending 10,000 emails a month, you're looking at:
- Mailgun: ~$4/month
- SendGrid: ~$6.50/month

Not a dealbreaker either way. **Winner: Mailgun** for pure 
transactional, **SendGrid** if you need marketing features.
```

## 元数据模板

```yaml
---
title: "[A] vs [B]: [核心问题] ([Year])"
slug: "[a]-vs-[b]-[focus]"
description: "[A] 和 [B] 哪个更好? 从 [维度1]、[维度2]、[维度3] 等方面详细对比."
date: "[YYYY-MM-DD]"
author: "Sarah Kim"  # 对比文章适合 Sarah
category: "Comparison"
tags: ["[A]", "[B]", "comparison", "[领域]"]
readingTime: "[N] min read"
---
```

## 图片使用

### 必须包含
- 两个产品/服务的 logo 或界面截图
- 对比表格截图 (如果表格复杂)

### 可选包含
- 价格计算对比图
- 功能矩阵图
- 用户评价截图

## 避免的问题

1. **不要过于中立**
   - 读者来找对比是为了做决定
   - 给出明确推荐

2. **不要对比太多东西**
   - 2-3 个对比对象最佳
   - 超过 4 个会让读者困惑

3. **不要只对比功能列表**
   - 要有实际使用体验
   - 要有具体场景建议

4. **不要忽略缺点**
   - 每个选项都说优缺点
   - 更显公正可信

## CTA 策略

```markdown
---

## 最后一件事

不管你选 SendGrid 还是 Mailgun，如果配置不对，邮件照样进垃圾箱。

**[检查你的邮件配置 →](/)** — 确保 SPF、DKIM、DMARC 都设置正确。

只需要 10 秒钟，免费。
```
