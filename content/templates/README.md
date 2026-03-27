# EmailDiag Blog 内容模板系统

## 模板类型

### 1. 问题解答型 (How-to)
**文件**: `template-howto.md`
**适用**: 用户常见问题、技术教程
**示例**: "How to Fix SPF Record Not Found Error"

### 2. 深度指南型 (Complete Guide)
**文件**: `template-guide.md`
**适用**: 综合性话题、入门指南
**示例**: "Complete Guide to Email Authentication in 2026"

### 3. 对比分析型 (Comparison)
**文件**: `template-comparison.md`
**适用**: 工具对比、方案选择
**示例**: "SendGrid vs Mailgun: Which is Better for Deliverability?"

### 4. 案例分析型 (Case Study)
**文件**: `template-casestudy.md`
**适用**: 真实案例、问题诊断
**示例**: "How We Fixed a 40% Spam Rate for a SaaS Company"

---

## 作者人设

### 作者 1: Mike Chen
- **背景**: 10年邮件系统运维经验，前 Google 邮件反垃圾团队
- **风格**: 技术深入、直接、偶尔吐槽
- **常用表达**: 
  - "Here's the thing..."
  - "I've seen this a hundred times..."
  - "Look, I'll be honest..."
  - 使用具体数字和技术细节

### 作者 2: Sarah Kim  
- **背景**: 8年数字营销经验，专注邮件营销
- **风格**: 友好、实用、注重ROI
- **常用表达**:
  - "Let me walk you through..."
  - "The good news is..."
  - "Here's what worked for my clients..."
  - 注重商业影响和解决方案

---

## 图片策略

### 允许使用的图片类型

1. **产品截图**
   - EmailDiag 工具界面截图
   - Gmail/Outlook 等公开界面截图 (合理使用)
   - DNS 配置界面截图

2. **社区真实问题截图**
   - Reddit 问题截图 (脱敏用户名)
   - Stack Overflow 问题截图
   - Twitter/X 公开讨论截图
   - 需标注来源

3. **数据图表**
   - 自制统计图表
   - 公开数据的可视化

4. **示意图**
   - 流程图 (可用 Excalidraw/Mermaid)
   - 架构图
   - 对比表格

### 图片命名规范

```
/public/blog/images/
├── [article-slug]/
│   ├── hero.png           # 头图 (如需要)
│   ├── screenshot-01.png  # 产品截图
│   ├── reddit-question.png # 社区截图
│   └── diagram-flow.png   # 流程图
```

### 图片处理要求

- 脱敏: 模糊用户名、邮箱、IP 地址
- 压缩: 使用 WebP 格式，<100KB
- 尺寸: 最大宽度 800px
- Alt 文本: 必须提供描述性 alt

---

## 内容发布清单

### 发布前检查

```
□ 内容通过 content-safety-review 审核
□ 图片已压缩和脱敏
□ 外链已验证可访问
□ 代码块已测试可运行
□ meta 信息完整 (title, description, keywords)
□ 内部链接已添加 (工具页面、相关文章)
□ CTA 明确且自然
```

### 发布后检查

```
□ 页面可正常访问
□ 移动端显示正常
□ 图片加载正常
□ sitemap 已更新
□ Google Search Console 已提交
```
