"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

type Props = {
    reports: any[];
};

export default function StatusChart({
    reports,
}: Props) {

    const counts: Record<string, number> = {};

    reports.forEach((report) => {

        const status =
            report.status ?? "Unknown";

        counts[status] =
            (counts[status] || 0) + 1;

    });

    const data = {

        labels: Object.keys(counts),
        datasets: [
            {
                label: "Reports",
                data: Object.values(counts),
                backgroundColor: [
                    "#3B82F6",
                    "#FACC15",
                    "#FB923C",
                    "#22C55E",
                ],
                borderRadius: 10,
            },
        ],
    };

    return <Bar data={data} />;
}