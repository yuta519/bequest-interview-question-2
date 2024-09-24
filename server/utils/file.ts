import fs from "fs";
import { readdir } from "fs/promises";
import { join } from "path";

export function readJsonFile(filePath: string): any {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return null;
  }
}

export function writeJsonFile(filePath: string, jsonData: any): void {
  try {
    const dataString = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync(filePath, dataString, "utf8");
  } catch (error: any) {
    throw new Error(`Error writing JSON file: ${error.message}`);
  }
}

export async function readJsonFileById(
  dirPath: string,
  id: string
): Promise<any | null> {
  try {
    const files = await readdir(dirPath);
    const targetFile = files.find((file) => file === `${id}.json`);

    if (targetFile) {
      const filePath = join(dirPath, targetFile);
      console.log(`File found: ${filePath}`);
      return readJsonFile(filePath);
    } else {
      console.log(`File with ID ${id} not found`);
      return null;
    }
  } catch (error) {
    console.error("Error reading directory:", error);
    return null;
  }
}
