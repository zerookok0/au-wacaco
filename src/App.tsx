import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroSection from './components/HeroSection';
import RewardViewer from './components/RewardViewer';
import EcosystemShowcase from './components/EcosystemShowcase';
import SurveyModal from './components/SurveyModal';
import CalculationScreen from './components/CalculationScreen';
import AllocationPass from './components/AllocationPass';
import Footer from './components/Footer';
import { useAudio } from './hooks/useAudio';

type AppStep = 'landing' | 'survey' | 'calculating' | 'pass';

export default function App() {
  const [appStep, setAppStep] = useState<AppStep>('landing');
  const [remainingUnits, setRemainingUnits] = useState(7);
  const { resume } = useAudio();

  useEffect(() => {
    const i = setInterval(() => setRemainingUnits(p => (Math.random() > 0.85 ? Math.max(1, p - 1) : p)), 30000);
    return () => clearInterval(i);
  }, []);

  const wrap = useCallback((fn: () => void) => () => { resume(); fn(); }, [resume]);
  const handleStartSurvey = wrap(() => setAppStep('survey'));
  const handleSurveyComplete = wrap(() => setAppStep('calculating'));
  const handleCalculationComplete = wrap(() => { setRemainingUnits(p => Math.max(0, p - 1)); setAppStep('pass'); });
  const handleCloseSurvey = wrap(() => setAppStep('landing'));

  return (
    <div className="relative bg-[#edede8] text-[#49493f] overflow-x-hidden">
      <div className="max-w-lg mx-auto relative">
        <AnimatePresence mode="wait">
          {appStep === 'landing' && (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} transition={{ duration: 0.4 }}>
              <HeroSection onStartSurvey={handleStartSurvey} remainingUnits={remainingUnits} />
              <RewardViewer onStartSurvey={handleStartSurvey} />
              <EcosystemShowcase remainingUnits={remainingUnits} onStartSurvey={handleStartSurvey} />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
        {appStep === 'survey' && <SurveyModal isOpen onClose={handleCloseSurvey} onComplete={handleSurveyComplete} />}
        {appStep === 'calculating' && (
          <motion.div key="calc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#edede8] flex flex-col">
            <div className="max-w-lg mx-auto w-full min-h-dvh flex flex-col"><CalculationScreen onComplete={handleCalculationComplete} /></div>
          </motion.div>
        )}
        {appStep === 'pass' && (
          <motion.div key="pass" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-[#edede8] flex flex-col overflow-y-auto touch-scroll">
            <div className="max-w-lg mx-auto w-full min-h-dvh"><AllocationPass /></div>
          </motion.div>
        )}
        <div className="hidden sm:block fixed inset-0 pointer-events-none z-0">
          <div className="max-w-lg mx-auto h-full relative">
            <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d86018]/10 to-transparent" />
            <div className="absolute -right-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d86018]/10 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
