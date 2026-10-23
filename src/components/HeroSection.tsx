import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import WacacoLogo from './WacacoLogo';
import { TOTAL_QUOTA, SPRING_SNAPPY } from '../constants';
import { useAudio } from '../hooks/useAudio';

interface HeroSectionProps {
  onStartSurvey: () => void;
  remainingUnits: number;
}

export default function HeroSection({ onStartSurvey, remainingUnits }: HeroSectionProps) {
  const [shimmer, setShimmer] = useState(false);
  const { playClick } = useAudio();

  useEffect(() => {
    const interval = setInterval(() => {
      setShimmer((s) => !s);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background video / gradient simulation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0E0D] via-black/40 to-[#0D0E0D]" />
        {/* Simulated extraction video with CSS gradients */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 40%, rgba(212,163,115,0.15) 0%, transparent 60%), radial-gradient(ellipse at 50% 60%, rgba(86,94,71,0.1) 0%, transparent 50%)',
            }}
          />
          {/* Animated crema flow lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-[#D4A373]/40 to-transparent"
              style={{
                left: `${35 + i * 4}%`,
                top: '30%',
                height: '40%',
              }}
              animate={{
                opacity: [0.1, 0.4, 0.1],
                scaleY: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Top Navigation */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, ...SPRING_SNAPPY }}
        className="absolute top-0 left-0 right-0 z-20 safe-top"
      >
        <div className="max-w-lg mx-auto px-5 py-4 flex items-center justify-between">
          <div className="text-white">
            <WacacoLogo size="sm" />
          </div>
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-surface"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="led-dot" />
            <span className="text-[10px] font-medium tracking-tech text-[#9CA3AF] uppercase">
              AU REGIONAL QUOTA • ACTIVE
            </span>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-md mx-auto mt-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-[10px] font-semibold tracking-[0.25em] text-[#D4A373] uppercase mb-6"
        >
          Specialty Coffee Research Initiative // Cohort 2026-OCT
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, ...SPRING_SNAPPY }}
          className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4"
        >
          SHAPE THE NEXT ERA OF
          <br />
          <span className="text-gradient-crema">PORTABLE ESPRESSO.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-[#9CA3AF] text-sm leading-relaxed mb-8 max-w-sm"
        >
          WACACO is engineering our 2027 flagship manual extraction system. We invite Australian coffee drinkers to benchmark our precision mechanics.
        </motion.p>

        {/* Quota Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1 }}
          className="glass-card p-4 mb-10 w-full max-w-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={14} className="text-[#C85A32]" />
            <span className="text-[10px] font-semibold tracking-tech text-[#6B7280] uppercase">
              Today&apos;s Sydney & Melbourne Allocation
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-[#9CA3AF]">
              {TOTAL_QUOTA} Units
            </span>
            <motion.span
              key={shimmer ? 'a' : 'b'}
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-gradient-crema"
            >
              {remainingUnits} Units Remaining
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-3"
      >
        <button
          onClick={() => { playClick(); onStartSurvey(); }}
          className="px-10 py-4 bg-[#565E47] text-white font-bold text-sm rounded-2xl shadow-lg pulse-ring hover:bg-[#4A523D] transition-colors active:scale-95 tracking-wide"
        >
          START 2-MINUTE EVALUATION →
        </button>
        <p className="text-[10px] text-[#6B7280] tracking-wide">
          10 Questions • Instant Approval • AU$9.85 Australia Post Dispatch
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-4 z-10 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-[#6B7280]" />
        </motion.div>
        <span className="text-[8px] tracking-[0.2em] text-[#6B7280] uppercase">
          Swipe down to discover
        </span>
      </motion.div>
    </section>
  );
}