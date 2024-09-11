import React, { FC, useCallback, useEffect, useState } from "react";
import { post, get } from "@site/src/api";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { translate } from "@docusaurus/Translate";
import { useDefaultLocale } from "@site/src/utils";

interface IArticleMetaProps {
  updatedAt: string | null;
  id: number;
}

const LocalesMap = {
  peopleLearned: {
    "zh-CN": "人学过",
    "zh-HK": "人學過",
    en: "People learned",
  },
  aiGen: {
    "zh-CN": "AI 解读",
    "zh-HK": "AI 解读",
    en: "AI analysis",
  },
  aiGenUnderReview: {
    "zh-CN": "审核中，通过后可查看新内容",
    "zh-HK": "審核中，通過後可查看新內容",
    en: "Under review, content will be available after approval.",
  },
};

export const ArticleMeta: FC<IArticleMetaProps> = (props) => {
  const { updatedAt, id } = props;
  const [viewCount, setViewCount] = useState(0);
  const [AIContent, setAIContent] = useState("");
  const [aiGen, setAIGen] = useState(false);
  const [aiGenLoading, setAIGenLoading] = useState(false);
  const locale = useDefaultLocale() || "en";
  // translate({
  //   id: "theme.docs.paginator.navAriaLabel",
  //   message: "Docs pages",
  //   description: "The ARIA label for the docs pagination"
  // });
  const {
    siteConfig: {
      customFields: { apiProxyUrl },
    },
  } = useDocusaurusContext();

  useEffect(() => {
    if (!apiProxyUrl || !id) return;
    // https://api.devops.longbridge-inc.com/independent/home/api-studio/inside/apis/api/233/detail/5836?spaceKey=LMsAkPRfb875391c87089bec29fd47a8c28481845f4ec47
    post(`${apiProxyUrl}/social/wiki/detail`, { id }).then((resp) => {
      const { data } = resp;
      if (data?.pv) {
        setViewCount(data.pv);
      }
      if (data?.body) {
        setAIContent(data.body);
      }
    });
  }, [apiProxyUrl, id]);

  const postAI = () => {
    setAIGenLoading(true);
    setAIGen(true);
    get(`${apiProxyUrl}/v1/social/wiki/content`, { id })
      .then((resp) => {
        const { data } = resp;
      })
      .finally(() => {
        setAIGenLoading(false);
      });
  };

  const onClickCopySection = useCallback(() => {}, []);

  useEffect(() => {
    // @ts-ignore
    const clipboard = new ClipboardJS("#copy_trigger");
    clipboard.on("success", function (e) {
      e.clearSelection();
    });

    clipboard.on("error", function (e) {
      console.error("Action:", e.action);
      console.error("Trigger:", e.trigger);
    });
  }, []);

  return (
    <div className={"article-meta flex items-center justify-between text-sm"}>
      <div className="info">
        {!!viewCount && (
          <span className={"view-count"}>
            {viewCount} {LocalesMap.peopleLearned[locale]} .
          </span>
        )}
        <span className={"updated-at"}>
          {" "}
          {translate(
            {
              id: "article.meta.updated_at",
            },
            { datetime: updatedAt }
          )}
        </span>
      </div>
      <div className="actions">
        {/*<div className="copy-section" id={"copy_trigger"} onClick={onClickCopySection}>*/}
        {/*  <div className="copy-link" />*/}
        {/*</div>*/}

        {/* 没有 AI 内容并且没点击过生成 */}
        {/* {!AIContent && aiGen && (
          <div className="text-xs">{LocalesMap.aiGenUnderReview[locale]}</div>
        )}
        {!AIContent && !aiGen && (
          <div className="relative group">
            <span className="px-2 py-1 hover:bg-gray-200 rounded cursor-pointer flex items-center hover:text-white justify-center">
              ···
            </span>
            <div className="absolute z-[-1] opacity-0 group-hover:z-50 group-hover:opacity-100 whitespace-nowrap">
              <button
                className="outline-none bg-white px-2 py-1 rounded border-[var(--ifm-color-gray-300)] border-solid border hover:bg-opacity-80 cursor-pointer"
                onClick={postAI}
              >
                {LocalesMap.aiGen[locale]}
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};
