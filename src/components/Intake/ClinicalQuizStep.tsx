import React from 'react';
import { QuizAnswers } from '../../types/dermasync';
import { Sparkles, Thermometer, Wind, ShieldCheck, SunMedium, Flame, Droplets } from 'lucide-react';

interface ClinicalQuizStepProps {
  answers: QuizAnswers;
  onChange: (updated: Partial<QuizAnswers>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ClinicalQuizStep: React.FC<ClinicalQuizStepProps> = ({
  answers,
  onChange,
  onNext,
  onBack
}) => {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Editorial Title */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-wider text-[#64748B] font-mono">
          Phase 02 · Clinical Symptom Assessment
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#1E293B]">
          Symptom & Environmental Intake
        </h2>
        <p className="text-sm text-[#64748B] max-w-lg mx-auto">
          Dermatological algorithms require granular sensation data to evaluate lipid depletion, acid-mantle stability, and neuro-vascular triggers.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-8">
        {/* Question 1: Midday Shine & Sebum Sensation */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-[#1E293B]">
            1. Midday Sebum Flow & Skin Sensation
          </label>
          <p className="text-xs text-[#64748B]">
            Approximately 4 hours post-cleansing, how does your facial surface feel and look?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {[
              {
                id: 't_zone_only',
                title: 'T-Zone Shine Only',
                desc: 'Forehead, nose, and chin appear shiny while cheeks remain balanced or slightly dry'
              },
              {
                id: 'entire_face',
                title: 'Diffuse Full-Face Shine',
                desc: 'Pronounced sebum across cheeks, forehead, and jawline; blot paper saturates quickly'
              },
              {
                id: 'parched',
                title: 'Parched & Tight',
                desc: 'Persistent tightness, rough texture, or visible fine dry lines without any shine'
              },
              {
                id: 'none',
                title: 'Balanced Equilibrium',
                desc: 'Velvety surface, comfortable moisture balance with zero noticeable oiliness'
              }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange({ middayShine: opt.id as any })}
                className={`text-left p-3.5 rounded-lg border text-xs transition-all ${
                  answers.middayShine === opt.id
                    ? 'border-[#2E4A3D] bg-[#F4F7F5] ring-1 ring-[#2E4A3D]'
                    : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white'
                }`}
              >
                <div className="font-semibold text-[#1E293B]">{opt.title}</div>
                <div className="text-[11px] text-[#64748B] mt-1 leading-relaxed">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Question 2: Barrier Reactivity & Stinging Symptoms */}
        <div className="space-y-3 pt-4 border-t border-[#F1EFEA]">
          <label className="block text-sm font-semibold text-[#1E293B]">
            2. Stratum Corneum Reactivity & Stinging
          </label>
          <p className="text-xs text-[#64748B]">
            How does your skin respond when applying standard serums, chemical sunscreens, or water?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {[
              {
                id: 'never_reactive',
                title: 'Resilient Barrier',
                desc: 'Tolerates active ingredients (Retinoids, AHAs) without flushing, peeling, or stinging'
              },
              {
                id: 'occasional_flaking',
                title: 'Localized Peeling / Tightness',
                desc: 'Mild desquamation around nasal creases or mouth; occasional dry micro-flakes'
              },
              {
                id: 'stings_with_actives',
                title: 'Sensitized Stinging',
                desc: 'Noticeable burning or smarting sensation when applying low-pH Vitamin C or SPF'
              },
              {
                id: 'constant_burning',
                title: 'Severely Compromised',
                desc: 'Constant warmth, diffuse erythema, and stinging even with plain water or bland creams'
              }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange({ barrierReactivity: opt.id as any })}
                className={`text-left p-3.5 rounded-lg border text-xs transition-all ${
                  answers.barrierReactivity === opt.id
                    ? 'border-[#2E4A3D] bg-[#F4F7F5] ring-1 ring-[#2E4A3D]'
                    : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white'
                }`}
              >
                <div className="font-semibold text-[#1E293B]">{opt.title}</div>
                <div className="text-[11px] text-[#64748B] mt-1 leading-relaxed">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Question 3: Climate & Ambient Humidity */}
        <div className="space-y-3 pt-4 border-t border-[#F1EFEA]">
          <label className="block text-sm font-semibold text-[#1E293B]">
            3. Ambient Climate & Atmospheric Humidity
          </label>
          <p className="text-xs text-[#64748B]">
            Indoor and outdoor humidity determines how quickly moisture evaporates from your skin.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {[
              { id: 'arid', label: 'Arid / Dry Desert', sub: '< 30% RH' },
              { id: 'temperate', label: 'Temperate Moderate', sub: '40% - 60% RH' },
              { id: 'humid', label: 'High Tropical', sub: '> 70% RH' },
              { id: 'polluted_urban', label: 'Urban High-Density', sub: 'High PM2.5 / Smog' }
            ].map((clim) => (
              <button
                key={clim.id}
                type="button"
                onClick={() => onChange({ climateType: clim.id as any })}
                className={`p-3 rounded-lg border text-left text-xs transition-all ${
                  answers.climateType === clim.id
                    ? 'border-[#2E4A3D] bg-[#F4F7F5] ring-1 ring-[#2E4A3D]'
                    : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white'
                }`}
              >
                <div className="font-medium text-[#1E293B]">{clim.label}</div>
                <div className="text-[10px] text-[#64748B] mt-0.5">{clim.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Question 4: Daily UV & Sun Exposure */}
        <div className="space-y-3 pt-4 border-t border-[#F1EFEA]">
          <label className="block text-sm font-semibold text-[#1E293B]">
            4. Direct Daily Solar Exposure
          </label>
          <p className="text-xs text-[#64748B]">
            UV radiation triggers matrix metalloproteinases (MMPs) and post-inflammatory pigmentation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {[
              { id: 'under_1', label: 'Minimal (< 1 Hour Daily)', desc: 'Primarily indoor desk work with filtered window light' },
              { id: '1_to_3', label: 'Moderate (1 – 3 Hours)', desc: 'Commutes, walking, outdoor dining, standard daylight' },
              { id: 'over_3', label: 'Elevated (> 3 Hours)', desc: 'Frequent outdoor sports, direct high UV index exposure' }
            ].map((sun) => (
              <button
                key={sun.id}
                type="button"
                onClick={() => onChange({ sunExposureHours: sun.id as any })}
                className={`p-3.5 rounded-lg border text-left text-xs transition-all ${
                  answers.sunExposureHours === sun.id
                    ? 'border-[#2E4A3D] bg-[#F4F7F5] ring-1 ring-[#2E4A3D]'
                    : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white'
                }`}
              >
                <div className="font-medium text-[#1E293B]">{sun.label}</div>
                <div className="text-[11px] text-[#64748B] mt-1">{sun.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Question 5: Hormonal Breakouts & Cycles */}
        <div className="space-y-3 pt-4 border-t border-[#F1EFEA]">
          <label className="block text-sm font-semibold text-[#1E293B]">
            5. Breakout Patterns & Hormonal / Lifestyle Triggers
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {[
              { id: 'never', label: 'Rare / Never', desc: 'Infrequent blemishes; skin maintains consistent clarity' },
              { id: 'cyclical_jawline', label: 'Cyclical Mandibular / Chin', desc: 'Deep cystic tender bumps recurring with monthly hormone shifts' },
              { id: 'stress_diet_triggered', label: 'Stress or Diet Induced', desc: 'Rapid follicular flare-ups following high sugar, whey, or lack of sleep' }
            ].map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => onChange({ hormonalBreakouts: h.id as any })}
                className={`p-3.5 rounded-lg border text-left text-xs transition-all ${
                  answers.hormonalBreakouts === h.id
                    ? 'border-[#2E4A3D] bg-[#F4F7F5] ring-1 ring-[#2E4A3D]'
                    : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white'
                }`}
              >
                <div className="font-medium text-[#1E293B]">{h.label}</div>
                <div className="text-[11px] text-[#64748B] mt-1">{h.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Flow Buttons */}
        <div className="pt-6 border-t border-[#F1EFEA] flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-xs font-medium text-[#64748B] hover:text-[#1E293B] rounded-md transition-colors"
          >
            ← Return to Optical Scan
          </button>

          <button
            type="button"
            onClick={onNext}
            className="px-6 py-2.5 bg-[#2E4A3D] hover:bg-[#23382E] text-white text-xs font-semibold rounded-md transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span>Proceed to Regimen Budget</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
