import type { Post } from '../types';
import yieldScreenshot from './images/robinhood-interest-composition.jpg';
import { platformComparison } from './platform-comparison';

export const robinhoodEuroYieldPost: Post = {
  slug: 'robinhood-euro-yield-safety',
  title: {
    en: '🇪🇺 Robinhood’s 5% on euros. Is it safe?',
    zh: '🇪🇺Robinhood欧元5%活期利息？安全吗？',
  },
  excerpt: {
    en: 'Where does the 5% come from? What does the €22,000 protection actually cover? Here’s what I found out about Robinhood and the fund behind it.',
    zh: '5% 的收益从哪里来，22,000 欧元保障究竟保什么，底层货币市场基金又是什么？从平台和基金两个层面，记录我的研究。',
  },
  category: 'life',
  tags: ['banking', 'investing'],
  date: '2026-11-01',
  updated: '2026-11-02',
  // Publication/content-update commits: d140682 and 0fc51b8; not SEO build times.
  publishedAt: '2026-11-01T22:13:50+01:00',
  updatedAt: '2026-11-02T00:30:13+01:00',
  socialImage: '/images/social/robinhood-euro-yield-safety.jpg',
  readTime: 12,
  visual: 'notes',
  format: { en: 'Research note', zh: '研究笔记' },
  disclosureTitle: { en: 'Referral link disclosure', zh: '邀请链接说明' },
  affiliateDisclosure: {
    en: 'I’ve included my Robinhood referral link at the end. If you sign up and meet the offer’s conditions, we may both get a reward. Check Robinhood’s current terms for who qualifies, how much you get, and how much you need to deposit and keep in the account.',
    zh: '文末包含我的 Robinhood 个人邀请链接。符合活动条件时，我和受邀者可能获得奖励；资格、金额、入金与持有要求，以 Robinhood 当时展示的条款为准。',
  },
  body: [
    {
      id: 'the-short-answer',
      title: { en: 'The short answer', zh: '先说结论' },
      paragraphs: [
        {
          en: 'Robinhood’s 5% on euros has been getting a lot of attention lately. But it isn’t a normal bank deposit, and the EU’s €100,000 deposit guarantee doesn’t cover it. I wanted to feel more comfortable about it, so I did some digging and wrote this down. (I spent a day researching and writing the Chinese original myself—it wasn’t AI-written. Happy to discuss, and please point out anything I’ve got wrong.)',
          zh: '最近Robinhood的5%活期利息非常火，不过这并不是传统银行存款，不受欧盟10万欧元银行存款担保。为了安心，自己做了些研究，写篇笔记做记录。（非AI文章，花了一天研究整理，欢迎讨论和纠正）',
        },
        {
          en: 'Here’s the short version: turn on Earn yield, and your euros in Robinhood go into a money market fund (MMF) managed by J.P. Morgan. You can put money in and take it out at any time. The 5% comes from the fund’s own variable return, topped up by Robinhood. In Figure 2, for example, the split on the day I posted was 2.52% from the MMF + 2.48% from Robinhood. (There’s no fixed end date for the top-up, and Robinhood can change it at any time.)',
          zh: '先说结论，如果开启了Earn yield，用户存在Robinhood的€会被投入J.P. Morgan管理的MMF (Money Market Fund /货币市场基金）（用户随时可以存取）。当前5%的利息来自基金本身的浮动收益率+ Robinhood额外补贴一部分。比如，图2显示发帖的这天是MMF自身2.52% + RH平台补贴2.48%。（平台补贴期没有固定时间，平台随时可以调整）',
        },
      ],
      image: {
        src: yieldScreenshot.src,
        size: 'compact',
        width: yieldScreenshot.width,
        height: yieldScreenshot.height,
        alt: {
          en: 'Robinhood screenshot showing a 5% euro yield composed of a 2.52% J.P. Morgan money market fund base rate and a 2.48% Robinhood boost.',
          zh: 'Robinhood 利率截图：欧元收益率 5%，由 J.P. Morgan 货币市场基金的 2.52% 基础收益与 Robinhood 的 2.48% 补贴组成。',
        },
        caption: {
          en: 'Figure 2 from my original post · How Robinhood’s 5% is made up. This screenshot doesn’t show when it was taken.',
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
          en: '1. Robinhood goes bust or commits fraud and can’t return your assets (compensation up to €22,000).',
          zh: '1 Robinhood平台破产或欺诈、且无法返还用户资产（最多赔付22000欧元）。',
        },
        {
          en: '2. The fund itself loses money. The chance is extremely low, but it isn’t zero (❗️the €22,000 protection doesn’t cover this).',
          zh: '2 底层基金的亏损，概率极低但不为0（❗️22000欧元保障不负责这种情况）。',
        },
      ],
      afterBullets: [
        {
          en: 'The rules for European MMFs are pretty strict these days. The last large-scale losses of principal caused by credit defaults were in the 2008 financial crisis. COVID brought liquidity problems in 2020, but European MMFs got through the shock. The MMF Robinhood uses has the highest safety ratings from all three major rating agencies, plus the lowest EU KID risk rating: 1 out of 7. So the chance of losing your principal is extremely low.',
          zh: '不过当前欧洲的MMF法规相当严格，上一次由于信用违约导致的大规模本金亏损是2008年金融危机、2020因为covid出现过流动性风险但欧洲MMF经受住了冲击。RH底层投的MMF具有国际三大评级机构的最高安全评级、欧盟官方KID风险评级1/7（最低），出现本金损失的概率极低。',
        },
        { en: 'Here are the details.', zh: '这边开始是详情。' },
      ],
    },
    {
      id: 'platform-risk',
      title: { en: '1. What if Robinhood goes bust or commits fraud?', zh: '1 风险点1: Robinhood平台破产或欺诈' },
      paragraphs: [
        {
          en: 'First, that €22,000 protection people talk about comes from Lithuania’s investor compensation scheme. It covers situations where the platform goes bust or commits serious fraud, such as running off with customers’ money, and can’t return their assets.',
          zh: '首先大家熟知的22000欧保障是立陶宛投资者保护计划，针对的是平台破产倒闭或恶性欺诈（平台卷款跑路），无法返还用户资产的情况。',
        },
        {
          en: 'One thing I found interesting: Robinhood going bust doesn’t necessarily mean your MMF holdings disappear. The customer agreement says those assets must be kept separate from Robinhood’s own assets, and Robinhood can’t use them for itself. It buys and sells fund units on your behalf, keeps a record of what each customer owns, and has to check those records regularly. So even if Robinhood goes bust, as long as the units are still there and the ownership records are right, you should in principle be able to get all your fund assets back—not just €22,000.',
          zh: '有意思的是，RH本身破产倒闭并不一定代表用户的MMF资产就没了。因为按照用户协议，用户的MMF资产必须与RH自有资产隔离、不得将客户金融资产用于自己的用途。RH作为用户的代理人买卖MMF份额，RH需要准确记录每位客户的MMF持仓并定期核对。所以即便RH破产，只要用户的MMF份额数据仍然完整且归属记录准确，原则上应当能够取回全部基金资产，而不是只能拿回22000€。',
        },
        {
          en: 'Also, that €22,000 limit applies to assets that can’t be returned. Say you have €50,000 in the MMF and Robinhood goes bust. If the records are right and all your fund units are still there, you should in principle be able to get them all back through the insolvency or asset-return process. If only €5,000 is missing, the protection applies to that €5,000. It doesn’t mean everything in your account gets capped at €22,000.',
          zh: '另外，这22000€针对的是“无法返还的资产”，例如你持有50000€的MMF，如果RH破产但资产记录准确、基金份额完整，原则上可以通过破产或资产返还程序取回全部份额。如果其中只有5000€无法返还，那么保障针对的是这5000€，而不是把用户账户全部资产直接限制在22000€。',
        },
        {
          en: 'Of course, we don’t know exactly what goes on inside Robinhood. For this part of the risk, you’ll need to look into the company and decide how comfortable you are with it.',
          zh: '当然我们无法保证RH内部具体如何运作，这个平台层面的风险需要自己了解Robinhood这个公司做判断。',
        },
        {
          en: 'Here’s how Robinhood compares with Revolut, N26, Trade Republic, and Trading 212. This part was put together with AI help and checked against the sources below:',
          zh: '根据公开资料，RH与Revolut、N26、Trade Republic、Trading 212的一些对比（这部分由 AI 协助整理，并按表格下方来源核对）：',
        },
      ],
      table: platformComparison,
    },
    {
      id: 'fund-risk',
      title: { en: '2. What if the MMF itself loses money?', zh: '2 风险点2: MMF基金本身的亏损' },
      subtitle: { en: '2.1 What is an MMF?', zh: '2.1 什么是MMF' },
      paragraphs: [
        {
          en: 'An MMF is a relatively safe, easy-to-access fund with steady returns—you can put money in and take it out at any time. It mainly holds short-term debt from borrowers with strong credit ratings. With stocks, you’re relying on the price going up or down. An MMF earns interest on the short-term debt it holds.',
          zh: 'MMF是一种高安全性、高流动性（可以随时存取）、稳定收益的基金，主要投资于高信用质量的短期债务资产。与股票依靠资产本身的价格涨跌获得收益不同，MMF依靠持有短期债务资产获得利息。',
        },
        {
          en: 'The basic idea is that the fund manager pools everyone’s money and buys short-term government debt, commercial paper, repurchase agreements, bank certificates of deposit, and similar assets. As these mature, the fund gets back the principal and interest, buys new short-term assets, and pays out income to investors.',
          zh: '运行原理是，基金管理公司把大量投资人的钱汇集起来，拿去投资于短期国债、商业票据、回购协议、银行定期存单这类短期资产。随着这些资产不断到期，基金不断收回本金和利息，再投资于新的短期资产，同时将收益分红给用户。',
        },
        {
          en: 'The further into the future you look, the more uncertainty there is. MMFs keep that risk down by holding very short-term assets. That’s also why their returns tend to follow short-term interest rates: rates go up → MMF yields usually go up; rates go down → yields usually go down.',
          zh: '金融学中，时间越长，不确定性越大。MMF通过投资极其短期的资产来降低风险，也正因此，MMF的收益率通常跟随市场的短期利率变化，一般来说，加息->MMF收益上升、降息->MMF收益下降。',
        },
        {
          en: 'Overall, MMFs are much less risky than regular bond or stock funds. But that doesn’t mean nothing can go wrong. For example:',
          zh: '总体来说，MMF的风险远低于普通债券基金和股票基金。但它也不是完全没有风险，比如：',
        },
      ],
      bullets: [
        {
          en: '(1) Credit default risk: a borrower behind one of the fund’s investments could get into trouble and fail to pay back the principal or interest on time.',
          zh: '(1)信用违约风险：底层资产的发债主体可能出现经营危机或无法按时兑付本息',
        },
        {
          en: '(2) Liquidity risk: if the market panics and lots of people want their money back at once, the manager may have to sell good-quality bonds at a loss before they mature. Then the fund really does lose money, which can push even more people to withdraw.',
          zh: '(2) 流动性风险：如果市场突发恐慌，大量投资者在短时间同时要求赎回，基金经理可能被迫在市场上亏本贱卖未到期的优质债券，这会导致基金资产真的出现亏损，进而恶化挤兑。',
        },
      ],
      afterBullets: [
        {
          en: 'In the past ten years, European MMFs haven’t had a major case where defaults in their underlying investments directly caused fund losses. But when COVID hit in early 2020, they did face serious liquidity problems and a rush of withdrawals. The ECB stepped in, and there weren’t widespread, substantial losses of principal. That episode also led to the major changes to EU MMF regulation that followed.',
          zh: '过去十年中，欧洲MMF没有发生过由于底层资产信用违约导致基金资产直接亏损的重大案例。但是在2020年新冠初期，欧洲MMF曾遭遇了严重的流动性危机和挤兑风波。当时欧央行紧急干预，没有导致大面积的实质性本金亏损，这也引发了随后的欧盟MMF监管大改革。',
        },
      ],
    },
    {
      id: 'the-underlying-fund',
      title: { en: '2.2 Which MMF does Robinhood use? Is it safe?', zh: '2.2 RH的cash被投进哪只MMF？安全吗？' },
      paragraphs: [
        {
          en: 'Robinhood uses the J.P. Morgan EUR Liquidity LVNAV Fund, a top-tier MMF that J.P. Morgan set up in Luxembourg. It has around €40 billion in assets, so it’s a large euro MMF.',
          zh: 'RH实际使用的MMF是J.P. Morgan EUR Liquidity LVNAV Fund，是由JP Morgan设立在卢森堡的顶级货币市场基金，目前总资产规模约400亿欧元，属于大型欧元MMF。',
        },
        {
          en: 'It’s an LVNAV fund—short for low-volatility net asset value. There are strict limits on what it can invest in: very highly rated, very short-term government bonds, bank deposits, repurchase agreements, and similar assets.',
          zh: '它属于LVNAV（低波动性净资产价值基金），投资范围被严格限制在极高信用评级、极短期的政府债券、银行存款和回购协议等。',
        },
        {
          en: 'It has the top ratings from all three major rating agencies: Moody’s Aaa-mf, S&P AAAm, and Fitch AAAmmf.',
          zh: '这只MMF具有顶级信用评级，它同时获得了国际三大评级机构的最高安全评级（穆迪 Aaa-mf、标普 AAAm、惠誉 AAAmmf）。',
        },
        {
          en: 'Its rating in the EU’s official KID risk system is 1 out of 7, the lowest category.',
          zh: '在欧盟官方的KID风险分级体系中，它属于1/7（最低风险级别）。',
        },
        {
          en: 'Add the EU’s strict MMF rules to that, and the overall risk in this fund looks very small. Still, remember that the €22,000 Lithuanian protection doesn’t cover the MMF losing money. It’s a fund after all, and losses on the investment itself count as market risk.',
          zh: '加上现在欧盟MMF法规相当严苛，总的来说RH底层这只MMF的风险非常小。但还是得注意22000欧元的立陶宛投资者保护计划并不适用于MMF亏损的情况，因为MMF毕竟是基金，其本身的亏损属于投资市场风险。',
        },
      ],
    },
    {
      id: 'my-invitation',
      title: { en: 'My invitation', zh: '我的邀请' },
      paragraphs: [
        {
          en: 'If you found this helpful and want to try Robinhood, feel free to use my referral link. ',
          zh: '如果你觉得这个信息有帮助到你且感兴趣，欢迎用我的邀请链接，',
          emphasis: {
            en: 'Robinhood is currently offering €50 when you open an account through the link.',
            zh: '当前通过链接开户Robinhood送50€',
          },
        },
      ],
      links: [{
        label: { en: 'https://join.robinhood.com/eu_crypto/hood-29cf8e9a9/', zh: 'https://join.robinhood.com/eu_crypto/hood-29cf8e9a9/' },
        href: 'https://join.robinhood.com/eu_crypto/hood-29cf8e9a9/',
        sponsored: true,
      }],
    },
    {
      id: 'source-check-notes',
      title: { en: 'Source-check notes · 1 November 2026', zh: '资料核对注释 · 2026 年 11 月 1 日' },
      paragraphs: [{
        en: 'A few checks and clarifications to read alongside the original post: what the sources say, where there are conditions to keep in mind, and what couldn’t be confirmed. This is a record of my research, not advice on what you personally should invest in.',
        zh: '以下注释独立于上方原文，说明资料支持的范围、需要补充的条件，以及未能独立确认之处。本文是个人研究记录，不是针对个人情况的投资建议。',
      }],
      bullets: [
        {
          en: 'Yield and withdrawals [1–2]. When checked, Robinhood’s EU page showed 5% including the top-up. The screenshot does show 2.52% + 2.48%, but there’s no date on it, so don’t treat that split as today’s rate. The offer can change. “Withdraw at any time” also comes with conditions: settlement can take longer under the agreement, and unusual market conditions can mean further delays or exit charges.',
          zh: '收益与存取 [1–2]：核对时 Robinhood 欧洲官网展示了补贴后的 5%。所附截图确实显示 2.52%＋2.48%，但没有截取日期，不能作为当前分项利率的确认。补贴可调整。“随时存取”也有条件：协议允许结算延迟，极端情况下可能更久或产生退出费用。',
        },
        {
          en: 'Investor protection [2–3]. The company you’re dealing with here is Robinhood Europe, UAB. Lithuania’s scheme covers eligible assets it can’t return, up to €22,000 per investor. It doesn’t cover the fund losing money. Keeping customer assets separate helps with getting them back, but doesn’t guarantee when that happens or what the outcome will be. It’s different from bank deposit protection.',
          zh: '投资者保障 [2–3]：相关签约主体是 Robinhood Europe, UAB。立陶宛计划对符合条件且机构无法返还的资产提供每位投资者最高 22,000 欧元保障，不承保基金投资亏损。资产隔离有利于返还，但不能保证返还时间或结果，也不等同于银行存款保障。',
        },
        {
          en: 'The fund and its ratings [4–6]. Robinhood’s KID names the share class as JPM EUR Liquidity LVNAV Select (dist.), ISIN LU2599140782, in the JPMorgan Liquidity Funds – EUR Liquidity LVNAV Fund. The KID dated 17 April 2025 gives it a risk rating of 1/7. The fund provider prepares this document under EU rules; it isn’t a government guarantee. J.P. Morgan reports ratings of Aaa-mf / AAAm / AAAmmf as of 31 August 2026, and €41.41 billion in fund assets as of 13 October 2026. Those figures have dates attached, and the ratings don’t tell us an exact chance of losing money. The fund can also hold high-quality private-sector debt, so the ratings don’t mean every holding is AAA or backed by a government.',
          zh: '基金、份额与评级 [4–6]：Robinhood 链接的 KID 对应 JPM EUR Liquidity LVNAV Select (dist.)，ISIN 为 LU2599140782，所属子基金是 JPMorgan Liquidity Funds – EUR Liquidity LVNAV Fund。2025 年 4 月 17 日版 KID 列出风险等级 1/7；这是发行方依欧盟规则编制的文件，不是欧盟政府担保。J.P. Morgan 披露的三项评级为 Aaa-mf／AAAm／AAAmmf（截至 2026 年 8 月 31 日），基金规模为 414.1 亿欧元（截至 2026 年 10 月 13 日）。这些均有时点限制，不能直接换算成本金亏损概率。持仓也可包含高质量私人部门债务，并非每项资产均为 AAA 或政府担保。',
        },
        {
          en: 'History and rules [7–9]. The claim that Europe had no major credit-loss case in the past ten years, or that the last one was in 2008, couldn’t be confirmed from a complete set of official data. ESMA does describe serious liquidity stress in 2020. Getting through that without widespread failures doesn’t prove that every fund avoided losses. Also, the main EU MMF Regulation was passed in 2017 and took effect in July 2018, before COVID. The 2020 shock led to another review, but ESMA’s 2022 proposals weren’t themselves a new set of rules that had already taken effect.',
          zh: '历史与法规 [7–9]：未找到足以证明“欧洲过去十年没有重大信用亏损案例”或“2008 年是最后一次”的完整官方统计。ESMA 记录了 2020 年的严重流动性压力，未发生大面积失败不能证明所有基金均无亏损。欧盟主要 MMF 法规于 2017 年通过、2018 年 7 月起适用，早于新冠危机；2020 年冲击促成进一步审议，ESMA 在 2022 年提出的改革建议本身并不等于已经落地的疫后全面改革。',
        },
        {
          en: 'The platform comparison. The table replaces the original image, with sources linked for each company. Robinhood’s figures are updated to September 2026; Trade Republic’s staff count is marked as unconfirmed. Robinhood reports total platform assets across its whole group, not just its EU company. Revolut’s customer balances include deposits and off-balance-sheet partner savings / Flexible Cash Funds. That isn’t the same measure as N26’s deposits or the brokers’ client assets. A bigger number or a stock-market listing doesn’t by itself make a platform safer.',
          zh: '平台对比：双语表格替代原图，并逐家附上来源。Robinhood 更新至 2026 年 9 月，未确认的 Trade Republic 员工数已明确标出。Robinhood 平台总资产是集团口径，不等于欧洲签约主体资产。Revolut 客户余额包含存款以及表外合作方储蓄／Flexible Cash Funds，与 N26 的存款及券商客户资产口径不同；规模与上市状态均不能直接证明安全性。',
        },
        {
          en: 'The referral offer [10]. The €50 mentioned in the original post couldn’t be independently confirmed from the public terms. Check the referral page and app for the amount you’ll actually get, who qualifies, and the deposit and holding requirements. The published terms include a 180-day restriction on withdrawing the reward’s cash value. They’re for personal referrals and restrict commercial use. This is my personal invitation link; it doesn’t mean Robinhood has approved an affiliate partnership.',
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
