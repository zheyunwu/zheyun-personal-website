import { notFound } from 'next/navigation';
import Article from '@/components/article';
import StructuredData from '@/components/structured-data';
import { posts } from '@/content/blog';
import { articleInfo, pageMetadata, structuredData } from '@/lib/seo';
import '@/app/blog/blog.css';

export const dynamicParams = false;
export function generateStaticParams() { return posts.map(post => ({ slug: post.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find(post => post.slug === slug);
  return post ? pageMetadata(articleInfo(post), 'zh') : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = posts.findIndex(post => post.slug === slug);
  if (index === -1) notFound();
  const post = posts[index];
  const nextPost = posts.length > 1 ? posts[(index + 1) % posts.length] : undefined;
  return <><StructuredData data={structuredData(articleInfo(post), 'zh', 'article')} /><main id="main" tabIndex={-1}><Article post={post} nextPost={nextPost} /></main></>;
}
