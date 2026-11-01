import type { PostTable } from './posts';

// Preserve each provider's reporting date and metric; these are not like-for-like bank deposits.
export const platformComparison: PostTable = {
  caption: { en: 'Five platforms, at a glance', zh: '五家平台，一览对比' },
  columns: [
    { en: 'Platform', zh: '平台' },
    { en: 'Employees', zh: '员工数' },
    { en: 'Client assets / balances', zh: '客户资产规模' },
    { en: 'Listing', zh: '上市' },
  ],
  rows: [
    {
      id: 'robinhood',
      cells: [
        { value: { en: 'Robinhood 🇺🇸', zh: 'Robinhood 🇺🇸' } },
        { value: { en: '3,042', zh: '3,042' }, date: { en: '30 Sep 2026', zh: '2026.09.30' } },
        { value: { en: 'US$395.9bn', zh: '3,959 亿美元' }, detail: { en: 'Total platform assets', zh: '平台总资产' }, date: { en: 'Sep 2026', zh: '2026.09' } },
        { value: { en: 'HOOD', zh: 'HOOD' }, detail: { en: 'Nasdaq-listed', zh: '纳斯达克上市' } },
      ],
      sources: [
        { label: { en: 'Q3 2026 presentation · headcount, p. 36', zh: '2026 Q3 财报演示 · 员工数，第 36 页' }, href: 'https://investors.robinhood.com/static-files/fd90f575-5b4c-4cde-a16d-d114c920fb6a' },
        { label: { en: 'September 2026 · platform assets', zh: '2026 年 9 月 · 平台资产' }, href: 'https://investors.robinhood.com/static-files/6e609634-4d9c-49e0-9057-118e0962a835' },
        { label: { en: 'Q3 2026 results · Nasdaq: HOOD', zh: '2026 Q3 业绩 · Nasdaq: HOOD' }, href: 'https://investors.robinhood.com/news-releases/news-release-details/robinhood-reports-third-quarter-2026-results' },
      ],
    },
    {
      id: 'revolut',
      cells: [
        { value: { en: 'Revolut 🇬🇧', zh: 'Revolut 🇬🇧' } },
        { value: { en: '12,200', zh: '12,200' }, date: { en: '31 Dec 2025', zh: '2025.12.31' } },
        { value: { en: 'US$67.5bn', zh: '675 亿美元' }, detail: { en: 'Customer balances', zh: '客户余额' }, date: { en: 'Dec 2025', zh: '2025 年末' } },
        { value: { en: 'Private', zh: '未上市' } },
      ],
      sources: [
        { label: { en: '2025 annual report · headcount, p. 126', zh: '2025 年报 · 员工数，第 126 页' }, href: 'https://assets.revolut.com/pdf/annualreport2025.pdf' },
        { label: { en: '2025 results · customer balances', zh: '2025 年业绩 · 客户余额' }, href: 'https://www.revolut.com/news/revolut_reports_record_profit_of_2_3bn_for_2025_as_revenue_surges_to_6bn/' },
      ],
    },
    {
      id: 'n26',
      cells: [
        { value: { en: 'N26 🇩🇪', zh: 'N26 🇩🇪' } },
        { value: { en: '1,600', zh: '1,600' }, date: { en: 'Jun 2026', zh: '2026.06' } },
        { value: { en: 'Over €10.5bn', zh: '超过 105 亿欧元' }, detail: { en: 'Customer deposits', zh: '客户存款' }, date: { en: 'FY2025', zh: '2025 财年' } },
        { value: { en: 'Private', zh: '未上市' } },
      ],
      sources: [
        { label: { en: '2025 results · published 25 Jun 2026', zh: '2025 年业绩 · 2026 年 6 月 25 日发布' }, href: 'https://n26.com/en-eu/press/press-release/n26-delivers-over-500m-euro-revenue-and-350m-euro-gross-profit-in-2025-hitting-first-full-year-of-net-profitability' },
        { label: { en: 'Investor relations · ownership', zh: '投资者关系 · 股权状态' }, href: 'https://n26.com/en-eu/investor-relations' },
      ],
    },
    {
      id: 'trade-republic',
      cells: [
        { value: { en: 'Trade Republic 🇩🇪', zh: 'Trade Republic 🇩🇪' } },
        { value: { en: 'Not confirmed', zh: '未确认' }, detail: { en: 'Group headcount', zh: '集团员工口径' } },
        { value: { en: 'Over €150bn', zh: '超过 1,500 亿欧元' }, detail: { en: 'Client assets', zh: '客户资产' }, date: { en: 'Sep 2025', zh: '2025.09' } },
        { value: { en: 'Private', zh: '未上市' } },
      ],
      sources: [
        { label: { en: '15 Sep 2025 · client assets', zh: '2025 年 9 月 15 日 · 客户资产' }, href: 'https://assets.traderepublic.com/assets/files/250915_TradeRepublic_PressRelease_Private_Markets_INT_EN2.pdf' },
        { label: { en: '17 Dec 2025 · private share transaction', zh: '2025 年 12 月 17 日 · 私募股权交易' }, href: 'https://assets.traderepublic.com/assets/files/251217_Secondary_PressRelease_FR_EN2.pdf' },
      ],
    },
    {
      id: 'trading-212',
      cells: [
        { value: { en: 'Trading 212 🇬🇧', zh: 'Trading 212 🇬🇧' } },
        { value: { en: 'Over 750', zh: '超过 750' }, date: { en: 'Jun 2026', zh: '2026.06' } },
        { value: { en: 'Over £25bn', zh: '超过 250 亿英镑' }, detail: { en: 'Assets under administration', zh: '客户托管资产' }, date: { en: 'May 2025', zh: '2025.05' } },
        { value: { en: 'Private', zh: '未上市' } },
      ],
      sources: [
        { label: { en: 'IDA Ireland · headcount and ownership, 24 Jun 2026', zh: '爱尔兰投资发展局 · 员工与股权，2026 年 6 月 24 日' }, href: 'https://www.idaireland.com/latest-news/press-release/trading-212-announces-new-european-hub-in-dubli' },
        { label: { en: 'Official announcement · client assets, 22 May 2025', zh: '官方公告 · 客户资产，2025 年 5 月 22 日' }, href: 'https://community.trading212.com/t/huge-milestone-achieved/85075' },
      ],
    },
  ],
  note: {
    en: 'Checked 1 Nov 2026. Figures retain their original dates, currencies, and definitions; they are not directly comparable. Trade Republic’s original 1,200 headcount could not be verified on a consistent group-wide basis. Company size is not a safety rating.',
    zh: '核对于 2026 年 11 月 1 日。数据保留各自的日期、币种与统计口径，不宜直接横比。原稿中 Trade Republic 的 1,200 人未获集团统一口径确认。公司规模不等同于安全评级。',
  },
};
