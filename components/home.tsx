'use client';

import Link from './localized-link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useLanguage } from './language';
import { LifeMap } from './life-map';
import { posts, formatPostDate } from '@/content/blog';

const asset = (path: string) => (process.env.NEXT_PUBLIC_BASE_PATH || '') + path;

export function Home() {
  const { lang, t } = useLanguage();
  return (
    <main id="main">
      <section className="hero container" aria-labelledby="home-title">
        <div className="hero-copy">
          <div className="hero-person">
            <img src={asset('/images/zheyun-avatar-160.webp')} alt={t('Zheyun Wu', 'Zheyun Wu 的头像')} width={160} height={160} />
            <p>{t('From Quanzhou, China. At home in Berlin, Germany.', '来自中国泉州，现居德国柏林。')}<span>{t('AI Platform Engineer at SAP', 'SAP · AI 平台工程师')}</span></p>
          </div>
          <h1 id="home-title"><span className="hero-greeting">{t('Hi, I’m', '你好，我是')}</span>{' '}<span className="hero-name">Zheyun.</span></h1>
          <p className="hero-lead">{t('Sharing technology, AI, and life.', '分享科技、AI、生活')}</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/cv/">{t('About me', '认识我')}<ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link className="text-link" href="/blog/">{t('Read the blog', '看看博客')}<ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
        <LifeMap />
      </section>

      <section className="journal-home" aria-labelledby="notes-title">
        <div className="container home-reading-layout">
          <div className="home-reading-heading"><p className="eyebrow">{t('Blog', '博客')}</p><h2 id="notes-title">{t('Latest posts.', '最新文章')}</h2><Link className="text-link" href="/blog/">{t('Browse all posts', '浏览全部文章')}<ArrowRight size={18} aria-hidden="true" /></Link></div>
          <div className="home-posts">{posts.map(post => <article className="home-post" key={post.slug}>
            <div className="home-post-meta"><span>{post.category === 'technology' ? t('Technology', '技术') : t('Life', '生活')}</span><span>{t(`${post.readTime} min read`, `${post.readTime} 分钟阅读`)}</span></div>
            <h3><Link href={`/blog/${post.slug}/`}>{post.title[lang]}<ArrowUpRight size={22} aria-hidden="true" /></Link></h3>
            <p>{post.excerpt[lang]}</p><time dateTime={post.date}>{formatPostDate(post.date, lang)}</time>
          </article>)}</div>
        </div>
      </section>

      <section className="services-section container" id="contact" aria-labelledby="services-title">
        <div className="services-intro"><p className="eyebrow">{t('Independent IT services', '独立 IT 服务')}</p><h2 id="services-title">{t('Have a project in mind?', '有个项目想聊聊？')}</h2><a className="text-link contact-email" href="mailto:zheyun.wu.work@gmail.com">zheyun.wu.work@gmail.com<ArrowUpRight size={19} aria-hidden="true" /></a></div>
        <dl className="services-list"><div><dt>{t('Cloud & platforms', '云与平台')}</dt><dd>{t('Infrastructure, deployment workflows, and reliable operations.', '基础设施、部署流程与可靠的系统运维。')}</dd></div><div><dt>{t('Web & backend', '网站与后端')}</dt><dd>{t('Websites, applications, and the services that connect them.', '网站、应用，以及支撑它们的后端服务。')}</dd></div><div><dt>{t('AI applications', 'AI 应用')}</dt><dd>{t('From an initial idea to a working product with clear boundaries.', '从初步想法，到职责明确、实际可用的产品。')}</dd></div></dl>
      </section>
    </main>
  );
}
