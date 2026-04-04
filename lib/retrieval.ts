import type { Chunk } from "./types";

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function scoreChunk(question: string, chunk: Chunk): number {
  const qTokens = new Set(tokenize(question));
  const cTokens = tokenize(chunk.text);

  let score = 0;

  for (const token of cTokens) {
    if (qTokens.has(token)) score += 1;
  }

  // slight bonus for earlier chunks because titles/introductions often help
  score -= chunk.chunkIndex * 0.01;

  return score;
}

export function getTopChunks(
  question: string,
  chunks: Chunk[],
  topK = 4
): Chunk[] {
  return [...chunks]
    .map((chunk) => ({
      chunk,
      score: scoreChunk(question, chunk),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((item) => item.chunk);
}