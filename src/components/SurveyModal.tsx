import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Clock, ArrowRight } from 'lucide-react';
import { SURVEY_QUESTIONS, SPRING_CONFIG, SPRING_SNAPPY } from '../constants';
import { useAudio } from '../hooks/useAudio';
import WacacoLogo from './WacacoLogo';
import QuestionStep from './QuestionStep';

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

type EligibilityCheck = {
  resident: boolean;
  coffeeConsumer: boolean;
  agreeFeedback: boolean;
};

export default function SurveyModal({ isOpen, onClose, onComplete }: SurveyModalProps) {
  const [step, setStep] = useState<'eligibility' | 'questions' | 'calculating'>('eligibility');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [eligibility, setEligibility] = useState<EligibilityCheck>({
    resident: false,
    coffeeConsumer: false,
    agreeFeedback: false,
  });
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const { playClick, playSuccess } = useAudio();

  const allEligible = eligibility.resident && eligibility.coffeeConsumer && eligibility.agreeFeedback;

  const handleStartSurvey = useCallback(() => {
    playClick();
    setStep('questions');
    setCurrentQuestion(0);
  }, [playClick]);

  const handleAnswer = useCallback(
    (questionId: number, value: string | string[]) => {
      playClick();
      setAnswers((prev) => ({ ...prev, [questionId]: value }));

      if (currentQuestion < SURVEY_QUESTIONS.length - 1) {
        setTimeout(() => {
          setCurrentQuestion((c) => c + 1);
        }, 280);
      } else {
        setTimeout(() => {
          playSuccess();
          setStep('calculating');
        }, 350);
      }
    },
    [currentQuestion, playClick, playSuccess]
  );

  const handlePrev = useCallback(() => {
    playClick();
    if (currentQuestion > 0) {
      setCurrentQuestion((c) => c - 1);
    }
  }, [currentQuestion, playClick]);

  const progress = step === 'questions' ? ((currentQuestion + 1) / SURVEY_QUESTIONS.length) * 100 : 0;

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={SPRING_SNAPPY}
      className="fixed inset-0 z-50 bg-[#0D0E0D] flex flex-col"
    >
      {/* Top Bar */}
      <div className="safe-top px-5 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-white">
            <WacacoLogo size="sm" />
          </div>
          <div className="flex items-center gap-3">
            {step === 'questions' && (
              <span className="text-[10px] text-[#6B7280] font-medium tracking-wide flex items-center gap-1">
                <Clock size={12} /> ~90 sec
              </span>
            )}
            <button
              onClick={() => setShowExitConfirm(true)}
              className="w-8 h-8 rounded-full glass-surface flex items-center justify-center"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {step === 'questions' && (
          <div className="h-[3px] bg-[#2F2F2F] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #565E47, #D4A373)',
                width: `${progress}%`,
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        {step === 'questions' && (
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-[#6B7280] tracking-[0.2em] uppercase">
              Question {String(currentQuestion + 1).padStart(2, '0')} / {String(SURVEY_QUESTIONS.length).padStart(2, '0')}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {step === 'eligibility' && (
          <div className="px-5 py-8 flex flex-col justify-center min-h-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-xl font-bold mb-2">Pre-Survey Terms</h2>
              <p className="text-sm text-[#9CA3AF] mb-8">
                Please confirm your eligibility to participate in this research initiative.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    key: 'resident' as const,
                    label: 'I am currently an Australian resident with a valid domestic postal address.',
                  },
                  {
                    key: 'coffeeConsumer' as const,
                    label: 'I consume espresso, flat whites, or specialty coffee at least twice a week.',
                  },
                  {
                    key: 'agreeFeedback' as const,
                    label:
                      'I agree to receive one short, anonymous rating survey via email 30 days after testing the GR2.',
                  },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-start gap-3 p-4 glass-card cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="checkbox-olive mt-0.5"
                      checked={eligibility[item.key]}
                      onChange={() => {
                        playClick();
                        setEligibility((prev) => ({
                          ...prev,
                          [item.key]: !prev[item.key],
                        }));
                      }}
                    />
                    <span className="text-sm text-[#F3F4F6]">{item.label}</span>
                  </label>
                ))}
              </div>

              <button
                disabled={!allEligible}
                onClick={handleStartSurvey}
                className="w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all active:scale-95 disabled:opacity-30 disabled:active:scale-100 bg-[#565E47] text-white pulse-ring"
              >
                CONFIRM ELIGIBILITY & COMMENCE SURVEY →
              </button>
            </motion.div>
          </div>
        )}

        {step === 'questions' && (
          <div className="px-5 py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={SPRING_CONFIG}
              >
                <QuestionStep
                  question={SURVEY_QUESTIONS[currentQuestion]}
                  selectedValue={answers[SURVEY_QUESTIONS[currentQuestion].id]}
                  onAnswer={(value) =>
                    handleAnswer(SURVEY_QUESTIONS[currentQuestion].id, value)
                  }
                />
              </motion.div>
            </AnimatePresence>

            {/* Previous button */}
            {currentQuestion > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handlePrev}
                className="mt-6 flex items-center gap-1.5 text-sm text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
              >
                <ChevronLeft size={16} />
                <span>Previous Question</span>
              </motion.button>
            )}
          </div>
        )}
      </div>

      {/* Exit confirmation modal */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-60 flex items-center justify-center px-8"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="glass-card p-6 max-w-xs w-full text-center"
            >
              <p className="text-sm font-semibold mb-1">Exit survey?</p>
              <p className="text-xs text-[#9CA3AF] mb-6">
                Your progress will not be saved.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#2F2F2F] text-sm font-medium"
                >
                  Continue
                </button>
                <button
                  onClick={() => {
                    setShowExitConfirm(false);
                    onClose();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#C85A32]/20 text-[#C85A32] text-sm font-medium"
                >
                  Exit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}