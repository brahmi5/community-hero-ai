"use client";

import dynamic from "next/dynamic";

const ReportMap = dynamic(
    () => import("./ReportMap"),
    { ssr: false }
);

export default function MapWrapper({
    reports,
}: {
    reports: any[];
}) {
    return <ReportMap reports={reports} />;
}