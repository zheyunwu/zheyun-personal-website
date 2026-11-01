'use client';

import { useLanguage } from './language';

type Localized = [string, string];

const experience: {
  company: string;
  role: Localized;
  date: Localized;
  location: Localized;
  description: Localized;
  technologies: string[];
}[] = [
  {
    company: 'SAP',
    role: ['AI Platform Engineer', 'AI 平台工程师'],
    date: ['Present', '现在'],
    location: ['Berlin, Germany', '德国 · 柏林'],
    description: ['Working in AI platform engineering. Bringing together software, infrastructure and a curiosity for what comes next.', '从事 AI 平台工程，连接软件开发与基础设施，持续探索技术的新可能。'],
    technologies: ['AI platforms', 'Cloud infrastructure'],
  },
  {
    company: 'LiangDao GmbH',
    role: ['Fullstack Engineer', '全栈工程师'],
    date: ['Jan 2023 — Jan 2024', '2023.01 — 2024.01'],
    location: ['Berlin, Germany', '德国 · 柏林'],
    description: ['Full-stack development with Python, React and Node.js, alongside containerized infrastructure on AWS.', '使用 Python、React 和 Node.js 进行全栈开发，并参与 AWS 上的容器化基础设施工作。'],
    technologies: ['Python', 'React', 'Node.js', 'Docker', 'Kubernetes', 'AWS'],
  },
  {
    company: 'LiangDao GmbH',
    role: ["Master’s Thesis Worker", '硕士论文研究'],
    date: ['Apr — Dec 2022', '2022.04 — 2022.12'],
    location: ['Berlin, Germany', '德国 · 柏林'],
    description: ['Research into I/O-aware scheduling for containerized, data-intensive HPC tasks in Kubernetes-based heterogeneous clusters.', '研究基于 Kubernetes 的异构集群中，面向容器化、数据密集型高性能计算任务的 I/O 感知调度。'],
    technologies: ['Kubernetes', 'Python', 'Docker', 'GitLab CI/CD'],
  },
  {
    company: 'Hopsworks',
    role: ['Frontend Developer · Part-time', '前端开发工程师 · 兼职'],
    date: ['Oct 2021 — Jan 2022', '2021.10 — 2022.01'],
    location: ['Stockholm, Sweden', '瑞典 · 斯德哥尔摩'],
    description: ['Frontend development using React, TypeScript and Redux.', '使用 React、TypeScript 和 Redux 进行前端开发。'],
    technologies: ['React', 'TypeScript', 'Redux'],
  },
  {
    company: 'Tesla',
    role: ['Software Engineer Intern', '软件工程师实习生'],
    date: ['Jul — Sep 2021', '2021.07 — 2021.09'],
    location: ['Shanghai, China', '中国 · 上海'],
    description: ['Software development at Gigafactory Shanghai, working with Angular and .NET.', '在上海超级工厂参与软件开发，使用 Angular 和 .NET 技术栈。'],
    technologies: ['Angular', 'TypeScript', '.NET', 'C#'],
  },
  {
    company: 'Siqian Software',
    role: ['Software Developer', '软件开发工程师'],
    date: ['Jan 2020 — Jan 2021', '2020.01 — 2021.01'],
    location: ['Taiwan · Remote', '台湾 · 远程'],
    description: ['Web application development across Vue, Flask and PostgreSQL.', '使用 Vue、Flask 和 PostgreSQL 进行 Web 应用开发。'],
    technologies: ['Vue', 'Flask', 'PostgreSQL', 'Minio', 'Docker'],
  },
];

