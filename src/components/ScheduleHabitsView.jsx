import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import {
  Calendar,
  Clock,
  Plus,
  Flame,
  CheckCircle2,
  Trash2,
  Sparkles,
  BookOpen,
  Dumbbell,
  DollarSign
} from 'lucide-react';

export const ScheduleHabitsView = () => {
  const {
    schedule,
    addScheduleItem,
    removeScheduleItem,
    habits,
    toggleHabit,
    setIsAiModalOpen
  } = useApp();

  const [newDay, setNewDay] = useState("Monday");
  const [newTime, setNewTime] = useState("Morning");
  const [newActivity, setNewActivity] = useState("");
  const [newCategory, setNewCategory] = useState("General");
  const [isAddingItem, setIsAddingItem] = useState(false);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!newActivity.trim()) return;

    addScheduleItem({
      id: `s-${Date.now()}`,
      day: newDay,
      time: newTime,
      activity: newActivity,
      category: newCategory
    });

    setNewActivity("");
    setIsAddingItem(false);
  };

  const getCategoryColor = (cat) => {
    switch ((cat || '').toLowerCase()) {
      case 'education':
      case 'health':
      case 'workout':
      case 'finance':
      case 'budget':
      case 'artisan':
      case 'culture':
      default:
        return 'bg-[#F7F3EE] text-[#1A1A1A] border-[#1A1A1A]/10';
    }
  };

  return (
    <div id="schedule-habits-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F7F3EE] p-6 sm:p-8 rounded-3xl border border-[#1A1A1A]/10 shadow-xs">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-50 font-bold block mb-1">
            Temporal Cadence & Habit Loops
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
            Weekly Timetable & Habit Systems
          </h1>
          <p className="text-xs text-[#1A1A1A]/70 mt-1 max-w-xl">
            Visual calendar balancing university coursework, workout sessions, weekly savings transfers, and artisan check-ins.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddingItem(!isAddingItem)}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#1A1A1A]/20 text-[#1A1A1A] text-[11px] uppercase tracking-wider font-bold hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer"
          >
            <span>+ Add Event</span>
          </button>
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-stone-800 transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Optimize with AI</span>
          </button>
        </div>
      </div>

      {/* Add Custom Schedule Item Form */}
      {isAddingItem && (
        <form onSubmit={handleAddSchedule} className="bg-white p-6 rounded-3xl border border-[#1A1A1A]/15 space-y-4 shadow-sm animate-fadeIn">
          <h3 className="font-serif font-bold text-base text-[#1A1A1A]">Add Custom Weekly Commitment</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A]/60 mb-1">Day</label>
              <select
                value={newDay}
                onChange={e => setNewDay(e.target.value)}
                className="w-full p-2.5 bg-[#FDFBF7] rounded-xl border border-[#1A1A1A]/20 text-xs text-[#1A1A1A]"
              >
                {daysOfWeek.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A]/60 mb-1">Time of Day</label>
              <select
                value={newTime}
                onChange={e => setNewTime(e.target.value)}
                className="w-full p-2.5 bg-[#FDFBF7] rounded-xl border border-[#1A1A1A]/20 text-xs text-[#1A1A1A]"
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A]/60 mb-1">Category</label>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                className="w-full p-2.5 bg-[#FDFBF7] rounded-xl border border-[#1A1A1A]/20 text-xs text-[#1A1A1A]"
              >
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Finance">Finance</option>
                <option value="Artisan">Artisan Commission</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A]/60 mb-1">Activity Title</label>
              <input
                type="text"
                value={newActivity}
                onChange={e => setNewActivity(e.target.value)}
                placeholder="e.g. 45-min Python study"
                className="w-full p-2.5 bg-[#FDFBF7] rounded-xl border border-[#1A1A1A]/20 text-xs text-[#1A1A1A]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddingItem(false)}
              className="px-4 py-2 rounded-xl text-stone-600 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer"
            >
              Save Event
            </button>
          </div>
        </form>
      )}

      {/* 7-Day Weekly Grid in Artistic Flair */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3.5">
        {daysOfWeek.map(day => {
          const dayItems = schedule.filter(s => s.day.toLowerCase() === day.toLowerCase());

          return (
            <div
              key={day}
              className="bg-white rounded-3xl border border-[#1A1A1A]/10 p-4 shadow-xs space-y-3 flex flex-col justify-between min-h-[260px]"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between border-b border-[#1A1A1A]/5 pb-2">
                  <span className="font-serif font-bold text-sm text-[#1A1A1A]">{day}</span>
                  <span className="text-[9px] font-bold text-[#1A1A1A]/40 font-mono">
                    {dayItems.length} items
                  </span>
                </div>

                <div className="space-y-2">
                  {dayItems.length === 0 ? (
                    <p className="text-[10px] text-[#1A1A1A]/40 font-serif italic py-6 text-center">Rest & Flex</p>
                  ) : (
                    dayItems.map(item => (
                      <div
                        key={item.id}
                        className={`p-3 rounded-2xl border text-xs space-y-1 relative group ${getCategoryColor(item.category)}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold uppercase tracking-wider opacity-60 font-mono">
                            {item.time}
                          </span>
                          <button
                            onClick={() => removeScheduleItem(item.id)}
                            className="opacity-0 group-hover:opacity-100 text-[#1A1A1A]/40 hover:text-red-600 transition-opacity cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-semibold text-xs leading-snug text-[#1A1A1A]">{item.activity}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-[#1A1A1A]/5 text-[9px] text-[#1A1A1A]/40 text-center uppercase tracking-widest font-mono">
                {day === 'Monday' || day === 'Tuesday' ? 'Classes' : 'Open'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Habits Streaks Full Board */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1A1A1A]/10 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]/5">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold block mb-1">
              Consistency Engines
            </span>
            <h2 className="font-serif font-bold text-xl text-[#1A1A1A]">
              Habit Cadences & Streak Architecture
            </h2>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 font-mono">
            Compounding Daily Loops
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {habits.map(h => (
            <div
              key={h.id}
              onClick={() => toggleHabit(h.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                h.completedToday
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-[#F7F3EE] hover:bg-stone-200/60 border-[#1A1A1A]/10 text-[#1A1A1A]'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">{h.name}</span>
                  <span className="text-[10px] font-bold text-[#1A1A1A] bg-white px-2 py-0.5 rounded-full border border-[#1A1A1A]/10 font-mono">
                    🔥 {h.streak}d
                  </span>
                </div>
                <p className="text-[11px] text-[#1A1A1A]/60">Cue: {h.cue}</p>
                <p className="text-[10px] text-emerald-800 font-medium">Impact: {h.benefit}</p>
              </div>

              <div className={`w-7 h-7 rounded-full flex items-center justify-center border ${
                h.completedToday
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                  : 'border-[#1A1A1A]/20 bg-white'
              }`}>
                {h.completedToday && <CheckCircle2 className="w-4 h-4" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
