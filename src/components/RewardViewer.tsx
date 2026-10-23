import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Package, Shield, ArrowRight } from 'lucide-react';
import { PRODUCT_HOTSPOTS, SPRING_CONFIG, SPRING_SNAPPY } from '../constants';
import { useAudio } from '../hooks/useAudio';

interface RewardViewerProps {
  onStartSurvey: () => void;
}

export default function RewardViewer({ onStartSurvey }: RewardViewerProps) {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [showBoxStatus, setShowBoxStatus] = useState(false);
  const { playClick } = useAudio();

  return (
    <section className="relative min-h-screen py-20 px-5">
      {/* Australia message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={SPRING_SNAPPY}
        className="max-w-md mx-auto mb-12"
      >
        <h2 className="text-2xl font-bold mb-3">
          Why <span className="text-gradient-crema">Australia?</span>
        </h2>
        <p className="text-[#9CA3AF] text-sm leading-relaxed">
          Australia defines global espresso standards. From Bondi dawn surfs to off-grid bush tracks, our machines face your most demanding environments.
        </p>
      </motion.div>

      {/* Interactive Product Viewer */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ delay: 0.2, ...SPRING_CONFIG }}
        className="max-w-md mx-auto mb-10"
      >
        <div className="glass-card p-6 relative overflow-hidden">
          <h3 className="text-sm font-semibold text-[#D4A373] mb-1 tracking-wide">
            Minipresso GR2
          </h3>
          <p className="text-xs text-[#6B7280] mb-6">Forest Gray Olive • Your Evaluation Unit</p>

          {/* Product image with hotspots */}
          <div className="relative aspect-square max-w-[280px] mx-auto mb-6">
            <img
              src="https://cdn.shopify.com/s/files/1/0574/2150/8666/files/WACACO_Minipresso_GR2_Gray_Olive_Hero.png"
              alt="WACACO Minipresso GR2 Forest Gray Olive"
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                target.parentElement!.innerHTML = `<svg width="120" height="200" viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="20" width="60" height="160" rx="12" stroke="#565E47" stroke-width="1.5" fill="none"/><rect x="38" y="40" width="44" height="60" rx="6" stroke="#6B7280" stroke-width="1" fill="none"/><circle cx="60" cy="120" r="16" stroke="#6B7280" stroke-width="1" fill="none"/><rect x="42" y="155" width="36" height="15" rx="3" stroke="#6B7280" stroke-width="1" fill="none"/></svg><span class="text-[#6B7280] text-xs mt-2">GR2 Gray Olive</span>`;
              }}
            />

            {/* Hotspots */}
            {PRODUCT_HOTSPOTS.map((hotspot) => (
              <motion.button
                key={hotspot.id}
                className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                onClick={() => {
                  playClick();
                  setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="absolute inset-0 rounded-full bg-[#565E47]/30 animate-ping" />
                <Plus size={20} className="relative z-10 text-[#D4A373] m-1" />
              </motion.button>
            ))}
          </div>

          {/* Hotspot detail */}
          <AnimatePresence>
            {activeHotspot && (() => {
              const h = PRODUCT_HOTSPOTS.find((hp) => hp.id === activeHotspot)!;
              return (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#1A1C1A] rounded-xl p-4 border border-[#565E47]/30"
                >
                  <h4 className="text-sm font-semibold text-[#F3F4F6] mb-1">{h.title}</h4>
                  <p className="text-xs text-[#9CA3AF]">{h.description}</p>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Box Status Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ delay: 0.4 }}
        className="max-w-md mx-auto mb-8"
      >
        <button
          onClick={() => { playClick(); setShowBoxStatus(!showBoxStatus); }}
          className="w-full flex items-center justify-between glass-card p-4 text-left"
        >
          <div className="flex items-center gap-3">
            <Package size={18} className="text-[#565E47]" />
            <span className="text-sm font-medium text-[#F3F4F6]">VIEW OUTER BOX TRANSIT STATUS</span>
          </div>
          <motion.span animate={{ rotate: showBoxStatus ? 180 : 0 }}>
            <ArrowRight size={16} className="text-[#6B7280]" />
          </motion.span>
        </button>

        <AnimatePresence>
          {showBoxStatus && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="glass-card p-5 mt-3">
                <div className="flex gap-4 mb-4">
                  <div className="flex-1 bg-[#1A1C1A] rounded-xl p-3 border border-[#2F2F2F]">
                    <p className="text-[10px] text-[#6B7280] uppercase tracking-wide mb-1">Outer Carton</p>
                    <div className="h-16 bg-[#2A2C2A] rounded-lg flex items-center justify-center">
                      <span className="text-xs text-[#C85A32]">Minor corner creasing</span>
                    </div>
                  </div>
                  <div className="flex-1 bg-[#1A1C1A] rounded-xl p-3 border border-[#565E47]/30">
                    <p className="text-[10px] text-[#6B7280] uppercase tracking-wide mb-1">Machine Inside</p>
                    <div className="h-16 bg-[#2A2C2A] rounded-lg flex items-center justify-center">
                      <span className="text-xs text-[#4ade80]">100% Factory Mint</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  <strong className="text-[#F3F4F6]">Zero Waste Commitment:</strong> During international container transit to Port Botany, outer recycled cartons sustained minor superficial creasing. While unsuitable for retail department shelves, internal machines are 100% brand new, pressure-tested, and covered by our full warranty. Rather than landfilling, we allocate them to qualified research panelists.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="max-w-md mx-auto text-center"
      >
        <button
          onClick={() => { playClick(); onStartSurvey(); }}
          className="w-full py-4 bg-[#565E47] text-white font-bold text-sm rounded-2xl shadow-lg pulse-ring hover:bg-[#4A523D] transition-colors active:scale-95 tracking-wide mb-2"
        >
          START 2-MINUTE EVALUATION →
        </button>
        <p className="text-[10px] text-[#6B7280] tracking-wide">
          10 Questions • Instant Approval • AU$9.85 Australia Post Dispatch
        </p>
      </motion.div>
    </section>
  );
}