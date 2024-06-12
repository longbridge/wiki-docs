/*
 * 1. read template file from ./ template.md
 * 2. use Mustache to render template with wiki data
 * 3. use props wiki with IWiki type data to generate new wiki file location at /docs/locale/[wiki.slug].md
 * */

import { WikiUtils } from "./wiki-utils";

const _template = require("lodash.template");

const fs = require("fs");
const path = require("path");
import { IWiki, LocaleEnums } from "../../types.d";

function escapeHtml(str) {
  return !/[<>&"']/.test(str)
    ? str
    : str
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\"", "&quot;");
}

const projectRoot = path.resolve(__dirname, "../../");
const template = fs.readFileSync(
  path.resolve(__dirname, "./template.mdx"),
  "utf-8"
);
const supportLocales = Object.keys(LocaleEnums);

export async function generateWikiMD(wiki: IWiki) {
  const localesGenerate = supportLocales.map((locale) => {
    const wikiUtils = new WikiUtils(wiki, locale);

    let docDir = "";
    if (locale === "zh-CN") {
      docDir = `${projectRoot}/docs/learn/wiki`;
    } else {
      docDir = `${projectRoot}/i18n/${locale}/docusaurus-plugin-content-docs/current/learn/wiki`;
    }

    const docPath = `${docDir}/${wiki.slug}.mdx`;
    const dirname = path.dirname(docPath);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }
    console.log(`-> create doc: ${docPath}`);
    var compiled = _template(template);
    const docContent = compiled(wikiUtils.toPage());
    fs.writeFileSync(docPath, docContent);
  });

  try {
    await Promise.all(localesGenerate);
  } catch (e) {
    console.error(`--> generate wiki ${wiki.slug}  error:`, JSON.stringify(e));
  }
}
