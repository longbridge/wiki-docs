const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..", "..", "..");
const tmpDir = path.resolve(projectRoot, "tmp");
const forceRefresh = process.env.FORCE_UPDATE === "true";

export async function fetchLastUpdatedValue(content_updated_at: string = null) {
  const tmpFilePath = path.join(tmpDir, "last_updated_at.txt");

  try {
    // content_updated_at empty mean's need read prev last updated_at value
    if (!content_updated_at) {
      // If the FORCE_UPDATE environment variable is set to true, return an empty string
      if (forceRefresh) return;

      // Read the last updated timestamp from the temporary file
      return await readLastUpdatedAt(tmpFilePath);
    } else {
      // Write the current updated timestamp to the temporary file
      await writeLastUpdatedAt(tmpFilePath, content_updated_at);
      return content_updated_at;
    }
  } catch (error) {
    console.error("Error fetching last updated value:", error);
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
