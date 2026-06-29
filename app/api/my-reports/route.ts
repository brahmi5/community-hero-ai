import { adminDb } from "@/lib/firebase-admin";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const userId = searchParams.get("userId");

        console.log("Received userId:", userId);

        if (!userId) {
            return Response.json(
                { error: "Missing userId" },
                { status: 400 }
            );
        }

        const snapshot = await adminDb
            .collection("reports")
            .where("userId", "==", userId)
            .orderBy("createdAt", "desc")
            .get();

        console.log("Documents found:", snapshot.size);

        const reports = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return Response.json(reports);
    } catch (err) {
        console.error("API ERROR:", err);

        return Response.json(
            { error: String(err) },
            { status: 500 }
        );
    }
}