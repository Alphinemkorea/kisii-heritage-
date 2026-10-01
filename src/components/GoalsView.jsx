import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import {
  Target,
  Plus,
  Sparkles,
  CheckCircle,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Trash2,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';

export const GoalsView = () => {
  const {
    goals,
    deleteGoal,
    toggleMilestone,
    addSavingsDeposit,
    formatMoney,
    setIsAiModalOpen
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedGoalId, setExpandedGoalId] = useState(goals[0]?.id || null);
  const [depositModalGoal, setDepositModalGoal] = useState(null);
  const [depositAmount, setDepositAmount] = useState(2100);

  const filteredGoals = activeFilter === 'all'
    ? goals
    : goals.filter(g => g.domain === activeFilter);

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    if (depositModalGoal && depositAmount > 0) {
      addSavingsDeposit(depositModalGoal.id, depositAmount);
      setDepositModalGoal(null);
    }
  };

  return (
    <div id="goals-view-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F7F3EE] p-6 sm:p-8 rounded-3xl border border-[#1A1A1A]/10 shadow-xs">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-50 font-bold block mb-1">
            System Intelligence • Active Pipelines
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
            Goals & Structured Action Architecture
          </h1>
          <p className="text-xs text-[#1A1A1A]/70 mt-1 max-w-xl">
            Calculated weekly cadences, budget adjustments, and milestone checkpoints generated with LifeHub AI.
          </p>
        </div>

        <button
          id="create-goal-with-ai-btn"
          onClick={() => setIsAiModalOpen(true)}
          className="px-6 py-3 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] font-bold rounded-xl hover:bg-stone-800 transition-all shadow-md cursor-pointer flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Structure New Goal</span>
        </button>
      </div>

      {/* Domain Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-xl text-[11px] uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all ${
            activeFilter === 'all'
              ? 'bg-[#1A1A1A] text-white shadow-xs'
              : 'bg-white text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#F7F3EE] border border-[#1A1A1A]/10'
          }`}
        >
          All Domains ({goals.length})
        </button>
        <button
          onClick={() => setActiveFilter('finance')}
          className={`px-4 py-2 rounded-xl text-[11px] uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all ${
            activeFilter === 'finance'
              ? 'bg-[#1A1A1A] text-white shadow-xs'
              : 'bg-white text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#F7F3EE] border border-[#1A1A1A]/10'
          }`}
        >
          💰 Finance
        </button>
        <button
          onClick={() => setActiveFilter('art_heritage')}
          className={`px-4 py-2 rounded-xl text-[11px] uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all ${
            activeFilter === 'art_heritage'
              ? 'bg-[#1A1A1A] text-white shadow-xs'
              : 'bg-white text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#F7F3EE] border border-[#1A1A1A]/10'
          }`}
        >
          🎨 Heritage Art & Sculptures
        </button>
        <button
          onClick={() => setActiveFilter('health')}
          className={`px-4 py-2 rounded-xl text-[11px] uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all ${
            activeFilter === 'health'
              ? 'bg-[#1A1A1A] text-white shadow-xs'
              : 'bg-white text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#F7F3EE] border border-[#1A1A1A]/10'
          }`}
        >
          ❤️ Health
        </button>
        <button
          onClick={() => setActiveFilter('education')}
          className={`px-4 py-2 rounded-xl text-[11px] uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all ${
            activeFilter === 'education'
              ? 'bg-[#1A1A1A] text-white shadow-xs'
              : 'bg-white text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#F7F3EE] border border-[#1A1A1A]/10'
          }`}
        >
          📚 Education
        </button>
      </div>

      {/* Goals List */}
      <div className="space-y-6">
        {filteredGoals.length === 0 ? (
          <div className="text-center py-16 bg-[#F7F3EE] rounded-3xl border border-[#1A1A1A]/10 space-y-3">
            <Target className="w-10 h-10 text-[#1A1A1A]/30 mx-auto" />
            <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">No active goals in this domain</h3>
            <p className="text-xs text-[#1A1A1A]/60 max-w-sm mx-auto">
              Use the LifeHub AI planner to design a structured plan tailored to your lifestyle.
            </p>
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer"
            >
              Plan with AI
            </button>
          </div>
        ) : (
          filteredGoals.map(goal => {
            const isExpanded = expandedGoalId === goal.id;
            const completedMilestones = goal.milestones.filter(m => m.completed).length;

            return (
              <div
                key={goal.id}
                className="bg-white rounded-3xl border border-[#1A1A1A]/10 shadow-xs overflow-hidden transition-all"
              >
                {/* Goal Main Summary Bar */}
                <div className="p-6 sm:p-8 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-widest bg-[#F7F3EE] text-[#1A1A1A] px-2.5 py-0.5 rounded-full border border-[#1A1A1A]/10">
                          {goal.domain}
                        </span>
                        <span className="text-[10px] text-[#1A1A1A]/40 font-mono">Created {goal.createdAt}</span>
                      </div>
                      <h3 className="font-serif font-bold text-2xl text-[#1A1A1A]">
                        {goal.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      {goal.targetAmount && goal.targetAmount > 0 && (
                        <button
                          onClick={() => {
                            setDepositModalGoal(goal);
                            setDepositAmount(2100);
                          }}
                          className="px-4 py-2 rounded-xl bg-white border border-[#1A1A1A] text-[#1A1A1A] text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer"
                        >
                          + Deposit Funds
                        </button>
                      )}

                      <button
                        onClick={() => setExpandedGoalId(isExpanded ? null : goal.id)}
                        className="p-2.5 rounded-xl bg-[#F7F3EE] hover:bg-stone-200 text-[#1A1A1A] transition-colors cursor-pointer border border-[#1A1A1A]/5"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-[#1A1A1A]/70 leading-relaxed max-w-3xl">
                    {goal.summary}
                  </p>

                  {/* Progress & Quick Stats */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-[#1A1A1A]">
                        Target: <span className="font-bold font-serif">{goal.targetMetric}</span>
                        {goal.currentAmount ? ` • Saved: ${formatMoney(goal.currentAmount)}` : ''}
                      </span>
                      <span className="font-mono font-bold text-[#1A1A1A]">
                        {goal.progressPercent}% Complete
                      </span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-[#F7F3EE] overflow-hidden">
                      <div
                        className="h-full bg-[#1A1A1A] rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(5, goal.progressPercent)}%` }}
                      />
                    </div>
                  </div>

                  {/* Metric Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
                    <div className="p-3 bg-[#F7F3EE] rounded-2xl border border-[#1A1A1A]/5 flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#1A1A1A]/60" />
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block">Deadline</span>
                        <span className="font-bold text-[#1A1A1A]">{goal.deadline}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#F7F3EE] rounded-2xl border border-[#1A1A1A]/5 flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#1A1A1A]/60" />
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block">Cadence</span>
                        <span className="font-bold text-[#1A1A1A] truncate">{goal.recommendedCadence}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#F7F3EE] rounded-2xl border border-[#1A1A1A]/5 flex items-center gap-2.5 col-span-2 sm:col-span-1">
                      <CheckCircle className="w-4 h-4 text-emerald-700" />
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block">Milestones</span>
                        <span className="font-bold text-[#1A1A1A]">
                          {completedMilestones} / {goal.milestones.length} Completed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="border-t border-[#1A1A1A]/10 bg-[#F7F3EE]/50 p-6 sm:p-8 space-y-6">
                    {/* Milestones Checklist in Artistic Flair */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-[#1A1A1A]/10">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]">
                          Milestone Architecture (Click to Toggle Completion)
                        </h4>
                        <span className="text-[10px] text-[#1A1A1A]/50 uppercase tracking-wider font-mono">Live state</span>
                      </div>

                      <div className="space-y-3">
                        {goal.milestones.map((m, idx) => (
                          <div
                            key={m.id}
                            onClick={() => toggleMilestone(goal.id, m.id)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 select-none ${
                              m.completed
                                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                                : 'bg-white hover:bg-[#F7F3EE] border-[#1A1A1A]/10 text-[#1A1A1A]'
                            }`}
                          >
                            <span className="text-xs font-serif italic opacity-40 font-bold min-w-[20px]">
                              0{idx + 1}
                            </span>
                            <button className="text-[#1A1A1A]/40">
                              {m.completed ? (
                                <CheckCircle className="w-5 h-5 text-emerald-700" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border border-[#1A1A1A]/30" />
                              )}
                            </button>

                            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <div>
                                <span className={`text-xs sm:text-sm font-semibold ${m.completed ? 'line-through text-emerald-900' : 'text-[#1A1A1A]'}`}>
                                  {m.title}
                                </span>
                                {m.description && (
                                  <p className="text-[11px] text-[#1A1A1A]/60">{m.description}</p>
                                )}
                              </div>
                              <div className="text-left sm:text-right">
                                <span className="text-[10px] font-mono text-emerald-800 font-bold block">{m.targetValue}</span>
                                <span className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/50">{m.targetDate}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Budget Adjustments */}
                    {goal.budgetAdjustments && goal.budgetAdjustments.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]">
                          Budget Safeguards & Reallocations
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {goal.budgetAdjustments.map((b, i) => (
                            <div key={i} className="p-4 bg-white rounded-2xl border border-[#1A1A1A]/10 text-xs space-y-1">
                              <span className="font-bold text-[#1A1A1A]">{b.category}</span>
                              <p className="text-[#1A1A1A]/70">{b.action}</p>
                              {b.impact && (
                                <p className="text-[10px] text-emerald-800 font-medium">↳ {b.impact}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Tasks */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]">
                        Scheduled Tasks ({goal.tasks.length})
                      </h4>
                      <div className="space-y-2">
                        {goal.tasks.map(t => (
                          <div key={t.id} className="p-3 bg-white rounded-xl border border-[#1A1A1A]/10 text-xs flex items-center justify-between">
                            <span className="text-[#1A1A1A] font-semibold">{t.title}</span>
                            <div className="flex items-center gap-2 text-[10px] text-[#1A1A1A]/50 font-mono">
                              <span>📅 {t.scheduledDay}</span>
                              <span>⏱️ {t.estimatedTime}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Why this works rationale */}
                    <div className="p-5 bg-white rounded-2xl border border-[#1A1A1A]/10 text-xs text-[#1A1A1A] space-y-1">
                      <span className="font-serif italic font-bold text-[#1A1A1A]">Strategic Rationale:</span>
                      <p className="leading-relaxed text-[#1A1A1A]/70">{goal.whyThisWorks}</p>
                    </div>

                    {/* Danger zone delete */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 text-xs font-medium transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Goal Plan</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Quick Deposit Modal */}
      {depositModalGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full p-8 shadow-2xl border border-[#1A1A1A]/20 space-y-5">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold block mb-1">
                Vault Transfer
              </span>
              <h3 className="font-serif font-bold text-xl text-[#1A1A1A]">
                Deposit to {depositModalGoal.title}
              </h3>
            </div>
            <p className="text-xs text-[#1A1A1A]/70">
              Enter amount to record from M-Pesa / Bank transfer into your locked vault pot:
            </p>

            <form onSubmit={handleDepositSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-1">
                  Deposit Amount (KSh):
                </label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={e => setDepositAmount(Number(e.target.value))}
                  min={100}
                  step={100}
                  className="w-full p-3 bg-white rounded-xl border border-[#1A1A1A]/20 font-mono font-bold text-lg text-[#1A1A1A]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDepositModalGoal(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-stone-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-stone-800 shadow-md cursor-pointer"
                >
                  Confirm Deposit ({formatMoney(depositAmount)})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
