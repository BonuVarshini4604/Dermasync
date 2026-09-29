import React, { useState } from 'react';
import { ProgressLogEntry } from '../../types/dermasync';
import { Camera, Plus, TrendingDown, TrendingUp, Check, Calendar } from 'lucide-react';

export const ProgressTimeline: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(4);
  const [logs, setLogs] = useState<ProgressLogEntry[]>([
    {
      id: 'log-1',
      weekNumber: 1,
      date: 'Baseline Intake',
      photoUrl: '',
      notes: 'Initial clinical presentation: diffuse malar erythema, prominent post-inflammatory erythema (PIE) macules on cheeks, and moderate flaking upon waking.',
      erythemaLevel: 78,
      hydrationScore: 38,
      barrierHealthScore: 46
    },
    {
      id: 'log-4',
      weekNumber: 4,
      date: 'Mid-Point Evaluation',
      photoUrl: '',
      notes: 'Marked reduction in reactive flushing. The 2:4:2 lipid emulsion has repaired desquamation. Zero stinging reported with azelaic acid.',
      erythemaLevel: 48,
      hydrationScore: 68,
      barrierHealthScore: 74
    },
    {
      id: 'log-8',
      weekNumber: 8,
      date: 'Protocol Target Milestone',
      photoUrl: '',
      notes: 'Substantial PIE resolution. Stratum corneum is resilient with smooth texture and normalized sebum production in the T-zone.',
      erythemaLevel: 24,
      hydrationScore: 84,
      barrierHealthScore: 91
    }
  ]);

  const [showAddLogModal, setShowAddLogModal] = useState(false);
  const [newLogNote, setNewLogNote] = useState('');
  const [newLogWeek, setNewLogWeek] = useState(12);

  const activeLog = logs.find(l => l.weekNumber === selectedMilestone) || logs[0];
  const baseline = logs[0];

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogNote) return;
    const newEntry: ProgressLogEntry = {
      id: `log-${Date.now()}`,
      weekNumber: newLogWeek,
      date: `Week ${newLogWeek} Check-In`,
      photoUrl: '',
      notes: newLogNote,
      erythemaLevel: Math.max(15, activeLog.erythemaLevel - 8),
      hydrationScore: Math.min(95, activeLog.hydrationScore + 6),
      barrierHealthScore: Math.min(98, activeLog.barrierHealthScore + 5)
    };
    setLogs(prev => [...prev, newEntry].sort((a, b) => a.weekNumber - b.weekNumber));
    setSelectedMilestone(newLogWeek);
    setShowAddLogModal(false);
    setNewLogNote('');
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1EFEA] pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
            Dermal Longitudinal Assessment
          </span>
          <h3 className="text-xl font-serif font-bold text-[#1E293B] mt-0.5">
            Skin Progress Timeline & Metric Trajectory
          </h3>
        </div>

        <button
          onClick={() => setShowAddLogModal(true)}
          className="self-start sm:self-auto px-3 py-1.5 text-xs font-medium text-[#2E4A3D] bg-[#E9EFEA] hover:bg-[#DCE6DE] rounded-md transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Log Follow-Up Assessment</span>
        </button>
      </div>

      {/* Metric Delta Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#F8FAFC] p-4 rounded-lg border border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <TrendingDown className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs text-[#64748B]">Red Breakout Spots</div>
            <div className="text-lg font-mono font-bold text-[#1E293B] tabular-nums">
              -54% <span className="text-xs font-normal text-emerald-600">Faded</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs text-[#64748B]">Skin Moisture Level</div>
            <div className="text-lg font-mono font-bold text-[#1E293B] tabular-nums">
              +121% <span className="text-xs font-normal text-emerald-600">Increase</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#2E4A3D]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs text-[#64748B]">Lipid Barrier Resilience</div>
            <div className="text-lg font-mono font-bold text-[#1E293B] tabular-nums">
              +98% <span className="text-xs font-normal text-emerald-600">Rebuilt</span>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {logs.map((log) => (
          <button
            key={log.id}
            onClick={() => setSelectedMilestone(log.weekNumber)}
            className={`px-4 py-2 text-xs font-medium rounded-lg border transition-all whitespace-nowrap ${
              selectedMilestone === log.weekNumber
                ? 'bg-[#2E4A3D] text-white border-[#2E4A3D] shadow-xs'
                : 'bg-white border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <span>Week {log.weekNumber}</span>
            <span className="opacity-70 ml-1.5">({log.date})</span>
          </button>
        ))}
      </div>

      {/* Visual Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Visual Split / Portrait simulation (6 cols) */}
        <div className="md:col-span-6 space-y-3">
          <div className="text-xs font-semibold text-[#1E293B] flex items-center justify-between">
            <span>Clinical Portrait: Week {activeLog.weekNumber}</span>
            <span className="font-mono text-[#64748B] text-[11px]">{activeLog.date}</span>
          </div>

          <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[#CBD5E1] bg-[#F1EFEA] relative flex items-center justify-center">
            {/* Visual simulation of dermal healing */}
            <div
              className={`w-full h-full flex flex-col items-center justify-center p-6 text-center transition-colors duration-500 ${
                activeLog.weekNumber === 1
                  ? 'bg-gradient-to-br from-rose-100/70 via-amber-50 to-stone-100'
                  : activeLog.weekNumber === 4
                  ? 'bg-gradient-to-br from-emerald-50 via-stone-50 to-sky-50'
                  : 'bg-gradient-to-br from-[#F4F7F5] via-white to-stone-50'
              }`}
            >
              {/* Clinical wireframe cross-hairs */}
              <div className="w-40 h-40 rounded-full border border-dashed border-[#64748B]/40 flex flex-col items-center justify-center relative p-3">
                <div
                  className={`w-24 h-24 rounded-full transition-all duration-700 flex items-center justify-center ${
                    activeLog.weekNumber === 1
                      ? 'bg-rose-400/20 ring-4 ring-rose-300/40'
                      : activeLog.weekNumber === 4
                      ? 'bg-amber-300/20 ring-2 ring-amber-200/40'
                      : 'bg-emerald-400/15 ring-1 ring-emerald-300/30'
                  }`}
                >
                  <span className="text-[11px] font-mono text-[#475569]">
                    {activeLog.weekNumber === 1 ? 'Active PIE Flush' : activeLog.weekNumber === 4 ? 'Moderate Calm' : 'Clear Epithelium'}
                  </span>
                </div>
              </div>

              <div className="mt-3 text-xs font-serif font-semibold text-[#1E293B]">
                Stratum Corneum Integrity: {activeLog.barrierHealthScore}/100
              </div>
              <div className="text-[11px] text-[#64748B]">
                TEWL Reduction: {activeLog.weekNumber * 8 + 12}% from baseline
              </div>
            </div>
          </div>
        </div>

        {/* Right: Clinical Log Notes & Metric Graph (6 cols) */}
        <div className="md:col-span-6 space-y-4">
          <div className="bg-[#FAF9F5] p-5 rounded-lg border border-[#E8E6DF] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1E293B]">Clinical Observation Notes</span>
              <span className="font-mono text-[#64748B] text-[11px]">Logged by Patient & Algorithm</span>
            </div>
            <p className="text-xs text-[#334155] leading-relaxed">
              {activeLog.notes}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-semibold text-[#1E293B]">
              Milestone Dermal Readings:
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[#475569] mb-1">
                  <span>Red Spots Level</span>
                  <span className="font-mono tabular-nums font-semibold text-[#1E293B]">{activeLog.erythemaLevel} / 100</span>
                </div>
                <div className="h-1.5 w-full bg-[#F1EFEA] rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${activeLog.erythemaLevel}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#475569] mb-1">
                  <span>Hydration Score</span>
                  <span className="font-mono tabular-nums font-semibold text-[#1E293B]">{activeLog.hydrationScore} / 100</span>
                </div>
                <div className="h-1.5 w-full bg-[#F1EFEA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#38BDF8] rounded-full" style={{ width: `${activeLog.hydrationScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#475569] mb-1">
                  <span>Barrier Health</span>
                  <span className="font-mono tabular-nums font-semibold text-[#1E293B]">{activeLog.barrierHealthScore} / 100</span>
                </div>
                <div className="h-1.5 w-full bg-[#F1EFEA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2E4A3D] rounded-full" style={{ width: `${activeLog.barrierHealthScore}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Log Modal */}
      {showAddLogModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 border border-[#CBD5E1] shadow-xl space-y-4">
            <h4 className="text-lg font-serif font-bold text-[#1E293B]">
              Log Follow-Up Evaluation
            </h4>
            <form onSubmit={handleAddLog} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#475569] font-medium mb-1">Week Number</label>
                <input
                  type="number"
                  min="2"
                  max="52"
                  value={newLogWeek}
                  onChange={(e) => setNewLogWeek(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[#CBD5E1] rounded-md text-xs"
                />
              </div>

              <div>
                <label className="block text-[#475569] font-medium mb-1">Patient Skin Observations</label>
                <textarea
                  rows={3}
                  value={newLogNote}
                  onChange={(e) => setNewLogNote(e.target.value)}
                  placeholder="Note any changes in stinging, redness, breakouts, or texture..."
                  className="w-full px-3 py-2 border border-[#CBD5E1] rounded-md text-xs focus:ring-1 focus:ring-[#2E4A3D]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLogModal(false)}
                  className="px-3 py-2 text-xs font-medium text-[#64748B] hover:text-[#1E293B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2E4A3D] hover:bg-[#23382E] text-white text-xs font-semibold rounded-md shadow-xs"
                >
                  Save Log Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
