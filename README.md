# PDF Study Helper

PDF Study Helper is a focused end-to-end AI-enabled application that ingests a small set of PDFs, processes them into structured chunks, and answers user questions with grounded evidence.

---

## 🚀 What the App Does

- Processes PDFs into structured text chunks
- Allows users to ask questions about the PDFs
- Returns concise answers based on the content
- Displays source chunks used to generate the answer

---

## 🧠 Architecture Overview

Pipeline:

Bronze → Silver → Gold → Retrieval → Reasoning → UI

- **Bronze**: raw PDFs (`data/bronze`)
- **Silver**: extracted text (`data/silver`)
- **Gold**: chunked JSON (`data/gold/chunks.json`)
- **Retrieval**: selects relevant chunks
- **Reasoning**: generates grounded answer
- **UI**: displays answer and sources

---

## 🛠 Tech Stack

- Next.js
- TypeScript
- Node.js
- Vitest (unit testing)
- Playwright (end-to-end testing)
- GitHub Actions (ETL workflow)
- Vercel (deployment)

---

## ▶️ Run Locally

```bash
npm install
npm run process:pdfs
npm run dev