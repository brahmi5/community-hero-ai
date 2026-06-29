"use client";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";

export default function ReportMap({
    reports,
}: {
    reports: any[];
}) {
    return (
        <MapContainer
            center={[30.967, 76.473]}
            zoom={12}
            style={{
                height: "500px",
                width: "100%",
                borderRadius: "12px",
            }}
        >
            <TileLayer
                attribution="© OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {reports.map((report) => {
                if (!report.latitude || !report.longitude) return null;

                return (
                    <Marker
                        key={report.id}
                        position={[
                            report.latitude,
                            report.longitude,
                        ]}
                    >
                        <Popup>
                            <div className="w-64">

                                {report.imageUrl && (
                                    <img
                                        src={report.imageUrl}
                                        alt={report.title}
                                        className="rounded-xl mb-3 w-full h-36 object-cover"
                                    />
                                )}

                                <h3 className="text-lg font-bold mb-2">
                                    {report.title}
                                </h3>

                                <p className="text-sm text-gray-700 mb-3">
                                    {report.description}
                                </p>

                                <p>
                                    📍 {report.location}
                                </p>
                                <p>
                                    🏷 {report.category}
                                </p>

                                <p>
                                    🚨 {report.severity}
                                </p>

                                <p className="font-semibold">
                                    ⭐ Priority: {report.priorityScore}
                                </p>
                                <p
                                    className={`inline-block px-2 py-1 rounded text-white mt-2 ${report.status === "Resolved"
                                        ? "bg-green-600"
                                        : report.status === "Assigned"
                                            ? "bg-blue-600"
                                            : report.status === "In Progress"
                                                ? "bg-orange-500"
                                                : "bg-yellow-500"
                                        }`}
                                >
                                    {report.status}
                                </p>
                                <p>
                                    🏢 {report.department}
                                </p>

                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}