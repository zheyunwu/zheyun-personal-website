'use client';

import type { PostTable } from '../content/posts';
import { useLanguage } from './language';

export default function ArticleTable({ table, id }: { table: PostTable; id: string }) {
  const { lang, t } = useLanguage();

  return (
    <div className="article-table-block" id={id}>
      <h3 className="article-table-caption" id={`${id}-caption`}>{table.caption[lang]}</h3>
      <p className="article-table-hint" id={`${id}-hint`}>{t('Swipe or scroll sideways to see all columns.', '左右滑动表格可查看全部列。')}</p>
      <div className="article-table-scroll" role="region" tabIndex={0} aria-labelledby={`${id}-caption`} aria-describedby={`${id}-hint`}>
        <table className="article-table">
          <caption className="sr-only">{table.caption[lang]}</caption>
          <thead>
            <tr>{table.columns.map((column, index) => <th scope="col" key={index}>{column[lang]}</th>)}</tr>
          </thead>
          <tbody>
            {table.rows.map(row => (
              <tr key={row.id}>
                {row.cells.map((cell, index) => {
                  const Cell = index === 0 ? 'th' : 'td';
                  return (
                    <Cell scope={index === 0 ? 'row' : undefined} key={index}>
                      <span className="article-table-value">{cell.value[lang]}</span>
                      {cell.detail ? <span className="article-table-detail">{cell.detail[lang]}</span> : null}
                      {cell.date ? <span className="article-table-date">{cell.date[lang]}</span> : null}
                    </Cell>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note ? <p className="article-table-note">{table.note[lang]}</p> : null}
      {table.rows.some(row => row.sources?.length) ? (
        <details className="article-table-sources">
          <summary>{t('Sources for each platform', '各平台数据来源')}</summary>
          <ul>{table.rows.filter(row => row.sources?.length).map(row => (
            <li key={row.id}>
              <span>{row.cells[0].value[lang]}</span>
              <div>{row.sources?.map(source => <a href={source.href} key={source.href} target="_blank" rel="noopener noreferrer">{source.label[lang]}<span className="sr-only">{t(' (opens in a new tab)', '（在新标签页打开）')}</span></a>)}</div>
            </li>
          ))}</ul>
        </details>
      ) : null}
    </div>
  );
}
