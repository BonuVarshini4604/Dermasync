import React, { useState } from 'react';
import { INGREDIENT_CONFLICT_RULES, COMMON_SKINCARE_ACTIVES } from '../../data/conflicts';
import { AlertTriangle, CheckCircle, Sparkles, Clock, ShieldAlert, ArrowLeftRight } from 'lucide-react';
import { playWaterPop, playStepCompleteChime } from '../../utils/dewpointAudio';

export const IngredientConflictChecker: React.FC = () => {
  const [selectedActiveA, setSelectedActiveA] = useState<string>(COMMON_SKINCARE_ACTIVES[0].name);
  const [selectedActiveB, setSelectedActiveB] = useState<string>(COMMON_SKINCARE_ACTIVES[1].name);

  // Check matching rule
  const matchedRule = INGREDIENT_CONFLICT_RULES.find((r) => {
    const keyA = selectedActiveA.split(' ')[0].toLowerCase();
    const keyB = selectedActiveB.split(' ')[0].toLowerCase();
    const ruleA = r.activeA.toLowerCase();
    const ruleB = r.activeB.toLowerCase();

    const aMatchesRuleA = ruleA.includes(keyA);
    const bMatchesRuleB = ruleB.includes(keyB);
    const aMatchesRuleB = ruleB.includes(keyA);
    const bMatchesRuleA = ruleA.includes(keyB);

    return (aMatchesRuleA && bMatchesRuleB) || (aMatchesRuleB && bMatchesRuleA);
  });

  const activeAObj = COMMON_SKINCARE_ACTIVES.find(a => a.name === selectedActiveA);
  const activeBObj = COMMON_SKINCARE_ACTIVES.find(a => a.name === selectedActiveB);

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6 px-4 animate-fade-in text-[#3B4655]">
      {/* Editorial Header */}
      <div className="text-center space-y-2">
        <span className="font-mono text-xs uppercase tracking-widest text-[#8C5E4F] font-bold block">
          INGREDIENT CLASH CHECKER
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B4655] tracking-tight">
          Can I Use These Two Ingredients Together?
        </h2>
        <p className="text-sm text-[#3B4655]/75 max-w-xl mx-auto font-sans leading-relaxed">
          Some powerful skincare ingredients shouldn’t be put on your face at the exact same time. Pick any two ingredients below to see if they play nicely together or if you should use them on different days.
        </p>
      </div>

      {/* Interactive Pair Selector */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#3B4655]/10 pb-4">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#3B4655] flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4 text-[#D49B86]" />
            <span>Pick Two Skincare Ingredients to Check:</span>
          </div>
          <span className="text-[11px] font-mono text-[#8C5E4F] font-bold">
            Instant Safety Results
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Active 1 */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-bold text-[#3B4655]">
              First Ingredient (Product 1)
            </label>
            <select
              value={selectedActiveA}
              onChange={(e) => {
                setSelectedActiveA(e.target.value);
                playWaterPop();
              }}
              className="w-full p-3 bg-white border border-[#3B4655]/15 rounded-2xl text-xs font-mono font-semibold text-[#3B4655] focus:outline-none focus:ring-2 focus:ring-[#D49B86] shadow-sm cursor-pointer"
            >
              {COMMON_SKINCARE_ACTIVES.map((act) => (
                <option key={act.id} value={act.name}>
                  {act.name}
                </option>
              ))}
            </select>
            {activeAObj && (
              <p className="text-[11px] text-[#3B4655]/70 font-sans pl-1">
                {activeAObj.simpleWhatItDoes}
              </p>
            )}
          </div>

          {/* Active 2 */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-bold text-[#3B4655]">
              Second Ingredient (Product 2)
            </label>
            <select
              value={selectedActiveB}
              onChange={(e) => {
                setSelectedActiveB(e.target.value);
                playWaterPop();
              }}
              className="w-full p-3 bg-white border border-[#3B4655]/15 rounded-2xl text-xs font-mono font-semibold text-[#3B4655] focus:outline-none focus:ring-2 focus:ring-[#D49B86] shadow-sm cursor-pointer"
            >
              {COMMON_SKINCARE_ACTIVES.map((act) => (
                <option key={act.id} value={act.name}>
                  {act.name}
                </option>
              ))}
            </select>
            {activeBObj && (
              <p className="text-[11px] text-[#3B4655]/70 font-sans pl-1">
                {activeBObj.simpleWhatItDoes}
              </p>
            )}
          </div>
        </div>

        {/* Evaluation Output Card */}
        <div className="mt-4 pt-4 border-t border-[#3B4655]/10">
          {matchedRule ? (
            <div className={`p-5 sm:p-6 rounded-2xl border space-y-3.5 shadow-sm ${
              matchedRule.severity === 'high'
                ? 'bg-rose-50/90 border-rose-300'
                : matchedRule.severity === 'moderate'
                ? 'bg-amber-50/90 border-amber-300'
                : 'bg-sky-50/90 border-sky-300'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className={`w-5 h-5 ${
                    matchedRule.severity === 'high' ? 'text-rose-600' : 'text-amber-600'
                  }`} />
                  <span className="text-sm font-bold font-mono uppercase text-[#3B4655]">
                    ⚠️ Ingredient Clash Warning ({matchedRule.severity === 'high' ? 'High Risk' : 'Take Caution'})
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-white border border-[#3B4655]/10 text-[#3B4655] shadow-sm">
                  Do Not Use at the Exact Same Time
                </span>
              </div>

              <div className="text-xs text-[#3B4655] leading-relaxed font-sans">
                <strong className="font-semibold text-[#3B4655] block font-mono text-[11px] uppercase mb-1">
                  Why They Clash:
                </strong>
                {matchedRule.explanation}
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#3B4655]/10 text-xs text-[#3B4655] font-sans">
                <strong className="font-semibold text-[#8C5E4F] block font-mono text-[11px] uppercase mb-0.5">
                  How to Use Both Safely:
                </strong>
                {matchedRule.separationStrategy}
              </div>
            </div>
          ) : (
            <div className="p-5 sm:p-6 rounded-2xl border border-emerald-300 bg-emerald-50/90 space-y-2.5 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-bold font-mono uppercase">
                  ✓ Safe to Use Together!
                </span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed font-sans">
                Great news! There is no clash between these two ingredients. Put on the lighter, watery serum first, let it absorb for 1 minute, and follow with your cream or sunscreen.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Helpful Quick Rules Table */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-5">
        <div>
          <h3 className="text-xl font-serif font-bold text-[#3B4655]">
            Quick Cheat Sheet: Famous Skincare Clashes
          </h3>
          <p className="text-xs text-[#3B4655]/70 font-sans mt-0.5">
            Keep this handy rule-of-thumb in mind when building your daily routine:
          </p>
        </div>

        <div className="space-y-3">
          {INGREDIENT_CONFLICT_RULES.map((rule, idx) => (
            <div key={idx} className="p-4 rounded-2xl border border-[#3B4655]/10 bg-white/80 space-y-2 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-mono font-bold text-[#3B4655]">
                  {rule.activeA.split('(')[0]} <span className="text-rose-500 font-bold">+</span> {rule.activeB.split('(')[0]}
                </div>
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold border ${
                  rule.severity === 'high'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  {rule.severity === 'high' ? 'Never Layer Together' : 'Use on Different Times'}
                </span>
              </div>

              <p className="text-xs text-[#3B4655]/85 leading-relaxed font-sans">
                {rule.explanation}
              </p>

              <div className="text-[11px] font-mono text-[#8C5E4F] font-semibold">
                Tip: {rule.separationStrategy}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
