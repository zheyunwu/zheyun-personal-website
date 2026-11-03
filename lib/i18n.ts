export const languages = ['en', 'zh'] as const;
export type Language = (typeof languages)[number];
export const htmlLanguage = { en: 'en', zh: 'zh-CN' } as const;
export const searchLanguage = { en: 'en', zh: 'zh-Hans' } as const;
export const socialLocale = { en: 'en_US', zh: 'zh_CN' } as const;

/** URLs, rather than browser state, determine the language of each document. */
export function localizedPath(path: string, language: Language): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const match = path.match(/^([^?#]*)(.*)$/)!;
  const pathname = match[1].replace(/^\/zh(?=\/|$)/, '') || '/';
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `${language === 'zh' ? '/zh' : ''}${normalized}${match[2]}`;
}

export function withBasePath(path: string): string {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
  return base && path !== base && !path.startsWith(`${base}/`) ? `${base}${path}` : path;
}
