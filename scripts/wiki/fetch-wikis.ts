import axios from "axios";
import { IWiki } from "@site/types";
import dayjs from "dayjs";

const apiBaseURL = process.env.API_BASE_URL;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let retryTimes = 0;
export async function fetchWikiList(memo: IWiki[], updated_at = null, limit = 100) {
  console.log('--> fetch wikis from:', dayjs(updated_at * 1000).format('YYYY-MM-DD HH:mm:ss'));
  const currentURL = `${apiBaseURL}/api/forward/social/wiki/lists?updated_at=${updated_at}&limit=${limit}`;
  try {
    console.log('--> fetch url: ', currentURL)
    const resp = await axios.get(currentURL);
    if(!resp.data){
      if(retryTimes < 3){
        retryTimes += 1;
        console.log(`[warning] found wikis length = 0 now delay 1000ms retry request ${currentURL} times ${retryTimes}`,)
        await delay(1000)
        await fetchWikiList(memo, updated_at, limit);
      }
    }else{
      retryTimes = 0;
    }
    const {
      data: { list: wikis } = { list: [] }
    } = resp.data || { data: { list: [] } };

    memo.push(...wikis);

    if (wikis.length) {
      const lastWiki = wikis[0];
      await fetchWikiList(memo, lastWiki.content_updated_at, limit);
    }
  } catch (error) {
    console.error(`Failed to fetch ${currentURL} error:`, error);
  }
  return memo;
}
