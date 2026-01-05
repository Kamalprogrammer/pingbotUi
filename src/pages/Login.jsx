import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            axios.post(`${BASE_URL}/api/auth/login`, {
                email: data.email,
                password: data.password
            }, {
                withCredentials: true
            }).then((response) => {
                console.log("Login response:", response);
                navigate("/chat");


            }).catch((error) => {
                console.error("Login error:", error);
            });
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col px-4 py-6 md:py-8">
            {/* Header with Logo and Theme Toggle */}
            <div className="flex items-center justify-between w-full max-w-md mx-auto mb-6 md:mb-8">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                        <span className="text-white font-bold text-lg md:text-xl">P</span>
                    </div>
                    <span className="text-[var(--text-primary)] font-semibold text-lg md:text-xl tracking-tight">PingBot</span>
                </Link>
                <ThemeToggle />
            </div>

            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md">
                    {/* Card */}
                    <div className="bg-[var(--bg-secondary)] rounded-xl md:rounded-2xl border border-[var(--border)] p-6 md:p-8">
                        <div className="text-center mb-6 md:mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-1.5 md:mb-2">Welcome Back</h1>
                            <p className="text-[var(--text-muted)] text-sm md:text-base">Sign in to continue your conversations</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-[var(--text-secondary)] text-sm font-medium mb-1.5 md:mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    className={`w-full px-3.5 py-3 md:px-4 md:py-3.5 bg-[var(--input-bg)] border rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all text-sm md:text-base ${errors.email ? "border-red-500" : "border-[var(--border)]"
                                        }`}
                                    placeholder="you@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-red-500 text-xs md:text-sm">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-[var(--text-secondary)] text-sm font-medium mb-1.5 md:mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                    className={`w-full px-3.5 py-3 md:px-4 md:py-3.5 bg-[var(--input-bg)] border rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all text-sm md:text-base ${errors.password ? "border-red-500" : "border-[var(--border)]"
                                        }`}
                                    placeholder="Enter your password"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-red-500 text-xs md:text-sm">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Forgot Password */}
                            <div className="flex justify-end">
                                <a href="#" className="text-xs md:text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 md:py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg font-semibold text-sm md:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-3 md:gap-4 my-5 md:my-6">
                            <div className="flex-1 h-px bg-[var(--border)]"></div>
                            <span className="text-[var(--text-muted)] text-xs md:text-sm">or</span>
                            <div className="flex-1 h-px bg-[var(--border)]"></div>
                        </div>

                        {/* Register Link */}
                        <p className="text-center text-[var(--text-muted)] text-sm md:text-base">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-[var(--accent)] hover:text-[var(--accent-hover)] font-medium transition-colors">
                                Create one
                            </Link>
                        </p>
                    </div>

                    {/* Back to Home */}
                    <Link to="/" className="flex items-center justify-center gap-2 mt-5 md:mt-6 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm md:text-base">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
