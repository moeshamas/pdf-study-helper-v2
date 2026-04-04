# grill-me chat excerpt

## Prompt used
I want to build PDF Study Helper. Challenge the scope and tell me what to remove so it is narrow enough for an end-to-end proof of concept assignment.

## Summary of the grilling
- Keep the app limited to a few PDFs
- Support only a small number of well-defined user questions
- Do not add authentication
- Do not add browser uploads
- Do not add vector infrastructure unless clearly necessary
- Make the data pipeline easy to explain
- Make sure the app shows source evidence

## Result
I kept the app as a narrow document Q&A tool over processed PDFs with chunked JSON as the source of truth.