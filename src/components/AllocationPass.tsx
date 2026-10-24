import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Package, Truck, Leaf, ExternalLink } from 'lucide-react';
import { DISPATCH_FEE, PRODUCT_VALUE, CHECKOUT_URL, SPRING_SNAPPY } from '../constants';
import { useAudio } from '../hooks/useAudio';

export default function AllocationPass() {
  const [timeLeft, setTimeLeft] = useState(599);
  const { playClick, playSuccess } = useAudio();
  useEffect(() => { playSuccess(); }, [playSuccess]);
  useEffect(() => { if (timeLeft <= 0) return; const i = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000); return () => clearInterval(i); }, [timeLeft]);

  const min = Math.floor(timeLeft / 60), sec = timeLeft % 60;
  const timeStr = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  const checkout = useCallback(() => { playClick(); window.location.href = CHECKOUT_URL; }, [playClick]);

  return (
    <div className="px-5 py-8 flex flex-col min-h-dvh">
      <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={SPRING_SNAPPY} className="text-center mb-8">
        <motion.div animate={{opacity:[1,.7,1]}} transition={{duration:2,repeat:Infinity}} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-surface mb-4">
          <Shield size={12} className="text-[#166534]"/><span className="text-[10px] font-semibold tracking-[0.15em] text-[#166534] uppercase">Official Evaluation Pass: Verified & Issued</span>
        </motion.div>
        <h2 className="text-2xl font-bold mb-2 text-[#49493f]">Your Allocation is Reserved</h2>
        <div className="inline-flex items-center gap-2 glass-card px-5 py-2.5">
          <Clock size={14} className="text-[#d86018]"/><span className="text-sm font-bold font-mono-tabular text-[#d86018]">ALLOCATION HELD FOR {timeStr}</span>
        </div>
      </motion.div>

      <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:.3,...SPRING_SNAPPY}} className="glass-card overflow-hidden mb-8">
        <div className="p-5 pb-4">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-24 h-24 bg-[#f5f3ee] rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-[#d5d5cc]">
              <img src="https://kmarket.cyou/wp-content/uploads/2026/10/Wacaco_Minipresso_GR2_012_PNG_LD.webp" alt="WACACO Minipresso GR2 Forest Gray Olive" className="w-22 h-22 object-contain rounded-xl" loading="eager" onError={(e)=>{(e.target as HTMLImageElement).style.display='none';}}/>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold leading-tight text-[#49493f]">WACACO Minipresso GR2</h3>
              <p className="text-xs text-[#9a9a8f] mt-0.5">Forest Gray Olive</p>
              <div className="mt-2 flex items-center gap-1.5"><Package size={12} className="text-[#d86018]"/><span className="text-[10px] text-[#6b6b5f]">Transit-Blemish Outer Eco-Box</span></div>
              <p className="text-[10px] text-[#166534] mt-0.5 font-semibold">Machine 100% Mint Factory Certified</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-t border-[#d5d5cc]"><span className="text-xs text-[#6b6b5f]">Machine Value</span><div className="text-right"><span className="text-xs text-[#9a9a8f] line-through mr-2">AU${PRODUCT_VALUE.toFixed(2)}</span><span className="text-sm font-bold text-[#166534]">AU$0.00</span></div></div>
          <div className="flex items-center justify-between py-0.5"><span className="text-[10px] text-[#9a9a8f]">Research Grant</span><span className="text-[10px] font-semibold text-[#166534]">−AU${PRODUCT_VALUE.toFixed(2)} (100% Grant)</span></div>
        </div>
        <div className="border-dashed-perf h-px mx-0 opacity-20"/>
        <div className="p-5 pt-4 space-y-3">
          <h4 className="text-[10px] font-semibold text-[#9a9a8f] uppercase tracking-[0.15em] mb-2">Dispatch &amp; Handling</h4>
          <div className="flex items-start gap-3"><Truck size={14} className="text-[#d86018] mt-0.5 flex-shrink-0"/><div className="flex-1 flex justify-between"><span className="text-xs text-[#49493f]">Australia Post Standard Tracked Dispatch</span><span className="text-xs font-semibold text-[#49493f]">AU${DISPATCH_FEE.toFixed(2)}</span></div></div>
          <div className="flex items-start gap-3"><Shield size={14} className="text-[#565E47] mt-0.5 flex-shrink-0"/><div className="flex-1 flex justify-between"><span className="text-xs text-[#6b6b5f]">Signature on Delivery &amp; Transit Loss Cover</span><span className="text-xs text-[#166534] font-medium">INCLUDED</span></div></div>
          <div className="flex items-start gap-3"><Leaf size={14} className="text-[#565E47] mt-0.5 flex-shrink-0"/><div className="flex-1 flex justify-between"><span className="text-xs text-[#6b6b5f]">Eco-Packaging Carbon Offset</span><span className="text-xs text-[#166534] font-medium">INCLUDED</span></div></div>
          <div className="flex justify-between items-center pt-3 border-t border-[#d5d5cc]"><span className="text-sm font-bold text-[#49493f]">Total Due</span><span className="text-xl font-extrabold text-[#d86018]">AU${DISPATCH_FEE.toFixed(2)}</span></div>
          <p className="text-[9px] text-[#9a9a8f] text-center mt-2 leading-relaxed">All transactions are billed strictly in Australian Dollars (AUD). No international conversion markups or hidden fees.</p>
        </div>
      </motion.div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.5}} className="glass-card p-4 mb-8">
        <div className="flex items-start gap-3"><Shield size={16} className="text-[#d86018] mt-0.5 flex-shrink-0"/><div><h4 className="text-xs font-semibold text-[#49493f] mb-1">30-Day Transit Protection</h4><p className="text-[11px] text-[#6b6b5f] leading-relaxed">In accordance with Australian Consumer Law (ACL), if your package is damaged or lost during Australia Post transit, your AU${DISPATCH_FEE.toFixed(2)} fee is 100% refundable upon request or immediately re-dispatched.</p></div></div>
      </motion.div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.7}} className="mt-auto mb-4">
        <button onClick={checkout} className="w-full py-4 bg-[#d86018] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#d86018]/25 hover:bg-[#c25214] transition-colors active:scale-95 tracking-wide flex items-center justify-center gap-2">Pay AU${DISPATCH_FEE.toFixed(2)} & Secure Your Allocation <ExternalLink size={16}/></button>
        <p className="text-[10px] text-[#9a9a8f] text-center mt-3">You will be redirected to our secure checkout page</p>
      </motion.div>
    </div>
  );
}
