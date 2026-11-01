import type { Metadata } from 'next';
import LegacyBlogRedirect from '../../components/legacy-blog-redirect';

export const metadata: Metadata = {
  title: 'Blog',
  alternates: { canonical: '/blog/' },
  robots: { index: false, follow: true },
};

export default function LegacyBlogPage() {
  return <LegacyBlogRedirect href="/blog/" />;
}
