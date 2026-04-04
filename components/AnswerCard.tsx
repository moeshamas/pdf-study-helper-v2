import type { Chunk } from "@/lib/types";

type Props = {
  answer: string;
  sources: Chunk[];
};

export default function AnswerCard({ answer, sources }: Props) {
  return (
    <div className="answer-layout">
      <article className="answer-card">
        <div className="section-heading-row">
          <div>
            <p className="section-eyebrow">Generated response</p>
            <h2 className="section-title">Answer</h2>
          </div>
        </div>

        <div className="answer-content">
          {answer.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </article>

      <article className="sources-card">
        <div className="section-heading-row">
          <div>
            <p className="section-eyebrow">Evidence</p>
            <h2 className="section-title">Sources</h2>
          </div>
        </div>

        <div className="sources-list">
          {sources.length === 0 ? (
            <p className="empty-state">No supporting source chunks were returned.</p>
          ) : (
            sources.map((source) => (
              <div key={source.id} className="source-item">
                <div className="source-meta">
                  <span className="source-doc">{source.document}</span>
                  <span className="source-chip">Chunk {source.chunkIndex}</span>
                </div>

                <p className="source-text">
                      {source.text.slice(0, 300)}...
                </p>
              </div>
            ))
          )}
        </div>
      </article>
    </div>
  );
}