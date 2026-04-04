# Playwright MCP Evidence

## What was tested
- user opens the application
- user enters a question
- user submits the form
- answer section appears
- sources section appears

## Why this is meaningful
This is a real end-to-end flow through the application:
UI -> API route -> retrieval/reasoning -> rendered response

## Evidence
- Playwright test file: `e2e/ask-question.spec.ts`
- passing Playwright terminal output screenshot
- local browser automation used during development

## MCP note
Playwright was used as the browser automation layer for meaningful UI and end-to-end verification.