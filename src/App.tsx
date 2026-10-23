import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroSection from './components/HeroSection';
import RewardViewer from './components/RewardViewer';
import EcosystemShowcase from './components/EcosystemShowcase';
import SurveyModal from './components/SurveyModal';
import CalculationScreen from './components/CalculationScreen';
import AllocationPass from './components/AllocationPass';
import Footer from './components/Footer';
import { TOTAL_QUOTA } from './constants';

type AppStep = 'landing' | 'survey' | 'calculating' | 'pass';

export default function App() {
  const [appStep, setAppStep] = useState<AppStep>('landing');
  const [remainingUnits, setRemainingUnits] = useState(7);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingUnits((prev) => {
        if (Math.random() > 0.85) {
          return Math.max(1, prev - 1);
        }
        return prev;
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStartSurvey = useCallback(() => { setAppStep('survey'); }, []);
  const handleSurveyComplete = useCallback(() => { setAppStep('calculating'); }, []);
  const handleCalculationComplete = useCallback(() => {
    setRemainingUnits((prev) => Math.max(0, prev - 1));
    setAppStep('pass');
  }, []);
  const handleCloseSurvey = useCallback(() => { setAppStep('landing'); }, []);

  return (
    <div className="relative bg-[#0D0E0D] text-[#F3F4F6] overflow-x-hidden">
      <div className="max-w-lg mx-auto relative">
        <AnimatePresence mode="wait">
          {appStep === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
            >
              <HeroSection onStartSurvey={handleStartSurvey} remainingUnits={remainingUnits} />
              <RewardViewer onStartSurvey={handleStartSurvey} />
              <EcosystemShowcase remainingUnits={remainingUnits} onStartSurvey={handleStartSurvey} />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {appStep === 'survey' && (
            <SurveyModal isOpen={true} onClose={handleCloseSurvey} onComplete={handleSurveyComplete} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {appStep === 'calculating' && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#0D0E0D] flex flex-col"
            >
              <div className="max-w-lg mx-auto w-full flex-1 flex flex-col">
                <CalculationScreen onComplete={handleCalculationComplete} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {appStep === 'pass' && (
            <motion.div
              key="pass"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 bg-[#0D0E0D] flex flex-col overflow-y-auto"
            >
              <div className="max-w-lg mx-auto w-full flex-1">
                <AllocationPass />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hidden sm:block fixed inset-0 pointer-events-none z-0">
          <div className="max-w-lg mx-auto h-full relative">
            <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#565E47]/20 to-transparent" />
            <div className="absolute -right-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#565E47]/20 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}