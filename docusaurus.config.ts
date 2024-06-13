import { genSSRTemplate } from "./ssr-template";

const { lightTheme } = require("./config/theme");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import process from "node:process";
import { baseURLPrefix } from "./src/constant";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const openapiDomain = "https://open.longportapp.com";
const communityDomain = "https://longportapp.com";
const i18n = require("./i18n/config");


const isDev = process.env.NODE_ENV !== "production";
const proxy = process.env.PROXY || "release";
const ossEnv = isDev ? "/" : proxy;
const targetPortalPath = proxy === "canary" ? "https://m.longbridge.xyz" : "https://m.lbkrs.com";
const localAPIProxyPath = "/dev-proxy";
const apiProxyUrl = `${isDev ? localAPIProxyPath : targetPortalPath}/api/forward`;

const config: Config = {
  title: "LongPort wiki",
  url: "https://longportapp.com",
  baseUrl: baseURLPrefix,
  organizationName: "longportapp",
  projectName: "wiki-docs",
  baseUrlIssueBanner: false,
  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "ignore",
  ssrTemplate: genSSRTemplate(ossEnv),
  trailingSlash: false, // https://docusaurus.io/docs/api/docusaurus-config#trailingSlash
  favicon: "https://pub.lbkrs.com/static/offline/202211/qohHsXzN9qtQ23ox/longport_favicon.png",
  customFields: {
    isDev,
    apiProxyUrl
  },
  headTags: [
    {
      tagName: "script",
      attributes: {
        src: "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.min.js"
      }
    }
  ],
  i18n,
  themes: ["@docusaurus/theme-mermaid"],
  plugins: [
    "docusaurus-plugin-sass",
    function docusaurusTailwindCss() {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss: function configurePostCss(postCssOptions) {
          postCssOptions.plugins.push(require("tailwindcss"));
          postCssOptions.plugins.push(require("autoprefixer"));
          return postCssOptions;
        }
      };
    },
    function docsWebpackConfig(context, options) {

      return {
        name: "longportapp-wiki-webpack-plugin",
        configureWebpack(config, isServer, utils, content) {
          if (isServer) return {};
          const docsAssetPrefix = "longportapp-learn-wiki";
          return {
            devServer: {
              open: "/en/learn",
              proxy: [{
                context: [localAPIProxyPath],
                target: targetPortalPath,
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                  [`^${localAPIProxyPath}`]: ""
                }
              }]
            },
            output: {
              filename: `assets/js/${docsAssetPrefix}_[name].[contenthash:8].js`,
              chunkFilename: `assets/js/${docsAssetPrefix}_[name].[contenthash:8].js`
            },
            plugins: [
              new MiniCssExtractPlugin({
                filename: `assets/css/${docsAssetPrefix}_[name].[contenthash:8].css`,
                chunkFilename: `assets/css/${docsAssetPrefix}_[name].[contenthash:8].css`,
                ignoreOrder: true
              })
            ]
          };
        }
      };
    }
  ],


  presets: [
    [
      "classic",
      {
        blog: false,
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/"
        },
        theme: {
          customCss: "./src/css/custom.scss"
        },
        sitemap: {
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return await items.map((item) => {
              return item.url = item.url
                .replace("zh-CN/zh-CN", "zh-CN")
                .replace("en/en", "en")
                .replace("zh-HK/zh-HK", "zh-HK")
            });
          }
        }

      } satisfies Preset.Options
    ]
  ],

  themeConfig:
  /** @type {import("@docusaurus/preset-classic").ThemeConfig} */
    {
      metadata: [
        {
          name: "og:image",
          content: "https://pub.lbkrs.com/files/202211/sJswdGqSX1xDqrES/lonport-seo-img.png"
        },
        {
          name: "twitter:image",
          content: "https://pub.lbkrs.com/files/202211/sJswdGqSX1xDqrES/lonport-seo-img.png"
        }
      ],
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
        respectPrefersColorScheme: false
      },
      navbar: {
        title: "",
        logo: {
          alt: "LongPort",
          href: openapiDomain,
          target: "_self",
          src: "https://pub.lbkrs.com/files/202211/BoUn1BSQuAHDX4GY/logo-with-title.svg"
        },
        items: [
          {
            to: openapiDomain,
            position: "left",
            target: "_self",
            label: "开发者认证",
            activeBaseRegex: "^/$"
          },
          {
            to: communityDomain,
            label: "社区",
            target: "_self",
            position: "left"
          },
          {
            to: `${communityDomain}/markets`,
            target: "_self",
            label: "市场",
            position: "left"
          },
          {
            type: "search",
            position: "right",
            className: "search-container"
          },
          {
            type: "localeDropdown",
            position: "right"
          },
          {
            type: "html",
            position: "right",
            value: `
            <a href="https://github.com/longportapp/openapi-sdk" target="_blank" rel="noopener noreferrer" style="display:inline-block;width:26px;height:26px" title="LongPort SDK OpenSource">
              <svg height="26" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="26" data-view-component="true" class="octicon octicon-mark-github v-align-middle color-fg-default">
                  <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
              </svg>
            </a>
          `,
            className: "github-container"
          }
        ]
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkCodeTheme
      }
    } satisfies Preset.ThemeConfig
};

export default config;
