import { GoogleGenAI } from "@google/genai";
import { adminDb } from "@/lib/firebase-admin";
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {

    try {

        const body = await req.json();

        const question = body.question;
        const snapshot = await adminDb
            .collection("reports")
            .get();

        const allReports = snapshot.docs.map((doc) => doc.data());


        const prompt = `
You are Community Hero AI.

Below is the current data from the city.

Reports:

${JSON.stringify(allReports)}

Citizen Question:

${question}

Instructions:

- Answer using the current reports whenever possible.
- If asked about trends, use the reports.
- Mention the department if applicable.
- Keep answers short.
- Sound like a municipal AI assistant.
`;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return Response.json({
            answer: response.text,
        });

    } catch (err) {

        console.error(err);

        return Response.json(
            {
                error: "AI failed",
            },
            {
                status: 500,
            }
        );

    }

}