const education: { school: string; degree: Localized; date: string; location: Localized; note: Localized }[] = [
  {
    school: 'KTH Royal Institute of Technology',
    degree: ['MSc · Computer Science and Engineering', '计算机科学与工程 · 硕士'],
    date: '2021 — 2022',
    location: ['Stockholm, Sweden', '瑞典 · 斯德哥尔摩'],
    note: ['Specialization in Cloud and Network Infrastructures.', '专注于云与网络基础设施。'],
  },
  {
    school: 'Aalto University',
    degree: ["Master’s studies · Computer Science and Engineering", '计算机科学与工程 · 硕士阶段学习'],
    date: '2020 — 2021',
    location: ['Helsinki, Finland', '芬兰 · 赫尔辛基'],
    note: ['Cloud software and systems, big data platforms, networking and cybersecurity.', '学习云软件与系统、大数据平台、网络与网络安全。'],
  },
  {
    school: 'Stockholm University',
    degree: ['Exchange · Computer and System Sciences', '计算机与系统科学 · 交换学习'],
    date: '2019',
    location: ['Stockholm, Sweden', '瑞典 · 斯德哥尔摩'],
    note: ['Department of Computer and Systems Sciences (DSV).', '计算机与系统科学系（DSV）。'],
  },
  {
    school: 'Tamkang University',
    degree: ['Bachelor · Information Management', '资讯管理 · 学士'],
    date: '2015 — 2019',
    location: ['Tamsui, Taiwan', '台湾 · 淡水'],
    note: ['GPA 3.959 / 4.0 · Ranked 1 / 206 in the department.', 'GPA 3.959 / 4.0 · 系排名 1 / 206。'],
  },
];

const projects: { name: string; kind: Localized; year: string; description: Localized; tags: string[]; href: string; link: Localized }[] = [
  {
    name: 'KlarDocs',
    kind: ['AI & everyday life', 'AI 与日常生活'],
    year: '2026',
    description: ['An AI copilot for German paperwork. Understand letters, find important deadlines and search documents across languages. Designed and built as a solo maker.', '帮助理解德国文书的 AI 助手：解释信件、提取重要期限，并支持跨语言搜索文档。由我独立设计与开发。'],
    tags: ['Next.js', 'FastAPI', 'Gemini', 'PostgreSQL'],
    href: 'https://devpost.com/software/know-my-documents',
    link: ['Explore the project', '了解项目'],
  },
  {
    name: 'SkyForge',
    kind: ['On-chain experiment', '链上应用探索'],
    year: '2026',
    description: ['A real-time multiplayer auction game on Ethereum Sepolia, connecting Solidity contracts with a Next.js frontend and wallet interactions.', '基于 Ethereum Sepolia 的实时多人拍卖游戏，以 Next.js 前端连接 Solidity 合约与钱包交互。'],
    tags: ['Solidity', 'Next.js', 'wagmi', 'viem'],
    href: 'https://www.linkedin.com/in/zheyun-wu/',
    link: ['Details on LinkedIn', '在 LinkedIn 查看'],
  },
  {
    name: 'German Immo Flow',
    kind: ['A practical tool', '实用工具'],
    year: '2025',
    description: ['A German mortgage calculator for exploring loan amortization, monthly payments, cash flow and internal rate of return.', '面向德国房贷的计算工具，帮助分析贷款摊还、月供、现金流和内部收益率。'],
    tags: ['Mortgage', 'Cash flow', 'Calculator'],
    href: 'https://www.linkedin.com/in/zheyun-wu/',
    link: ['Details on LinkedIn', '在 LinkedIn 查看'],
  },
  {
    name: 'An I/O-aware scheduler',
    kind: ['Master’s thesis', '硕士论文'],
    year: '2022',
    description: ['Exploring how data-intensive HPC workloads can be scheduled in containerized, heterogeneous Kubernetes clusters.', '探索容器化异构 Kubernetes 集群中数据密集型高性能计算任务的调度。'],
    tags: ['Kubernetes', 'HPC', 'Research'],
    href: 'https://www.diva-portal.org/smash/get/diva2%3A1725008/FULLTEXT01.pdf',
    link: ['Read the thesis', '阅读论文'],
  },
];

const awsCredentials = [
  { name: 'Solutions Architect — Associate', earned: '2023.10', until: '2026.10', url: 'https://www.credly.com/badges/cf36015c-0e81-41fc-bf5a-afe4c375c68f/public_url' },
  { name: 'Developer — Associate', earned: '2023.09', until: '2026.09', url: 'https://www.credly.com/badges/a559b987-6817-4ad3-aa09-b36bce859798/public_url' },
  { name: 'Cloud Practitioner', earned: '2023.08', until: '2026.10', url: 'https://www.credly.com/badges/d92087bd-31ee-48b4-982d-7484d51bf7ed/public_url' },
];

