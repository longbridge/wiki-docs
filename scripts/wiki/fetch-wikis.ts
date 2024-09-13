import axios from "axios";
import { IWiki } from "@site/types";
import dayjs from "dayjs";
import { withQuery } from "ufo";
import process from "node:process";

const apiBaseURL = process.env.API_BASE_URL;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let retryTimes = 0;

export async function fetchWikiList(memo: IWiki[], limit = 100, id = 0, last_update_at = 0) {
  console.log("--> fetch wikis from:", dayjs(last_update_at * 1000).format("YYYY-MM-DD HH:mm:ss"));
  const queriesShow = {
    id,
    last_update_at,
    limit
  };
  const queries = { ...queriesShow, token: process.env.API_SECRETS_TOKEN || "none" };
  const currentPath = withQuery("api/forward/social/wiki/lists", queries);
  const loggerPath = withQuery("api/forward/social/wiki/lists", queriesShow)
  const currentURL = `${apiBaseURL}/${currentPath}`;
  try {
    console.log("--> fetch url: ", loggerPath);
    const resp = await axios.get(currentURL);
    if (!resp.data) {
      if (retryTimes < 3) {
        retryTimes += 1;
        console.log(`[warning] found wikis length = 0 now delay 1000ms retry request ${loggerPath} times ${retryTimes}`);
        await delay(1000);
        await fetchWikiList(memo, limit, id, last_update_at);
      }
    } else {
      retryTimes = 0;
    }
    const {
      data: { list: wikis } = { list: [] }
    } = resp.data || { data: { list: [] } };

    // write temp response data to temp dirs
    // const tempFilePath =`/tmp/wikis/${[id||0, last_update_at||0].join("-")}.json`
    // console.log(`fetch wikis: ${wikis.length} generate temp file:`, tempFilePath)
    // fs.writeFileSync(tempFilePath, JSON.stringify(wikis, null, 2));

    memo.push(...wikis);

    if (wikis.length) {
      const lastWiki = wikis.pop();
      await fetchWikiList(
        memo,
        limit,
        lastWiki.id,
        lastWiki.content_updated_at
      );
    }
  } catch (error) {
    console.error(`Failed to fetch ${loggerPath} error:`, error);
  }
  return memo;
}
