import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Droplets, Zap, Waves, Shield, ChevronDown } from 'lucide-react';
import { SPRING_CONFIG } from '../constants';
import type { SurveyQuestion } from '../constants';

interface Props { question: SurveyQuestion; selectedValue?: string | string[]; onAnswer: (v: string | string[]) => void; }

const icons: Record<string, typeof Coffee> = { coffee: Coffee, droplets: Droplets, zap: Zap, waves: Waves };

export default memo(function QuestionStep({ question, selectedValue, onAnswer }: Props) {
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);

  const handle = (val: string) => {
    if (question.type === 'multi') {
      const cur = (selectedValue as string[]) || [];
      if (cur.includes(val)) onAnswer(cur.filter(v => v !== val));
      else if (cur.length < (question.maxSelect || 99)) onAnswer([...cur, val]);
    } else onAnswer(val);
  };
  const sel = (val: string) => question.type === 'multi' ? ((selectedValue as string[])||[]).includes(val) : selectedValue === val;

  return (
    <div>
      <motion.h3 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="text-lg font-bold leading-snug mb-1 text-[#49493f]">{question.question}</motion.h3>
      {question.subtitle && <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.1}} className="text-xs text-[#9a9a8f] mb-6">{question.subtitle}</motion.p>}
      {!question.subtitle && <div className="mb-6"/>}

      {question.type === 'grid' ? (
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((o,i)=>{
            const Ico = o.icon ? icons[o.icon] : null;
            return <motion.button key={o.value} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.1+i*.08}} onClick={()=>handle(o.value)} whileTap={{scale:.96}}
              className={`p-4 rounded-2xl border-2 text-center transition-all ${sel(o.value)?'option-selected':'border-[#d5d5cc] bg-white hover:border-[#d86018]/30 hover:shadow-sm'}`}>
              {Ico && <Ico size={24} className="mx-auto mb-2 text-[#d86018]"/>}<p className="text-sm font-semibold text-[#49493f]">{o.label}</p>
              {o.subtitle && <p className="text-[10px] text-[#9a9a8f] mt-0.5">{o.subtitle}</p>}
            </motion.button>;
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {question.options.map((o,i)=>(
            <motion.button key={o.value} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:.1+i*.06,...SPRING_CONFIG}} onClick={()=>handle(o.value)} whileTap={{scale:.97}}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${sel(o.value)?'option-selected':'border-[#d5d5cc] bg-white hover:border-[#d86018]/30 hover:shadow-sm'}`}>
              <div className="flex items-center justify-between">
                <div className="flex-1"><p className="text-sm font-medium text-[#49493f]">{o.label}</p>{o.subtitle && <p className="text-[10px] text-[#9a9a8f] mt-0.5">{o.subtitle}</p>}</div>
                {sel(o.value) && <motion.div initial={{scale:0}} animate={{scale:1}} className="w-5 h-5 rounded-full bg-[#d86018] flex items-center justify-center flex-shrink-0 ml-3"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></motion.div>}
              </div>
            </motion.button>
          ))}
        </div>
      )}
      {question.type === 'multi' && <p className="text-[10px] text-[#9a9a8f] mt-3 text-center">{((selectedValue as string[])||[]).length} of {question.maxSelect} selected</p>}

      {/* Trust & Disclaimer Accordion */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="mt-8 mb-4"
      >
        {/* Static attribution line */}
        <p className="text-[11px] sm:text-xs text-stone-400/80 leading-relaxed text-center">
          Official consumer study by WACACO · Hardware allocation funded by WACACO Australia Initiative.
        </p>

        {/* Expandable toggle */}
        <button
          onClick={() => setDisclaimerOpen(v => !v)}
          className="mx-auto mt-2 flex items-center gap-1 text-[11px] sm:text-xs text-stone-500 hover:text-stone-700 transition-colors underline underline-offset-2 decoration-stone-300/60 hover:decoration-stone-500"
        >
          <motion.span
            animate={{ rotate: disclaimerOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronDown size={12} />
          </motion.span>
          <span>{disclaimerOpen ? 'Hide' : 'View'} survey verification and allocation details</span>
        </button>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {disclaimerOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200/80 space-y-4">
                {/* Section A */}
                <div className="flex items-start gap-2.5">
                  <Shield size={14} className="text-stone-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-stone-700 mb-1">Who launched this survey?</p>
                    <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed">
                      WACACO Company Limited is conducting this consumer habits study to analyze specialty espresso usage, extraction preferences, and portable brewing routines across Australian coffee drinkers.
                    </p>
                  </div>
                </div>

                {/* Section B */}
                <div className="flex items-start gap-2.5">
                  <Shield size={14} className="text-stone-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-stone-700 mb-1">Who provides the rewards?</p>
                    <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed">
                      All Minipresso GR2 evaluation units (valued at AU$119.00) are 100% sponsored, manufactured, and allocated directly by WACACO as research grants. Verified panelists only contribute standard Australia Post registered dispatch &amp; handling (AU$6.85).
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
});
