import { memo } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Droplets, Zap, Waves } from 'lucide-react';
import { SPRING_CONFIG } from '../constants';
import type { SurveyQuestion } from '../constants';

interface QuestionStepProps {
  question: SurveyQuestion;
  selectedValue?: string | string[];
  onAnswer: (value: string | string[]) => void;
}

const iconMap: Record<string, typeof Coffee> = {
  coffee: Coffee,
  droplets: Droplets,
  zap: Zap,
  waves: Waves,
};

export default memo(function QuestionStep({ question, selectedValue, onAnswer }: QuestionStepProps) {
  const handleSelect = (val: string) => {
    if (question.type === 'multi') {
      const current = (selectedValue as string[]) || [];
      if (current.includes(val)) {
        onAnswer(current.filter((v) => v !== val));
      } else {
        if (current.length < (question.maxSelect || 99)) {
          onAnswer([...current, val]);
        }
      }
    } else {
      onAnswer(val);
    }
  };

  const isSelected = (val: string) => {
    if (question.type === 'multi') {
      return ((selectedValue as string[]) || []).includes(val);
    }
    return selectedValue === val;
  };

  const isGrid = question.type === 'grid';

  return (
    <div>
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-bold leading-snug mb-1"
      >
        {question.question}
      </motion.h3>
      {question.subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xs text-[#6B7280] mb-6"
        >
          {question.subtitle}
        </motion.p>
      )}
      {!question.subtitle && <div className="mb-6" />}

      {/* Grid layout for Q2 */}
      {isGrid ? (
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((opt, i) => {
            const Icon = opt.icon ? iconMap[opt.icon] : null;
            return (
              <motion.button
                key={opt.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                onClick={() => handleSelect(opt.value)}
                whileTap={{ scale: 0.96 }}
                className={`p-4 rounded-2xl border-2 text-center transition-all ${
                  isSelected(opt.value)
                    ? 'border-[#565E47] bg-[#565E47]/10 shadow-lg shadow-[#565E47]/10'
                    : 'border-white/5 glass-card hover:border-white/10'
                }`}
              >
                {Icon && <Icon size={24} className="mx-auto mb-2 text-[#D4A373]" />}
                <p className="text-sm font-semibold">{opt.label}</p>
                {opt.subtitle && (
                  <p className="text-[10px] text-[#6B7280] mt-0.5">{opt.subtitle}</p>
                )}
              </motion.button>
            );
          })}
        </div>
      ) : (
        /* Single / Multi column */
        <div className="space-y-3">
          {question.options.map((opt, i) => (
            <motion.button
              key={opt.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06, ...SPRING_CONFIG }}
              onClick={() => handleSelect(opt.value)}
              whileTap={{ scale: 0.97 }}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                isSelected(opt.value)
                  ? 'border-[#565E47] bg-[#565E47]/10 shadow-lg shadow-[#565E47]/10'
                  : 'border-white/5 glass-card hover:border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">{opt.label}</p>
                  {opt.subtitle && (
                    <p className="text-[10px] text-[#6B7280] mt-0.5">{opt.subtitle}</p>
                  )}
                </div>
                {isSelected(opt.value) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-[#565E47] flex items-center justify-center flex-shrink-0 ml-3"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Multi-select hint */}
      {question.type === 'multi' && (
        <p className="text-[10px] text-[#6B7280] mt-3 text-center">
          {((selectedValue as string[]) || []).length} of {question.maxSelect} selected
        </p>
      )}
    </div>
  );
});