import React, { useState, useEffect } from 'react';
import { Camera, Check, Upload, RefreshCw, Sun, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';

interface FaceScanStepProps {
  onScanComplete: (biometrics: { erythemaIndex: number; oilDistribution: number; barrierResistance: number }) => void;
  onNext: () => void;
}

type ScanAngle = 'front' | 'left' | 'right';

interface ScanSample {
  id: string;
  label: string;
  description: string;
  erythema: number;
  oil: number;
  barrier: number;
  gradient: string;
}

const SAMPLE_PROFILES: ScanSample[] = [
  {
    id: 'sample-sensitized',
    label: 'Sensitized Profile (Erythema / PIE)',
    description: 'Bilateral malar flush, post-inflammatory red macules, compromised lipid envelope',
    erythema: 78,
    oil: 52,
    barrier: 46,
    gradient: 'from-[#FCE7F3] via-[#FEE2E2] to-[#FEF3C7]'
  },
  {
    id: 'sample-congested',
    label: 'Sebaceous Hyperplasia & Micro-Comedones',
    description: 'Elevated T-zone sebum flow, closed comedones, active follicular inflammation',
    erythema: 54,
    oil: 86,
    barrier: 65,
    gradient: 'from-[#FEF3C7] via-[#ECFDF5] to-[#E0F2FE]'
  },
  {
    id: 'sample-balanced',
    label: 'Resilient / Mild Photodamage',
    description: 'Even stratum corneum, minimal vascular reactivity, discrete hyperpigmentation',
    erythema: 28,
    oil: 44,
    barrier: 88,
    gradient: 'from-[#F3F4F6] via-[#E5E7EB] to-[#D1D5DB]'
  }
];

export const FaceScanStep: React.FC<FaceScanStepProps> = ({ onScanComplete, onNext }) => {
  const [activeAngle, setActiveAngle] = useState<ScanAngle>('front');
  const [selectedSample, setSelectedSample] = useState<ScanSample>(SAMPLE_PROFILES[0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [hasScanned, setHasScanned] = useState<boolean>(false);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setHasScanned(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isScanning) {
      timer = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsScanning(false);
            setHasScanned(true);
            onScanComplete({
              erythemaIndex: selectedSample.erythema,
              oilDistribution: selectedSample.oil,
              barrierResistance: selectedSample.barrier
            });
            return 100;
          }
          return prev + 5;
        });
      }, 70);
    }
    return () => clearInterval(timer);
  }, [isScanning, selectedSample, onScanComplete]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomPhoto(event.target?.result as string);
        startScan();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-wider text-[#64748B] font-mono">
          Phase 01 · Optical Skin Biometrics
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#1E293B]">
          Multi-Angle Dermatological Scan
        </h2>
        <p className="text-sm text-[#64748B] max-w-xl mx-auto">
          Capture or simulate high-resolution neutral lighting portraits. Our optical analysis parses vascular erythema, sebum distribution, and surface desquamation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Optical Scan Viewport (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-5">
          {/* Angle Selector Tabs */}
          <div className="flex items-center justify-between border-b border-[#F1EFEA] pb-3">
            <span className="text-xs font-medium text-[#64748B]">Scan Perspective</span>
            <div className="flex items-center gap-1 bg-[#F8FAFC] p-1 rounded-lg border border-[#E2E8F0]">
              {(['front', 'left', 'right'] as ScanAngle[]).map((angle) => (
                <button
                  key={angle}
                  onClick={() => setActiveAngle(angle)}
                  className={`px-3 py-1 text-xs font-medium rounded capitalize transition-colors ${
                    activeAngle === angle
                      ? 'bg-white text-[#1E293B] shadow-sm font-semibold'
                      : 'text-[#64748B] hover:text-[#1E293B]'
                  }`}
                >
                  {angle} View
                </button>
              ))}
            </div>
          </div>

          {/* Scanner Viewport with Facial Grid Overlay */}
          <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#0F172A] flex items-center justify-center border border-[#334155]">
            {/* Visual Background: Custom photo or clinical simulated mesh */}
            {customPhoto ? (
              <img
                src={customPhoto}
                alt="Patient uploaded facial capture"
                className="w-full h-full object-cover filter contrast-105"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${selectedSample.gradient} opacity-80 flex items-center justify-center relative`}>
                {/* Clinical Face Silhouette Vector */}
                <svg className="w-56 h-56 text-[#334155]/60" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                  {/* Oval head contour */}
                  <ellipse cx="50" cy="50" rx="34" ry="42" strokeWidth="1.2" strokeDasharray="3 3" />
                  {/* Facial cross-hairs */}
                  <line x1="50" y1="12" x2="50" y2="88" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="20" y1="48" x2="80" y2="48" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="26" y1="36" x2="74" y2="36" strokeWidth="0.8" />
                  {/* Eye markers */}
                  <circle cx="38" cy="42" r="3" strokeWidth="1.2" />
                  <circle cx="62" cy="42" r="3" strokeWidth="1.2" />
                  {/* Nose bridge & labial */}
                  <path d="M50 42 L48 57 L52 57" strokeWidth="1.2" />
                  <path d="M42 68 Q50 72 58 68" strokeWidth="1.2" />
                </svg>

                {/* Subtitle label */}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-[11px] font-mono">
                  {selectedSample.label} ({activeAngle})
                </div>
              </div>
            )}

            {/* Scanning Line Animation */}
            {isScanning && (
              <div
                className="absolute inset-x-0 h-1 bg-[#38BDF8] shadow-[0_0_15px_#38bdf8] z-20 transition-all duration-75"
                style={{ top: `${scanProgress}%` }}
              >
                <div className="absolute right-3 -top-5 text-[10px] font-mono text-[#38BDF8] bg-black/80 px-1.5 py-0.5 rounded">
                  ANALYZING EPIDERMAL MATRIX: {scanProgress}%
                </div>
              </div>
            )}

            {/* Real-time Landmark Target Nodes */}
            <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start text-[10px] font-mono text-[#94A3B8]">
                <div className="bg-black/40 backdrop-blur-xs px-2 py-1 rounded">
                  SPECTRAL SENSING: ACTIVE
                </div>
                <div className="bg-black/40 backdrop-blur-xs px-2 py-1 rounded">
                  FOV: 78°
                </div>
              </div>

              {/* Landmark points */}
              <div className="relative w-full h-full">
                {/* Malar cheek point (erythema) */}
                <div className="absolute top-[48%] left-[30%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping opacity-75" />
                  <span className="text-[9px] font-mono text-rose-200 bg-black/70 px-1 rounded">Malar Erythema</span>
                </div>

                {/* T-Zone Sebaceous Point */}
                <div className="absolute top-[28%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-[9px] font-mono text-amber-200 bg-black/70 px-1 rounded">Sebum Flux</span>
                </div>

                {/* Mandibular / Jawline point */}
                <div className="absolute top-[72%] left-[45%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[9px] font-mono text-emerald-200 bg-black/70 px-1 rounded">Lipid Density</span>
                </div>
              </div>

              <div className="flex justify-between items-end text-[10px] font-mono text-[#94A3B8]">
                <span>SCALE: 1:1 RESOLUTION</span>
                <span className="tabular-nums">ΔE: {selectedSample.erythema} · TEWL: {100 - selectedSample.barrier}g/m²h</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#1E293B] bg-[#F1EFEA] hover:bg-[#E5E2D9] rounded-md transition-colors">
              <Upload className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Upload Custom Photo</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>

            <button
              onClick={startScan}
              disabled={isScanning}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#2E4A3D] hover:bg-[#23382E] rounded-md transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning...' : hasScanned ? 'Re-Analyze Scan' : 'Initiate Biometric Scan'}</span>
            </button>
          </div>
        </div>

        {/* Right: Presets & Live Metric Readings (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Sample Selectors */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-[#1E293B] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2E4A3D]" />
              <span>Diagnostic Reference Clinical Cases</span>
            </h3>
            <p className="text-xs text-[#64748B]">
              Select a clinical benchmark or scan your individual portrait to evaluate dermal indices:
            </p>

            <div className="space-y-2 pt-1">
              {SAMPLE_PROFILES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setSelectedSample(sample);
                    setCustomPhoto(null);
                    setHasScanned(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-all text-xs ${
                    selectedSample.id === sample.id
                      ? 'border-[#2E4A3D] bg-[#F4F7F5] ring-1 ring-[#2E4A3D]'
                      : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white'
                  }`}
                >
                  <div className="font-medium text-[#1E293B] flex items-center justify-between">
                    <span>{sample.label}</span>
                    {selectedSample.id === sample.id && (
                      <Check className="w-3.5 h-3.5 text-[#2E4A3D]" />
                    )}
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">
                    {sample.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Metric Gauges */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                Detected Dermal Parameters
              </h4>
              <span className="text-[11px] font-mono text-[#2E4A3D]">
                {hasScanned ? 'Optical Read Complete' : 'Awaiting Calibration'}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-[#475569] mb-1">
                  <span>Vascular Erythema Index (PIE / Flush)</span>
                  <span className="font-mono tabular-nums font-medium text-[#1E293B]">{selectedSample.erythema} / 100</span>
                </div>
                <div className="w-full bg-[#F1EFEA] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-rose-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${selectedSample.erythema}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#475569] mb-1">
                  <span>Sebum Flux Density (T-Zone Flow)</span>
                  <span className="font-mono tabular-nums font-medium text-[#1E293B]">{selectedSample.oil} / 100</span>
                </div>
                <div className="w-full bg-[#F1EFEA] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${selectedSample.oil}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#475569] mb-1">
                  <span>Stratum Corneum Lipid Shield</span>
                  <span className="font-mono tabular-nums font-medium text-[#1E293B]">{selectedSample.barrier} / 100</span>
                </div>
                <div className="w-full bg-[#F1EFEA] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#2E4A3D] h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${selectedSample.barrier}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Lighting protocol reminder */}
            <div className="pt-2 border-t border-[#F1EFEA] flex items-start gap-2 text-[11px] text-[#64748B]">
              <Sun className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>Optimal capture requires diffuse natural daylight without flash or beauty filters.</span>
            </div>
          </div>

          {/* Continue CTA */}
          <div className="pt-2">
            <button
              onClick={() => {
                if (!hasScanned) {
                  onScanComplete({
                    erythemaIndex: selectedSample.erythema,
                    oilDistribution: selectedSample.oil,
                    barrierResistance: selectedSample.barrier
                  });
                }
                onNext();
              }}
              className="w-full py-3 px-4 bg-[#2E4A3D] hover:bg-[#23382E] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Confirm Biometrics & Proceed to Quiz</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
