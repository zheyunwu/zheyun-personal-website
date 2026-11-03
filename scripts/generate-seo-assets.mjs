import { readFile, mkdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement as h } from 'react';
import { ImageResponse } from 'next/og.js';
import sharp from 'sharp';

// Static, self-hosted assets: no image service or runtime rendering is required.
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const images = join(root, 'public/images');
const social = join(images, 'social');
await mkdir(social, { recursive: true });

const palette = { paper: '#faf9f6', ink: '#202b36', muted: '#586573', line: '#d7dddf', blue: '#3155bd', pale: '#edf1f7' };
const fonts = await Promise.all([
  ['Manrope', 400, '@fontsource/manrope/files/manrope-latin-400-normal.woff'],
  ['Manrope', 600, '@fontsource/manrope/files/manrope-latin-600-normal.woff'],
  ['Newsreader', 500, '@fontsource/newsreader/files/newsreader-latin-500-normal.woff'],
].map(async ([name, weight, path]) => ({ name, weight, style: 'normal', data: await readFile(join(root, 'node_modules', path)) })));

const outputs = [];
for (const width of [160, 320, 640, 960]) {
  const path = join(images, `zheyun-avatar-${width}.webp`);
  await sharp(join(images, 'zheyun_avatar.jpg')).rotate().resize(width, width).webp({ quality: 82, effort: 6 }).toFile(path);
  outputs.push(path);
}

const portrait = `data:image/jpeg;base64,${(await sharp(join(images, 'zheyun_avatar.jpg')).resize(480, 480).jpeg({ quality: 88 }).toBuffer()).toString('base64')}`;
const text = (content, style = {}) => h('div', { style: { display: 'flex', ...style } }, content);
const rule = (style = {}) => text('', { height: 1, background: palette.line, ...style });
const shell = children => h('div', { style: { display: 'flex', flexDirection: 'column', width: 1200, height: 630, background: palette.paper, color: palette.ink, fontFamily: 'Manrope', padding: '48px 64px' } }, ...children);
const brand = right => h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' } },
  h('div', { style: { display: 'flex', fontSize: 32, fontWeight: 600, letterSpacing: -1.1 } }, 'Zheyun Wu', h('span', { style: { color: palette.blue } }, '.')),
  text(right, { fontSize: 21, color: palette.muted }),
);

const siteCard = shell([
  brand('zheyun.dev'),
  h('div', { style: { display: 'flex', flex: 1, gap: 56, marginTop: 40, alignItems: 'center' } },
    h('div', { style: { display: 'flex', flexDirection: 'column', width: 650 } },
      text('Technology,', { fontFamily: 'Newsreader', fontSize: 86, fontWeight: 500, lineHeight: 1.04, letterSpacing: -2.2 }),
      text('AI, and life.', { fontFamily: 'Newsreader', fontSize: 86, fontWeight: 500, lineHeight: 1.04, letterSpacing: -2.2, color: palette.blue }),
      text('AI Platform Engineer at SAP', { marginTop: 28, fontSize: 24, fontWeight: 600 }),
      text('Berlin, Germany', { marginTop: 8, fontSize: 24, color: palette.muted }),
    ),
    h('img', { src: portrait, width: 342, height: 342, style: { borderRadius: 5, objectFit: 'cover' } }),
  ),
  rule({ marginTop: 30 }),
  text('From Quanzhou, China. At home in Berlin, Germany.', { marginTop: 20, fontSize: 20, color: palette.muted }),
]);

const articleCard = shell([
  brand('Blog · Personal research'),
  h('div', { style: { display: 'flex', flex: 1, gap: 44, alignItems: 'center', marginTop: 36 } },
    h('div', { style: { display: 'flex', flexDirection: 'column', width: 660 } },
      text('Robinhood’s 5%', { fontFamily: 'Newsreader', fontSize: 77, fontWeight: 500, letterSpacing: -2.1, lineHeight: 1.05 }),
      text('on euros.', { fontFamily: 'Newsreader', fontSize: 77, fontWeight: 500, letterSpacing: -2.1, lineHeight: 1.05 }),
      text('Is it safe?', { fontFamily: 'Newsreader', fontSize: 77, fontWeight: 500, letterSpacing: -2.1, lineHeight: 1.1, color: palette.blue }),
    ),
    h('div', { style: { display: 'flex', flexDirection: 'column', width: 340, padding: '34px 30px', background: palette.pale, borderRadius: 5 } },
      text('Two layers of risk', { fontSize: 19, fontWeight: 600, color: palette.muted }),
      text('The platform.', { marginTop: 30, fontFamily: 'Newsreader', fontSize: 40, lineHeight: 1.2, color: palette.blue }),
      rule({ marginTop: 20, marginBottom: 20 }),
      text('The fund.', { fontFamily: 'Newsreader', fontSize: 40, lineHeight: 1.2, color: palette.blue }),
    ),
  ),
  rule({ marginTop: 24 }),
  h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 } },
    text('Banking · Investing · Money market funds', { fontSize: 20, color: palette.muted }),
    text('zheyun.dev', { fontSize: 21, color: palette.ink }),
  ),
]);

for (const [name, card] of [['zheyun-wu', siteCard], ['robinhood-euro-yield-safety', articleCard]]) {
  const response = new ImageResponse(card, { width: 1200, height: 630, fonts });
  const png = Buffer.from(await response.arrayBuffer());
  const path = join(social, `${name}.jpg`);
  await sharp(png).jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(path);
  outputs.push(path);
}

for (const path of outputs) {
  const { width, height } = await sharp(path).metadata();
  console.log(`${path.slice(root.length + 1)}: ${width}×${height}, ${(await stat(path)).size} bytes`);
}
