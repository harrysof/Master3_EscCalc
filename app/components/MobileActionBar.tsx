"use client";

import { motion } from "framer-motion";

interface MobileActionBarProps {
    onClear: () => void;
    onShare: () => void;
    isValid: boolean;
}

export function MobileActionBar({ onClear, onShare, isValid }: MobileActionBarProps) {
    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        >
            <div className="bg-black/80 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex items-center justify-around gap-4">
                {/* Clear Button */}
                <button
                    onClick={onClear}
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-400 transition-colors"
                >
                    <span className="text-xl">🗑️</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold">Clear</span>
                </button>

                {/* Status Indicator */}
                <div className="flex flex-col items-center gap-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-black ${isValid
                            ? "bg-green-500/20 text-green-400 border-2 border-green-500/50"
                            : "bg-red-500/20 text-red-400 border-2 border-red-500/50"
                        }`}>
                        {isValid ? "✓" : "✗"}
                    </div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                        {isValid ? "Validated" : "Not Yet"}
                    </span>
                </div>

                {/* Share Button */}
                <button
                    onClick={onShare}
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
                >
                    <span className="text-xl">📤</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold">Share</span>
                </button>
            </div>
        </motion.div>
    );
}
