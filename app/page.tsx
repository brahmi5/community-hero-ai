import Link from "next/link";
import { adminDb } from "@/lib/firebase-admin";
export default async function HomePage() {
  const snapshot = await adminDb.collection("reports").get();

  const reports = snapshot.docs.map((doc) => doc.data());

  const totalReports = reports.length;

  const resolvedReports = reports.filter(
    (r) => r.status === "Resolved"
  ).length;

  const pendingReports = reports.filter(
    (r) => r.status === "Pending"
  ).length;

  const departments = new Set(
    reports.map((r) => r.department)
  ).size;
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white">

      {/* Hero Section */}

      <section className="max-w-6xl mx-auto px-8 py-24">

        <div className="text-center">

          <h1 className="text-6xl font-extrabold mb-6">
            Community Hero
          </h1>

          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            Empowering smarter cities through AI-powered civic issue management.
          </p>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Report potholes, garbage, water leakage, street lights
            and other civic issues with AI-assisted classification,
            live tracking and municipality dashboard.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">

            <span className="bg-blue-600 px-4 py-2 rounded-full">
              🤖 AI Classification
            </span>

            <span className="bg-green-600 px-4 py-2 rounded-full">
              📍 Live Tracking
            </span>

            <span className="bg-red-600 px-4 py-2 rounded-full">
              🚨 Emergency Alerts
            </span>

            <span className="bg-purple-600 px-4 py-2 rounded-full">
              📊 Smart Analytics
            </span>

          </div>
          <section className="max-w-6xl mx-auto py-20">

            <div className="grid md:grid-cols-4 gap-8">

              <div className="bg-gray-900 rounded-xl p-8 text-center">
                <h2 className="text-5xl font-bold text-blue-500">
                  {totalReports}
                </h2>

                <p className="mt-3 text-gray-300">
                  Reports Submitted
                </p>
              </div>

              <div className="bg-gray-900 rounded-xl p-8 text-center">
                <h2 className="text-5xl font-bold text-green-500">
                  {resolvedReports}
                </h2>

                <p className="mt-3 text-gray-300">
                  Issues Resolved
                </p>
              </div>

              <div className="bg-gray-900 rounded-xl p-8 text-center">
                <h2 className="text-5xl font-bold text-red-500">
                  {pendingReports}
                </h2>

                <p className="mt-3 text-gray-300">
                  Pending Issues
                </p>
              </div>

              <div className="bg-gray-900 rounded-xl p-8 text-center">
                <h2 className="text-5xl font-bold text-yellow-500">
                  {departments}
                </h2>

                <p className="mt-3 text-gray-300">
                  Departments
                </p>
              </div>

            </div>

          </section>
          <div className="flex justify-center gap-6 mt-10">

            <Link
              href="/report"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold"
            >
              Report an Issue
            </Link>

            <Link
              href="/my-reports"
              className="bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-xl font-semibold"
            >
              My Reports
            </Link>
            <Link
              href="/assistant"
              className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl font-semibold"
            >
              🤖 AI Assistant
            </Link>
          </div>

        </div>

      </section>

      {/* How It Works */}

      <section className="max-w-6xl mx-auto px-8 py-16">

        <h2 className="text-4xl font-bold text-center mb-16">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          <div className="bg-gray-900 rounded-xl p-8 text-center">
            <div className="text-5xl mb-5">📷</div>
            <h3 className="text-xl font-bold">
              Upload Image
            </h3>
          </div>

          <div className="bg-gray-900 rounded-xl p-8 text-center">
            <div className="text-5xl mb-5">🤖</div>
            <h3 className="text-xl font-bold">
              AI Analysis
            </h3>
          </div>

          <div className="bg-gray-900 rounded-xl p-8 text-center">
            <div className="text-5xl mb-5">🏛️</div>
            <h3 className="text-xl font-bold">
              Municipality Review
            </h3>
          </div>

          <div className="bg-gray-900 rounded-xl p-8 text-center">
            <div className="text-5xl mb-5">✅</div>
            <h3 className="text-xl font-bold">
              Track Status
            </h3>
          </div>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-6xl mx-auto px-8 py-16">

        <h2 className="text-4xl font-bold text-center mb-16">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-gray-900 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              🤖 AI Classification
            </h3>

            <p className="text-gray-400">
              Gemini AI automatically categorizes issues,
              determines severity and assigns departments.
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              🗺 Live Tracking
            </h3>

            <p className="text-gray-400">
              Monitor reported issues on an interactive map
              with real-time status updates.
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              ☁ Cloud Storage
            </h3>

            <p className="text-gray-400">
              Images are securely stored using Cloudinary
              and linked with each report.
            </p>
          </div>

        </div>

      </section>
      <section className="max-w-5xl mx-auto text-center py-20">

        <h2 className="text-4xl font-bold mb-8">
          Why Community Hero?
        </h2>

        <p className="text-xl text-gray-300 leading-8">

          Community Hero combines Artificial Intelligence,
          real-time reporting, geolocation, analytics,
          and citizen participation to help municipalities
          respond to civic issues faster and more efficiently.

        </p>

      </section>
      <section className="max-w-6xl mx-auto px-8 py-16">

        <h2 className="text-4xl font-bold text-center mb-10">
          Built With
        </h2>

        <div className="flex flex-wrap justify-center gap-4">

          <span className="bg-gray-800 px-5 py-3 rounded-lg">
            Next.js
          </span>

          <span className="bg-gray-800 px-5 py-3 rounded-lg">
            Firebase
          </span>

          <span className="bg-gray-800 px-5 py-3 rounded-lg">
            Gemini AI
          </span>

          <span className="bg-gray-800 px-5 py-3 rounded-lg">
            Cloudinary
          </span>

          <span className="bg-gray-800 px-5 py-3 rounded-lg">
            Leaflet Maps
          </span>

        </div>

      </section>

      {/* Footer */}

      <footer className="border-t border-gray-800 mt-24 py-10">

        <div className="text-center text-gray-400">

          <p className="font-semibold text-white">
            Community Hero
          </p>

          <p className="mt-2">
            AI Powered Civic Issue Reporting Platform
          </p>

          <p className="mt-4">
            © 2026 Brahmi Gangwar
          </p>

        </div>

      </footer>

    </main>
  );
}