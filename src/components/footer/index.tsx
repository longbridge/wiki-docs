import React from "react";
import { useDefaultLocale } from "@site/src/utils";

const LinksMap = [
  {
    kindName: {
      "zh-CN": "社区资讯",
      "zh-HK": "社區資訊",
      en: "Community",
    },
    links: [
      {
        text: {
          "zh-CN": "社群",
          "zh-HK": "社群",
          en: "Community",
        },
        href: "https://longportapp.com",
      },
      {
        text: {
          "zh-CN": "资讯",
          "zh-HK": "資訊",
          en: "News",
        },
        href: "https://longportapp.com/news",
      },
      {
        text: {
          "zh-CN": "海豚投研",
          "zh-HK": "海豚投研",
          en: "Dolphin",
        },
        href: "https://longportapp.com/news/dolphin",
      },
      {
        text: {
          "zh-CN": "每日必读",
          "zh-HK": "每日必讀",
          en: "Daily Report",
        },
        href: "https://longportapp.com/news/node/daily",
      },
    ],
  },
  {
    kindName: {
      "zh-CN": "市场",
      "zh-HK": "市场",
      en: "Market",
    },
    links: [
      {
        text: {
          "zh-CN": "市场",
          "zh-HK": "市场",
          en: "Market",
        },
        href: "https://longportapp.com/markets",
      },
      {
        text: {
          "zh-CN": "选股器",
          "zh-HK": "选股器",
          en: "Screener",
        },
        href: "https://longportapp.com/screener",
      },
    ],
  },
  {
    kindName: {
      "zh-CN": "下载",
      "zh-HK": "下载",
      en: "Download",
    },
    links: [
      {
        text: {
          "zh-CN": "下载",
          "zh-HK": "下载",
          en: "Download",
        },
        href: "https://longportapp.com/download",
      },
      {
        text: {
          "zh-CN": "HK 下载",
          "zh-HK": "HK 下载",
          en: "HK Download",
        },
        href: "https://longbridge.com/hk/download",
      },
      {
        text: {
          "zh-CN": "SG 下载",
          "zh-HK": "SG 下载",
          en: "SG Download",
        },
        href: "https://longbridge.com/sg/download",
      },
    ],
  },
  {
    kindName: {
      "zh-CN": "PortAI",
      "zh-HK": "PortAI",
      en: "PortAI",
    },
    links: [
      {
        text: {
          "zh-CN": "PortAI",
          "zh-HK": "PortAI",
          en: "PortAI",
        },
        href: "https://longportapp.com/portai",
      },
      {
        text: {
          "zh-CN": "LongPort AI",
          "zh-HK": "LongPort AI",
          en: "LongPort AI",
        },
        href: "https://longport.ai",
      },
    ],
  },
  {
    kindName: {
      "zh-CN": "开发",
      "zh-HK": "开发",
      en: "Developer",
    },
    links: [
      {
        text: {
          "zh-CN": "开发者平台",
          "zh-HK": "开发者平台",
          en: "Developer",
        },
        href: "https://open.longportapp.com",
      },
    ],
  },
];

const getBasePath = () => {
  if (typeof window === "undefined") {
    return "";
  }
  const path = window.location.pathname.split("/learn/");
  return `/learn/${path[1]}`;
};
const Footer: React.FC = () => {
  const locale = useDefaultLocale() || "en";
  console.log(window.location);
  let basePath = getBasePath();

  const renderLinksMap = [...LinksMap];
  if (basePath) {
    renderLinksMap.push({
      kindName: {
        "zh-CN": "Wiki",
        "zh-HK": "Wiki",
        en: "Wiki",
      },
      links: [
        {
          text: {
            "zh-CN": "简体中文",
            "zh-HK": "简体中文",
            en: "简体中文",
          },
          href: `/zh-CN${basePath}`,
        },
        {
          text: {
            "zh-CN": "繁體中文",
            "zh-HK": "繁體中文",
            en: "繁體中文",
          },
          href: `/zh-HK${basePath}`,
        },
        {
          text: {
            "zh-CN": "English",
            "zh-HK": "English",
            en: "English",
          },
          href: `/en${basePath}`,
        },
      ],
    });
  }

  return (
    <div className="footer-link mt-32 bg-[#fff] relative ">
      <div className="divider bg-[var(--ifm-color-gray-300)] h-[1px] absolute left-[-9999px] right-[-9999px]"></div>
      <div className="flex flex-col md:flex-row md:space-x-8 md:justify-between md:space-y-0 space-y-5 pt-8">
        {renderLinksMap.map((kind, i) => {
          return (
            <div key={i} className="flex flex-col space-y-4">
              <h4 className="text-sm text-[#333] mb-0">
                {kind.kindName[locale]}
              </h4>
              <ul className="list-none p-0">
                {kind.links.map((link, j) => {
                  return (
                    <li key={j}>
                      <a
                        href={link.href}
                        className="text-xs text-[#333] hover:text-[#000]"
                        target="_blank"
                      >
                        {link.text[locale]}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
