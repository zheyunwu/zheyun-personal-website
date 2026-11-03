import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LegacyBlogRedirect from '@/components/legacy-blog-redirect';
import { posts } from '@/content/blog';
import { absoluteUrl } from '@/lib/seo';

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
    alternates: { canonical: absoluteUrl(`/blog/${post.slug}/`) },
    robots: { index: false, follow: true },
  };
}

export default async function LegacyArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!posts.some(post => post.slug === slug)) notFound();
  return <LegacyBlogRedirect href={`/blog/${slug}/`} />;
}
