# Architecture Improvement Notes

## Initial version
The first working version focused on getting the full PDF Study Helper flow working end to end:
- PDFs stored in `data/bronze`
- text extracted and chunked
- question answering route built
- UI displayed answer and sources

At that stage, the priority was to prove the workflow worked locally.

## Improvements made after the first working version

### 1. Clear separation of data processing logic
Responsibilities were separated into focused modules:
- `lib/chunking.ts` for chunk generation
- `lib/retrieval.ts` for ranking and selecting chunks
- `lib/load-chunks.ts` for loading curated JSON

### 2. Clear separation of UI concerns
The interface was split into reusable components:
- `components/QuestionForm.tsx`
- `components/AnswerCard.tsx`

### 3. Dedicated ETL script
PDF ingestion and transformation were isolated into:
- `scripts/process-pdfs.ts`

This made the Bronze -> Silver -> Gold pipeline easier to explain and rerun.

### 4. Dedicated testing structure
Testing was separated by purpose:
- `tests/` for unit tests
- `e2e/` for Playwright tests

### 5. Workflow and documentation evidence added
Project planning and workflow evidence were added under:
- `docs/`
- GitHub Issues
- GitHub Actions workflow
- README

## Why the architecture is better now
The improved structure makes the project:
- easier to understand
- easier to test
- easier to explain in the demo
- more aligned with the assignment’s end-to-end workflow expectations

## Final structure summary
- `app/` -> UI and API route
- `components/` -> reusable UI pieces
- `lib/` -> core logic
- `scripts/` -> ETL
- `data/` -> Bronze / Silver / Gold
- `tests/` -> unit tests
- `e2e/` -> browser tests
- `docs/` -> workflow evidence