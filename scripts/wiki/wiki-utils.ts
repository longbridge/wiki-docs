import dayjs from 'dayjs';
import { IWiki } from '../../types.d';

/**
 * 删除所有 HTML 标签
 * @param HTML html 字符串
 * @returns 纯字符串
 */
const removeHtmlTag = (html = '') => html.replace(/(<([^>]+)>)/gi, '');

export class WikiUtils {
  private wiki: IWiki;
  private locale: string;

  constructor(wiki: IWiki, locale: string) {
    this.wiki = wiki;
    this.locale = locale;
    return this;
  }

  get body() {
    return this.wiki.body_locales[this.locale] || '';
  }

  get title() {
    return this.wiki.name_locales[this.locale] || '';
  }

  get en_title() {
    return this.wiki.name_locales['en'] || '';
  }

  get description() {
    return this.wiki.description_locales[this.locale] || '';
  }

  get liteDesc() {
    return removeHtmlTag(this.description).slice(0, 120);
  }

  get contentUpdatedAt() {
    return dayjs(this.wiki.content_updated_at * 1000).format(
      'YYYY-MM-DD HH:mm:ss'
    );
  }

  get pageSlug() {
    if (this.locale === 'en') {
      return `/${this.locale}/learn/wiki/${this.wiki.slug}`;
    } else {
      return `/learn/wiki/${this.wiki.slug}`;
    }
  }

  // convert style="..." to style={...}
  static convertHTMLStyleToJSXStyle(htmlString) {
    return htmlString.replace(/style="([^"]*)"/g, (match, styleString) => {
      const styleObject = styleString
        .split(';')
        .filter(Boolean)
        .reduce((acc, style) => {
          const [key, value] = style.split(':').map((s) => s.trim());
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
        '$1:'
      );
      return `style={${styleJSX}}`;
    });
  }

  static toPage(wiki: IWiki, locale: string) {
    return new WikiUtils(wiki, locale).toPage();
  }

  static normalizeBRHTMLDOM(string) {
    return string.replace(/<br>/g, '<br/>');
  }

  static normalizeMDXContent(content: string) {
    let newContent = content;
    newContent = WikiUtils.convertHTMLStyleToJSXStyle(newContent);
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
      jsxDesc: WikiUtils.normalizeMDXContent(this.description),
      jsxBody: WikiUtils.normalizeMDXContent(this.body),
      liteDesc: this.liteDesc,
      contentUpdatedAt: this.contentUpdatedAt,
      ...this.wiki,
    };
  }
}
