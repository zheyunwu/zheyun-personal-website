import type {MetadataRoute} from 'next';
import {posts} from '@/content/posts';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap {const base=process.env.NEXT_PUBLIC_SITE_URL||'https://zheyun.dev';return ['','/cv','/journal','/privacy','/imprint',...posts.map(p=>`/journal/${p.slug}`)].map(path=>({url:`${base}${path}/`,lastModified:'2026-11-01',changeFrequency:path.startsWith('/journal')?'monthly':'yearly',priority:path===''?1:.7}));}
