import fs from "node:fs/promises";
import path from "node:path";
const pdf = require("pdf-parse");
import { splitIntoChunks } from "../lib/chunking";
import type { Chunk } from "../lib/types";

async function ensureDir(dirPath: string) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function processPdfs() {
  const bronzeDir = path.join(process.cwd(), "data", "bronze");
  const silverDir = path.join(process.cwd(), "data", "silver");
  const goldDir = path.join(process.cwd(), "data", "gold");

  await ensureDir(bronzeDir);
  await ensureDir(silverDir);
  await ensureDir(goldDir);

  const files = await fs.readdir(bronzeDir);
  const pdfFiles = files.filter((file) => file.toLowerCase().endsWith(".pdf"));

  if (pdfFiles.length === 0) {
    console.log("No PDF files found in data/bronze");
    return;
  }

  const allChunks: Chunk[] = [];

  for (const file of pdfFiles) {
    const filePath = path.join(bronzeDir, file);
    const buffer = await fs.readFile(filePath);
    const parsed = await pdf(buffer);

    const text = parsed.text ?? "";
    const safeBaseName = file.replace(/\.pdf$/i, "");

    await fs.writeFile(
      path.join(silverDir, `${safeBaseName}.txt`),
      text,
      "utf8"
    );

    const chunks = splitIntoChunks(text, {
      document: file,
      chunkSize: 1200,
      overlap: 200,
    });

    allChunks.push(...chunks);
    console.log(`Processed ${file}: ${chunks.length} chunks`);
  }

  await fs.writeFile(
    path.join(goldDir, "chunks.json"),
    JSON.stringify(allChunks, null, 2),
    "utf8"
  );

  console.log(`Done. Wrote ${allChunks.length} chunks to data/gold/chunks.json`);
}

processPdfs().catch((error) => {
  console.error(error);
  process.exit(1);
});