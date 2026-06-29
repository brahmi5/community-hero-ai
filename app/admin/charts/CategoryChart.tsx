"use client";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

type Props = {
    reports: any[];
};

export default function CategoryChart({
    reports,
}: Props) {

    const counts: Record<string, number> = {};

    reports.forEach((report) => {
        const category = report.category ?? "Unknown";

        counts[category] =
            (counts[category] || 0) + 1;
    });

    const data = {
        labels: Object.keys(counts),

        datasets: [
            {
                label: "Reports",
                data: Object.values(counts),
                backgroundColor: [
                    "#3B82F6",
                    "#22C55E",
                    "#F59E0B",
                    "#EF4444",
                    "#A855F7",
                    "#06B6D4",
                ],
                borderColor: "#ffffff",
                borderWidth: 2,
            },
        ],
    };

    return <Pie data={data} />;
}