import axios from "axios";
import { fetchLastUpdatedValue } from "./utils";
import { IWiki } from "@site/types";

const apiBaseURL = process.env.API_BASE_URL;

export async function fetchWikiList(memo: IWiki[], updated_at = null, limited = 50) {
  const resp = await axios.get(`${apiBaseURL}/api/forward/social/wiki/lists`, {
    params: {
      updated_at,
      limited
    }
  });
  const {
    data: { list: wikis }
  } = resp.data || { data: { list: [] } };
  memo.push(...wikis);
  if (!!wikis.length) {
    const lastWiki = wikis.pop();
    fetchLastUpdatedValue(lastWiki.content_updated_at);
    await fetchWikiList(memo,lastWiki.content_updated_at, limited);
  }

  return memo;
}
