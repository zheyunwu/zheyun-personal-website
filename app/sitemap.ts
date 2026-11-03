import type { MetadataRoute } from 'next';
import { posts } from '@/content/blog';
import { languages, localizedPath } from '@/lib/i18n';
import { absoluteUrl, corePages, languageAlternates } from '@/lib/seo';
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; lastModified?: string }[] = [
    ...Object.values(corePages).map(page => ({ path: page.path })),
    ...posts.map(post => ({ path: `/blog/${post.slug}/`, lastModified: post.updated || post.date })),
  ];
  return pages.flatMap(page => languages.map(language => ({
    url: absoluteUrl(localizedPath(page.path, language)),
    ...(page.lastModified ? { lastModified: page.lastModified } : {}),
    alternates: { languages: languageAlternates(page.path) },
  })));
}
