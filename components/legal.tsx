'use client';

import { analyticsConfigured } from '@/lib/analytics';
import { useLanguage } from './language';

const email = 'zheyun.wu.work@gmail.com';

function AnalyticsNotice() {
  const { t } = useLanguage();
  return (
    <>
      <h2 id="analytics">{t('Optional Google Analytics', '可选的 Google Analytics 访问统计')}</h2>
      {analyticsConfigured ? (
        <>
          <p>{t(
            'If you allow analytics, I use Google Analytics 4 (GA4), provided by Google Ireland Limited, to see which pages people visit and how often they click a referral link or an email link. On articles, I measure when 25%, 50%, 75% and 90% of the text has come into view.',
            '经你同意，我会使用 Google Ireland Limited 提供的 Google Analytics 4（GA4），了解读者访问了哪些页面，以及邀请链接和邮箱链接各有多少人次点击。对于博客文章，我会统计有多少次访问浏览到了正文的 25%、50%、75% 和 90% 处。'
          )}</p>
          <p>{t(
            'Google receives browser and session identifiers, the page title, path and language, the referring site, device and browser details and the interaction events above. For EU traffic, Google uses the IP address to estimate location and then discards it. Referral clicks include the provider’s name. The site excludes referral codes, email addresses and email content from these events.',
            'Google 会收到浏览器和会话标识、页面标题、路径和语言、访问来源网站、设备和浏览器信息，以及上述操作记录。对于来自欧盟的访问，Google 根据 IP 地址推算大致位置后会将其丢弃。邀请链接的点击记录包含平台名称。统计事件不包含邀请码、邮箱地址或邮件内容。'
          )}{' '}<a href="https://support.google.com/analytics/answer/12017362">{t('How Google handles EU data', 'Google 如何处理欧盟访问数据')}</a></p>
          <p>{t(
            'Google may process analytics data in the US and other countries. Its transfer safeguards include the EU–US Data Privacy Framework and standard contractual clauses, where applicable.',
            'Google 可能在美国等国家处理统计数据。根据适用情形，跨境传输保障包括欧盟—美国数据隐私框架和标准合同条款。'
          )}{' '}<a href="https://policies.google.com/privacy/frameworks">{t('Google’s transfer safeguards', 'Google 的跨境传输保障')}</a></p>
          <p>{t(
            'I set GA4 to retain user-level and event-level data for two months. Another visit does not restart that period. Google deletes expired data in its monthly cleanup. Totals in standard reports can remain available for longer.',
            '我将 GA4 的用户和事件明细保留期都设为两个月。再次访问不会让保留期重新计时。Google 每月清理到期明细，标准报告中的汇总数字可能保留更久。'
          )}{' '}<a href="https://support.google.com/analytics/answer/7667196">{t('Google’s data retention policy', 'Google 的数据保留说明')}</a></p>
          <h2>{t('Your analytics settings', '管理统计设置')}</h2>
          <p>{t(
            'Analytics starts only after you choose “Allow analytics”. Your consent is the legal basis for storing analytics cookies and processing the resulting data (§ 25(1) TDDDG and Art. 6(1)(a) GDPR). You can use the entire site with analytics off.',
            '选择“允许统计”后，本站才会加载 GA4。写入统计 Cookie 和处理相应数据的法律依据是你的同意（德国《电信数字服务数据保护法》TDDDG 第 25 条第 1 款、《通用数据保护条例》GDPR 第 6 条第 1 款 a 项）。关闭统计后仍可使用全站。'
          )}</p>
          <p>{t(
            'This browser remembers your choice for 180 days. If you opt in, first-party cookies named _ga and _ga_… identify a browser and its sessions for up to 180 days. You can change your mind at any time using “Analytics settings” in the footer. Withdrawing consent stops future collection and clears the site’s GA cookies. It does not affect processing carried out before withdrawal.',
            '浏览器会将你的选择保存 180 天。如果你同意，本站会使用第一方 Cookie（_ga 和以 _ga_ 开头的 Cookie）识别浏览器和会话，最长保存 180 天。随时可以在页脚的“统计设置”中更改选择。撤回同意后，本站会停止后续采集并清除统计 Cookie。撤回前基于同意进行的处理仍然有效。'
          )}</p>
        </>
      ) : (
        <p>{t('Google Analytics is currently off on this site. No analytics cookies are set.', '本站目前未启用 Google Analytics，也不会写入统计 Cookie。')}</p>
      )}
    </>
  );
}

