import { z } from "zod";
import { NextResponse } from "next/server";
import { loadChunks } from "@/lib/load-chunks";
import { getTopChunks } from "@/lib/retrieval";
import type { AskResponse } from "@/lib/types";

const bodySchema = z.object({
  question: z.string().min(3),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request. Please provide a question." },
        { status: 400 }
      );
    }

    const { question } = parsed.data;
    const chunks = await loadChunks();

    if (chunks.length === 0) {
      return NextResponse.json(
        { error: "No processed PDF data found. Run the ETL script first." },
        { status: 500 }
      );
    }

    const topChunks = getTopChunks(question, chunks, 4);

    if (topChunks.length === 0) {
      const emptyResponse: AskResponse = {
        answer:
          "I could not find enough relevant information in the processed PDFs to answer that reliably.",
        sources: [],
      };

      return NextResponse.json(emptyResponse);
    }

    const context = topChunks
      .map(
        (chunk, index) =>
          `Source ${index + 1} | Document: ${chunk.document}\n${chunk.text}`
      )
      .join("\n\n---\n\n");

    const HF_API_KEY = process.env.HF_API_KEY;

    if (!HF_API_KEY) {
      return NextResponse.json(
        { error: "Missing HF_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const hfResponse = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b:fastest",
          stream: false,
          messages: [
            {
              role: "system",
              content:
                "You are a careful study helper. Answer only using the provided context. If the answer is not supported by the context, say so clearly. Keep the answer concise and study-friendly.",
            },
            {
              role: "user",
              content: `Question: ${question}\n\nContext:\n${context}`,
            },
          ],
        }),
      }
    );

    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      console.error("Hugging Face API error:", errorText);

      return NextResponse.json(
        { error: `Hugging Face API request failed: ${errorText}` },
        { status: 500 }
      );
    }

    const hfData = await hfResponse.json();

    const answerText =
      hfData?.choices?.[0]?.message?.content?.trim() ||
      "I found relevant source material but could not generate a final answer.";

    const apiResponse: AskResponse = {
      answer: answerText,
      sources: topChunks,
    };

    return NextResponse.json(apiResponse);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error while answering the question." },
      { status: 500 }
    );
  }
}