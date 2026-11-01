import { robinhoodEuroYieldPost } from './robinhood-eur-yield';

export type Localized = { en: string; zh: string };
export type PostLink = { label: Localized; href: string; sponsored?: boolean };
export type PostTable = {
  caption: Localized;
  columns: Localized[];
  rows: {
    id: string;
    cells: { value: Localized; detail?: Localized; date?: Localized }[];
    sources?: PostLink[];
  }[];
  note?: Localized;
};
export type PostSection = {
  id: string;
  title: Localized;
  paragraphs: Localized[];
  bullets?: Localized[];
  afterBullets?: Localized[];
  subtitle?: Localized;
  image?: { src: string; alt: Localized; caption?: Localized; width: number; height: number };
  table?: PostTable;
  links?: PostLink[];
};
export type Post = {
  slug: string;
  title: Localized;
  excerpt: Localized;
  category: 'technology' | 'life';
  tags: string[];
  date: string;
  readTime: number;
  visual: 'platform' | 'home' | 'notes';
  format: Localized;
  affiliate?: boolean;
  affiliateDisclosure?: Localized;
  editorialNote?: Localized;
  body: PostSection[];
};

export const topics = ['ai', 'cloud', 'backend', 'kubernetes', 'germany', 'banking', 'savings', 'housing', 'mortgage', 'kitchen'];
export const topicLabels: Record<string, Localized> = {
  ai: { en: 'AI', zh: 'AI' }, cloud: { en: 'Cloud', zh: '云计算' },
  backend: { en: 'Backend', zh: '后端' }, kubernetes: { en: 'Kubernetes', zh: 'Kubernetes' },
  germany: { en: 'Germany', zh: '德国生活' }, banking: { en: 'Banking', zh: '银行' },
  savings: { en: 'Savings & MMF', zh: '存款与货币基金' }, housing: { en: 'Housing', zh: '买房' },
  mortgage: { en: 'Mortgage', zh: '房贷' }, kitchen: { en: 'Kitchen', zh: '厨房' },
};

