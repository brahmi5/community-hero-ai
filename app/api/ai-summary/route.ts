import { adminDb } from "@/lib/firebase-admin";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export async function GET() {
    try {

        const snapshot = await adminDb
            .collection("reports")
            .get();

        const reports = snapshot.docs.map(doc => doc.data());

        const prompt = `
You are an AI Municipal Operations Assistant.

Below are all community reports.

${JSON.stringify(reports)}

Generate a concise report with the following sections:

1. Overall Summary
2. Most Common Issues
3. Critical Issues
4. Recommended Department Actions
5. Areas needing immediate attention
6. Suggested priorities for today

Keep it under 300 words.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return Response.json({
            summary: response.text,
        });

    } catch (err) {

        console.error(err);

        return Response.json(
            { error: "Failed to generate summary" },
            { status: 500 }
        );

    }
}