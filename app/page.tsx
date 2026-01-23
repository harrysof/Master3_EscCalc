"use client";

import { useGradeCalculator } from "./hooks/useGradeCalculator";
import { BranchSelector } from "./components/BranchSelector";
import { SubjectRow } from "./components/SubjectRow";
import { QuantumGridBackground } from "./components/QuantumGridBackground";

import { GithubPFP } from "./components/GithubPFP";
import { ProgressRing } from "./components/ProgressRing";
import { ModuleImpact } from "./components/ModuleImpact";
import { MobileActionBar } from "./components/MobileActionBar";
import { WhatIfSimulator } from "./components/WhatIfSimulator";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import html2canvas from "html2canvas";

export default function Home() {
  const {
    branches,
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
  } = useGradeCalculator();

  const getSemesterColor = (avg: number) => {
    if (avg >= 15) return "text-[#d89cf6] shadow-[#d89cf6]";
    if (avg >= 14) return "text-[#12CAD6] shadow-[#12CAD6]";
    if (avg >= 12) return "text-[#50D890] shadow-[#50D890]";
    if (avg >= 10) return "text-[#FE9801] shadow-[#FE9801]";
    return "text-red-500 shadow-red-500";
  };

  // Confetti celebration when passing
  const prevAvgRef = useRef(semesterAverage);
  useEffect(() => {
    if (prevAvgRef.current < 10 && semesterAverage >= 10) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#4ade80", "#60a5fa", "#a855f7", "#ffffff"]
      });
    }
    prevAvgRef.current = semesterAverage;
  }, [semesterAverage]);

  const [isSharing, setIsSharing] = useState(false);
  const [showDesktopAutofill, setShowDesktopAutofill] = useState(false);

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);

    try {
      const element = document.getElementById("result-card");
      if (!element) throw new Error("Result card element not found");

      // Capture the result card
      const canvas = await html2canvas(element, {
        backgroundColor: "#121218",
        scale: 2,
        useCORS: true,
        logging: false,
      });

      // Convert to blob
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("Failed to generate image blob");

      const file = new File([blob], "master3-grades.png", { type: "image/png" });

      // Check if native sharing is supported for files
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My Master 3 Average",
          text: `Check out my results! I got a ${semesterAverage.toFixed(2)} average! 🎓`,
          files: [file],
        });
      } else if (navigator.share) {
        // Fallback to text sharing if file sharing is not supported
        await navigator.share({
          title: "My Master 3 Average",
          text: `I just calculated my grades! My average is ${semesterAverage.toFixed(2)}/20. 🎓`,
          url: window.location.href,
        });
      } else {
        // Fallback to direct download
        const link = document.createElement("a");
        link.download = "master3-grades.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    } catch (err) {
      console.error("Sharing failed:", err);
      // Final attempt: simple text share if capture fails
      if (navigator.share) {
        try {
          await navigator.share({
            text: `My Master 3 average is ${semesterAverage.toFixed(2)}/20! 🎓`,
          });
        } catch (sErr) {
          console.error("Text share fallback failed", sErr);
        }
      }
    } finally {
      setIsSharing(false);
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <QuantumGridBackground>
      <motion.div
        initial={isMobile ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex-1 flex flex-col p-4 sm:p-8 w-full h-[100vh] overflow-y-auto"
      >
        <GithubPFP />
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-6 mt-8 relative">
            <motion.h1
              initial={isMobile ? false : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-black mb-2 tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              Master 3 <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 via-pink-300 to-white animate-liquid">
                Grade Calculator
              </span>
            </motion.h1>
            <motion.p
              initial={isMobile ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 font-light tracking-[0.3em] text-xs uppercase"
            >
              C'est Grave Directe | By Sofiane Belkacem Nacer
            </motion.p>

            <motion.button
              initial={isMobile ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={clearData}
              className="mt-6 px-6 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider hover:bg-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all duration-300 mx-auto block"
            >
              Clear Data
            </motion.button>
          </div>

          {/* Branch Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full mb-8 bg-[#1E1E2A] md:bg-black/20 md:backdrop-blur-sm p-2 rounded-2xl border border-white/5"
          >
            <BranchSelector
              branches={branches}
              selectedBranchId={selectedBranch.id}
              onSelect={setSelectedBranchId}
            />
          </motion.div>

          {/* Main Content & Result Split */}
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 w-full pb-20">
            {/* Subjects List */}
            <div className="order-2 lg:order-1 lg:col-span-2 space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedBranch.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between mb-4 px-2 relative">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                      <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: selectedBranch.color }} />
                      {selectedBranch.name}
                    </h2>

                    {/* Desktop Autofill Button */}
                    <div className="hidden lg:block relative">
                      <button
                        onClick={() => setShowDesktopAutofill(!showDesktopAutofill)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider hover:bg-blue-500/20 transition-all duration-300"
                      >
                        <Wand2 className="w-4 h-4" />
                        Magic Autofill
                      </button>

                      <AnimatePresence>
                        {showDesktopAutofill && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute top-full right-0 mt-2 w-48 bg-[#1E1E2A] border border-white/10 rounded-2xl shadow-2xl p-3 z-[110] flex flex-col gap-2"
                          >
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest px-2 mb-1">Select Target</p>
                            {[10, 15, 17].map((target) => (
                              <button
                                key={target}
                                onClick={() => {
                                  autofillGrades(target);
                                  setShowDesktopAutofill(false);
                                }}
                                className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-sm text-white flex justify-between items-center group transition-all"
                              >
                                <span>{target}/20</span>
                                <span className="opacity-0 group-hover:opacity-100 text-blue-400 text-[10px] font-bold">Apply</span>
                              </button>
                            ))}
                            <div className="h-px bg-white/5 my-1" />
                            <button
                              onClick={() => {
                                const custom = window.prompt("Enter target average (0-20):");
                                if (custom && !isNaN(parseFloat(custom))) {
                                  autofillGrades(parseFloat(custom));
                                }
                                setShowDesktopAutofill(false);
                              }}
                              className="w-full text-left px-3 py-2 rounded-xl hover:bg-blue-500/10 text-sm text-blue-400 font-medium transition-all"
                            >
                              Custom Target...
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {currentSubjects.map((sub, index) => {
                    const key = `${selectedBranch.id}-S1-${sub.name}`;
                    const grade = grades[key] || { exam: 0, td: 0 };
                    // Calculate suggested average for this row if in simulation mode
                    const simData = getSimulationGap();
                    return (
                      <motion.div
                        key={sub.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <SubjectRow
                          subject={sub}
                          exam={grade.exam}
                          td={grade.td}
                          moduleAvg={getModuleAverage(sub.name)}
                          onUpdate={(type, val) => updateGrade(sub.name, type, val)}
                          isSimulationMode={isSimulationMode}
                          suggestedAvg={simData.suggestedAvg}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Floating Result Card */}
            <div className="order-1 lg:order-2 lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <motion.div
                  layout
                  id="result-card"
                  className="bg-[#1E1E2A] md:bg-black/40 md:backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                >
                  {/* Animated glow based on score */}
                  <motion.div
                    animate={{
                      opacity: semesterAverage >= 10 ? 0.4 : 0.1,
                      background: semesterAverage >= 10
                        ? `radial-gradient(circle at 50% 50%, #50D890, transparent 70%)`
                        : `radial-gradient(circle at 50% 50%, #FF0000, transparent 70%)`
                    }}
                    className="absolute inset-0 pointer-events-none blur-3xl"
                  />

                  <h3 className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-8 text-center border-b border-white/5 pb-4">
                    Semester Average
                  </h3>

                  <div className="flex justify-center items-center py-4 relative z-10">
                    <ProgressRing value={semesterAverage} size={140} strokeWidth={10} />
                  </div>

                  <div className="mt-8 flex justify-center">
                    <motion.div
                      initial={false}
                      animate={{ scale: semesterAverage >= 10 ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.5 }}
                      className={cn(
                        "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-black/50 border backdrop-blur-md",
                        semesterAverage >= 10
                          ? "border-green-500/50 text-green-400 shadow-[0_0_20px_rgba(74,222,128,0.2)]"
                          : "border-red-500/50 text-red-400 shadow-[0_0_20px_rgba(248,113,113,0.2)]"
                      )}
                    >
                      {semesterAverage >= 10 ? "✨ Validated" : "Not Validated"}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Module Impact Analysis */}
                <ModuleImpact
                  subjects={currentSubjects}
                  grades={grades}
                  branchId={selectedBranch.id}
                />


              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <MobileActionBar
        onClear={clearData}
        onShare={handleShare}
        onAutofill={autofillGrades}
        isSharing={isSharing}
        isValid={semesterAverage >= 10}
      />
    </QuantumGridBackground >
  );
}
