"use client";

import { useState } from "react";
import EmergencyModal from "./EmergencyModal";

type Report = {
    id?: string;
    title?: string;
    priorityScore?: number;
    location?: string;
    department?: string;
};

export default function EmergencyAlert({
    reports,
}: {
    reports: Report[];
}) {
    const [open, setOpen] = useState(false);

    const emergencies = reports
        .filter((r) => (r.priorityScore ?? 0) >= 90)
        .slice(0, 3);

    if (emergencies.length === 0) return null;

    return (
        <>
            <div className="mb-8 bg-red-600 rounded-xl p-5 flex items-center justify-between">

                <div>
                    <h2 className="text-lg font-bold text-white">
                        🚨 {emergencies.length} Critical Reports Need Attention
                    </h2>

                    <p className="text-sm text-red-100 mt-1">
                        Highest Priority: {emergencies[0].title}
                    </p>
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100"
                >
                    View All
                </button>

            </div>

            <EmergencyModal
                reports={emergencies}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}