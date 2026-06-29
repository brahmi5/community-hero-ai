"use client";

import { useState } from "react";

export default function AISummaryCard() {
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    async function generateSummary() {
        try {
            setLoading(true);

            const response = await fetch("/api/ai-summary");

            const data = await response.json();

            setSummary(data.summary);
        } catch (err) {
            console.error(err);
            alert("Failed to generate AI summary.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-gray-900 rounded-xl p-6 my-8">

            <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">
                    🤖 AI Municipal Insights
                </h2>

                <button
                    onClick={generateSummary}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
                >
                    {loading ? "Generating..." : "✨ Generate AI Insights"}
                </button>

            </div>

            {summary && (
                <div className="mt-6 whitespace-pre-wrap leading-7">
                    {summary}
                </div>
            )}

        </div>
    );
}
