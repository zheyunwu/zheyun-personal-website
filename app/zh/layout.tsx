import SiteLayout from '@/components/site-layout';
import { layoutMetadata } from '@/lib/seo';
export const metadata = layoutMetadata;
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout language="zh">{children}</SiteLayout>;
}
