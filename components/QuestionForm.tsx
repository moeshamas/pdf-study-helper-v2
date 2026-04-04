"use client";

import { useState } from "react";

type Props = {
  onAsk: (question: string) => Promise<void>;
  isLoading: boolean;
};

export default function QuestionForm({ onAsk, isLoading }: Props) {
  const [question, setQuestion] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;
    await onAsk(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <div className="section-heading-row">
        <div>
          <p className="section-eyebrow">Ask your documents</p>
          <h2 className="section-title">Search across your processed PDF content</h2>
        </div>
      </div>

      <label htmlFor="question" className="form-label">
        Enter your question
      </label>

      <textarea
        id="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Example: What is EC2 and what does it do?"
        className="question-textarea"
      />

      <div className="form-actions">
        <button type="submit" disabled={isLoading} className="ask-button">
          {isLoading ? "Thinking..." : "Ask Question"}
        </button>

        <p className="helper-text">
          Tip: ask specific questions for better grounded answers.
        </p>
      </div>
    </form>
  );
}