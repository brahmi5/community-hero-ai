import CategoryChart from "./charts/CategoryChart";
import StatusChart from "./charts/StatusChart";

type Props = {
    reports: any[];
};

export default function AnalyticsDashboard({
    reports,
}: Props) {

    return (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

            <div className="bg-white rounded-xl p-6">

                <h2 className="text-black text-2xl font-bold mb-4">
                    Reports by Category
                </h2>

                <CategoryChart
                    reports={reports}
                />

            </div>

            <div className="bg-white rounded-xl p-6">

                <h2 className="text-black text-2xl font-bold mb-4">
                    Reports by Status
                </h2>

                <StatusChart
                    reports={reports}
                />

            </div>

        </div>

    );
}