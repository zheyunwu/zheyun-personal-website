'use client';

import type { CSSProperties } from 'react';
import { useLanguage } from './language';
import locations from '@/content/life-locations.json';
import geometry from '@/content/life-map-points.json';
import './life-map.css';

const asset = (path: string) => (process.env.NEXT_PUBLIC_BASE_PATH || '') + path;

export function LifeMap() {
  const { lang, t } = useLanguage();
  return (
    <figure className="life-map">
      <div className="life-map-artwork" role="img" aria-label={t(
        'A globe centred on Europe and Asia, marking five important places in my life: Quanzhou, China; Tamsui, New Taipei; Helsinki, Finland; Stockholm, Sweden; and Berlin, Germany.',
        '以欧亚大陆为中心的球面地图，标记我生命中五个重要地点：中国泉州、新北淡水、芬兰赫尔辛基、瑞典斯德哥尔摩、德国柏林。',
      )}>
        <svg viewBox={`0 0 ${geometry.width} ${geometry.height}`} aria-hidden="true" focusable="false">
          <image href={asset('/images/life-map-base.svg')} width={geometry.width} height={geometry.height} />
          {locations.map(location => {
            const point = geometry.points.find(item => item.id === location.id)!.point;
            return <g key={location.id}>
              <polyline className="life-map-leader" points={[point, ...location.leader].map(pair => pair.join(',')).join(' ')} />
              <circle className="life-map-pin-halo" cx={point[0]} cy={point[1]} r={location.id === 'quanzhou' || location.id === 'tamsui' ? 4.4 : 5.5} />
              <circle className="life-map-dot" cx={point[0]} cy={point[1]} r={location.id === 'quanzhou' || location.id === 'tamsui' ? 2.5 : 3.2} />
            </g>;
          })}
        </svg>
        <div aria-hidden="true">{locations.map(location => <div
          key={location.id}
          className={`life-map-label life-map-label--${location.align}`}
          style={{ '--label-x': `${location.label[0] / geometry.width * 100}%`, '--label-y': `${location.label[1] / geometry.height * 100}%` } as CSSProperties}
        ><span className="life-map-city">{location.name[lang]}</span><span className="life-map-country">{location.context[lang]}</span></div>)}</div>
      </div>
      <figcaption>{t('Places in my life', '对我重要的地方')}</figcaption>
    </figure>
  );
}
