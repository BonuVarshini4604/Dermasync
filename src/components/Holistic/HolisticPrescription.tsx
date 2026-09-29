import React, { useState } from 'react';
import { SkinProfileMatrix } from '../../types/dermasync';
import { DIETARY_ENHANCERS, DIETARY_TRIGGERS, LIFESTYLE_GUIDELINES, calculateTargetHydrationLiters } from '../../data/nutrition';
import { Droplets, Sparkles, AlertOctagon, Heart, Moon, Thermometer, Wind } from 'lucide-react';

interface HolisticPrescriptionProps {
  profile: SkinProfileMatrix;
}

export const HolisticPrescription: React.FC<HolisticPrescriptionProps> = ({ profile }) => {
  const [patientWeightKg, setPatientWeightKg] = useState<number>(68);
  const [activeHours, setActiveHours] = useState<number>(1);
  const [climate, setClimate] = useState<'arid' | 'temperate' | 'humid' | 'polluted_urban'>('arid');

  const targetHydration = calculateTargetHydrationLiters(climate, patientWeightKg, activeHours);

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4 animate-fade-in">
      {/* Editorial Header */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-wider text-[#64748B] font-mono">
          Systemic Dermatological Medicine
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#1E293B]">
          Holistic Dermatology & Lifestyle Prescription
        </h2>
        <p className="text-sm text-[#64748B] max-w-xl mx-auto">
          Cutaneous biology is intimately tied to systemic nutrient pathways, gut microbiome integrity, and circadian hormonal kinetics.
        </p>
      </div>

      {/* Dynamic Hydration Benchmark Calculator */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1EFEA] pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
              Fluid Dynamics Protocol
            </span>
            <h3 className="text-xl font-serif font-bold text-[#1E293B] mt-0.5 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-[#38BDF8]" />
              <span>Climate-Adjusted Daily Hydration Target</span>
            </h3>
          </div>

          <div className="bg-[#FAF9F5] border border-[#E8E6DF] px-4 py-2 rounded-lg text-right">
            <span className="text-[11px] font-mono text-[#64748B] block">Daily Minimum Intake</span>
            <span className="text-2xl font-serif font-bold text-[#1E293B] tabular-nums">
              {targetHydration} Liters
            </span>
            <span className="text-[11px] text-[#64748B] block">({Math.round(targetHydration * 33.8)} fl oz)</span>
          </div>
        </div>

        {/* Input Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div>
            <label className="block text-[#475569] font-medium mb-1 flex justify-between">
              <span>Patient Body Mass</span>
              <span className="font-mono text-[#1E293B]">{patientWeightKg} kg ({Math.round(patientWeightKg * 2.2)} lbs)</span>
            </label>
            <input
              type="range"
              min="45"
              max="120"
              value={patientWeightKg}
              onChange={(e) => setPatientWeightKg(Number(e.target.value))}
              className="w-full accent-[#2E4A3D]"
            />
          </div>

          <div>
            <label className="block text-[#475569] font-medium mb-1 flex justify-between">
              <span>Daily Physical Exertion</span>
              <span className="font-mono text-[#1E293B]">{activeHours} hrs/day</span>
            </label>
            <input
              type="range"
              min="0"
              max="4"
              step="0.5"
              value={activeHours}
              onChange={(e) => setActiveHours(Number(e.target.value))}
              className="w-full accent-[#2E4A3D]"
            />
          </div>

          <div>
            <label className="block text-[#475569] font-medium mb-1">
              Atmospheric Environment
            </label>
            <select
              value={climate}
              onChange={(e) => setClimate(e.target.value as any)}
              className="w-full p-2 bg-[#FAF9F5] border border-[#CBD5E1] rounded text-xs text-[#1E293B]"
            >
              <option value="arid">Arid / Low Humidity Desert (+0.6L)</option>
              <option value="temperate">Temperate Moderate</option>
              <option value="humid">High Humidity Tropical (+0.3L)</option>
              <option value="polluted_urban">Dense Urban High PM2.5 (+0.4L)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Nutritional Enhancers vs Triggers Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skin Enhancers */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F1EFEA] pb-3">
            <Sparkles className="w-5 h-5 text-[#2E4A3D]" />
            <h3 className="text-lg font-serif font-bold text-[#1E293B]">
              Targeted Dermal Enhancers (Prescription Diet)
            </h3>
          </div>

          <div className="space-y-4">
            {DIETARY_ENHANCERS.map((enhancer, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-[#F4F7F5] border border-[#DCE6DE] space-y-2">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-sm font-serif font-bold text-[#1E293B]">
                    {enhancer.title}
                  </h4>
                  <span className="text-[10px] font-mono text-[#2E4A3D] uppercase">
                    {enhancer.category}
                  </span>
                </div>

                <p className="text-xs text-[#334155] leading-relaxed">
                  {enhancer.scientificRationale}
                </p>

                <div className="pt-2 border-t border-[#D4E0D7] space-y-1">
                  {enhancer.actionItems.map((item, i) => (
                    <div key={i} className="text-[11px] text-[#475569] flex items-start gap-1.5">
                      <span className="text-[#2E4A3D] font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Triggers to Moderate */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F1EFEA] pb-3">
            <AlertOctagon className="w-5 h-5 text-rose-600" />
            <h3 className="text-lg font-serif font-bold text-[#1E293B]">
              Biological Triggers to Moderate
            </h3>
          </div>

          <div className="space-y-4">
            {DIETARY_TRIGGERS.map((trigger, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-rose-50/50 border border-rose-100 space-y-2">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-sm font-serif font-bold text-[#1E293B]">
                    {trigger.title}
                  </h4>
                  <span className="text-[10px] font-mono text-rose-700 uppercase">
                    {trigger.category}
                  </span>
                </div>

                <p className="text-xs text-[#334155] leading-relaxed">
                  {trigger.scientificRationale}
                </p>

                <div className="pt-2 border-t border-rose-200/60 space-y-1">
                  {trigger.actionItems.map((item, i) => (
                    <div key={i} className="text-[11px] text-[#475569] flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold">⚠</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Circadian & Lifestyle Guidelines */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#1E293B]">
          Circadian Barrier Recovery & Lifestyle Standards
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LIFESTYLE_GUIDELINES.map((guide, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-[#FAF9F5] border border-[#E8E6DF] space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#64748B] block">
                  {guide.pillar}
                </span>
                <h4 className="text-xs font-serif font-bold text-[#1E293B] mt-1">
                  {guide.recommendation}
                </h4>
                <p className="text-[11px] text-[#475569] mt-2 leading-relaxed">
                  {guide.rationale}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E6DF] text-[10px] font-mono text-[#2E4A3D] font-semibold">
                Target: {guide.metricTarget}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
