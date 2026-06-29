"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        try {
            await signOut(auth);
            router.replace("/login");
        } catch (error) {
            console.error(error);
            alert("Logout failed");
        }
    }

    return (
        <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold"
        >
            Logout
        </button>
    );
}