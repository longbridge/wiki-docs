import React, { FC, useCallback, useEffect, useState } from "react";
import { post } from "@site/src/api";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

interface IArticleMetaProps {
  updatedAt: string | null;
  id: number;
}

export const ArticleMeta: FC<IArticleMetaProps> = (props) => {
  const { updatedAt, id } = props;
  const [viewCount, setViewCount] = useState(0);

  const {
    siteConfig: { customFields: { apiProxyUrl } }
  } = useDocusaurusContext();

  useEffect(() => {
    if (!apiProxyUrl || !id) return;
    // https://api.devops.longbridge-inc.com/independent/home/api-studio/inside/apis/api/233/detail/5836?spaceKey=LMsAkPRfb875391c87089bec29fd47a8c28481845f4ec47
    post(`${apiProxyUrl}/social/wiki/detail`, { id }).then((resp) => {
      const { data } = resp;
      if (data?.pv) {
        setViewCount(data.pv);
      }
    });
  }, [apiProxyUrl, id]);

  const copyLinkID = `copy_url_${id}`;
  const onClickCopySection = useCallback(() => {

  }, []);

  useEffect(() => {
    // @ts-ignore
    const clipboard = new ClipboardJS("#copy_trigger");
    clipboard.on("success", function(e) {
      e.clearSelection();
    });

    clipboard.on("error", function(e) {
      console.error("Action:", e.action);
      console.error("Trigger:", e.trigger);
    });
  }, []);

  return (
    <div className={"article-meta flex items-center justify-between text-gray-100 text-sm"}>
      <div className="info">
        {!!viewCount &&
          <span className={"view-count"}>{viewCount} 人学过 .</span>
        }
        <span className={"updated-at"}>更新于 {updatedAt}</span>
      </div>
      <div className="actions">
        <div className="copy-section" id={"copy_trigger"} onClick={onClickCopySection} data-clipboard-text={window.location.href}>
          <div className="copy-link" />
        </div>
      </div>
    </div>
  );
};
