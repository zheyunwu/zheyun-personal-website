import { CV } from '@/components/cv';
import StructuredData from '@/components/structured-data';
import { corePages, pageMetadata, structuredData } from '@/lib/seo';

import '@/app/cv/cv.css';
export const metadata = pageMetadata(corePages.cv, 'en');
export default function Page() {
  return <><StructuredData data={structuredData(corePages.cv, 'en', 'cv')} /><CV /></>;
}
