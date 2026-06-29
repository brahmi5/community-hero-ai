import { updateStatus } from "../actions";
import Image from "next/image";

type Report = {
    id: string;
    title?: string;
    description?: string;
    location?: string;
    imageUrl?: string;
    category?: string;
    severity?: string;
    department?: string;
    priorityScore?: number;
    status?: string;
};

type ReportCardProps = {
    report: Report;
};

export default function ReportCard({ report }: ReportCardProps) {
    return (
        <div className="border border-gray-700 rounded-xl p-6">
            {report.imageUrl && (
                <Image
                    src={report.imageUrl}
                    alt={report.title || "Report Image"}
                    width={800}
                    height={500}
                    className="w-full h-72 object-cover rounded-xl mb-5"
                />
            )}
            <h2 className="text-2xl font-bold">
                {report.title}
            </h2>

            <p>{report.description}</p>

            <div className="mt-4 space-y-2">

                <p>
                    📍 <b>Location:</b> {report.location}
                </p>

                <p>
                    📂 <b>Category:</b> {report.category}
                </p>

                <p>
                    🚨 <b>Severity:</b> {report.severity}
                </p>

                <p>
                    🏢 <b>Department:</b> {report.department}
                </p>

                <p>
                    ⭐ <b>Priority:</b> {report.priorityScore}
                </p>

                <p>
                    ✅ <b>Status:</b> {report.status}
                </p>

                <div className="flex gap-3 mt-4 flex-wrap">

                    <form
                        action={async () => {
                            "use server";
                            await updateStatus(report.id, "Assigned");
                        }}
                    >
                        <button className="bg-blue-600 px-3 py-2 rounded">
                            Assign
                        </button>
                    </form>

                    <form
                        action={async () => {
                            "use server";
                            await updateStatus(report.id, "In Progress");
                        }}
                    >
                        <button className="bg-yellow-500 px-3 py-2 rounded">
                            In Progress
                        </button>
                    </form>

                    <form
                        action={async () => {
                            "use server";
                            await updateStatus(report.id, "Resolved");
                        }}
                    >
                        <button className="bg-green-600 px-3 py-2 rounded">
                            Resolved
                        </button>
                    </form>

                </div>

            </div>
        </div>
    );
}