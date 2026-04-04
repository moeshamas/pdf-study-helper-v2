import fs from "node:fs/promises";
import path from "node:path";
import type { Chunk } from "./types";

export async function loadChunks(): Promise<Chunk[]> {
  const filePath = path.join(process.cwd(), "data", "gold", "chunks.json");

  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as Chunk[];
  } catch (error) {
    console.error("Failed to load chunks.json", error);
    return [];
  }
}