import { adminDb } from "@/lib/firebase-admin";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ReportDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const doc = await adminDb
        .collection("reports")
        .doc(id)
        .get();

    if (!doc.exists) {
        notFound();
    }

    const report = doc.data();

    return (
        <main className="max-w-5xl mx-auto p-10">

            <h1 className="text-4xl font-bold mb-8">
                {report?.title}
            </h1>

            {report?.imageUrl && (
                <Image
                    src={report.imageUrl}
                    alt={report.title}
                    width={900}
                    height={500}
                    className="rounded-xl w-full h-auto mb-8"
                />
            )}

            <div className="space-y-4 text-lg">

                <p>
                    <strong>Description:</strong> {report?.description}
                </p>

                <p>
                    <strong>Location:</strong> {report?.location}
                </p>

                <p>
                    <strong>Category:</strong> {report?.category}
                </p>

                <p>
                    <strong>Severity:</strong> {report?.severity}
                </p>

                <p>
                    <strong>Department:</strong> {report?.department}
                </p>

                <p>
                    <strong>Priority:</strong> {report?.priorityScore}/100
                </p>

                <p>
                    <strong>Status:</strong> {report?.status}
                </p>

            </div>

        </main>
    );
}