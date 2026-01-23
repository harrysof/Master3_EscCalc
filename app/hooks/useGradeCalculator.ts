
import { useState, useMemo, useEffect } from "react";
import { BRANCHES, Branch, Subject } from "../data";

export function useGradeCalculator() {
    const [selectedBranchId, setSelectedBranchId] = useState<string>(BRANCHES[0].id);
    // Hardcode semester to S1 as we only have one list of modules now
    const selectedSemester = "S1";
    const [grades, setGrades] = useState<Record<string, { exam: number; td: number }>>({});

    const selectedBranch = useMemo(
        () => BRANCHES.find((b) => b.id === selectedBranchId) || BRANCHES[0],
        [selectedBranchId]
    );

    const currentSubjects = useMemo(
        () => selectedBranch.data[selectedSemester],
        [selectedBranch, selectedSemester]
    );

    // Initialize grades for new subjects if not present
    useEffect(() => {
        setGrades((prev) => {
            const newGrades = { ...prev };
            let changed = false;
            currentSubjects.forEach((sub) => {
                const key = `${selectedBranch.id}-${selectedSemester}-${sub.name}`;
                if (!newGrades[key]) {
                    newGrades[key] = { exam: 0, td: 0 };
                    changed = true;
                }
            });
            return changed ? newGrades : prev;
        });
    }, [currentSubjects, selectedBranch.id]);

    // Initialize grades from localStorage
    useEffect(() => {
        const savedGrades = localStorage.getItem(`grades_${selectedBranchId}`);
        if (savedGrades) {
            setGrades(JSON.parse(savedGrades));
        } else {
            setGrades({}); // Reset if no saved data for this branch
        }
    }, [selectedBranchId]);

    // Save grades to localStorage whenever they change
    useEffect(() => {
        if (Object.keys(grades).length > 0) {
            localStorage.setItem(`grades_${selectedBranchId}`, JSON.stringify(grades));
        }
    }, [grades, selectedBranchId]);

    const updateGrade = (subjectName: string, type: "exam" | "td", value: number) => {
        const key = `${selectedBranch.id}-${selectedSemester}-${subjectName}`;
        setGrades((prev) => {
            const currentGrade = prev[key] || { exam: 0, td: 0 };
            return {
                ...prev,
                [key]: {
                    ...currentGrade,
                    [type]: Math.max(0, Math.min(20, value)), // Clamp between 0 and 20
                },
            };
        });
    };

    const clearData = () => {
        setGrades({});
        localStorage.removeItem(`grades_${selectedBranchId}`);
        localStorage.removeItem("esc_feed_history"); // Also clear feed history
        window.location.reload(); // Reload to refresh feed state cleanly
    };

    const getModuleAverage = (subjectName: string) => {
        const key = `${selectedBranch.id}-${selectedSemester}-${subjectName}`;
        const grade = grades[key] || { exam: 0, td: 0 };
        return grade.exam * 0.67 + grade.td * 0.33;
    };

    const semesterAverage = useMemo(() => {
        let totalWeightedScore = 0;
        let totalCoef = 0;

        currentSubjects.forEach((sub) => {
            const avg = getModuleAverage(sub.name);
            totalWeightedScore += avg * sub.coef;
            totalCoef += sub.coef;
        });

        return totalCoef > 0 ? totalWeightedScore / totalCoef : 0;
    }, [currentSubjects, grades, selectedBranch.id]);

    // Simulation Mode
    const [isSimulationMode, setIsSimulationMode] = useState(false);
    const [targetAverage, setTargetAverage] = useState(10);

    const getSimulationGap = () => {
        // Calculate points needed to reach target
        const currentSum = currentSubjects.reduce((acc, sub) => {
            const key = `${selectedBranch.id}-${selectedSemester}-${sub.name}`;
            const grade = grades[key];
            const modAvg = grade ? (grade.exam * 0.67 + grade.td * 0.33) : 0;
            return acc + (modAvg * sub.coef);
        }, 0);

        const totalCoef = currentSubjects.reduce((acc, sub) => acc + sub.coef, 0);
        const requiredTotal = targetAverage * totalCoef;
        const gap = requiredTotal - currentSum;

        // Calculate suggestedAvg for empty modules
        const emptyModules = currentSubjects.filter(sub => {
            const key = `${selectedBranch.id}-${selectedSemester}-${sub.name}`;
            const grade = grades[key];
            // Consider empty if exam and td are 0
            return !grade || (grade.exam === 0 && grade.td === 0);
        });

        const emptyCoefSum = emptyModules.reduce((acc, sub) => acc + sub.coef, 0);

        let suggestedAvg = 0;
        if (emptyCoefSum > 0) {
            suggestedAvg = Math.max(0, Math.min(20, gap / emptyCoefSum));
        }

        return { gap, suggestedAvg };
    };

    // Autofill Logic
    const [isAutofilled, setIsAutofilled] = useState<Record<string, boolean>>({});

    const autofillGrades = (target: number) => {
        // 1. Identify what needs to be filled (only fields that are 0)
        const targets: { key: string, type: 'exam' | 'td', weight: number, min: number }[] = [];
        let currentTotalScore = 0;
        const totalCoef = currentSubjects.reduce((acc, sub) => acc + sub.coef, 0);

        currentSubjects.forEach((sub) => {
            const key = `${selectedBranch.id}-${selectedSemester}-${sub.name}`;
            const grade = grades[key] || { exam: 0, td: 0 };

            // Heuristics for weights and minimums
            const isEasy = sub.coef <= 1.5;
            const baseMin = isEasy ? 13 : 10;

            if (grade.exam === 0) {
                targets.push({ key, type: 'exam', weight: 0.67 * sub.coef, min: baseMin });
            } else {
                currentTotalScore += grade.exam * 0.67 * sub.coef;
            }

            if (grade.td === 0) {
                // TD usually higher, so we give it slightly more "base" points later
                targets.push({ key, type: 'td', weight: 0.33 * sub.coef, min: Math.max(baseMin + 1, 12) });
            } else {
                currentTotalScore += grade.td * 0.33 * sub.coef;
            }
        });

        if (targets.length === 0) return;

        // 2. Calculate remaining points needed
        const pointsNeeded = (target * totalCoef) - currentTotalScore;
        const totalTargetWeight = targets.reduce((acc, t) => acc + t.weight, 0);

        // 3. Distribute points
        const currentMinPoints = targets.reduce((acc, t) => acc + t.min * t.weight, 0);
        const extraPoints = pointsNeeded - currentMinPoints;
        const boost = Math.max(0, extraPoints / totalTargetWeight);

        setGrades((prev) => {
            const nextGrades = { ...prev };
            const newAutofilled: Record<string, boolean> = { ...isAutofilled };

            targets.forEach((t) => {
                // Apply boost + heuristic offset
                let value = t.min + boost;

                // Academically, notes are usually 10, 10.25, 10.5, 10.75
                value = Math.round(value * 4) / 4;

                // Clamp to realistic 20
                value = Math.min(20, value);

                if (!nextGrades[t.key]) nextGrades[t.key] = { exam: 0, td: 0 };
                nextGrades[t.key] = {
                    ...nextGrades[t.key],
                    [t.type]: value
                };
                newAutofilled[t.key] = true;
            });

            setIsAutofilled(newAutofilled);
            return nextGrades;
        });
    };

    return {
        branches: BRANCHES,
        selectedBranch,
        setSelectedBranchId,
        currentSubjects,
        grades,
        updateGrade,
        getModuleAverage,
        semesterAverage,
        clearData,
        isSimulationMode,
        setIsSimulationMode,
        targetAverage,
        setTargetAverage,
        getSimulationGap,
        autofillGrades,
        isAutofilled
    };
}
