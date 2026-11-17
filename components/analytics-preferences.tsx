'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { analyticsConfigured, setAnalyticsConsent, useAnalyticsConsent } from '@/lib/analytics';
import { useLanguage } from './language';
import Link from './localized-link';
import './analytics-preferences.css';

export function AnalyticsPreferences() {
  return analyticsConfigured ? <PreferencesControl /> : null;
}

function PreferencesControl() {
  const { t } = useLanguage();
  const consent = useAnalyticsConsent();
  const [ready, setReady] = useState(false);
  const [editing, setEditing] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => setReady(true), []);
  useEffect(() => {
    if (editing) panel.current?.focus();
  }, [editing]);

  if (!ready) return null;
  const show = editing || (consent === 'unknown' && !dismissed);

  function close() {
    if (editing) trigger.current?.focus({ preventScroll: true });
    setEditing(false);
    setDismissed(true);
  }

  function choose(choice: 'granted' | 'denied') {
    close();
    setAnalyticsConsent(choice);
  }

  return (
    <>
      <button
        className="analytics-preferences-link"
        type="button"
        ref={trigger}
        aria-expanded={show}
        aria-controls={show ? 'analytics-preferences-panel' : undefined}
        onClick={() => {
          setEditing(true);
          panel.current?.focus();
        }}
      >
        {t('Analytics settings', '统计设置')}
      </button>
      {show && createPortal(
        <section
          id="analytics-preferences-panel"
          className="analytics-preferences-panel"
          ref={panel}
          tabIndex={-1}
          aria-labelledby="analytics-preferences-title"
          onKeyDown={event => {
            if (event.key === 'Escape') close();
          }}
        >
          <div className="analytics-preferences-heading">
            <h2 id="analytics-preferences-title">{t('Optional analytics', '可选访问统计')}</h2>
            <button type="button" className="analytics-preferences-close" onClick={close} aria-label={t('Close analytics settings', '关闭统计设置')}>
              <X size={17} aria-hidden="true" />
            </button>
          </div>
          <p>
            {t(
              'May I use Google Analytics cookies to measure visits, reading progress and clicks on referral and email links? You can change your choice in the footer.',
              '是否允许本站使用 Google Analytics 的 Cookie 统计访问量、文章阅读进度，以及邀请链接和邮箱链接的点击次数？你可以随时在页脚更改选择。'
            )}{' '}
            <Link href="/privacy/#analytics" onClick={close}>{t('Privacy details', '隐私说明')}</Link>
          </p>
          {editing && consent !== 'unknown' && (
            <p className="analytics-preferences-status">
              {consent === 'granted'
                ? t('Analytics is currently on.', '当前已允许统计。')
                : t('Analytics is currently off.', '当前已关闭统计。')}
            </p>
          )}
          <div className="analytics-preferences-actions">
            <button type="button" onClick={() => choose('denied')}>
              {consent === 'granted' ? t('Withdraw consent', '撤回同意') : t('Decline', '拒绝')}
            </button>
            <button type="button" onClick={() => choose('granted')}>
              {t('Allow analytics', '允许统计')}
            </button>
          </div>
        </section>,
        document.body
      )}
    </>
  );
}
