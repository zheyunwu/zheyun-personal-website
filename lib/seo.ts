import type { Metadata } from 'next';
import type { Localized, Post } from '@/content/blog/types';
import { htmlLanguage, localizedPath, socialLocale, type Language } from './i18n';

const configuredUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://zheyun.dev');
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || configuredUrl.pathname).replace(/\/$/, '');
export const siteUrl = `${configuredUrl.origin}${basePath}`;
export const siteName = 'Zheyun Wu';
export const defaultSocialImage = '/images/social/zheyun-wu.jpg';

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const rooted = path.startsWith('/') ? path : `/${path}`;
  return `${configuredUrl.origin}${basePath && !rooted.startsWith(`${basePath}/`) ? basePath : ''}${rooted}`;
}

export function languageAlternates(path: string) {
  return {
    en: absoluteUrl(localizedPath(path, 'en')),
    'zh-Hans': absoluteUrl(localizedPath(path, 'zh')),
    'x-default': absoluteUrl(localizedPath(path, 'en')),
  };
}

export const corePages = {
  home: {
    path: '/',
    title: { en: 'Zheyun Wu — AI Platform Engineer in Berlin', zh: 'Zheyun Wu — 柏林 AI 平台工程师' },
    description: { en: 'Zheyun Wu, AI Platform Engineer at SAP in Berlin. Explore my experience, independent IT services, and articles on AI, technology and life in Germany.', zh: '我是 Zheyun Wu，来自中国泉州，现居德国柏林，任职 SAP AI 平台工程师。这里分享科技、AI 与德国生活，也展示我的工作经历、项目和独立 IT 服务。' },
    label: { en: 'Home', zh: '主页' },
  },
  cv: {
    path: '/cv/',
    title: { en: 'About & CV', zh: '关于我与履历' },
    description: { en: 'Explore Zheyun Wu’s engineering experience at SAP, LiangDao, Hopsworks and Tesla, university education, projects, and AWS and LangChain certifications.', zh: '了解 Zheyun Wu 的 SAP、LiangDao、Hopsworks 与 Tesla 工程经历、北欧求学背景、项目及 AWS 和 LangChain 认证。现居德国柏林，提供独立 IT 服务。' },
    label: { en: 'About & CV', zh: '关于我' },
  },
  blog: {
    path: '/blog/',
    title: { en: 'Blog — AI, Technology & Life in Germany', zh: '博客 — 科技、AI 与德国生活' },
    description: { en: 'Research and personal perspectives from Zheyun Wu on AI, cloud engineering and life in Germany, including banking, investing, housing and everyday decisions.', zh: 'Zheyun Wu 的双语博客，分享 AI、云平台与工程实践，以及德国银行、投资、买房和日常生活中的研究与经验。支持按主题浏览和搜索。' },
    label: { en: 'Blog', zh: '博客' },
  },
  privacy: {
    path: '/privacy/',
    title: { en: 'Privacy & Disclosures', zh: '隐私与披露' },
    description: { en: 'How zheyun.dev handles hosting, language selection, contact enquiries and external links, including disclosures for personal referrals and future advertising.', zh: '了解 zheyun.dev 的网站托管、语言选择、联系信息及外部链接处理方式，以及个人邀请链接、联盟链接与广告的相关说明。' },
    label: { en: 'Privacy & disclosures', zh: '隐私与披露' },
  },
  imprint: {
    path: '/imprint/',
    title: { en: 'Site Information & Impressum', zh: '网站信息与 Impressum' },
    description: { en: 'Site information and contact details for Zheyun Wu’s personal website in Berlin, Germany, with photography credits and guidance on content corrections.', zh: 'Zheyun Wu 个人网站的信息与联系邮箱，包括本站介绍、摄影来源及内容更正方式。网站观点仅代表个人，不代表 SAP。' },
    label: { en: 'Site information', zh: '网站信息' },
  },
} satisfies Record<string, { path: string; title: Localized; description: Localized; label: Localized }>;
export type CorePage = keyof typeof corePages;

export const layoutMetadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  icons: { icon: absoluteUrl('/icon.svg') },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
};

type PageInfo = { path: string; title: Localized; description: Localized; image?: string; post?: Post };

function articleDates(post: Post) {
  const published = post.publishedAt || post.date;
  return { published, modified: post.updatedAt || post.updated || published };
}

