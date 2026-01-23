import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Wand2 } from "lucide-react";
import { useState } from "react";

interface MobileActionBarProps {
    onClear: () => void;
    onShare: () => void;
    onAutofill: (target: number) => void;
    isSharing?: boolean;
    isValid: boolean;
}

export function MobileActionBar({ onClear, onShare, onAutofill, isSharing, isValid }: MobileActionBarProps) {
    const [showAutofillMenu, setShowAutofillMenu] = useState(false);

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

                {/* Autofill / Status Indicator */}
                <div className="relative">
                    <AnimatePresence>
                        {showAutofillMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                animate={{ opacity: 1, y: -80, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#1E1E2A] border border-white/10 rounded-xl p-2 shadow-2xl flex flex-col gap-2 w-32"
                            >
                                <p className="text-[10px] text-center text-gray-500 font-bold uppercase tracking-widest mb-1">Target</p>
                                {[10, 15, 17].map((target) => (
                                    <button
                                        key={target}
                                        onClick={() => {
                                            onAutofill(target);
                                            setShowAutofillMenu(false);
                                        }}
                                        className="w-full py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs font-bold text-white transition-colors"
                                    >
                                        {target}/20
                                    </button>
                                ))}
                                <button
                                    onClick={() => {
                                        const custom = window.prompt("Enter target average (e.g. 14.5):");
                                        if (custom && !isNaN(parseFloat(custom))) {
                                            onAutofill(parseFloat(custom));
                                        }
                                        setShowAutofillMenu(false);
                                    }}
                                    className="w-full py-1.5 rounded bg-blue-500/20 hover:bg-blue-500/30 text-[10px] font-bold text-blue-400 transition-colors uppercase tracking-tighter"
                                >
                                    Custom
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {isValid ? (
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-black bg-green-500/20 text-green-400 border-2 border-green-500/50">
                                ✓
                            </div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                                Validated
                            </span>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowAutofillMenu(!showAutofillMenu)}
                            className="flex flex-col items-center gap-1 group"
                        >
                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-black bg-blue-500/10 text-blue-400 border-2 border-blue-500/30 group-hover:bg-blue-500/20 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                                <Wand2 className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] text-blue-400/70 group-hover:text-blue-400 uppercase tracking-widest font-bold transition-colors">
                                Autofill
                            </span>
                        </button>
                    )}
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
