import cloudinary from "@/lib/cloudinary";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const location = formData.get("location") as string;
        let latitude: number | null = null;
        let longitude: number | null = null;
        const userId = formData.get("userId") as string;
        const userEmail = formData.get("userEmail") as string;
        const userName = formData.get("userName") as string;
        const image = formData.get("image") as File | null;


        let imageUrl = "";
        let imagePart = null;
        if (image) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            imagePart = {
                inlineData: {
                    data: buffer.toString("base64"),
                    mimeType: image.type,
                },
            };

            const uploadResult = await new Promise<any>((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream(
                        {
                            folder: "community-hero",
                        },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    )
                    .end(buffer);
            });

            imageUrl = uploadResult.secure_url;
        }

        const prompt = `
You are an AI municipal operations assistant.

Analyze BOTH the uploaded image and the text.

Issue Title:
${title}

Description:
${description}

Location:
${location}

Determine:

- category
- severity
- department
- priorityScore (0-100)

Return ONLY valid JSON.

Example:

{
  "category":"Roads & Pavement",
  "severity":"Critical",
  "department":"Public Works Department",
  "priorityScore":95
}
`;
        // Convert location to latitude & longitude
        try {
            const geoResponse = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    location
                )}`,
                {
                    headers: {
                        "User-Agent": "CommunityHero/1.0",
                    },
                }
            );

            const geoData = await geoResponse.json();
            console.log("Searching for:", location);
            console.log("Nominatim response:", geoData);

            if (geoData.length > 0) {
                latitude = parseFloat(geoData[0].lat);
                longitude = parseFloat(geoData[0].lon);
            }
        } catch (err) {
            console.error("Geocoding failed:", err);
        }
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: imagePart
                ? [
                    imagePart,
                    {
                        text: prompt,
                    },
                ]
                : prompt,
        });

        const text = response.text ?? "";

        console.log(text);

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsed = JSON.parse(cleaned);

        await adminDb.collection("reports").add({
            title,
            description,
            location,
            latitude,
            longitude,
            userId,
            userEmail,
            userName,
            imageUrl,

            category: parsed.category,
            severity: parsed.severity,
            department: parsed.department,
            priorityScore: parsed.priorityScore,

            status: "Pending",
            confirmVotes: 0,
            resolvedVotes: 0,
            createdAt: FieldValue.serverTimestamp(),
        });

        return Response.json(parsed);
    } catch (err) {
        console.error(err);

        return Response.json(
            {
                success: false,
                error: String(err),
            },
            { status: 500 }
        );
    }
}