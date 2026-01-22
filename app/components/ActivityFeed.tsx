"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Branch } from "@/app/data";

interface Activity {
    id: string;
    role: string;
    userId: string;
    message: string;
    timestamp: string;
    color: string;
}

interface ActivityFeedProps {
    currentAverage: number;
    selectedBranch: Branch;
    validAverage: boolean;
}

export function ActivityFeed({ currentAverage, selectedBranch, validAverage }: ActivityFeedProps) {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [localUserId, setLocalUserId] = useState<string>("");

    // Naming Personas Logic
    const getPersona = (role: string, id: string) => {
        const adjectives = [
            "The Strategic", "The Savvy", "The Diligent", "The Precise",
            "The Visionary", "The Analytic", "The Bold", "The Sharp",
            "The Elite", "The Master", "The Swift", "The Wise"
        ];
        // Simple hash from ID string
        const seed = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const adjective = adjectives[seed % adjectives.length];
        return `${adjective} ${role}`;
    };

    // Grade Adjectives Logic
    const getAdjectiveValue = (grade: number) => {
        if (grade < 5) return "embarrassing 🙈";
        if (grade < 10) return "tough 😬";
        if (grade < 12) return "fine 😐";
        if (grade < 14) return "good 🙂";
        if (grade < 16) return "great 🚀";
        return "amazing 🦁";
    };

    // Initialize User & Feed History
    useEffect(() => {
        let storedId = localStorage.getItem("esc_user_id");
        if (!storedId) {
            storedId = Math.floor(Math.random() * 9000) + 1000 + "";
            localStorage.setItem("esc_user_id", storedId);
        }
        setLocalUserId(storedId);

        // Load persisted history
        const storedHistory = localStorage.getItem("esc_feed_history");
        if (storedHistory) {
            setActivities(JSON.parse(storedHistory));
        }
    }, []);

    // Effect to add "Self" post when grade changes significantly (throttled)
    const prevAverage = useRef(currentAverage);
    useEffect(() => {
        if (currentAverage === 0 || currentAverage === prevAverage.current) return;

        const timeout = setTimeout(() => {
            // Check for returning user Easter Egg
            const bestGrade = parseFloat(localStorage.getItem("esc_best_grade") || "0");
            let message = `got a ${getAdjectiveValue(currentAverage)} grade (${currentAverage.toFixed(2)})`;

            if (bestGrade > 0 && currentAverage < bestGrade - 2) {
                message = `returned to get a WORST grade 📉 (${currentAverage.toFixed(2)})`;
            }

            // Update best grade
            if (currentAverage > bestGrade) {
                localStorage.setItem("esc_best_grade", currentAverage.toString());
            }

            const newActivity: Activity = {
                id: crypto.randomUUID(),
                role: selectedBranch.role || "User",
                userId: localUserId,
                message: message,
                timestamp: "Just now",
                color: "#4ade80",
            };

            setActivities((prev) => {
                const updated = [newActivity, ...prev].slice(0, 10); // Keep last 10
                localStorage.setItem("esc_feed_history", JSON.stringify(updated));
                return updated;
            });

        }, 30000); // Debounce 30s as requested

        prevAverage.current = currentAverage;
        return () => clearTimeout(timeout);
    }, [currentAverage, selectedBranch, localUserId]);

    return (
        <div className="w-full mt-8">
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-4 text-center">
                Recent Activity
            </h3>
            <div className="flex flex-col gap-2 max-h-[300px] overflow-hidden relative">
                <AnimatePresence initial={false}>
                    {activities.length === 0 && (
                        <p className="text-gray-600 text-[10px] text-center italic py-4">No recent history...</p>
                    )}
                    {activities.map((activity) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, height: 0, x: -20 }}
                            animate={{ opacity: 1, height: "auto", x: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-black/20 backdrop-blur-md border border-white/5 p-3 rounded-xl flex items-start gap-3"
                        >
                            <div className="w-8 h-8 flex-shrink-0 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black text-white/50 mt-0.5 border border-white/5 uppercase">
                                {activity.role.slice(0, 2)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm text-gray-400 break-words whitespace-normal leading-relaxed">
                                    <span className="font-bold text-white mr-1 block sm:inline">
                                        {getPersona(activity.role, activity.userId)}
                                        {activity.userId === localUserId && <span className="ml-1 text-[9px] text-green-500/80 font-black tracking-widest uppercase">(You)</span>}
                                    </span>
                                    {activity.message}
                                </p>
                            </div>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 shadow-[0_0_8px_#4ade8055] mt-2 flex-shrink-0" />
                        </motion.div>
                    ))}
                </AnimatePresence>
                {/* Fade out bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/0 to-transparent pointer-events-none" />
            </div>
        </div>
    );
}
