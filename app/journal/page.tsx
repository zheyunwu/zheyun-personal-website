import type { Metadata } from 'next';
import Journal from '../../components/journal';
import './journal.css';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles on AI, cloud infrastructure, backend engineering, and everyday life in Germany. A personal blog by Zheyun Wu.',
  alternates: { canonical: '/journal/' },
};

export default function JournalPage() {
  return <main id="main" tabIndex={-1}><Journal /></main>;
}
