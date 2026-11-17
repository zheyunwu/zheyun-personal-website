// Run with Node 24+: node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test scripts/check-analytics.test.mjs
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { test } from 'node:test';

// Next resolves extensionless TypeScript imports. Native Node ESM needs the extension.
registerHooks({
  resolve(specifier, context, nextResolve) {
    return nextResolve(specifier === './i18n' ? './i18n.ts' : specifier, context);
  },
});

const measurementId = 'G-TEST123456';
const preferenceKey = 'zheyun.analytics-consent.v1';

async function setup(t, { savedChoice, configured = true } = {}) {
  const store = new Map();
  if (savedChoice !== undefined) store.set(preferenceKey, savedChoice);
  const storage = {
    getItem: key => store.get(key) ?? null,
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: key => store.delete(key),
  };
  const location = new URL('https://zheyun.dev/zh/blog/example/?email=test%40private.invalid#secret');
  let reloads = 0;
  location.reload = () => { reloads++; };

  const scripts = [];
  const cookies = new Map([['site_prefs', 'preserve']]);
  const document = Object.assign(new EventTarget(), {
    head: { appendChild: script => scripts.push(script) },
    referrer: 'https://reader.example/private-email?search=secret',
    title: 'Example post', location,
    createElement: () => new EventTarget(),
  });
  Object.defineProperty(document, 'cookie', {
    get: () => [...cookies].map(([k, v]) => k + '=' + v).join('; '),
    set: raw => {
      const [pair] = raw.split(';');
      const [name, value] = pair.split('=');
      if (value) cookies.set(name, value);
      else cookies.delete(name);
    },
  });
  const window = Object.assign(new EventTarget(), { location, document, localStorage: storage, setTimeout, clearTimeout });
  for (const [name, value] of Object.entries({ window, document, location, localStorage: storage })) {
    const original = Object.getOwnPropertyDescriptor(globalThis, name);
    Object.defineProperty(globalThis, name, { value, configurable: true });
    t.after(() => original ? Object.defineProperty(globalThis, name, original) : delete globalThis[name]);
  }
  const originalId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = configured ? measurementId : '';
  t.after(() => {
    if (originalId === undefined) delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    else process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = originalId;
  });
  const analytics = await import('../lib/analytics.ts?scenario=' + encodeURIComponent(t.name));
  return {
    ...analytics, scripts, cookies, window, location, storage,
    reloads: () => reloads,
    commands: () => (window.dataLayer ?? []).map(command => Array.from(command)),
  };
}

test('no Google script or analytics events before a decision, after refusal, or after expiry', async t => {
  const ga = await setup(t);
  for (const decision of ['undecided', 'denied', 'expired']) {
    if (decision === 'denied') ga.setAnalyticsConsent('denied');
    if (decision === 'expired') {
      ga.storage.setItem(preferenceKey, JSON.stringify({ choice: 'granted', expiresAt: Date.now() - 1 }));
    }
    ga.startPageView('/zh/blog/example/', 'zh');
    ga.trackInteraction('email_click', {});
    assert.equal(ga.scripts.length, 0, decision);
    assert.deepEqual(ga.commands().filter(([cmd]) => cmd === 'event'), [], decision);
  }
});

test('consent enables one page view per navigation and sanitizes its URL and referrer', async t => {
  const ga = await setup(t);
  ga.setAnalyticsConsent('granted');
  ga.startPageView(ga.location.pathname + ga.location.search + ga.location.hash, 'zh');
  ga.startPageView('/zh/blog/example/', 'zh');
  ga.location.pathname = '/zh/cv/';
  ga.startPageView('/zh/cv/', 'zh');
  assert.equal(ga.scripts.length, 1);
  const commands = ga.commands();
  const views = commands.filter(([command, name]) => command === 'event' && name === 'page_view');
  assert.deepEqual(views.map(([, , params]) => [params.page_location, params.page_referrer, params.site_language]), [
    ['https://zheyun.dev/zh/blog/example/', 'https://reader.example', 'zh'],
    ['https://zheyun.dev/zh/cv/', 'https://zheyun.dev/zh/blog/example/', 'zh'],
  ]);
  const config = commands.find(([command]) => command === 'config')?.[2];
  assert.equal(config?.send_page_view, false);
  assert.equal(config?.allow_google_signals, false);
  assert.equal(config?.allow_ad_personalization_signals, false);
  const consents = commands.find(([command]) => command === 'consent')?.[2];
  assert.equal(consents?.analytics_storage, 'granted');
  for (const field of ['ad_storage', 'ad_user_data', 'ad_personalization']) assert.equal(consents?.[field], 'denied');
  const payload = JSON.stringify(commands);
  assert.doesNotMatch(payload, /private-email|private\.invalid|secret|%40/);
});

