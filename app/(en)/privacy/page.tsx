import { Legal } from '@/components/legal';
import StructuredData from '@/components/structured-data';
import { corePages, pageMetadata, structuredData } from '@/lib/seo';


export const metadata = pageMetadata(corePages.privacy, 'en');
export default function Page() {
  return <><StructuredData data={structuredData(corePages.privacy, 'en', 'privacy')} /><Legal kind="privacy" /></>;
}
