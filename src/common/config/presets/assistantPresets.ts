import type { PresetAgentType } from '@/common/types/acpTypes';

export type AssistantPreset = {
  id: string;
  avatar: string;
  presetAgentType?: PresetAgentType;
  /**
   * Directory containing all resources for this preset (relative to project root).
   * If set, both ruleFiles and skillFiles will be resolved from this directory.
   * Default: rules/ for rules, skills/ for skills
   */
  resourceDir?: string;
  ruleFiles: Record<string, string>;
  skillFiles?: Record<string, string>;
  /**
   * Default enabled skills for this assistant (skill names from skills/ directory).
   * 此助手默认启用的技能列表（来自 skills/ 目录的技能名称）
   */
  defaultEnabledSkills?: string[];
  nameI18n: Record<string, string>;
  descriptionI18n: Record<string, string>;
  promptsI18n?: Record<string, string[]>;
};

export const ASSISTANT_PRESETS: AssistantPreset[] = [
  {
    id: 'word-creator',
    avatar: '📝',
    presetAgentType: 'gemini',
    resourceDir: 'src/process/resources/assistant/word-creator',
    ruleFiles: {
      'en-US': 'word-creator.md',
      'zh-CN': 'word-creator.zh-CN.md',
    },
    defaultEnabledSkills: ['officecli-docx'],
    nameI18n: {
      'en-US': 'Word Creator',
      'zh-CN': 'Word 文档助手',
      'ru-RU': 'Помощник Word',
    },
    descriptionI18n: {
      'en-US':
        'Create, edit, and analyze professional Word documents with officecli. Reports, proposals, letters, memos, and more.',
      'zh-CN': '使用 officecli 创建、编辑和分析专业 Word 文档。报告、方案、信函、备忘录等。',
      'ru-RU':
        'Создаёт, редактирует и анализирует профессиональные документы Word с помощью officecli: отчёты, предложения, письма, служебные записки и другое.',
    },
    promptsI18n: {
      'en-US': [
        'Create a Q1 2026 quarterly report with TOC, financial highlights table, revenue trend chart, and KPI metrics section',
        'Write an academic research paper on machine learning with LaTeX equations, citations, data tables, and bibliography',
        'Create a project status report with DRAFT watermark, color-coded status table, and a Gantt timeline in landscape section',
      ],
      'zh-CN': [
        '创建一份 2026 年 Q1 季度报告，包含目录、财务亮点表格、营收趋势图和 KPI 指标',
        '写一篇关于机器学习的学术论文，包含 LaTeX 公式、引用、数据表格和参考文献',
        '创建一份项目状态报告，带 DRAFT 水印、彩色状态表格和横向甘特图时间线',
      ],
    },
  },
  {
    id: 'ppt-creator',
    avatar: '📊',
    presetAgentType: 'gemini',
    resourceDir: 'src/process/resources/assistant/ppt-creator',
    ruleFiles: {
      'en-US': 'ppt-creator.md',
      'zh-CN': 'ppt-creator.zh-CN.md',
    },
    defaultEnabledSkills: ['officecli-pptx'],
    nameI18n: {
      'en-US': 'PPT Creator',
      'zh-CN': 'PPT 演示助手',
      'ru-RU': 'Помощник PPT',
    },
    descriptionI18n: {
      'en-US':
        'Create, edit, and analyze professional PowerPoint presentations with officecli. Bold designs, varied layouts, and visual impact.',
      'zh-CN': '使用 officecli 创建、编辑和分析专业 PPT 演示文稿。大胆设计、丰富版式、视觉冲击。',
      'ru-RU':
        'Создаёт, редактирует и анализирует профессиональные презентации PowerPoint с помощью officecli: выразительный дизайн, разнообразные макеты и сильная визуальная подача.',
    },
    promptsI18n: {
      'en-US': [
        'Create a 10-slide Kubernetes migration proposal with architecture comparison, cost analysis, and migration timeline',
        'Create a 10-slide SaaS analytics dashboard for a project management tool with user growth charts, conversion funnel, and competitive landscape',
        'Create a 10-slide fintech product roadmap for a digital payment platform with user growth trajectory and investment analysis',
      ],
      'zh-CN': [
        '做一份 10 页的 Kubernetes 迁移方案 PPT，包含架构对比、成本分析和迁移时间线',
        '做一份 10 页的 SaaS 产品数据看板 PPT，包含用户增长图表、转化漏斗和竞品分析',
        '做一份 10 页的金融科技产品路线图 PPT，包含用户增长趋势和投资分析',
      ],
    },
  },
  {
    id: 'excel-creator',
    avatar: '📈',
    presetAgentType: 'gemini',
    resourceDir: 'src/process/resources/assistant/excel-creator',
    ruleFiles: {
      'en-US': 'excel-creator.md',
      'zh-CN': 'excel-creator.zh-CN.md',
    },
    defaultEnabledSkills: ['officecli-xlsx'],
    nameI18n: {
      'en-US': 'Excel Creator',
      'zh-CN': 'Excel 表格助手',
      'ru-RU': 'Помощник Excel',
    },
    descriptionI18n: {
      'en-US':
        'Create, edit, and analyze professional Excel spreadsheets with officecli. Financial models, dashboards, trackers, and data analysis.',
      'zh-CN': '使用 officecli 创建、编辑和分析专业 Excel 表格。财务模型、数据看板、追踪表和数据分析。',
      'ru-RU':
        'Создаёт, редактирует и анализирует профессиональные таблицы Excel с помощью officecli: финансовые модели, дашборды, трекеры и анализ данных.',
    },
    promptsI18n: {
      'en-US': [
        'Build a 3-sheet financial dashboard with income statement, revenue breakdown chart, and conditional formatting for variances',
        'Create a sales pipeline tracker with deal stages, weighted pipeline formulas, funnel chart, and rep performance scorecards',
        'Create a budget tracker with cross-sheet variance formulas, budget vs actuals bar chart, and color-coded over-budget highlights',
      ],
      'zh-CN': [
        '创建一个 3 页的财务看板，包含利润表、营收分布图和差异条件格式',
        '创建一个销售管道追踪表，包含阶段统计、加权管道公式、漏斗图和销售代表业绩看板',
        '创建一个预算追踪表，包含跨表差异公式、预算对比柱状图和超支红色高亮',
      ],
    },
  },
  {
    id: 'morph-ppt',
    avatar: '✨',
    presetAgentType: 'gemini',
    resourceDir: 'src/process/resources/assistant/morph-ppt',
    ruleFiles: {
      'en-US': 'morph-ppt.md',
      'zh-CN': 'morph-ppt.zh-CN.md',
    },
    defaultEnabledSkills: ['morph-ppt'],
    nameI18n: {
      'en-US': 'Morph PPT',
      'zh-CN': 'Morph PPT',
      'ru-RU': 'Morph PPT',
    },
    descriptionI18n: {
      'en-US':
        'Create professional Morph-animated presentations with officecli. Supports multiple visual styles and end-to-end workflow from topic to polished slides.',
      'zh-CN': '使用 officecli 创建专业的 Morph 动画演示文稿。支持多种视觉风格，从主题到精美幻灯片的端到端工作流。',
      'ru-RU':
        'Создаёт профессиональные презентации с анимацией Morph через officecli. Поддерживает разные визуальные стили и полный цикл от идеи до готовых слайдов.',
    },
    promptsI18n: {
      'en-US': [
        'Pick a fun topic yourself and create a complete PPT',
        'Create the most beautiful PPT you can imagine, topic is up to you',
        'Create a coffee brand introduction PPT with a minimalist premium feel',
      ],
      'zh-CN': [
        '自己想一个有趣的主题，帮我做一份PPT',
        '做一个你认为最好看的 PPT，主题你定',
        '做一份咖啡品牌介绍PPT，要极简高级感',
      ],
    },
  },
  {
    id: 'pitch-deck-creator',
    avatar: '🎯',
    presetAgentType: 'gemini',
    resourceDir: 'src/process/resources/assistant/pitch-deck-creator',
    ruleFiles: {
      'en-US': 'pitch-deck-creator.md',
      'zh-CN': 'pitch-deck-creator.zh-CN.md',
    },
    defaultEnabledSkills: ['officecli-pitch-deck'],
    nameI18n: {
      'en-US': 'Pitch Deck Creator',
      'zh-CN': '路演 PPT 助手',
      'ru-RU': 'Создатель питч-деков',
    },
    descriptionI18n: {
      'en-US':
        'Build investor pitch decks, product launch presentations, and enterprise sales decks with gradient designs, data charts, competitive tables, team slides, and speaker notes. Supports seed to Series A+ decks.',
      'zh-CN':
        '制作投资路演、产品发布和企业销售演示文稿，包含渐变设计、数据图表、竞品表格、团队页和演讲者备注。支持从种子轮到 A 轮及以上的路演。',
      'ru-RU':
        'Создаёт инвесторские питч-деки, презентации запусков и корпоративные продажи: градиентный дизайн, графики, таблицы конкурентов, слайды команды и заметки спикера. Подходит для стадий от seed до Series A и выше.',
    },
    promptsI18n: {
      'en-US': [
        'Create a 12-slide Series A investor deck for a B2B SaaS data pipeline startup with ARR charts, competitive comparison table, team avatars, and financial projections',
        'Create an 8-slide product launch deck for an AI code review tool with 5 feature icons, before/after comparison, customer satisfaction doughnut chart, and 3-tier pricing table',
        'Create a 10-slide enterprise sales deck for a cybersecurity platform with ROI analysis, radar chart vs competitors, financial impact table, and implementation timeline',
      ],
      'zh-CN': [
        '为一个 B2B SaaS 数据管道创业公司制作 12 页 A 轮投资路演，包含 ARR 图表、竞品对比表、团队头像和财务预测',
        '为一个 AI 代码审查工具制作 8 页产品发布演示，包含 5 个功能图标、前后对比、客户满意度环形图和 3 档定价表',
        '为一个网络安全平台制作 10 页企业销售演示，包含 ROI 分析、雷达图竞品对比、财务影响表和实施时间线',
      ],
    },
  },
  {
    id: 'dashboard-creator',
    avatar: '📊',
    presetAgentType: 'gemini',
    resourceDir: 'src/process/resources/assistant/dashboard-creator',
    ruleFiles: {
      'en-US': 'dashboard-creator.md',
      'zh-CN': 'dashboard-creator.zh-CN.md',
    },
    defaultEnabledSkills: ['officecli-data-dashboard'],
    nameI18n: {
      'en-US': 'Dashboard Creator',
      'zh-CN': '数据仪表盘',
      'ru-RU': 'Создатель дашбордов',
    },
    descriptionI18n: {
      'en-US':
        'Turn CSV or tabular data into polished Excel dashboards with KPI cards, charts linked to live data, sparklines, and conditional formatting. Automatically scales complexity to dataset size — from quick summaries to full analytics panels.',
      'zh-CN':
        '将 CSV 或表格数据转化为精美的 Excel 仪表盘，包含 KPI 卡片、关联实时数据的图表、迷你图和条件格式。根据数据量自动缩放复杂度——从简洁汇总到完整分析面板。',
      'ru-RU':
        'Преобразует CSV и табличные данные в аккуратные Excel-дашборды: KPI-карточки, графики с привязкой к данным, спарклайны и условное форматирование. Масштабирует сложность под объём данных - от краткой сводки до полноценной аналитической панели.',
    },
    promptsI18n: {
      'en-US': [
        'Create a SaaS MRR dashboard with 12 months of sample data — show MRR trend, month-over-month growth, and churn breakdown for a board meeting',
        'Build an e-commerce regional sales dashboard with sample data across 5 regions: revenue by region, weekly trends, and category split',
        'Make a budget-vs-actuals dashboard for 8 departments showing variance indicators and over/under-budget status',
      ],
      'zh-CN': [
        '做一个 SaaS MRR 仪表盘，用 12 个月的示例数据，展示 MRR 趋势、环比增长和流失分析，适合董事会汇报',
        '做一个电商区域销售仪表盘，生成 5 个区域的示例数据，展示按区域收入、周趋势和品类占比',
        '做一个 8 个部门的预算 vs 实际仪表盘，展示偏差指标和超支/节余状态',
      ],
    },
  },
  {
    id: 'academic-paper',
    avatar: '📚',
    presetAgentType: 'gemini',
    resourceDir: 'src/process/resources/assistant/academic-paper',
    ruleFiles: {
      'en-US': 'academic-paper.md',
      'zh-CN': 'academic-paper.zh-CN.md',
    },
    defaultEnabledSkills: ['officecli-academic-paper'],
    nameI18n: {
      'en-US': 'Academic Paper',
      'zh-CN': '学术论文助手',
      'ru-RU': 'Помощник по академическим работам',
    },
    descriptionI18n: {
      'en-US':
        'Create formally structured academic papers, research papers, and white papers with native Word TOC, LaTeX-to-OMML equations, scholarly bibliography (APA/Physics/Chicago), footnotes, multi-column layouts, and paper-type-specific styling.',
      'zh-CN':
        '创建正式结构的学术论文、研究论文和白皮书，支持原生 Word 目录、LaTeX 转 OMML 公式、学术参考文献（APA/物理/芝加哥格式）、脚注、多栏排版和论文类型专属样式。',
      'ru-RU':
        'Создаёт академические статьи, научные работы и white paper со строгой структурой: нативное оглавление Word, формулы LaTeX в OMML, библиография в форматах APA/Physics/Chicago, сноски, многоколоночная вёрстка и стили под тип работы.',
    },
    promptsI18n: {
      'en-US': [
        'Create a white paper on rural EV charging infrastructure with executive summary, data tables, footnotes, CONFIDENTIAL watermark, and professional headers',
        'Write a physics paper on topological insulators with display equations, multi-column abstract, theorem/definition blocks, and landscape figures',
        'Create an APA-style research paper on organizational culture with 3 data tables, endnotes, 15 references with hanging indent, and double spacing',
      ],
      'zh-CN': [
        '创建一份农村电动汽车充电基础设施白皮书，包含执行摘要、数据表格、脚注、CONFIDENTIAL 水印和专业页头',
        '写一篇拓扑绝缘体物理论文，包含展示式公式、多栏摘要、定理/定义模块和横向图表',
        '创建一份 APA 格式的组织文化研究论文，包含 3 个数据表格、尾注、15 条挂缩进参考文献和双倍行距',
      ],
    },
  },
  {
    id: 'financial-model-creator',
    avatar: '💰',
    presetAgentType: 'gemini',
    resourceDir: 'src/process/resources/assistant/financial-model-creator',
    ruleFiles: {
      'en-US': 'financial-model-creator.md',
      'zh-CN': 'financial-model-creator.zh-CN.md',
    },
    defaultEnabledSkills: ['officecli-financial-model'],
    nameI18n: {
      'en-US': 'Financial Model Creator',
      'zh-CN': '财务建模助手',
      'ru-RU': 'Создатель финансовых моделей',
    },
    descriptionI18n: {
      'en-US':
        'Build formula-driven financial models from text prompts: 3-statement models, DCF valuations, cap tables, scenario analyses, sensitivity tables, and debt schedules. All values flow from assumptions through interconnected formula chains.',
      'zh-CN':
        '根据文本描述构建公式驱动的财务模型：三表联动、DCF 估值、股权表、情景分析、敏感性分析和债务计划。所有数值通过公式链从假设条件层层推导。',
      'ru-RU':
        'Строит финансовые модели на основе текстового запроса: три финансовые формы, DCF-оценка, cap table, сценарный анализ, таблицы чувствительности и долговые графики. Все значения выводятся через связные формульные цепочки от исходных предположений.',
    },
    promptsI18n: {
      'en-US': [
        'Build a 3-year SaaS financial model with income statement, balance sheet, cash flow, and dashboard charts',
        'Create a DCF valuation for a manufacturing company with WACC calculation and sensitivity table',
        'Build a cap table with seed and Series A rounds, liquidation preferences, and exit waterfall analysis',
      ],
      'zh-CN': [
        '搭建一个 3 年期 SaaS 财务模型，包含利润表、资产负债表、现金流量表和看板图表',
        '为制造业公司创建 DCF 估值模型，包含 WACC 计算和敏感性分析表',
        '搭建股权表，包含种子轮和 A 轮融资、清算优先权和退出瀑布分析',
      ],
    },
  },
  // Removed: star-office-helper, openclaw-setup (not relevant for legal workspace)
  {
    id: 'cowork',
    avatar: 'cowork.svg',
    presetAgentType: 'gemini',
    resourceDir: 'src/process/resources/assistant/cowork',
    ruleFiles: {
      'en-US': 'cowork.md',
      'zh-CN': 'cowork.md', // 使用同一个文件，内容已精简 / Use same file, content is simplified
    },
    skillFiles: {
      'en-US': 'cowork-skills.md',
      'zh-CN': 'cowork-skills.zh-CN.md',
    },
    defaultEnabledSkills: ['skill-creator', 'officecli-pptx', 'officecli-docx', 'pdf', 'officecli-xlsx'],
    nameI18n: {
      'en-US': 'Cowork',
      'zh-CN': 'Cowork',
      'ru-RU': 'Cowork',
    },
    descriptionI18n: {
      'en-US': 'Autonomous task execution with file operations, document processing, and multi-step workflow planning.',
      'zh-CN': '具有文件操作、文档处理和多步骤工作流规划的自主任务执行助手。',
      'ru-RU':
        'Автономный помощник для выполнения задач с работой с файлами, обработкой документов и многошаговым планированием.',
    },
    promptsI18n: {
      'en-US': [
        'Analyze the current project structure and suggest improvements',
        'Automate the build and deployment process',
        'Extract and summarize key information from all PDF files',
      ],
      'zh-CN': ['分析当前项目结构并建议改进方案', '自动化构建和部署流程', '提取并总结所有 PDF 文件的关键信息'],
    },
  },
  // Deprecated: replaced by ppt-creator (officecli-based)
  // {
  //   id: 'pptx-generator',
  //   avatar: '📊',
  //   presetAgentType: 'gemini',
  //   resourceDir: 'src/process/resources/assistant/pptx-generator',
  //   ruleFiles: {
  //     'en-US': 'pptx-generator.md',
  //     'zh-CN': 'pptx-generator.zh-CN.md',
  //   },
  //   nameI18n: {
  //     'en-US': 'PPTX Generator',
  //     'zh-CN': 'PPTX 生成器',
  //   },
  //   descriptionI18n: {
  //     'en-US': 'Generate local PPTX assets and structure for pptxgenjs.',
  //     'zh-CN': '生成本地 PPTX 资产与结构（pptxgenjs）。',
  //   },
  //   promptsI18n: {
  //     'en-US': [
  //       'Create a professional slide deck about AI trends with 10 slides',
  //       'Generate a quarterly business report presentation',
  //       'Make a product launch presentation with visual elements',
  //     ],
  //     'zh-CN': ['创建一个包含 10 页的专业 AI 趋势幻灯片', '生成季度业务报告演示文稿', '制作包含视觉元素的产品发布演示'],
  //   },
  // },
  // Deprecated: replaced by ppt-creator (officecli-based)
  // {
  //   id: 'pdf-to-ppt',
  //   avatar: '📄',
  //   presetAgentType: 'gemini',
  //   resourceDir: 'src/process/resources/assistant/pdf-to-ppt',
  //   ruleFiles: {
  //     'en-US': 'pdf-to-ppt.md',
  //     'zh-CN': 'pdf-to-ppt.zh-CN.md',
  //   },
  //   nameI18n: {
  //     'en-US': 'PDF to PPT',
  //     'zh-CN': 'PDF 转 PPT',
  //   },
  //   descriptionI18n: {
  //     'en-US': 'Convert PDF to PPT with watermark removal rules.',
  //     'zh-CN': 'PDF 转 PPT 并去除水印规则',
  //   },
  //   promptsI18n: {
  //     'en-US': [
  //       'Convert report.pdf to a PowerPoint presentation',
  //       'Extract all charts and diagrams from whitepaper.pdf',
  //       'Transform this PDF document into slides with proper formatting',
  //     ],
  //     'zh-CN': [
  //       '将 report.pdf 转换为 PowerPoint 演示文稿',
  //       '从白皮书提取所有图表和示意图',
  //       '将此 PDF 文档转换为格式正确的幻灯片',
  //     ],
  //   },
  // },
  // Removed: game-3d (not relevant for legal workspace)
  {
    id: 'ui-ux-pro-max',
    avatar: '🎨',
    presetAgentType: 'gemini',
    resourceDir: 'src/process/resources/assistant/ui-ux-pro-max',
    ruleFiles: {
      'en-US': 'ui-ux-pro-max.md',
      'zh-CN': 'ui-ux-pro-max.zh-CN.md',
    },
    nameI18n: {
      'en-US': 'UI/UX Pro Max',
      'zh-CN': 'UI/UX 专业设计师',
      'ru-RU': 'UI/UX Pro Max',
    },
    descriptionI18n: {
      'en-US':
        'Professional UI/UX design intelligence with 57 styles, 95 color palettes, 56 font pairings, and stack-specific best practices.',
      'zh-CN': '专业 UI/UX 设计智能助手，包含 57 种风格、95 个配色方案、56 个字体配对及技术栈最佳实践。',
      'ru-RU':
        'Профессиональный UI/UX-помощник с 57 стилями, 95 цветовыми палитрами, 56 сочетаниями шрифтов и лучшими практиками для разных стеков.',
    },
    promptsI18n: {
      'en-US': [
        'Design a modern login page for a fintech mobile app',
        'Create a color palette for a nature-themed website',
        'Design a dashboard interface for a SaaS product',
      ],
      'zh-CN': ['为金融科技移动应用设计现代登录页', '创建自然主题网站的配色方案', '为 SaaS 产品设计仪表板界面'],
    },
  },
  {
    id: 'planning-with-files',
    avatar: '📋',
    presetAgentType: 'gemini',
    resourceDir: 'src/process/resources/assistant/planning-with-files',
    ruleFiles: {
      'en-US': 'planning-with-files.md',
      'zh-CN': 'planning-with-files.zh-CN.md',
    },
    nameI18n: {
      'en-US': 'Planning with Files',
      'zh-CN': '文件规划助手',
      'ru-RU': 'Планирование с файлами',
    },
    descriptionI18n: {
      'en-US':
        'Manus-style file-based planning for complex tasks. Uses task_plan.md, findings.md, and progress.md to maintain persistent context.',
      'zh-CN': 'Manus 风格的文件规划，用于复杂任务。使用 task_plan.md、findings.md 和 progress.md 维护持久化上下文。',
      'ru-RU':
        'Файловое планирование в стиле Manus для сложных задач. Использует task_plan.md, findings.md и progress.md для сохранения устойчивого контекста.',
    },
    promptsI18n: {
      'en-US': [
        'Plan a comprehensive refactoring task with milestones',
        'Break down the feature implementation into actionable steps',
        'Create a project plan for migrating to a new framework',
      ],
      'zh-CN': ['规划一个包含里程碑的全面重构任务', '将功能实现拆分为可执行的步骤', '创建迁移到新框架的项目计划'],
    },
  },
  // Removed: human-3-coach, social-job-publisher, moltbook (not relevant for legal workspace)
  {
    id: 'beautiful-mermaid',
    avatar: '📈',
    presetAgentType: 'gemini',
    resourceDir: 'src/process/resources/assistant/beautiful-mermaid',
    ruleFiles: {
      'en-US': 'beautiful-mermaid.md',
      'zh-CN': 'beautiful-mermaid.zh-CN.md',
    },
    defaultEnabledSkills: ['mermaid'],
    nameI18n: {
      'en-US': 'Beautiful Mermaid',
      'zh-CN': 'Beautiful Mermaid',
      'ru-RU': 'Beautiful Mermaid',
    },
    descriptionI18n: {
      'en-US':
        'Create flowcharts, sequence diagrams, state diagrams, class diagrams, and ER diagrams with beautiful themes.',
      'zh-CN': '创建流程图、时序图、状态图、类图和 ER 图，支持多种精美主题。',
      'ru-RU': 'Создаёт блок-схемы, sequence-, state-, class- и ER-диаграммы с красивыми темами оформления.',
    },
    promptsI18n: {
      'en-US': [
        'Draw a detailed user login authentication flowchart',
        'Create an API sequence diagram for payment processing',
        'Create a system architecture diagram',
      ],
      'zh-CN': ['绘制详细的用户登录认证流程图', '创建支付处理的 API 时序图', '创建系统架构图'],
    },
  },
  // Removed: story-roleplay (not relevant for legal workspace)
  // {
  //   id: 'story-roleplay',
  // (story-roleplay removed)
  // ── Mithril Law Legal Assistants ──────────────────────────────────
  {
    id: 'mithril-general',
    avatar: '🛡️',
    resourceDir: 'src/process/resources/assistant/mithril-general',
    ruleFiles: {
      'en-US': 'mithril-general.md',
    },
    defaultEnabledSkills: ['officecli-docx'],
    nameI18n: {
      'en-US': 'Mithril General',
    },
    descriptionI18n: {
      'en-US':
        'General-purpose legal AI assistant for Mithril Law. Draft documents, conduct research, calculate deadlines, and manage matters.',
    },
    promptsI18n: {
      'en-US': [
        'Draft a demand letter for breach of contract — the other party owes $15,000 for unpaid invoices',
        'What are the limitation periods for filing a wrongful dismissal claim in Ontario?',
        'Analyze this employment contract and flag any concerning clauses',
      ],
    },
  },
  {
    id: 'contract-drafter',
    avatar: '📜',
    resourceDir: 'src/process/resources/assistant/contract-drafter',
    ruleFiles: {
      'en-US': 'contract-drafter.md',
    },
    defaultEnabledSkills: ['officecli-docx'],
    nameI18n: {
      'en-US': 'Contract Drafter',
    },
    descriptionI18n: {
      'en-US':
        'Draft professional legal agreements — retainer letters, demand letters, NDAs, service agreements, and more. Ontario law compliant.',
    },
    promptsI18n: {
      'en-US': [
        'Draft a retainer agreement for a small claims matter — $3,500 flat fee, scope limited to trial',
        'Create an NDA for a tech startup protecting trade secrets and client lists',
        'Write a demand letter for $12,000 in unpaid freelance design work',
      ],
    },
  },
  {
    id: 'case-researcher',
    avatar: '🔍',
    resourceDir: 'src/process/resources/assistant/case-researcher',
    ruleFiles: {
      'en-US': 'case-researcher.md',
    },
    nameI18n: {
      'en-US': 'Case Researcher',
    },
    descriptionI18n: {
      'en-US':
        'Legal research specialist — finds relevant case law, analyzes statutes, and produces professional research memoranda with proper citations.',
    },
    promptsI18n: {
      'en-US': [
        'Research the enforceability of non-compete clauses in Ontario employment contracts post-Working for Workers Act',
        'Find leading cases on constructive dismissal damages calculation in Ontario',
        'What is the legal test for summary judgment under Rule 20 of the Rules of Civil Procedure?',
      ],
    },
  },
  {
    id: 'court-form-filler',
    avatar: '⚖️',
    resourceDir: 'src/process/resources/assistant/court-form-filler',
    ruleFiles: {
      'en-US': 'court-form-filler.md',
    },
    nameI18n: {
      'en-US': 'Court Form Filler',
    },
    descriptionI18n: {
      'en-US':
        "Prepare Ontario court forms accurately — Small Claims (Form 7A, 9A, 14A), Superior Court (Form 14A, 18A), and more. Includes filing instructions.",
    },
    promptsI18n: {
      'en-US': [
        'Fill out a Small Claims Form 7A Plaintiff\'s Claim for $8,500 in unpaid rent',
        'Prepare a Form 14A Offer to Settle for a small claims dispute at 75% of the claimed amount',
        'What forms do I need to file a defence and defendant\'s claim in Small Claims Court?',
      ],
    },
  },
  {
    id: 'client-intake',
    avatar: '👤',
    resourceDir: 'src/process/resources/assistant/client-intake',
    ruleFiles: {
      'en-US': 'client-intake.md',
    },
    nameI18n: {
      'en-US': 'Client Intake',
    },
    descriptionI18n: {
      'en-US':
        'Structured client intake interviews — gathers contact info, matter details, conflict check data, and generates comprehensive matter summaries.',
    },
    promptsI18n: {
      'en-US': [
        'Start a new client intake for a wrongful dismissal matter',
        'Begin intake for a small claims dispute over a home renovation gone wrong',
        'Generate a client matter summary from intake notes',
      ],
    },
  },
  {
    id: 'deadline-tracker',
    avatar: '⏰',
    resourceDir: 'src/process/resources/assistant/deadline-tracker',
    ruleFiles: {
      'en-US': 'deadline-tracker.md',
    },
    nameI18n: {
      'en-US': 'Deadline Tracker',
    },
    descriptionI18n: {
      'en-US':
        'Calculate limitation periods, filing deadlines, and court timelines. Never miss a critical date — covers Ontario civil, employment, criminal, and administrative law.',
    },
    promptsI18n: {
      'en-US': [
        'My client was terminated on March 15, 2026. What are all the relevant deadlines?',
        'Calculate limitation periods for a breach of contract that occurred on January 10, 2025 but was discovered on June 1, 2025',
        'What are the timelines after filing a Statement of Claim in Superior Court?',
      ],
    },
  },
];
