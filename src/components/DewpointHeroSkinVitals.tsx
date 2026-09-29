import React, { useState } from 'react';
import { ShieldCheck, Droplets, Activity, Sparkles, Wind, AlertCircle, RefreshCw, ChevronRight, Eye, Sun, MapPin, CheckCircle2 } from 'lucide-react';
import { playWaterPop } from '../utils/dewpointAudio';
import { GeoEnvironmentalData } from '../types/dermasync';

interface ZoneDetail {
  id: string;
  name: string;
  x: string;
  y: string;
  metricLabel: string;
  metricValue: string;
  statusText: string;
  description: string;
  prescribedActive: string;
}

const FACE_ZONES: ZoneDetail[] = [
  {
    id: 'forehead',
    name: 'Forehead',
    x: '50%',
    y: '22%',
    metricLabel: 'Moisture & Texture',
    metricValue: 'Feels Tight & Dry',
    statusText: 'Thirsty',
    description: 'Moisture evaporates quickly from your forehead throughout the day, causing mild tightness. Gentle hydrating drops will quench this area.',
    prescribedActive: 'Ectoin (Moisture Magnet) + Centella (Herb Soother)'
  },
  {
    id: 'tzone',
    name: 'Nose & T-Zone',
    x: '50%',
    y: '44%',
    metricLabel: 'Oil & Shine Level',
    metricValue: 'Mild Midday Shine',
    statusText: 'Prone to Shine',
    description: 'Produces a bit of extra natural oil around midday. A gentle pore-clearing active on alternate nights keeps pores clear without stripping.',
    prescribedActive: 'Salicylic Acid (Gentle Pore Clearer)'
  },
  {
    id: 'left_cheek',
    name: 'Left Cheek',
    x: '30%',
    y: '56%',
    metricLabel: 'Red Breakout Spots',
    metricValue: 'Occasional Red Spots',
    statusText: 'Easily Flushed',
    description: 'Mild surface redness and marks left behind from previous pimples. Azelaic acid helps fade these red marks quickly.',
    prescribedActive: 'Azelaic Acid (Red Spot Fader)'
  },
  {
    id: 'right_cheek',
    name: 'Right Cheek',
    x: '70%',
    y: '56%',
    metricLabel: 'Skin Shield Health',
    metricValue: 'Needs Moisture Lock',
    statusText: 'Easily Irritated',
    description: 'Your skin shield is a little sensitive here, so harsh scrubs will sting. A nourishing cream with ceramides locks in deep hydration.',
    prescribedActive: 'Ceramides (Natural Skin Sealant)'
  },
  {
    id: 'jawline',
    name: 'Jawline & Chin',
    x: '50%',
    y: '80%',
    metricLabel: 'Breakout Tendency',
    metricValue: 'Calm & Smooth',
    statusText: 'Clear & Calm',
    description: 'Zero deep pimples or cysts right now! Pores are clear. A gentle night retinal keeps your skin renewing smoothly.',
    prescribedActive: 'Gentle Retinal (Night Renewal)'
  }
];

interface DewpointHeroSkinVitalsProps {
  barrierScore: number;
  hydrationLevel: number;
  sebumLevel: number;
  primaryDiagnosis: string;
  geoData?: GeoEnvironmentalData;
  onOpenRescanModal: () => void;
  onOpenLocationDrawer?: () => void;
}

