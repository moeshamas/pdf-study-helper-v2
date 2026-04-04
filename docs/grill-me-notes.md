# grill-me notes

## Original idea
Build an AI-enabled PDF question-answering application.

## Questions used to pressure-test the idea
1. Is the scope small enough to complete for the assignment?
2. What is the narrowest supported use case?
3. What data source will the app use?
4. What is out of scope?
5. How will the app show ingestion, ETL, storage, reasoning, and UI?
6. How will I test the most important behaviors?
7. How will I explain the architecture simply in the video?

## Final decisions after grilling
- I narrowed the project to a fixed set of PDFs already stored in the repo.
- I removed browser-based PDF uploads.
- I removed authentication and multi-user features.
- I avoided vector databases and other heavy infrastructure.
- I used a simple Bronze -> Silver -> Gold file structure.
- I focused the UI on one question-answer workflow with visible sources.
- I kept the architecture small so it is easy to explain and reliable to demo.

## What changed because of the grilling
The project became much narrower and more realistic. Instead of building a general document chatbot, I focused on a proof-of-concept PDF study helper that demonstrates ingestion, ETL, storage, reasoning, and UI with a limited set of documents.