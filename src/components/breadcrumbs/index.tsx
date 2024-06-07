import React, { FC } from "react";
import { useBasenameLocale } from "@site/src/utils";

interface IBreadcrumbsProps {
  current: string;
}

export const Breadcrumbs: FC<IBreadcrumbsProps> = props => {
  const { current } = props;
  const locale = useBasenameLocale();

  return <nav className="mb-6 theme-doc-breadcrumbs">
    <ul className="breadcrumbs flex items-center">
      <li className="breadcrumbs__item ">
        <a aria-label="Home page" className="breadcrumbs__link w-[18px] h-6"
          href={`/${locale}/learn`}>
          <svg viewBox="0 0 24 24" className="breadcrumbHomeIcon_YNFT">
            <path
              d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"
              fill="currentColor"></path>
          </svg>
        </a>
      </li>
      <li className="breadcrumbs__item -mt-1">
        <span className="breadcrumbs__link">{current}</span>
      </li>
    </ul>
  </nav>;
};
