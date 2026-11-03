export type Localized = { en: string; zh: string };

export type PostLink = { label: Localized; href: string; sponsored?: boolean };

export type PostTable = {
  caption: Localized;
  columns: Localized[];
  rows: {
    id: string;
    cells: { value: Localized; detail?: Localized; date?: Localized }[];
    sources?: PostLink[];
  }[];
  note?: Localized;
};

export type PostImage = {
  src: string;
  alt: Localized;
  caption?: Localized;
  width: number;
  height: number;
  size?: 'compact';
};

export type PostSection = {
  id: string;
  title: Localized;
  paragraphs: (Localized & { emphasis?: Localized })[];
  bullets?: Localized[];
  afterBullets?: Localized[];
  subtitle?: Localized;
  image?: PostImage;
  table?: PostTable;
  links?: PostLink[];
};

export type Post = {
  slug: string;
  title: Localized;
  excerpt: Localized;
  category: 'technology' | 'life';
  tags: string[];
  date: string;
  updated?: string;
  /** Actual publication/content-update timestamps, including timezone, when known. */
  publishedAt?: string;
  updatedAt?: string;
  socialImage?: string;
  readTime: number;
  visual: 'platform' | 'home' | 'notes';
  format: Localized;
  affiliate?: boolean;
  disclosureTitle?: Localized;
  affiliateDisclosure?: Localized;
  editorialNote?: Localized;
  body: PostSection[];
};
