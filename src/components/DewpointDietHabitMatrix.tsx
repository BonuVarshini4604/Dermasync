import React, { useState } from 'react';
import { Droplets, Sparkles, AlertOctagon, Heart, Calendar, Plus, Check, ChevronRight, TrendingDown, TrendingUp, Globe, MapPin } from 'lucide-react';
import { playWaterPop } from '../utils/dewpointAudio';
import { GeoEnvironmentalData } from '../types/dermasync';

interface DewpointDietHabitMatrixProps {
  geoData?: GeoEnvironmentalData;
}

export const DewpointDietHabitMatrix: React.FC<DewpointDietHabitMatrixProps> = ({ geoData }) => {
  const isIndiaDetected = geoData?.country === 'IN';
  const [dietEcosystem, setDietEcosystem] = useState<'IN' | 'GLOBAL'>(isIndiaDetected ? 'IN' : 'GLOBAL');

  // Dynamic climate-adjusted water target
  const baseLiters = geoData && geoData.temperatureC > 28 ? 3.2 : 2.8;
  const targetCups = Math.round((baseLiters * 1000) / 350);

  const [loggedCups, setLoggedCups] = useState<number>(Math.min(6, targetCups - 2));
  const currentLiters = ((loggedCups * 350) / 1000).toFixed(1);

  const handleToggleCup = (index: number) => {
    if (loggedCups === index + 1) {
      setLoggedCups(index);
    } else {
      setLoggedCups(index + 1);
    }
    playWaterPop();
  };

  // Weekly Photo Progress Comparison
  const [activeWeek, setActiveWeek] = useState<number>(4);

  const progressMilestones = [
    {
      week: 1,
      label: 'Week 1: Starting Out',
      erythema: '78/100 (Flushed)',
      hydration: '38% (Dry)',
      barrier: '46/100 (Sensitive)',
      note: 'Skin felt tight and easily stung after washing. Noticeable red spots and dry patches on the cheeks.',
      gradient: 'from-[#FFD5B9]/60 via-[#FFDBDB]/50 to-white'
    },
    {
      week: 4,
      label: 'Week 4: Mid-Way Check',
      erythema: '48/100 (Calmer)',
      hydration: '68% (Plump)',
      barrier: '74/100 (Healing)',
      note: 'Noticeable reduction in red patches. The gentle ceramide cream stopped the dry flaking, and skin feels comfortable all day.',
      gradient: 'from-[#F6D5C3]/70 via-[#E8B49F]/40 to-white'
    },
    {
      week: 8,
      label: 'Week 8: Skin Goals Met',
      erythema: '24/100 (Clear)',
      hydration: '84% (Glowing)',
      barrier: '91/100 (Strong)',
      note: 'Old red spots have mostly faded! Skin feels soft, smooth, and resilient against weather changes.',
      gradient: 'from-[#D49B86]/60 via-[#F6D5C3]/50 to-white'
    }
  ];

  const currentMilestone = progressMilestones.find(m => m.week === activeWeek) || progressMilestones[1];

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-8 relative overflow-hidden">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3B4655]/10 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full nectar-gradient shadow-[0_0_8px_rgba(212,155,134,0.6)]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#8C5E4F] font-bold">
              EVERYDAY SKIN FOOD & HABITS
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#3B4655] tracking-tight">
            Foods Your Skin Loves (And a Few to Watch Out For)
          </h3>
          <p className="text-xs text-[#3B4655]/75 font-sans mt-1">
            Simple everyday foods that calm redness and clear up breakouts from the inside out.
          </p>
        </div>

        {/* Ecosystem Selector Toggle */}
        <div className="flex items-center gap-1.5 glass-pill p-1.5 rounded-full font-mono text-xs self-start sm:self-auto shadow-sm">
          <button
            onClick={() => {
              setDietEcosystem('IN');
              playWaterPop();
            }}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 font-bold ${
              dietEcosystem === 'IN'
                ? 'nectar-gradient text-[#3B4655] shadow-sm'
                : 'text-[#3B4655]/70 hover:text-[#3B4655]'
            }`}
          >
            <span>🇮🇳 Indian Foods</span>
          </button>
          <button
            onClick={() => {
              setDietEcosystem('GLOBAL');
              playWaterPop();
            }}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 font-bold ${
              dietEcosystem === 'GLOBAL'
                ? 'bg-[#3B4655] text-white shadow-sm'
                : 'text-[#3B4655]/70 hover:text-[#3B4655]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>General Foods</span>
          </button>
        </div>
      </div>

      {/* 1. Daily Water Intake Pill Tracker */}
      <div className="p-6 rounded-2xl bg-white/70 border border-[#3B4655]/10 space-y-4 relative z-10 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-sm">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-base font-serif font-bold text-[#3B4655]">
                Daily Water Tracker
              </h4>
              <p className="text-xs text-[#3B4655]/70 font-mono">
                Goal: {baseLiters} liters today · You drank {loggedCups} of {targetCups} glasses ({currentLiters}L)
              </p>
            </div>
          </div>

          <div className="font-mono text-xs text-[#8C5E4F] font-bold nectar-badge px-3 py-1.5 rounded-full self-start sm:self-auto shadow-sm">
            {Math.round((loggedCups / targetCups) * 100)}% of your goal today
          </div>
        </div>

        {/* Tactile Frosted Glass Cups */}
        <div className="grid grid-cols-4 sm:grid-cols-9 gap-2.5 pt-2">
          {Array.from({ length: targetCups }).map((_, idx) => {
            const isFilled = idx < loggedCups;
            return (
              <button
                key={idx}
                onClick={() => handleToggleCup(idx)}
                className={`group py-3.5 px-2 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1.5 shadow-sm ${
                  isFilled
                    ? 'bg-sky-50 border-sky-300 text-sky-800 shadow-[0_4px_14px_rgba(56,189,248,0.2)]'
                    : 'bg-white border-[#3B4655]/10 hover:border-[#D49B86]/40 text-[#3B4655]/50'
                }`}
              >
                <Droplets className={`w-4 h-4 transition-transform group-hover:scale-110 ${isFilled ? 'text-sky-600 fill-sky-600' : 'text-[#3B4655]/30'}`} />
                <span className="font-mono text-[10px] font-bold">
                  {isFilled ? 'Done' : `Glass ${idx + 1}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Anti-Inflammatory Dietary Focus Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* Foods Your Skin Loves */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/80 border border-[#D49B86]/30 space-y-4 shadow-[0_16px_36px_-10px_rgba(212,155,134,0.18)]">
          <div className="flex items-center justify-between border-b border-[#3B4655]/10 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D49B86]" />
              <h4 className="text-base font-serif font-bold text-[#3B4655]">
                {dietEcosystem === 'IN' ? 'Foods That Help Your Skin Glow' : 'Foods That Help Your Skin Glow'}
              </h4>
            </div>
            <span className="text-[10px] font-mono text-[#8C5E4F] font-bold nectar-badge px-2.5 py-0.5 rounded-full">
              Skin Boosters
            </span>
          </div>

          <div className="space-y-3 font-sans text-xs">
            {dietEcosystem === 'IN' ? (
              <>
                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#3B4655]/10 space-y-1 shadow-sm">
                  <div className="flex justify-between font-mono text-[11px] font-bold text-[#8C5E4F]">
                    <span>Fresh Amla (Indian Gooseberry)</span>
                    <span>1 raw or shot daily</span>
                  </div>
                  <p className="text-[#3B4655]/85 leading-relaxed">
                    Packed with 20 times more Vitamin C than an orange! Helps build natural collagen to keep skin bouncy and naturally fades dark post-pimple marks.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#3B4655]/10 space-y-1 shadow-sm">
                  <div className="flex justify-between font-mono text-[11px] font-bold text-[#8C5E4F]">
                    <span>Turmeric Milk with a Pinch of Black Pepper</span>
                    <span>Warm cup before bed</span>
                  </div>
                  <p className="text-[#3B4655]/85 leading-relaxed">
                    A pinch of black pepper helps your body absorb the turmeric. It works wonders to soothe red, angry breakouts and calm sensitive cheeks.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#3B4655]/10 space-y-1 shadow-sm">
                  <div className="flex justify-between font-mono text-[11px] font-bold text-[#8C5E4F]">
                    <span>A Glass of Spiced Chaas (Buttermilk) or Dahi (Curd)</span>
                    <span>With lunch</span>
                  </div>
                  <p className="text-[#3B4655]/85 leading-relaxed">
                    Full of healthy live gut bacteria. A happy, balanced tummy directly prevents sudden skin redness, flaking, and irritation.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#3B4655]/10 space-y-1 shadow-sm">
                  <div className="flex justify-between font-mono text-[11px] font-bold text-[#8C5E4F]">
                    <span>Methi (Fenugreek) Water or Roasted Flaxseeds</span>
                    <span>First thing in morning</span>
                  </div>
                  <p className="text-[#3B4655]/85 leading-relaxed">
                    Rich in healthy fibers and plant oils. Prevents sudden blood sugar rushes after meals, which keeps your pores from over-producing greasy oil.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#3B4655]/10 space-y-1 shadow-sm">
                  <div className="flex justify-between font-mono text-[11px] font-bold text-[#8C5E4F]">
                    <span>Salmon, Walnuts & Chia Seeds</span>
                    <span>3 times a week</span>
                  </div>
                  <p className="text-[#3B4655]/85 leading-relaxed">
                    Packed with natural healthy Omega-3 fats that strengthen your skin shield from within, so moisture stays locked in and dryness stops.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#3B4655]/10 space-y-1 shadow-sm">
                  <div className="flex justify-between font-mono text-[11px] font-bold text-[#8C5E4F]">
                    <span>Pumpkin Seeds & Spinach</span>
                    <span>A small handful daily</span>
                  </div>
                  <p className="text-[#3B4655]/85 leading-relaxed">
                    Rich in gentle zinc and minerals that help blemishes heal much faster without leaving red marks behind.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#3B4655]/10 space-y-1 shadow-sm">
                  <div className="flex justify-between font-mono text-[11px] font-bold text-[#8C5E4F]">
                    <span>Green Tea or Matcha</span>
                    <span>1–2 warm cups</span>
                  </div>
                  <p className="text-[#3B4655]/85 leading-relaxed">
                    Loaded with natural plant protectors that calm down red, flushed cheeks and protect against outdoor sun and pollution.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Foods That Might Trigger Breakouts */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/80 border border-[#3B4655]/15 space-y-4 shadow-[0_16px_36px_-10px_rgba(59,70,85,0.08)]">
          <div className="flex items-center justify-between border-b border-[#3B4655]/10 pb-3">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-amber-700" />
              <h4 className="text-base font-serif font-bold text-[#3B4655]">
                Foods That Might Trigger Breakouts
              </h4>
            </div>
            <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-bold">
              Easy to Swap
            </span>
          </div>

          <div className="space-y-3 font-sans text-xs">
            {dietEcosystem === 'IN' ? (
              <>
                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#3B4655]/10 space-y-1 shadow-sm">
                  <div className="flex justify-between font-mono text-[11px] font-bold text-amber-900">
                    <span>Deep-Fried Snacks (Pakoras, Samosas, Bhajias)</span>
                    <span>Reheated Cooking Oils</span>
                  </div>
                  <p className="text-[#3B4655]/85 leading-relaxed">
                    Street stall oil that gets heated over and over creates oxidized fats that can cause sudden, painful pimples within 24 to 48 hours. Try air-fried or baked versions instead!
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#3B4655]/10 space-y-1 shadow-sm">
                  <div className="flex justify-between font-mono text-[11px] font-bold text-amber-900">
                    <span>Overly Sweet Mithai & Heavily Sugared Chai</span>
                    <span>Sudden Sugar Spikes</span>
                  </div>
                  <p className="text-[#3B4655]/85 leading-relaxed">
                    Big sugar spikes tell your oil glands to pump out sticky sebum that plugs up pores. Enjoying a piece occasionally with fiber or nuts blunts the spike.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#3B4655]/10 space-y-1 shadow-sm">
                  <div className="flex justify-between font-mono text-[11px] font-bold text-amber-900">
                    <span>Heavy Whey Protein Powders & Mawa Sweets</span>
                    <span>Jawline Breakout Trigger</span>
                  </div>
                  <p className="text-[#3B4655]/85 leading-relaxed">
                    Whey protein concentrates often cause stubborn chin and jawline bumps. Swapping for plant protein (pea, brown rice, or pumpkin seed) keeps your jawline clear.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#3B4655]/10 space-y-1 shadow-sm">
                  <div className="flex justify-between font-mono text-[11px] font-bold text-amber-900">
                    <span>Whey Protein Shakes</span>
                    <span>Chin & Jawline Pimples</span>
                  </div>
                  <p className="text-[#3B4655]/85 leading-relaxed">
                    Dairy whey can trigger stubborn cystic bumps around the chin. Try swapping to plant-based pea or seed protein instead.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#3B4655]/10 space-y-1 shadow-sm">
                  <div className="flex justify-between font-mono text-[11px] font-bold text-amber-900">
                    <span>Sugary Drinks & Pastries</span>
                    <span>Fast Sugar Spikes</span>
                  </div>
                  <p className="text-[#3B4655]/85 leading-relaxed">
                    Rapid sugar rushes make your skin produce more sticky oil. Drink plenty of water and choose fresh fruit when you want something sweet.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#3B4655]/10 space-y-1 shadow-sm">
                  <div className="flex justify-between font-mono text-[11px] font-bold text-amber-900">
                    <span>Very Spicy Chili & Steaming Hot Food</span>
                    <span>Red Face Flushing</span>
                  </div>
                  <p className="text-[#3B4655]/85 leading-relaxed">
                    Extremely spicy dishes and piping hot soups dilate tiny facial blood vessels and trigger red flushing. Letting hot soups cool to warm helps a lot!
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 3. Weekly Photo Progress Comparison Slot */}
      <div className="p-6 rounded-2xl bg-white/70 border border-[#3B4655]/10 space-y-6 relative z-10 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#3B4655]/10 pb-4">
          <div>
            <h4 className="text-lg font-serif font-bold text-[#3B4655]">
              Weekly Skin Progress Photos
            </h4>
            <p className="text-xs text-[#3B4655]/70 font-sans">
              See how redness fades and moisture returns as your skin shield heals over 8 weeks.
            </p>
          </div>

          {/* Week Milestones Pills */}
          <div className="flex items-center gap-1.5 glass-pill p-1 rounded-full self-start sm:self-auto font-mono text-xs shadow-sm">
            {progressMilestones.map((m) => (
              <button
                key={m.week}
                onClick={() => {
                  setActiveWeek(m.week);
                  playWaterPop();
                }}
                className={`px-3 py-1.5 rounded-full transition-all font-bold ${
                  activeWeek === m.week
                    ? 'bg-[#3B4655] text-white shadow-sm'
                    : 'text-[#3B4655]/70 hover:text-[#3B4655]'
                }`}
              >
                Week 0{m.week}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Progress Slot Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Photo Slot Visualizer (5 Cols) */}
          <div className="md:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden border border-[#D49B86]/40 bg-gradient-to-br from-white to-[#F8F2EC] relative flex flex-col items-center justify-center p-6 text-center shadow-[0_16px_36px_-10px_rgba(212,155,134,0.25)]">
            {/* Glowing Dermal Aura */}
            <div className={`absolute inset-4 rounded-full bg-gradient-to-tr ${currentMilestone.gradient} blur-2xl opacity-75 transition-all duration-700`} />

            {/* Stylized Face Contour with Dermal Status */}
            <div className="relative z-10 space-y-3">
              <div className="w-20 h-24 mx-auto rounded-[40%] border-2 border-[#D49B86]/50 bg-white/80 flex items-center justify-center relative overflow-hidden backdrop-blur-sm shadow-md">
                <span className="font-mono text-xs font-bold text-[#3B4655] tracking-widest uppercase">
                  W0{currentMilestone.week}
                </span>
              </div>
              <div className="font-mono text-xs text-[#8C5E4F] font-bold">
                {currentMilestone.label}
              </div>
            </div>
          </div>

          {/* Dermal Metrics Breakdown (7 Cols) */}
          <div className="md:col-span-7 space-y-4">
            <div className="grid grid-cols-3 gap-3 font-mono text-center">
              <div className="p-3.5 rounded-xl bg-white border border-[#3B4655]/10 shadow-sm">
                <div className="text-[10px] text-[#3B4655]/60 uppercase font-bold">Red Spots</div>
                <div className="text-sm font-bold text-rose-700 mt-1">{currentMilestone.erythema}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#3B4655]/10 shadow-sm">
                <div className="text-[10px] text-[#3B4655]/60 uppercase font-bold">Moisture</div>
                <div className="text-sm font-bold text-sky-700 mt-1">{currentMilestone.hydration}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#3B4655]/10 shadow-sm">
                <div className="text-[10px] text-[#3B4655]/60 uppercase font-bold">Skin Shield</div>
                <div className="text-sm font-bold text-[#8C5E4F] mt-1">{currentMilestone.barrier}</div>
              </div>
            </div>

            <p className="text-xs text-[#3B4655]/85 leading-relaxed font-sans bg-white p-4 rounded-xl border border-[#3B4655]/10 shadow-sm">
              {currentMilestone.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
