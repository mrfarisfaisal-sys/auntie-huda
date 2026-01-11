import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { AUNTIE_HUDA_SYSTEM_PROMPT, extractTransactionPrompt } from "@/lib/prompt";
import { RoastResponse } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, dailyTotal = 0, currency = "SAR", imageBase64, savingsGoal, language = "en" } = body;

    if (!message && !imageBase64) {
      return NextResponse.json(
        { error: "Message or image is required" },
        { status: 400 }
      );
    }

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: AUNTIE_HUDA_SYSTEM_PROMPT,
      },
    ];

    if (imageBase64) {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: extractTransactionPrompt(
              message || "Extract the transaction from this receipt/bank SMS screenshot",
              dailyTotal,
              currency,
              savingsGoal,
              language
            ),
          },
          {
            type: "image_url",
            image_url: {
              url: imageBase64.startsWith("data:")
                ? imageBase64
                : `data:image/jpeg;base64,${imageBase64}`,
              detail: "high",
            },
          },
        ],
      });
    } else {
      messages.push({
        role: "user",
        content: extractTransactionPrompt(message, dailyTotal, currency, savingsGoal, language),
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 0.9,
      max_tokens: 500,
      response_format: { type: "json_object" },
    });

    const responseText = completion.choices[0]?.message?.content || "";
    
    let roastData: RoastResponse;
    try {
      roastData = JSON.parse(responseText);
    } catch {
      roastData = {
        merchant: "Unknown",
        amount: 0,
        currency: currency,
        category: "Other",
        sentiment: "neutral",
        reply_text: "Habibi, I couldn't understand that. Send me something like 'Starbucks 25 SAR' or a screenshot of your bank SMS! 📱",
      };
    }

    return NextResponse.json(roastData);
  } catch (error) {
    console.error("Roast API error:", error);
    
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return NextResponse.json(
          { 
            error: "API key not configured",
            merchant: "Error",
            amount: 0,
            currency: "SAR",
            category: "Other",
            sentiment: "neutral",
            reply_text: "Ya walad! Tell the developer to add the OpenAI API key! I cannot roast without my powers! 🔑"
          },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { 
        error: "Failed to process request",
        merchant: "Error",
        amount: 0,
        currency: "SAR",
        category: "Other",
        sentiment: "neutral",
        reply_text: "Habibi, something went wrong. Try again later, inshallah it will work! 🤲"
      },
      { status: 500 }
    );
  }
}
