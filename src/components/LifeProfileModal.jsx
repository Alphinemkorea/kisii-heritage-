import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { User, X, Check, Shield, DollarSign, Calendar, Save } from 'lucide-react';

export const LifeProfileModal = ({ isOpen, onClose }) => {
  const { userProfile, setUserProfile, formatMoney } = useApp();

  const [name, setName] = useState(userProfile.name);
  const [monthlyIncomeKSh, setMonthlyIncomeKSh] = useState(userProfile.monthlyIncomeKSh);
  const [fixedExpensesKSh, setFixedExpensesKSh] = useState(userProfile.fixedExpensesKSh);
  const [availableDays, setAvailableDays] = useState(userProfile.availableDays || []);
  const [fitnessLevel, setFitnessLevel] = useState(userProfile.fitnessLevel || 'beginner');
  const [budgetStyle, setBudgetStyle] = useState(userProfile.budgetStyle || 'moderate');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const toggleDay = (day) => {
    if (availableDays.includes(day)) {
      setAvailableDays(availableDays.filter(d => d !== day));
    } else {
      setAvailableDays([...availableDays, day]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUserProfile({
      ...userProfile,
      name,
      monthlyIncomeKSh,
      fixedExpensesKSh,
      availableDays,
      fitnessLevel,
      budgetStyle
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div id="profile-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">LifeHub Constraints & Profile</h3>
              <p className="text-xs text-stone-500">The parameters AI uses to calibrate realistic plans</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Monthly Income (KSh)
              </label>
              <input
                type="number"
                value={monthlyIncomeKSh}
                onChange={e => setMonthlyIncomeKSh(Number(e.target.value))}
                className="w-full p-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs font-mono font-bold text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Fixed Bills / School (KSh)
              </label>
              <input
                type="number"
                value={fixedExpensesKSh}
                onChange={e => setFixedExpensesKSh(Number(e.target.value))}
                className="w-full p-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs font-mono font-bold text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5">
              Available Days for Workouts & Goals:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {allDays.map(d => {
                const isSelected = availableDays.includes(d);
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDay(d)}
                    className={`px-3 py-1.5 text-xs rounded-xl font-medium cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-900 text-white shadow-xs font-bold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Budget Discipline</label>
              <select
                value={budgetStyle}
                onChange={e => setBudgetStyle(e.target.value)}
                className="w-full p-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900"
              >
                <option value="moderate">Moderate</option>
                <option value="conservative">Conservative</option>
                <option value="aggressive">Aggressive</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Fitness Level</label>
              <select
                value={fitnessLevel}
                onChange={e => setFitnessLevel(e.target.value)}
                className="w-full p-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-stone-600 space-y-0.5">
            <span className="font-bold text-amber-900 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              Real-World Safety Guardrails
            </span>
            <p>
              Net Discretionary Margin: <strong className="text-stone-800">{formatMoney(monthlyIncomeKSh - fixedExpensesKSh)}/month</strong>. LifeHub AI will never recommend savings or commitments that exceed this buffer.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-stone-600 text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white text-xs font-bold shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4 text-amber-300" />
              <span>{savedSuccess ? 'Saved!' : 'Save Profile Context'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
