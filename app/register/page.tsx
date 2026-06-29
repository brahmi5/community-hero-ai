"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase";

import {
    createUserWithEmailAndPassword,
} from "firebase/auth";

export default function RegisterPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister() {
        try {
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            alert("Registration Successful!");

            router.push("/login");
        } catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-[400px]">

                <h1 className="text-3xl font-bold text-center text-white mb-8">
                    Register
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-lg mb-4 text-white bg-gray-700"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-lg mb-6 text-white bg-gray-700"
                />

                <button
                    onClick={handleRegister}
                    className="w-full bg-green-600 py-3 rounded-lg text-white font-semibold"
                >
                    Register
                </button>

            </div>
        </main>
    );
}