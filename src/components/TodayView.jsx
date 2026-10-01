import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Plus,
  Flame,
  Target,
  Clock,
  ArrowRight,
  TrendingUp,
  Calendar,
  Send,
  HelpCircle,
  Shield,
  Palette
} from 'lucide-react';

export const TodayView = () => {
  const {
    userProfile,
    goals,
    tasks,
    toggleTask,
    habits,
    toggleHabit,
    formatMoney,
    setIsAiModalOpen,
    setIsImportModalOpen,
    setActiveTab,
    addSavingsDeposit
  } = useApp();

  const [quickAiQuestion, setQuickAiQuestion] = useState("");
  const [quickAiResponse, setQuickAiResponse] = useState(null);
  const [isQuickAiLoading, setIsQuickAiLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState(2100);

  const pendingTasks = tasks.filter(t => !t.completed);

  const handleAskQuickAi = async () => {
    if (!quickAiQuestion.trim()) return;
    setIsQuickAiLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: quickAiQuestion }],
          userProfile,
          currentDomain: "general"
        })
      });

      const data = await res.json();
      setQuickAiResponse(data.reply || "Focus on your weekly savings deposit and university study block today!");
    } catch (err) {
      setQuickAiResponse("Recommendation: Focus on logging your discretionary expenses under KSh 1,500 and completing your 45-min study block.");
    } finally {
      setIsQuickAiLoading(false);
    }
  };

  return (
    <div id="today-view-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Welcome & Quick AI Context Bar */}
      <div className="bg-[#F7F3EE] text-[#1A1A1A] rounded-3xl p-6 sm:p-10 border border-[#1A1A1A]/10 relative overflow-hidden space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-[0.3em] uppercase opacity-50 font-bold">
                Daily Operating Architecture • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif leading-tight text-[#1A1A1A]">
              What matters today, <span className="italic">{userProfile.name.split(' ')[0]}</span>?
            </h1>

            <p className="text-xs sm:text-sm text-[#1A1A1A]/70 max-w-xl leading-relaxed">
              Your LifeHub is actively aligning your <span className="font-bold text-[#1A1A1A]">{formatMoney(80000)} Laptop Goal</span>, Tabaka artisan craft commissions, and university schedule without burnout.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="px-6 py-3 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] font-bold rounded-xl hover:bg-stone-800 transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Structure Plan with AI</span>
              </button>

              <button
                onClick={() => setIsImportModalOpen(true)}
                className="px-5 py-3 bg-white border border-[#1A1A1A] text-[11px] uppercase tracking-[0.2em] font-bold rounded-xl hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer"
              >
                <span>Import from AI</span>
              </button>
            </div>
          </div>

          {/* Quick Contextual AI Assistant Box */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#1A1A1A]/10 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Contextual Intelligence
              </span>
              <span className="text-[9px] uppercase tracking-widest opacity-40 font-bold">Fast Query</span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={quickAiQuestion}
                onChange={e => setQuickAiQuestion(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAskQuickAi()}
                placeholder="e.g. What should I prioritize today?"
                className="flex-1 px-3.5 py-2.5 bg-[#FDFBF7] text-[#1A1A1A] rounded-xl border border-[#1A1A1A]/20 text-xs focus:outline-hidden focus:border-[#1A1A1A]"
              />
              <button
                onClick={handleAskQuickAi}
                disabled={isQuickAiLoading || !quickAiQuestion.trim()}
                className="px-4 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-bold disabled:opacity-50 hover:bg-stone-800 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* AI Response Display */}
            {quickAiResponse ? (
              <div className="p-4 bg-[#F7F3EE] rounded-xl border border-[#1A1A1A]/10 text-xs text-[#1A1A1A] leading-relaxed">
                <p className="font-serif italic font-bold text-[#1A1A1A]">Guidance:</p>
                <p className="mt-1 text-[11px] text-[#1A1A1A]/80">{quickAiResponse}</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  onClick={() => {
                    setQuickAiQuestion("What should I focus on today based on my goals?");
                    handleAskQuickAi();
                  }}
                  className="text-[10px] px-2.5 py-1 rounded-lg bg-[#F7F3EE] hover:bg-stone-200 text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  🎯 Focus plan
                </button>
                <button
                  onClick={() => {
                    setQuickAiQuestion("How can I trim KSh 500 from entertainment this week?");
                    handleAskQuickAi();
                  }}
                  className="text-[10px] px-2.5 py-1 rounded-lg bg-[#F7F3EE] hover:bg-stone-200 text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  💰 Spending trim
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Tasks + Active Goals + Habits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Today's Action Checklist (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Action Tasks Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1A1A1A]/10 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]/5">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold block mb-1">
                  Scheduled Pipeline
                </span>
                <h2 className="font-serif font-bold text-xl text-[#1A1A1A]">
                  Today's Actionable Tasks
                </h2>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] bg-[#F7F3EE] px-3 py-1.5 rounded-full border border-[#1A1A1A]/10">
                {pendingTasks.length} pending
              </span>
            </div>

            {/* Task Items List */}
            <div className="space-y-2.5">
              {tasks.length === 0 ? (
                <div className="text-center py-10 text-stone-400 text-xs font-serif italic">
                  No active tasks today. Generate a goal plan to populate your schedule!
                </div>
              ) : (
                tasks.map((task, idx) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                      task.completed
                        ? 'bg-[#F7F3EE]/50 border-transparent text-[#1A1A1A]/40 line-through'
                        : 'bg-white hover:bg-[#F7F3EE] border-[#1A1A1A]/10 text-[#1A1A1A] shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-xs font-serif italic opacity-40 font-bold min-w-[18px]">
                        0{idx + 1}
                      </span>
                      <button className="text-[#1A1A1A]/40 hover:text-[#1A1A1A]">
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-[#1A1A1A]/30" />
                        )}
                      </button>
                      <div>
                        <span className={`text-xs sm:text-sm font-semibold ${task.completed ? 'text-[#1A1A1A]/40' : 'text-[#1A1A1A]'}`}>
                          {task.title}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] text-[#1A1A1A]/50 mt-0.5 font-mono">
                          <span>📅 {task.scheduledDay}</span>
                          <span>•</span>
                          <span>⏱️ {task.estimatedTime}</span>
                          <span>•</span>
                          <span className="uppercase">{task.category}</span>
                        </div>
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 text-[9px] font-bold uppercase rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-[#F7F3EE] text-[#1A1A1A]'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Daily Habit Consistency */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1A1A1A]/10 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]/5">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold block mb-1">
                  Daily Loops
                </span>
                <h3 className="font-serif font-bold text-xl text-[#1A1A1A]">
                  Habit Cadence & Streaks
                </h3>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/60 font-medium">Never break twice</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {habits.map(habit => (
                <div
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    habit.completedToday
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-white hover:bg-[#F7F3EE] border-[#1A1A1A]/10 text-[#1A1A1A]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">{habit.name}</span>
                      <span className="text-[10px] font-bold text-[#1A1A1A] bg-[#F7F3EE] px-2 py-0.5 rounded-full border border-[#1A1A1A]/10 font-mono">
                        🔥 {habit.streak}d
                      </span>
                    </div>
                    <p className="text-[10px] text-[#1A1A1A]/50">Cue: {habit.cue}</p>
                  </div>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                    habit.completedToday
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'border-[#1A1A1A]/20 bg-white'
                  }`}>
                    {habit.completedToday && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active Goals Progress & Quick Deposit (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Goals Mini-Cards */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1A1A1A]/10 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]/5">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold block mb-1">
                  Active Pipelines
                </span>
                <h3 className="font-serif font-bold text-xl text-[#1A1A1A]">
                  Goals & Milestones
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('goals')}
                className="text-[11px] uppercase tracking-widest font-bold text-[#1A1A1A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>All Goals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {goals.map(goal => (
                <div key={goal.id} className="p-5 rounded-2xl bg-[#F7F3EE] border border-[#1A1A1A]/5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#1A1A1A] bg-white px-2 py-0.5 rounded border border-[#1A1A1A]/10">
                        {goal.domain}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-[#1A1A1A] mt-1.5">
                        {goal.title}
                      </h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-800">
                      {goal.targetMetric}
                    </span>
                  </div>

                  {/* Progress Bar in Artistic Flair style */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] uppercase tracking-wider text-[#1A1A1A]/60 font-bold">
                      <span>Progress</span>
                      <span>{goal.progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-stone-200 overflow-hidden">
                      <div
                        className="h-full bg-[#1A1A1A] rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(5, goal.progressPercent)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#1A1A1A]/60 pt-1 font-mono">
                    <span>📅 {goal.deadline}</span>
                    <span>{goal.milestones.filter(m => m.completed).length}/{goal.milestones.length} Milestones</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Savings Deposit Tool */}
            <div className="p-5 rounded-2xl bg-white border border-[#1A1A1A]/10 space-y-3">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] block">
                Quick Vault Deposit (M-Pesa)
              </span>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={depositAmount}
                  onChange={e => setDepositAmount(Number(e.target.value))}
                  className="w-32 px-3 py-2 text-xs bg-[#FDFBF7] rounded-xl border border-[#1A1A1A]/20 font-mono font-bold text-[#1A1A1A]"
                />
                <button
                  onClick={() => addSavingsDeposit(goals[0]?.id || "goal-1", depositAmount)}
                  className="flex-1 px-4 py-2 rounded-xl bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-stone-800 transition-all cursor-pointer"
                >
                  + Deposit {formatMoney(depositAmount)}
                </button>
              </div>
            </div>
          </div>

          {/* Kisii Heritage Artisan Spotlight */}
          <div className="bg-[#1A1A1A] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                Heritage Spotlight
              </span>
              <button
                onClick={() => setActiveTab('marketplace')}
                className="text-[10px] uppercase tracking-wider text-stone-300 hover:text-white cursor-pointer"
              >
                Artisan Gallery →
              </button>
            </div>

            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&w=400&q=80"
                alt="Papa Charles Nyabuto"
                className="w-14 h-14 rounded-full object-cover border border-white/20"
              />
              <div>
                <h4 className="font-serif italic font-bold text-base text-white">Papa Charles Nyabuto</h4>
                <p className="text-[11px] text-stone-300">Master Stonecarver • Tabaka Quarry, Kisii</p>
                <p className="text-[10px] text-stone-400 mt-0.5 font-serif italic">32 years hand-chiseling authentic soapstone</p>
              </div>
            </div>

            <button
              onClick={() => setIsAiModalOpen(true)}
              className="w-full py-3 rounded-xl bg-white text-[#1A1A1A] text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-stone-100 transition-all cursor-pointer"
            >
              Commission Bespoke Piece with AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
