"use client";

type Report = {
    id?: string;
    title?: string;
    location?: string;
    department?: string;
    priorityScore?: number;
};

export default function EmergencyModal({
    reports,
    open,
    onClose,
}: {
    reports: Report[];
    open: boolean;
    onClose: () => void;
}) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="bg-gray-900 w-[700px] max-h-[80vh] overflow-y-auto rounded-2xl p-8">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-xl font-bold text-white">
                        🚨 Emergency Reports
                    </h2>

                    <button
                        onClick={onClose}
                        className="bg-red-600 px-3 py-1 rounded-lg text-sm text-white"
                    >
                        Close
                    </button>

                </div>

                <div className="space-y-5">

                    {reports.map((report, index) => (

                        <div
                            key={index}
                            className="border border-red-500 rounded-lg p-3 text-white"
                        >

                            <h3 className="text-base font-semibold">
                                {report.title}
                            </h3>

                            <p className="text-sm">📍 {report.location}</p>

                            <p className="text-sm">🏢 {report.department}</p>

                            <p className="text-sm">⭐ Priority: {report.priorityScore}</p>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}