import { fetchLastUpdatedValue } from "./utils";
import { generateWikiMD } from "./template";
import { fetchWikiList } from "./fetch-wikis";

export async function updateLatestWiki(updated_at = null, limited = 50) {
  const content_updated_at = await fetchLastUpdatedValue();
  const wikis = []
  await fetchWikiList(wikis,content_updated_at, limited);
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
