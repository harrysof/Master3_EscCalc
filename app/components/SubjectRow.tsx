
import { Subject } from "@/app/data";
import { cn } from "@/lib/utils";
import { AnimatedNumber } from "./AnimatedNumber";

interface SubjectRowProps {
    subject: Subject;
    exam: number;
    td: number;
    moduleAvg: number;
    onUpdate: (type: "exam" | "td", value: number) => void;
    isSimulationMode?: boolean;
    suggestedAvg?: number;
}

export function SubjectRow({ subject, exam, td, moduleAvg, onUpdate, isSimulationMode, suggestedAvg }: SubjectRowProps) {
    const getAvgColor = (avg: number) => {
        if (avg >= 15) return "text-blue-400 md:drop-shadow-[0_0_15px_rgba(96,165,250,0.8)]";
        if (avg >= 10) return "text-green-400 md:drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]";
        if (avg >= 5) return "text-purple-400";
        return "text-red-500 animate-[pulse_1s_ease-in-out_infinite] font-black md:drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]";
    };

    const getInputBorderColor = (value: number) => {
        if (value === 0) return "border-[#3A3A5A]"; // Neutral
        if (value >= 10) return "border-green-500/50 md:shadow-[0_0_8px_rgba(74,222,128,0.3)]";
        if (value >= 5) return "border-yellow-500/50";
        return "border-red-500/50 md:shadow-[0_0_8px_rgba(239,68,68,0.3)]";
    };

    const getRiskBarWidth = () => {
        return Math.min(100, (moduleAvg / 20) * 100);
    };

    const getRiskBarColor = () => {
        if (moduleAvg >= 15) return "bg-blue-500";
        if (moduleAvg >= 10) return "bg-green-500";
        if (moduleAvg >= 5) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div className="group bg-[#1E1E2A]/50 hover:bg-[#1E1E2A] border border-[#3A3A5A]/50 hover:border-[#3A3A5A] rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 mb-1 flex-1 min-w-0">
                        <h3 className="text-gray-200 font-medium text-sm sm:text-base truncate">{subject.name}</h3>
                        <div className="bg-[#2C2C3E] border border-[#3A3A5A] rounded px-1.5 py-0.5 flex items-center gap-1 shadow-sm flex-shrink-0">
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Coef</span>
                            <span className="text-xs text-white font-bold">{subject.coef}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="flex-1 sm:flex-none relative">
                            <label className="block text-xs text-gray-500 mb-1 ml-1">Examen</label>
                            <input
                                type="number"
                                min="0"
                                max="20"
                                step="0.05"
                                value={exam || ""}
                                placeholder={isSimulationMode && exam === 0 && suggestedAvg ? suggestedAvg.toFixed(2) : "0"}
                                onChange={(e) => onUpdate("exam", parseFloat(e.target.value) || 0)}
                                className={cn(
                                    "w-full sm:w-20 bg-[#121218] border-2 rounded-lg px-3 py-2 text-sm text-center text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all duration-300",
                                    isSimulationMode && exam === 0 && suggestedAvg ? "placeholder-purple-500/50 border-purple-500/30" : getInputBorderColor(exam)
                                )}
                            />
                        </div>
                        <div className="flex-1 sm:flex-none relative">
                            <label className="block text-xs text-gray-500 mb-1 ml-1">TD</label>
                            <input
                                type="number"
                                min="0"
                                max="20"
                                step="0.05"
                                value={td || ""}
                                placeholder={isSimulationMode && td === 0 && suggestedAvg ? suggestedAvg.toFixed(2) : "0"}
                                onChange={(e) => onUpdate("td", parseFloat(e.target.value) || 0)}
                                className={cn(
                                    "w-full sm:w-20 bg-[#121218] border-2 rounded-lg px-3 py-2 text-sm text-center text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all duration-300",
                                    isSimulationMode && td === 0 && suggestedAvg ? "placeholder-purple-500/50 border-purple-500/30" : getInputBorderColor(td)
                                )}
                            />
                        </div>

                        <div className="w-[1px] h-10 bg-[#3A3A5A] mx-1 hidden sm:block" />

                        <div className="flex-1 sm:flex-none flex flex-col items-center sm:items-end min-w-[70px]">
                            <span className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Moyenne</span>
                            <span className={cn("text-lg font-bold font-mono transition-all duration-500", getAvgColor(moduleAvg))}>
                                <AnimatedNumber value={moduleAvg} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Risk Indicator Bar */}
            <div className="h-1 bg-[#121218] relative overflow-hidden">
                <div
                    className={cn("h-full transition-all duration-500 ease-out", getRiskBarColor())}
                    style={{ width: `${getRiskBarWidth()}%` }}
                />
            </div>
        </div>
    );
}
