import { memo } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Droplets, Zap, Waves } from 'lucide-react';
import { SPRING_CONFIG } from '../constants';
import type { SurveyQuestion } from '../constants';

interface Props { question: SurveyQuestion; selectedValue?: string | string[]; onAnswer: (v: string | string[]) => void; }

const icons: Record<string, typeof Coffee> = { coffee: Coffee, droplets: Droplets, zap: Zap, waves: Waves };

export default memo(function QuestionStep({ question, selectedValue, onAnswer }: Props) {
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
    </div>
  );
});
