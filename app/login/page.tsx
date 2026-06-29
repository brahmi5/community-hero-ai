"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase";

import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            alert("Login Successful!");

            router.push("/admin");
        } catch (err: any) {
            alert(err.message);
        }
    }

    async function handleGoogleLogin() {
        try {
            const provider = new GoogleAuthProvider();

            await signInWithPopup(auth, provider);

            router.push("/admin");
        } catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-[400px]">

                <h1 className="text-3xl font-bold text-center text-white mb-8">
                    Community Hero
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-lg mb-4 text-white bg-gray-700 placeholder:text-gray-400"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-lg mb-6 text-white bg-gray-700 placeholder:text-gray-400"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 py-3 rounded-lg text-white font-semibold"
                >
                    Login
                </button>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-red-600 py-3 rounded-lg text-white font-semibold mt-3"
                >
                    Continue with Google
                </button>

                <div className="mt-4 text-center text-gray-300">
                    Don't have an account?

                    <a
                        href="/register"
                        className="text-blue-400 ml-2"
                    >
                        Register
                    </a>
                </div>

            </div>
        </main>
    );
}