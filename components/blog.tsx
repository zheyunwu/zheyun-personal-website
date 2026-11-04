'use client';

import Link from './localized-link';
import { ArrowRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLanguage } from './language';
import { posts, topics, topicLabels, formatPostDate, type Post } from '../content/blog';

export function BlogCard({ post }: { post: Post }) {
  const { lang, t } = useLanguage();
  return (
    <article className="journal-entry">
      <div className="journal-entry-details">
        <span className="journal-entry-category">{post.category === 'technology' ? t('Technology', '技术') : t('Life', '生活')}</span>
        <time dateTime={post.date}>{formatPostDate(post.date, lang)}</time>
        <span>{post.readTime} {t('min read', '分钟阅读')}</span>
      </div>
      <div className="journal-entry-copy">
        <h2><Link href={`/blog/${post.slug}/`}>{post.title[lang]}</Link></h2>
        <p className="journal-entry-excerpt">{post.excerpt[lang]}</p>
        <div className="journal-entry-bottom">
          <span className="journal-entry-topics">{post.tags.map(tag => topicLabels[tag]?.[lang] ?? tag).join(' · ')}</span>
          <Link className="journal-read-link" href={`/blog/${post.slug}/`} aria-label={`${t('Read', '阅读')} ${post.title[lang]}`}>
            {t('Read article', '阅读全文')}<ArrowRight size={19} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Blog() {
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
        <h1>{t('Blog', '博客')}</h1>
      </header>

      <section className="journal-library" aria-label={t('Browse articles', '浏览文章')}>
        <div className="journal-toolbar">
          <div className="journal-categories" aria-label={t('Categories', '分类')}>
            {([{ value: 'all', en: 'All articles', zh: '全部文章' }, { value: 'technology', en: 'Technology', zh: '技术' }, { value: 'life', en: 'Life', zh: '生活' }] as const).map(item => (
              <button key={item.value} type="button" aria-pressed={category === item.value} onClick={() => selectCategory(item.value)}>
                {t(item.en, item.zh)}<span>{item.value === 'all' ? posts.length : posts.filter(post => post.category === item.value).length}</span>
              </button>
            ))}
          </div>
          <label className="journal-search">
            <Search size={20} aria-hidden="true" />
            <span className="sr-only">{t('Search the blog', '搜索文章')}</span>
            <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t('Search articles', '搜索文章')} />
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
            <p role="status">{t(`${filtered.length} ${filtered.length === 1 ? 'article' : 'articles'}`, `共 ${filtered.length} 篇文章`)}</p>
            {isFiltered ? <button type="button" onClick={reset}>{t('Clear filters', '清除筛选')}</button> : null}
          </div>
        </div>
        {filtered.length ? <div className="journal-entries">{filtered.map(post => <BlogCard key={post.slug} post={post} />)}</div> : (
          <div className="journal-empty">
            <h2>{query ? t('No articles found.', '暂时没有找到。') : t('No articles yet.', '暂无文章。')}</h2>
            {query ? <p>{t('Try another search or clear the filters.', '换个关键词，或清除筛选。')}</p> : null}
            <button className="button" type="button" onClick={reset}>{t('Browse all articles', '浏览全部文章')}<ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        )}
      </section>
    </div>
  );
}
