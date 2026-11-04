# Zheyun Wu — Personal Website

个人主页、履历与双语博客。明朗、亲近的现代设计结合杂志排版：暖白、墨蓝与少量蓝色，Manrope 界面字体与 Newsreader 阅读标题，保留个人摄影与真实内容。

- Next.js App Router、React、TypeScript；依赖的准确版本锁定在 `package-lock.json`。
- 静态导出到 `out/`，直接由 GitHub Pages 托管，无需 Node.js 后端。
- 英文保留原网址，中文使用 `/zh/` 独立网址；两种语言均在构建时生成完整 HTML，字体与图片由本站提供。
- 首页、CV、博客列表与文章详情，博客支持分类、标签及搜索。
- 不默认加载广告、第三方分析脚本或跟踪 Cookie。

## 本地开发

建议使用 Node.js 24 LTS。

```sh
npm ci
npm run dev
```

校验并生成可发布文件：

```sh
npm run typecheck
npm run build
npm run check:seo
```

`out/` 是完整静态站点，可以由任意静态 HTTP 服务预览。博客入口为 `/blog/`，文章详情为 `/blog/<slug>/`，中文对应 `/zh/blog/` 和 `/zh/blog/<slug>/`。URL 使用末尾斜杠，支持 GitHub Pages 直接访问与刷新。旧 `/journal/` 及已发布文章的旧链接保留 `noindex` 兼容页：JavaScript 跳转保留查询参数与章节位置，无 JavaScript 时使用立即 meta refresh；这不是服务器 301。规范链接与 sitemap 使用新的博客网址。

## GitHub Pages

