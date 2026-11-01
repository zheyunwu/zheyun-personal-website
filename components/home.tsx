'use client';

import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useLanguage } from './language';
import { posts, formatPostDate } from '@/content/posts';

const asset = (path: string) => (process.env.NEXT_PUBLIC_BASE_PATH || '') + path;

export function Home() {
  const { lang, t } = useLanguage();
  return (
    <main id="main">
      <section className="hero container" aria-labelledby="home-title">
        <div className="hero-copy">
          <div className="hero-person">
            <img src={asset('/images/zheyun_avatar.jpg')} alt={t('Zheyun Wu', 'Zheyun Wu 的头像')} width={1056} height={1056} />
            <p>{t('From Quanzhou, China. At home in Berlin, Germany.', '来自中国泉州，现居德国柏林。')}<span>{t('AI Platform Engineer at SAP', 'SAP · AI 平台工程师')}</span></p>
          </div>
          <h1 id="home-title">{t('Hi, I’m ', '你好，我是 ')}<span>Zheyun.</span></h1>
          <p className="hero-lead">{t('I build AI platforms, make things for everyday life, and share what I learn.', '构建 AI 平台，开发日常用得上的产品，也分享一路学到的事。')}</p>
          <p className="hero-description">{t('This is where my engineering work meets life in Germany. You’ll find projects, technical notes, and the questions I’m working through.', '这里记录我的工程实践与德国生活：做过的项目、技术笔记，以及正在认真寻找答案的问题。')}</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/cv/">{t('More about me', '认识我')}<ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link className="text-link" href="/journal/">{t('Read my journal', '读读我的手记')}<ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
          <p className="hero-languages">{t('Chinese & English · Learning German', '中文、英文流利 · 德语学习中')}</p>
        </div>
        <figure className="hero-figure">
          <img className="hero-image" src={asset('/images/stockholm.jpg')} alt={t('Boats on the Stockholm waterfront at dusk, with the old town across the water', '暮色中的斯德哥尔摩海滨，水面上的船只与远处的老城')} width={1600} height={1200} fetchPriority="high" />
          <figcaption><span>{t('Stockholm, from my camera roll.', '斯德哥尔摩，来自我的相册。')}</span><span>{t('A place in my story', '旅程中的一站')}</span></figcaption>
        </figure>
      </section>

      <section className="now-section container" aria-labelledby="now-title">
        <div className="section-aside"><h2 id="now-title">{t('These days', '最近在做')}</h2><p>{t('Work, side projects, and a new language.', '工作、个人项目，还有一门新语言。')}</p></div>
        <div className="now-list">
          <article><div className="now-title"><h3>{t('AI platforms at SAP', '在 SAP 构建 AI 平台')}</h3><span className="now-context">{t('Work', '工作')}</span></div><p>{t('Working where software and cloud infrastructure come together to support AI applications.', '围绕软件与云基础设施开展平台工程，为 AI 应用提供支持。')}</p></article>
          <article><div className="now-title"><h3><a href="https://klardocs.com" target="_blank" rel="noopener noreferrer">KlarDocs <ArrowUpRight size={18} aria-hidden="true" /></a></h3><span className="now-context">{t('Personal project', '个人项目')}</span></div><p>{t('An AI companion for German paperwork: understanding letters, finding deadlines, and making the next step clearer.', '理解德国信件、找出重要期限，让文书中的下一步行动更清楚。')}</p></article>
          <p className="now-footnote">{t('And in between: learning German and finding my rhythm in Berlin, Germany.', '工作之余，学习德语，也慢慢找到在德国柏林的生活节奏。')}</p>
        </div>
      </section>

      <section className="journal-home" aria-labelledby="notes-title">
        <div className="container home-reading-layout">
          <div className="home-reading-heading"><p className="eyebrow">{t('The journal', '我的手记')}</p><h2 id="notes-title">{t('Notes worth sharing.', '把值得分享的，记下来。')}</h2><p>{t('Engineering on one page. Life in Germany on the next.', '这一页是工程技术，下一页是德国生活。')}</p><Link className="text-link" href="/journal/">{t('Browse all notes', '浏览全部手记')}<ArrowRight size={18} aria-hidden="true" /></Link></div>
          <div className="home-posts">{posts.map(post => <article className="home-post" key={post.slug}>
            <div className="home-post-meta"><span>{post.category === 'technology' ? t('Engineering', '工程技术') : t('Life & observations', '生活与观察')}</span><span>{t(`${post.readTime} min read`, `${post.readTime} 分钟阅读`)}</span></div>
            <h3><Link href={`/journal/${post.slug}/`}>{post.title[lang]}<ArrowUpRight size={22} aria-hidden="true" /></Link></h3>
            <p>{post.excerpt[lang]}</p><time dateTime={post.date}>{formatPostDate(post.date, lang)}</time>
          </article>)}</div>
        </div>
      </section>

      <section className="services-section container" id="contact" aria-labelledby="services-title">
        <div className="services-intro"><p className="eyebrow">{t('Independent IT services', '独立 IT 服务')}</p><h2 id="services-title">{t('Have a project in mind?', '有个项目想聊聊？')}</h2><p>{t('Tell me what you’re trying to build, improve, or untangle. We can work out the scope and a practical next step together.', '无论是想做一个产品、改进现有系统，还是理清技术上的难题，都可以告诉我。我们一起明确需求，找到实际可行的下一步。')}</p><a className="text-link contact-email" href="mailto:zheyun.wu.work@gmail.com">zheyun.wu.work@gmail.com<ArrowUpRight size={19} aria-hidden="true" /></a></div>
        <dl className="services-list"><div><dt>{t('Cloud & platforms', '云与平台')}</dt><dd>{t('Infrastructure, deployment workflows, and reliable operations.', '基础设施、部署流程与可靠的系统运维。')}</dd></div><div><dt>{t('Web & backend', '网站与后端')}</dt><dd>{t('Websites, applications, and the services that connect them.', '网站、应用，以及支撑它们的后端服务。')}</dd></div><div><dt>{t('AI applications', 'AI 应用')}</dt><dd>{t('From an initial idea to a working product with clear boundaries.', '从初步想法，到职责明确、实际可用的产品。')}</dd></div></dl>
      </section>
    </main>
  );
}
