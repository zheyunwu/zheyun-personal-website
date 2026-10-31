'use client';

import Link from 'next/link';
import { useLanguage } from './language';
import { JournalVisual } from './journal';
import { formatPostDate, topicLabels, type Post, type PostLink } from '../content/posts';

export function ArticleExternalLink({ link }: { link: PostLink }) {
  const { lang, t } = useLanguage();
  return <a href={link.href} target="_blank" rel={link.sponsored ? 'sponsored noopener noreferrer' : 'noopener noreferrer'} className="article-source-link">{link.label[lang]} {link.sponsored ? <span>({t('affiliate link', '联盟链接')})</span> : null}<span aria-hidden="true">↗</span><span className="sr-only">{t(' (opens in a new tab)', '（在新标签页打开）')}</span></a>;
}

export default function Article({ post, nextPost }: { post: Post; nextPost: Post }) {
  const { lang, t } = useLanguage();
  const hasAffiliateLinks = post.affiliate || post.body.some(section => section.links?.some(link => link.sponsored));
  return <article className="article-page container">
    <Link href="/journal/" className="article-back text-link"><span aria-hidden="true">←</span> {t('Back to the journal', '返回手记')}</Link>
    <header className="article-heading"><p className="eyebrow">{post.format[lang]} <span> / {t(post.category === 'technology' ? 'TECHNOLOGY' : 'LIFE & BEYOND', post.category === 'technology' ? '技术' : '生活')}</span></p><h1>{post.title[lang]}</h1><p className="article-deck">{post.excerpt[lang]}</p><div className="article-meta"><time dateTime={post.date}>{formatPostDate(post.date, lang)}</time><span>{post.readTime} {t('min read', '分钟阅读')}</span><span>{t('The journal', '个人手记')}</span></div></header>
    <JournalVisual visual={post.visual} className="article-visual" />
    <div className="article-layout"><aside className="article-toc"><span className="eyebrow">{t('IN THIS NOTE', '本文目录')}</span><nav aria-label={t('Table of contents', '文章目录')}>{post.body.map((section, i) => <a href={`#${section.id}`} key={section.id}><span>{String(i + 1).padStart(2, '0')}</span>{section.title[lang]}</a>)}</nav><div className="article-tags">{post.tags.map(tag => <span className="tag" key={tag}>{topicLabels[tag]?.[lang] || tag}</span>)}</div></aside>
      <div className="article-prose">{hasAffiliateLinks ? <aside className="article-disclosure"><strong>{t('A small disclosure.', '联盟链接说明。')}</strong> {t('This article contains affiliate links. If you choose to use them, this site may earn a commission at no additional cost to you. Affiliate links are individually marked.', '本文包含联盟链接。如果你通过这些链接购买或注册，本站可能获得佣金，而不会增加你的费用。相关链接均会单独标注。')}</aside> : null}{post.body.map(section => <section id={section.id} key={section.id}><h2>{section.title[lang]}</h2>{section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph[lang]}</p>)}{section.bullets ? <ul>{section.bullets.map((bullet, index) => <li key={index}>{bullet[lang]}</li>)}</ul> : null}{section.links ? <div className="article-sources">{section.links.map(link => <ArticleExternalLink key={link.href} link={link} />)}</div> : null}</section>)}<div className="article-finish"><span aria-hidden="true">✳</span><p>{t('Thank you for reading.', '谢谢你读到这里。')}</p></div></div>
    </div>
    <div className="article-next"><p className="eyebrow">{t('KEEP EXPLORING', '继续阅读')}</p><Link href={`/journal/${nextPost.slug}/`}><h2>{nextPost.title[lang]}</h2><span aria-hidden="true">↗</span></Link><p>{nextPost.excerpt[lang]}</p></div>
  </article>;
}
