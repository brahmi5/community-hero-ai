"use server";

import { adminDb } from "@/lib/firebase-admin";

export async function updateStatus(
    id: string,
    status: string
) {
    await adminDb
        .collection("reports")
        .doc(id)
        .update({
            status,
        });
}