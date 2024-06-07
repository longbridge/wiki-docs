import React, { FC } from "react";

import wikis from "@site/tmp/index.config.json";
import { useBasenameLocale } from "@site/src/utils";
import { WikiUtils } from "@site/scripts/wiki/wiki-utils";

export const WikiList: FC = () => {
  const locale = useBasenameLocale();
  return <ul
      className={"ps-0 wiki-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"}>
      {wikis.map((rawWiki: any) => {
        const wiki = WikiUtils.toPage(rawWiki, locale);
        return <li key={wiki.id}
          className="relative flex flex-col mt-6 text-gray-700 bg-slate-50 shadow-md bg-clip-border rounded-xl w-full md:w-80">
          <article className="p-4">
            <h5
              className="block mb-2 font-sans text-xl  font-semibold leading-snug tracking-normal text-blue-gray-900">
              <a href={`/${locale}/learn/wiki/${wiki.slug}`}>{wiki.title}</a>
            </h5>
            <p
              className="font-light leading-relaxed line-clamp-3">
              {wiki.liteDesc}
            </p>
          </article>
        </li>;
      })}
    </ul>
};
