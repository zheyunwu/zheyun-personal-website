import Blog from '@/components/blog';
import StructuredData from '@/components/structured-data';
import { corePages, pageMetadata, structuredData } from '@/lib/seo';
import { posts } from '@/content/blog';
import '@/app/blog/blog.css';
export const metadata = pageMetadata(corePages.blog, 'en');
export default function Page() {
  return <><StructuredData data={structuredData(corePages.blog, 'en', 'blog', posts)} /><main id="main" tabIndex={-1}><Blog /></main></>;
}
