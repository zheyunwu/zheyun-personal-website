'use client';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { localizedPath } from '@/lib/i18n';
import { useLanguage } from './language';

export default function LocalizedLink({ href, ...props }: Omit<ComponentProps<typeof Link>, 'href'> & { href: string }) {
  const { lang } = useLanguage();
  return <Link {...props} href={localizedPath(href, lang)} />;
}
