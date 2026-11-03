import type { Metadata } from 'next';
import SiteLayout from '@/components/site-layout';
import { withBasePath } from '@/lib/i18n';

export const metadata: Metadata = { title: 'Page not found — Zheyun Wu', robots: { index: false, follow: true } };
export default function NotFound() {
  return <SiteLayout language="en" languageSwitchPath="/"><main className="not-found" id="main"><span className="eyebrow">404</span><h1>Page not found.</h1><p>This page doesn’t exist or has moved.</p><p lang="zh-CN">这个页面不存在，或已搬到新的地址。</p><a href={withBasePath('/')} className="button button-dark">Back to home ↗</a><a href={withBasePath('/zh/')} className="text-link" lang="zh-CN">返回中文主页 ↗</a></main></SiteLayout>;
}
