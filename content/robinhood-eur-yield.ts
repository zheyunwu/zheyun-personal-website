import type { Post } from './posts';
import { platformComparison } from './platform-comparison';

export const robinhoodEuroYieldPost: Post = {
  slug: 'robinhood-euro-yield-safety',
  title: {
    en: '🇪🇺 Robinhood’s 5% yield on euros. Is it safe?',
    zh: '🇪🇺Robinhood欧元5%活期利息？安全吗？',
  },
  excerpt: {
    en: 'Where the yield comes from, what the €22,000 protection covers, and the money market fund behind it. My research into two different layers of risk.',
    zh: '5% 的收益从哪里来，22,000 欧元保障究竟保什么，底层货币市场基金又是什么？从平台和基金两个层面，记录我的研究。',
  },
  category: 'life',
  tags: ['banking', 'savings'],
  date: '2026-11-01',
  readTime: 12,
  visual: 'notes',
  format: { en: 'Research note', zh: '研究笔记' },
  affiliateDisclosure: {
    en: 'This article includes my personal Robinhood referral link. If the promotion’s conditions are met, the person joining and I may receive a reward. Eligibility, amounts, deposits, and holding requirements depend on the terms Robinhood displays at the time.',
    zh: '文末包含我的 Robinhood 个人邀请链接。符合活动条件时，我和受邀者可能获得奖励；资格、金额、入金与持有要求，以 Robinhood 当时展示的条款为准。',
  },
  editorialNote: {
    en: 'The Chinese article below was researched and written by me. The English translation, platform comparison table, and separate source-check notes were prepared with AI assistance. The table has been updated against the linked sources; the rest of the original text is preserved, with dated clarifications at the end. Rates and promotions are snapshots, not live quotes.',
    zh: '中文正文由我研究撰写。英文译文、平台对比表和文末独立的资料核对注释使用 AI 协助。表格已按所附来源核对更新，其余正文保留原稿；利率与活动信息是当时的记录，请结合文末注明日期的核对注释阅读。',
  },
  body: [
    {
      id: 'the-short-answer',
      title: { en: 'The short answer', zh: '先说结论' },
      paragraphs: [
        {
          en: 'Robinhood’s 5% yield on accessible euro balances has been getting a lot of attention lately. But this is not a traditional bank deposit, and it is not covered by the EU’s €100,000 bank deposit guarantee. For my own peace of mind, I did some research and wrote this note to keep a record. (The Chinese original is not an AI-written article: I spent a day researching and putting it together. Discussion and corrections are welcome.)',
          zh: '最近Robinhood的5%活期利息非常火，不过这并不是传统银行存款，不受欧盟10万欧元银行存款担保。为了安心，自己做了些研究，写篇笔记做记录。（非AI文章，花了一天研究整理，欢迎讨论和纠正）',
        },
        {
          en: 'The conclusion first: if you enable Earn yield, the euros you hold with Robinhood are invested in a money market fund (MMF) managed by J.P. Morgan, with deposits and withdrawals available at any time. The current 5% comes from the fund’s own variable yield plus an additional Robinhood subsidy. For example, Figure 2 shows that on the day of this post, the MMF itself contributed 2.52% and Robinhood added 2.48%. (The subsidy has no fixed end date, and the platform can change it at any time.)',
          zh: '先说结论，如果开启了Earn yield，用户存在Robinhood的€会被投入J.P. Morgan管理的MMF (Money Market Fund /货币市场基金）（用户随时可以存取）。当前5%的利息来自基金本身的浮动收益率+ Robinhood额外补贴一部分。比如，图2显示发帖的这天是MMF自身2.52% + RH平台补贴2.48%。（平台补贴期没有固定时间，平台随时可以调整）',
        },
      ],
      image: {
        src: '/images/robinhood-interest-composition.jpg',
        width: 1206,
        height: 1466,
        alt: {
          en: 'Robinhood screenshot showing a 5% euro yield composed of a 2.52% J.P. Morgan money market fund base rate and a 2.48% Robinhood boost.',
          zh: 'Robinhood 利率截图：欧元收益率 5%，由 J.P. Morgan 货币市场基金的 2.52% 基础收益与 Robinhood 的 2.48% 补贴组成。',
        },
        caption: {
          en: 'Figure 2 in the original draft · Robinhood yield breakdown. A historical screenshot supplied by the author; the capture date is not shown.',
          zh: '原稿图 2 · Robinhood 收益构成。作者提供的历史截图，图中未显示截取日期。',
        },
      },
    },
    {
      id: 'two-layers-of-risk',
      title: { en: '⚠️ Two layers of risk', zh: '⚠️风险存在两个层面：' },
      paragraphs: [],
      bullets: [
        {
          en: '1. Robinhood becomes insolvent or commits fraud and cannot return customer assets (compensation up to €22,000).',
          zh: '1 Robinhood平台破产或欺诈、且无法返还用户资产（最多赔付22000欧元）。',
        },
        {
          en: '2. The underlying fund makes a loss. The probability is extremely low, but not zero (❗️the €22,000 protection does not cover this).',
          zh: '2 底层基金的亏损，概率极低但不为0（❗️22000欧元保障不负责这种情况）。',
        },
      ],
      afterBullets: [
        {
          en: 'European MMF regulation is currently quite strict. The last large-scale principal losses caused by credit defaults were during the 2008 financial crisis; COVID brought liquidity risk in 2020, but European MMFs withstood the shock. Robinhood’s underlying MMF has the highest safety ratings from all three major international rating agencies and the lowest EU KID risk rating, 1 out of 7, making the probability of a loss of principal extremely low.',
          zh: '不过当前欧洲的MMF法规相当严格，上一次由于信用违约导致的大规模本金亏损是2008年金融危机、2020因为covid出现过流动性风险但欧洲MMF经受住了冲击。RH底层投的MMF具有国际三大评级机构的最高安全评级、欧盟官方KID风险评级1/7（最低），出现本金损失的概率极低。',
        },
        { en: 'Here are the details.', zh: '这边开始是详情。' },
      ],
    },
    {
      id: 'platform-risk',
      title: { en: '1. Platform risk: insolvency or fraud', zh: '1 风险点1: Robinhood平台破产或欺诈' },
      paragraphs: [
        {
          en: 'First, the familiar €22,000 protection is Lithuania’s investor compensation scheme. It applies when a platform becomes insolvent or commits serious fraud—such as making off with customers’ money—and cannot return customer assets.',
          zh: '首先大家熟知的22000欧保障是立陶宛投资者保护计划，针对的是平台破产倒闭或恶性欺诈（平台卷款跑路），无法返还用户资产的情况。',
        },
        {
          en: 'Interestingly, Robinhood becoming insolvent does not necessarily mean that customers’ MMF assets are gone. Under the customer agreement, customers’ MMF assets must be segregated from Robinhood’s own assets and cannot be used for its own purposes. Robinhood acts as the customer’s agent when buying and selling MMF units, and must accurately record and regularly reconcile each customer’s holdings. So even if Robinhood fails, as long as the fund units remain intact and ownership records are accurate, customers should in principle be able to recover all their fund assets, rather than only €22,000.',
          zh: '有意思的是，RH本身破产倒闭并不一定代表用户的MMF资产就没了。因为按照用户协议，用户的MMF资产必须与RH自有资产隔离、不得将客户金融资产用于自己的用途。RH作为用户的代理人买卖MMF份额，RH需要准确记录每位客户的MMF持仓并定期核对。所以即便RH破产，只要用户的MMF份额数据仍然完整且归属记录准确，原则上应当能够取回全部基金资产，而不是只能拿回22000€。',
        },
        {
          en: 'The €22,000 also refers specifically to assets that cannot be returned. For example, if you hold €50,000 in the MMF and Robinhood fails but the records are accurate and the fund units are intact, you should in principle be able to recover all the units through insolvency or asset-return proceedings. If only €5,000 cannot be returned, the protection concerns that €5,000; it does not automatically cap the return of your entire account at €22,000.',
          zh: '另外，这22000€针对的是“无法返还的资产”，例如你持有50000€的MMF，如果RH破产但资产记录准确、基金份额完整，原则上可以通过破产或资产返还程序取回全部份额。如果其中只有5000€无法返还，那么保障针对的是这5000€，而不是把用户账户全部资产直接限制在22000€。',
        },
        {
          en: 'Of course, we cannot guarantee what happens inside Robinhood. To assess this platform-level risk, you need to understand the company and form your own judgement.',
          zh: '当然我们无法保证RH内部具体如何运作，这个平台层面的风险需要自己了解Robinhood这个公司做判断。',
        },
        {
          en: 'Here is a comparison of Robinhood, Revolut, N26, Trade Republic, and Trading 212, compiled with AI assistance and checked against the sources linked below:',
          zh: '根据公开资料，RH与Revolut、N26、Trade Republic、Trading 212的一些对比（这部分由 AI 协助整理，并按表格下方来源核对）：',
        },
      ],
      table: platformComparison,
    },
    {
      id: 'fund-risk',
      title: { en: '2. Fund risk: losses in the MMF itself', zh: '2 风险点2: MMF基金本身的亏损' },
      subtitle: { en: '2.1 What is an MMF?', zh: '2.1 什么是MMF' },
      paragraphs: [
        {
          en: 'An MMF is a fund with a high degree of safety, high liquidity (you can put money in and take it out at any time), and stable returns. It mainly invests in short-term debt assets of high credit quality. Unlike equities, where returns depend on changes in the price of the asset itself, MMFs earn interest by holding short-term debt.',
          zh: 'MMF是一种高安全性、高流动性（可以随时存取）、稳定收益的基金，主要投资于高信用质量的短期债务资产。与股票依靠资产本身的价格涨跌获得收益不同，MMF依靠持有短期债务资产获得利息。',
        },
        {
          en: 'The fund manager pools money from many investors and invests it in short-term assets such as government bills, commercial paper, repurchase agreements, and bank certificates of deposit. As these assets mature, the fund collects principal and interest, reinvests in new short-term assets, and distributes income to investors.',
          zh: '运行原理是，基金管理公司把大量投资人的钱汇集起来，拿去投资于短期国债、商业票据、回购协议、银行定期存单这类短期资产。随着这些资产不断到期，基金不断收回本金和利息，再投资于新的短期资产，同时将收益分红给用户。',
        },
        {
          en: 'In finance, a longer time horizon brings more uncertainty. MMFs reduce risk by investing in very short-term assets. As a result, their yields tend to follow short-term market interest rates: generally, rate rises push MMF yields up, while rate cuts push them down.',
          zh: '金融学中，时间越长，不确定性越大。MMF通过投资极其短期的资产来降低风险，也正因此，MMF的收益率通常跟随市场的短期利率变化，一般来说，加息->MMF收益上升、降息->MMF收益下降。',
        },
        {
          en: 'Overall, MMFs carry much less risk than conventional bond funds and equity funds. But they are not entirely risk-free. For example:',
          zh: '总体来说，MMF的风险远低于普通债券基金和股票基金。但它也不是完全没有风险，比如：',
        },
      ],
      bullets: [
        {
          en: '(1) Credit default risk: issuers of the underlying assets may run into financial trouble or fail to repay principal and interest on time.',
          zh: '(1)信用违约风险：底层资产的发债主体可能出现经营危机或无法按时兑付本息',
        },
        {
          en: '(2) Liquidity risk: if a sudden market panic prompts many investors to redeem at once, the fund manager may have to sell good-quality bonds before maturity at a loss. This can turn liquidity pressure into actual losses and make the run worse.',
          zh: '(2) 流动性风险：如果市场突发恐慌，大量投资者在短时间同时要求赎回，基金经理可能被迫在市场上亏本贱卖未到期的优质债券，这会导致基金资产真的出现亏损，进而恶化挤兑。',
        },
      ],
      afterBullets: [
        {
          en: 'Over the past decade, European MMFs have not experienced a major case of direct fund losses caused by credit defaults in underlying assets. But in the early days of COVID in 2020, they faced a severe liquidity crisis and a wave of redemptions. Emergency intervention by the ECB prevented widespread material losses of principal, and this also prompted the subsequent major reform of EU MMF regulation.',
          zh: '过去十年中，欧洲MMF没有发生过由于底层资产信用违约导致基金资产直接亏损的重大案例。但是在2020年新冠初期，欧洲MMF曾遭遇了严重的流动性危机和挤兑风波。当时欧央行紧急干预，没有导致大面积的实质性本金亏损，这也引发了随后的欧盟MMF监管大改革。',
        },
      ],
    },
    {
      id: 'the-underlying-fund',
      title: { en: '2.2 Which MMF holds Robinhood’s cash? Is it safe?', zh: '2.2 RH的cash被投进哪只MMF？安全吗？' },
      paragraphs: [
        {
          en: 'Robinhood uses the J.P. Morgan EUR Liquidity LVNAV Fund, a top-tier money market fund established by J.P. Morgan in Luxembourg. With around €40 billion in total assets, it is a large euro-denominated MMF.',
          zh: 'RH实际使用的MMF是J.P. Morgan EUR Liquidity LVNAV Fund，是由JP Morgan设立在卢森堡的顶级货币市场基金，目前总资产规模约400亿欧元，属于大型欧元MMF。',
        },
        {
          en: 'It is an LVNAV (low-volatility net asset value) fund, with an investment universe strictly limited to very highly rated, very short-term government bonds, bank deposits, repurchase agreements, and similar assets.',
          zh: '它属于LVNAV（低波动性净资产价值基金），投资范围被严格限制在极高信用评级、极短期的政府债券、银行存款和回购协议等。',
        },
        {
          en: 'The MMF has top credit ratings from all three major international rating agencies: Moody’s Aaa-mf, S&P AAAm, and Fitch AAAmmf.',
          zh: '这只MMF具有顶级信用评级，它同时获得了国际三大评级机构的最高安全评级（穆迪 Aaa-mf、标普 AAAm、惠誉 AAAmmf）。',
        },
        {
          en: 'In the EU’s official KID risk classification system, it is rated 1 out of 7—the lowest risk category.',
          zh: '在欧盟官方的KID风险分级体系中，它属于1/7（最低风险级别）。',
        },
        {
          en: 'Together with the EU’s strict MMF rules, this means the overall risk in Robinhood’s underlying fund is very small. But remember that Lithuania’s €22,000 investor protection does not cover losses in the MMF: it is still a fund, and losses in the investment itself are market risk.',
          zh: '加上现在欧盟MMF法规相当严苛，总的来说RH底层这只MMF的风险非常小。但还是得注意22000欧元的立陶宛投资者保护计划并不适用于MMF亏损的情况，因为MMF毕竟是基金，其本身的亏损属于投资市场风险。',
        },
      ],
    },
    {
      id: 'my-invitation',
      title: { en: 'My invitation', zh: '我的邀请' },
      paragraphs: [
        {
          en: 'If this information helped you and you are interested, you are welcome to use my invitation. Robinhood is currently offering new customers €50.',
          zh: '如果你觉得这个信息有帮助到你且感兴趣，欢迎用我的邀请，当前RH送新户50€',
        },
      ],
      links: [{
        label: { en: 'Join Robinhood with my invitation', zh: '使用我的 Robinhood 邀请链接' },
        href: 'https://join.robinhood.com/eu_crypto/hood-29cf8e9a9/',
        sponsored: true,
      }],
    },
    {
      id: 'source-check-notes',
      title: { en: 'Source-check notes · 1 November 2026', zh: '资料核对注释 · 2026 年 11 月 1 日' },
      paragraphs: [{
        en: 'These notes are separate from the original article above. They record what the sources support, what needs qualification, and what could not be independently confirmed. This is a personal research record, not an individual investment recommendation.',
        zh: '以下注释独立于上方原文，说明资料支持的范围、需要补充的条件，以及未能独立确认之处。本文是个人研究记录，不是针对个人情况的投资建议。',
      }],
      bullets: [
        {
          en: 'Yield and withdrawals [1–2]. Robinhood’s EU page advertised a boosted 5% at the time of checking. The supplied screenshot shows 2.52% + 2.48%, but has no capture date; that split is not a verified current rate. The promotion can change. “Withdraw at any time” is not unconditional: the agreement allows settlement delays, including longer delays or exit charges in exceptional conditions.',
          zh: '收益与存取 [1–2]：核对时 Robinhood 欧洲官网展示了补贴后的 5%。所附截图确实显示 2.52%＋2.48%，但没有截取日期，不能作为当前分项利率的确认。补贴可调整。“随时存取”也有条件：协议允许结算延迟，极端情况下可能更久或产生退出费用。',
        },
        {
          en: 'Investor protection [2–3]. The relevant firm is Robinhood Europe, UAB. Lithuania’s scheme covers eligible assets the firm cannot return, up to €22,000 per investor; it does not insure fund losses. Segregation supports asset recovery, but does not guarantee its timing or outcome. This is distinct from bank deposit protection.',
          zh: '投资者保障 [2–3]：相关签约主体是 Robinhood Europe, UAB。立陶宛计划对符合条件且机构无法返还的资产提供每位投资者最高 22,000 欧元保障，不承保基金投资亏损。资产隔离有利于返还，但不能保证返还时间或结果，也不等同于银行存款保障。',
        },
        {
          en: 'Fund, share class, and ratings [4–6]. Robinhood’s linked KID identifies JPM EUR Liquidity LVNAV Select (dist.), ISIN LU2599140782, in the JPMorgan Liquidity Funds – EUR Liquidity LVNAV Fund. The KID dated 17 April 2025 gives risk category 1/7. This is a manufacturer-prepared document under EU rules, not an EU government guarantee. J.P. Morgan reports Aaa-mf / AAAm / AAAmmf ratings as at 31 August 2026 and fund assets of €41.41 billion as at 13 October 2026. These are dated fund figures, not a numerical probability of loss. The portfolio can include high-quality private-sector debt; the ratings do not mean every holding is AAA or government-backed.',
          zh: '基金、份额与评级 [4–6]：Robinhood 链接的 KID 对应 JPM EUR Liquidity LVNAV Select (dist.)，ISIN 为 LU2599140782，所属子基金是 JPMorgan Liquidity Funds – EUR Liquidity LVNAV Fund。2025 年 4 月 17 日版 KID 列出风险等级 1/7；这是发行方依欧盟规则编制的文件，不是欧盟政府担保。J.P. Morgan 披露的三项评级为 Aaa-mf／AAAm／AAAmmf（截至 2026 年 8 月 31 日），基金规模为 414.1 亿欧元（截至 2026 年 10 月 13 日）。这些均有时点限制，不能直接换算成本金亏损概率。持仓也可包含高质量私人部门债务，并非每项资产均为 AAA 或政府担保。',
        },
        {
          en: 'History and regulation [7–9]. No comprehensive official evidence was found to establish that Europe had no major credit-loss case in the past ten years, or that 2008 was the last such event. ESMA documents severe liquidity stress in 2020; the absence of widespread failures does not prove zero losses. The main EU MMF Regulation was adopted in 2017 and applied from July 2018, before COVID. The 2020 shock prompted further review; ESMA’s 2022 recommendations were proposals, not themselves an enacted post-COVID overhaul.',
          zh: '历史与法规 [7–9]：未找到足以证明“欧洲过去十年没有重大信用亏损案例”或“2008 年是最后一次”的完整官方统计。ESMA 记录了 2020 年的严重流动性压力，未发生大面积失败不能证明所有基金均无亏损。欧盟主要 MMF 法规于 2017 年通过、2018 年 7 月起适用，早于新冠危机；2020 年冲击促成进一步审议，ESMA 在 2022 年提出的改革建议本身并不等于已经落地的疫后全面改革。',
        },
        {
          en: 'Platform comparison. The bilingual table replaces the original image and links to sources for each platform. Robinhood is updated to September 2026; unverified Trade Republic headcount is marked explicitly. Robinhood’s total platform assets cover the group, not just its EU entity. Revolut’s customer balances include deposits and off-balance-sheet partner savings / Flexible Cash Funds. These differ from N26’s deposits and the brokers’ client assets; neither scale nor listing status establishes safety.',
          zh: '平台对比：双语表格替代原图，并逐家附上来源。Robinhood 更新至 2026 年 9 月，未确认的 Trade Republic 员工数已明确标出。Robinhood 平台总资产是集团口径，不等于欧洲签约主体资产。Revolut 客户余额包含存款以及表外合作方储蓄／Flexible Cash Funds，与 N26 的存款及券商客户资产口径不同；规模与上市状态均不能直接证明安全性。',
        },
        {
          en: 'Referral offer [10]. The original €50 offer could not be independently confirmed from the public terms. The invitation page and app determine the actual amount, eligibility, deposit, and holding requirements; the published terms include a 180-day restriction on withdrawing the reward’s cash value. The terms describe personal referrals and restrict commercial use. This link is a personal invitation, not evidence of an approved affiliate partnership.',
          zh: '邀请活动 [10]：原稿中的新户 50 欧元未能从公开条款独立确认，实际金额、资格、入金与持有要求以邀请页面和 App 为准；公开条款包含奖励等值金额的 180 天提取限制。条款针对个人邀请，并限制商业用途；本站链接是个人邀请，不代表获批的联盟合作关系。',
        },
      ],
      links: [
        { label: { en: '[1] Robinhood EU · Euro yield', zh: '[1] Robinhood 欧洲官网 · 欧元收益' }, href: 'https://robinhood.com/eu/en/invest/' },
        { label: { en: '[2] Robinhood Europe · Customer agreement', zh: '[2] Robinhood Europe · 客户协议' }, href: 'https://cdn.robinhood.com/assets/robinhood/legal/eu-crypto-user-agreement.pdf' },
        { label: { en: '[3] Lithuania · Investor compensation coverage', zh: '[3] 立陶宛 · 投资者保障范围' }, href: 'https://www.iidraudimas.lt/en/investment-insurance/insurance-object-0/' },
        { label: { en: '[4] Robinhood · MMF Key Information Document', zh: '[4] Robinhood · MMF 关键信息文件（KID）' }, href: 'https://cdn.robinhood.com/assets/robinhood/legal/money_market_fund_kid_eu.pdf' },
        { label: { en: '[5] J.P. Morgan · Fund size and ratings', zh: '[5] J.P. Morgan · 基金规模与评级' }, href: 'https://am.jpmorgan.com/lu/en/asset-management/liq/products/jpm-eur-liquidity-lvnav-e-acc-lu1873127952' },
        { label: { en: '[6] J.P. Morgan · Liquidity Funds prospectus', zh: '[6] J.P. Morgan · Liquidity Funds 招募说明书' }, href: 'https://am.jpmorgan.com/content/dam/jpm-am-aem/emea/regional/en/global-regulatory/prospectus/jpmorgan-liquidity-funds-prospectus-ce-en.pdf' },
        { label: { en: '[7] ESMA · MMF review consultation and 2020 stress', zh: '[7] ESMA · MMF 审议咨询与 2020 年市场压力' }, href: 'https://www.esma.europa.eu/sites/default/files/library/esma34-49-309_cp_mmf_reform.pdf' },
        { label: { en: '[8] EUR-Lex · Regulation (EU) 2017/1131', zh: '[8] EUR-Lex · 欧盟法规 2017/1131' }, href: 'https://eur-lex.europa.eu/legal-content/en/ALL/?uri=CELEX%3A32017R1131' },
        { label: { en: '[9] ESMA · 2022 MMF reform proposals', zh: '[9] ESMA · 2022 年 MMF 改革建议' }, href: 'https://www.esma.europa.eu/press-news/esma-news/esma-proposes-reforms-improve-resilience-money-market-funds' },
        { label: { en: '[10] Robinhood · Sign-up and referral terms', zh: '[10] Robinhood · 注册与邀请条款' }, href: 'https://robinhood.com/eu/en/support/articles/sign-up-and-referral-terms-and-conditions/' },
      ],
    },
  ],
};
