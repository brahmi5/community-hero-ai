"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AdminGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            if (!user) {
                router.replace("/login");
                return;
            }

            const adminRef = doc(db, "admins", user.uid);

            const adminSnap = await getDoc(adminRef);

            if (!adminSnap.exists()) {
                alert("Access denied. Admins only.");
                router.replace("/");
                return;
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                Loading...
            </div>
        );
    }

    return <>{children}</>;
}