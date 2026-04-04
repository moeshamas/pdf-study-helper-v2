import type { Chunk } from "./types";

type ChunkOptions = {
  chunkSize?: number;
  overlap?: number;
  document: string;
};

function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function splitIntoChunks(
  rawText: string,
  options: ChunkOptions
): Chunk[] {
  const chunkSize = options.chunkSize ?? 1200;
  const overlap = options.overlap ?? 200;

  const text = normalizeWhitespace(rawText);

  if (!text) return [];

  const chunks: Chunk[] = [];
  let start = 0;
  let chunkIndex = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    const chunkText = text.slice(start, end).trim();

    if (chunkText) {
      chunks.push({
        id: `${options.document}-chunk-${chunkIndex}`,
        document: options.document,
        pageStart: null,
        pageEnd: null,
        chunkIndex,
        text: chunkText,
      });
      chunkIndex += 1;
    }

    if (end === text.length) break;
    start = Math.max(end - overlap, start + 1);
  }

  return chunks;
}