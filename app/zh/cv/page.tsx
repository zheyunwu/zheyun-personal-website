import { CV } from '@/components/cv';
import StructuredData from '@/components/structured-data';
import { corePages, pageMetadata, structuredData } from '@/lib/seo';

import '@/app/cv/cv.css';
export const metadata = pageMetadata(corePages.cv, 'zh');
export default function Page() {
  return <><StructuredData data={structuredData(corePages.cv, 'zh', 'cv')} /><CV /></>;
}
