import { readJsonFile, readJsonFileById, writeJsonFile } from "../utils/file";
import { generateHash } from "../utils/hash";

const DATABASE_FILE_PATH = "./db/db.json";
// This file must be store in a secure place like S3, which are different from the database file
const BACKUP_DIR_PATH = "./db/backup";
// This must be store in a secure place like environment variables or Secrets Manager
const SECRET = "SECRET-************************";

export type Database = {
  data: Data[];
};

export type Data = {
  id: number;
  content: string;
  hash: string;
};

function getAllData(): Database {
  return readJsonFile(DATABASE_FILE_PATH);
}

function verifyData(data: Data): boolean {
  return data?.hash === createDataHash(data.content);
}

export function getLatestData(): Data | null {
  const allData: Database = getAllData();

  if (!allData.data.length) return null;

  const data = allData.data.reduce(
    (prev, current) => (current.id > prev.id ? current : prev),
    allData.data[0]
  );

  if (!verifyData(data)) throw new Error("Data is corrupted");

  return data;
}

function createDataHash(content: string): string {
  // Use a secret key for malicious users not to predict the hash
  return generateHash(`${content}${SECRET}`);
}

export function createData(content: string): Data {
  if (!content.length) throw new Error("Content is required");

  const allData = getAllData();

  const prev = allData.data.length
    ? allData.data.reduce(
        (prev, current) => (current.id > prev.id ? current : prev),
        allData.data[0]
      )
    : null;

  const hash = createDataHash(content);
  if (prev && prev.hash === hash)
    throw new Error("Input is duplicated to the latest saved data");

  const result: Data = {
    id: prev ? prev.id + 1 : 1, // Increment the id. The bigger the id, the newer the data
    content,
    hash,
  };

  allData.data.push(result);
  writeJsonFile(DATABASE_FILE_PATH, allData);

  // Take a backup of the database for just in case the data is corrupted
  const latestData = getLatestData();
  writeJsonFile(`${BACKUP_DIR_PATH}/${latestData?.id}.json`, latestData);

  return result;
}

export function verifyDatabase(): boolean {
  const data = getAllData().data;
  return data.every((d) => createDataHash(d.content) === d.hash);
}

export async function restoreFromBackup(): Promise<void> {
  const allData = getAllData();

  const prev = allData.data.pop();
  if (!prev) throw new Error("No data found");

  const backup = await readJsonFileById(BACKUP_DIR_PATH, prev.id.toString());
  allData.data.push(backup);

  writeJsonFile(DATABASE_FILE_PATH, allData);
}
