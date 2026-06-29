"use client";

import { useState } from "react";

export default function AssistantPage() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    async function askAI() {
        setLoading(true);

        const response = await fetch("/api/assistant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question,
            }),
        });

        const data = await response.json();

        setAnswer(data.answer);

        setLoading(false);
    }

    return (
        <main className="max-w-3xl mx-auto p-10">

            <h1 className="text-4xl font-bold mb-8">
                🤖 Community Hero AI
            </h1>

            <textarea
                className="border rounded-lg p-4 w-full text-black"
                rows={5}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask anything..."
            />

            <button
                onClick={askAI}
                className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
                {loading ? "Thinking..." : "Ask AI"}
            </button>

            <div className="mt-6">

                <h3 className="font-semibold mb-2">
                    💡 Try asking:
                </h3>

                <ul className="space-y-2 text-blue-400">

                    <li>• Which department is busiest today?</li>

                    <li>• What are the top complaints?</li>

                    <li>• Which area needs immediate attention?</li>

                    <li>• How do I report a water leakage?</li>

                </ul>

            </div>

            {answer && (
                <div className="mt-8 bg-gray-900 rounded-xl p-6">

                    <h2 className="text-2xl font-bold mb-3">
                        AI Response
                    </h2>

                    <p className="whitespace-pre-wrap">
                        {answer}
                    </p>

                </div>
            )}

        </main>
    );
}