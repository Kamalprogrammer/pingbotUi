import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-4 py-4 md:px-8 md:py-5 border-b border-[var(--border)]">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                        <span className="text-white font-bold text-lg md:text-xl">P</span>
                    </div>
                    <span className="text-[var(--text-primary)] font-semibold text-lg md:text-xl tracking-tight">PingBot</span>
                </Link>
                <div className="flex items-center gap-2 md:gap-4">
                    <ThemeToggle />
                    <Link
                        to="/login"
                        className="px-3 py-2 md:px-5 md:py-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium text-sm md:text-base"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="px-4 py-2 md:px-5 md:py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg font-medium transition-all text-sm md:text-base"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 flex items-center justify-center px-4 py-12 md:px-8 md:py-16">
                <div className="w-full max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] mb-6 md:mb-8">
                        <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"></span>
                        <span className="text-[var(--text-secondary)] text-xs md:text-sm font-medium">Powered by AI</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4 md:mb-6 leading-tight">
                        Just Ask Whatever
                        <br className="hidden sm:block" />
                        <span className="text-[var(--text-secondary)]"> You Want</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-sm sm:text-base md:text-lg text-[var(--text-muted)] mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed px-2">
                        Experience the next generation of AI-powered conversations. Get instant, intelligent responses with memory that understands your context.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                        <Link
                            to="/chat"
                            className="w-full sm:w-auto group px-6 py-3 md:px-8 md:py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg font-semibold text-base md:text-lg transition-all flex items-center justify-center gap-2"
                        >
                            Start Chatting
                            <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                        <Link
                            to="/login"
                            className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-[var(--bg-secondary)] hover:bg-[var(--border)] text-[var(--text-primary)] rounded-lg font-semibold text-base md:text-lg transition-all border border-[var(--border)]"
                        >
                            Sign In
                        </Link>
                    </div>

                    {/* Features */}
                    <div className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                        <div className="p-5 md:p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-3 md:mb-4 mx-auto">
                                <svg className="w-5 h-5 md:w-6 md:h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-[var(--text-primary)] font-semibold text-base md:text-lg mb-1.5 md:mb-2">Instant Responses</h3>
                            <p className="text-[var(--text-muted)] text-xs md:text-sm">Lightning-fast AI responses powered by advanced models</p>
                        </div>
                        <div className="p-5 md:p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-3 md:mb-4 mx-auto">
                                <svg className="w-5 h-5 md:w-6 md:h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-[var(--text-primary)] font-semibold text-base md:text-lg mb-1.5 md:mb-2">Smart Memory</h3>
                            <p className="text-[var(--text-muted)] text-xs md:text-sm">Context-aware conversations that remember you</p>
                        </div>
                        <div className="p-5 md:p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-3 md:mb-4 mx-auto">
                                <svg className="w-5 h-5 md:w-6 md:h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-[var(--text-primary)] font-semibold text-base md:text-lg mb-1.5 md:mb-2">Secure & Private</h3>
                            <p className="text-[var(--text-muted)] text-xs md:text-sm">Your conversations are encrypted and protected</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="px-4 py-4 md:px-8 md:py-6 text-center text-[var(--text-muted)] text-xs md:text-sm border-t border-[var(--border)]">
                © 2026 PingBot. All rights reserved.
            </footer>
        </div>
    );
}
