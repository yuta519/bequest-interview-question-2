import fs from "fs";

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
