'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from './language';

export default function LegacyBlogRedirect({ href }: { href: string }) {
  const { t } = useLanguage();

  useEffect(() => {
    window.location.replace(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${href}${window.location.search}${window.location.hash}`);
  }, [href]);

  return (
    <main id="main" tabIndex={-1} className="container" style={{ paddingBlock: '80px' }}>
      <h1>{t('The blog has moved.', '博客搬家了。')}</h1>
      <p><Link className="text-link" href={href}>{t('Continue to the blog', '前往博客')} →</Link></p>
    </main>
  );
}
