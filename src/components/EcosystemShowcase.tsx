import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Coffee, Zap, Sliders, ChevronLeft, ChevronRight } from 'lucide-react';
import { SPRING_SNAPPY } from '../constants';
import { useAudio } from '../hooks/useAudio';

interface EcosystemShowcaseProps {
  remainingUnits: number;
  onStartSurvey: () => void;
}

export default function EcosystemShowcase({ remainingUnits, onStartSurvey }: EcosystemShowcaseProps) {
  const { playClick } = useAudio();

  return (
    <section className="relative min-h-screen py-20 px-5 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={SPRING_SNAPPY}
        className="max-w-md mx-auto mb-10"
      >
        <h2 className="text-2xl font-bold mb-3">
          WACACO <span className="text-gradient-olive">Hardware Ecosystem</span>
        </h2>
        <p className="text-sm text-[#9CA3AF]">
          Engineering precision meets portable design. Explore our flagship extraction instruments.
        </p>
      </motion.div>

      {/* Module A: Picopresso Pressure Dial */}
      <ModuleA playClick={playClick} />

      {/* Module B: Nanopresso Card Swipe */}
      <ModuleB playClick={playClick} />

      {/* Module C: Exagrind Click Dial */}
      <ModuleC playClick={playClick} />

      {/* Bottom sticky bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, ...SPRING_SNAPPY }}
        className="fixed bottom-0 left-0 right-0 z-30 safe-bottom"
      >
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="glass-surface rounded-2xl px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#6B7280] uppercase tracking-wide">Minipresso GR2 Allocation</p>
              <p className="text-sm font-bold text-gradient-crema">{remainingUnits}/50 Left</p>
            </div>
            <button
              onClick={() => { playClick(); onStartSurvey(); }}
              className="px-5 py-2.5 bg-[#C85A32] text-white text-sm font-semibold rounded-xl active:scale-95 transition-transform tracking-wide"
            >
              Claim Evaluation Unit →
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ModuleA({ playClick }: { playClick: () => void }) {
  const [pressure, setPressure] = useState(9);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const flowOpacity = 1 - Math.abs(pressure - 9) * 0.08;
  const cremaThickness = Math.max(0.2, 1 - Math.abs(pressure - 9) * 0.06);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: 0.2, ...SPRING_SNAPPY }}
      className="max-w-md mx-auto mb-8"
    >
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Coffee size={16} className="text-[#D4A373]" />
          <h3 className="text-sm font-semibold tracking-wide">Picopresso</h3>
          <span className="text-[10px] text-[#6B7280] ml-auto">52mm Bottomless Portafilter</span>
        </div>

        {/* Product image */}
        <div className="relative mb-4 rounded-xl overflow-hidden bg-[#1A1C1A] aspect-video flex items-center justify-center">
          <img
            src="https://cdn.shopify.com/s/files/1/0574/2150/8666/files/WACACO_Picopresso_Bottomless_Portafilter.png"
            alt="Picopresso 52mm bottomless portafilter"
            className="w-full h-full object-cover opacity-80"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.style.display = 'none';
              t.parentElement!.innerHTML = `<svg width="120" height="80" viewBox="0 0 120 80" fill="none"><rect x="20" y="10" width="80" height="60" rx="8" stroke="#565E47" stroke-width="1.5" fill="none"/><circle cx="60" cy="40" r="18" stroke="#6B7280" stroke-width="1" fill="none"/><rect x="45" y="55" width="30" height="8" rx="2" stroke="#6B7280" stroke-width="1" fill="none"/></svg><span class="text-[#6B7280] text-[10px] mt-1 block">Picopresso</span>`;
            }}
          />
          {/* Flow indicator */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex gap-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 h-1 rounded-full"
                  animate={{
                    background: `rgba(212,163,115,${flowOpacity * (0.3 + i * 0.1)})`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pressure slider */}
        <div ref={constraintsRef} className="relative h-12 mb-3">
          <div className="absolute top-1/2 left-0 right-0 h-1.5 -translate-y-1/2 rounded-full bg-[#2F2F2F]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#565E47] via-[#D4A373] to-[#C85A32]"
              style={{ width: `${(pressure / 18) * 100}%` }}
            />
          </div>
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#D4A373] shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center"
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            dragMomentum={false}
            style={{ left: `${(pressure / 18) * 100}%`, x: -16 }}
            onDrag={(_, info) => {
              const rect = constraintsRef.current?.getBoundingClientRect();
              if (rect) {
                const pct = Math.max(0, Math.min(1, (info.point.x - rect.left) / rect.width));
                setPressure(Math.round(pct * 18));
              }
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onPointerDown={playClick}
          >
            <Sliders size={14} className="text-[#0D0E0D]" />
          </motion.div>
          {/* Tick marks */}
          {[0, 3, 6, 9, 12, 15, 18].map((bar) => (
            <div key={bar} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${(bar / 18) * 100}%` }}>
              <div className="w-px h-1.5 bg-[#6B7280] -mt-4" />
              <span className="text-[8px] text-[#6B7280] mt-1 block -translate-x-1/2">{bar} BAR</span>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-[#9CA3AF]">
          Drag to adjust pressure • {pressure} BAR • Crema density:{' '}
          <span className="text-[#D4A373]">{Math.round(cremaThickness * 100)}%</span>
        </p>
      </div>
    </motion.div>
  );
}

function ModuleB({ playClick }: { playClick: () => void }) {
  const cards = [
    {
      mode: 'Ground Coffee',
      desc: 'Standard 8g basket for freshly ground beans',
      icon: 'coffee',
    },
    {
      mode: 'NS Capsule Adaptor',
      desc: 'Compatible with Nespresso® Original capsules',
      icon: 'boxes',
    },
  ];
  const [index, setIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: 0.35, ...SPRING_SNAPPY }}
      className="max-w-md mx-auto mb-8"
    >
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-[#565E47]" />
          <h3 className="text-sm font-semibold tracking-wide">Nanopresso</h3>
          <span className="text-[10px] text-[#6B7280] ml-auto">Modular System</span>
        </div>

        {/* Card swiper */}
        <div className="relative overflow-hidden rounded-xl mb-3">
          <motion.div
            className="flex"
            animate={{ x: `${-index * 100}%` }}
            transition={SPRING_SNAPPY}
          >
            {cards.map((card, i) => (
              <div key={i} className="w-full flex-shrink-0 bg-[#1A1C1A] rounded-xl p-6 text-center">
                <img
                  src={
                    i === 0
                      ? 'https://cdn.shopify.com/s/files/1/0574/2150/8666/files/WACACO_Nanopresso_Ground_Coffee.png'
                      : 'https://cdn.shopify.com/s/files/1/0574/2150/8666/files/WACACO_Nanopresso_NS_Adaptor.png'
                  }
                  alt={card.mode}
                  className="w-24 h-24 mx-auto object-contain mb-4 opacity-80"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = 'none';
                  }}
                />
                <h4 className="text-sm font-semibold mb-1">{card.mode}</h4>
                <p className="text-xs text-[#9CA3AF]">{card.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => { playClick(); setIndex(Math.max(0, index - 1)); }}
            disabled={index === 0}
            className="p-2 rounded-lg bg-[#2A2C2A] disabled:opacity-30 transition-opacity"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-1.5">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => { playClick(); setIndex(i); }}
                className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-[#565E47]' : 'bg-[#6B7280]'}`}
              />
            ))}
          </div>
          <button
            onClick={() => { playClick(); setIndex(Math.min(cards.length - 1, index + 1)); }}
            disabled={index === cards.length - 1}
            className="p-2 rounded-lg bg-[#2A2C2A] disabled:opacity-30 transition-opacity"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ModuleC({ playClick }: { playClick: () => void }) {
  const grindSettings = [
    { label: 'Turkish', value: 0, desc: 'Extra Fine' },
    { label: 'Espresso', value: 8, desc: 'Fine' },
    { label: 'Aeropress', value: 16, desc: 'Medium-Fine' },
    { label: 'Pour Over', value: 24, desc: 'Medium-Coarse' },
    { label: 'French Press', value: 30, desc: 'Coarse' },
  ];
  const [setting, setSetting] = useState(8);
  const dialRef = useRef<HTMLDivElement>(null);

  const angle = (setting / 30) * 300 - 150; // -150 to +150 degrees

  const currentSetting = grindSettings.reduce((prev, curr) =>
    Math.abs(curr.value - setting) < Math.abs(prev.value - setting) ? curr : prev
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: 0.5, ...SPRING_SNAPPY }}
      className="max-w-md mx-auto mb-8"
    >
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A373" strokeWidth="2" strokeLinecap="round" className="text-[#D4A373]"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
          <h3 className="text-sm font-semibold tracking-wide">Exagrind</h3>
          <span className="text-[10px] text-[#6B7280] ml-auto">CNC Aluminium Burr Grinder</span>
        </div>

        {/* Dial */}
        <div ref={dialRef} className="relative w-40 h-40 mx-auto mb-4">
          <svg viewBox="0 0 160 160" className="w-full h-full">
            {/* Arc track */}
            <path
              d="M 30 140 A 70 70 0 1 1 130 140"
              fill="none"
              stroke="#2F2F2F"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Active arc */}
            <motion.path
              d="M 30 140 A 70 70 0 1 1 130 140"
              fill="none"
              stroke="#565E47"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${(setting / 30) * 220} 220`}
              animate={{ strokeDasharray: `${(setting / 30) * 220} 220` }}
            />
            {/* Knob */}
            <motion.circle
              cx="80"
              cy="80"
              r="28"
              fill="#1A1C1A"
              stroke="#565E47"
              strokeWidth="1.5"
              animate={{ rotate: angle }}
              style={{ transformOrigin: '80px 80px' }}
            />
            {/* Indicator */}
            <motion.line
              x1="80"
              y1="80"
              x2="80"
              y2="52"
              stroke="#D4A373"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ rotate: angle }}
              style={{ transformOrigin: '80px 80px' }}
            />
          </svg>

          {/* Click zones */}
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#2A2C2A] flex items-center justify-center active:bg-[#565E47] transition-colors"
            onClick={() => { playClick(); setSetting(Math.min(30, setting + 1)); }}
          >
            <span className="text-lg font-bold">+</span>
          </button>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#2A2C2A] flex items-center justify-center active:bg-[#565E47] transition-colors"
            onClick={() => { playClick(); setSetting(Math.max(0, setting - 1)); }}
          >
            <span className="text-lg font-bold">−</span>
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold">{currentSetting.label}</p>
          <p className="text-xs text-[#9CA3AF]">{currentSetting.desc} • 30-Step CNC Titanium Burr</p>
        </div>
      </div>
    </motion.div>
  );
}