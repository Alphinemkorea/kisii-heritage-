import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import {
  Sparkles,
  X,
  Send,
  CheckCircle,
  Clock,
  Calendar,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Edit3,
  ShieldCheck,
  Zap,
  DollarSign
} from 'lucide-react';

export const AIPlannerModal = ({
  isOpen,
  onClose,
  initialPrompt = '',
  initialDomain = 'finance'
}) => {
  const {
    userProfile,
    formatMoney,
    currency,
    acceptPlanIntoLifeHub,
    activeProposedPlan,
    setActiveProposedPlan
  } = useApp();

  const [step, setStep] = useState('intent');
  const [selectedDomain, setSelectedDomain] = useState(initialDomain);
  const [promptText, setPromptText] = useState(initialPrompt || "I want to save KSh 80,000 for a laptop by December, but I also have school expenses.");
  const [clarificationAnswers, setClarificationAnswers] = useState({});
  const [isAiNotSureMode, setIsAiNotSureMode] = useState(false);
  const [modifyPrompt, setModifyPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiClarificationQuestions, setAiClarificationQuestions] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(activeProposedPlan);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  if (!isOpen) return null;

  // Domain presets
  const DOMAIN_OPTIONS = [
    {
      id: 'finance',
      label: '💰 Money & Savings',
      icon: '💰',
      example: 'I want to save KSh 80,000 for a laptop by December, but I also have school expenses.'
    },
    {
      id: 'art_heritage',
      label: '🎨 Soapstone & Art Commissions',
      icon: '🎨',
      example: 'I want to commission a custom 3-piece Tabaka soapstone elephant sculpture on a KSh 18,000 budget.'
    },
    {
      id: 'health',
      label: '❤️ Health & Fitness',
      icon: '❤️',
      example: 'I want to gain lean muscle and build upper-body strength with 3 workout days per week.'
    },
    {
      id: 'education',
      label: '📚 Education & Tech Skills',
      icon: '📚',
      example: 'I want to master Python full-stack systems in 10 weeks studying 6 hours weekly.'
    },
    {
      id: 'career',
      label: '💼 Career & Projects',
      icon: '💼',
      example: 'I want to launch my African artisanal e-commerce store in 60 days.'
    },
    {
      id: 'personal_goals',
      label: '🎯 Personal Habits & Life',
      icon: '🎯',
      example: 'I want to build a consistent 6:30 AM morning focus and reading routine.'
    }
  ];

  const handleSelectDomain = (dom) => {
    setSelectedDomain(dom);
    const found = DOMAIN_OPTIONS.find(d => d.id === dom);
    if (found && (!promptText || promptText.trim() === '')) {
      setPromptText(found.example);
    }
  };

  const handleStartClarification = async () => {
    if (!promptText.trim()) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Call chat to get tailored clarifying questions
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: promptText }],
          userProfile,
          currentDomain: selectedDomain
        })
      });
      await res.json();

      // Formulate clarifying questions based on domain
      if (selectedDomain === 'finance') {
        setAiClarificationQuestions([
          "What is your target completion date (e.g. December 15, 2026)?",
          "What is your safe weekly savings ceiling without starving your food/transport (e.g. KSh 2,100/wk)?",
          "Are there specific discretionary expenses you are willing to trim (e.g. weekend outings, takeout)?"
        ]);
      } else if (selectedDomain === 'health') {
        setAiClarificationQuestions([
          "Which days of the week work best for you (e.g. Mon/Thu/Sat)?",
          "What equipment access do you have (gym weights, dumbbells, or calisthenics)?",
          "What is your specific target (muscle gain, stamina, fat loss)?"
        ]);
      } else if (selectedDomain === 'art_heritage') {
        setAiClarificationQuestions([
          "What motif or dimensions are you looking to commission (e.g. Tabaka soapstone wildlife suite, Gusii bowl, or sunset canvas)?",
          "What is your target budget ceiling in KSh?",
          "Do you have a specific milestone delivery date?"
        ]);
      } else {
        setAiClarificationQuestions([
          "How many hours per week can you realistically commit?",
          "Which days fit your current calendar best?",
          "What does success look like at the end of the milestone period?"
        ]);
      }

      setStep('clarify');
    } catch (err) {
      console.error(err);
      setErrorMessage("Could not connect to AI service. Generating baseline plan...");
      handleGeneratePlan();
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setStep('generating');

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
        setStep('review');
      } else {
        throw new Error(data.error || "Failed to parse structured plan");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Error generating plan: " + (err.message || "Please retry."));
      setStep('intent');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModifyPlan = async () => {
    if (!modifyPrompt.trim() || !currentPlan) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/ai/modify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPlan,
          modificationPrompt: modifyPrompt,
          userSchedule: userProfile.availableDays
        })
      });

      const data = await res.json();
      if (data.updatedPlan) {
        setCurrentPlan(data.updatedPlan);
        setActiveProposedPlan(data.updatedPlan);
        setModifyPrompt("");
        setStep('review');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Could not modify plan: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendChatMessage = async () => {
    if (!chatInput.trim()) return;
    const newMsg = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, newMsg]);
    setChatInput("");

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, newMsg],
          userProfile,
          currentDomain: selectedDomain
        })
      });
      const data = await res.json();
      if (data.reply) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAcceptPlan = () => {
    if (!currentPlan) return;
    acceptPlanIntoLifeHub(currentPlan);
    onClose();
  };

  return (
    <div id="ai-planner-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        id="ai-planner-modal-window"
        className="relative w-full max-w-4xl bg-stone-50 rounded-2xl shadow-2xl border border-amber-900/20 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#2A170F] via-[#3E2316] to-[#1C100A] text-amber-50 px-6 py-4 flex items-center justify-between border-b border-amber-800/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shadow-inner">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-white">LifeHub AI Intelligence Engine</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 rounded-full border border-amber-400/30">
                  Structured Planner
                </span>
              </div>
              <p className="text-xs text-amber-200/80">
                Turns natural goals into realistic budgets, milestones, and actionable tasks
              </p>
            </div>
          </div>

          <button
            id="close-ai-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-amber-200/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {errorMessage && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: INTENT & DOMAIN SELECTION */}
          {step === 'intent' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-serif font-bold text-stone-900">
                  What would you like to work on, {userProfile.name.split(' ')[0]}?
                </h4>
                <p className="text-sm text-stone-600 mt-1">
                  Select a domain or describe your vision in your own words. LifeHub will tailor it to your schedule and budget.
                </p>
              </div>

              {/* Domain Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {DOMAIN_OPTIONS.map(d => (
                  <button
                    key={d.id}
                    onClick={() => handleSelectDomain(d.id)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedDomain === d.id
                        ? 'bg-amber-900 text-amber-50 border-amber-800 shadow-md font-semibold'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-amber-700/50 hover:bg-amber-50/50'
                    }`}
                  >
                    <span className="text-base">{d.icon}</span>
                    <span className="text-xs font-semibold mt-2">{d.label}</span>
                  </button>
                ))}

                {/* "I'm Not Sure" Guided option */}
                <button
                  onClick={() => {
                    setIsAiNotSureMode(true);
                    setPromptText("I'm not sure where to begin. Guide me to discover what needs improvement in my budget, skills, or health.");
                  }}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between col-span-2 sm:col-span-3 ${
                    isAiNotSureMode
                      ? 'bg-amber-100/80 border-amber-500 text-amber-950 font-semibold'
                      : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-700" />
                    <span className="text-xs font-bold">🤔 I'm not sure / Explore with AI</span>
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1">
                    Let LifeHub AI ask thoughtful questions to clarify what feels most pressing right now.
                  </span>
                </button>
              </div>

              {/* Goal Input Field */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Describe Your Goal or Project:
                </label>
                <textarea
                  value={promptText}
                  onChange={e => setPromptText(e.target.value)}
                  placeholder="e.g. I want to save KSh 80,000 for a laptop by December while paying school fees..."
                  rows={3}
                  className="w-full p-3.5 bg-white rounded-xl border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 text-stone-900 text-sm shadow-inner"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] text-stone-500 font-medium">Quick Suggestions:</span>
                  <button
                    onClick={() => {
                      setSelectedDomain('finance');
                      setPromptText("I want to save KSh 80,000 for a laptop by December, but I also have school expenses.");
                    }}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 cursor-pointer"
                  >
                    💻 Laptop KSh 80,000
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDomain('art_heritage');
                      setPromptText("I want to commission a custom 3-piece Tabaka soapstone elephant suite with Papa Charles Nyabuto for KSh 16,500.");
                    }}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 cursor-pointer"
                  >
                    🐘 Tabaka Soapstone Commission
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDomain('health');
                      setPromptText("I want to gain muscle and strength with 3 workouts per week avoiding Wednesday conflicts.");
                    }}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 cursor-pointer"
                  >
                    💪 3-Day Strength Plan
                  </button>
                </div>
              </div>

              {/* Life Constraints Snapshot */}
              <div className="p-3.5 bg-stone-100/80 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                <div className="flex items-center justify-between font-bold text-stone-800">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Life Profile Context (Auto-Applied to Plan)
                  </span>
                  <span className="text-amber-800 font-medium">
                    Available: {userProfile.availableDays.join(', ')}
                  </span>
                </div>
                <p className="text-[11px]">
                  Income: {formatMoney(userProfile.monthlyIncomeKSh)}/mo • Fixed Bills: {formatMoney(userProfile.fixedExpensesKSh)} • Classes on Mon/Tue
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-200 text-sm font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartClarification}
                  disabled={!promptText.trim() || isLoading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 text-sm font-semibold shadow-md transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Analyze & Plan with AI</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CLARIFICATION STEP */}
          {step === 'clarify' && (
            <div className="space-y-6">
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-stone-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>I can help you build that.</span>
                </div>
                <p className="text-xs text-stone-600">
                  To ensure this plan fits your actual life and doesn't demand unrealistic sacrifices, let's confirm 2-3 key details:
                </p>
              </div>

              <div className="space-y-4">
                {aiClarificationQuestions.map((q, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-800">
                      {idx + 1}. {q}
                    </label>
                    <input
                      type="text"
                      placeholder="Your answer..."
                      value={clarificationAnswers[q] || ''}
                      onChange={e => setClarificationAnswers({ ...clarificationAnswers, [q]: e.target.value })}
                      className="w-full p-2.5 bg-white rounded-lg border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 text-stone-900 text-xs shadow-inner"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <button
                  onClick={() => setStep('intent')}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-200 text-xs font-medium cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  onClick={handleGeneratePlan}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 text-sm font-semibold shadow-md transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Generate Personalized Plan</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP: GENERATING ANIMATION */}
          {step === 'generating' && (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center border border-amber-300 shadow-md animate-bounce">
                <Sparkles className="w-8 h-8 text-amber-800 animate-spin" />
              </div>
              <h4 className="text-lg font-serif font-bold text-stone-900">
                Synthesizing LifeHub Intelligence...
              </h4>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Calibrating your budget, weekly milestones, schedule constraints, and habit systems into an actionable plan.
              </p>
            </div>
          )}

          {/* STEP 3: STRUCTURED PLAN REVIEW */}
          {step === 'review' && currentPlan && (
            <div className="space-y-6">
              {/* Top Plan Hero Card */}
              <div className="bg-gradient-to-br from-stone-900 via-[#1F120B] to-[#2E180D] text-amber-50 p-6 rounded-2xl shadow-lg border border-amber-700/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                  <Sparkles className="w-40 h-40 text-amber-300" />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-500/20 text-amber-300 rounded-lg border border-amber-400/30 uppercase tracking-wider">
                        ✨ LIFEHUB AI PLAN
                      </span>
                      <span className="px-2.5 py-1 text-[11px] font-medium bg-stone-800/80 text-stone-300 rounded-lg">
                        Domain: {currentPlan.domain}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-amber-200/80 block">Target Metric</span>
                      <span className="text-xl font-serif font-black text-amber-300">
                        {currentPlan.targetMetric}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
                      {currentPlan.title}
                    </h3>
                    <p className="text-xs text-amber-100/80 mt-1 leading-relaxed">
                      {currentPlan.summary}
                    </p>
                  </div>

                  {/* High level plan metric boxes */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="bg-black/30 p-3 rounded-xl border border-amber-900/40">
                      <span className="text-[10px] text-amber-300/80 uppercase font-semibold block">Deadline</span>
                      <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {currentPlan.deadline}
                      </span>
                    </div>

                    <div className="bg-black/30 p-3 rounded-xl border border-amber-900/40">
                      <span className="text-[10px] text-amber-300/80 uppercase font-semibold block">Cadence</span>
                      <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {currentPlan.recommendedCadence}
                      </span>
                    </div>

                    <div className="bg-black/30 p-3 rounded-xl border border-amber-900/40 col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-amber-300/80 uppercase font-semibold block">Structure</span>
                      <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        {currentPlan.milestones?.length || 0} Milestones • {currentPlan.actionTasks?.length || 0} Tasks
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BUDGET ADJUSTMENTS */}
              {currentPlan.budgetAdjustments && currentPlan.budgetAdjustments.length > 0 && (
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>Budget Adjustments & Resource Plan</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentPlan.budgetAdjustments.map((b, idx) => (
                      <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          ✓
                        </div>
                        <div className="text-xs space-y-0.5">
                          <div className="font-bold text-stone-800">{b.category}</div>
                          <p className="text-stone-600">{b.action}</p>
                          {b.impact && (
                            <p className="text-[11px] text-emerald-700 font-medium">↳ {b.impact}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ACTION TASKS */}
              {currentPlan.actionTasks && currentPlan.actionTasks.length > 0 && (
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                      <CheckCircle className="w-4 h-4 text-amber-700" />
                      <span>Actionable Tasks (Scheduled Directly into LifeHub)</span>
                    </div>
                    <span className="text-xs text-stone-500">{currentPlan.actionTasks.length} tasks ready</span>
                  </div>

                  <div className="space-y-2">
                    {currentPlan.actionTasks.map((t, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-stone-50 hover:bg-amber-50/50 rounded-xl border border-stone-200 text-xs transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-full border border-stone-400 bg-white flex items-center justify-center text-[10px] text-stone-500 font-bold">
                            {idx + 1}
                          </span>
                          <div>
                            <span className="font-semibold text-stone-800">{t.title}</span>
                            <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                              <span className="text-amber-800 font-medium">📅 {t.scheduledDay}</span>
                              <span>•</span>
                              <span>⏱️ {t.estimatedTime}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase ${
                          t.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-stone-200 text-stone-700'
                        }`}>
                          {t.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MILESTONES TIMELINE */}
              {currentPlan.milestones && currentPlan.milestones.length > 0 && (
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                    <Calendar className="w-4 h-4 text-stone-700" />
                    <span>Milestones Timeline</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentPlan.milestones.map((m, idx) => (
                      <div key={idx} className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-800">{m.title}</span>
                          <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                            {m.targetDate}
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-700 font-medium">🎯 {m.targetValue}</p>
                        <p className="text-stone-500 text-[11px]">{m.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* WHY THIS WORKS */}
              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200/80 text-xs text-stone-700 space-y-1">
                <span className="font-bold text-amber-950 flex items-center gap-1.5">
                  💡 Why This Works For You
                </span>
                <p className="leading-relaxed text-stone-600">
                  {currentPlan.whyThisWorks}
                </p>
              </div>

              {/* ACTION BAR */}
              <div className="sticky bottom-0 bg-stone-50/95 backdrop-blur-md p-4 rounded-xl border border-stone-300 shadow-lg flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setStep('modify')}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 text-xs sm:text-sm font-semibold border border-stone-300 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4 text-stone-600" />
                    <span>Modify Plan</span>
                  </button>
                  <button
                    onClick={() => setStep('intent')}
                    className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-stone-600 hover:bg-stone-200 text-xs font-medium cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Start Over</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="accept-plan-action-btn"
                    onClick={handleAcceptPlan}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-stone-900 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer border border-amber-600/50"
                  >
                    <CheckCircle className="w-4 h-4 text-amber-300" />
                    <span>Accept Plan & Create in LifeHub</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONVERSATIONAL MODIFIER */}
          {step === 'modify' && currentPlan && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-xl border border-stone-200 text-xs space-y-2">
                <span className="font-bold text-stone-800 text-sm">
                  What would you like to adjust in your plan?
                </span>
                <p className="text-stone-500">
                  Tell LifeHub AI what needs changing. For example: "I don't have time on Wednesdays, move Wednesday's workout to Saturday and adjust my study schedule" or "Lower weekly saving to KSh 1,800 and extend deadline by 3 weeks".
                </p>
                <textarea
                  value={modifyPrompt}
                  onChange={e => setModifyPrompt(e.target.value)}
                  placeholder="e.g. Move Wednesday workout to Saturday and reduce weekly saving to KSh 1,800..."
                  rows={3}
                  className="w-full p-3 bg-stone-50 rounded-xl border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 text-stone-900 text-sm shadow-inner"
                />

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] text-stone-400">Quick Adjustments:</span>
                  <button
                    onClick={() => setModifyPrompt("Move Wednesday sessions to Saturday morning due to university schedule.")}
                    className="text-[11px] px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                  >
                    Move Wed to Sat
                  </button>
                  <button
                    onClick={() => setModifyPrompt("Reduce weekly savings to KSh 1,800 and extend deadline to January 15.")}
                    className="text-[11px] px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                  >
                    KSh 1,800/wk (Extend)
                  </button>
                  <button
                    onClick={() => setModifyPrompt("Add 2 home dumbbell replacement workouts.")}
                    className="text-[11px] px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                  >
                    Home workouts
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setStep('review')}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-200 text-xs font-medium cursor-pointer"
                >
                  Cancel & Back to Plan
                </button>
                <button
                  onClick={handleModifyPlan}
                  disabled={!modifyPrompt.trim() || isLoading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 text-sm font-semibold shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Apply Modifications</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
