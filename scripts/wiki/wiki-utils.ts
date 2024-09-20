import dayjs from "dayjs";
import { IWiki } from "../../types.d";

/**
 * 删除所有 HTML 标签
 * @param HTML html 字符串
 * @returns 纯字符串
 */
const removeHtmlTag = (html = "") => html.replace(/(<([^>]+)>)/gi, "");

export class WikiUtils {
  private wiki: IWiki;
  private locale: string;

  constructor(wiki: IWiki, locale: string) {
    this.wiki = wiki;
    this.locale = locale;
    return this;
  }

  get body() {
    return this.wiki.body_locales[this.locale] || "";
  }

  get title() {
    return this.wiki.name_locales[this.locale] || "";
  }

  get en_title() {
    return this.wiki.name_locales["en"] || "";
  }

  get description() {
    return this.wiki.description_locales[this.locale] || "";
  }

  get liteDesc() {
    return removeHtmlTag(this.description).slice(0, 120);
  }

  get contentUpdatedAt() {
    return dayjs(this.wiki.content_updated_at * 1000).format(
      "YYYY-MM-DD HH:mm:ss"
    );
  }

  get pageSlug() {
    if (this.locale === "en") {
      return `/${this.locale}/learn/${this.wiki.slug}`;
    } else {
      return `/learn/${this.wiki.slug}`;
    }
  }

  get wikiAlias() {
    return this.wiki.alias || [];
  }
  // convert style="..." to style={...}
  static convertHTMLStyleToJSXStyle(htmlString) {
    return htmlString.replace(/style="([^"]*)"/g, (match, styleString) => {
      const styleObject = styleString
        .split(";")
        .filter(Boolean)
        .reduce((acc, style) => {
          const [key, value] = style.split(":").map((s) => s.trim());
          if (key && value) {
            // Convert kebab-case to camelCase
            const camelCaseKey = key.replace(/-([a-z])/g, (g) =>
              g[1].toUpperCase()
            );
            acc[camelCaseKey] = value;
          }
          return acc;
        }, {});

      const styleJSX = JSON.stringify(styleObject).replace(
        /"([^"]+)":/g,
        "$1:"
      );
      return `style={${styleJSX}}`;
    });
  }

  static toPage(wiki: IWiki, locale: string) {
    return new WikiUtils(wiki, locale).toPage();
  }

  static normalizeBRHTMLDOM(string) {
    return string.replace(/<br>/g, "<br/>");
  }
  static normalizeHTMLDOM(string) {
    // 正则表达式匹配未闭合的 HTML 标签
    const unclosedTagRegex = /<([a-zA-Z]+)([^>]*)>/g;

    // 要处理的 Markdown 文件路径

    // 处理文件内容
    function processFileContent(content) {
      return content.replace(unclosedTagRegex, (match, tagName, attributes) => {
        // 检查是否是自闭合标签
        const selfClosingTags = ["img", "br", "hr", "input", "link", "meta"];
        if (selfClosingTags.includes(tagName.toLowerCase())) {
          // 如果标签已经是自闭合的，就跳过
          if (attributes.trim().endsWith("/")) {
            return match;
          }
          return `<${tagName} ${attributes.trim()} />`;
        }
        return match;
      });
    }
    return processFileContent(string);
  }

  static normalizeMDXContent(content: string, skipJsxStyle?: boolean): string {
    let newContent = content;
    if (!skipJsxStyle) {
      // AI 生成的内容样式不需要被转为 jsx
      newContent = WikiUtils.convertHTMLStyleToJSXStyle(newContent);
    }
    newContent = WikiUtils.normalizeBRHTMLDOM(newContent);
    return newContent;
  }

  toPage() {
    return {
      title: this.title,
      en_title: this.en_title,
      body: this.body,
      pageSlug: this.pageSlug,
      description: this.description,
      jsxDesc: WikiUtils.normalizeHTMLDOM(
        WikiUtils.normalizeMDXContent(this.description)
      ),
      jsxBody: WikiUtils.normalizeMDXContent(this.body, true),
      liteDesc: this.liteDesc,
      contentUpdatedAt: this.contentUpdatedAt,
      wikiAlias: JSON.stringify(this.wikiAlias),
      ...this.wiki,
    };
  }
}
