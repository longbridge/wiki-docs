import React, { FC } from "react";
import { WikiUtils } from "@site/scripts/wiki/wiki-utils";
import { LocaleEnums } from "@site/types";
import { useBasenameLocale } from "@site/src/utils";

interface IWikiItemProps {
  wiki: any;
}

export const WikiItem: FC<IWikiItemProps> = (props) => {
  const { wiki: rawWiki } = props;
  const locale = useBasenameLocale();
  const wiki = (new WikiUtils(rawWiki, locale)).toPage();
  return (
    <div className={`wiki-item ${wiki.id}-wiki`}>
      <a href={`${wiki.pageSlug}`}
        className="block max-w-sm p-6 bg-white border border-white-200 rounded-lg shadow hover:bg-white-100">
        <h5
          className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{wiki.title}</h5>
        <p className="font-normal text-gray-700"
          dangerouslySetInnerHTML={{ __html: wiki.liteDesc }}></p>
      </a>
    </div>
  );
};
