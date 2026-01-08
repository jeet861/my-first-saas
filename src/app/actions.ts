"use server";

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

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

        return JSON.parse(content);

    } catch (error) {
        console.error("OpenAI API Error:", error);
        return { error: "Failed to analyze chart. Please try again." };
    }
}
