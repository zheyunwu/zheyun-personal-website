'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from './language';
import { formatPostDate, topicLabels, type Post, type PostLink } from '../content/blog';
import ArticleTable from './article-table';
import ArticleImage from './article-image';

const asset = (path: string) => (process.env.NEXT_PUBLIC_BASE_PATH || '') + path;

export function ArticleExternalLink({ link }: { link: PostLink }) {
  const { lang, t } = useLanguage();
  const showReferralLabel = link.sponsored && link.label[lang] !== link.href;
  return <a href={link.href} target="_blank" rel={link.sponsored ? 'sponsored noopener noreferrer' : 'noopener noreferrer'} className="article-source-link"><span>{link.label[lang]}{showReferralLabel ? <span> ({t('referral / affiliate link', '邀请 / 联盟链接')})</span> : null}</span><ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only">{t(' (opens in a new tab)', '（在新标签页打开）')}</span></a>;
}

export default function Article({ post, nextPost }: { post: Post; nextPost?: Post }) {
  const { lang, t } = useLanguage();
  const hasAffiliateLinks = post.affiliate || post.affiliateDisclosure || post.body.some(section => section.links?.some(link => link.sponsored));

  return (
    <article className="article-page container">
      <Link href="/blog/" className="article-back"><ArrowLeft size={18} aria-hidden="true" />{t('Back to blog', '返回博客')}</Link>
      <header className="article-heading">
        <p className="journal-kicker">{post.format[lang]}<span aria-hidden="true"> / </span><span>{post.category === 'technology' ? t('Technology', '技术') : t('Life in Germany', '德国生活')}</span></p>
        <h1>{post.title[lang]}</h1>
        <p className="article-deck">{post.excerpt[lang]}</p>
        <div className="article-byline">
          <Link className="article-author" href="/cv/"><img src={asset('/images/zheyun_avatar.jpg')} width="1056" height="1056" alt="" /><span>Zheyun Wu</span></Link>
          <div className="article-meta"><time dateTime={post.date}>{formatPostDate(post.date, lang)}</time><span>{post.readTime} {t('min read', '分钟阅读')}</span></div>
        </div>
      </header>

      <div className="article-layout">
        <aside className="article-toc">
          <h2>{t('On this page', '本文目录')}</h2>
          <nav aria-label={t('Table of contents', '文章目录')}>{post.body.map(section => <a href={`#${section.id}`} key={section.id}>{section.title[lang]}</a>)}</nav>
          <p className="article-topics">{post.tags.map(tag => topicLabels[tag]?.[lang] || tag).join(' · ')}</p>
        </aside>
        <div className="article-prose">
          {hasAffiliateLinks ? <aside className="article-disclosure"><strong>{post.disclosureTitle?.[lang] ?? t('Referral & affiliate disclosure', '邀请与联盟链接说明')}</strong><p>{post.affiliateDisclosure?.[lang] ?? t('This article contains affiliate links. If you choose to use them, this site may earn a commission at no additional cost to you. Affiliate links are individually marked.', '本文包含联盟链接。如果你通过这些链接购买或注册，本站可能获得佣金，而不会增加你的费用。相关链接均会单独标注。')}</p></aside> : null}
          {post.editorialNote ? <aside className="article-editorial-note" aria-label={t('Editorial note', '作者说明')}><p>{post.editorialNote[lang]}</p></aside> : null}
          {post.body.map(section => (
            <section id={section.id} key={section.id}>
              <h2>{section.title[lang]}</h2>
              {section.subtitle ? <h3>{section.subtitle[lang]}</h3> : null}
              {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph[lang]}{paragraph.emphasis ? <strong>{paragraph.emphasis[lang]}</strong> : null}</p>)}
              {section.bullets ? <ul>{section.bullets.map((bullet, index) => <li key={index}>{bullet[lang]}</li>)}</ul> : null}
              {section.afterBullets?.map((paragraph, index) => <p key={index}>{paragraph[lang]}</p>)}
              {section.image ? <ArticleImage image={section.image} /> : null}
              {section.table ? <ArticleTable table={section.table} id={`${section.id}-table`} /> : null}
              {section.links ? <div className="article-sources">{section.links.map(link => <ArticleExternalLink key={link.href} link={link} />)}</div> : null}
            </section>
          ))}
          <div className="article-finish"><p>{t('Thanks for reading.', '谢谢你读到这里。')}</p><a href="mailto:zheyun.wu.work@gmail.com">{t('Have a thought to share?', '有想法，欢迎写信交流。')}<ArrowRight size={18} aria-hidden="true" /></a></div>
        </div>
      </div>

      {nextPost ? <aside className="article-next" aria-label={t('Read next', '接下来读')}>
        <p className="journal-kicker">{t('Read next', '继续阅读')}</p>
        <div><Link href={`/blog/${nextPost.slug}/`}><h2>{nextPost.title[lang]}</h2><ArrowRight size={26} aria-hidden="true" /></Link><p>{nextPost.excerpt[lang]}</p></div>
      </aside> : null}
    </article>
  );
}
