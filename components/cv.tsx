'use client';

import { useLanguage } from './language';

type Localized = [string, string];

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;

type Experience = {
  company: string;
  logo: string;
  roles: { title: Localized; date: Localized }[];
  location: Localized;
  description: Localized[];
  technologies: string[];
};

const experience: Experience[] = [
  {
    company: 'SAP',
    logo: 'sap.png',
    roles: [
      { title: ['AI Platform Engineer', 'AI 平台工程师'], date: ['Jan 2025 — Present', '2025.01 — 至今'] },
      { title: ['Associate Software Engineer', '初级软件工程师'], date: ['Feb 2024 — Dec 2024', '2024.02 — 2024.12'] },
    ],
    location: ['Berlin, Germany', '德国柏林'],
    description: [
      ['Building enterprise-grade AI platforms, SAP AI Core and Generative AI Hub, for running AI workflows and accessing and orchestrating multiple LLMs.', '构建企业级 AI 平台 SAP AI Core 与 Generative AI Hub，用于运行 AI 工作流，以及接入和编排多个大语言模型。'],
    ],
    technologies: ['Python', 'Golang', 'Docker', 'Kubernetes', 'Github Actions', 'Argo Workflows', 'Argo CD', 'Istio', 'AWS', 'GCP'],
  },
  {
    company: 'LiangDao GmbH',
    logo: 'liangdao.png',
    roles: [{ title: ['Fullstack Engineer', '全栈工程师'], date: ['Jan 2023 — Jan 2024', '2023.01 — 2024.01'] }],
    location: ['Berlin, Germany', '德国柏林'],
    description: [
      ['Containerized and automated data processing pipelines using Docker, Kubernetes and Argo Workflows.', '使用 Docker、Kubernetes 和 Argo Workflows，将数据处理流水线容器化并实现自动化。'],
      ['Migrated a web system from on-premises infrastructure to AWS using CloudFormation, ELB, ECS, RDS and S3.', '使用 CloudFormation、ELB、ECS、RDS 和 S3，将 Web 系统从本地基础设施迁移至 AWS。'],
      ['Developed a React web frontend and a serverless backend on AWS using SAM, API Gateway, SQS, Lambda, DynamoDB, S3 and CloudFront.', '开发 React Web 前端，以及基于 AWS SAM、API Gateway、SQS、Lambda、DynamoDB、S3 和 CloudFront 的无服务器后端。'],
    ],
    technologies: ['Docker', 'Kubernetes', 'Argo Workflows', 'Python', 'React', 'Node.js', 'AWS'],
  },
  {
    company: 'LiangDao GmbH',
    logo: 'liangdao.png',
    roles: [{ title: ["Master’s Thesis Worker", '硕士论文研究'], date: ['Apr — Dec 2022', '2022.04 — 2022.12'] }],
    location: ['Berlin, Germany', '德国柏林'],
    description: [
      ['Built GitLab CI/CD pipelines.', '构建 GitLab CI/CD 流水线。'],
      ['Built an on-premises Kubernetes cluster and containerized various computing workloads using Docker.', '搭建本地 Kubernetes 集群，并使用 Docker 将多种计算工作负载容器化。'],
      ['Designed and implemented a custom I/O-aware Kubernetes scheduler.', '设计并实现自定义的 I/O 感知 Kubernetes 调度器。'],
    ],
    technologies: ['Docker', 'Kubernetes', 'GitLab CI/CD', 'Python'],
  },
  {
    company: 'Hopsworks',
    logo: 'hopsworks.png',
    roles: [{ title: ['Frontend Developer · Part-time', '前端开发工程师 · 兼职'], date: ['Oct 2021 — Jan 2022', '2021.10 — 2022.01'] }],
    location: ['Stockholm, Sweden', '瑞典 · 斯德哥尔摩'],
    description: [['Developed frontend pages and components in React.', '使用 React 开发前端页面与组件。']],
    technologies: ['React (TypeScript)', 'Redux'],
  },
  {
    company: 'Tesla',
    logo: 'tesla.png',
    roles: [{ title: ['Software Engineer Intern', '软件工程师实习生'], date: ['Jul — Sep 2021', '2021.07 — 2021.09'] }],
    location: ['Shanghai, China', '中国 · 上海'],
    description: [
      ['Developed Tesla’s in-house ERP and internal systems.', '参与开发 Tesla 自研 ERP 与内部系统。'],
      ['Received a return offer for a full-time position.', '获得全职岗位的录用邀约。'],
    ],
    technologies: ['Angular (TypeScript)', '.NET (C#)'],
  },
];

