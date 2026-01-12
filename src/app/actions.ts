"use server";

import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";


let openaiClient: OpenAI | null = null;

function getOpenAIClient() {
    if (!openaiClient) {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey || apiKey === "sk-your-actual-key-here") {
            throw new Error("OPENAI_API_KEY is missing or invalid in .env.local");
        }
        openaiClient = new OpenAI({ apiKey });
    }
    return openaiClient;
}

export type AnalysisResult = {
    title: string;
    signal: "BUY" | "SELL" | "NEUTRAL";
    confidence: number;
    reasoning: string;
    key_levels: {
        entry: string;
        stop_loss: string;
        targets: string[];
    };
};

export async function analyzeChartAction(formData: FormData): Promise<AnalysisResult | { error: string }> {
    const file = formData.get("file") as File;

    if (!file) {
        return { error: "No file provided" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64Image}`;

    try {
        const openai = getOpenAIClient();
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "system",
                    content: `You are an expert Scalper Trader. Analyze the chart screenshot and return a JSON object with the following structure:
          {
            "title": "Short descriptive title (e.g., Bullish Engulfing on SPY)",
            "signal": "BUY" | "SELL" | "NEUTRAL",
            "confidence": number (0-100),
            "reasoning": "Concise explanation...",
            "key_levels": {
              "entry": "price",
              "stop_loss": "price",
              "targets": ["target1", "target2"]
            }
          }
          `
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Analyze this chart. Return JSON." },
                        {
                            type: "image_url",
                            image_url: {
                                "url": dataUrl,
                            },
                        },
                    ],
                },
            ],
        });

        const content = response.choices[0].message.content;
        if (!content) throw new Error("No content returned");
        const analysisResult = JSON.parse(content);

        // Save to Supabase
        const { userId } = await auth();
        if (userId) {
            const { error: dbError } = await supabase
                .from('analyses')
                .insert({
                    user_id: userId,
                    title: analysisResult.title,
                    signal: analysisResult.signal,
                    confidence: analysisResult.confidence,
                    reasoning: analysisResult.reasoning,
                    key_levels: analysisResult.key_levels
                });

            if (dbError) {
                console.error("Supabase Save Error:", dbError);
            }
        }

        return analysisResult;

    } catch (error) {
        console.error("OpenAI API Error:", error);
        return { error: "Failed to analyze chart. Please try again." };
    }
}

export async function fetchHistoryAction() {
    const { userId } = await auth();
    if (!userId) {
        return { error: "Not authenticated" };
    }

    const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Supabase Fetch Error:", error);
        return { error: "Failed to fetch history" };
    }

    return data;
}
