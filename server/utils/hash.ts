import { createHash } from "crypto";

const HASH_ALGORITHM = "sha256";

export function generateHash(char: string): string {
  if (!char.length) throw new Error("Input char is empty.");

  const hash = createHash(HASH_ALGORITHM);
  hash.update(char);

  return hash.digest("hex");
}
