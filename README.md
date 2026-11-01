# Zheyun Wu — Personal Website

个人主页、履历与双语博客。明朗、亲近的现代设计结合杂志排版：暖白、墨蓝与少量蓝色，Manrope 界面字体与 Newsreader 阅读标题，保留个人摄影与真实内容。

- Next.js App Router、React、TypeScript；依赖的准确版本锁定在 `package-lock.json`。
- 静态导出到 `out/`，直接由 GitHub Pages 托管，无需 Node.js 后端。
- 英文为默认界面，支持中文切换；字体与图片由本站提供。
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
```

`out/` 是完整静态站点，可以由任意静态 HTTP 服务预览。文章详情的 URL 使用末尾斜杠，支持 GitHub Pages 直接访问与刷新。

## GitHub Pages

仓库：[zheyunwu/zheyun-personal-website](https://github.com/zheyunwu/zheyun-personal-website)。已有自定义域名：[zheyun.dev](https://zheyun.dev)。`public/CNAME` 保留该域名，生产链接按域名根路径生成。

自动发布配置见 `.github/workflows/deploy.yml`。推送到 `main` 或 `master` 会依次进行依赖安装、类型检查、静态构建、上传与部署，也可以从 Actions 页面手动运行。

仓库 **Settings → Pages → Build and deployment → Source** 已切换为 **GitHub Actions**。旧站的 `gh-pages` 分支作为历史记录保留。`github-pages` environment 必须允许发布所用的源分支。

工作流只需要仓库自带的 `GITHUB_TOKEN`，权限为 `contents: read`、`pages: write`、`id-token: write`，无需另建部署密钥。不要提交访问令牌。

如果未来移除自定义域名，需同时更新站点 URL、Next.js `basePath`、静态资源路径及 CNAME，而不能只删除 CNAME。GitHub 项目站默认路径为 `/zheyun-personal-website/`。

## 设计与阅读规范

- 全站共用 `app/globals.css` 中的颜色、字体、按钮和导航；CV 与 Blog 的局部样式分别维护。
- 界面正文 16–18px，长文 18–19px，次要信息保持清晰对比。中文采用适合中文阅读的无衬线字体与较宽松行距。
- 首页以个人介绍和最新文章组织，履历采用时间线，博客采用文章索引；不为统一视觉而强行套用相同卡片布局。
- 使用真实头像与五地世界地图；Stockholm 摄影保留于社交分享图片。避免虚构评价、指标，以及装饰性编号、轨道图、无意义图标和空泛口号。
- 更新样式后检查英文与中文、320px/390px 手机端和桌面，测试键盘菜单、搜索筛选、文章目录和打印布局。

设计研究参考：[Anthropic 对前端设计趋同的讨论](https://claude.com/resources/articles/improving-frontend-design-through-skills)、[Adrian Krebs 的 Show HN 页面模式研究](https://www.adriankrebs.ch/blog/design-slop/)。这些是设计倾向和启发式观察，不是判断 AI 作者身份的依据。

## 内容维护

- `components/home.tsx`：首页介绍、最新文章和服务。
- `components/life-map.tsx` 与 `components/life-map.css`：首页地图与双语标签。
- `content/life-locations.json`：五个地点的城市级坐标、名称、标签位置与坐标来源。
- `components/cv.tsx`：经历、教育、证书与项目。
- `content/posts.ts`：文章元数据、正文和标签。
- `public/images/`：站内图片。

地图使用 [Natural Earth 公共领域地理数据](https://www.naturalearthdata.com/about/terms-of-use/)，原始数据随仓库保存在 `scripts/map-data/land-110m.json`（world-atlas 2.0.2）。`npm run build:map` 使用同一 Natural Earth 投影生成底图与五个标记坐标，生产构建也会自动执行。开发时修改坐标后运行此命令；修改标签与引线无需重新生成。标签偏移仅用于排版，不改变真实地理位置。D3 与 TopoJSON 只用于生成静态资源，不进入浏览器运行时。

新增文章时，复制一个现有条目，设置唯一且稳定的英文 `slug`，填写中英文标题、摘要、正文及 ISO 日期。分类为 `technology` 或 `life`，标签用于筛选与搜索。重新构建后，会自动生成对应静态详情页；不要将未完成的草稿加入发布数组。

初始文章是站点开篇与通用研究笔记。德国银行、存款/MMF、买房、贷款及厨房采购等专题保留为后续写作方向；没有虚构个人经历、金融收益数据或评测。

履历中的职位名称与日期以本人确认的信息为准，经历及教育描述于 2026-11-01 对齐本人 LinkedIn。公司与学校 Logo 来自相应 LinkedIn 页面，本地文件来源记录于 `public/images/logos/sources.json`。三张 AWS 认证已通过更新后的 Credly 官方凭证核实：Solutions Architect 与 Cloud Practitioner 有效至 2027-10-24，Developer 有效至 2027-08-29；后续更新以官方凭证为准。

## 联盟链接与未来广告

文章包含商业链接时，应开启相应披露并清晰标记。联盟链接使用 `rel="sponsored noopener noreferrer"`；不要把一般参考资料误标为推广链接。

当前没有 AdSense 脚本或虚构的 publisher ID。实际接入前：

1. 完成 AdSense 的站点审核，使用自己的真实 publisher ID。
2. 按当时适用的欧洲同意政策配置 Google 认证 CMP，在取得所需同意后才加载广告脚本。
3. 根据 AdSense 后台实际提供的记录建立 `public/ads.txt`，并更新隐私说明。
4. 核实适用的 Impressum/经营者资料要求。网站按站主明确要求只公开工作邮箱，不公开电话和具体地址；这不等于完整的商业 Impressum。DDG §5 对商业网站通常要求可送达地址，可另行核实合适的商业/服务地址方案，不能猜测或擅自公开私人地址。

金融、房产及贷款类文章发布前，应核对当日数据，标注来源、核实日期和适用条件，明确区分个人经验与专业建议。

## 参考资料

- [Next.js 静态导出](https://nextjs.org/docs/app/guides/static-exports)
- [GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Google 欧盟用户同意政策](https://www.google.com/about/company/user-consent-policy/)
- [Google AdSense 的欧洲 CMP 要求](https://support.google.com/adsense/answer/13554116)
