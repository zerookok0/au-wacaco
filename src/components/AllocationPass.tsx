import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Package, Truck, Leaf, ArrowRight, ExternalLink } from 'lucide-react';
import { DISPATCH_FEE, PRODUCT_VALUE, CHECKOUT_URL, SPRING_SNAPPY } from '../constants';
import { useAudio } from '../hooks/useAudio';

export default function AllocationPass() {
  const [timeLeft, setTimeLeft] = useState(599); // 9:59 in seconds
  const { playClick, playSuccess } = useAudio();

  useEffect(() => {
    playSuccess();
  }, [playSuccess]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleCheckout = useCallback(() => {
    playClick();
    window.location.href = CHECKOUT_URL;
  }, [playClick]);

  return (
    <div className="px-5 py-8 flex flex-col min-h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING_SNAPPY}
        className="text-center mb-8"
      >
        <motion.div
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-surface mb-4"
        >
          <Shield size={12} className="text-[#4ade80]" />
          <span className="text-[10px] font-semibold tracking-[0.15em] text-[#4ade80] uppercase">
            Official Evaluation Pass: Verified & Issued
          </span>
        </motion.div>

        <h2 className="text-2xl font-bold mb-2">Your Allocation is Reserved</h2>

        {/* Countdown */}
        <div className="inline-flex items-center gap-2 glass-card px-5 py-2.5">
          <Clock size={14} className="text-[#C85A32]" />
          <span className="text-sm font-bold text-gradient-crema tracking-wider">
            ALLOCATION HELD FOR {timeStr}
          </span>
        </div>
      </motion.div>

      {/* Boarding Pass Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, ...SPRING_SNAPPY }}
        className="glass-card overflow-hidden mb-8"
      >
        {/* Top section */}
        <div className="p-5 pb-4">
          <div className="flex items-start gap-4 mb-4">
            {/* Product image */}
            <div className="w-24 h-24 bg-[#1A1C1A] rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/5">
              <img
                src="https://cdn.shopify.com/s/files/1/0574/2150/8666/files/WACACO_Minipresso_GR2_Gray_Olive_Hero.png"
                alt="Minipresso GR2 Gray Olive"
                className="w-20 h-20 object-contain"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = 'none';
                  t.parentElement!.innerHTML = `<svg width="60" height="80" viewBox="0 0 60 80" fill="none"><rect x="12" y="8" width="36" height="64" rx="8" stroke="#565E47" stroke-width="1.5" fill="none"/><circle cx="30" cy="40" r="10" stroke="#6B7280" stroke-width="1" fill="none"/></svg>`;
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold leading-tight">
                WACACO Minipresso GR2
              </h3>
              <p className="text-xs text-[#9CA3AF] mt-0.5">Forest Gray Olive</p>
              <div className="mt-2 flex items-center gap-1.5">
                <Package size={12} className="text-[#565E47]" />
                <span className="text-[10px] text-[#6B7280]">
                  Transit-Blemish Outer Eco-Box
                </span>
              </div>
              <p className="text-[10px] text-[#4ade80] mt-0.5">
                Machine 100% Mint Factory Certified
              </p>
            </div>
          </div>

          {/* Value */}
          <div className="flex items-center justify-between py-3 border-t border-white/5">
            <span className="text-xs text-[#9CA3AF]">Machine Value</span>
            <div className="text-right">
              <span className="text-xs text-[#6B7280] line-through mr-2">AU${PRODUCT_VALUE.toFixed(2)}</span>
              <span className="text-sm font-bold text-[#4ade80]">AU$0.00</span>
            </div>
          </div>
          <p className="text-[10px] text-[#6B7280] text-right">100% Research Sponsored</p>
        </div>

        {/* Perforation line */}
        <div className="border-dashed-perf h-px mx-0 opacity-20" />

        {/* Dispatch costs */}
        <div className="p-5 pt-4 space-y-3">
          <h4 className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-[0.15em] mb-2">
            Dispatch &amp; Handling
          </h4>

          <div className="flex items-start gap-3">
            <Truck size={14} className="text-[#D4A373] mt-0.5 flex-shrink-0" />
            <div className="flex-1 flex justify-between">
              <span className="text-xs text-[#F3F4F6]">Australia Post Express Registered Dispatch</span>
              <span className="text-xs font-semibold text-[#F3F4F6]">AU${DISPATCH_FEE.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield size={14} className="text-[#565E47] mt-0.5 flex-shrink-0" />
            <div className="flex-1 flex justify-between">
              <span className="text-xs text-[#9CA3AF]">Signature on Delivery &amp; Transit Loss Cover</span>
              <span className="text-xs text-[#4ade80] font-medium">INCLUDED</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Leaf size={14} className="text-[#565E47] mt-0.5 flex-shrink-0" />
            <div className="flex-1 flex justify-between">
              <span className="text-xs text-[#9CA3AF]">Eco-Packaging Carbon Offset</span>
              <span className="text-xs text-[#4ade80] font-medium">INCLUDED</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-3 border-t border-white/5">
            <span className="text-sm font-bold">Total Due</span>
            <span className="text-xl font-extrabold text-gradient-crema">AU${DISPATCH_FEE.toFixed(2)}</span>
          </div>
        </div>
      </motion.div>

      {/* ACL protection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-4 mb-8"
      >
        <div className="flex items-start gap-3">
          <Shield size={16} className="text-[#D4A373] mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-semibold mb-1">30-Day Transit Protection</h4>
            <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
              In accordance with Australian Consumer Law (ACL), if your package is damaged or lost during Australia Post transit, your AU${DISPATCH_FEE.toFixed(2)} fee is 100% refundable upon request or immediately re-dispatched.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Checkout Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-auto"
      >
        <button
          onClick={handleCheckout}
          className="w-full py-4 bg-[#C85A32] text-white font-bold text-sm rounded-2xl shadow-lg glow-terracotta hover:bg-[#B04E28] transition-colors active:scale-95 tracking-wide flex items-center justify-center gap-2"
        >
          Pay AU${DISPATCH_FEE.toFixed(2)} & Secure Your Allocation
          <ExternalLink size={16} />
        </button>
        <p className="text-[10px] text-[#6B7280] text-center mt-3">
          You will be redirected to our secure checkout page
        </p>
      </motion.div>
    </div>
  );
}