# 案例分析型模板

## 适用场景
- 真实问题诊断过程
- 客户成功案例
- 常见问题模式总结

## 文章结构

```
1. 问题引入 (100-150字)
   - 客户遇到的问题 (脱敏描述)
   - 问题的严重性/影响

2. 背景信息 (100-200字)
   - 客户类型 (SaaS/电商/etc)
   - 发送规模
   - 使用的工具/服务

3. 诊断过程 (主体，500-800字)
   - 检查步骤
   - 发现的问题
   - 分析思路
   - 包含真实截图/数据

4. 解决方案 (300-500字)
   - 具体做了什么
   - 实施步骤
   - 遇到的坑

5. 结果 (100-150字)
   - 改善数据
   - 时间线

6. 经验总结 (100-200字)
   - 可复用的教训
   - 预防建议
```

## 写作风格

### 开头示例

❌ 不要这样写:
```
A client recently approached us with email deliverability issues.
Their emails were going to spam, affecting their business operations.
We conducted a thorough analysis and implemented several solutions.
```

✅ 这样写:
```
"40% of our transactional emails are going to spam."

That's the message I got from a SaaS founder last month. 
Password reset emails, invoice notifications, onboarding 
sequences — nearly half were hitting spam folders.

Their users were complaining. Support tickets were piling up.
They'd already tried "everything" (spoiler: they hadn't).

Here's how we diagnosed and fixed it in 3 days.
```

### 诊断过程示例

❌ 不要这样写:
```
We checked the SPF record and found it was misconfigured.
We then checked the DKIM signature and found issues.
The DMARC policy was also not properly set up.
```

✅ 这样写:
```
## Step 1: The usual suspects

First thing I always check: authentication records.

**SPF**: ✅ Looked fine at first glance

```
v=spf1 include:_spf.google.com include:sendgrid.net ~all
```

Wait. `~all`? That's a soft fail. Not ideal, but usually 
not a spam death sentence.

**DKIM**: ⚠️ Here's problem #1

SendGrid was set up, but... they were sending from 
`notifications.theirapp.com`, and DKIM was only configured 
for `theirapp.com`. Classic subdomain oversight.

[截图: DKIM 检查结果显示签名失败]

**DMARC**: ❌ Nonexistent

No DMARC record at all. This was a bigger deal than it 
sounds — Gmail's been getting stricter about this since 2024.
```

### 结果展示示例

❌ 不要这样写:
```
After implementing the changes, the deliverability improved 
significantly. The spam rate decreased and customer complaints 
were reduced.
```

✅ 这样写:
```
## The results

Changes went live on a Tuesday. Here's what happened:

| Metric | Before | After (2 weeks) |
|--------|--------|-----------------|
| Inbox placement | 58% | 94% |
| Spam rate | 40% | 4% |
| Support tickets (email-related) | ~15/day | 2/day |

[截图: 邮件分析工具显示的改善趋势]

The remaining 4% spam? Mostly Outlook corporate accounts 
with aggressive filters. Some battles you can't win.
```

## 元数据模板

```yaml
---
title: "How We Fixed [问题] for a [客户类型] ([N]% 改善)"
slug: "case-study-[slug]"
description: "[客户类型] 的 [问题] 导致 [后果]. 本文详解诊断和解决过程."
date: "[YYYY-MM-DD]"
author: "Mike Chen"  # 案例分析适合 Mike
category: "Case Study"
tags: ["case study", "[问题类型]", "[行业]"]
readingTime: "[N] min read"
---
```

## 图片要求

### 必须包含
- 问题诊断截图 (工具输出)
- 解决前后对比数据

### 可选包含
- 配置修改截图
- 邮件头分析截图
- 时间线图表

### 脱敏要求
```
必须脱敏:
- 公司真实名称 → "一家 SaaS 公司"
- 域名 → "theirapp.com" 或 "example.com"
- 用户邮箱 → "user@example.com"
- IP 地址 → 部分遮挡或替换

可以保留:
- 行业类型
- 公司规模范围 (如 "10-50人团队")
- 发送量级 (如 "日发送 5 万封")
- 改善百分比
```

## CTA 策略

```markdown
---

## 你的情况类似吗？

这个案例的核心问题是 DKIM 子域名配置 + 缺少 DMARC。
说实话，我遇到的案例里大概 30% 都是这个组合。

**[跑一下免费检测 →](/)** 看看你有没有同样的问题。

如果你看到 DKIM 或 DMARC 那里是红色的... 
嗯，你知道该怎么做了。
```

## 案例来源

### 可用的真实案例来源
1. 自己的使用经验
2. Reddit/Stack Overflow 上的问题 (重新包装，脱敏)
3. 行业报告中的统计案例
4. 开源项目的 issue 讨论

### 不可用
- 虚构的完美案例
- 无法验证的数据
- 暗示与真实公司有业务关系 (除非真的有)
