import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Package, Truck, Shield } from 'lucide-react';
import { DISPATCH_FEE, SPRING_SNAPPY } from '../constants';
import { useAudio } from '../hooks/useAudio';

interface Props { isOpen: boolean; onClose: () => void; }

export default function PackagingTermsModal({ isOpen, onClose }: Props) {
  const { playClick } = useAudio();

  const handleClose = useCallback(() => { playClick(); onClose(); }, [playClick, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 sm:px-6"
    >
      {/* Frosted backdrop */}
      <div className="absolute inset-0 bg-[#0D0E0D]/40 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal panel */}
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={SPRING_SNAPPY}
        className="relative w-full max-w-md max-h-[85dvh] overflow-y-auto bg-[#edede8] rounded-t-2xl sm:rounded-2xl shadow-2xl touch-scroll"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-[#edede8]/95 backdrop-blur-sm border-b border-[#d5d5cc]">
          <h2 className="text-base font-bold text-[#49493f]">Packaging Condition & Allocation Terms</h2>
          <button onClick={handleClose} className="w-8 h-8 rounded-full bg-white border border-[#d5d5cc] flex items-center justify-center hover:bg-[#f5f3ee] transition-colors">
            <X size={14} className="text-[#49493f]" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 space-y-6">
          {/* Section 1 */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#166534]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Shield size={16} className="text-[#166534]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#49493f] mb-1.5">Hardware Integrity (100% Brand New)</h3>
              <p className="text-[12px] sm:text-[13px] text-[#6b6b5f] leading-relaxed">
                Every Minipresso GR2 evaluation unit allocated for this research panel is 100% brand new, unused, and factory sealed. Extraction mechanisms, pressure chambers, and food-grade silicone seals are completely pristine and fully backed by standard 1-Year WACACO Manufacturer Warranty.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#d86018]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Package size={16} className="text-[#d86018]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#49493f] mb-1.5">Reason for Allocation (Carton Transit Blemish)</h3>
              <p className="text-[12px] sm:text-[13px] text-[#6b6b5f] leading-relaxed">
                During international container freight and Australian port handling, retail packaging sustained minor exterior carton creases or scuffs. While unsuited for full-price retail display shelves (RRP AU$79.90), the internal hardware is in flawless condition. WACACO Australia has allocated these verified units directly to independent consumer coffee studies.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#565E47]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Truck size={16} className="text-[#565E47]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#49493f] mb-1.5">Dispatch & Subsidised Fee</h3>
              <p className="text-[12px] sm:text-[13px] text-[#6b6b5f] leading-relaxed">
                The evaluation unit itself is fully funded by the research initiative (AU$0.00). Verified respondents only contribute an AU${DISPATCH_FEE.toFixed(2)} subsidized fee for Australia Post Standard Tracked Dispatch with transit cover.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 px-5 py-4 bg-[#edede8]/95 backdrop-blur-sm border-t border-[#d5d5cc]">
          <button
            onClick={handleClose}
            className="w-full py-3.5 rounded-2xl font-bold text-sm tracking-wide bg-[#49493f] text-white hover:bg-[#3a3a33] transition-colors active:scale-[0.98]"
          >
            Understood & Return
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}