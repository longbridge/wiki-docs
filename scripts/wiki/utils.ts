import dayjs from "dayjs";

const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..", "..");
const forceRefresh = process.env.FORCE_UPDATE === "true";

export async function fetchLastUpdatedValue(content_updated_at = 0) {
  const tmpFilePath = path.join(projectRoot, "last_updated_at.txt");

  try {
    // content_updated_at empty mean's need read prev last updated_at value
    if (!content_updated_at) {
      // If the FORCE_UPDATE environment variable is set to true, return an empty string
      if (forceRefresh) {
        console.log("--> use force update wikis");
        return 0;
      } else {
        // Read the last updated timestamp from the temporary file
        const latestDate = await readLastUpdatedAt(tmpFilePath);
        console.log("--> use latest update date:", dayjs(latestDate * 1000).format("YYYY-MM-DD HH:mm:ss"));
        return latestDate;
      }


    } else {
      // Write the current updated timestamp to the temporary file
      console.log("--> write latest update date:", dayjs(content_updated_at * 1000).format("YYYY-MM-DD HH:mm:ss"));
      await writeLastUpdatedAt(tmpFilePath, content_updated_at);
      return content_updated_at;
    }
  } catch (error) {
    console.error("Error fetching last updated value:", error);
    return 0;
    throw error;
  }
}

async function readLastUpdatedAt(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    return data.trim();
  } catch (error) {
    if (error.code === "ENOENT") {
      // If the file doesn't exist, return an empty string
      return "";
    } else {
      throw error;
    }
  }
}

async function writeLastUpdatedAt(filePath, updatedAt) {
  try {
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.writeFile(filePath, updatedAt);
  } catch (error) {
    console.error("Error writing last updated at:", error);
    throw error;
  }
}
