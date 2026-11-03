import { Legal } from '@/components/legal';
import StructuredData from '@/components/structured-data';
import { corePages, pageMetadata, structuredData } from '@/lib/seo';


export const metadata = pageMetadata(corePages.imprint, 'zh');
export default function Page() {
  return <><StructuredData data={structuredData(corePages.imprint, 'zh', 'imprint')} /><Legal kind="imprint" /></>;
}