export const posts: Post[] = [
  robinhoodEuroYieldPost,
  {
    slug: 'from-prototype-to-platform',
    title: { en: 'From prototype to platform.', zh: '从原型，到可靠的平台。' },
    excerpt: { en: 'A practical starting point for AI applications: clear boundaries, observable systems, and room to grow.', zh: 'AI 应用的起点：清晰的边界、可观测的系统，以及持续演进的空间。' },
    category: 'technology', tags: ['ai', 'cloud', 'backend', 'kubernetes'], date: '2026-11-01', readTime: 4,
    visual: 'platform', format: { en: 'Field guide', zh: '技术文章' },
    body: [
      {
        id: 'start-with-the-boundary', title: { en: 'Start with the boundary.', zh: '先明确系统的边界。' },
        paragraphs: [
          { en: 'An AI demo can begin with a prompt and a model call. A useful application needs a little more structure: a defined input, an expected result, and a way to tell whether that result is good enough. Before adding infrastructure, write down what the system should do—and what a human should still decide.', zh: '一个 AI 演示可以从一条提示词和一次模型调用开始。一个实用的应用还需要明确输入、预期结果，以及判断结果是否足够好的方法。在增加基础设施之前，先写下系统应该完成什么，以及哪些决定仍应由人来做。' },
          { en: 'Keep the application boundary explicit. Validate incoming data, check access before retrieving private material, and treat generated output as data to validate. A small representative evaluation set makes changes to prompts, models, and retrieval easier to compare.', zh: '让应用边界保持清晰：验证输入数据，在检索私人资料前检查权限，并把模型输出当作需要验证的数据。一小组具有代表性的评测样本，能帮助比较提示词、模型和检索方式的变化。' },
        ],
        bullets: [
          { en: 'Define a successful result in terms a user can recognise.', zh: '用用户能够理解的方式定义成功的结果。' },
          { en: 'Include incomplete inputs, empty retrieval results, and provider failures in the evaluation set.', zh: '在评测样本中加入不完整输入、空检索结果和服务提供方故障。' },
          { en: 'Decide when to retry, when to stop, and when to ask for human review.', zh: '明确何时重试、何时停止，以及何时需要人工审核。' },
        ],
      },
      {
        id: 'make-behaviour-visible', title: { en: 'Make behaviour visible.', zh: '让系统行为可见。' },
        paragraphs: [
          { en: 'When a request becomes slow, knowing the total duration is only the beginning. Trace the stages that matter: authentication, retrieval, model inference, and any downstream action. OpenTelemetry describes traces, metrics, and logs as complementary signals for understanding a system.', zh: '请求变慢时，总耗时只是线索的起点。追踪关键阶段：身份验证、检索、模型推理，以及后续操作。OpenTelemetry 将追踪、指标和日志视为理解系统时互为补充的信号。' },
          { en: 'Record useful operational context without copying sensitive documents into logs. Track errors, latency, and usage alongside a small set of quality checks. A technically successful request can still return an unhelpful answer.', zh: '记录有用的运行上下文，同时避免把敏感文件复制进日志。在跟踪错误、延迟和使用量的同时，也保留少量质量检查。技术上成功的请求，仍可能返回没有帮助的答案。' },
        ],
        links: [{ label: { en: 'OpenTelemetry · Observability primer', zh: 'OpenTelemetry · 可观测性基础' }, href: 'https://opentelemetry.io/docs/concepts/observability-primer/' }],
      },
      {
        id: 'grow-deliberately', title: { en: 'Grow deliberately.', zh: '有意识地演进。' },
        paragraphs: [
          { en: 'Choose deployment machinery to match the workload. A simple service may be enough for an early application. If Kubernetes is part of the platform, understand resource requests and limits: requests inform scheduling, while limits constrain resource use. These settings need measurements rather than guesses.', zh: '根据负载选择部署方式。早期应用可能只需要一个简单服务。如果平台采用 Kubernetes，就需要理解资源请求与限制：请求影响调度，限制约束资源使用。这些配置应该来自测量，而不是猜测。' },
          { en: 'Write down a rollback path, keep configuration separate from code, and make one meaningful change at a time. A platform becomes dependable through repeatable decisions, not through the length of its technology list.', zh: '写下回滚路径，将配置与代码分离，每次只做一个有意义的变更。平台的可靠性来自可重复的决策，而不是技术清单的长度。' },
        ],
        links: [{ label: { en: 'Kubernetes · Resource management', zh: 'Kubernetes · 资源管理' }, href: 'https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/' }],
      },
    ],
  },
  {
    slug: 'a-home-in-germany',
    title: { en: 'Making a home in Germany.', zh: '在德国，慢慢安家。' },
    excerpt: { en: 'A research notebook for everyday decisions—from banking and saving to a home and the kitchen inside it.', zh: '关于日常选择的研究笔记：从银行、储蓄，到房子和房子里的厨房。' },
    category: 'life', tags: ['germany'], date: '2026-11-01', readTime: 3,
    visual: 'home', format: { en: 'Research notebook', zh: '研究笔记' },
    body: [
      {
        id: 'a-place-for-the-questions', title: { en: 'A place for the questions.', zh: '给问题留一个位置。' },
        paragraphs: [
          { en: 'Settling into a country comes with many small decisions. Some are about daily convenience; others deserve a spreadsheet and a quiet afternoon. This notebook sets out the questions for future articles about life in Germany. It is a topic roadmap, rather than a completed comparison or a personal purchase story.', zh: '在一个国家安顿下来，伴随着许多大大小小的选择。有些关乎日常便利，有些则值得花一个安静的下午，打开表格认真研究。这篇笔记整理了未来德国生活文章的研究方向；它是一份选题路线图，不是已完成的产品对比，也不是个人购买经历。' },
          { en: 'The aim is to make the reasoning visible: what was compared, which assumptions mattered, and when the information was checked. A useful comparison should explain who it might suit, not simply declare a universal winner.', zh: '目标是把判断过程写清楚：比较了什么，哪些假设会影响结论，以及信息是什么时候核对的。好的比较应该说明某个选项适合什么人，而不是宣布一个适用于所有人的赢家。' },
        ],
      },
      {
        id: 'the-research-list', title: { en: 'On the research list.', zh: '正在规划的选题。' },
        paragraphs: [{ en: 'These subjects will get their own articles as the research and source material are ready. No current bank ranking, interest rate, or financing recommendation is implied by this list.', zh: '这些主题会在研究与资料准备好之后，分别展开成文章。以下清单不代表当前银行排名、利率报价或融资建议。' }],
        bullets: [
          { en: 'Banking: everyday account features, costs, language support, and practical trade-offs.', zh: '银行：日常账户功能、费用、语言支持，以及实际使用中的取舍。' },
          { en: 'Savings and money market funds: how to compare product structure, costs, access, and risk on a clearly dated basis.', zh: '存款与货币市场基金：在标明日期的前提下，比较产品结构、费用、流动性和风险。' },
          { en: 'Buying a home and mortgages: a structured record of questions, documents, and financing scenarios.', zh: '买房与贷款：整理问题、文件，以及不同融资方案的计算假设。' },
          { en: 'Kitchens: planning, quotes, appliances, delivery, and installation.', zh: '厨房：规划、报价、电器、配送，以及安装。' },
        ],
      },
      {
        id: 'how-these-notes-will-work', title: { en: 'How these notes will work.', zh: '这些笔记会怎么写。' },
        paragraphs: [
          { en: 'Future comparisons will separate personal observations from provider information and link to the original terms wherever possible. Time-sensitive details will carry a checked date. Any affiliate relationship will be disclosed beside the relevant article or link.', zh: '未来的比较会区分个人观察与服务方信息，并尽可能链接原始条款。时效性信息会注明核对日期。如存在联盟推广关系，也会在相关文章或链接旁清楚说明。' },
          { en: 'For now, this is an open notebook: a starting point for careful questions and more useful answers.', zh: '现在，这还是一本打开的笔记本：先把问题问清楚，再慢慢找到有用的答案。' },
        ],
      },
    ],
  },
  {
    slug: 'a-home-for-ideas',
    title: { en: 'A home for ideas, and everything in between.', zh: '给想法，也给生活，一个空间。' },
    excerpt: { en: 'Technology, everyday life, and the connections between them. An opening post for this little corner of the internet.', zh: '技术、日常，以及两者之间的连接。写给这个互联网小角落的开篇。' },
    category: 'life', tags: ['germany'], date: '2026-11-01', readTime: 2,
    visual: 'notes', format: { en: 'Opening post', zh: '开篇' },
    body: [
      {
        id: 'two-worlds-one-journal', title: { en: 'Two worlds. One blog.', zh: '两个世界，一个博客。' },
        paragraphs: [
          { en: 'This blog has room for both the systems we build and the lives we build around them. On one side: AI, cloud infrastructure, backend engineering, and Kubernetes. On the other: the practical details of making a life in Germany.', zh: '这个博客既关心我们构建的系统，也关心系统之外的生活。一边是 AI、云基础设施、后端工程和 Kubernetes；另一边，是在德国生活的具体细节。' },
          { en: 'The connection is curiosity. A good engineering question and a good everyday question both begin with paying attention, understanding the constraints, and being willing to revise an assumption.', zh: '把两者连接起来的是好奇心。好的工程问题和好的日常问题，都始于认真观察、理解约束，以及愿意修改自己的假设。' },
        ],
      },
      {
        id: 'what-you-will-find', title: { en: 'What you will find here.', zh: '这里会有什么。' },
        paragraphs: [
          { en: 'The opening collection introduces the subjects and the style of the blog. Future technical articles can explore implementation details and lessons from projects; life articles can collect research, comparisons, and personal observations when those are ready to share.', zh: '首批内容介绍这个博客的主题与写作方式。未来的技术文章会逐步展开实现细节与项目心得；生活文章则会在资料准备好时，整理研究、比较，以及可以分享的个人观察。' },
          { en: 'Use the topic filters to find a particular thread, or read across categories. Some shelves are still empty. That leaves space for thoughtful work.', zh: '可以通过主题筛选找到感兴趣的线索，也可以在不同分类间随意阅读。有些书架暂时还是空的，也为认真写作留下了空间。' },
        ],
      },
      {
        id: 'an-open-conversation', title: { en: 'An open conversation.', zh: '让交流继续。' },
        paragraphs: [{ en: 'A blog is more useful when it invites conversation. For a technical question, a collaboration, or an IT services enquiry, the contact links on this site are a good place to begin.', zh: '一个能够引发交流的博客更有价值。无论是技术问题、合作，还是 IT 服务需求，都可以通过网站上的联系方式开始交流。' }],
      },
    ],
  },
];

export function formatPostDate(date: string, lang: 'en' | 'zh') {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'zh-CN', {
    day: '2-digit', month: lang === 'en' ? 'short' : 'long', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));
}
