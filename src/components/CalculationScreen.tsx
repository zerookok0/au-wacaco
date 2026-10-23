import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { TERMINAL_LOGS } from '../constants';
import { useAudio } from '../hooks/useAudio';

interface CalculationScreenProps {
  onComplete: () => void;
}

export default function CalculationScreen({ onComplete }: CalculationScreenProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const { playSuccess } = useAudio();

  const fireConfetti = useCallback(() => {
    const colors = ['#565E47', '#D4A373', '#C85A32', '#F3F4F6'];
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors,
      shapes: ['circle', 'square'],
      ticks: 200,
    });
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 90,
        origin: { y: 0.7, x: 0.3 },
        colors,
      });
      confetti({
        particleCount: 40,
        spread: 90,
        origin: { y: 0.7, x: 0.7 },
        colors,
      });
    }, 150);
  }, []);

  useEffect(() => {
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < TERMINAL_LOGS.length) {
        setLogs((prev) => [...prev, TERMINAL_LOGS[logIndex]]);
        logIndex++;
      }
    }, 750);

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 1.5;
      });
    }, 50);

    const completeTimeout = setTimeout(() => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
      setProgress(100);
      setLogs(TERMINAL_LOGS);
      playSuccess();
      fireConfetti();
      setTimeout(onComplete, 1800);
    }, 5800);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete, playSuccess, fireConfetti]);

  const circumference = 2 * Math.PI * 45;

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-5 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-10"
      >
        <h2 className="text-lg font-bold mb-2">Analysing Your Profile</h2>
        <p className="text-xs text-[#6B7280]">Please wait while we verify your allocation...</p>
      </motion.div>

      {/* Circular progress */}
      <div className="relative w-32 h-32 mb-10">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#2F2F2F" strokeWidth="3" />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#grad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
            transition={{ duration: 0.1 }}
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#565E47" />
              <stop offset="100%" stopColor="#D4A373" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-gradient-crema">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Terminal logs */}
      <div className="w-full max-w-sm glass-card p-5 font-mono">
        {logs.map((log, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0 }}
            className={`text-[11px] leading-relaxed ${
              log.includes('MATCH CONFIRMED') || log.includes('PASS ALLOCATED')
                ? 'text-[#4ade80]'
                : 'text-[#9CA3AF]'
            }`}
          >
            {log}
          </motion.p>
        ))}
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          className="w-2 h-4 bg-[#D4A373] mt-1"
        />
      </div>
    </div>
  );
}