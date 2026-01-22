"use client";

import { cn } from "@/lib/utils";

interface ProgressRingProps {
    value: number; // 0-20 scale
    max?: number;
    size?: number;
    strokeWidth?: number;
    className?: string;
}

export function ProgressRing({
    value,
    max = 20,
    size = 120,
    strokeWidth = 8,
    className
}: ProgressRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progress = Math.min(value / max, 1);
    const strokeDashoffset = circumference - (progress * circumference);

    const getColor = () => {
        if (value >= 15) return { stroke: "#60a5fa", glow: "rgba(96,165,250,0.5)" }; // Blue
        if (value >= 10) return { stroke: "#4ade80", glow: "rgba(74,222,128,0.5)" }; // Green
        if (value >= 5) return { stroke: "#a855f7", glow: "rgba(168,85,247,0.3)" }; // Purple
        return { stroke: "#ef4444", glow: "rgba(239,68,68,0.5)" }; // Red
    };

    const colors = getColor();

    return (
        <div className={cn("relative inline-flex items-center justify-center", className)}>
            <svg
                width={size}
                height={size}
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#2C2C3E"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={colors.stroke}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{
                        transition: "stroke-dashoffset 0.5s ease-out, stroke 0.3s ease",
                        filter: `drop-shadow(0 0 10px ${colors.glow})`
                    }}
                />
            </svg>
            {/* Center value */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                    className="text-3xl font-black font-mono transition-colors duration-300"
                    style={{ color: colors.stroke }}
                >
                    {value.toFixed(2)}
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">/ 20</span>
            </div>
        </div>
    );
}