/** Return complete nested objects: Next's metadata inheritance is a shallow merge. */
export function pageMetadata(info: PageInfo, language: Language): Metadata {
  const url = absoluteUrl(localizedPath(info.path, language));
  const title = info.path === '/' ? info.title[language] : `${info.title[language]} — ${siteName}`;
  const description = info.description[language];
  const dates = info.post ? articleDates(info.post) : undefined;
  const image = { url: absoluteUrl(info.image || defaultSocialImage), width: 1200, height: 630, alt: info.title[language], type: 'image/jpeg' };
  return {
    title: { absolute: title }, description,
    alternates: { canonical: url, languages: languageAlternates(info.path) },
    authors: [{ name: siteName, url: absoluteUrl(localizedPath('/cv/', language)) }],
    openGraph: {
      type: info.post ? 'article' : 'website', url, title, description, siteName,
      locale: socialLocale[language], alternateLocale: [socialLocale[language === 'en' ? 'zh' : 'en']], images: [image],
      ...(dates ? { publishedTime: dates.published, modifiedTime: dates.modified, authors: [absoluteUrl(localizedPath('/cv/', language))] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: [{ url: image.url, alt: image.alt }] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  };
}

export function articleInfo(post: Post): PageInfo {
  return { path: `/blog/${post.slug}/`, title: post.title, description: post.excerpt, image: post.socialImage, post };
}

export function structuredData(info: PageInfo, language: Language, kind: CorePage | 'article', posts: Post[] = []) {
  const url = absoluteUrl(localizedPath(info.path, language));
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const pageId = `${url}#webpage`;
  const person = {
    '@type': 'Person', '@id': personId, name: siteName,
    url: absoluteUrl(localizedPath('/cv/', language)),
    image: absoluteUrl('/images/zheyun-avatar-640.webp'),
    jobTitle: 'AI Platform Engineer', worksFor: { '@type': 'Organization', name: 'SAP' },
    homeLocation: { '@type': 'Place', name: 'Berlin, Germany' },
    sameAs: ['https://www.linkedin.com/in/zheyun-wu/'],
  };
  const website = { '@type': 'WebSite', '@id': websiteId, name: siteName, url: `${siteUrl}/`, inLanguage: ['en', 'zh-CN'], publisher: { '@id': personId } };
  const breadcrumb = [
    { name: corePages.home.label[language], url: absoluteUrl(localizedPath('/', language)) },
    ...(kind === 'article' ? [{ name: corePages.blog.label[language], url: absoluteUrl(localizedPath('/blog/', language)) }] : []),
    ...(kind !== 'home' ? [{ name: kind === 'article' ? info.title[language] : corePages[kind].label[language], url }] : []),
  ];
  const page = {
    '@type': kind === 'cv' ? 'ProfilePage' : kind === 'blog' ? 'CollectionPage' : 'WebPage',
    '@id': pageId, url, name: info.title[language], description: info.description[language], inLanguage: htmlLanguage[language],
    isPartOf: { '@id': websiteId },
    ...(kind === 'cv' || kind === 'home' ? { about: { '@id': personId } } : {}),
    ...(kind === 'cv' ? { mainEntity: { '@id': personId } } : {}),
    ...(kind === 'article' ? { mainEntity: { '@id': `${url}#article` } } : {}),
    ...(kind === 'blog' ? { mainEntity: { '@type': 'ItemList', itemListElement: posts.map((post, index) => ({ '@type': 'ListItem', position: index + 1, name: post.title[language], url: absoluteUrl(localizedPath(`/blog/${post.slug}/`, language)) })) } } : {}),
    ...(kind !== 'home' ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
  };
  const article = info.post ? {
    '@type': 'BlogPosting', '@id': `${url}#article`, url, mainEntityOfPage: { '@id': pageId },
    headline: info.post.title[language], description: info.post.excerpt[language],
    inLanguage: htmlLanguage[language], datePublished: articleDates(info.post).published, dateModified: articleDates(info.post).modified,
    author: { '@type': 'Person', '@id': personId, name: siteName, url: person.url }, publisher: { '@id': personId },
    image: [absoluteUrl(info.image || defaultSocialImage), ...info.post.body.flatMap(section => section.image ? [absoluteUrl(section.image.src)] : [])],
    isAccessibleForFree: true,
    articleSection: info.post.category === 'technology' ? (language === 'en' ? 'Technology' : '技术') : (language === 'en' ? 'Life in Germany' : '德国生活'),
  } : undefined;
  return { '@context': 'https://schema.org', '@graph': [website, person, page, ...(kind !== 'home' ? [{ '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: breadcrumb.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.url })) }] : []), ...(article ? [article] : [])] };
}
