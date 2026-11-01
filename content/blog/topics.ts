import type { Localized } from './types';

export const topics = ['ai', 'cloud', 'backend', 'kubernetes', 'germany', 'banking', 'investing', 'housing', 'mortgage', 'kitchen'];
export const topicLabels: Record<string, Localized> = {
  ai: { en: 'AI', zh: 'AI' }, cloud: { en: 'Cloud', zh: '云计算' },
  backend: { en: 'Backend', zh: '后端' }, kubernetes: { en: 'Kubernetes', zh: 'Kubernetes' },
  germany: { en: 'Germany', zh: '德国生活' }, banking: { en: 'Banking', zh: '银行' },
  investing: { en: 'Investing', zh: '投资' }, housing: { en: 'Housing', zh: '买房' },
  mortgage: { en: 'Mortgage', zh: '房贷' }, kitchen: { en: 'Kitchen', zh: '厨房' },
};
