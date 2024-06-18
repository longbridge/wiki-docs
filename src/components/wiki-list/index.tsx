import { FC } from 'react';

import featureConfig from '@site/featured-items.json';
import { WikiUtils } from '@site/scripts/wiki/wiki-utils';
import { useBasenameLocale } from "@site/src/utils";
import wikis from '@site/home-page.config.json';
import './style.scss';

const itemName = (item: any) =>
  item.name_locales['zh-CN'] || item.name_locales['en'];

const featuredItems = Array.from(featureConfig.items || []);
const featuredWikis = wikis.filter((item) =>
  featuredItems.includes(itemName(item))
);

featuredWikis.sort((a, b) => {
  return (
    featuredItems.indexOf(itemName(a)) - featuredItems.indexOf(itemName(b))
  );
});

export const WikiList: FC = () => {
  const locale = useBasenameLocale();

  return (
    <ul className="wiki-list">
      {featuredWikis.map((rawWiki: any) => {
        const wiki = WikiUtils.toPage(rawWiki, locale);
        return (
          <li key={wiki.id} className="wiki-item">
            <article className="p-4">
              <h5 className="item-title">
                <a href={`/${locale}/learn/${wiki.slug}`}>{wiki.title}</a>
              </h5>
              {locale !== 'en' && (
                <div className="item-sub-title">{wiki.en_title}</div>
              )}
              <p className="item-desc">{wiki.liteDesc}</p>
            </article>
          </li>
        );
      })}
    </ul>
  );
};
