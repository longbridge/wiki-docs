import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { get } from "@site/src/api";
import React, { useEffect, useState } from "react";
import { useDefaultLocale } from "@site/src/utils";

interface AIContentProps {
  content?: string;
  id: number;
}
const LocalesMap = {
  aiGen: {
    "zh-CN": "以上内容是 AI 的进一步解读",
    "zh-HK": "以上內容是 AI 的進一步解讀",
    en: "The above content is a further interpretation by AI.",
  },
  disclaimer: {
    "zh-CN": "免责声明",
    "zh-HK": "免責聲明",
    en: "Disclaimer",
  },
};
export const AIContent: React.FC<AIContentProps> = ({ content, id }) => {
  const [AIContent, setAIContent] = useState(content);
  const locale = useDefaultLocale() || "en";

  const {
    siteConfig: {
      customFields: { apiProxyUrl },
    },
  } = useDocusaurusContext();

  useEffect(() => {
    if (!apiProxyUrl || !id || AIContent) return;

    get(`${apiProxyUrl}/v1/social/wiki/content`, { id }).then((resp) => {
      const { data } = resp;
      if (data?.content) {
        setAIContent(data.content);
      }
    });
  }, [apiProxyUrl, id]);

  if (!AIContent) return <></>;
  return (
    <div className="ai-content pt-8 rounded-lg">
      <div
        dangerouslySetInnerHTML={{ __html: AIContent }}
        className="border-solid border-t border-b-0 border-r-0 border-l-0 border-[var(--ifm-color-gray-300)] pt-5"
      ></div>

      <div className="flex items-center space-x-4 pt-3 mb-3 border-solid border-t border-b-0 border-r-0 border-l-0 border-[var(--ifm-color-gray-300)]">
        <img
          src="https://assets.lbctrl.com/uploads/831466be-e4f8-46a7-aa0b-efcda7a424ff/portai.png"
          alt="port-ai"
          className="w-7 h-7 rounded-full"
        />
        <span className="text-sm">{LocalesMap.aiGen[locale]}</span>
        <a
          href="https://support.longbridgewhale.com/topics/misc/portaidisclaimer"
          className="text-sm text-[#37a0ff]"
          target="_blank"
        >
          {LocalesMap.disclaimer[locale]}
        </a>
      </div>
    </div>
  );
};
