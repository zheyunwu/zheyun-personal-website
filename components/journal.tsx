'use client';

import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLanguage } from './language';
import { posts, topics, topicLabels, formatPostDate, type Post } from '../content/posts';

export function JournalCard({ post }: { post: Post }) {
  const { lang, t } = useLanguage();
  return (
    <article className="journal-entry">
      <div className="journal-entry-details">
        <span className="journal-entry-category">{post.category === 'technology' ? t('Technology', '技术') : t('Life in Germany', '德国生活')}</span>
        <time dateTime={post.date}>{formatPostDate(post.date, lang)}</time>
        <span>{post.readTime} {t('min read', '分钟阅读')}</span>
      </div>
      <div className="journal-entry-copy">
        <p className="journal-entry-format">{post.format[lang]}</p>
        <h2><Link href={`/journal/${post.slug}/`}>{post.title[lang]}</Link></h2>
        <p className="journal-entry-excerpt">{post.excerpt[lang]}</p>
        <div className="journal-entry-bottom">
          <span className="journal-entry-topics">{post.tags.map(tag => topicLabels[tag]?.[lang] ?? tag).join(' · ')}</span>
          <Link className="journal-read-link" href={`/journal/${post.slug}/`} aria-label={`${t('Read', '阅读')} ${post.title[lang]}`}>
            {t('Read note', '阅读全文')}<ArrowRight size={19} aria-hidden="true" />
          </Link>
        </div>
      </div>
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
  const isFiltered = category !== 'all' || topic !== 'all' || query.trim() !== '';

  return (
    <div className="journal-page container">
      <header className="journal-heading">
        <div className="journal-heading-row">
          <h1>{t('The journal.', '技术与生活手记。')}</h1>
          <p>{t('What I’m learning about AI and engineering, and the everyday details of making a life in Germany.', '记录 AI 与工程中的所学，也分享在德国生活时，值得认真研究的日常小事。')}</p>
        </div>
      </header>

      <section className="journal-library" aria-label={t('Browse articles', '浏览文章')}>
        <div className="journal-toolbar">
          <div className="journal-categories" aria-label={t('Categories', '分类')}>
            {([{ value: 'all', en: 'All notes', zh: '全部手记' }, { value: 'technology', en: 'Technology', zh: '技术' }, { value: 'life', en: 'Life', zh: '生活' }] as const).map(item => (
              <button key={item.value} type="button" aria-pressed={category === item.value} onClick={() => selectCategory(item.value)}>
                {t(item.en, item.zh)}<span>{item.value === 'all' ? posts.length : posts.filter(post => post.category === item.value).length}</span>
              </button>
            ))}
          </div>
          <label className="journal-search">
            <Search size={20} aria-hidden="true" />
            <span className="sr-only">{t('Search the journal', '搜索手记')}</span>
            <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t('Search notes', '搜索手记')} />
          </label>
        </div>
        <div className="journal-filter-row">
          <label className="journal-topic-filter" htmlFor="journal-topic">
            <span>{t('Topic', '主题')}</span>
            <select id="journal-topic" value={topic} onChange={event => setTopic(event.target.value)}>
              <option value="all">{t('All topics', '全部主题')}</option>
              {topics.map(tag => <option key={tag} value={tag}>{topicLabels[tag][lang]}</option>)}
            </select>
          </label>
          <div className="journal-results">
            <p role="status">{t(`${filtered.length} ${filtered.length === 1 ? 'note' : 'notes'}`, `共 ${filtered.length} 篇手记`)}</p>
            {isFiltered ? <button type="button" onClick={reset}>{t('Clear filters', '清除筛选')}</button> : null}
          </div>
        </div>
        {filtered.length ? <div className="journal-entries">{filtered.map(post => <JournalCard key={post.slug} post={post} />)}</div> : (
          <div className="journal-empty">
            <h2>{query ? t('No notes found.', '暂时没有找到。') : t('More to come.', '这个主题，还在准备中。')}</h2>
            <p>{query ? t('Try another search, or return to the full collection.', '换一个关键词试试，或返回全部手记。') : t('There are no published notes on this topic yet. Banking, savings, housing, mortgages, and kitchens are on the research list.', '这个主题暂时还没有文章。银行、存款、买房、房贷和厨房，都已列入未来的研究选题。')}</p>
            <button className="button" type="button" onClick={reset}>{t('Browse all notes', '浏览全部手记')}<ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        )}
      </section>

      <aside className="journal-endnote">
        <div><h2>{t('Have a question in mind?', '你也在研究什么问题？')}</h2><p>{t('A technical question, a shared experience, or an idea for a future note. I’d be glad to hear from you.', '一个技术问题，一段相似的经历，或是希望看到的选题。欢迎写信来聊聊。')}</p></div>
        <a href="mailto:zheyun.wu.work@gmail.com" className="text-link">{t('Say hello', '写信给我')}<ArrowRight size={18} aria-hidden="true" /></a>
      </aside>
    </div>
  );
}
