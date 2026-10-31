'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useLanguage } from './language';
import { posts, topics, topicLabels, formatPostDate, type Post } from '../content/posts';

export function JournalVisual({ visual, className = '' }: { visual: Post['visual']; className?: string }) {
  return (
    <div className={`journal-visual journal-visual--${visual} ${className}`} aria-hidden="true">
      {visual === 'platform' ? <><span className="platform-label">SYSTEMS, THOUGHTFULLY BUILT.</span><span className="platform-frame platform-frame--one" /><span className="platform-frame platform-frame--two" /><span className="platform-frame platform-frame--three" /><span className="platform-core">ai</span><span className="visual-footnote">01 / THE ENGINEERING NOTES</span></> : null}
      {visual === 'home' ? <><span className="home-wall" /><span className="home-door" /><span className="home-window" /><span className="home-shadow" /><span className="visual-footnote">02 / A LIFE IN GERMANY</span></> : null}
      {visual === 'notes' ? <><span className="notes-kicker">A PERSONAL JOURNAL</span><span className="notes-word">Stay<br /><i>curious.</i></span><span className="visual-footnote">03 / NOTES ALONG THE WAY</span></> : null}
    </div>
  );
}

export function JournalCard({ post }: { post: Post }) {
  const { lang, t } = useLanguage();
  return (
    <article className="journal-card">
      <Link href={`/journal/${post.slug}/`} className="journal-card-image" tabIndex={-1} aria-hidden="true"><JournalVisual visual={post.visual} /></Link>
      <div className="journal-card-meta"><span>{post.format[lang]}</span><span>{post.readTime} {t('min read', '分钟阅读')}</span></div>
      <h2><Link href={`/journal/${post.slug}/`}>{post.title[lang]} <span className="journal-card-arrow" aria-hidden="true">↗</span></Link></h2>
      <p>{post.excerpt[lang]}</p>
      <div className="journal-card-bottom"><time dateTime={post.date}>{formatPostDate(post.date, lang)}</time><span>{topicLabels[post.tags[0]]?.[lang] ?? post.tags[0]}</span></div>
    </article>
  );
}

export default function Journal() {
  const { lang, t } = useLanguage();
  const [category, setCategory] = useState<'all' | 'technology' | 'life'>('all');
  const [topic, setTopic] = useState('all');
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => posts.filter(post => {
    const searchText = [post.title.en, post.title.zh, post.excerpt.en, post.excerpt.zh, ...post.tags, ...post.tags.map(tag => topicLabels[tag]?.zh || '')].join(' ').toLocaleLowerCase();
    return (category === 'all' || post.category === category) && (topic === 'all' || post.tags.includes(topic)) && searchText.includes(query.trim().toLocaleLowerCase());
  }), [category, topic, query]);
  const reset = () => { setCategory('all'); setTopic('all'); setQuery(''); };
  const selectCategory = (value: 'all' | 'technology' | 'life') => { setCategory(value); setTopic('all'); };
  return (
    <div className="journal-page container">
      <header className="journal-heading page-heading">
        <p className="eyebrow">{t('THE JOURNAL', '个人手记')} <span>— 01</span></p>
        <div className="journal-heading-row"><h1>{t('Notes on building.', '关于构建。')}<br /><em>{t('And living.', '也关于生活。')}</em></h1><p>{t('Ideas from the world of technology. Observations from a life in Berlin. A little room for everything in between.', '记录技术世界里的想法，也记录柏林生活中的观察。给两者之间的日常，留一点空间。')}</p></div>
      </header>
      <section className="journal-library" aria-label={t('Browse articles', '浏览文章')}>
        <div className="journal-toolbar">
          <div className="journal-categories" aria-label={t('Categories', '分类')}>
            {([{ value: 'all', en: 'All notes', zh: '全部手记' }, { value: 'technology', en: 'Technology', zh: '技术' }, { value: 'life', en: 'Life & beyond', zh: '生活' }] as const).map(item => <button key={item.value} type="button" aria-pressed={category === item.value} onClick={() => selectCategory(item.value)}>{t(item.en, item.zh)} <span>{item.value === 'all' ? posts.length : posts.filter(post => post.category === item.value).length}</span></button>)}
          </div>
          <div className="journal-search"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg><input type="search" value={query} onChange={event => setQuery(event.target.value)} aria-label={t('Search the journal', '搜索手记')} placeholder={t('Find a thought…', '寻找一个想法……')} /></div>
        </div>
        <div className="journal-topics" aria-label={t('Filter by topic', '按主题筛选')}><span className="journal-topic-label">{t('EXPLORE', '探索主题')}</span><button type="button" className={topic === 'all' ? 'is-selected' : ''} aria-pressed={topic === 'all'} onClick={() => setTopic('all')}>{t('All topics', '全部主题')}</button>{topics.map(tag => <button key={tag} type="button" className={topic === tag ? 'is-selected' : ''} aria-pressed={topic === tag} onClick={() => setTopic(tag)}>{topicLabels[tag][lang]}</button>)}</div>
        <p className="journal-results-status" role="status">{t(`${filtered.length} ${filtered.length === 1 ? 'note' : 'notes'} to explore`, `共 ${filtered.length} 篇手记`)}</p>
        {filtered.length ? <div className="journal-grid">{filtered.map(post => <JournalCard key={post.slug} post={post} />)}</div> : <div className="journal-empty"><span className="eyebrow">{t('A LITTLE ROOM FOR WHAT COMES NEXT', '留一点空间，给接下来的内容')}</span><h2>{query ? t('No notes found.', '暂时没有找到。') : t('A new chapter is on its way.', '新的篇章，还在准备中。')}</h2><p>{query ? t('Try another search or explore all the notes.', '试试其他关键词，或者浏览全部手记。') : t('There are no published notes in this selection yet. Banking, savings, housing, mortgages, and kitchens are on the research list.', '这个分类暂时还没有文章。银行、存款、买房、房贷和厨房，都已列入未来的研究选题。')}</p><button className="button" type="button" onClick={reset}>{t('Back to all notes', '查看全部手记')} <span aria-hidden="true">↗</span></button></div>}
      </section>
      <aside className="journal-endnote"><span className="eyebrow">{t('A NOTE ON THIS SPACE', '关于这里')}</span><p>{t('Thoughtful writing takes time. This is an evolving collection—made to be useful, and always open to a good conversation.', '认真写作需要时间。这里会慢慢生长，尽可能写得有用，也始终欢迎有意思的交流。')}</p><a href="mailto:zheyun.wu.work@gmail.com" className="text-link">{t('Say hello', '打个招呼')} <span aria-hidden="true">↗</span></a></aside>
    </div>
  );
}
