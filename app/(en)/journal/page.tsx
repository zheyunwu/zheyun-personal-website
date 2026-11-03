import type { Metadata } from 'next';
import LegacyBlogRedirect from '@/components/legacy-blog-redirect';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Blog',
  alternates: { canonical: absoluteUrl('/blog/') },
  robots: { index: false, follow: true },
};

export default function LegacyBlogPage() {
  return <LegacyBlogRedirect href="/blog/" />;
}
