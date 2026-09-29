/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { DewpointNav } from './components/DewpointNav';
import { DewpointHeroSkinVitals } from './components/DewpointHeroSkinVitals';
import { DewpointRoutineProtocol } from './components/DewpointRoutineProtocol';
import { DewpointCuratedShelf } from './components/DewpointCuratedShelf';
import { DewpointDietHabitMatrix } from './components/DewpointDietHabitMatrix';
import { DewpointScanModal } from './components/DewpointScanModal';
import { ClinicalDupeLibrary } from './components/DupeFinder/ClinicalDupeLibrary';
import { IngredientConflictChecker } from './components/SafetyChecker/IngredientConflictChecker';
import { ProductDetailModal } from './components/Modals/ProductDetailModal';
import { LocationDrawer } from './components/LocationDrawer';
import { LuminousCursor } from './components/LuminousCursor';
import { DermaSyncAiChat } from './components/Chat/DermaSyncAiChat';
import { AiChatLauncher } from './components/Chat/AiChatLauncher';
import { computeSkinProfile, generateRegimenProtocol } from './services/diagnosticEngine';
import { detectInitialGeo, GEO_PRESETS } from './services/geoService';
import { applyClimateResponsiveLogic } from './services/climateEngine';
import { CLINICAL_PRODUCTS } from './data/products';
import { INDIA_CURATED_PRODUCTS } from './data/geoCatalog';
import { Product, RegimenStep, SkinProfileMatrix, GeoEnvironmentalData } from './types/dermasync';
import { Sparkles, Shield, RefreshCw, Sun, Droplets, ArrowUpRight, Compass, AlertTriangle } from 'lucide-react';
import { playWaterPop, playStepCompleteChime } from './utils/dewpointAudio';

