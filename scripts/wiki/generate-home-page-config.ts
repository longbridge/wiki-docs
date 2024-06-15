import { fetchWikiList } from "./fetch-wikis";
import * as fs from "node:fs";
import path from "path";

const projectRoot = path.resolve(__dirname, "../../");
async function genHomePageConfig() {
  const wikis = []
  await fetchWikiList(wikis);

  //   generate projectroot/tmp/index.config.json from wikis with only title, slug, and content_updated_at
  fs.writeFileSync(
    `${projectRoot}/tmp/index.config.json`,
    JSON.stringify(wikis, null, 2)
  );
}

genHomePageConfig();
