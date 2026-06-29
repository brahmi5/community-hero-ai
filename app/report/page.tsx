"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";
export default function ReportPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    async function analyzeIssue() {

        let loadingToast: string | undefined;

        try {

            loadingToast = toast.loading("🤖 AI is analyzing your report...");
            setLoading(true);

            const user = auth.currentUser;

            if (!user) {
                toast.error("Please login first.");
                return;
            }

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("location", location);
            formData.append("userId", user.uid);
            formData.append("userEmail", user.email ?? "");
            formData.append("userName", user.displayName ?? "");

            if (image) {
                formData.append("image", image);
            }

            const response = await fetch("/api/analyze", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            toast.success("✅ AI analysis completed!");

            console.log(data);

            setResult(data);

        } catch (err) {

            console.error("FRONTEND ERROR:", err);

            toast.error("❌ Failed to analyze report.");

        } finally {

            if (loadingToast) {
                toast.dismiss(loadingToast);
            }

            setLoading(false);
        }
    }
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-xl">
                <h1 className="text-4xl font-bold mb-8">
                    Report Community Issue
                </h1>

                <input
                    placeholder="Issue Title"
                    className="border p-3 rounded w-full mb-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Describe the issue"
                    className="border p-3 rounded w-full mb-4"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    placeholder="Location"
                    className="border p-3 rounded w-full mb-4"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    className="border p-3 rounded w-full mb-4"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            setImage(e.target.files[0]);
                        }
                    }}
                />

                <button
                    onClick={analyzeIssue}
                    className="bg-blue-600 text-white p-3 rounded w-full"
                >
                    {loading ? "Analyzing..." : "Analyze with AI"}
                </button>
                {result && (
                    <div className="mt-6 border rounded p-4 space-y-3">
                        <h2 className="text-2xl font-bold">AI Analysis</h2>

                        <p>
                            <strong>📂 Category:</strong> {result.category}
                        </p>

                        <p>
                            <strong>🚨 Severity:</strong> {result.severity}
                        </p>

                        <p>
                            <strong>🏢 Department:</strong> {result.department}
                        </p>

                        <p>
                            <strong>⭐ Priority Score:</strong> {result.priorityScore}/100
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}