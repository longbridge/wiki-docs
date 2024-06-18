import { fetchLastUpdatedValue } from "./utils";
import { fetchWikiList } from "./fetch-wikis";
import { WikiUtils } from "./wiki-utils";
import { uniqBy } from "lodash";
const _template = require("lodash.template");

const fs = require("fs");
const path = require("path");
import { IWiki, LocaleEnums } from "../../types.d";
import { post } from "../../src/api";


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
    if (locale === "en") {
      docDir = `${projectRoot}/docs/learn`;
    } else {
      docDir = `${projectRoot}/i18n/${locale}/docusaurus-plugin-content-docs/current/learn`;
    }
    const docPath = `${docDir}/${wiki.slug}.mdx`;
    const dirname = path.dirname(docPath);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }
    if (fs.existsSync(docPath)) {
      console.log(`==> update doc: ${docPath}`);
    } else {
      console.log(`==> create doc: ${docPath}`);
    }
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

// wiki memos
let wikis = [];

export async function updateLatestWiki(limit = 100) {
  const last_updated_at = await fetchLastUpdatedValue();
  await fetchWikiList(wikis, limit, null, last_updated_at);
  console.log("--> found wikis:", wikis.length);
  wikis = uniqBy(wikis, "slug");
  console.log("--> after uniq wikis:", wikis.length);
  const theLatestWiki = wikis[0];
  if (theLatestWiki) {
    fetchLastUpdatedValue(theLatestWiki.content_updated_at);
  }

  wikis.forEach(async (rawWiki) => {
    const { slug } = rawWiki;
    try {
      await generateWikiMD(rawWiki);
    } catch (e) {
      console.error(`generate wiki: ${slug} error:`, JSON.stringify(e));
    }
  });
}

updateLatestWiki();
