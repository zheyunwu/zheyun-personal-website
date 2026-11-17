'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsConfigured, startPageView, trackInteraction, useAnalyticsConsent } from '@/lib/analytics';
import { withBasePath } from '@/lib/i18n';
import { useLanguage } from './language';

const depthMilestones = [25, 50, 75, 90];

function onLinkActivation(event: MouseEvent) {
  if (event.button !== (event.type === 'auxclick' ? 1 : 0)) return;
  const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
  if (!(link instanceof HTMLAnchorElement)) return;
  if (link.protocol === 'mailto:') {
    trackInteraction('email_click');
  } else if (link.relList.contains('sponsored') && link.protocol === 'https:' && link.hostname === 'join.robinhood.com') {
    trackInteraction('referral_click', { provider: 'robinhood' });
  }
}

function ConsentedTracker() {
  const consent = useAnalyticsConsent();
  const pathname = usePathname();
  const { lang } = useLanguage();

  useEffect(() => {
    if (consent !== 'granted' || !pathname) return;
    // Arbitrary URLs which hit GitHub Pages' 404 may contain personal data.
    const path = withBasePath(document.querySelector('main.not-found') ? '/404/' : pathname);
    startPageView(path, lang);
    document.addEventListener('click', onLinkActivation, true);
    document.addEventListener('auxclick', onLinkActivation, true);
    const article = document.querySelector('.article-prose');
    let frame = 0;
    let nextMilestone = 0;
    function measure() {
      frame = 0;
      if (!article || document.visibilityState !== 'visible') return;
      const bounds = article.getBoundingClientRect();
      if (bounds.height <= 0) return;
      const progress = (window.innerHeight - bounds.top) / bounds.height * 100;
      while (nextMilestone < depthMilestones.length && progress >= depthMilestones[nextMilestone]) {
        trackInteraction('article_read_depth', { percent_scrolled: depthMilestones[nextMilestone] });
        nextMilestone++;
      }
    }
    function requestMeasure() {
      if (!frame) frame = window.requestAnimationFrame(measure);
    }
    function onPageShow(event: PageTransitionEvent) {
      if (!event.persisted) return;
      startPageView(path, lang, true);
      nextMilestone = 0;
      if (article) requestMeasure();
    }
    window.addEventListener('pageshow', onPageShow);
    if (article) {
      requestMeasure();
      window.addEventListener('scroll', requestMeasure, { passive: true });
      window.addEventListener('resize', requestMeasure);
      document.addEventListener('visibilitychange', requestMeasure);
    }
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('scroll', requestMeasure);
      window.removeEventListener('resize', requestMeasure);
      document.removeEventListener('visibilitychange', requestMeasure);
      document.removeEventListener('click', onLinkActivation, true);
      document.removeEventListener('auxclick', onLinkActivation, true);
    };
  }, [consent, lang, pathname]);
  return null;
}

export function AnalyticsTracker() {
  return analyticsConfigured ? <ConsentedTracker /> : null;
}
