# Architecture Before / After

## Before
The project started as a working proof of concept with the main goal of making the PDF question-answering flow work end to end.

## After
The codebase was improved by separating:
- UI components
- retrieval logic
- chunking logic
- chunk loading
- ETL processing
- unit tests
- end-to-end tests
- workflow evidence and documentation

## Result
The project is now easier to test, explain, and maintain.