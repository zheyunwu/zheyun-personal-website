import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Article from '../../../components/article';
import { posts } from '../../../content/posts';
import '../journal.css';

export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find(item => item.slug === slug);
  if (!post) return {};
  return {
    title: post.title.en,
    description: post.excerpt.en,
    alternates: { canonical: `/journal/${post.slug}/` },
    openGraph: { type: 'article', title: post.title.en, description: post.excerpt.en, publishedTime: post.date },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = posts.findIndex(post => post.slug === slug);
  if (index === -1) notFound();
  return <main id="main" tabIndex={-1}><Article post={posts[index]} nextPost={posts[(index + 1) % posts.length]} /></main>;
}
