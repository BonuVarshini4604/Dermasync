import React from 'react';
import { GeoEnvironmentalData } from '../types/dermasync';
import { GEO_PRESETS } from '../services/geoService';
import { X, MapPin, Wind, Sun, Droplets, Compass, Sparkles, Check, AlertTriangle } from 'lucide-react';
import { playWaterPop, playStepCompleteChime } from '../utils/dewpointAudio';

interface LocationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentGeo: GeoEnvironmentalData;
  onSelectGeo: (geo: GeoEnvironmentalData) => void;
  onUpdateSliders?: (updates: Partial<GeoEnvironmentalData>) => void;
}

export const LocationDrawer: React.FC<LocationDrawerProps> = ({
  isOpen,
  onClose,
  currentGeo,
  onSelectGeo,
  onUpdateSliders
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#3B4655]/40 backdrop-blur-md flex items-center justify-end animate-fade-in">
      <div className="bg-[#FAF9F6]/95 backdrop-blur-3xl w-full max-w-lg h-full overflow-y-auto border-l border-white p-6 sm:p-8 space-y-6 text-[#3B4655] shadow-2xl flex flex-col justify-between">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#3B4655]/10 pb-4">
            <div>
              <span className="font-mono text-[10px] uppercase text-[#8C5E4F] font-bold tracking-widest block">
                TRAVEL & WEATHER PREVIEW
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3B4655] mt-0.5">
                Check Travel Weather & Routine
              </h3>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white hover:bg-[#FAF9F6] border border-[#3B4655]/15 flex items-center justify-center text-[#3B4655] transition-colors shadow-sm"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#3B4655]/75 leading-relaxed font-sans">
            Traveling soon or want to see how your skincare changes in sticky humidity, dry winter air, or city smog? Pick a city below or move the sliders to watch your routine automatically swap products in real time!
          </p>

          {/* Current Active Location Card */}
          <div className="p-4 rounded-2xl bg-white border border-[#D49B86]/40 space-y-3 shadow-sm">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#8C5E4F] font-bold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D49B86]" />
                CURRENT CITY WEATHER
              </span>
              <span className="text-[#3B4655] font-bold">{currentGeo.flag} {currentGeo.city}, {currentGeo.countryName}</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#3B4655]/10">
                <div className="text-[10px] text-[#3B4655]/60 uppercase font-semibold">Temp</div>
                <div className="font-bold text-[#3B4655] mt-0.5">{currentGeo.temperatureC}°C</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#3B4655]/10">
                <div className="text-[10px] text-[#3B4655]/60 uppercase font-semibold">Humidity</div>
                <div className={`font-bold mt-0.5 ${currentGeo.humidity > 70 ? 'text-rose-700' : 'text-sky-700'}`}>
                  {currentGeo.humidity}%
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#3B4655]/10">
                <div className="text-[10px] text-[#3B4655]/60 uppercase font-semibold">Sun (UV)</div>
                <div className={`font-bold mt-0.5 ${currentGeo.uvIndex > 6 ? 'text-amber-700' : 'text-[#3B4655]'}`}>
                  {currentGeo.uvIndex}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#3B4655]/10">
                <div className="text-[10px] text-[#3B4655]/60 uppercase font-semibold">Air (AQI)</div>
                <div className={`font-bold mt-0.5 ${currentGeo.aqi > 120 ? 'text-rose-700' : 'text-emerald-700'}`}>
                  {currentGeo.aqi}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Select Destination Presets */}
          <div className="space-y-3">
            <div className="font-mono text-xs text-[#3B4655] uppercase tracking-wider font-bold">
              Popular Cities to Preview
            </div>

            <div className="space-y-2.5">
              {Object.entries(GEO_PRESETS).map(([key, preset]) => {
                const isSelected = currentGeo.city.toLowerCase() === preset.city.toLowerCase();
                return (
                  <button
                    key={key}
                    onClick={() => {
                      onSelectGeo(preset);
                      playStepCompleteChime();
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between font-sans ${
                      isSelected
                        ? 'bg-white border-[#D49B86] shadow-[0_4px_16px_rgba(212,155,134,0.3)]'
                        : 'bg-white/80 hover:bg-white border-[#3B4655]/10 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{preset.flag}</span>
                      <div>
                        <div className="font-bold text-[#3B4655] text-sm flex items-center gap-2">
                          <span>{preset.city}, {preset.countryName}</span>
                          <span className="font-mono text-[10px] text-[#3B4655] nectar-badge px-2 py-0.5 rounded-full font-bold">
                            {preset.currencyCode} ({preset.currencySymbol})
                          </span>
                        </div>
                        <div className="font-mono text-[11px] text-[#3B4655]/70 mt-0.5">
                          {preset.temperatureC}°C · {preset.humidity}% humidity · Sun (UV {preset.uvIndex}) · Air ({preset.aqi > 120 ? 'Smoggy' : 'Clean'})
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full nectar-gradient flex items-center justify-center text-[#3B4655] shadow-sm">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border border-[#3B4655]/20" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Live Micro-Climate Simulation Sliders */}
          <div className="p-4 rounded-2xl bg-white border border-[#3B4655]/10 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 font-mono text-xs text-[#3B4655] font-bold">
              <Compass className="w-3.5 h-3.5 text-[#D49B86]" />
              <span>WEATHER SLIDERS (TEST PRODUCT AUTO-SWAPS)</span>
            </div>

            {/* Humidity Slider */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#3B4655]/70 font-semibold">Humidity:</span>
                <span className={`font-bold ${currentGeo.humidity > 70 ? 'text-rose-700' : 'text-sky-700'}`}>
                  {currentGeo.humidity}% {currentGeo.humidity > 70 && '(Swaps Heavy Cream for Light Water-Gel)'}
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="95"
                value={currentGeo.humidity}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onSelectGeo({
                    ...currentGeo,
                    humidity: val,
                    climateAlerts: {
                      ...currentGeo.climateAlerts,
                      highHumidity: val > 70
                    }
                  });
                }}
                className="w-full accent-[#D49B86] cursor-pointer"
              />
            </div>

            {/* AQI Slider */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#3B4655]/70 font-semibold">Air Quality (City Smog):</span>
                <span className={`font-bold ${currentGeo.aqi > 120 ? 'text-rose-700' : 'text-emerald-700'}`}>
                  {currentGeo.aqi} {currentGeo.aqi > 120 && '(Adds Double Cleanse for Smog Defense)'}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="350"
                value={currentGeo.aqi}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onSelectGeo({
                    ...currentGeo,
                    aqi: val,
                    aqiStatus: val > 200 ? 'Severe' : val > 120 ? 'Poor' : val > 50 ? 'Moderate' : 'Good',
                    climateAlerts: {
                      ...currentGeo.climateAlerts,
                      highPollution: val > 120
                    }
                  });
                }}
                className="w-full accent-[#D49B86] cursor-pointer"
              />
            </div>

            {/* UV Slider */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#3B4655]/70 font-semibold">Sunlight Intensity (UV):</span>
                <span className={`font-bold ${currentGeo.uvIndex > 6 ? 'text-amber-700' : 'text-[#3B4655]'}`}>
                  {currentGeo.uvIndex} {currentGeo.uvIndex > 6 && '(Adds Sunscreen Reminder Banner)'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="0.2"
                value={currentGeo.uvIndex}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onSelectGeo({
                    ...currentGeo,
                    uvIndex: val,
                    climateAlerts: {
                      ...currentGeo.climateAlerts,
                      highUv: val > 6
                    }
                  });
                }}
                className="w-full accent-[#D49B86] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#3B4655]/10 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-3.5 btn-clinical-slate font-mono font-bold text-xs rounded-full transition-all shadow-md text-center cursor-pointer"
          >
            Use This Weather & Update My Routine →
          </button>
        </div>
      </div>
    </div>
  );
};
