import AISummaryCard from "./components/AISummaryCard";
import AnalyticsDashboard from "./AnalyticsDashboard";
import { adminDb } from "@/lib/firebase-admin";
import MapWrapper from "./map/MapWrapper";
import DashboardStats from "./components/DashboardStats";
import FilterBar from "./components/FilterBar";
import ReportsList from "./components/ReportsList";
import AdminGuard from "./AdminGuard";
import LogoutButton from "./components/LogoutButton";
import AnalyticsCharts from "./components/AnalyticsCharts";
import EmergencyAlert from "./components/EmergencyAlert";
export default async function AdminPage({
    searchParams,
}: {
    searchParams: Promise<{
        search?: string;
        status?: string;
        category?: string;
        sort?: string;
    }>;
}) {
    const params = await searchParams;

    const search = params.search?.toLowerCase() ?? "";
    const status = params.status ?? "All";
    const category = params.category ?? "All";
    const sort = params.sort ?? "Newest";

    const snapshot = await adminDb
        .collection("reports")
        .orderBy("createdAt", "desc")
        .get();

    let reports = snapshot.docs
        .map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        .filter((report: any) => {
            const matchesSearch =
                (report.title ?? "").toLowerCase().includes(search) ||
                (report.location ?? "").toLowerCase().includes(search) ||
                (report.category ?? "").toLowerCase().includes(search);

            const matchesStatus =
                status === "All" || report.status === status;

            const matchesCategory =
                category === "All" || report.category === category;

            return matchesSearch && matchesStatus && matchesCategory;
        });

    if (sort === "Priority") {
        reports.sort(
            (a: any, b: any) =>
                (b.priorityScore ?? 0) - (a.priorityScore ?? 0)
        );
    }

    if (sort === "Oldest") {
        reports.reverse();
    }
    const serializedReports = reports.map((report: any) => ({
        ...report,
        createdAt: report.createdAt
            ? report.createdAt.toDate().toISOString()
            : null,
    }));

    const totalReports = reports.length;

    const criticalReports = reports.filter(
        (report: any) => report.severity === "Critical"
    ).length;

    const pendingReports = reports.filter(
        (report: any) => report.status === "Pending"
    ).length;

    const resolvedReports = reports.filter(
        (report: any) => report.status === "Resolved"
    ).length;

    return (
        <main className="min-h-screen bg-black text-white p-10">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">
                    <EmergencyAlert reports={serializedReports} />
                    Community Hero Admin Dashboard
                </h1>

                <LogoutButton />

            </div>

            <FilterBar
                search={search}
                status={status}
                category={category}
                sort={sort}
            />

            <div className="my-8">
                <AnalyticsCharts reports={serializedReports} />
            </div>
            <AISummaryCard />

            <div className="my-8">
                <MapWrapper reports={serializedReports} />
            </div>
            <DashboardStats
                total={totalReports}
                critical={criticalReports}
                pending={pendingReports}
                resolved={resolvedReports}
            />


            <ReportsList
                reports={serializedReports}
            />

        </main>
    );
}