function PrivacyContent() {
  const { t } = useLanguage();
  return (
    <>
      <p>{t(
        'I’m Zheyun Wu, based in Berlin, Germany. I run this personal website and am responsible for how it uses your data. You can reach me at',
        '我是 Zheyun Wu，现居德国柏林。我运营这个个人网站，并负责本站对个人数据的处理。如有隐私问题，可联系'
      )}{' '}<a href={'mailto:' + email}>{email}</a>{t('.', '。')}</p>
      <h2>{t('Hosting & your browser', '托管与浏览器')}</h2>
      <p>{t(
        'GitHub Pages hosts this site. GitHub processes technical request data, including IP addresses, to deliver pages to your browser. Fonts and images are served from this website.',
        '本站托管于 GitHub Pages。为了向你的浏览器提供网页，GitHub 会处理包括 IP 地址在内的技术请求数据。字体与图片均从本站提供。'
      )}{' '}<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">{t('GitHub Privacy Statement', 'GitHub 隐私声明')}</a></p>
      <p>{t(
        'Each language has its own URL. Switching languages does not set a cookie or store a preference. Search and topic filters work in your browser and are not sent to a database.',
        '每种语言都有独立网址。切换语言不会设置 Cookie 或保存偏好。搜索与主题筛选在浏览器中运行，不会发送至数据库。'
      )}</p>
      <AnalyticsNotice />
      <h2>{t('Contact & external links', '联系与外部链接')}</h2>
      <p>{t(
        'Email links open your email application. If you contact me, I use the information you send to respond to your enquiry. External websites have their own privacy policies.',
        '邮件链接会打开你的邮件应用。如果你联系我，我会使用你发送的信息回复咨询。外部网站适用其各自的隐私政策。'
      )}</p>
      <h2>{t('Referral links, affiliate links & editorial independence', '邀请链接、联盟链接与内容独立性')}</h2>
      <p>{t(
        'Some articles contain clearly marked personal referral or affiliate links, with a disclosure near the beginning of the article. Using these links may provide a reward to me, to you, or to both of us, subject to the provider’s eligibility requirements, current offer terms, and the article’s disclosure. A personal referral link does not by itself mean a formal partnership. These links do not replace the article’s sources or verification notes.',
        '部分文章包含明确标注的个人邀请或联盟链接，相关文章会在开头附近进行披露。使用这些链接可能让作者、读者或双方获得奖励，具体取决于服务商的资格要求、当期活动条款及文章中的说明。个人邀请链接本身不代表正式合作关系，相关链接也不能替代文章的资料来源或核对注释。'
      )}</p>
      <h2>{t('Advertising', '广告')}</h2>
      <p>{t(
        'Google AdSense is not enabled. If advertising is introduced, this notice and the relevant consent controls will be updated before advertising scripts are loaded.',
        'Google AdSense 尚未启用。如未来引入广告，将先更新此说明及相关同意管理功能，再加载广告脚本。'
      )}</p>
      <h2>{t('Your rights', '你的个人数据权利')}</h2>
      <p>{t(
        'Under the GDPR you may request access, correction, deletion, restriction or portability of your personal data, or object to processing, where applicable. Email me to exercise these rights. You may also complain to a data protection authority, such as the Berlin Commissioner for Data Protection and Freedom of Information.',
        '根据 GDPR，你可以在适用情况下申请查阅、更正、删除、限制处理或转移个人数据，也可以对处理提出异议。可通过上方邮箱联系我行使这些权利。你也可以向数据保护监管机构投诉，例如柏林数据保护与信息自由专员。'
      )}{' '}<a href="https://www.datenschutz-berlin.de/buergerinnen-und-buerger/beschwerde/">{t('Contact the Berlin authority', '联系柏林监管机构')}</a></p>
    </>
  );
}

function ImprintContent() {
  const { t } = useLanguage();
  return (
    <>
      <p>Zheyun Wu<br />{t('Berlin, Germany', '德国柏林')}<br /><a href={'mailto:' + email}>{email}</a></p>
      <h2>{t('About this website', '关于本站')}</h2>
      <p>{t('A personal portfolio and blog about engineering and life in Germany. Views are my own. Independent IT service enquiries can be sent to the email above; this website does not represent SAP.', '关于工程技术与德国生活的个人作品集和博客。观点仅代表个人。独立 IT 服务咨询可通过上述邮箱联系；本站不代表 SAP。')}</p>
      <h2>{t('Photography', '摄影来源')}</h2>
      <p>{t('The Stockholm waterfront photograph and portrait were supplied by Zheyun Wu from his personal collection.', '斯德哥尔摩海滨照片与头像由 Zheyun Wu 提供，来自个人相册。')}</p>
      <h2>{t('Content & corrections', '内容与更正')}</h2>
      <p>{t('Articles may include the author’s original Chinese research, an English translation prepared with AI assistance, and separately dated verification notes. The original text and later checks are labelled so readers can distinguish them. Career information is based on the author’s confirmed information and public profiles. Please contact me if you notice an error.', '文章可能包含作者的中文研究原文、由 AI 辅助完成的英文翻译，以及单独注明日期的核对注释。原文与后续核对分别标注，方便读者区分。履历信息基于本人确认的信息与公开个人资料。如发现错误，欢迎联系我。')}</p>
    </>
  );
}

export function Legal({ kind }: { kind: 'privacy' | 'imprint' }) {
  const { t } = useLanguage();
  const privacy = kind === 'privacy';
  return (
    <main id="main" className="container legal-page">
      <h1>{privacy ? t('Privacy & disclosures', '隐私与披露') : t('Site information', '网站信息')}</h1>
      {privacy ? <PrivacyContent /> : <ImprintContent />}
      <p className="legal-updated">
        {privacy ? t('Last updated 17 November 2026', '更新于 2026 年 11 月 17 日') : t('Last updated: 3 November 2026', '更新于：2026 年 11 月 3 日')}
      </p>
    </main>
  );
}
