"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface MobileActionBarProps {
    onClear: () => void;
    onShare: () => void;
    isSharing?: boolean;
    isValid: boolean;
}

export function MobileActionBar({ onClear, onShare, isSharing, isValid }: MobileActionBarProps) {
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
                    disabled={isSharing}
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
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
                    disabled={isSharing}
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors group disabled:opacity-50"
                >
                    <div className="relative">
                        {isSharing ? (
                            <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                        ) : (
                            <span className="text-xl group-active:scale-125 transition-transform">📤</span>
                        )}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold">
                        {isSharing ? "Wait..." : "Share"}
                    </span>
                </button>
            </div>
        </motion.div>
    );
}
