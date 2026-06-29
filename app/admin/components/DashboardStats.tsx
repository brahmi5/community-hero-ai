type DashboardStatsProps = {
    total: number;
    critical: number;
    pending: number;
    resolved: number;
};

export default function DashboardStats({
    total,
    critical,
    pending,
    resolved,
}: DashboardStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

            <div className="bg-blue-600 rounded-xl p-6 shadow-lg">
                <h2 className="text-lg font-semibold">📋 Total Reports</h2>
                <p className="text-4xl font-bold mt-3">{total}</p>
            </div>

            <div className="bg-red-600 rounded-xl p-6 shadow-lg">
                <h2 className="text-lg font-semibold">🚨 Critical</h2>
                <p className="text-4xl font-bold mt-3">{critical}</p>
            </div>

            <div className="bg-yellow-500 rounded-xl p-6 shadow-lg">
                <h2 className="text-lg font-semibold">🟡 Pending</h2>
                <p className="text-4xl font-bold mt-3">{pending}</p>
            </div>

            <div className="bg-green-600 rounded-xl p-6 shadow-lg">
                <h2 className="text-lg font-semibold">✅ Resolved</h2>
                <p className="text-4xl font-bold mt-3">{resolved}</p>
            </div>

        </div>
    );
}