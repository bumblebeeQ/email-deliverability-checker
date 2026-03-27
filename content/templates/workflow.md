# EmailDiag 博客内容工作流

## 完整工作流

```
┌─────────────────────────────────────────────────────────────────┐
│                     内容创作工作流                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. 选题阶段                                                     │
│     ├── 自动: 爬取关键词/问题                                    │
│     ├── 自动: 评估搜索量和竞争度                                 │
│     └── 人工: 选择最终选题                                       │
│                                                                 │
│  2. 创作阶段                                                     │
│     ├── 自动: 根据模板生成初稿                                   │
│     ├── 自动: 添加内部链接                                       │
│     └── 人工: 润色、添加个人观点                                 │
│                                                                 │
│  3. 图片阶段                                                     │
│     ├── 人工: 获取真实截图 (Reddit/SO/产品)                      │
│     ├── 自动: 脱敏检查                                           │
│     └── 自动: 压缩优化                                           │
│                                                                 │
│  4. 审核阶段                                                     │
│     ├── 自动: content-safety-review 技能审核                     │
│     ├── 自动: 敏感词检查                                         │
│     ├── 自动: 外链验证                                           │
│     └── 人工: 最终确认                                           │
│                                                                 │
│  5. 发布阶段                                                     │
│     ├── 自动: 生成文章页面                                       │
│     ├── 自动: 更新 sitemap                                       │
│     ├── 自动: 提交 Google Search Console                         │
│     └── 自动: 通知完成                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 阶段 1: 选题

### 数据来源

```yaml
keyword_sources:
  google_trends:
    topics: ["email deliverability", "SPF record", "DKIM", "DMARC", "email spam"]
    frequency: daily
    
  reddit:
    subreddits: ["sysadmin", "email", "webdev", "smallbusiness", "Emailmarketing"]
    search_terms: ["email", "spam", "deliverability", "SPF", "DKIM"]
    sort_by: "new"
    frequency: daily
    
  stackoverflow:
    tags: ["email", "spf", "dkim", "dmarc", "smtp", "email-deliverability"]
    sort_by: "newest"
    frequency: daily
```

### 选题评分

```yaml
scoring:
  search_volume:
    high: 5      # >1000 searches/month
    medium: 3    # 100-1000
    low: 1       # <100
    
  competition:
    low: 5       # 容易排名
    medium: 3
    high: 1      # 难以排名
    
  relevance:
    core: 5      # 直接相关 (SPF/DKIM/DMARC)
    related: 3   # 间接相关 (邮件营销)
    peripheral: 1
    
  timeliness:
    breaking: 5  # 新政策/新变化
    evergreen: 3 # 长期有效
    dated: 1     # 过时风险
    
  # 总分 >= 12 进入候选
  threshold: 12
```

## 阶段 2: 内容生成

### Prompt 策略

```yaml
prompt_variation:
  # 为避免 AI 特征，使用多种 prompt 变体
  
  style_modifiers:
    - "Write as if explaining to a junior developer"
    - "Write in a conversational, first-person tone"
    - "Include personal anecdotes where relevant"
    - "Be opinionated - recommend specific solutions"
    
  structure_variations:
    - "Start with the solution, then explain why"
    - "Start with a story or problem scenario"
    - "Start with a surprising statistic"
    
  randomize:
    paragraph_length: true    # 段落长度随机
    list_item_count: true     # 列表项数量随机
    example_detail: true      # 示例详细程度随机
```

### 人类化处理

```yaml
humanization:
  # 添加不完美
  imperfections:
    - occasional_contractions: true    # 使用缩写 (don't, it's)
    - sentence_fragments: occasional   # 偶尔的不完整句
    - casual_expressions: true         # 口语化表达
    
  # 删除 AI 特征
  remove_patterns:
    - "In conclusion"
    - "Furthermore"
    - "It is important to note"
    - "As mentioned earlier"
    - "Let's dive in"
    - "Without further ado"
    - 过于对称的列表结构
    
  # 添加人类特征
  add_patterns:
    - "Here's the thing..."
    - "Look, I'll be honest..."
    - "Quick note:"
    - "Honestly?"
    - "...if that makes sense"
```

## 阶段 3: 图片处理

### 脱敏规则

```yaml
pii_detection:
  patterns:
    email: '\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    ip_v4: '\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b'
    username: '@\w+'
    domain: '(?!example\.com|test\.com)[a-z0-9-]+\.(com|net|org|io)'
    
  actions:
    blur: true          # 模糊处理
    replace: true       # 替换为示例值
    flag_for_review: true
```

### 压缩规则

```yaml
image_optimization:
  format: webp
  max_width: 800
  max_height: 600
  quality: 85
  max_file_size_kb: 100
```

## 阶段 4: 安全审核

### 必须通过的检查

```yaml
required_checks:
  legal:
    - no_copyright_infringement
    - no_trademark_violation
    - no_false_claims
    - privacy_compliant
    
  platform:
    - google_guidelines_compliant
    - no_hidden_content
    - no_keyword_stuffing
    - no_cloaking
    
  content:
    - factually_accurate
    - no_harmful_advice
    - professional_tone
    
  technical:
    - all_links_valid
    - no_malicious_content
    - proper_encoding
```

### 审核输出

```yaml
review_output:
  status: ["pass", "needs_revision", "reject"]
  
  pass_requirements:
    legal_checks: 100%
    platform_checks: 100%
    content_checks: 90%
    
  report_format:
    - overall_status
    - detailed_findings
    - revision_suggestions
    - risk_warnings
```

## 阶段 5: 发布

### 发布检查

```yaml
pre_publish:
  - file_created: "src/app/blog/[slug]/page.tsx"
  - images_in_place: "public/blog/images/[slug]/"
  - sitemap_entry: true
  - no_broken_links: true
  
post_publish:
  - page_accessible: true
  - google_indexed: pending  # 需要时间
  - social_shared: optional
```

### 通知

```yaml
notifications:
  on_publish:
    - 飞书通知
    - 发布日志更新
    
  on_issue:
    - 飞书告警
    - 详细错误信息
```
