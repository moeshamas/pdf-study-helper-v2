# Product Requirements Document (PRD)

## 1. Project Name
PDF Study Helper

---

## 2. Goal

Build a small end-to-end AI-enabled application that:
- ingests a limited set of PDFs
- transforms them into structured chunks
- allows users to ask questions
- returns grounded answers with visible sources

The goal is to demonstrate a complete pipeline including:
ingestion → ETL → storage → retrieval/reasoning → UI.

---

## 3. Target Users

- Students reviewing course materials
- Users who want quick answers from their PDF documents

---

## 4. Supported Tasks

Users can:
- ask a question about the processed PDFs
- receive a concise answer
- view the supporting source chunks used to generate the answer

---

## 5. Out of Scope

The following are intentionally NOT included:
- user authentication
- uploading PDFs through the UI
- OCR for scanned documents
- external web search
- vector databases
- multi-user collaboration

---

## 6. Functional Requirements

### 6.1 Ingestion
- PDFs are stored in `data/bronze`

### 6.2 ETL (Transformation)
- Extract text from PDFs
- Save text in `data/silver`
- Split text into chunks
- Save chunks in `data/gold/chunks.json`

### 6.3 Storage
- JSON file (`chunks.json`) used as the data source

### 6.4 Retrieval / Reasoning
- Retrieve most relevant chunks for a question
- Generate an answer based only on retrieved chunks

### 6.5 UI
- Input form for user question
- Display answer
- Display sources

---

## 7. Non-Functional Requirements

- App must run locally and on Vercel
- UI must be clear and readable
- Code must be modular and structured
- Tests must be meaningful

---

## 8. Architecture Overview

Pipeline:

Bronze → Silver → Gold → Retrieval → Reasoning → UI

Details:
- Bronze: raw PDFs
- Silver: extracted text
- Gold: chunked JSON
- Retrieval: selects top chunks
- Reasoning: generates grounded answer
- UI: displays answer and sources

---

## 9. Testing Strategy

### Unit Tests
- chunking logic
- retrieval logic

### End-to-End Tests
- user enters question
- answer appears
- sources appear

### Playwright MCP
- browser testing used during development

---

## 10. Deployment

- Code hosted on GitHub (public repository)
- Deployed on Vercel
- Live URL used in demo video

---

## 11. Success Criteria

The project is successful if:
- user can ask a question
- system retrieves relevant chunks
- system returns a grounded answer
- sources are visible
- all steps work end-to-end