import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import {
  FileInput,
  Sparkles,
  X,
  AlertTriangle,
  CheckCircle,
  Zap
} from 'lucide-react';

export const AIImportModal = ({ isOpen, onClose }) => {
  const { userProfile, schedule, acceptPlanIntoLifeHub } = useApp();

  const [rawText, setRawText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analyzedResult, setAnalyzedResult] = useState(null);

  if (!isOpen) return null;

  const handleAnalyzeImport = async () => {
    if (!rawText.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/import-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText,
          userProfile,
          currentSchedule: schedule
        })
      });

      const data = await res.json();
      setAnalyzedResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptImportedPlan = () => {
    if (!analyzedResult?.structuredPlan) return;
    acceptPlanIntoLifeHub(analyzedResult.structuredPlan);
    onClose();
  };

  return (
    <div id="ai-import-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        id="ai-import-modal-window"
        className="relative w-full max-w-3xl bg-stone-50 rounded-2xl shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-stone-900 text-stone-100 px-6 py-4 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
              <FileInput className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-white">Import from Any AI</h3>
              <p className="text-xs text-stone-400">
                Paste plans from ChatGPT, Gemini, Claude, Perplexity or raw notes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {!analyzedResult ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Paste Recommendation or AI Output:
                </label>
                <textarea
                  value={rawText}
                  onChange={e => setRawText(e.target.value)}
                  placeholder={`Example:\n"12-Week Workout Plan:\nMonday — Chest & Triceps 45 min\nTuesday — Back & Biceps\nWednesday — Rest\nThursday — Shoulders & Core\nFriday — Legs\nSaturday — Light cardio..."`}
                  rows={8}
                  className="w-full p-4 bg-white rounded-xl border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 text-stone-900 text-sm font-mono shadow-inner leading-relaxed"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-[11px] text-stone-500 font-medium">Quick Test Templates:</span>
                <button
                  onClick={() =>
                    setRawText(
                      `12-Week Workout Routine:\nMonday — Push (Bench, Shoulder Press, Dips) 45 min\nWednesday — Pull (Pull-ups, Rows, Bicep curls) 45 min\nFriday — Legs & Core (Squats, Lunges, Planks) 45 min\nSunday — Weekly recovery stretch`
                    )
                  }
                  className="text-[11px] px-2.5 py-1 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 cursor-pointer"
                >
                  💪 12-Week Workout Plan
                </button>
                <button
                  onClick={() =>
                    setRawText(
                      `Savings Plan for Laptop (KSh 80,000 in 4 months):\nWeekly Target: Save KSh 5,000 every Friday\nCut back KSh 1,000 from grocery\nCheck bank balance every Sunday`
                    )
                  }
                  className="text-[11px] px-2.5 py-1 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 cursor-pointer"
                >
                  💻 KSh 80,000 Laptop Plan
                </button>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-stone-700 space-y-1">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>How LifeHub AI Converts This:</span>
                </div>
                <p className="text-stone-600 text-[11px]">
                  LifeHub scans for timeline, sets, budget allocations, and automatically cross-checks against your university classes (Monday & Tuesday) and calendar availability before structuring it into trackable tasks.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-200 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAnalyzeImport}
                  disabled={!rawText.trim() || isLoading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 text-xs sm:text-sm font-semibold shadow-md transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>{isLoading ? 'Analyzing & Cross-Checking...' : 'Analyze & Personalize Plan'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Analysis & Conversion Results */
            <div className="space-y-6">
              {/* Conflict & Resolution Banner */}
              <div className="bg-gradient-to-r from-amber-900 to-stone-900 text-amber-50 p-4 rounded-xl border border-amber-700/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-amber-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    AI Conversion & Conflict Analysis
                  </span>
                  <span className="text-[10px] bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                    ✓ Validated
                  </span>
                </div>

                <div className="text-xs space-y-1 text-amber-100/90">
                  <p className="font-medium">{analyzedResult.conflictAnalysis?.summary}</p>
                </div>

                {analyzedResult.conflictAnalysis?.conflictsDetected?.length > 0 && (
                  <div className="p-2.5 bg-black/40 rounded-lg border border-amber-500/30 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      <span>Detected Constraint Conflicts:</span>
                    </div>
                    {analyzedResult.conflictAnalysis.conflictsDetected.map((c, i) => (
                      <p key={i} className="text-stone-300 text-[11px] pl-5">• {c}</p>
                    ))}
                    <div className="pt-1 text-[11px] text-emerald-300 pl-5 font-medium">
                      ✓ Auto-Adjustments Applied: {analyzedResult.conflictAnalysis.autoFixesApplied?.join(', ')}
                    </div>
                  </div>
                )}
              </div>

              {/* Structured Output Preview */}
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                      CONVERTED STRUCTURED PLAN
                    </span>
                    <h4 className="text-lg font-serif font-bold text-stone-900">
                      {analyzedResult.structuredPlan?.title}
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    {analyzedResult.structuredPlan?.targetMetric}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {analyzedResult.structuredPlan?.summary}
                </p>

                {/* Tasks Extracted */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-stone-800 block">
                    Created Action Tasks ({analyzedResult.structuredPlan?.actionTasks?.length || 0}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {analyzedResult.structuredPlan?.actionTasks?.map((task, idx) => (
                      <div key={idx} className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-xs flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="truncate text-stone-800 font-medium">{task.title}</span>
                        <span className="ml-auto text-[10px] text-stone-500 font-mono shrink-0">{task.scheduledDay}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setAnalyzedResult(null)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-200 text-xs font-medium cursor-pointer"
                >
                  ← Try Another Text
                </button>
                <button
                  onClick={handleAcceptImportedPlan}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-stone-900 text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4 text-amber-300" />
                  <span>Accept & Commit to LifeHub</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
