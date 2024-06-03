import { Plugin } from "@docusaurus/types";
import axios from "axios";
import { fetchLastUpdatedValue } from "./last-update-cache";
import { baseURLPrefix } from "./../constant";
import { IWiki, LocaleEnums } from "../types.d";
import { WikiUtils } from "../utils";

const apiBaseURL = process.env.API_BASE_URL
const wikisMemo = [];

async function fetchWikiList(updated_at = null, limited = 50) {
  const resp = await axios.get(`${apiBaseURL}/api/forward/social/wiki/lists`, {
    params: {
      updated_at,
      limited
    }
  });
  const {
    data: { list: wikis }
  } = resp.data || { data: { list: [] } };
  wikisMemo.push(...wikis);
  if (!!wikis.length) {
    const lastWiki = wikis.pop();
    fetchLastUpdatedValue(lastWiki.content_updated_at);
    await fetchWikiList(lastWiki.content_updated_at, limited);
  }

  return wikisMemo;
}

const supportLocales = Object.keys(LocaleEnums);
export default function(context, options): Plugin {
  return {
    name: "docusaurus-wiki-api-plugin",
    async loadContent() {
      const content_updated_at = await fetchLastUpdatedValue();
      return fetchWikiList(content_updated_at);
    },
    async contentLoaded({ content, actions }) {
      const { createData, addRoute } = actions;
      (content as any).forEach(async (rawWiki: IWiki) => {
        const { slug } = rawWiki;
        const localePromises = supportLocales.map(async (locale: string) => {
            const wiki = new WikiUtils(rawWiki, locale);
            const routePath = `${baseURLPrefix}/${locale}/${slug}`;
            const wikiPageKey = `wiki/${locale}/${slug}`;

            const wikiContent = await createData(
              `${wikiPageKey}.json`,
              JSON.stringify(wiki.toPage())
            );
            console.log(`--> generate  ${locale} wiki page: ${wiki.title} with path: ${routePath}`, wikiContent);
            await addRoute({
              path: routePath,
              component: "@site/src/components/wiki-content.tsx",
              modules: {
                data: wikiContent
              },
              exact: true
            });
          }
        );
        try {
          await Promise.all(localePromises);
        } catch (e) {
          console.error(`generate wiki: ${slug} error:`, JSON.stringify(e));
        }
      });
    }
  };
}
