import { IWiki, LocaleEnums } from "@site/src/types";

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

  toPage() {
    return {
      title: this.title,
      body: this.body,
      description: this.description,
      ...this.wiki
    };
  }
}
