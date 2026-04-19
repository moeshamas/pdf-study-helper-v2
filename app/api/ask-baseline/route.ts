import { NextResponse } from "next/server";

const HF_API_KEY = process.env.HF_API_KEY;
const MODEL = "mistralai/Mistral-7B-Instruct-v0.2";

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
      "https://router.huggingface.co/hf-inference/models/" + MODEL,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `Answer the following question:\n${question}`,
        }),
      }
    );

    const data = await response.json();

    let answer = "No response from baseline model.";

    if (Array.isArray(data) && data[0]?.generated_text) {
      answer = data[0].generated_text;
    } else if (data?.generated_text) {
      answer = data.generated_text;
    } else if (data?.error) {
      answer = "Error: " + data.error;
    } else {
      answer = JSON.stringify(data);
    }

    return NextResponse.json({
      answer,
      sources: [],
    });
  } catch (error) {
    return NextResponse.json(
      { answer: "Baseline API error", sources: [] },
      { status: 500 }
    );
  }
}