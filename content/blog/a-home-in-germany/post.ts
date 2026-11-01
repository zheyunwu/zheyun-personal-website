import type { Post } from '../types';

export const aHomeInGermanyPost: Post = {
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
};
