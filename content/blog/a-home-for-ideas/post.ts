import type { Post } from '../types';

export const aHomeForIdeasPost: Post = {
  slug: 'a-home-for-ideas',
  title: { en: 'A home for ideas, and everything in between.', zh: '给想法，也给生活，一个空间。' },
  excerpt: { en: 'Technology, everyday life, and the connections between them. An opening post for this little corner of the internet.', zh: '技术、日常，以及两者之间的连接。写给这个互联网小角落的开篇。' },
  category: 'life', tags: ['germany'], date: '2026-11-01', readTime: 2,
  visual: 'notes', format: { en: 'Opening post', zh: '开篇' },
  body: [
    {
      id: 'two-worlds-one-journal', title: { en: 'Two worlds. One blog.', zh: '两个世界，一个博客。' },
      paragraphs: [
        { en: 'This blog has room for both the systems we build and the lives we build around them. On one side: AI, cloud infrastructure, backend engineering, and Kubernetes. On the other: the practical details of making a life in Germany.', zh: '这个博客既关心我们构建的系统，也关心系统之外的生活。一边是 AI、云基础设施、后端工程和 Kubernetes；另一边，是在德国生活的具体细节。' },
        { en: 'The connection is curiosity. A good engineering question and a good everyday question both begin with paying attention, understanding the constraints, and being willing to revise an assumption.', zh: '把两者连接起来的是好奇心。好的工程问题和好的日常问题，都始于认真观察、理解约束，以及愿意修改自己的假设。' },
      ],
    },
    {
      id: 'what-you-will-find', title: { en: 'What you will find here.', zh: '这里会有什么。' },
      paragraphs: [
        { en: 'The opening collection introduces the subjects and the style of the blog. Future technical articles can explore implementation details and lessons from projects; life articles can collect research, comparisons, and personal observations when those are ready to share.', zh: '首批内容介绍这个博客的主题与写作方式。未来的技术文章会逐步展开实现细节与项目心得；生活文章则会在资料准备好时，整理研究、比较，以及可以分享的个人观察。' },
        { en: 'Use the topic filters to find a particular thread, or read across categories. Some shelves are still empty. That leaves space for thoughtful work.', zh: '可以通过主题筛选找到感兴趣的线索，也可以在不同分类间随意阅读。有些书架暂时还是空的，也为认真写作留下了空间。' },
      ],
    },
    {
      id: 'an-open-conversation', title: { en: 'An open conversation.', zh: '让交流继续。' },
      paragraphs: [{ en: 'A blog is more useful when it invites conversation. For a technical question, a collaboration, or an IT services enquiry, the contact links on this site are a good place to begin.', zh: '一个能够引发交流的博客更有价值。无论是技术问题、合作，还是 IT 服务需求，都可以通过网站上的联系方式开始交流。' }],
    },
  ],
};
