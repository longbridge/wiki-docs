import { Plugin } from "@docusaurus/types";
import axios from "axios";
import { fetchLastUpdatedValue } from "./utils";
import { IWiki } from "../../types.d";
import { generateWikiMD } from "./template";

const apiBaseURL = process.env.API_BASE_URL;
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
        const {slug} = rawWiki;
        try {
          await generateWikiMD(rawWiki);
        } catch (e) {
          console.error(`generate wiki: ${slug} error:`, JSON.stringify(e));
        }
      });
    }
  };
}
