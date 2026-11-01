import type { Post } from './types';
import { robinhoodEuroYieldPost } from './robinhood-euro-yield-safety/post';
// import { fromPrototypeToPlatformPost } from './from-prototype-to-platform/post';
// import { aHomeInGermanyPost } from './a-home-in-germany/post';
// import { aHomeForIdeasPost } from './a-home-for-ideas/post';

export type { Localized, PostLink, PostImage, PostTable, PostSection, Post } from './types';
export { topics, topicLabels } from './topics';

export const posts: Post[] = [
  robinhoodEuroYieldPost,
  // fromPrototypeToPlatformPost,
  // aHomeInGermanyPost,
  // aHomeForIdeasPost,
];

export function formatPostDate(date: string, lang: 'en' | 'zh') {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'zh-CN', {
    day: '2-digit', month: lang === 'en' ? 'short' : 'long', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));
}
