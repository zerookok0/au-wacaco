import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { TERMINAL_LOGS, SPRING_SNAPPY } from '../constants';
import { useAudio } from '../hooks/useAudio';

interface Props { onComplete: () => void; }

export default function CalculationScreen({ onComplete }: Props) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const { playSuccess } = useAudio();

  const fire = useCallback(() => {
    const colors = ['#d86018','#D4A373','#49493f','#565E47'];
    confetti({ particleCount:80, spread:70, origin:{y:.6}, colors, shapes:['circle','square'], ticks:200 });
    setTimeout(()=>{ confetti({ particleCount:40, spread:90, origin:{y:.7,x:.3}, colors }); confetti({ particleCount:40, spread:90, origin:{y:.7,x:.7}, colors }); },150);
  }, []);

  useEffect(() => {
    let li = 0;
    const i1 = setInterval(() => { if(li<TERMINAL_LOGS.length){ setLogs(p=>[...p,TERMINAL_LOGS[li]]); li++; } }, 750);
    const i2 = setInterval(() => { setProgress(p=>{ if(p>=100){ clearInterval(i2); return 100; } return p+1.5; }); }, 50);
    const t = setTimeout(() => { clearInterval(i1); clearInterval(i2); setProgress(100); setLogs(TERMINAL_LOGS); playSuccess(); fire(); setTimeout(onComplete,1800); }, 5800);
    return () => { clearInterval(i1); clearInterval(i2); clearTimeout(t); };
  }, [onComplete, playSuccess, fire]);

  const circ = 2*Math.PI*45;

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-5 py-12">
      <motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={SPRING_SNAPPY} className="text-center mb-10">
        <h2 className="text-lg font-bold mb-2 text-[#49493f]">Analysing Your Profile</h2>
        <p className="text-xs text-[#9a9a8f]">Please wait while we verify your allocation...</p>
      </motion.div>
      <div className="relative w-32 h-32 mb-10">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90"><circle cx="50" cy="50" r="45" fill="none" stroke="#e8e8e0" strokeWidth="3"/><motion.circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" strokeDasharray={circ} animate={{strokeDashoffset:circ-(progress/100)*circ}} transition={{duration:.1}}/><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#d86018"/><stop offset="100%" stopColor="#D4A373"/></linearGradient></defs></svg>
        <div className="absolute inset-0 flex items-center justify-center"><span className="text-3xl font-bold text-[#d86018]">{Math.round(progress)}%</span></div>
      </div>
      <div className="w-full max-w-sm bg-white border border-[#d5d5cc] rounded-2xl shadow-sm p-5 font-mono-tabular">
        {logs.map((l,i)=>l?<motion.p key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} className={`text-[11px] leading-relaxed ${l.includes('MATCH')||l.includes('PASS')?'text-[#166534] font-semibold':'text-[#6b6b5f]'}`}>{l}</motion.p>:null)}
        <motion.div animate={{opacity:[1,0]}} transition={{duration:.6,repeat:Infinity,repeatType:'reverse'}} className="w-2 h-4 bg-[#d86018] mt-1"/>
      </div>
    </div>
  );
}
