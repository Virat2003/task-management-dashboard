"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { forgotPasswordSchema } from "@/lib/schemas/authSchemas";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        const result = forgotPasswordSchema.safeParse({
            email,
        });

        if (!result.success) {
            toast.error(
                result.error.issues[0].message
            );
            return;
        }

        try {
            toast.success("Password reset link sent!");
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">
                    Forgot Password
                </h1>

                <p className="text-slate-500 mb-6">
                    Enter your email to receive a password reset link.
                </p>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border text-black border-slate-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
                >
                    Send Reset Link
                </button>
            </div>
        </div>
    );
}