export const DewpointHeroSkinVitals: React.FC<DewpointHeroSkinVitalsProps> = ({
  barrierScore = 88,
  hydrationLevel = 72,
  sebumLevel = 46,
  primaryDiagnosis = 'Thirsty Combination Skin • Easily Irritated',
  geoData,
  onOpenRescanModal,
  onOpenLocationDrawer
}) => {
  const [activeZone, setActiveZone] = useState<ZoneDetail>(FACE_ZONES[2]); // Malar cheek default

  // Gauge calculations for 88/100 circle
  const gaugeRadius = 54;
  const gaugeCircumference = 2 * Math.PI * gaugeRadius;
  const gaugeOffset = gaugeCircumference - (barrierScore / 100) * gaugeCircumference;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-8 relative overflow-hidden">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3B4655]/10 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full nectar-gradient shadow-[0_0_8px_rgba(212,155,134,0.6)]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#8C5E4F] font-bold">
              YOUR PERSONAL SKIN REPORT
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B4655] tracking-tight">
            How Your Skin Is Doing Today
          </h2>
          <p className="text-xs text-[#3B4655]/70 font-sans mt-1">
            Tap different areas on the face model below to see what each zone needs.
          </p>
        </div>

        {/* Diagnosis Status Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="nectar-badge font-mono text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#3B4655]" />
            <span>{primaryDiagnosis}</span>
          </div>

          <button
            onClick={onOpenRescanModal}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#FAF9F6] border border-[#3B4655]/15 flex items-center justify-center text-[#3B4655] hover:text-[#8C5E4F] transition-all shadow-sm"
            title="Take a New Skin Photo"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Face Area Visualizer + Health Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Side: Interactive Face Area Map (5 Cols) */}
        <div className="lg:col-span-5 aspect-[4/5] max-h-[460px] mx-auto w-full max-w-sm rounded-3xl bg-gradient-to-b from-white to-[#F8F3ED] border border-white p-6 relative flex flex-col justify-between shadow-[0_16px_36px_-8px_rgba(212,155,134,0.22),inset_0_1px_1px_rgba(255,255,255,1)] overflow-hidden">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute inset-0 bg-radial from-[#FFD5B9]/25 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-[#FFDBDB]/40 blur-2xl pointer-events-none" />

          {/* Top Scanner HUD Micro-Header */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#3B4655]/70 relative z-10 border-b border-[#3B4655]/10 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-[#3B4655]">
              <Eye className="w-3.5 h-3.5 text-[#D49B86]" />
              FACE AREA BREAKDOWN
            </span>
            <span className="text-[#8C5E4F] font-semibold">TAP TO EXPLORE</span>
          </div>

          {/* Central Face Silhouette with Interactive Hotspots */}
          <div className="relative w-full h-64 my-auto flex items-center justify-center">
            {/* Soft Glowing Contour */}
            <div className="w-40 h-56 rounded-[48%] border-2 border-[#D49B86]/40 bg-gradient-to-b from-white/80 via-[#FFF9F5]/60 to-[#F6D5C3]/20 relative shadow-inner flex items-center justify-center">
              {/* Inner Soft Guides */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div className="w-full h-[1px] bg-[#3B4655]/20" />
                <div className="h-full w-[1px] bg-[#3B4655]/20 absolute" />
              </div>

              {/* Nose Line */}
              <div className="w-0.5 h-16 bg-[#D49B86]/50 rounded-full mb-2" />

              {/* Hotspot Zone Pins */}
              {FACE_ZONES.map((zone) => {
                const isSelected = activeZone.id === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => {
                      setActiveZone(zone);
                      playWaterPop();
                    }}
                    style={{ left: zone.x, top: zone.y }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 focus:outline-none group/pin z-20`}
                    title={`Tap to see advice for ${zone.name}`}
                  >
                    <span className="relative flex h-4 w-4 items-center justify-center">
                      {isSelected && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D49B86] opacity-75" />
                      )}
                      <span
                        className={`relative inline-flex rounded-full h-3 w-3 border-2 border-white transition-all shadow-md ${
                          isSelected
                            ? 'bg-[#3B4655] scale-125'
                            : 'bg-[#D49B86]'
                        }`}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Active Zone Quick Preview Card */}
          <div className="p-3.5 rounded-2xl bg-white/95 border border-[#3B4655]/10 space-y-1 relative z-10 shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#3B4655]">{activeZone.name}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold nectar-badge">
                {activeZone.statusText}
              </span>
            </div>
            <p className="text-[11px] text-[#3B4655]/85 font-sans leading-tight">
              {activeZone.description}
            </p>
          </div>
        </div>

        {/* Right Side: Health Score Circular Gauge + Sebum vs Hydration Split (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Active Zone Details Bar */}
          <div className="p-5 rounded-2xl bg-white/80 border border-[#3B4655]/10 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D49B86]" />
                <h3 className="font-serif text-lg font-bold text-[#3B4655]">
                  Focus Area: {activeZone.name}
                </h3>
              </div>
              <span className="text-xs font-mono text-[#8C5E4F] font-bold">
                {activeZone.metricValue}
              </span>
            </div>

            <p className="text-xs text-[#3B4655]/85 leading-relaxed font-sans">
              {activeZone.description}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#3B4655]/10 text-xs font-mono">
              <span className="text-[#3B4655]/70 font-semibold">Recommended Ingredient:</span>
              <span className="px-3 py-1 rounded-full nectar-badge text-[#3B4655] font-bold">
                {activeZone.prescribedActive}
              </span>
            </div>
          </div>

          {/* Vitals Gauges Row */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Circular Gauge: Barrier Health (5 Cols) */}
            <div className="sm:col-span-5 p-5 rounded-2xl bg-white/80 border border-[#3B4655]/10 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 130 130">
                  <defs>
                    <linearGradient id="barrierGaugeNectar" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F6D5C3" />
                      <stop offset="50%" stopColor="#E8B49F" />
                      <stop offset="100%" stopColor="#D49B86" />
                    </linearGradient>
                  </defs>
                  {/* Background Track */}
                  <circle
                    cx="65"
                    cy="65"
                    r={gaugeRadius}
                    stroke="rgba(59,70,85,0.08)"
                    strokeWidth="8"
                    fill="none"
                  />
                  {/* Metallic Nectar Progress Arc */}
                  <circle
                    cx="65"
                    cy="65"
                    r={gaugeRadius}
                    stroke="url(#barrierGaugeNectar)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={gaugeCircumference}
                    strokeDashoffset={gaugeOffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 filter drop-shadow-[0_4px_8px_rgba(212,155,134,0.45)]"
                  />
                </svg>

                {/* Inner Center Score Display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-mono font-bold text-[#3B4655] tabular-nums tracking-tighter">
                    {barrierScore}
                  </span>
                  <span className="text-[10px] font-mono text-[#3B4655]/60 uppercase tracking-wider font-bold">
                    / 100 SHIELD
                  </span>
                </div>
              </div>

              <div className="mt-2 text-xs font-mono text-[#8C5E4F] flex items-center gap-1 font-bold">
                <span>↑ +14 points stronger</span>
                <span className="text-[#3B4655]/60 font-normal">than start</span>
              </div>
              <p className="text-[10px] text-[#3B4655]/70 font-sans mt-1">
                Your skin's natural shield against dirt, redness, and dryness.
              </p>
            </div>

            {/* Split Meters: Hydration vs Sebum (7 Cols) */}
            <div className="sm:col-span-7 space-y-4">
              {/* Hydration Saturation Meter */}
              <div className="bg-white/80 p-4 rounded-2xl border border-[#3B4655]/10 space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-[#3B4655]">
                    <Droplets className="w-3.5 h-3.5 text-sky-600" />
                    <span className="font-bold text-[#3B4655]">Skin Moisture Level</span>
                  </span>
                  <span className="text-sky-700 font-bold">{hydrationLevel}% (Plump & Soft)</span>
                </div>
                {/* Bar */}
                <div className="w-full bg-[#FAF9F6] h-2.5 rounded-full overflow-hidden p-0.5 border border-[#3B4655]/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-sky-600 shadow-[0_0_8px_rgba(56,189,248,0.4)] transition-all duration-1000"
                    style={{ width: `${hydrationLevel}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#3B4655]/60">
                  <span>Starting level: 38% (Dry & Tight)</span>
                  <span className="text-sky-800 font-semibold">Moisture is locked in</span>
                </div>
              </div>

              {/* Sebum Flux Flow Meter */}
              <div className="bg-white/80 p-4 rounded-2xl border border-[#3B4655]/10 space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-[#3B4655]">
                    <Activity className="w-3.5 h-3.5 text-[#D49B86]" />
                    <span className="font-bold text-[#3B4655]">Oil & Shine Balance</span>
                  </span>
                  <span className="text-[#8C5E4F] font-bold">{sebumLevel}% (Balanced)</span>
                </div>
                {/* Bar */}
                <div className="w-full bg-[#FAF9F6] h-2.5 rounded-full overflow-hidden p-0.5 border border-[#3B4655]/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#F6D5C3] via-[#E8B49F] to-[#D49B86] shadow-[0_0_8px_rgba(212,155,134,0.4)] transition-all duration-1000"
                    style={{ width: `${sebumLevel}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#3B4655]/60">
                  <span>Target: 40% - 50%</span>
                  <span className="text-[#8C5E4F] font-semibold">Healthy natural glow, no greasiness</span>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Microclimate Sync Bar */}
          <div className="p-3.5 rounded-2xl bg-white/90 border border-[#3B4655]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#3B4655] shadow-sm">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-[#D49B86] shrink-0" />
              <span>
                <strong className="text-[#3B4655] font-bold">Your Local Weather:</strong>{' '}
                {geoData ? (
                  <span>
                    {geoData.flag} {geoData.city}: {geoData.humidity}% humidity · {geoData.temperatureC}°C · Sun (UV {geoData.uvIndex}) · Air ({geoData.aqi > 120 ? 'Smoggy' : 'Clean'})
                  </span>
                ) : (
                  <span>28% Humidity (Dry Indoor Air)</span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${
                geoData && geoData.humidity > 70
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : 'bg-white border-[#3B4655]/15 text-[#3B4655]'
              }`}>
                {geoData && geoData.humidity > 70
                  ? 'Light Water-Gel Active for Humid Days'
                  : 'Moisture Locked In All Day'}
              </span>
              {onOpenLocationDrawer && (
                <button
                  onClick={() => {
                    onOpenLocationDrawer();
                    playWaterPop();
                  }}
                  className="px-2.5 py-0.5 rounded-full nectar-gradient hover:opacity-95 border border-[#D49B86]/40 text-[#3B4655] text-[10px] font-bold transition-all shadow-sm"
                >
                  Check Travel Weather →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
