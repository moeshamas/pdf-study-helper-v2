import { NextResponse } from "next/server";

const HF_API_KEY = process.env.HF_API_KEY;

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!HF_API_KEY) {
      return NextResponse.json({
        answer: "Error: Missing HF_API_KEY environment variable.",
        sources: [],
      });
    }

    const response = await fetch(
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
                "You are a general assistant. Answer the user's question as best as you can, but you are not given any retrieved document context. Keep the answer concise.",
            },
            {
              role: "user",
              content: question,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        answer: `Error: ${data?.error || "Baseline API request failed."}`,
        sources: [],
      });
    }

    const answer =
      data?.choices?.[0]?.message?.content?.trim() ||
      "No response from baseline model.";

    return NextResponse.json({
      answer,
      sources: [],
    });
  } catch (error) {
    return NextResponse.json(
      { answer: "Baseline API error.", sources: [] },
      { status: 500 }
    );
  }
}