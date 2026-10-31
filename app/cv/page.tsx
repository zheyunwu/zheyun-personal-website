import type { Metadata } from 'next';
import { CV } from '../../components/cv';
import './cv.css';

export const metadata: Metadata = {
  title: 'About & CV',
  description: 'The experience, education, selected projects and credentials of Zheyun Wu, an AI Platform Engineer at SAP in Berlin.',
  alternates: { canonical: '/cv/' },
};

export default function CVPage() {
  return <CV />;
}
