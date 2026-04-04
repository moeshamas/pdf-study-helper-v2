export type Chunk = {
  id: string;
  document: string;
  pageStart: number | null;
  pageEnd: number | null;
  chunkIndex: number;
  text: string;
};

export type AskResponse = {
  answer: string;
  sources: Chunk[];
};