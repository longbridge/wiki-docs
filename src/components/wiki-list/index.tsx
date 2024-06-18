import { FC } from 'react';

import { WikiUtils } from '@site/scripts/wiki/wiki-utils';
import { useBasenameLocale } from '@site/src/utils';
import wikis from '@site/tmp/index.config.json';
import './style.scss';

export const WikiList: FC = () => {
  const locale = useBasenameLocale();
  return (
    <ul
      className={
        'ps-0 wiki-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'
      }
    >
      {wikis.map((rawWiki: any) => {
        const wiki = WikiUtils.toPage(rawWiki, locale);
        return (
          <li key={wiki.id} className="wiki-item">
            <article className="p-4">
              <h5 className="item-title">
                <a href={`/${locale}/learn/wiki/${wiki.slug}`}>{wiki.title}</a>
              </h5>
              <p className="item-desc">{wiki.liteDesc}</p>
            </article>
          </li>
        );
      })}
    </ul>
  );
};