type Education = {
  school: string;
  logo: string;
  degree: Localized;
  date: Localized;
  location: Localized;
  notes: Localized[];
  courses: Localized[];
};

const education: Education[] = [
  {
    school: 'KTH Royal Institute of Technology',
    logo: 'kth.png',
    degree: ['MSc · Computer Science and Engineering', '计算机科学与工程 · 理学硕士'],
    date: ['Aug 2021 — Dec 2022', '2021.08 — 2022.12'],
    location: ['Stockholm, Sweden', '瑞典 · 斯德哥尔摩'],
    notes: [
      ['Grade: 3.7 / 5 (1.9 in the German grading system).', '成绩：3.7 / 5（德国评分制为 1.9）。'],
      ['Specialization: Cloud and Network Infrastructures.', '专业方向：云与网络基础设施。'],
      ['Thesis: An I/O-aware scheduler for containerized data-intensive HPC tasks in Kubernetes-based heterogeneous clusters.', '硕士论文：面向基于 Kubernetes 的异构集群中容器化、数据密集型高性能计算任务的 I/O 感知调度器。'],
    ],
    courses: [
      ['Theory and Methodology of Science with Applications', '科学理论与方法论及其应用'],
      ['Modern Methods in Software Engineering', '现代软件工程方法'],
      ['Data Mining', '数据挖掘'],
      ['Scalable Machine Learning and Deep Learning', '可扩展机器学习与深度学习'],
    ],
  },
  {
    school: 'Aalto University',
    logo: 'aalto.png',
    degree: ['MSc · Information and Communication Technologies (ICTs)', '信息与通信技术（ICTs）· 理学硕士'],
    date: ['Aug 2020 — Jun 2021', '2020.08 — 2021.06'],
    location: ['Helsinki, Finland', '芬兰 · 赫尔辛基'],
    notes: [
      ['Grade: 3.7 / 5 (1.9 in the German grading system).', '成绩：3.7 / 5（德国评分制为 1.9）。'],
      ['Specialization: Cloud and Network Infrastructures.', '专业方向：云与网络基础设施。'],
    ],
    courses: [
      ['Cloud Software and Systems', '云软件与系统'],
      ['Web Software Development', 'Web 软件开发'],
      ['Internet Traffic Measurements and Analysis', '互联网流量测量与分析'],
      ['Internet Protocols', '互联网协议'],
      ['Big Data Platforms', '大数据平台'],
      ['SDN Fundamentals & Techniques', '软件定义网络（SDN）基础与技术'],
      ['Cybersecurity', '网络安全'],
    ],
  },
  {
    school: 'Stockholm University',
    logo: 'stockholm-university.png',
    degree: ['Exchange · Computer and System Sciences (DSV)', '计算机与系统科学（DSV）· 交换学习'],
    date: ['Jan — Jun 2019', '2019.01 — 2019.06'],
    location: ['Stockholm, Sweden', '瑞典 · 斯德哥尔摩'],
    notes: [],
    courses: [
      ['Network Security', '网络安全'],
      ['Global Challenges and Solutions in IT Business', 'IT 商业中的全球挑战与解决方案'],
    ],
  },
  {
    school: 'Tamkang University',
    logo: 'tamkang.png',
    degree: ['BBA · Information Management', '资讯管理 · 工商管理学士'],
    date: ['Sep 2015 — Jun 2019', '2015.09 — 2019.06'],
    location: ['Tamsui, Taiwan', '台湾 · 淡水'],
    notes: [
      ['Grade: 3.959 / 4 (1.0 in the German grading system).', '成绩：3.959 / 4（德国评分制为 1.0）。'],
      ['Ranked 1 / 67 in class and 1 / 206 in the department.', '班级排名 1 / 67，系排名 1 / 206。'],
    ],
    courses: [
      ['Calculus', '微积分'],
      ['Statistics', '统计学'],
      ['Fundamentals of Computer Programming (C)', '程序设计基础（C）'],
      ['Programming and Data Structures (Java)', '程序设计与数据结构（Java）'],
      ['Algorithms (Java)', '算法（Java）'],
      ['Advanced Computer Programming (Java)', '进阶程序设计（Java）'],
      ['Database Design (SQL Server)', '数据库设计（SQL Server）'],
      ['Network and Communication', '网络与通信'],
      ['Operating Systems', '操作系统'],
      ['Advanced Object-Oriented Programming (Design Patterns + Java)', '进阶面向对象程序设计（设计模式与 Java）'],
      ['System Analysis and Design (UML, ER diagrams, etc.)', '系统分析与设计（UML、ER 图等）'],
      ['Information Security (Kali Linux)', '信息安全（Kali Linux）'],
    ],
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
  { name: 'AWS Certified Solutions Architect – Associate', earned: '2023-10-25', until: '2027-10-24', url: 'https://www.credly.com/badges/fee112df-1482-4f2f-bd22-d51c39482595/public_url' },
  { name: 'AWS Certified Developer – Associate', earned: '2023-09-13', until: '2027-08-29', url: 'https://www.credly.com/badges/27744a1d-a5d2-4086-8ffe-d6f0e4337d6d/public_url' },
  { name: 'AWS Certified Cloud Practitioner', earned: '2023-08-06', until: '2027-10-24', url: 'https://www.credly.com/badges/efd044cb-ad05-47b5-968a-5cdd666e30ba/public_url' },
];

export function CV() {
  const { t } = useLanguage();
  const localized = (value: Localized) => t(value[0], value[1]);
  const sections = [
    ['experience', t('Experience', '工作经历')],
    ['education', t('Education', '教育背景')],
    ['projects', t('Projects', '项目')],
    ['credentials', t('Certifications', '证书与认证')],
  ];

  return (
    <main id="main" className="cv-page container">
      <header className="cv-intro">
        <div className="cv-intro-copy">
          <p className="cv-kicker">{t('About & CV', '关于我')}</p>
          <h1>Zheyun Wu<span>.</span></h1>
          <p className="cv-intro-role">{t('AI Platform Engineer at SAP', 'SAP · AI 平台工程师')}</p>
          <p className="cv-intro-description">{t('I’m an engineer from Quanzhou, China, now based in Berlin, Germany. My work connects software, cloud infrastructure and AI. Along the way, I’ve studied in the Nordics, built products, and kept learning by making things.', '我是一名来自中国福建泉州、现居德国柏林的工程师，工作围绕软件开发、云基础设施与 AI 展开。一路走来，我曾在北欧求学，也在持续通过做项目、造产品，学习新的东西。')}</p>
          <div className="cv-actions">
            <a className="text-link" href="https://www.linkedin.com/in/zheyun-wu/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <figure className="cv-portrait">
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/zheyun_avatar.jpg`} alt={t('Zheyun Wu by the Stockholm waterfront', 'Zheyun Wu 在斯德哥尔摩海滨')} width={1056} height={1056} />
          <figcaption>{t('From Quanzhou, China to Berlin, Germany.', '从中国泉州，到德国柏林。')}<br />{t('A few Nordic chapters in between.', '途经北欧的求学时光。')}</figcaption>
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
                <li><span>{t('Chinese', '中文')}</span><span>{t('Native', '母语')}</span></li>
                <li><span>{t('Hokkien', '闽南语')}</span><span>{t('Native', '母语')}</span></li>
                <li><span>{t('English', '英语')}</span><span>{t('Fluent', '流利')}</span></li>
                <li><span>{t('German', '德语')}</span><span>{t('Learning', '学习中')}</span></li>
              </ul>
            </div>
            <div className="cv-sidebar-detail">
              <h2 className="cv-sidebar-title">{t('Let’s connect', '联系我')}</h2>
              <a className="cv-email" href="mailto:zheyun.wu.work@gmail.com">zheyun.wu.work@gmail.com</a>
            </div>
          </div>
        </aside>

        <div className="cv-content">
          <section id="experience" className="cv-section" aria-labelledby="experience-heading">
            <div className="cv-section-heading"><h2 id="experience-heading">{t('Experience', '工作经历')}</h2></div>
            <div className="cv-timeline">
              {experience.map((item, index) => (
                <article className={`cv-experience-item ${index === 0 ? 'cv-current' : ''}`} key={`${item.company}-${item.roles[0].title[0]}`}>
                  <div className="cv-organization-heading">
                    <img className="cv-organization-logo" src={asset(`/images/logos/${item.logo}`)} alt="" width={64} height={64} loading="lazy" />
                    <div>
                      <h3 className="cv-company-title">{item.company}{index === 0 && <span className="cv-current-label">{t('Current', '现在')}</span>}</h3>
                      <p className="cv-organization-location">{localized(item.location)}</p>
                    </div>
                  </div>
                  <div className="cv-role-history">
                    {item.roles.map((role) => (
                      <div className="cv-position" key={role.title[0]}>
                        <h4>{localized(role.title)}</h4>
                        <p className="cv-position-date">{localized(role.date)}</p>
                      </div>
                    ))}
                  </div>
                  {item.description.length === 1
                    ? <p className="cv-description">{localized(item.description[0])}</p>
                    : <ul className="cv-description cv-description-list">{item.description.map((point) => <li key={point[0]}>{localized(point)}</li>)}</ul>}
                  <ul className="cv-technologies" aria-label={t('Technologies and areas', '技术与领域')}>{item.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                </article>
              ))}
            </div>
          </section>

          <section id="education" className="cv-section" aria-labelledby="education-heading">
            <div className="cv-section-heading"><h2 id="education-heading">{t('Education', '教育背景')}</h2></div>
            {education.map((item) => (
              <article className="cv-education-item" key={item.school}>
                <div className="cv-organization-heading">
                  <img className="cv-organization-logo" src={asset(`/images/logos/${item.logo}`)} alt="" width={64} height={64} loading="lazy" />
                  <div>
                    <h3>{item.school}</h3>
                    <p className="cv-organization-location">{localized(item.location)}</p>
                  </div>
                </div>
                <p className="cv-degree">{localized(item.degree)}</p>
                <p className="cv-item-meta">{localized(item.date)}</p>
                <div className="cv-education-notes">{item.notes.map((note) => <p className="cv-description" key={note[0]}>{localized(note)}</p>)}</div>
                <details className="cv-courses">
                  <summary>{t('Relevant courses', '相关课程')}</summary>
                  <ul>{item.courses.map((course) => <li key={course[0]}>{localized(course)}</li>)}</ul>
                </details>
              </article>
            ))}
          </section>

          <section id="projects" className="cv-section" aria-labelledby="projects-heading">
            <div className="cv-section-heading"><h2 id="projects-heading">{t('Projects', '项目')}</h2></div>
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
              <div><h3>Foundation: Introduction to LangChain - Python</h3><p>LangChain · {t('Issued 2026-04-16', '颁发于 2026-04-16')}</p></div>
              <a href="https://academy.langchain.com/certificates/kedqhv5uuw" target="_blank" rel="noopener noreferrer" aria-label={t('View Foundation: Introduction to LangChain certificate', '查看 LangChain 入门课程证书')}>{t('View', '查看')} <span aria-hidden="true">↗</span></a>
            </div>
            <div className="cv-credential-row">
              <div><h3>Quickstart: LangChain Essentials - Python</h3><p>LangChain · {t('Issued 2026-03-29', '颁发于 2026-03-29')}</p></div>
              <a href="https://academy.langchain.com/certificates/rgg8lj5ss6" target="_blank" rel="noopener noreferrer" aria-label={t('View Quickstart: LangChain Essentials certificate', '查看 LangChain Essentials 课程证书')}>{t('View', '查看')} <span aria-hidden="true">↗</span></a>
            </div>
            <h3 className="cv-certification-group">{t('AWS certifications', 'AWS 认证')}</h3>
            {awsCredentials.map((credential) => (
              <div className="cv-credential-row" key={credential.name}>
                <div><h3>{credential.name}</h3><p>{t('Issued', '颁发于')} <time dateTime={credential.earned}>{credential.earned}</time> · {t('Valid until', '有效期至')} <time dateTime={credential.until}>{credential.until}</time></p></div>
                <a href={credential.url} target="_blank" rel="noopener noreferrer" aria-label={`${t('View AWS certification', '查看 AWS 认证')}: ${credential.name}`}>{t('View', '查看')} <span aria-hidden="true">↗</span></a>
              </div>
            ))}
          </section>
          <div className="cv-endnote"><p>{t('Have a project in mind? I also offer independent IT services.', '有想实现的项目？我也提供独立 IT 服务。')}</p><a className="text-link" href="mailto:zheyun.wu.work@gmail.com">{t('Get in touch', '联系我')} <span aria-hidden="true">↗</span></a></div>
        </div>
      </div>
    </main>
  );
}
