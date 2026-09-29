import React, { useState, useEffect } from 'react';
import { Camera, RefreshCw, X, Sparkles, Check, Upload, Sun } from 'lucide-react';
import { playWaterPop, playStepCompleteChime } from '../utils/dewpointAudio';

interface DewpointScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateVitals: (vitals: { barrier: number; hydration: number; sebum: number; diagnosis: string }) => void;
}

export const DewpointScanModal: React.FC<DewpointScanModalProps> = ({
  isOpen,
  onClose,
  onUpdateVitals
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [angle, setAngle] = useState<'front' | 'left' | 'right'>('front');
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isScanning) {
      timer = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsScanning(false);
            playStepCompleteChime();
            onUpdateVitals({
              barrier: 92,
              hydration: 82,
              sebum: 42,
              diagnosis: 'Healthy Skin Shield (92/100) • Calm & Smooth'
            });
            return 100;
          }
          return prev + 10;
        });
      }, 80);
    }
    return () => clearInterval(timer);
  }, [isScanning, onUpdateVitals]);

  if (!isOpen) return null;

  const handleStartScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    playWaterPop();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomPhoto(event.target?.result as string);
        handleStartScan();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#3B4655]/45 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FAF9F6] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-white space-y-6 shadow-2xl relative animate-fade-in text-[#3B4655]">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#3B4655]/10 pb-4">
          <div>
            <span className="font-mono text-[10px] uppercase text-[#8C5E4F] font-bold tracking-widest block">
              QUICK PHOTO CHECK-IN
            </span>
            <h3 className="text-xl font-serif font-bold text-[#3B4655] mt-0.5">
              Take a New Skin Photo
            </h3>
            <p className="text-xs text-[#3B4655]/70 font-sans mt-0.5">
              Position your face in good, natural lighting for an instant skin check.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#FAF9F6] border border-[#3B4655]/15 flex items-center justify-center text-[#3B4655] transition-colors shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Viewport Frame */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-white to-[#F6EDE4] border border-[#D49B86]/30 flex items-center justify-center shadow-inner">
          {customPhoto ? (
            <img src={customPhoto} alt="Your Face Photo" className="w-full h-full object-cover filter contrast-105" />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <svg className="w-56 h-56 text-[#D49B86]/60 animate-pulse-subtle" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <ellipse cx="50" cy="50" rx="34" ry="42" strokeWidth="1.2" strokeDasharray="3 3" />
                <line x1="50" y1="12" x2="50" y2="88" strokeWidth="0.8" strokeDasharray="2 2" />
                <circle cx="38" cy="42" r="3" strokeWidth="1.2" />
                <circle cx="62" cy="42" r="3" strokeWidth="1.2" />
                <path d="M50 42 L48 57 L52 57" strokeWidth="1.2" />
                <path d="M42 68 Q50 72 58 68" strokeWidth="1.2" />
              </svg>
            </div>
          )}

          {/* Scanning Line Animation */}
          {isScanning && (
            <div
              className="absolute inset-x-0 h-1.5 nectar-gradient shadow-[0_0_20px_rgba(212,155,134,0.8)] z-20 transition-all duration-75"
              style={{ top: `${scanProgress}%` }}
            >
              <div className="absolute right-3 -top-6 text-[10px] font-mono text-[#3B4655] bg-white border border-[#D49B86]/50 font-bold px-2 py-0.5 rounded shadow-sm">
                CHECKING: {scanProgress}%
              </div>
            </div>
          )}

          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full font-mono text-[10px] text-[#3B4655] border border-[#3B4655]/10 shadow-sm">
            Angle: <span className="uppercase text-[#8C5E4F] font-bold">{angle}</span> · Natural Soft Light
          </div>
        </div>

        {/* Angle Toggles & Custom Upload */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 font-mono text-xs">
            <span className="text-[#3B4655]/60 text-[11px] mr-1">Angle:</span>
            {(['front', 'left', 'right'] as const).map((a) => (
              <button
                key={a}
                onClick={() => setAngle(a)}
                className={`px-3 py-1.5 rounded-full capitalize transition-colors font-semibold ${
                  angle === a ? 'bg-[#3B4655] text-white shadow-sm' : 'text-[#3B4655]/60 hover:text-[#3B4655]'
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white hover:bg-[#FAF9F6] border border-[#3B4655]/15 text-xs font-mono text-[#3B4655] transition-colors shadow-sm">
            <Upload className="w-3.5 h-3.5 text-[#D49B86]" />
            <span className="font-semibold">Upload Your Photo</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* Trigger Button */}
        <div className="pt-2">
          <button
            onClick={handleStartScan}
            disabled={isScanning}
            className="w-full py-3.5 rounded-full nectar-gradient hover:opacity-95 text-[#3B4655] font-mono text-xs font-bold transition-all shadow-[0_4px_16px_rgba(212,155,134,0.35)] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Looking at your skin...' : 'Take Photo & Update My Routine'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
