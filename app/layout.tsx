import type { Metadata } from 'next';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import './globals.css';
import { LanguageProvider } from '@/components/language';
import { Header, Footer } from '@/components/shell';
export const metadata: Metadata={
 metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'https://zheyun.dev'),
 title:{default:'Zheyun Wu — Thoughtful tech. Intentional living.',template:'%s — Zheyun Wu'},
 description:'AI Platform Engineer at SAP, based in Berlin. Building useful technology, sharing ideas, and finding a sense of home. IT services, projects, and notes on life in Germany.',
 icons:{icon:'/icon.svg'},
 openGraph:{type:'website',locale:'en_US',siteName:'Zheyun Wu',title:'Zheyun Wu — Engineer, builder & explorer',description:'From Quanzhou to Berlin. Thoughts on technology and a life well explored.',images:[{url:'/images/stockholm.jpg',width:1600,height:1200,alt:'Stockholm waterfront at dusk'}]},
 twitter:{card:'summary_large_image'},
 robots:{index:true,follow:true},
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body id="top"><LanguageProvider><Header/>{children}<Footer/></LanguageProvider></body></html>}
