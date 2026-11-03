#!/usr/bin/env node
/**
 * Audit the actual static export, not just the metadata configuration.
 * Run after `next build`: node scripts/check-seo.mjs [--dir out] [--json]
 * No network requests, browser, credentials, or third-party dependencies.
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
let outputDirectory = 'out';
let jsonOutput = false;
for (let index = 0; index < args.length; index++) {
  if (args[index] === '--dir' && args[index + 1]) outputDirectory = args[++index];
  else if (args[index] === '--json') jsonOutput = true;
  else if (args[index] === '--help') {
    console.log('Usage: node scripts/check-seo.mjs [--dir out] [--json]\nUses NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_BASE_PATH when set.');
    process.exit(0);
  } else throw new Error(`Unknown or incomplete argument: ${args[index]}`);
}

const output = path.resolve(root, outputDirectory);
const configuredSite = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://zheyun.dev');
const basePath = ('/' + (process.env.NEXT_PUBLIC_BASE_PATH ?? configuredSite.pathname)).replace(/\/+/g, '/').replace(/\/$/, '');
const siteOrigin = configuredSite.origin;
const coreRoutes = ['/', '/cv/', '/blog/', '/privacy/', '/imprint/'];
const failures = [];
const warnings = [];
const documents = new Map();
const localReferences = new Set();
const sourceDatesBySlug = new Map();
let assertions = 0;

function check(condition, message) {
  assertions++;
  if (!condition) failures.push(message);
  return Boolean(condition);
}

function absolute(route) {
  return new URL(`${basePath}${route}`, siteOrigin).href;
}

function localized(route, language) {
  return language === 'zh' ? `/zh${route}` : route;
}

function unlocalized(route) {
  return route.startsWith('/zh/') ? route.slice(3) : route;
}

function languageFor(route) {
  return route.startsWith('/zh/') ? 'zh' : 'en';
}

function alternatesFor(route) {
  const english = unlocalized(route);
  return { en: absolute(english), 'zh-Hans': absolute(localized(english, 'zh')), 'x-default': absolute(english) };
}

function decode(value = '') {
  const named = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ', ndash: '–', mdash: '—', copy: '©' };
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, name) => {
    if (name[0] !== '#') return named[name.toLowerCase()] ?? entity;
    const number = name[1].toLowerCase() === 'x' ? Number.parseInt(name.slice(2), 16) : Number(name.slice(1));
    return number > 0 && number <= 0x10ffff ? String.fromCodePoint(number) : entity;
  });
}

function attributes(source = '') {
  const result = {};
  const matcher = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of source.matchAll(matcher)) result[match[1].toLowerCase()] = decode(match[2] ?? match[3] ?? match[4] ?? '');
  return result;
}

function elements(source, name) {
  const matcher = new RegExp(`<${name}\\b((?:"[^"]*"|'[^']*'|[^'">])*)>`, 'gi');
  return [...source.matchAll(matcher)].map(match => attributes(match[1]));
}

function textContent(source = '') {
  return decode(source.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function parseDocument(html, route, filename) {
  // Flight payloads and JSON-LD can contain strings resembling HTML. Never
  // mistake them for rendered headings, links, images, or metadata.
  const withoutRawText = html.replace(/<!--[^]*?-->/g, '').replace(/<(script|style)\b[^>]*>[^]*?<\/\1\s*>/gi, '');
  const head = withoutRawText.match(/<head\b[^>]*>([^]*?)<\/head\s*>/i)?.[1] || '';
  const body = withoutRawText.match(/<body\b[^>]*>([^]*?)<\/body\s*>/i)?.[1] || '';
  const metas = elements(head, 'meta');
  const links = elements(head, 'link');
  const headings = [...body.matchAll(/<h1\b[^>]*>([^]*?)<\/h1\s*>/gi)].map(match => textContent(match[1]));
  const ids = new Set([...withoutRawText.matchAll(/<[a-z][\w:-]*\b((?:"[^"]*"|'[^']*'|[^'">])*)>/gi)].map(match => attributes(match[1]).id).filter(Boolean));
  const scripts = [...html.matchAll(/<script\b((?:"[^"]*"|'[^']*'|[^'">])*)>([^]*?)<\/script\s*>/gi)];
  const jsonLd = [];
  for (const match of scripts) {
    if (attributes(match[1]).type !== 'application/ld+json') continue;
    check(!match[2].includes('<'), `${route}: escape '<' in inline JSON-LD to prevent script termination`);
    try { jsonLd.push(JSON.parse(match[2])); }
    catch (error) { check(false, `${route}: invalid JSON-LD (${error.message})`); }
  }
  return {
    route, filename, html, head, body, ids, metas, links, headings, jsonLd,
    allMetas: elements(withoutRawText, 'meta'),
    lang: elements(withoutRawText, 'html')[0]?.lang,
    titles: [...head.matchAll(/<title\b[^>]*>([^]*?)<\/title\s*>/gi)].map(match => textContent(match[1])),
    anchors: elements(body, 'a'),
    images: elements(body, 'img'),
    svgImages: elements(body, 'image'),
    sources: elements(body, 'source'),
    scriptSources: scripts.map(match => attributes(match[1])).filter(item => item.src),
  };
}

function metas(document, key) {
  return document.metas.filter(item => item.name === key || item.property === key).map(item => item.content ?? '');
}

function singleMeta(document, key) {
  const values = metas(document, key);
  check(values.length === 1 && Boolean(values[0]?.trim()), `${document.route}: expected one nonempty ${key}`);
  return values[0] || '';
}

function canonicalFor(document) {
  const values = document.links.filter(link => link.rel === 'canonical');
  check(values.length === 1 && Boolean(values[0]?.href), `${document.route}: expected one canonical URL`);
  return values[0]?.href;
}

function fileForRoute(route) {
  return path.join(output, route, 'index.html');
}

async function exists(filename) {
  try { return (await stat(filename)).isFile(); } catch { return false; }
}

async function getDocument(route) {
  if (documents.has(route)) return documents.get(route);
  const filename = fileForRoute(route);
  if (!check(await exists(filename), `${route}: missing exported HTML (${path.relative(root, filename)})`)) return null;
  const document = parseDocument(await readFile(filename, 'utf8'), route, filename);
  documents.set(route, document);
  return document;
}

function localUrl(value, fromRoute) {
  if (!value || /^(?:data:|blob:|mailto:|tel:)/i.test(value)) return null;
  if (/^javascript:/i.test(value)) {
    check(false, `${fromRoute}: JavaScript URL is not a crawlable link`);
    return null;
  }
  let url;
  try { url = new URL(value, absolute(fromRoute)); }
  catch { check(false, `${fromRoute}: invalid URL ${value}`); return null; }
  if (url.origin !== siteOrigin) return null;
  const pathname = decodeURIComponent(url.pathname);
  if (basePath && pathname !== basePath && !pathname.startsWith(`${basePath}/`)) {
    check(false, `${fromRoute}: internal URL omits basePath: ${value}`);
    return null;
  }
  return { url, route: pathname.slice(basePath.length) || '/' };
}

async function auditReference(value, fromRoute, { hash = false } = {}) {
  const local = localUrl(value, fromRoute);
  if (!local) return;
  const key = `${fromRoute} -> ${value}`;
  if (localReferences.has(key)) return;
  localReferences.add(key);
  const relative = local.route.replace(/^\/+/, '');
  const filename = path.resolve(output, relative ? (relative.endsWith('/') || !path.extname(relative) ? `${relative}/index.html` : relative) : 'index.html');
  if (!check(filename.startsWith(`${output}${path.sep}`), `${fromRoute}: URL escapes output root: ${value}`)) return;
  if (!check(await exists(filename), `${fromRoute}: broken local URL ${value}`)) return;
  if (hash && local.url.hash && filename.endsWith('.html')) {
    let target = documents.get(local.route);
    if (!target) target = parseDocument(await readFile(filename, 'utf8'), local.route, filename);
    const id = decodeURIComponent(local.url.hash.slice(1));
    // Text fragments are browser instructions, not element IDs.
    if (id && !id.startsWith(':~:')) check(target.ids.has(id), `${fromRoute}: missing fragment ${value}`);
  }
}

function collectSchemaNodes(value, result = []) {
  if (!value || typeof value !== 'object') return result;
  if (Array.isArray(value)) value.forEach(item => collectSchemaNodes(item, result));
  else {
    if (value['@type']) result.push(value);
    Object.values(value).forEach(item => collectSchemaNodes(item, result));
  }
  return result;
}

function hasType(node, type) {
  return [node?.['@type']].flat().includes(type);
}

function validDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value)) return false;
  const day = value.slice(0, 10);
  const timestamp = Date.parse(`${day}T00:00:00Z`);
  if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== day) return false;
  return value.length === 10 || validDateTime(value);
}

function validDateTime(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) && Number.isFinite(Date.parse(value));
}

function datesInOrder(published, modified) {
  if (!validDate(published) || !validDate(modified)) return false;
  // A date-only fallback does not claim midnight precision. Compare calendar
  // days unless both source values record an actual, time-zoned instant.
  return validDateTime(published) && validDateTime(modified)
    ? Date.parse(modified) >= Date.parse(published)
    : modified.slice(0, 10) >= published.slice(0, 10);
}

async function auditSchema(document) {
  const route = document.route;
  const canonical = absolute(route);
  const nodes = collectSchemaNodes(document.jsonLd);
  const byId = new Map(nodes.filter(node => node['@id']).map(node => [node['@id'], node]));
  const resolve = node => typeof node === 'string' ? byId.get(node) : node?.['@id'] ? (byId.get(node['@id']) || node) : node;
  const person = nodes.find(node => hasType(node, 'Person'));
  const website = nodes.find(node => hasType(node, 'WebSite'));
  check(person?.name === 'Zheyun Wu', `${route}: missing named Person entity`);
  check(Boolean(website?.name && website?.url), `${route}: missing WebSite name/URL`);
  const pageType = unlocalized(route) === '/cv/' ? 'ProfilePage' : unlocalized(route) === '/blog/' ? 'CollectionPage' : 'WebPage';
  const page = nodes.find(node => hasType(node, pageType));
  check(Boolean(page), `${route}: missing ${pageType} entity`);
  if (page) {
    check(page.url === canonical || page['@id']?.split('#')[0] === canonical, `${route}: structured page URL differs from canonical`);
    if (unlocalized(route) === '/cv/') check(hasType(resolve(page.mainEntity), 'Person'), `${route}: ProfilePage mainEntity must resolve to Person`);
  }
  const post = nodes.find(node => hasType(node, 'BlogPosting'));
  const isArticle = /^\/blog\/[^/]+\/$/.test(unlocalized(route));
  check(isArticle === Boolean(post), `${route}: BlogPosting must appear only on an article`);
  if (post) {
    check(textContent(post.headline) === document.headings[0], `${route}: article headline differs from visible H1`);
    check(validDate(post.datePublished), `${route}: article needs a valid publication date`);
    check(datesInOrder(post.datePublished, post.dateModified), `${route}: invalid article modification date`);
    const slug = unlocalized(route).match(/^\/blog\/([^/]+)\/$/)?.[1];
    const sourceDates = sourceDatesBySlug.get(slug);
    if (sourceDates) {
      const published = sourceDates.publishedAt || sourceDates.date;
      const modified = sourceDates.updatedAt || sourceDates.updated || published;
      check(post.datePublished === published, `${route}: JSON-LD publication date must use the source publishedAt timestamp when available, otherwise date`);
      check(post.dateModified === modified, `${route}: JSON-LD modification date must use the source updatedAt timestamp when available, otherwise updated/publication date`);
      check(singleMeta(document, 'article:published_time') === published, `${route}: Open Graph publication date differs from the source timestamp/date`);
      check(singleMeta(document, 'article:modified_time') === modified, `${route}: Open Graph modification date differs from the source timestamp/date`);
      const visibleDays = new Set(elements(document.body, 'time').map(time => time.datetime?.slice(0, 10)));
      check(visibleDays.has(sourceDates.date), `${route}: visible publication date differs from the source calendar day`);
      if (sourceDates.updated && sourceDates.updated !== sourceDates.date) check(visibleDays.has(sourceDates.updated), `${route}: visible update date differs from the source calendar day`);
    }
    const authors = [post.author].flat().map(resolve);
    check(authors.some(author => author?.name === 'Zheyun Wu' && author?.url === absolute(localized('/cv/', languageFor(route)))), `${route}: article author must resolve to the localized About & CV page`);
    check(post.inLanguage === (languageFor(route) === 'zh' ? 'zh-CN' : 'en') || post.inLanguage === (languageFor(route) === 'zh' ? 'zh-Hans' : 'en-US'), `${route}: article language differs from rendered language`);
    const imageUrls = [post.image].flat().map(image => typeof image === 'string' ? image : image?.url || image?.contentUrl).filter(Boolean);
    check(imageUrls.length > 0, `${route}: article structured data needs a representative image`);
    for (const image of imageUrls) {
      check(/^https?:\/\//.test(image), `${route}: structured article image must be absolute`);
      await auditReference(image, route);
    }
    const mainEntity = typeof post.mainEntityOfPage === 'string' ? post.mainEntityOfPage : post.mainEntityOfPage?.['@id'] || post.mainEntityOfPage?.url;
    check(mainEntity?.split('#')[0] === canonical, `${route}: BlogPosting mainEntityOfPage differs from canonical`);
  }
  if (unlocalized(route) !== '/') {
    const crumbs = nodes.find(node => hasType(node, 'BreadcrumbList'));
    const items = crumbs?.itemListElement;
    check(Array.isArray(items) && items.length >= 2, `${route}: missing BreadcrumbList`);
    if (Array.isArray(items)) {
      check(items.every((item, index) => item.position === index + 1 && item.name), `${route}: breadcrumb names/positions invalid`);
      const url = item => typeof item.item === 'string' ? item.item : item.item?.['@id'] || item.item?.url;
      check(url(items.at(-1)) === canonical, `${route}: breadcrumb must finish at the canonical page`);
      for (const item of items) if (url(item)) await auditReference(url(item), route);
    }
  }
  return post;
}

function rasterDimensions(buffer) {
  if (buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    for (let offset = 2; offset + 8 < buffer.length;) {
      if (buffer[offset++] !== 0xff) continue;
      while (buffer[offset] === 0xff) offset++;
      const marker = buffer[offset++];
      if (marker === 0xd9 || marker === 0xda) break;
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd8)) continue;
      const length = buffer.readUInt16BE(offset);
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) return [buffer.readUInt16BE(offset + 5), buffer.readUInt16BE(offset + 3)];
      if (length < 2) break;
      offset += length;
    }
  }
  return null;
}

async function auditPage(document, titles, descriptions) {
  const route = document.route;
  const language = languageFor(route);
  check(document.lang === (language === 'zh' ? 'zh-CN' : 'en'), `${route}: wrong HTML lang (${document.lang})`);
  check(document.titles.length === 1 && Boolean(document.titles[0]), `${route}: expected one nonempty title`);
  const title = document.titles[0];
  check(!titles.has(title), `${route}: duplicate title also on ${titles.get(title)}`);
  titles.set(title, route);
  const description = singleMeta(document, 'description');
  check(!descriptions.has(description), `${route}: duplicate description also on ${descriptions.get(description)}`);
  descriptions.set(description, route);
  check(canonicalFor(document) === absolute(route), `${route}: canonical must point to this language's clean absolute URL`);
  check(!metas(document, 'robots').some(value => /noindex|none/i.test(value)), `${route}: published page is noindex`);
  check(document.headings.length === 1 && Boolean(document.headings[0]), `${route}: expected one rendered H1`);
  if (language === 'zh') {
    // The CV's H1 is the author's proper name in both languages. Judge its
    // actual main content rather than requiring a translated personal name.
    if (unlocalized(route) !== '/cv/') check(/[\u3400-\u9fff]/.test(document.headings[0] || ''), `${route}: Chinese H1 is missing from static HTML`);
    const main = document.body.match(/<main\b[^>]*>([^]*?)<\/main\s*>/i)?.[1] || '';
    check((textContent(main).match(/[\u3400-\u9fff]/g) || []).length >= 30, `${route}: Chinese main content must not depend on JavaScript`);
  }
  const alternates = document.links.filter(link => link.rel === 'alternate' && link.hreflang);
  for (const [hreflang, href] of Object.entries(alternatesFor(route))) {
    check(alternates.filter(link => link.hreflang === hreflang && link.href === href).length === 1, `${route}: incorrect or missing ${hreflang} alternate`);
  }
  const counterpart = absolute(localized(unlocalized(route), language === 'zh' ? 'en' : 'zh'));
  check(document.anchors.some(anchor => { try { return new URL(anchor.href, absolute(route)).href === counterpart; } catch { return false; } }), `${route}: language switch must have a crawlable counterpart anchor`);
  const ogTitle = singleMeta(document, 'og:title');
  const ogDescription = singleMeta(document, 'og:description');
  check(singleMeta(document, 'og:url') === absolute(route), `${route}: Open Graph URL differs from canonical`);
  check(singleMeta(document, 'og:locale') === (language === 'zh' ? 'zh_CN' : 'en_US'), `${route}: wrong Open Graph locale`);
  singleMeta(document, 'og:site_name');
  check(singleMeta(document, 'og:type') === (/^\/blog\/[^/]+\/$/.test(unlocalized(route)) ? 'article' : 'website'), `${route}: wrong Open Graph type`);
  const image = singleMeta(document, 'og:image');
  singleMeta(document, 'og:image:alt');
  check(singleMeta(document, 'og:image:width') === '1200' && singleMeta(document, 'og:image:height') === '630', `${route}: share image metadata must be 1200×630`);
  check(/^https?:\/\//.test(image), `${route}: Open Graph image must use an absolute URL`);
  await auditReference(image, route);
  const imageLocal = localUrl(image, route);
  if (imageLocal) {
    const filename = path.join(output, imageLocal.route);
    if (await exists(filename)) {
      const buffer = await readFile(filename);
      const dimensions = rasterDimensions(buffer);
      check(dimensions?.[0] === 1200 && dimensions?.[1] === 630, `${route}: actual PNG/JPEG share image must be 1200×630`);
      if (buffer.length > 600_000) warnings.push(`${route}: share image is ${(buffer.length / 1024).toFixed(0)} KiB; consider compressing it`);
    }
  }
  check(singleMeta(document, 'twitter:card') === 'summary_large_image', `${route}: Twitter card should use the large preview`);
  check(singleMeta(document, 'twitter:title') === ogTitle, `${route}: Twitter title differs from Open Graph`);
  check(singleMeta(document, 'twitter:description') === ogDescription, `${route}: Twitter description differs from Open Graph`);
  check(singleMeta(document, 'twitter:image') === image, `${route}: Twitter image differs from Open Graph`);
  for (const anchor of document.anchors) if (anchor.href) await auditReference(anchor.href, route, { hash: true });
  for (const image of document.images) {
    check(Object.hasOwn(image, 'alt'), `${route}: image missing alt attribute (${image.src})`);
    check(Number(image.width) > 0 && Number(image.height) > 0, `${route}: image missing intrinsic dimensions (${image.src})`);
    await auditReference(image.src, route);
  }
  for (const image of document.svgImages) if (image.href || image['xlink:href']) await auditReference(image.href || image['xlink:href'], route);
  for (const source of [...document.sources, ...document.images]) {
    if (source.srcset && !source.srcset.startsWith('data:')) {
      for (const item of source.srcset.split(',')) await auditReference(item.trim().split(/\s+/)[0], route);
    }
  }
  for (const source of document.scriptSources) await auditReference(source.src, route);
  for (const link of document.links) if (link.href) await auditReference(link.href, route);
  return auditSchema(document);
}

async function publishedSlugs() {
  // Read the deliberately explicit publication list without evaluating TS or
  // image imports. Commented sample imports and array entries stay unpublished.
  const source = (await readFile(path.join(root, 'content/blog/index.ts'), 'utf8')).replace(/\/\*[^]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  const array = source.match(/export\s+const\s+posts\s*(?::[^=]+)?=\s*\[([^]*?)\]/)?.[1];
  if (!array) throw new Error('Cannot read the explicit posts array in content/blog/index.ts');
  const exports = new Map();
  for (const match of source.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/g)) {
    for (const name of match[1].split(',').map(value => value.trim()).filter(Boolean)) exports.set(name.split(/\s+as\s+/).at(-1), match[2]);
  }
  const names = array.split(',').map(value => value.trim()).filter(Boolean);
  const slugs = [];
  for (const name of names) {
    const imported = exports.get(name);
    if (!imported) throw new Error(`Cannot resolve published post ${name}; keep the publication list explicit`);
    const post = await readFile(path.resolve(root, 'content/blog', `${imported}.ts`), 'utf8');
    const slug = post.match(/\bslug\s*:\s*['"]([^'"]+)['"]/)?.[1];
    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid or missing stable slug for ${name}`);
    const dates = Object.fromEntries(['date', 'updated', 'publishedAt', 'updatedAt'].map(key => [key, post.match(new RegExp(`\\b${key}\\s*:\\s*['"]([^'"]+)['"]`))?.[1]]));
    check(validDate(dates.date) && dates.date?.length === 10, `${slug}: date must be a valid YYYY-MM-DD calendar day`);
    if (dates.updated) check(validDate(dates.updated) && dates.updated.length === 10 && dates.updated >= dates.date, `${slug}: updated must be a calendar day on or after publication`);
    for (const [field, day] of [['publishedAt', dates.date], ['updatedAt', dates.updated || dates.date]]) {
      if (!dates[field]) continue;
      check(validDate(dates[field]) && validDateTime(dates[field]), `${slug}: ${field} must be a full ISO datetime with Z or an explicit timezone offset`);
      check(dates[field].slice(0, 10) === day, `${slug}: ${field} must correspond to the visible calendar day ${day}`);
    }
    sourceDatesBySlug.set(slug, dates);
    slugs.push(slug);
  }
  check(new Set(slugs).size === slugs.length, 'Publication list contains duplicate slugs');
  return slugs;
}

async function auditSitemap(routes, postsByRoute) {
  const filename = path.join(output, 'sitemap.xml');
  if (!check(await exists(filename), 'Missing sitemap.xml')) return;
  const sitemap = await readFile(filename, 'utf8');
  const entries = [...sitemap.matchAll(/<url\b[^>]*>([^]*?)<\/url>/g)].map(match => ({
    url: decode(match[1].match(/<loc>([^]*?)<\/loc>/)?.[1] || ''),
    lastmod: match[1].match(/<lastmod>([^]*?)<\/lastmod>/)?.[1],
    alternates: elements(match[1], 'xhtml:link'),
  }));
  const expected = new Set(routes.map(absolute));
  check(entries.length === expected.size, `Sitemap has ${entries.length} entries; expected ${expected.size}`);
  check(new Set(entries.map(entry => entry.url)).size === entries.length, 'Sitemap contains duplicate URLs');
  for (const entry of entries) {
    check(expected.has(entry.url), `Sitemap includes unexpected/noncanonical URL ${entry.url}`);
    const local = localUrl(entry.url, '/');
    if (!local) continue;
    for (const [hreflang, href] of Object.entries(alternatesFor(local.route))) {
      check(entry.alternates.some(link => link.rel === 'alternate' && link.hreflang === hreflang && link.href === href), `${local.route}: sitemap missing ${hreflang} alternate`);
    }
    if (entry.lastmod) {
      check(validDate(entry.lastmod), `${local.route}: sitemap lastmod is not a valid ISO date`);
      const post = postsByRoute.get(local.route);
      if (post) check(entry.lastmod.slice(0, 10) === post.dateModified?.slice(0, 10), `${local.route}: sitemap lastmod must match the article modification date`);
    }
  }
  for (const url of expected) check(entries.some(entry => entry.url === url), `Sitemap is missing ${url}`);
  check(!/<(?:priority|changefreq)>/.test(sitemap), 'Sitemap includes unsupported Google priority/changefreq hints; keep it factual');
}

async function allHtmlFiles(directory = output) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => entry.isDirectory() ? allHtmlFiles(path.join(directory, entry.name)) : entry.name.endsWith('.html') ? [path.join(directory, entry.name)] : []));
  return files.flat();
}

async function main() {
  if (!await exists(path.join(output, 'index.html'))) throw new Error(`No static export found at ${output}. Run npm run build first.`);
  const slugs = await publishedSlugs();
  const englishRoutes = [...coreRoutes, ...slugs.map(slug => `/blog/${slug}/`)];
  const routes = englishRoutes.flatMap(route => [route, localized(route, 'zh')]);
  const titles = new Map();
  const descriptions = new Map();
  const postsByRoute = new Map();
  // Load all expected documents before checking links and fragments.
  await Promise.all(routes.map(getDocument));
  for (const route of routes) {
    const document = documents.get(route);
    if (document) {
      const post = await auditPage(document, titles, descriptions);
      if (post) postsByRoute.set(route, post);
    }
  }
  await auditSitemap(routes, postsByRoute);
  const legacyRoutes = ['/journal/', ...slugs.map(slug => `/journal/${slug}/`)];
  for (const route of legacyRoutes) {
    const document = await getDocument(route);
    if (!document) continue;
    check(metas(document, 'robots').some(value => /noindex|none/i.test(value)), `${route}: legacy redirect must not be indexed`);
    const target = route.replace('/journal/', '/blog/');
    check(canonicalFor(document) === absolute(target), `${route}: legacy canonical must point to ${target}`);
    check(document.anchors.some(anchor => { try { return new URL(anchor.href, absolute(route)).href === absolute(target); } catch { return false; } }), `${route}: redirect needs a crawlable destination fallback`);
    // The no-JavaScript redirect deliberately lives in <noscript> so the
    // regular client redirect can preserve query strings and fragments.
    const refresh = document.allMetas.find(meta => meta['http-equiv']?.toLowerCase() === 'refresh')?.content;
    const destination = refresh?.match(/^0\s*;\s*url\s*=\s*(.+)$/i)?.[1]?.replace(/^['"]|['"]$/g, '');
    check(Boolean(destination) && new URL(destination, absolute(route)).href === absolute(target), `${route}: expected immediate meta refresh to the canonical destination`);
  }
  const notFoundFile = path.join(output, '404.html');
  if (check(await exists(notFoundFile), 'GitHub Pages needs an exported 404.html')) {
    const notFound = parseDocument(await readFile(notFoundFile, 'utf8'), '/404.html', notFoundFile);
    check(metas(notFound, 'robots').some(value => /noindex|none/i.test(value)), '404.html must be noindex');
  }
  const knownFiles = new Set([...documents.values()].map(document => document.filename));
  for (const filename of await allHtmlFiles()) {
    if (knownFiles.has(filename)) continue;
    const relative = path.relative(output, filename).split(path.sep).join('/');
    const document = parseDocument(await readFile(filename, 'utf8'), `/${relative}`, filename);
    check(metas(document, 'robots').some(value => /noindex|none/i.test(value)), `Unexpected indexable export ${relative}; add an intentional route to the audit or unpublish it`);
  }
  const blogDirectories = await readdir(path.join(root, 'content/blog'), { withFileTypes: true });
  const unpublished = blogDirectories.filter(entry => entry.isDirectory() && !slugs.includes(entry.name)).map(entry => entry.name);
  for (const slug of unpublished) {
    if (!await exists(path.join(root, 'content/blog', slug, 'post.ts'))) continue;
    for (const prefix of ['/blog/', '/zh/blog/', '/journal/']) check(!await exists(fileForRoute(`${prefix}${slug}/`)), `Draft/sample has a public route: ${prefix}${slug}/`);
    for (const document of documents.values()) check(!document.html.includes(slug), `${document.route}: unpublished article ${slug} appears in exported HTML/payload`);
  }
  const robotsFile = path.join(output, 'robots.txt');
  if (check(await exists(robotsFile), 'Missing robots.txt')) {
    const robots = await readFile(robotsFile, 'utf8');
    check(/^User-Agent:\s*\*/im.test(robots), 'robots.txt must include a rule for all crawlers');
    check(!/^Disallow:\s*\/(?:\*?)\s*$/im.test(robots), 'robots.txt blocks the whole site');
    check(!/^Disallow:\s*\/.*(?:_next|images)/im.test(robots), 'robots.txt blocks rendering assets');
    check(robots.split(/\r?\n/).some(line => /^Sitemap:/i.test(line) && line.slice(line.indexOf(':') + 1).trim() === absolute('/sitemap.xml')), 'robots.txt does not advertise the canonical sitemap');
  }
  return { pages: routes.length, publishedArticles: slugs.length, localReferences: localReferences.size, assertions };
}

let metrics = {};
try { metrics = await main(); }
catch (error) { failures.push(error.stack || String(error)); }

const report = { status: failures.length ? 'failed' : 'passed', output: path.relative(root, output) || '.', ...metrics, failures, warnings };
if (jsonOutput) console.log(JSON.stringify(report, null, 2));
else {
  console.log(`SEO export audit: ${report.status.toUpperCase()}`);
  if (metrics.pages) console.log(`${metrics.pages} bilingual pages · ${metrics.publishedArticles} published article(s) · ${metrics.localReferences} local references · ${metrics.assertions} assertions`);
  for (const failure of failures.slice(0, 80)) console.error(`  FAIL ${failure}`);
  if (failures.length > 80) console.error(`  … ${failures.length - 80} additional failures (use --json for the full report)`);
  for (const warning of warnings) console.warn(`  NOTE ${warning}`);
  if (!failures.length) console.log('Metadata, reciprocal language URLs, structured data, sitemap, crawl rules, publication boundaries, links and assets verified.');
}
process.exitCode = failures.length ? 1 : 0;
