'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Maximize2, Minimize2, X, ZoomIn } from 'lucide-react';
import type { PostImage } from '@/content/blog';
import { useLanguage } from './language';
import './article-image.css';

export default function ArticleImage({ image }: { image: PostImage }) {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const backdropPress = useRef(false);
  const titleId = useId();
  const captionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const body = document.body;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const paddingRight = parseFloat(getComputedStyle(body).paddingRight) || 0;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = `-${scrollX}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${paddingRight + scrollbarWidth}px`;

    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      if (dialog.open) dialog.close();
      Object.assign(body.style, previous);
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      window.scrollTo(scrollX, scrollY);
      triggerRef.current?.focus({ preventScroll: true });
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, [open]);

  function toggleZoom() {
    setZoomed(value => !value);
    stageRef.current?.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  return (
    <>
      <figure className={`article-figure${image.size === 'compact' ? ' article-figure-compact' : ''}`}>
        <button
          className="article-image-trigger"
          type="button"
          ref={triggerRef}
          aria-haspopup="dialog"
          aria-label={t('Enlarge image: ', '放大图片：') + image.alt[lang]}
          onClick={() => { setZoomed(false); setOpen(true); }}
        >
          <img src={image.src} alt={image.alt[lang]} width={image.width} height={image.height} loading="lazy" decoding="async" />
          <span className="article-image-zoom-cue" aria-hidden="true"><ZoomIn size={17} /></span>
        </button>
        <figcaption>
          {image.caption ? <span>{image.caption[lang]}</span> : null}
          <span className="article-image-hint">{t('Click to take a closer look.', '点击图片，放大查看。')}</span>
        </figcaption>
      </figure>

      <dialog
        ref={dialogRef}
        className={`article-lightbox${image.size === 'compact' ? ' article-lightbox-compact' : ''}`}
        aria-labelledby={titleId}
        aria-describedby={image.caption ? captionId : undefined}
        onCancel={event => { event.preventDefault(); setOpen(false); }}
        onClose={() => { if (!dialogRef.current?.open) setOpen(false); }}
        onPointerDown={event => { backdropPress.current = event.target === event.currentTarget; }}
        onClick={event => { if (backdropPress.current && event.target === event.currentTarget) setOpen(false); }}
      >
        <div className="article-lightbox-panel">
          <div className="article-lightbox-toolbar">
            <h2 id={titleId}>{t('A closer look', '放大查看')}</h2>
            <div className="article-lightbox-actions">
              <button type="button" className="article-lightbox-zoom" aria-pressed={zoomed} onClick={toggleZoom}>
                {zoomed ? <Minimize2 size={18} aria-hidden="true" /> : <Maximize2 size={18} aria-hidden="true" />}
                <span>{zoomed ? t('Fit to screen', '适应屏幕') : t('Original size', '原始尺寸')}</span>
              </button>
              <button type="button" ref={closeRef} className="article-lightbox-close" aria-label={t('Close image', '关闭图片')} onClick={() => setOpen(false)}><X size={22} aria-hidden="true" /></button>
            </div>
          </div>
          <div
            ref={stageRef}
            className={`article-lightbox-stage${zoomed ? ' is-zoomed' : ''}`}
            style={{ aspectRatio: `${image.width} / ${image.height}` }}
            tabIndex={zoomed ? 0 : undefined}
            role={zoomed ? 'region' : undefined}
            aria-label={zoomed ? t('Full-size image. Scroll to explore.', '原始尺寸图片，可滚动查看。') : undefined}
          >
            {open ? <img src={image.src} alt={image.alt[lang]} width={image.width} height={image.height} decoding="async" /> : null}
          </div>
          {image.caption ? <p className="article-lightbox-caption" id={captionId}>{image.caption[lang]}</p> : null}
        </div>
      </dialog>
    </>
  );
}
