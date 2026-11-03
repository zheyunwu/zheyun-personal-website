import { Home } from '@/components/home';
import StructuredData from '@/components/structured-data';
import { corePages, pageMetadata, structuredData } from '@/lib/seo';


export const metadata = pageMetadata(corePages.home, 'zh');
export default function Page() {
  return <><StructuredData data={structuredData(corePages.home, 'zh', 'home')} /><Home /></>;
}