仓库：[zheyunwu/zheyun-personal-website](https://github.com/zheyunwu/zheyun-personal-website)。已有自定义域名：[zheyun.dev](https://zheyun.dev)。`public/CNAME` 保留该域名，生产链接按域名根路径生成。

自动发布配置见 `.github/workflows/deploy.yml`。推送到 `main` 或 `master` 会依次进行依赖安装、类型检查、静态构建、SEO 导出检查、上传与部署，也可以从 Actions 页面手动运行。SEO 检查失败会阻止发布。

仓库 **Settings → Pages → Build and deployment → Source** 已切换为 **GitHub Actions**。旧站的 `gh-pages` 分支作为历史记录保留。`github-pages` environment 必须允许发布所用的源分支。

工作流只需要仓库自带的 `GITHUB_TOKEN`，权限为 `contents: read`、`pages: write`、`id-token: write`，无需另建部署密钥。不要提交访问令牌。

如果未来移除自定义域名，需同时更新站点 URL、Next.js `basePath`、静态资源路径及 CNAME，而不能只删除 CNAME。GitHub 项目站默认路径为 `/zheyun-personal-website/`。

## 设计与阅读规范

- 全站共用 `app/globals.css` 中的颜色、字体、按钮和导航；CV 与 Blog 的局部样式分别维护。
- 界面正文 16–18px，长文 18–19px，次要信息保持清晰对比。中文采用适合中文阅读的无衬线字体与较宽松行距。
- 首页以个人介绍和最新文章组织，履历采用时间线，博客采用文章索引；不为统一视觉而强行套用相同卡片布局。
- 使用真实头像与五地世界地图；分享卡沿用网站字体、暖白与墨蓝配色，Stockholm 摄影原件保留在图片目录。避免虚构评价、指标，以及装饰性编号、轨道图、无意义图标和空泛口号。
- 更新样式后检查英文与中文、320px/390px 手机端和桌面，测试键盘菜单、搜索筛选和文章目录。
- 文案以实际信息为准：不为每个标题补写副标题，不重复邀请联系或添加模板化收尾。保留帮助选文的摘要、操作提示、履历事实与必要披露。手机文章目录默认收起，桌面目录保持展开。

设计研究参考：[Anthropic 对前端设计趋同的讨论](https://claude.com/resources/articles/improving-frontend-design-through-skills)、[Adrian Krebs 的 Show HN 页面模式研究](https://www.adriankrebs.ch/blog/design-slop/)。这些是设计倾向和启发式观察，不是判断 AI 作者身份的依据。

## 内容维护

- `components/home.tsx`：首页介绍、最新文章和服务。
- `components/life-map.tsx` 与 `components/life-map.css`：首页地图与双语标签。
- `content/life-locations.json`：五个地点的城市级坐标、名称、标签位置与坐标来源。
- `components/cv.tsx`：经历、教育、证书与项目。
- `content/blog/index.ts`：文章发布列表；首页、博客、搜索、详情页与 sitemap 共用此列表。
- `content/blog/types.ts` 与 `topics.ts`：文章类型与双语主题名称。
- `content/blog/<slug>/post.ts`：每篇文章的中英文标题、摘要、正文与元数据。
- `content/blog/<slug>/images/`：该篇文章的配图，与正文一起维护。
- `content/blog/robinhood-euro-yield-safety/platform-comparison.ts`：此文章的平台对比表，包含双语数据、统计日期、口径与逐行来源。
- `components/article-table.tsx`：基于 `PostTable` 类型的原生 HTML 表格，跟随网站语言切换。
- `components/article-image.tsx` 与 `article-image.css`：文章图片与页内放大弹窗，支持键盘关闭、原始尺寸查看及关闭后恢复阅读位置。
- `public/images/`：头像、地图、公司 Logo 等全站共用图片，文章专属图片不放在这里。

`post.date` 是首次发布日期；正文有实质更新时填写真实的 `post.updated` 日期。已知具体时间时填写带时区的 ISO `publishedAt` / `updatedAt`，供文章的 HTML、Open Graph 与结构化数据使用；显示日期仍使用原始日期，避免跨时区显示为前一天。Robinhood 文章的时间来自首次发布及最近正文更新的 Git 提交。不在每次构建时刷新日期。`socialImage` 可指定文章专用的 1200×630 分享图，未指定时使用站点分享卡。段落的可选 `emphasis` 用于在正文末尾追加加粗的双语文字；文章级 `disclosureTitle` 可以明确区分个人邀请说明和联盟链接说明。

地图使用 [Natural Earth 公共领域地理数据](https://www.naturalearthdata.com/about/terms-of-use/)，1:50m 原始数据随仓库保存在 `scripts/map-data/land-50m.json`（world-atlas 2.0.2）。`npm run build:map` 使用以欧亚大陆为中心的正射投影，同时生成底图与五个标记坐标，生产构建也会自动执行。海岸线在投影后做亚像素精度简化，保留细节并控制静态 SVG 体积。开发时修改坐标后运行此命令；修改标签与引线无需重新生成。标签偏移仅用于排版，不改变真实地理位置；中英文标签作为 HTML 文字显示，手机端保持可读字号。D3 与 TopoJSON 只用于生成静态资源，不进入浏览器运行时。

新增文章时，在 `content/blog/` 下创建以稳定英文 `slug` 命名的目录，复制现有 `post.ts`，填写中英文标题、摘要、正文及 ISO 日期。分类为 `technology` 或 `life`，标签用于筛选与搜索。在 `index.ts` 导入文章并加入 `posts` 后，重新构建便会生成静态详情页；不要将未完成的草稿加入发布数组。

三篇示例文章 `from-prototype-to-platform`、`a-home-in-germany` 和 `a-home-for-ideas` 的目录与正文完整保留，对应 import 与发布项已注释。它们不会出现在首页、搜索、列表或 sitemap，也不会生成详情页。以后取消注释即可恢复。

Robinhood 欧元收益文章保留作者提供的中文正文与段落顺序，英文翻译保持原稿自然、个人分享的口吻；平台比较部分按作者要求换成经资料核对的双语表格。后续查证、时效性变化及需要限定的正文表述，放在独立、注明核对日期的文末注释中，并链接相应来源；不要静默改写原文，也不要把翻译或 AI 生成的图表当作独立核实的证据。

文章配图放在该篇文章的 `images/` 中，在 `post.ts` 静态导入，例如 `import photo from './images/photo.jpg'`。章节的 `image` 字段使用 `src: photo.src`、`width: photo.width`、`height: photo.height`，并填写中英文 `alt` 和可选 `caption`。Next.js 会把图片打包到带内容指纹的静态资源路径，不需要复制到 `public/`，也不要再手动添加 basePath。图片按比例完整显示，点击在当前页弹窗查看；手机截图可设置 `size: 'compact'`，居中展示且最大宽度为 360px。用 `afterBullets` 保留列表之后的原文段落，避免为了数据结构重排正文。来源记录在 `public/credits.txt`，产品截图应与实时条款区分。

数据比较使用章节的 `table` 字段，不把表格烘焙进图片。单元格的 `value`、`detail` 与 `date` 分别维护中英文数值、口径和日期，逐行附来源链接，表格说明标明核对日期。数据优先采用官方披露；没有同口径官方支持的数字应明确标注未确认，不从相近口径或第三方估计推算。客户资产、客户余额和存款，以及各自的报告日期、币种，应保持区别。手机端保留横向滚动与固定首列，避免缩小文字挤进屏幕。旧平台比较图片已被此表格替代。

德国银行、投资、买房、贷款及厨房采购等专题会逐步更新。个人经历、金融收益数据和评测结论均应来自本人提供的内容或可核对的资料，不得虚构。

履历中的职位名称与日期以本人确认的信息为准，经历及教育描述于 2026-11-01 对齐本人 LinkedIn。公司与学校 Logo 来自相应 LinkedIn 页面，本地文件来源记录于 `public/images/logos/sources.json`。三张 AWS 认证已通过更新后的 Credly 官方凭证核实：Solutions Architect 与 Cloud Practitioner 有效至 2027-10-24，Developer 有效至 2027-08-29；后续更新以官方凭证为准。

## 联盟链接与未来广告

部分文章已包含明确标注的个人邀请或联盟链接。文章包含此类链接时，应开启相应披露并清晰标记，使用 `rel="sponsored noopener noreferrer"`；不要把一般参考资料误标为推广链接，也不要将个人邀请描述成正式合作。

按实际活动填写文章的双语 `affiliateDisclosure`，说明作者、读者或双方可能获得何种奖励，以及服务商资格要求、当期条款等适用条件。不要对邀请活动一律套用“佣金”或“不会增加费用”的表述。`editorialNote` 可用于简洁的作者或翻译说明；独立的文末核对注释应保留核对日期和原始来源。

当前没有 AdSense 脚本或虚构的 publisher ID。实际接入前：

1. 完成 AdSense 的站点审核，使用自己的真实 publisher ID。
2. 按当时适用的欧洲同意政策配置 Google 认证 CMP，在取得所需同意后才加载广告脚本。
3. 根据 AdSense 后台实际提供的记录建立 `public/ads.txt`，并更新隐私说明。
4. 核实适用的 Impressum/经营者资料要求。网站按站主明确要求只公开工作邮箱，不公开电话和具体地址；这不等于完整的商业 Impressum。DDG §5 对商业网站通常要求可送达地址，可另行核实合适的商业/服务地址方案，不能猜测或擅自公开私人地址。

金融、房产及贷款类文章发布前，应核对当日数据，标注来源、核实日期和适用条件，明确区分个人经验与专业建议。

## SEO 架构与发布检查

- `app/(en)/` 与 `app/zh/` 是两个静态根布局，共用 `components/site-layout.tsx`。语言由网址决定，直接访问或禁用 JavaScript 仍能获得相应语言的正文和导航；不依据浏览器语言或本地存储强制跳转。
- `lib/i18n.ts` 统一路径规则；`components/localized-link.tsx` 让站内导航保持当前语言。语言入口使用可抓取的真实链接，正常点击还会保留查询参数与章节锚点。
- `lib/seo.ts` 统一首页、简历、博客、文章和法律页的独立标题、摘要、HTTPS canonical、互相对应的 `en` / `zh-Hans` / `x-default`、完整 Open Graph 和 Twitter 信息。中文页面 canonical 指向自身，不指向英文版。
- 服务端输出 `WebSite`、`Person`、`ProfilePage`、`CollectionPage`、`BlogPosting` 与 `BreadcrumbList` JSON-LD；作者链接指向履历页。数据仅描述页面真实内容，不添加虚构评价、评分、金融产品或商业地址。脚本序列化时转义 `<`。
- `app/sitemap.ts` 只列出已发布的双语规范网址；没有可靠修改日期的页面省略 `lastmod`。`robots.txt` 保持页面、脚本、样式和图片可抓取。示例草稿、旧路径兼容页和 404 不进入 sitemap。
- 多根布局使用当前 Next.js 的 `globalNotFound` 功能，`app/global-not-found.tsx` 导出独立的 `404.html` 和 `noindex`；不要将未知 URL 全部重写为首页造成 soft 404。
- `scripts/check-seo.mjs` 检查实际导出的 HTML：标题、描述、单个 H1、canonical、双语互链、静态中文内容、JSON-LD、带时区的文章时间、分享图真实尺寸、sitemap、robots、404、旧路径回退、草稿隔离、站内链接/锚点及图片资源。也支持 `--dir` 和 `--json`。2026-11-03 版本通过 12 个双语页面、375 处本地引用、1,613 项断言；数字会随内容变化。
- `npm run build:seo-assets` 可重新生成头像 WebP 和分享卡。首页与作者头像使用 160px 版本（5,904 字节，原 JPG 为 270,301 字节）；CV 使用响应式尺寸。原件保留。生成脚本不进入浏览器运行时，分享图不需要每次构建重生成。

### 搜索平台设置与上线后验收

1. GitHub 仓库 **Settings → Pages → Enforce HTTPS** 已于 2026-11-03 开启并确认保存，线上实测 HTTP 和 `www` 均返回 301 到 HTTPS 根域名，未知页面返回 404。HTTPS 跳转属于托管平台设置，不能用静态 Next.js 的 `redirects()` 代替。
2. [Google Search Console](https://search.google.com/search-console/) 的 `zheyun.dev` Domain property 已于 2026-11-03 成功处理 `https://zheyun.dev/sitemap.xml`，发现 12 个页面；这不等于所有页面已被收录。也可使用 URL-prefix 的 HTML meta 验证：把 Search Console 提供的验证码放入仓库 Actions variable `GOOGLE_SITE_VERIFICATION`，重新部署后确认。Bing 对应 `BING_SITE_VERIFICATION`。这些验证码是公开站点标记；不要放账户密码或 API 密钥。`.env.example` 提供本地配置名称。
3. 在 URL Inspection 检查英文首页、中文首页和双语文章的抓取结果、规范网址与索引状态；在 [Rich Results Test](https://search.google.com/test/rich-results) 检查文章和履历。可用 [Schema Validator](https://validator.schema.org/) 进一步验证完整图谱。
4. 累积实际数据后看 Search Console 的曝光、点击、查询词、网页索引和 Core Web Vitals。真实用户 p75 的目标为 LCP ≤2.5s、INP ≤200ms、CLS ≤0.1；静态检查或一次 Lighthouse 测试不能证明线上已经达到这些指标。

当前版本没有接入跟踪脚本。代码检查通过不代表搜索平台账户已经验证、sitemap 已提交、页面已收录，或保证排名/富媒体展示。后续内容策略应围绕本人实际经验、清晰的问题与可核对资料展开，不堆砌关键词或批量生成薄内容。

实现依据：[Google 多语言网址](https://developers.google.com/search/docs/specialty/international/localized-versions)、[Article 结构化数据](https://developers.google.com/search/docs/appearance/structured-data/article)、[ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page)、[sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)、[重定向](https://developers.google.com/search/docs/crawling-indexing/301-redirects)、[Web Vitals](https://web.dev/articles/vitals)。

## 参考资料

- [Next.js 静态导出](https://nextjs.org/docs/app/guides/static-exports)
- [GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Google 欧盟用户同意政策](https://www.google.com/about/company/user-consent-policy/)
- [Google AdSense 的欧洲 CMP 要求](https://support.google.com/adsense/answer/13554116)
