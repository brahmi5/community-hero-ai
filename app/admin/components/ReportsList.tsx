import ReportCard from "./ReportCard";

type ReportsListProps = {
    reports: any[];
};

export default function ReportsList({
    reports,
}: ReportsListProps) {
    if (reports.length === 0) {
        return (
            <div className="text-center text-gray-400 py-12 text-xl">
                🚫 No reports found.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {reports.map((report) => (
                <ReportCard
                    key={report.id}
                    report={report}
                />
            ))}
        </div>
    );
}