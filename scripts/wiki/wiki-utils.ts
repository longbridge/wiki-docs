import { IWiki, } from "../../types.d";
import dayjs from "dayjs";

/**
 * 删除所有 HTML 标签
 * @param HTML html 字符串
 * @returns 纯字符串
 */
const removeHtmlTag = (html = '') => html.replace(/(<([^>]+)>)/gi, '')


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

  get description() {
    return this.wiki.description_locales[this.locale] || "";
  }

  get liteDesc() {
    return removeHtmlTag(this.description).slice(0, 120);
  }

  get contentUpdatedAt() {
    return dayjs(this.wiki.content_updated_at * 1000).format("YYYY-MM-DD HH:mm:ss");
  }

  get pageSlug() {
    return `/${this.locale}/learn/wiki/${this.wiki.slug}`;
  }

  static toPage(wiki: IWiki, locale: string) {
    return new WikiUtils(wiki, locale).toPage();
  }

  toPage() {
    return {
      title: this.title,
      body: this.body,
      pageSlug: this.pageSlug,
      description: this.description,
      liteDesc: this.liteDesc,
      contentUpdatedAt: this.contentUpdatedAt,
      ...this.wiki
    };
  }
}