test('reports article milestones once per view and includes only approved interaction parameters', async t => {
  const ga = await setup(t);
  ga.setAnalyticsConsent('granted');
  const article = '/blog/example/';
  ga.startPageView(article, 'en');
  for (const percent of [5, 20, 25, 25, 50, 75, 90, 90, 100]) {
    ga.trackInteraction('article_read_depth', { percent_scrolled: percent });
  }
  ga.trackInteraction('referral_click', { provider: 'unknown' });
  ga.trackInteraction('referral_click', { provider: 'robinhood', link_url: 'private-invitation-url' });
  ga.trackInteraction('email_click', { email: 'private-recipient' });
  ga.startPageView('/', 'en');
  ga.startPageView(article, 'en');
  ga.trackInteraction('article_read_depth', { percent_scrolled: 25 });
  const interactions = ga.commands().filter(([cmd, name]) => cmd === 'event' && name !== 'page_view');
  assert.deepEqual(interactions.map(([, name, params]) => [name, params.percent_scrolled ?? params.provider]), [
    ['article_read_depth', 25], ['article_read_depth', 50], ['article_read_depth', 75], ['article_read_depth', 90],
    ['referral_click', 'robinhood'], ['email_click', undefined], ['article_read_depth', 25],
  ]);
  assert.doesNotMatch(JSON.stringify(interactions), /private-recipient|private-invitation-url/);
  // Restoring the same document with the browser Back button starts a new view.
  ga.startPageView(article, 'en', true);
  ga.trackInteraction('article_read_depth', { percent_scrolled: 25 });
  assert.deepEqual(ga.commands().filter(([cmd]) => cmd === 'event').slice(-2).map(([, name]) => name),
    ['page_view', 'article_read_depth']);
});

test('remembers a decision for 180 days and applies withdrawal from another open tab', async t => {
  const ga = await setup(t);
  const unsubscribe = ga.subscribeAnalyticsConsent(() => {});
  try {
    const before = Date.now();
    ga.setAnalyticsConsent('granted');
    const stored = JSON.parse(ga.storage.getItem(preferenceKey));
    const duration = 180 * 86400000;
    assert.equal(stored.choice, 'granted');
    assert.ok(stored.expiresAt >= before + duration && stored.expiresAt <= Date.now() + duration);
    ga.startPageView('/', 'en');
    ga.storage.setItem(preferenceKey, JSON.stringify({ ...stored, choice: 'denied' }));
    ga.window.dispatchEvent(Object.assign(new Event('storage'), { key: preferenceKey }));
    assert.equal(ga.getAnalyticsConsent(), 'denied');
    assert.equal(ga.window['ga-disable-' + measurementId], true);
    assert.equal(ga.reloads(), 1);
    ga.trackInteraction('email_click');
    assert.deepEqual(ga.commands().filter(([cmd, name]) => cmd === 'event' && name === 'email_click'), []);
  } finally {
    unsubscribe();
  }
});

test('withdrawal clears this stream’s identifiers and suppresses later events', async t => {
  const ga = await setup(t);
  ga.setAnalyticsConsent('granted');
  ga.startPageView('/zh/blog/example/', 'zh');
  ga.cookies.set('_ga', 'test');
  ga.cookies.set('_ga_TEST123456', 'test');
  ga.trackInteraction('email_click', {});
  ga.setAnalyticsConsent('denied');
  const count = ga.commands().filter(([cmd]) => cmd === 'event').length;
  ga.trackInteraction('email_click', {});
  ga.startPageView('/zh/cv/', 'zh');
  assert.equal(ga.commands().filter(([cmd]) => cmd === 'event').length, count);
  assert.equal(ga.window['ga-disable-' + measurementId], true);
  assert.deepEqual([...ga.cookies.keys()], ['site_prefs']);
  assert.equal(ga.reloads(), 1);
});

test('a missing measurement ID leaves the site untracked even with a prior grant', async t => {
  const ga = await setup(t, {
    savedChoice: JSON.stringify({ choice: 'granted', expiresAt: Date.now() + 86400000 }),
    configured: false,
  });
  ga.startPageView('/zh/blog/example/', 'zh');
  assert.equal(ga.scripts.length, 0);
  assert.equal(ga.commands().filter(([cmd]) => cmd === 'event').length, 0);
});
