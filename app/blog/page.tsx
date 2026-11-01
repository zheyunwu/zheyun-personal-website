import type { Metadata } from 'next';
import Blog from '../../components/blog';
import './blog.css';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles on AI, cloud infrastructure, backend engineering, and everyday life in Germany. A personal blog by Zheyun Wu.',
  alternates: { canonical: '/blog/' },
};

export default function BlogPage() {
  return <main id="main" tabIndex={-1}><Blog /></main>;
}
