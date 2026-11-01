import type {MetadataRoute} from 'next';
import {posts} from '@/content/blog';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap {const base=process.env.NEXT_PUBLIC_SITE_URL||'https://zheyun.dev';return ['','/cv','/blog','/privacy','/imprint',...posts.map(p=>`/blog/${p.slug}`)].map(path=>({url:`${base}${path}/`,lastModified:'2026-11-01',changeFrequency:path.startsWith('/blog')?'monthly':'yearly',priority:path===''?1:.7}));}
