import React, { useState } from 'react';
import { QuizAnswers, SkinProfileMatrix, BudgetTier } from '../../types/dermasync';
import { FaceScanStep } from './FaceScanStep';
import { ClinicalQuizStep } from './ClinicalQuizStep';
import { BudgetTierStep } from './BudgetTierStep';
import { SkinProfileMatrixCard } from './SkinProfileMatrixCard';
import { computeSkinProfile } from '../../services/diagnosticEngine';

interface IntakeFlowProps {
  onCompleteIntake: (matrix: SkinProfileMatrix, budgetTier: BudgetTier) => void;
}

export const IntakeFlow: React.FC<IntakeFlowProps> = ({ onCompleteIntake }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [biometrics, setBiometrics] = useState<{ erythemaIndex: number; oilDistribution: number; barrierResistance: number }>({
    erythemaIndex: 78,
    oilDistribution: 52,
    barrierResistance: 46
  });

  const [answers, setAnswers] = useState<QuizAnswers>({
    middayShine: 't_zone_only',
    cleanserSensation: 'tight_stinging',
    barrierReactivity: 'stings_with_actives',
    climateType: 'arid',
    sunExposureHours: '1_to_3',
    hormonalBreakouts: 'cyclical_jawline',
    budgetTier: 'balanced'
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedMatrix, setGeneratedMatrix] = useState<SkinProfileMatrix | null>(null);

  const handleUpdateAnswers = (updated: Partial<QuizAnswers>) => {
    setAnswers(prev => ({ ...prev, ...updated }));
  };

  const handleGenerateProtocol = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const matrix = computeSkinProfile(answers, biometrics);
      setGeneratedMatrix(matrix);
      setIsGenerating(false);
      setCurrentStep(4);
    }, 700);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Step Indicator (Only for steps 1-3) */}
      {currentStep <= 3 && (
        <div className="max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#E2E8F0] -z-0" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#2E4A3D] -z-0 transition-all duration-300"
              style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
            />

            {[
              { num: 1, label: 'Optical Scan' },
              { num: 2, label: 'Symptom Quiz' },
              { num: 3, label: 'Budget Tier' }
            ].map((s) => {
              const isDone = currentStep > s.num;
              const isCurrent = currentStep === s.num;
              return (
                <div key={s.num} className="flex flex-col items-center relative z-10 bg-[#FAF9F5] px-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold font-mono transition-colors ${
                      isCurrent
                        ? 'bg-[#2E4A3D] text-white ring-4 ring-[#E9EFEA]'
                        : isDone
                        ? 'bg-[#2E4A3D] text-white'
                        : 'bg-white border border-[#CBD5E1] text-[#64748B]'
                    }`}
                  >
                    {isDone ? '✓' : s.num}
                  </div>
                  <span className={`text-[11px] mt-1.5 font-medium whitespace-nowrap ${
                    isCurrent ? 'text-[#1E293B] font-semibold' : 'text-[#64748B]'
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step Renderers */}
      {currentStep === 1 && (
        <FaceScanStep
          onScanComplete={(bio) => setBiometrics(bio)}
          onNext={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 2 && (
        <ClinicalQuizStep
          answers={answers}
          onChange={handleUpdateAnswers}
          onNext={() => setCurrentStep(3)}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 3 && (
        <BudgetTierStep
          selectedTier={answers.budgetTier}
          onSelectTier={(tier) => handleUpdateAnswers({ budgetTier: tier })}
          onGenerateProtocol={handleGenerateProtocol}
          onBack={() => setCurrentStep(2)}
          isGenerating={isGenerating}
        />
      )}

      {currentStep === 4 && generatedMatrix && (
        <SkinProfileMatrixCard
          matrix={generatedMatrix}
          onProceedToDashboard={() => {
            onCompleteIntake(generatedMatrix, answers.budgetTier);
          }}
        />
      )}
    </div>
  );
};
