import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Initialize the API with your key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    // Get the model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest", // Correct model name
    });

    // Generate content
    const prompt = `You are a helpful CRM assistant. ${message}`;
    const result = await model.generateContent(prompt);

    // Wait for response
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process chat request" },
      { status: 500 }
    );
  }
}