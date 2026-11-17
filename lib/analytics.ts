'use client';

import { useSyncExternalStore } from 'react';
import type { Language } from './i18n';

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
export const analyticsConfigured = /^G-[A-Z0-9]+$/.test(measurementId);
const consentKey = 'zheyun.analytics-consent.v1';
const lifetimeSeconds = 180 * 24 * 60 * 60;
const optOutFlag = `ga-disable-${measurementId}` as const;
type Decision = 'granted' | 'denied';
type Consent = Decision | 'unknown';
type StoredConsent = { choice: Decision; expiresAt: number };

declare global {
  interface Window {
    dataLayer?: unknown[];
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

let memoryConsent: StoredConsent | null = null;
let useMemoryOnly = false;
let hasLoadedTag = false;
let currentPage: { page_location: string; page_referrer: string; page_title: string; site_language: Language } | null = null;
const reportedDepths = new Set<number>();
const consentListeners = new Set<() => void>();
let expiryTimer: number | undefined;

function storedConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null;
  if (!useMemoryOnly) {
    try {
      const raw = window.localStorage.getItem(consentKey);
      const record = raw ? JSON.parse(raw) : null;
      memoryConsent = record && (record.choice === 'granted' || record.choice === 'denied') &&
        Number.isSafeInteger(record.expiresAt) ? record : null;
    } catch {
      // A malformed record is not permission. In browsers with no storage,
      // setAnalyticsConsent keeps the visitor's choice for this document.
      memoryConsent = null;
    }
  }
  return memoryConsent && memoryConsent.expiresAt > Date.now() ? memoryConsent : null;
}

export function getAnalyticsConsent(): Consent {
  return storedConsent()?.choice || 'unknown';
}

function clearAnalyticsCookies() {
  try {
    const names = new Set(document.cookie.split(';').map(cookie => cookie.trim().split('=')[0]));
    for (const name of ['_ga', `_ga_${measurementId.slice(2)}`]) {
      if (names.has(name)) document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    }
  } catch { /* The browser blocks cookie access. */ }
}

function refreshConsent() {
  window.clearTimeout(expiryTimer);
  const record = storedConsent();
  if (!record && memoryConsent) {
    memoryConsent = null;
    try { window.localStorage.removeItem(consentKey); } catch { /* Storage is blocked. */ }
  }
  if (record && consentListeners.size) {
    // Browsers store timeout delays as signed 32-bit integers.
    expiryTimer = window.setTimeout(refreshConsent, Math.min(2_147_483_647, record.expiresAt - Date.now()));
  }
  if (analyticsConfigured && record?.choice !== 'granted') {
    window[optOutFlag] = true;
    clearAnalyticsCookies();
    if (currentPage) {
      currentPage = null;
      reportedDepths.clear();
      // Unload all third-party timers/listeners after opting out, including in
      // other open tabs. Keep the current document if saving the choice failed.
      if (!useMemoryOnly) window.location.reload();
    }
  }
  for (const notify of consentListeners) notify();
}

function onStorage(event: StorageEvent) {
  if (event.key !== consentKey && event.key !== null) return;
  useMemoryOnly = false;
  refreshConsent();
}

export function subscribeAnalyticsConsent(notify: () => void) {
  consentListeners.add(notify);
  if (consentListeners.size === 1) {
    window.addEventListener('storage', onStorage);
    window.addEventListener('pageshow', refreshConsent);
    document.addEventListener('visibilitychange', refreshConsent);
    refreshConsent();
  }
  return () => {
    consentListeners.delete(notify);
    if (consentListeners.size === 0) {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('pageshow', refreshConsent);
      document.removeEventListener('visibilitychange', refreshConsent);
      window.clearTimeout(expiryTimer);
    }
  };
}

const serverConsent = (): Consent => 'unknown';
export function useAnalyticsConsent(): Consent {
  return useSyncExternalStore(subscribeAnalyticsConsent, getAnalyticsConsent, serverConsent);
}

export function setAnalyticsConsent(choice: Decision) {
  const record = { choice, expiresAt: Date.now() + lifetimeSeconds * 1000 };
  memoryConsent = record;
  try {
    window.localStorage.setItem(consentKey, JSON.stringify(record));
    useMemoryOnly = false;
  } catch {
    useMemoryOnly = true;
    // A quota error can prevent replacement while still permitting deletion.
    try { window.localStorage.removeItem(consentKey); } catch { /* Storage is blocked. */ }
  }
  refreshConsent();
}

function gtag(..._command: unknown[]) {
  // gtag.js consumes arguments objects, as in Google's tag snippet.
  (window.dataLayer ??= []).push(arguments);
}

function initialReferrer() {
  try {
    const url = new URL(document.referrer);
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.origin;
  } catch { /* Direct visit or unavailable referrer. */ }
  return '';
}

const adConsent = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
};

export function startPageView(pathname: string, language: Language, restoredFromCache = false) {
  if (!analyticsConfigured || getAnalyticsConsent() !== 'granted') return;
  const path = pathname.split(/[?#]/, 1)[0].replace(/\/+$/, '') + '/';
  const location = window.location.origin + path;
  if (!restoredFromCache && currentPage?.page_location === location) return;

  currentPage = {
    page_location: location,
    page_referrer: restoredFromCache ? '' : currentPage?.page_location ?? initialReferrer(),
    page_title: document.title,
    site_language: language,
  };
  reportedDepths.clear();
  const needsTag = !hasLoadedTag;
  const wasDisabled = window[optOutFlag];
  window[optOutFlag] = false;
  if (needsTag) {
    hasLoadedTag = true;
    gtag('consent', 'default', { ...adConsent, analytics_storage: 'granted' });
    gtag('js', new Date());
  } else if (wasDisabled) {
    gtag('consent', 'update', { ...adConsent, analytics_storage: 'granted' });
  }
  // Configure every virtual page so automatically generated session and
  // engagement events also use the clean URL and referrer.
  gtag('config', measurementId, {
    ...currentPage,
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_domain: 'none',
    cookie_path: '/',
    cookie_expires: lifetimeSeconds,
    cookie_update: false,
    ...(needsTag ? {} : { update: true }),
  });
  gtag('event', 'page_view', { ...currentPage, send_to: measurementId });
  if (needsTag) {
    const script = document.createElement('script');
    script.async = true;
    script.referrerPolicy = 'no-referrer';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }
}

export function trackInteraction(
  name: 'article_read_depth' | 'referral_click' | 'email_click',
  params: { percent_scrolled?: number; provider?: string } = {},
) {
  if (!hasLoadedTag || !currentPage || getAnalyticsConsent() !== 'granted') return;
  const details: Record<string, string | number> = {};
  if (name === 'article_read_depth') {
    const depth = params.percent_scrolled;
    if (!depth || ![25, 50, 75, 90].includes(depth) || reportedDepths.has(depth)) return;
    reportedDepths.add(depth);
    details.percent_scrolled = depth;
  } else if (name === 'referral_click' && params.provider === 'robinhood') {
    details.provider = 'robinhood';
  } else if (name !== 'email_click') {
    return;
  }
  gtag('event', name, { ...currentPage, ...details, send_to: measurementId });
}
