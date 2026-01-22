"use client";

import { Subject } from "@/app/data";
import { cn } from "@/lib/utils";

interface ModuleImpactProps {
    subjects: Subject[];
    grades: Record<string, { exam: number; td: number }>;
    branchId: string;
}

export function ModuleImpact({ subjects, grades, branchId }: ModuleImpactProps) {
    // Sort by coefficient (highest first)
    const sortedByImpact = [...subjects].sort((a, b) => b.coef - a.coef);
    const topModules = sortedByImpact.slice(0, 3);

    const getModuleAvg = (name: string) => {
        const key = `${branchId}-S1-${name}`;
        const grade = grades[key] || { exam: 0, td: 0 };
        return grade.exam * 0.67 + grade.td * 0.33;
    };

    return (
        <div className="bg-black/20 backdrop-blur-md border border-white/5 rounded-xl p-4 mt-4">
            <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.15em] mb-3 flex items-center gap-2">
                <span>🔥</span> High Impact Modules
            </h4>
            <div className="space-y-2">
                {topModules.map((mod, i) => {
                    const avg = getModuleAvg(mod.name);
                    const isRisk = avg < 10;
                    return (
                        <div
                            key={mod.name}
                            className={cn(
                                "flex items-center justify-between gap-2 p-2 rounded-lg transition-all",
                                isRisk ? "bg-red-500/10 border border-red-500/20" : "bg-white/5"
                            )}
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="text-xs font-black text-gray-400">#{i + 1}</span>
                                <span className="text-xs text-white truncate">{mod.name}</span>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-[10px] text-gray-500">Coef {mod.coef}</span>
                                <span className={cn(
                                    "text-xs font-bold font-mono",
                                    avg >= 10 ? "text-green-400" : "text-red-400"
                                )}>
                                    {avg.toFixed(1)}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
