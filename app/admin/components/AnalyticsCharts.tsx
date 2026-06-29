"use client";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
];

type Report = {
    category?: string;
    status?: string;
};

export default function AnalyticsCharts({
    reports,
}: {
    reports: Report[];
}) {

    const categoryMap: Record<string, number> = {};
    const statusMap: Record<string, number> = {};

    reports.forEach((report) => {
        const category = report.category || "Unknown";
        categoryMap[category] = (categoryMap[category] || 0) + 1;

        const status = report.status || "Unknown";
        statusMap[status] = (statusMap[status] || 0) + 1;
    });

    const categoryData = Object.entries(categoryMap).map(
        ([name, value]) => ({
            name,
            value,
        })
    );

    const statusData = Object.entries(statusMap).map(
        ([name, value]) => ({
            name,
            value,
        })
    );

    return (
        <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-gray-900 rounded-xl p-6">

                <h2 className="text-2xl font-bold mb-6">
                    Reports by Category
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={categoryData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            label
                        >
                            {categoryData.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>

            </div>

            <div className="bg-gray-900 rounded-xl p-6">

                <h2 className="text-2xl font-bold mb-6">
                    Reports by Status
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={statusData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>

            </div>

        </div>
    );
}