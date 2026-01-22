"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface QuantumGridBackgroundProps extends React.HTMLProps<HTMLDivElement> {
    children: ReactNode;
}

export const QuantumGridBackground = ({
    className,
    children,
    ...props
}: QuantumGridBackgroundProps) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const orbX = useSpring(mouseX, springConfig);
    const orbY = useSpring(mouseY, springConfig);

    const orb2X = useSpring(mouseX, { ...springConfig, damping: 50 }); // Slower/heavier
    const orb2Y = useSpring(mouseY, { ...springConfig, damping: 50 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Center the coordinate system
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            mouseX.set(e.clientX - centerX);
            mouseY.set(e.clientY - centerY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <main className="relative min-h-screen w-full bg-[#050508] overflow-hidden">

            {/* 3D Grid Container */}
            <div className="absolute inset-0 z-0 overflow-hidden perspective-[1000px]">
                {/* The Grid Plane */}
                <div
                    className="absolute inset-0 w-[200vw] h-[200vh] -ml-[50vw] -mt-[50vh] origin-bottom transform-gpu"
                    style={{
                        transform: "rotateX(60deg) translateY(-100px) translateZ(-200px)",
                        backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                `,
                        backgroundSize: "60px 60px",
                        maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
                        animation: "grid-flight 20s linear infinite",
                    }}
                />

                {/* Horizon Glow */}
                <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-b from-[#050508] via-[#050508] to-transparent z-10 pointer-events-none" />

                {/* Interactive Orbs */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    {/* Primary Tracker Orb */}
                    <motion.div
                        style={{ x: orbX, y: orbY }}
                        className="w-[400px] h-[400px] bg-purple-600/20 blur-[100px] rounded-full mix-blend-screen opacity-50 absolute"
                    />
                    {/* Secondary Lagging Orb */}
                    <motion.div
                        style={{ x: orb2X, y: orb2Y }}
                        className="w-[300px] h-[300px] bg-blue-500/15 blur-[80px] rounded-full mix-blend-screen opacity-40 absolute translate-x-10 translate-y-10"
                    />
                    {/* Mouse Spotlight (Sharp) */}
                    <motion.div
                        style={{ x: mouseX, y: mouseY }}
                        className="w-[50px] h-[50px] bg-white/5 blur-[20px] rounded-full mix-blend-soft-light absolute z-10"
                    />
                </div>

                {/* Static decorative spots */}
                <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-purple-900/5 blur-[120px] rounded-full z-0 pointer-events-none mix-blend-screen opacity-20" />
            </div>

            {/* Content Container */}
            <div
                className={cn(
                    "relative z-10 h-screen overflow-hidden",
                    className
                )}
                {...props}
            >
                {children}
            </div>

            <style jsx>{`
        @keyframes grid-flight {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 0px 60px;
          }
        }
      `}</style>
        </main>
    );
};
