# Project Status

## Current app state
- Local app runs successfully
- PDF processing pipeline exists
- UI shows question form, answer, and sources
- App is ready for workflow documentation, GitHub setup, testing evidence, and deployment

## Current architecture
- Bronze: raw PDFs in `data/bronze`
- Silver: extracted text in `data/silver`
- Gold: chunked JSON in `data/gold/chunks.json`
- Retrieval/reasoning layer through `app/api/ask/route.ts`
- Frontend UI in Next.js

## Next step
Create workflow evidence files and required skill artifacts.