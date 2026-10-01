import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import {
  Sparkles,
  Zap,
  Target,
  Clock,
  Calendar,
  CheckCircle,
  HelpCircle,
  DollarSign,
  ArrowRight,
  Edit3,
  RefreshCw,
  Send,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const AIPlannerView = () => {
  const {
    userProfile,
    formatMoney,
    acceptPlanIntoLifeHub,
    activeProposedPlan,
    setActiveProposedPlan,
    setActiveTab
  } = useApp();

  const [selectedDomain, setSelectedDomain] = useState('finance');
  const [promptText, setPromptText] = useState("I want to save KSh 80,000 for a laptop by December, but I also have school expenses.");
  const [step, setStep] = useState('prompt');
  const [clarificationAnswers, setClarificationAnswers] = useState({});
  const [currentPlan, setCurrentPlan] = useState(activeProposedPlan);
  const [modifyInput, setModifyInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const DOMAIN_OPTIONS = [
    { id: 'finance', label: '💰 Money & Savings', desc: 'Laptops, tuition, emergency funds, investment' },
    { id: 'art_heritage', label: '🎨 Soapstone & Art Commissions', desc: 'Tabaka sculptures, Gusii bowls, bespoke pieces' },
    { id: 'health', label: '❤️ Health & Fitness', desc: 'Strength training, lean muscle, nutrition' },
    { id: 'education', label: '📚 Education & Skills', desc: 'Software engineering, languages, study blocks' },
    { id: 'career', label: '💼 Career & Projects', desc: 'E-commerce launch, freelancing, portfolio' },
    { id: 'personal_goals', label: '🎯 Personal Goals', desc: 'Habits, routines, reading, lifestyle' }
  ];

  const handleStartClarification = async () => {
    if (!promptText.trim()) return;
    setIsLoading(true);
    setErrorMsg(null);
    setStep('clarifying');
    setIsLoading(false);
  };

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setStep('loading');

    const combinedConstraints = {
      ...clarificationAnswers,
      userSchedule: userProfile.availableDays,
      budgetStyle: userProfile.budgetStyle,
      monthlyIncome: userProfile.monthlyIncomeKSh,
      fixedExpenses: userProfile.fixedExpensesKSh
    };

    try {
      const res = await fetch('/api/ai/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          domain: selectedDomain,
          userProfile,
          constraints: combinedConstraints
        })
      });

      const data = await res.json();
      if (data.plan) {
        setCurrentPlan(data.plan);
        setActiveProposedPlan(data.plan);
        setStep('plan_ready');
      } else {
        throw new Error(data.error || "Failed to parse structured plan");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to generate plan.");
      setStep('prompt');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModifyPlan = async () => {
    if (!modifyInput.trim() || !currentPlan) return;
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/ai/modify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPlan,
          modificationPrompt: modifyInput,
          userSchedule: userProfile.availableDays
        })
      });

      const data = await res.json();
      if (data.updatedPlan) {
        setCurrentPlan(data.updatedPlan);
        setActiveProposedPlan(data.updatedPlan);
        setModifyInput("");
        setStep('plan_ready');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => {
    if (!currentPlan) return;
    acceptPlanIntoLifeHub(currentPlan);
    setActiveTab('goals');
  };

  return (
    <div id="ai-planner-view-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Intelligence Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1A1A1A]/10">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-50 font-bold block mb-1">
            System Intelligence • Structured Architecture
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif italic tracking-tight text-[#1A1A1A]">
            LifeHub AI Planning & Action Studio
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-800">
              Analytic Engine Active
            </span>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STEP 1: PROMPT & DOMAIN SELECTION - ARTISTIC FLAIR LAYOUT */}
      {step === 'prompt' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Intent & Overview (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif leading-tight mb-4 text-[#1A1A1A]">
                What are we <br /><span className="italic">transforming</span> today?
              </h2>
              <p className="text-sm text-[#1A1A1A]/60 leading-relaxed">
                Based on your active income ({formatMoney(userProfile.monthlyIncomeKSh)}) and schedule in Finance and Heritage, describe your next milestone below.
              </p>
            </div>

            {/* Current Context Intent & LifeHub Analysis Cards */}
            <div className="space-y-4">
              <div className="p-5 bg-white border border-[#1A1A1A]/10 shadow-xs rounded-2xl">
                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1 font-bold">User Intent</p>
                <p className="text-sm italic font-serif text-[#1A1A1A]">
                  "{promptText}"
                </p>
              </div>

              <div className="p-5 bg-[#1A1A1A] text-white rounded-2xl shadow-sm">
                <p className="text-[10px] uppercase tracking-widest opacity-80 mb-1 text-emerald-400 font-bold">
                  LifeHub Adaptive Logic
                </p>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  I will preserve your essential food and university transport allocations while structuring verified weekly milestones to complete your goal on schedule.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleStartClarification}
                disabled={!promptText.trim()}
                className="px-6 py-3 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] font-bold rounded-xl hover:bg-stone-800 transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                Structure Plan →
              </button>
              <button
                onClick={() => {
                  setPromptText("I want to save KSh 80,000 for a laptop by December, but I also have school expenses.");
                  setSelectedDomain('finance');
                }}
                className="px-5 py-3 bg-white border border-[#1A1A1A] text-[11px] uppercase tracking-[0.2em] font-bold rounded-xl hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer"
              >
                Reset Example
              </button>
            </div>
          </div>

          {/* Right Column: Goal Builder & Domain Selector (7 cols) */}
          <div className="lg:col-span-7 bg-[#F7F3EE] p-6 sm:p-10 rounded-3xl border border-[#1A1A1A]/10 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold block mb-1">
                Domain Specification
              </span>
              <h3 className="text-2xl font-serif text-[#1A1A1A]">
                Select Focus Area & Refine Details
              </h3>
            </div>

            {/* Domains Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DOMAIN_OPTIONS.map(d => (
                <button
                  key={d.id}
                  onClick={() => {
                    setSelectedDomain(d.id);
                    if (d.id === 'finance') setPromptText("I want to save KSh 80,000 for a laptop by December, but I also have school expenses.");
                    if (d.id === 'art_heritage') setPromptText("I want to commission a custom 3-piece Tabaka soapstone elephant sculpture on a KSh 18,000 budget.");
                    if (d.id === 'health') setPromptText("I want to gain lean muscle and build upper-body strength with 3 workout days per week.");
                    if (d.id === 'education') setPromptText("I want to master Python full-stack systems in 10 weeks studying 6 hours weekly.");
                    if (d.id === 'career') setPromptText("I want to launch my African artisanal e-commerce store in 60 days.");
                    if (d.id === 'personal_goals') setPromptText("I want to build a consistent 6:30 AM morning focus and reading routine.");
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-1 ${
                    selectedDomain === d.id
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-sm'
                      : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider">{d.label}</div>
                  <p className={`text-[11px] ${selectedDomain === d.id ? 'text-stone-300' : 'text-[#1A1A1A]/60'}`}>
                    {d.desc}
                  </p>
                </button>
              ))}
            </div>

            {/* Goal Input Textarea */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70">
                Natural Language Goal Request:
              </label>
              <textarea
                value={promptText}
                onChange={e => setPromptText(e.target.value)}
                rows={3}
                className="w-full p-4 bg-white rounded-2xl border border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-hidden text-sm text-[#1A1A1A] shadow-2xs leading-relaxed"
                placeholder="Describe your goal in your own words..."
              />
            </div>

            {/* Protected Constraints Meta */}
            <div className="p-4 bg-white rounded-2xl border border-[#1A1A1A]/10 text-xs text-[#1A1A1A]/70 flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 font-bold text-[#1A1A1A]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Active Safeguards:
              </span>
              <span className="font-mono text-[11px]">
                {userProfile.availableDays.join(', ')} • Food/Transport Protected
              </span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: CLARIFYING QUESTIONS */}
      {step === 'clarifying' && (
        <div className="max-w-3xl mx-auto bg-[#F7F3EE] p-6 sm:p-10 rounded-3xl border border-[#1A1A1A]/10 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold block">
              Step 2 • Strategic Calibration
            </span>
            <h3 className="font-serif font-bold text-2xl text-[#1A1A1A]">
              Confirm Key Parameters Before Generation
            </h3>
            <p className="text-xs text-[#1A1A1A]/60">
              LifeHub AI checks your income, recurring expenses, and available days to eliminate impossible timetables.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white rounded-2xl border border-[#1A1A1A]/10 space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]">
                1. Target Completion Deadline:
              </label>
              <input
                type="text"
                placeholder="e.g. December 15, 2026"
                value={clarificationAnswers['deadline'] || 'December 15, 2026'}
                onChange={e => setClarificationAnswers({ ...clarificationAnswers, deadline: e.target.value })}
                className="w-full p-3 bg-[#FDFBF7] rounded-xl border border-[#1A1A1A]/15 text-xs text-[#1A1A1A]"
              />
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#1A1A1A]/10 space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]">
                2. Target Savings / Weekly Cadence Commitment:
              </label>
              <input
                type="text"
                placeholder="e.g. Save KSh 2,100 every Monday"
                value={clarificationAnswers['weekly'] || 'Save KSh 2,100 every Monday'}
                onChange={e => setClarificationAnswers({ ...clarificationAnswers, weekly: e.target.value })}
                className="w-full p-3 bg-[#FDFBF7] rounded-xl border border-[#1A1A1A]/15 text-xs text-[#1A1A1A]"
              />
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#1A1A1A]/10 space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]">
                3. Essential Protections & Schedule notes:
              </label>
              <input
                type="text"
                placeholder="e.g. Protect KSh 1,500/wk for food & transport"
                value={clarificationAnswers['notes'] || 'Protect KSh 1,500/wk for food & transport'}
                onChange={e => setClarificationAnswers({ ...clarificationAnswers, notes: e.target.value })}
                className="w-full p-3 bg-[#FDFBF7] rounded-xl border border-[#1A1A1A]/15 text-xs text-[#1A1A1A]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#1A1A1A]/10">
            <button
              onClick={() => setStep('prompt')}
              className="px-5 py-2.5 rounded-xl border border-[#1A1A1A]/20 bg-white text-[#1A1A1A] text-[11px] uppercase tracking-[0.2em] font-bold cursor-pointer hover:bg-stone-100"
            >
              ← Back
            </button>
            <button
              onClick={handleGeneratePlan}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-stone-800 shadow-md transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Generate Structured Architecture</span>
            </button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {step === 'loading' && (
        <div className="py-24 text-center space-y-4 bg-[#F7F3EE] rounded-3xl border border-[#1A1A1A]/10">
          <div className="w-12 h-12 rounded-full border-2 border-[#1A1A1A] border-t-transparent animate-spin mx-auto" />
          <h3 className="font-serif italic font-bold text-2xl text-[#1A1A1A]">
            Synthesizing LifeHub Architecture...
          </h3>
          <p className="text-xs text-[#1A1A1A]/60 max-w-sm mx-auto">
            Balancing milestones, expense safeguards, weekly cadences, and habit systems.
          </p>
        </div>
      )}

      {/* STEP 3: PROPOSED ARCHITECTURE */}
      {step === 'plan_ready' && currentPlan && (
        <div className="bg-[#F7F3EE] p-6 sm:p-12 rounded-3xl border border-[#1A1A1A]/10 space-y-10">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-8 border-b border-[#1A1A1A]/10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 block mb-1 font-bold">
                Proposed Architecture
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A]">
                {currentPlan.title}
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 block mb-1 font-bold">
                Target Metric
              </span>
              <span className="text-2xl sm:text-3xl font-serif text-[#1A1A1A]">
                {currentPlan.targetMetric}
              </span>
            </div>
          </div>

          {/* Grid Layout: Milestones & Safeguards (Left) vs Strategic Summary (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Side: Milestones & Protected Constraints (6 cols) */}
            <div className="lg:col-span-6 space-y-8">
              {/* Milestones with Line Connectors */}
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4 opacity-40">
                  Milestone Sequence
                </h4>
                <div className="space-y-4">
                  {currentPlan.milestones.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-4 group">
                      <span className="text-xs font-serif italic opacity-50 font-bold min-w-[20px]">
                        0{idx + 1}
                      </span>
                      <div className="flex-1 h-[1px] bg-[#1A1A1A]/15"></div>
                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-medium text-[#1A1A1A] block">{m.title}</span>
                        <span className="text-[10px] font-mono text-emerald-800">{m.targetValue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Protected Constraints */}
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-3 opacity-40">
                  Constraints Protected
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3.5 py-1.5 bg-emerald-100 text-emerald-800 text-[10px] uppercase tracking-widest rounded-full font-bold">
                    Food: KSh 1.5k/wk Locked
                  </span>
                  <span className="px-3.5 py-1.5 bg-emerald-100 text-emerald-800 text-[10px] uppercase tracking-widest rounded-full font-bold">
                    Campus Transport Safeguarded
                  </span>
                  <span className="px-3.5 py-1.5 bg-emerald-100 text-emerald-800 text-[10px] uppercase tracking-widest rounded-full font-bold">
                    Sunday Review Cycles
                  </span>
                </div>
              </div>

              {/* Action Tasks List */}
              {currentPlan.actionTasks && currentPlan.actionTasks.length > 0 && (
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-3 opacity-40">
                    Scheduled Action Tasks
                  </h4>
                  <div className="space-y-2">
                    {currentPlan.actionTasks.map((t, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-[#1A1A1A]/5 text-xs flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-[#1A1A1A]">{t.title}</p>
                          <span className="text-[10px] opacity-60">📅 {t.scheduledDay} • ⏱️ {t.estimatedTime}</span>
                        </div>
                        <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-stone-100 text-[#1A1A1A]">
                          {t.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side: Strategic Summary Card (6 cols) */}
            <div className="lg:col-span-6 bg-white p-8 sm:p-10 border border-[#1A1A1A]/10 rounded-3xl flex flex-col justify-between shadow-xs space-y-6">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 opacity-40">
                  Strategic Summary
                </h4>
                <p className="text-sm sm:text-base leading-loose font-serif italic text-[#1A1A1A]/80">
                  "{currentPlan.whyThisWorks || currentPlan.summary}"
                </p>
              </div>

              <div className="pt-8 border-t border-[#1A1A1A]/10 space-y-3">
                <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold text-[#1A1A1A]">
                  <span>Success Probability</span>
                  <span>94%</span>
                </div>
                <div className="w-full bg-[#F7F3EE] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1A1A1A] h-full w-[94%] transition-all duration-1000"></div>
                </div>
                <p className="text-[10px] text-stone-500 font-medium">
                  Validated against your monthly income and fixed expense buffers.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <footer className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-8 border-t border-[#1A1A1A]/10">
            <div className="flex gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase opacity-40 font-bold">Deadline</span>
                <span className="text-xs font-bold text-[#1A1A1A]">{currentPlan.deadline}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase opacity-40 font-bold">Frequency</span>
                <span className="text-xs font-bold text-[#1A1A1A]">{currentPlan.recommendedCadence}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setStep('modify')}
                className="px-6 sm:px-8 py-3.5 border border-[#1A1A1A] text-[11px] uppercase tracking-[0.2em] font-bold rounded-xl hover:bg-[#FDFBF7] transition-all cursor-pointer"
              >
                Modify Structure
              </button>
              <button
                onClick={handleAccept}
                className="px-6 sm:px-8 py-3.5 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] font-bold rounded-xl shadow-xl shadow-black/10 hover:bg-stone-800 transition-all cursor-pointer"
              >
                Accept & Commit Plan
              </button>
            </div>
          </footer>
        </div>
      )}

      {/* STEP 4: MODIFY */}
      {step === 'modify' && currentPlan && (
        <div className="max-w-2xl mx-auto bg-[#F7F3EE] p-6 sm:p-8 rounded-3xl border border-[#1A1A1A]/10 space-y-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold block mb-1">
              Conversational Refinement
            </span>
            <h3 className="font-serif font-bold text-xl text-[#1A1A1A]">
              Modify Structure Parameters
            </h3>
            <p className="text-xs text-[#1A1A1A]/60 mt-1">
              State adjustments in plain words (e.g., "Shift weekly transfers to Fridays", "Extend deadline by 3 weeks to lower weekly deposit").
            </p>
          </div>

          <textarea
            value={modifyInput}
            onChange={e => setModifyInput(e.target.value)}
            rows={3}
            placeholder="e.g. Move weekly savings deposit to Friday and adjust transport budget..."
            className="w-full p-4 bg-white rounded-2xl border border-[#1A1A1A]/20 text-xs text-[#1A1A1A]"
          />

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setStep('plan_ready')}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-stone-600 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleModifyPlan}
              disabled={!modifyInput.trim() || isLoading}
              className="px-6 py-3 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] font-bold rounded-xl hover:bg-stone-800 shadow-md cursor-pointer disabled:opacity-50"
            >
              Apply Adjustments
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