export default function App() {
  // Pre-seed with the Gen-Z clinical baseline: "Dehydrated Combination • Sensitized"
  const defaultProfile = computeSkinProfile({
    middayShine: 't_zone_only',
    cleanserSensation: 'tight_stinging',
    barrierReactivity: 'stings_with_actives',
    climateType: 'arid',
    sunExposureHours: '1_to_3',
    hormonalBreakouts: 'cyclical_jawline',
    budgetTier: 'clinical'
  }, {
    erythemaIndex: 78,
    oilDistribution: 46,
    barrierResistance: 88
  });

  const defaultRegimen = generateRegimenProtocol(defaultProfile, 'clinical');

  const [activeTab, setActiveTab] = useState<'dashboard' | 'shelf' | 'dupes' | 'diet' | 'clashes' | 'scan' | 'chat'>('dashboard');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [barrierScore, setBarrierScore] = useState<number>(88);
  const [hydrationLevel, setHydrationLevel] = useState<number>(72);
  const [sebumLevel, setSebumLevel] = useState<number>(46);
  const [skinDiagnosis, setSkinDiagnosis] = useState<string>('Dehydrated Combination • Sensitized');

  const [skinMatrix, setSkinMatrix] = useState<SkinProfileMatrix>(defaultProfile);
  const [baseAmSteps, setBaseAmSteps] = useState<RegimenStep[]>(defaultRegimen.amSteps);
  const [basePmSteps, setBasePmSteps] = useState<RegimenStep[]>(defaultRegimen.pmSteps);

  // Geo-Location & Climate Telemetry State
  const [geoData, setGeoData] = useState<GeoEnvironmentalData>(() => detectInitialGeo());
  const [isLocationDrawerOpen, setIsLocationDrawerOpen] = useState(false);

  // Modals
  const [isRescanOpen, setIsRescanOpen] = useState(false);
  const [activeModalProductId, setActiveModalProductId] = useState<string | null>(null);

  // Dynamic Climate Adaptation Engine
  const { adaptedAmSteps, adaptedPmSteps, interventionReport } = useMemo(() => {
    return applyClimateResponsiveLogic(baseAmSteps, basePmSteps, geoData);
  }, [baseAmSteps, basePmSteps, geoData]);

  // 1-Click Dupe Swap handler across all routines
  const handleSwapProduct = (originalId: string, dupeId: string) => {
    const allAvailable = [...INDIA_CURATED_PRODUCTS, ...CLINICAL_PRODUCTS];
    const dupe = allAvailable.find(p => p.id === dupeId);
    if (!dupe) return;

    setBaseAmSteps(prev => prev.map(step => {
      if (step.product.id === originalId) {
        return { ...step, product: dupe };
      }
      return step;
    }));

    setBasePmSteps(prev => prev.map(step => {
      if (step.product.id === originalId) {
        return { ...step, product: dupe };
      }
      return step;
    }));

    playStepCompleteChime();
  };

  const handleUpdateVitals = (newVitals: { barrier: number; hydration: number; sebum: number; diagnosis: string }) => {
    setBarrierScore(newVitals.barrier);
    setHydrationLevel(newVitals.hydration);
    setSebumLevel(newVitals.sebum);
    setSkinDiagnosis(newVitals.diagnosis);
    setIsRescanOpen(false);
  };

  // Collect all unique products across adapted regimen
  const allShelfProducts: Product[] = [
    ...adaptedAmSteps.map(s => s.product),
    ...adaptedPmSteps.map(s => s.product)
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#3B4655] font-sans selection:bg-[#F6D5C3] selection:text-[#3B4655] relative overflow-hidden flex flex-col justify-between">
      {/* Custom Soft Luminous Cursor with Dynamic Chrome Expansion */}
      <LuminousCursor />

      {/* Large Ambient Glow Blobs in Apricot (#FFD5B9) & Pearl Pink (#FFDBDB) */}
      <div className="fixed -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-[#FFD5B9]/45 blur-[120px] pointer-events-none -z-0" />
      <div className="fixed top-1/3 -right-48 w-[580px] h-[580px] rounded-full bg-[#FFDBDB]/55 blur-[130px] pointer-events-none -z-0" />
      <div className="fixed -bottom-40 left-1/4 w-[480px] h-[480px] rounded-full bg-[#F6D5C3]/35 blur-[110px] pointer-events-none -z-0" />

      {/* 1. Top Navigation: Glass Pill Navbar with Live Weather & Environmental HUD */}
      <DewpointNav
        barrierScore={barrierScore}
        skinStatus={skinDiagnosis}
        activeTab={activeTab}
        geoData={geoData}
        onSelectTab={(tab) => {
          if (tab === 'scan') {
            setIsRescanOpen(true);
          } else {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenRescanModal={() => setIsRescanOpen(true)}
        onOpenLocationDrawer={() => setIsLocationDrawerOpen(true)}
        onOpenChatModal={() => setIsChatOpen(true)}
      />

      {/* Climate Intervention Notification Banner (if substitutions active) */}
      {interventionReport.interventionMessages.length > 0 && activeTab === 'dashboard' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full relative z-20">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/80 border border-[#D49B86]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono backdrop-blur-xl shadow-[0_12px_28px_-8px_rgba(212,155,134,0.18)]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full nectar-gradient flex items-center justify-center text-[#3B4655] shrink-0 shadow-sm">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[#3B4655] font-bold">
                  Climate Logic Active for {geoData.flag} {geoData.city}, {geoData.countryName}:
                </span>{' '}
                <span className="text-[#3B4655]/80">
                  {interventionReport.interventionMessages[0]}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsLocationDrawerOpen(true)}
              className="text-[#8C5E4F] hover:underline font-bold text-xs shrink-0 self-start sm:self-auto flex items-center gap-1"
            >
              <span>Climate Simulator & Override →</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-10 relative z-10">
        {/* Bento Dashboard View (Primary Home) */}
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            {/* 2. Hero Bento Card: Skin Vitals & Face Scan Landmark Model */}
            <DewpointHeroSkinVitals
              barrierScore={barrierScore}
              hydrationLevel={hydrationLevel}
              sebumLevel={sebumLevel}
              primaryDiagnosis={skinDiagnosis}
              geoData={geoData}
              onOpenRescanModal={() => setIsRescanOpen(true)}
              onOpenLocationDrawer={() => setIsLocationDrawerOpen(true)}
            />

            {/* 3. AM/PM Interactive Protocol: Frosted Floating Pills with Liquid Glow & Solar Warnings */}
            <DewpointRoutineProtocol
              amSteps={adaptedAmSteps}
              pmSteps={adaptedPmSteps}
              geoData={geoData}
              onOpenProductModal={(id) => setActiveModalProductId(id)}
            />

            {/* 4. "The Shelf" (Curated Products with INR Currency & Instant Buy Chips) */}
            <DewpointCuratedShelf
              products={allShelfProducts}
              profile={skinMatrix}
              geoData={geoData}
              onOpenProductModal={(id) => setActiveModalProductId(id)}
              onSwapProduct={handleSwapProduct}
            />

            {/* 5. Skin Diet & Habit Matrix: Water Pill Tracker & Culturally Tuned Diet */}
            <DewpointDietHabitMatrix geoData={geoData} />
          </div>
        )}

        {/* Dedicated "The Shelf" Tab */}
        {activeTab === 'shelf' && (
          <div className="space-y-8 animate-fade-in">
            <DewpointCuratedShelf
              products={allShelfProducts}
              profile={skinMatrix}
              geoData={geoData}
              onOpenProductModal={(id) => setActiveModalProductId(id)}
              onSwapProduct={handleSwapProduct}
            />
          </div>
        )}

        {/* Dedicated "Skin Diet Matrix" Tab */}
        {activeTab === 'diet' && (
          <div className="space-y-8 animate-fade-in">
            <DewpointDietHabitMatrix geoData={geoData} />
          </div>
        )}

        {/* Dedicated "Dupe Finder" Tab */}
        {activeTab === 'dupes' && (
          <div className="space-y-8 animate-fade-in">
            <ClinicalDupeLibrary
              onSwapProduct={(orig, dupe) => {
                handleSwapProduct(orig, dupe);
                setActiveTab('dashboard');
              }}
              onOpenProductModal={(id) => setActiveModalProductId(id)}
            />
          </div>
        )}

        {/* Dedicated "Ingredient Clashes" Tab */}
        {activeTab === 'clashes' && (
          <div className="space-y-8 animate-fade-in">
            <IngredientConflictChecker />
          </div>
        )}

        {/* Dedicated "AI Skincare Agent" Tab */}
        {activeTab === 'chat' && (
          <div className="space-y-8 animate-fade-in">
            <DermaSyncAiChat
              barrierScore={barrierScore}
              skinDiagnosis={skinDiagnosis}
              hydrationLevel={hydrationLevel}
              sebumLevel={sebumLevel}
              geoData={geoData}
              isOpen={true}
              onClose={() => setActiveTab('dashboard')}
              isEmbeddedTab={true}
            />
          </div>
        )}
      </main>

      {/* Optical Face Re-Scan Modal */}
      <DewpointScanModal
        isOpen={isRescanOpen}
        onClose={() => setIsRescanOpen(false)}
        onUpdateVitals={handleUpdateVitals}
      />

      {/* Clinical Formula Modal */}
      {activeModalProductId && (
        <ProductDetailModal
          productId={activeModalProductId}
          profile={skinMatrix}
          currencyCode={geoData.currencyCode}
          onClose={() => setActiveModalProductId(null)}
          onSwapProduct={handleSwapProduct}
        />
      )}

      {/* Interactive Location & Climate Override Drawer */}
      <LocationDrawer
        isOpen={isLocationDrawerOpen}
        onClose={() => setIsLocationDrawerOpen(false)}
        currentGeo={geoData}
        onSelectGeo={(newGeo) => {
          setGeoData(newGeo);
          playStepCompleteChime();
        }}
      />

      {/* Floating DermaSync n8n AI Chatbot Drawer */}
      <DermaSyncAiChat
        barrierScore={barrierScore}
        skinDiagnosis={skinDiagnosis}
        hydrationLevel={hydrationLevel}
        sebumLevel={sebumLevel}
        geoData={geoData}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        isEmbeddedTab={false}
      />

      {/* Floating Launcher Action Button */}
      <AiChatLauncher
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

      {/* Dimensional Alabaster & Clinical Slate Footer */}
      <footer className="border-t border-[#3B4655]/10 bg-white/70 backdrop-blur-xl py-10 px-4 sm:px-6 lg:px-8 mt-16 relative z-10 text-xs font-mono text-[#3B4655]/70">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full nectar-gradient shadow-[0_0_8px_rgba(212,155,134,0.6)]" />
            <span className="font-serif text-[#3B4655] font-bold text-base tracking-tight">
              DEWPOINT LABS
            </span>
            <span className="text-[10px] text-[#3B4655]/60">
              · Simple Skincare Powered by Real Science & Weather
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-[11px]">
            <span className="text-[#3B4655]">Smart Ingredient Matching</span>
            <span className="text-[#3B4655]/20">·</span>
            <span className="text-[#3B4655]">Pore-Safe & Barrier Friendly</span>
            <span className="text-[#3B4655]/20">·</span>
            <span className="text-[#3B4655]">Vitamin C Morning Glow</span>
            <span className="text-[#3B4655]/20">·</span>
            <span className="text-[#8C5E4F] font-bold">Live Sunscreen Reminder</span>
            <span className="text-[#3B4655]/20">·</span>
            <span className="text-[#3B4655]">
              {geoData.flag} {geoData.city} ({geoData.temperatureC}°C · {geoData.humidity}% humidity)
            </span>
          </div>

          <div className="text-[11px] text-[#3B4655]/60">
            © {new Date().getFullYear()} DEWPOINT LABS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
