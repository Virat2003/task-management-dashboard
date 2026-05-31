"use client";

import StatCard from "@/components/dashboard/StatCard";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardPage() {
    const pathname = usePathname();

    const tasks = useSelector((state: RootState) => state.tasks);
    const members = useSelector((state: RootState) => state.members);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === "Completed").length;
    const pendingTasks = tasks.filter((task) => task.status !== "Completed").length;
    const totalMembers = members.length;


    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkClass = (href: string) =>
        `px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
            pathname === href
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`;

    const mobileNavLinkClass = (href: string) =>
        `block px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
            pathname === href
                ? "bg-blue-600 text-white"
                : "text-slate-700 hover:bg-slate-100"
        }`;

    const completionRate = Math.round((completedTasks / totalTasks) * 100) || 0;

    return (
        <div className="min-h-screen flex flex-col md:flex-row">

            <header className="md:hidden bg-slate-900 text-white sticky top-0 z-50">
                <div className="px-4 py-3 flex items-center justify-between">
                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <span className="text-lg font-bold">Task Manager</span>
                    </div>

                    {/* Hamburger / X button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile dropdown menu */}
                {isMenuOpen && (
                    <div className="border-t border-slate-700 px-4 py-3 bg-white flex flex-col gap-1">
                        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass("/dashboard")}>
                            Dashboard
                        </Link>
                        <Link href="/dashboard/tasks" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass("/dashboard/tasks")}>
                            Tasks
                        </Link>
                        <Link href="/dashboard/team" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass("/dashboard/team")}>
                            Team Members
                        </Link>
                    </div>
                )}
            </header>


            <aside className="hidden md:flex md:flex-col w-64 bg-slate-900 text-white p-6 shrink-0 min-h-screen">
                {/* Brand */}
                <div className="flex items-center gap-3 border-b border-slate-700 pb-5">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold">Task Manager</h2>
                </div>

                {/* Nav links with icons */}
                <nav className="mt-6 flex flex-col gap-1">
                    <Link href="/dashboard" className={navLinkClass("/dashboard")}>
                        {/* Dashboard icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                    </Link>

                    <Link href="/dashboard/tasks" className={navLinkClass("/dashboard/tasks")}>
                        {/* Tasks icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 12l2 2 4-4" />
                        </svg>
                        Tasks
                    </Link>

                    <Link href="/dashboard/team" className={navLinkClass("/dashboard/team")}>
                        {/* Team icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Team Members
                    </Link>
                </nav>
            </aside>

            <main className="flex-1 p-4 md:p-6 bg-slate-50 min-h-screen">

                {/* Page heading + greeting */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                        Dashboard
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Here's what's happening with your tasks today.
                    </p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    <StatCard title="Total Tasks" value={totalTasks} />
                    <StatCard title="Completed Tasks" value={completedTasks} />
                    <StatCard title="Pending Tasks" value={pendingTasks} />
                    <StatCard title="Team Members" value={totalMembers} />
                </div>

              
            </main>
        </div>
    );
}