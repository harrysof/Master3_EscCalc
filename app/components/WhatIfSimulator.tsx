"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface WhatIfSimulatorProps {
    isOpen: boolean;
    onToggle: () => void;
    target: number;
    onTargetChange: (val: number) => void;
    gap: number;
}

export function WhatIfSimulator({ isOpen, onToggle, target, onTargetChange, gap }: WhatIfSimulatorProps) {
    return (
        <div className="bg-black/20 backdrop-blur-md border border-white/5 rounded-xl p-4 mt-4 overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-widest text-purple-300 hover:text-purple-200 transition-colors"
            >
                <span className="flex items-center gap-2">
                    🔮 What-If Simulator
                </span>
                <span>{isOpen ? "Hide" : "Show"}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pt-4 space-y-3"
                    >
                        <div className="flex items-center gap-4">
                            <label className="text-gray-400 text-xs">Target Average:</label>
                            <input
                                type="number"
                                value={target}
                                onChange={(e) => onTargetChange(parseFloat(e.target.value) || 0)}
                                className="bg-black/30 border border-purple-500/30 rounded px-2 py-1 text-white font-mono text-sm w-20 text-center focus:outline-none focus:border-purple-500"
                                step="0.5"
                                min="10"
                                max="20"
                            />
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            {gap <= 0 ? (
                                <p className="text-green-400 text-xs">
                                    🎉 You have already reached this target!
                                </p>
                            ) : (
                                <p className="text-gray-300 text-xs leading-relaxed">
                                    You need <span className="text-purple-400 font-bold">{gap.toFixed(2)}</span> more weighted points.
                                    <br />
                                    <span className="opacity-50 text-[10px]">Tip: Increase your grades in high-coefficient modules.</span>
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
