import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { reportId, voteType } = body;

        if (!reportId || !voteType) {
            return Response.json(
                {
                    success: false,
                    error: "Missing parameters",
                },
                { status: 400 }
            );
        }

        const reportRef = adminDb
            .collection("reports")
            .doc(reportId);

        if (voteType === "confirm") {
            await reportRef.update({
                confirmVotes: FieldValue.increment(1),
            });
        }

        if (voteType === "resolved") {
            await reportRef.update({
                resolvedVotes: FieldValue.increment(1),
            });
        }

        return Response.json({
            success: true,
        });

    } catch (err) {

        console.error(err);

        return Response.json(
            {
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}