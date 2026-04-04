"use client";

import { useState } from "react";
import QuestionForm from "@/components/QuestionForm";
import AnswerCard from "@/components/AnswerCard";
import type { AskResponse } from "@/lib/types";

export default function HomePage() {
  const [result, setResult] = useState<AskResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleAsk(question: string) {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Server error while answering the question.");
      }

      setResult(data);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-badge">End-to-End AI PDF Q&amp;A</div>
        <h1 className="hero-title">PDF Study Helper</h1>
        <p className="hero-subtitle">
          Ask questions about your processed PDFs and get grounded answers with
          supporting source chunks.
        </p>
      </section>

      <section className="panel-card">
        <QuestionForm onAsk={handleAsk} isLoading={isLoading} />
      </section>

      {error ? (
        <section className="error-card">
          <strong>Something went wrong:</strong> {error}
        </section>
      ) : null}

      {result ? (
        <section className="results-wrap">
          <AnswerCard answer={result.answer} sources={result.sources} />
        </section>
      ) : null}
    </main>
  );
}