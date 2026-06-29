"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

type Report = {
    id: string;
    title: string;
    description: string;
    location?: string;
    status: string;
    category: string;
    priorityScore: number;
    imageUrl?: string;
    createdAt?: any;

    confirmVotes?: number;
    resolvedVotes?: number;

};
export default function MyReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    async function vote(reportId: string, voteType: "confirm" | "resolved") {

        await fetch("/api/vote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reportId,
                voteType,
            }),
        });

        window.location.reload();
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setLoading(false);
                return;
            }

            console.log("Logged in UID:", user.uid);

            const response = await fetch(
                `/api/my-reports?userId=${user.uid}`
            );


            const data = await response.json();

            console.log(data);

            setReports(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <main className="p-10">
                <h1>Loading...</h1>
            </main>
        );
    }

    return (
        <main className="min-h-screen p-10">
            <h1 className="text-4xl font-bold mb-8">
                My Reports
            </h1>

            {reports.length === 0 ? (
                <p>No reports submitted yet.</p>
            ) : (
                <div className="space-y-6">
                    {reports.map((report) => (
                        <Link
                            href={`/report/${report.id}`}
                            key={report.id}
                        >
                            <div className="border rounded-xl p-5 hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
                                {report.imageUrl && (
                                    <img
                                        src={report.imageUrl}
                                        alt={report.title}
                                        className="w-full h-60 object-cover rounded-xl mb-4"
                                    />
                                )}
                                <h2 className="text-2xl font-bold">
                                    {report.title}
                                </h2>

                                <p>{report.description}</p>
                                <p className="mt-2">
                                    📍 <strong>Location:</strong> {report.location}
                                </p>

                                <p className="mt-2">
                                    <strong>Category:</strong> {report.category}
                                </p>

                                <p className="mt-2">
                                    <strong>Status:</strong>{" "}

                                    <span
                                        className={`px-3 py-1 rounded-full text-white font-semibold ${report.status === "Resolved"
                                            ? "bg-green-600"
                                            : report.status === "Assigned"
                                                ? "bg-blue-600"
                                                : report.status === "In Progress"
                                                    ? "bg-yellow-500 text-black"
                                                    : "bg-red-600"
                                            }`}
                                    >
                                        {report.status}
                                    </span>
                                </p>
                                <p className="mt-2">
                                    ⭐ <strong>Priority:</strong>

                                    <span className="ml-2 bg-purple-600 px-3 py-1 rounded-full">
                                        {report.priorityScore}/100
                                    </span>
                                </p>

                                <div className="flex gap-4 mt-5">

                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            vote(report.id, "confirm");
                                        }}
                                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                                    >
                                        👍 Confirm ({report.confirmVotes ?? 0})
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            vote(report.id, "resolved");
                                        }}
                                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                                    >
                                        👎 Resolved ({report.resolvedVotes ?? 0})
                                    </button>

                                </div>
                                {(() => {
                                    const confirm = report.confirmVotes ?? 0;
                                    const resolved = report.resolvedVotes ?? 0;
                                    const total = confirm + resolved;

                                    const confidence =
                                        total === 0
                                            ? 0
                                            : Math.round((confirm / total) * 100);

                                    return (
                                        <div className="mt-5">

                                            <p className="font-semibold mb-2">
                                                Community Confidence
                                            </p>

                                            <div className="w-full bg-gray-700 rounded-full h-4">

                                                <div
                                                    className="bg-green-500 h-4 rounded-full"
                                                    style={{
                                                        width: `${confidence}%`,
                                                    }}
                                                />

                                            </div>

                                            <p className="mt-2 font-bold">

                                                {confidence}%{" "}

                                                {confidence >= 80
                                                    ? "✅ Highly Verified"
                                                    : confidence >= 50
                                                        ? "🟡 Moderately Verified"
                                                        : "🔴 Needs More Verification"}

                                            </p>

                                        </div>
                                    );
                                })()}
                                <p className="mt-2">
                                    📅 <strong>Submitted:</strong>{" "}
                                    {report.createdAt?.seconds
                                        ? new Date(
                                            report.createdAt.seconds * 1000
                                        ).toLocaleString()
                                        : "Unknown"}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}
