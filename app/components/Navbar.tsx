"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            if (!user) {
                setLoggedIn(false);
                setIsAdmin(false);
                return;
            }

            setLoggedIn(true);

            try {

                const adminRef = doc(db, "admins", user.uid);

                const adminSnap = await getDoc(adminRef);

                setIsAdmin(adminSnap.exists());

            } catch {

                setIsAdmin(false);

            }

        });

        return unsubscribe;

    }, []);

    async function handleLogout() {
        await signOut(auth);
        router.push("/login");
    }

    const navLink = (href: string, label: string) => (
        <Link
            href={href}
            className={`transition ${pathname === href
                ? "text-blue-400 font-semibold"
                : "text-white hover:text-blue-400"
                }`}
        >
            {label}
        </Link>
    );

    return (
        <nav className="bg-gray-900 border-b border-gray-800">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

                <Link
                    href="/"
                    className="text-2xl font-bold text-white"
                >
                    Community Hero
                </Link>

                <div className="flex gap-8 items-center">

                    {navLink("/", "Home")}
                    {navLink("/report", "Report")}
                    {loggedIn && navLink("/my-reports", "My Reports")}
                    {isAdmin && navLink("/admin", "Admin")}

                    {loggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link href="/login" className="hover:text-blue-400">
                                Login
                            </Link>

                            <Link href="/register" className="hover:text-blue-400">
                                Register
                            </Link>
                            <Link
                                href="/assistant"
                                className="hover:text-blue-400 transition"
                            >
                                AI Assistant
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </nav>
    );
}