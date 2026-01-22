"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function GithubPFP() {
    const playGlassSound = () => {
        try {
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = "sine";
            // High frequency for a "glassy" ping
            oscillator.frequency.setValueAtTime(2500, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.2);
        } catch (e) {
            console.error("Audio error", e);
        }
    };

    const handleClick = () => {
        playGlassSound();
        // Delay slightly to let the sound play before navigating/opening
        setTimeout(() => {
            window.open("https://github.com/harrysof", "_blank");
        }, 100);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
            onClick={handleClick}
            className="absolute top-6 right-6 z-[100] cursor-pointer"
            style={{ isolation: 'isolate' }} // Prevents z-index/overflow issues in some browsers
        >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 group">

                {/* The "Border" - Blurred version of the image */}
                <div className="absolute inset-0 rounded-full overflow-hidden blur-[2px] opacity-80 scale-105">
                    <Image
                        src="/pfp.jpg"
                        alt="Border"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* The Main Frame */}
                <div className="absolute inset-[2px] rounded-full overflow-hidden shadow-2xl z-10"
                    style={{ isolation: 'isolate', WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>

                    {/* Glass Effects */}
                    <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-br from-white/20 via-transparent to-black/30" />
                    <div className="absolute inset-0 z-40 pointer-events-none group-hover:animate-shine bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-[-25deg]" />

                    {/* Sharp Image */}
                    <Image
                        src="/pfp.jpg"
                        alt="Harrysof Github"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-125"
                        priority
                    />
                </div>

                {/* Outer definition ring (thin) */}
                <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none z-20" />
            </div>

            {/* Tooltip or Label - Glassy variant */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 right-0 bg-white/10 backdrop-blur-xl px-2 py-1 rounded text-[10px] text-white font-black whitespace-nowrap pointer-events-none border border-white/20 shadow-xl tracking-tighter"
            >
                @harrysof
            </motion.div>
        </motion.div>
    );
}
