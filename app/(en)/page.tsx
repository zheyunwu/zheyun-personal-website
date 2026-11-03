import { Home } from '@/components/home';
import StructuredData from '@/components/structured-data';
import { corePages, pageMetadata, structuredData } from '@/lib/seo';


export const metadata = pageMetadata(corePages.home, 'en');
export default function Page() {
  return <><StructuredData data={structuredData(corePages.home, 'en', 'home')} /><Home /></>;
}
