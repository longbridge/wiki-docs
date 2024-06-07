import React, { FC } from "react";

interface IArticleMetaProps {
  viewCount: string | number | null;
  updatedAt: string | null;
}

export const ArticleMeta: FC<IArticleMetaProps> = (props) => {
  const { viewCount, updatedAt } = props;
  return (
    <div className={"article-meta flex items-center justify-between text-gray-100 text-sm"}>
      <div className="info">
        <span className={"view-count"}>{viewCount} 人学过</span> .{" "}
        <span className={"updated-at"}>更新于 {updatedAt}</span>
      </div>
      <div className="actions">
        <div className="copy-link">
          {/*<a href={onCopyLinkClick}>复制链接</a>*/}
        </div>
      </div>
    </div>
  );
};
