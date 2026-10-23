import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import WacacoLogo from './WacacoLogo';
import { TOTAL_QUOTA, SPRING_SNAPPY } from '../constants';
import { useAudio } from '../hooks/useAudio';

interface Props { onStartSurvey: () => void; remainingUnits: number; }

export default function HeroSection({ onStartSurvey, remainingUnits }: Props) {
  const [s, setS] = useState(false);
  const { playClick } = useAudio();
  useEffect(() => { const i = setInterval(() => setS(v => !v), 12000); return () => clearInterval(i); }, []);

  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden touch-scroll">
      {/* Product image background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://wacaco.ae/cdn/shop/files/Wacaco_Minipresso_GR2_102_PNG_LD.webp"
          alt=""
          className="absolute w-full h-full object-cover object-center sm:object-[center_30%]"
        />
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#edede8]/85 via-[#edede8]/60 to-[#edede8]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#edede8] via-transparent to-transparent" />
      </div>

      {/* Navigation */}
      <motion.nav initial={{y:-60,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.3,...SPRING_SNAPPY}} className="absolute top-0 left-0 right-0 z-20">
        <div className="max-w-lg mx-auto px-5 py-4 flex items-center justify-between">
          <WacacoLogo size="sm" />
          <motion.div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-surface" whileHover={{scale:1.03}} whileTap={{scale:.98}}>
            <span className="led-dot" />
            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#6b6b5f] uppercase">AU REGIONAL QUOTA • ACTIVE</span>
          </motion.div>
        </div>
      </motion.nav>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-md mx-auto mt-20">
        <motion.span initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.5}} className="text-[10px] font-semibold tracking-[0.25em] text-[#d86018] drop-shadow-sm uppercase mb-6">Specialty Coffee Research Initiative // Cohort 2026-OCT</motion.span>
        <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:.7,...SPRING_SNAPPY}} className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4 text-[#49493f] drop-shadow-sm">SHAPE THE NEXT ERA OF<br /><span className="text-gradient-primary">PORTABLE ESPRESSO.</span></motion.h1>
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.9}} className="text-[#6b6b5f] text-sm leading-relaxed mb-8 max-w-sm drop-shadow-sm">WACACO is engineering our 2027 flagship manual extraction system. We invite Australian coffee drinkers to benchmark our precision mechanics.</motion.p>

        <motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{delay:1.1}} className="glass-card p-4 mb-10 w-full max-w-sm">
          <div className="flex items-center gap-2 mb-2"><MapPin size={14} className="text-[#d86018]" /><span className="text-[10px] font-semibold tracking-[0.2em] text-[#9a9a8f] uppercase">Today's Sydney & Melbourne Allocation</span></div>
          <div className="flex items-baseline justify-between"><span className="text-sm text-[#6b6b5f]">{TOTAL_QUOTA} Units</span><motion.span key={s?'a':'b'} animate={{opacity:[1,.7,1]}} transition={{duration:.6}} className="text-2xl font-bold text-gradient-primary">{remainingUnits} Units Remaining</motion.span></div>
        </motion.div>
      </div>

      <div className="relative z-10 mt-auto mb-10 flex flex-col items-center gap-3">
        <button onClick={()=>{playClick();onStartSurvey();}} className="px-10 py-4 btn-primary font-bold text-sm rounded-2xl pulse-ring active:scale-[0.98] tracking-wide">START 2-MINUTE EVALUATION →</button>
        <p className="text-[10px] text-[#9a9a8f] tracking-wide drop-shadow-sm">10 Questions • Instant Approval • AU$9.85 Australia Post Dispatch</p>
      </div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.6}} className="absolute bottom-4 z-10 flex flex-col items-center gap-1">
        <motion.div animate={{y:[0,6,0]}} transition={{duration:2,repeat:Infinity}}><ChevronDown size={16} className="text-[#9a9a8f]" /></motion.div>
        <span className="text-[8px] tracking-[0.2em] text-[#9a9a8f] uppercase drop-shadow-sm">Swipe down to discover</span>
      </motion.div>
    </section>
  );
}
