import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Clock } from 'lucide-react';
import { SURVEY_QUESTIONS, SPRING_CONFIG, SPRING_SNAPPY } from '../constants';
import { useAudio } from '../hooks/useAudio';
import WacacoLogo from './WacacoLogo';
import QuestionStep from './QuestionStep';

interface Props { isOpen: boolean; onClose: () => void; onComplete: () => void; }

export default function SurveyModal({ isOpen, onClose, onComplete }: Props) {
  const [phase, setPhase] = useState<'eligibility' | 'questions'>('eligibility');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [eligible, setEligible] = useState({ resident: false, coffee: false, feedback: false });
  const [exitConfirm, setExitConfirm] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const { playClick, playSuccess } = useAudio();
  const canGo = eligible.resident && eligible.coffee && eligible.feedback;

  const goSurvey = useCallback(() => { playClick(); setPhase('questions'); setCurrentQ(0); }, [playClick]);
  const handleAnswer = useCallback((qid: number, val: string | string[]) => {
    playClick(); setAnswers(p => ({ ...p, [qid]: val }));
    if (currentQ < SURVEY_QUESTIONS.length - 1) { setDirection('forward'); setTimeout(() => setCurrentQ(c => c + 1), 260); }
    else setTimeout(() => { playSuccess(); onComplete(); }, 350);
  }, [currentQ, playClick, playSuccess, onComplete]);
  const goBack = useCallback(() => { if (currentQ > 0) { playClick(); setDirection('backward'); setCurrentQ(c => c - 1); } }, [currentQ, playClick]);
  const progress = ((currentQ + 1) / SURVEY_QUESTIONS.length) * 100;

  if (!isOpen) return null;

  return (
    <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} transition={SPRING_SNAPPY} className="fixed inset-0 z-50 bg-[#edede8] flex flex-col">
      <div className="px-5 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[#49493f]"><WacacoLogo size="sm" /></div>
          <div className="flex items-center gap-3">
            {phase==='questions' && <span className="text-[10px] text-[#9a9a8f] flex items-center gap-1"><Clock size={12}/>~90 sec</span>}
            <button onClick={()=>setExitConfirm(true)} className="w-8 h-8 rounded-full bg-[#ffffff] border border-[#d5d5cc] flex items-center justify-center"><X size={14} className="text-[#49493f]"/></button>
          </div>
        </div>
        {phase==='questions' && <div className="h-[3px] bg-[#e8e8e0] rounded-full overflow-hidden"><motion.div className="h-full rounded-full bg-gradient-to-r from-[#d86018] to-[#D4A373]" style={{width:`${progress}%`}} animate={{width:`${progress}%`}} transition={{duration:.3}}/></div>}
        {phase==='questions' && <div className="flex justify-between mt-2"><span className="text-[10px] text-[#9a9a8f] tracking-[0.2em] uppercase">Question {String(currentQ+1).padStart(2,'0')} / {String(SURVEY_QUESTIONS.length).padStart(2,'0')}</span></div>}
      </div>

      <div className="flex-1 overflow-y-auto touch-scroll">
        {phase==='eligibility' && <div className="px-5 py-8 flex flex-col justify-center min-h-full"><motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
          <h2 className="text-xl font-bold mb-2 text-[#49493f]">Pre-Survey Terms</h2>
          <p className="text-sm text-[#6b6b5f] mb-8">Please confirm your eligibility to participate in this research initiative.</p>
          <div className="space-y-4 mb-8">
            {[{key:'resident',label:'I am currently an Australian resident with a valid domestic postal address.'},{key:'coffee',label:'I consume espresso, flat whites, or specialty coffee at least twice a week.'},{key:'feedback',label:'I agree to receive one short, anonymous rating survey via email 30 days after testing the GR2.'}].map(item=>(
              <label key={item.key} className="flex items-start gap-3 p-4 glass-card cursor-pointer">
                <input type="checkbox" className="checkbox-olive mt-0.5" checked={eligible[item.key as keyof typeof eligible]} onChange={()=>{playClick();setEligible(p=>({...p,[item.key]:!p[item.key as keyof typeof p]}));}} />
                <span className="text-sm text-[#49493f]">{item.label}</span>
              </label>))}
          </div>
          <button disabled={!canGo} onClick={goSurvey} className="w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all active:scale-[0.98] disabled:opacity-30 btn-primary pulse-ring">CONFIRM ELIGIBILITY & COMMENCE SURVEY →</button>
        </motion.div></div>}

        {phase==='questions' && SURVEY_QUESTIONS[currentQ] && <div className="px-5 py-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={currentQ} custom={direction}
              initial={{x: direction==='forward'?'100%':'-100%', opacity:0}} animate={{x:0, opacity:1}} exit={{x: direction==='forward'?'-100%':'100%', opacity:0}} transition={SPRING_CONFIG}>
              <QuestionStep question={SURVEY_QUESTIONS[currentQ]} selectedValue={answers[SURVEY_QUESTIONS[currentQ].id]} onAnswer={v=>handleAnswer(SURVEY_QUESTIONS[currentQ].id,v)} />
            </motion.div>
          </AnimatePresence>
          {currentQ > 0 && <motion.button initial={{opacity:0}} animate={{opacity:1}} onClick={goBack} className="mt-6 flex items-center gap-1.5 text-sm text-[#9a9a8f] hover:text-[#49493f] transition-colors"><ChevronLeft size={16}/> <span>Previous Question</span></motion.button>}
        </div>}
      </div>

      <AnimatePresence>
        {exitConfirm && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-black/30 z-60 flex items-center justify-center px-8">
          <motion.div initial={{scale:.9}} animate={{scale:1}} className="glass-card p-6 max-w-xs w-full text-center">
            <p className="text-sm font-semibold text-[#49493f] mb-1">Exit survey?</p><p className="text-xs text-[#6b6b5f] mb-6">Your progress will not be saved.</p>
            <div className="flex gap-3">
              <button onClick={()=>setExitConfirm(false)} className="flex-1 py-2.5 rounded-xl btn-ghost text-sm font-medium text-[#49493f]">Continue</button>
              <button onClick={()=>{setExitConfirm(false);onClose();}} className="flex-1 py-2.5 rounded-xl bg-[#d86018]/10 text-[#d86018] text-sm font-medium">Exit</button>
            </div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </motion.div>
  );
}