export function CV() {
  const { t } = useLanguage();
  const localized = (value: Localized) => t(value[0], value[1]);
  const sections = [
    ['experience', t('Experience', '工作经历')],
    ['education', t('Education', '教育背景')],
    ['projects', t('Selected projects', '精选项目')],
    ['credentials', t('Certifications', '证书与认证')],
  ];

  return (
    <main id="main" className="cv-page container">
      <header className="cv-intro">
        <div className="cv-intro-copy">
          <p className="cv-kicker">{t('About & CV', '关于我与履历')}</p>
          <h1>Zheyun Wu<span>.</span></h1>
          <p className="cv-intro-role">{t('AI Platform Engineer at SAP', 'SAP · AI 平台工程师')}</p>
          <p className="cv-intro-description">{t('I’m an engineer from Quanzhou, now based in Berlin. My work connects software, cloud infrastructure and AI. Along the way, I’ve studied in the Nordics, built products, and kept learning by making things.', '我是一名来自福建泉州、现居柏林的工程师，工作围绕软件开发、云基础设施与 AI 展开。一路走来，我曾在北欧求学，也在持续通过做项目、造产品，学习新的东西。')}</p>
          <div className="cv-actions">
            <button className="button cv-print-button" onClick={() => window.print()}>{t('Print / Save PDF', '打印 / 保存 PDF')}<span aria-hidden="true">↗</span></button>
            <a className="text-link" href="https://www.linkedin.com/in/zheyun-wu/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <figure className="cv-portrait">
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/zheyun_avatar.jpg`} alt={t('Zheyun Wu by the Stockholm waterfront', 'Zheyun Wu 在斯德哥尔摩海滨')} width={1056} height={1056} />
          <figcaption>{t('From Quanzhou to Berlin.', '从泉州，到柏林。')}<br />{t('A few Nordic chapters in between.', '途经北欧的求学时光。')}</figcaption>
        </figure>
      </header>

      <div className="cv-layout">
        <aside className="cv-sidebar">
          <div className="cv-sidebar-sticky">
            <nav className="cv-section-nav" aria-label={t('CV sections', '简历章节')}>
              <p className="cv-sidebar-title">{t('On this page', '本页内容')}</p>
              {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}<span aria-hidden="true">↓</span></a>)}
            </nav>
            <div className="cv-sidebar-detail">
              <h2 className="cv-sidebar-title">{t('Languages', '语言')}</h2>
              <ul className="cv-languages">
                <li><span>{t('Chinese', '中文')}</span><span>{t('Fluent', '流利')}</span></li>
                <li><span>{t('English', '英语')}</span><span>{t('Fluent', '流利')}</span></li>
                <li><span>{t('German', '德语')}</span><span>{t('Learning', '学习中')}</span></li>
              </ul>
            </div>
            <div className="cv-sidebar-detail">
              <h2 className="cv-sidebar-title">{t('Let’s connect', '联系我')}</h2>
              <a className="cv-email" href="mailto:zheyun.wu.work@gmail.com">zheyun.wu.work@gmail.com</a>
              <a className="text-link cv-github" href="https://github.com/zheyunwu/" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </aside>

        <div className="cv-content">
          <section id="experience" className="cv-section" aria-labelledby="experience-heading">
            <div className="cv-section-heading"><h2 id="experience-heading">{t('Experience', '工作经历')}</h2></div>
            <div className="cv-timeline">
              {experience.map((item, index) => (
                <article className={`cv-experience-item ${index === 0 ? 'cv-current' : ''}`} key={`${item.company}-${item.role[0]}`}>
                  <div className="cv-item-meta"><span>{localized(item.date)}</span><span>{localized(item.location)}</span></div>
                  <h3>{localized(item.role)}</h3>
                  <p className="cv-company">{item.company}{index === 0 && <span className="cv-current-label">{t('Current role', '当前工作')}</span>}</p>
                  <p className="cv-description">{localized(item.description)}</p>
                  <ul className="cv-technologies" aria-label={t('Technologies and areas', '技术与领域')}>{item.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                </article>
              ))}
            </div>
          </section>

          <section id="education" className="cv-section" aria-labelledby="education-heading">
            <div className="cv-section-heading"><h2 id="education-heading">{t('Education', '教育背景')}</h2></div>
            {education.map((item) => (
              <article className="cv-education-item" key={item.school}>
                <div className="cv-item-meta"><span>{item.date}</span><span>{localized(item.location)}</span></div>
                <h3>{item.school}</h3>
                <p className="cv-degree">{localized(item.degree)}</p>
                <p className="cv-description">{localized(item.note)}</p>
              </article>
            ))}
          </section>

          <section id="projects" className="cv-section" aria-labelledby="projects-heading">
            <div className="cv-section-heading"><h2 id="projects-heading">{t('Selected projects', '精选项目')}</h2></div>
            <p className="cv-section-lede">{t('Independent products, experiments and research.', '独立产品、技术实验与研究。')}</p>
            <div className="cv-projects">
              {projects.map((project) => (
                <article className="cv-project" key={project.name}>
                  <div className="cv-project-heading">
                    <span className="cv-project-year">{project.year}</span>
                    <h3>{project.name}</h3>
                    <p className="cv-project-kind">{localized(project.kind)}</p>
                  </div>
                  <div className="cv-project-body">
                    <p className="cv-description">{localized(project.description)}</p>
                    <ul className="cv-technologies" aria-label={t('Project technologies and topics', '项目技术与主题')}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                    <a className="text-link cv-project-link" href={project.href} target="_blank" rel="noopener noreferrer">{localized(project.link)}<span aria-hidden="true">↗</span></a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="credentials" className="cv-section" aria-labelledby="credentials-heading">
            <div className="cv-section-heading"><h2 id="credentials-heading">{t('Certifications', '证书与认证')}</h2></div>
            <p className="cv-section-lede">{t('Professional certifications and completed courses.', '专业认证与已完成的课程。')}</p>
            <div className="cv-credential-row">
              <div><h3>Introduction to LangChain — Python</h3><p>LangChain · {t('Issued April 2026', '2026 年 4 月颁发')}</p></div>
              <a href="https://www.linkedin.com/in/zheyun-wu/" target="_blank" rel="noopener noreferrer" aria-label={t('View LangChain introduction credential on LinkedIn', '在 LinkedIn 查看 LangChain 入门证书')}>{t('View', '查看')} <span aria-hidden="true">↗</span></a>
            </div>
            <div className="cv-credential-row">
              <div><h3>LangChain Essentials — Python</h3><p>LangChain · {t('Issued March 2026', '2026 年 3 月颁发')}</p></div>
              <a href="https://www.linkedin.com/in/zheyun-wu/" target="_blank" rel="noopener noreferrer" aria-label={t('View LangChain Essentials credential on LinkedIn', '在 LinkedIn 查看 LangChain Essentials 证书')}>{t('View', '查看')} <span aria-hidden="true">↗</span></a>
            </div>
            <h3 className="cv-historical-label">{t('Previously earned · AWS', '曾获认证 · AWS')}</h3>
            {awsCredentials.map((credential) => (
              <div className="cv-credential-row cv-historical" key={credential.name}>
                <div><h3>{credential.name}</h3><p>{t('Credential period', '认证有效期')} {credential.earned} — {credential.until} · {t('Expired', '已到期')}</p></div>
                <a href={credential.url} target="_blank" rel="noopener noreferrer" aria-label={`${t('View historical credential', '查看历史认证')}: ${credential.name}`}>{t('View', '查看')} <span aria-hidden="true">↗</span></a>
              </div>
            ))}
          </section>
          <div className="cv-endnote"><p>{t('Have a project in mind? I also offer independent IT services.', '有想实现的项目？我也提供独立 IT 服务。')}</p><a className="text-link" href="mailto:zheyun.wu.work@gmail.com">{t('Get in touch', '联系我')} <span aria-hidden="true">↗</span></a></div>
        </div>
      </div>
    </main>
  );
}
