import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ArrowRight } from 'lucide-react';
import { SPRING_CONFIG, SPRING_SNAPPY } from '../constants';
import { useAudio } from '../hooks/useAudio';
interface Props { onStartSurvey: () => void; }

export default function RewardViewer({ onStartSurvey }: Props) {
  const [showBox, setShowBox] = useState(false);
  const { playClick } = useAudio();

  return (
    <section className="relative min-h-dvh py-20 px-5 touch-scroll bg-[#edede8]">
      {/* Australia message */}
      <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-100px'}} transition={SPRING_SNAPPY} className="max-w-md mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-3 text-[#49493f]">Why <span className="text-gradient-primary">Australia?</span></h2>
        <p className="text-[#6b6b5f] text-sm leading-relaxed">Australia defines global espresso standards. From Bondi dawn surfs to off-grid bush tracks, our machines face your most demanding environments.</p>
      </motion.div>

      {/* Interactive Product Viewer — card uses Amazon image as background */}
      <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-100px'}} transition={{delay:.2,...SPRING_CONFIG}} className="max-w-md mx-auto mb-10">
        <div className="relative rounded-[20px] overflow-hidden border border-[#d5d5cc] shadow-lg">
          {/* Background image */}
          <img
            src="https://wacaco.ae/cdn/shop/files/61vfbn9Fo6L._AC_SL1500.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Content */}
          <div className="relative z-10 p-6">
            <h3 className="text-sm font-semibold text-[#d86018] mb-1 tracking-wide">Minipresso GR2</h3>
            <p className="text-xs text-[#9a9a8f] mb-6">Forest Gray Olive • Your Evaluation Unit</p>
            <div className="relative aspect-square max-w-[280px] mx-auto mb-6">
              <img src="https://cdn.shopify.com/s/files/1/0574/2150/8666/files/WACACO_Minipresso_GR2_Gray_Olive_Hero.png" alt="Minipresso GR2" className="w-full h-full object-contain relative z-10" onError={(e)=>{(e.target as HTMLImageElement).style.display='none';}} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Box Status Toggle */}
      <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-100px'}} transition={{delay:.4}} className="max-w-md mx-auto mb-8">
        <button onClick={()=>{playClick();setShowBox(!showBox);}} className="w-full flex items-center justify-between glass-card p-4 text-left"><div className="flex items-center gap-3"><Package size={18} className="text-[#d86018]"/><span className="text-sm font-semibold text-[#49493f]">VIEW OUTER BOX TRANSIT STATUS</span></div><motion.span animate={{rotate:showBox?180:0}}><ArrowRight size={16} className="text-[#9a9a8f]"/></motion.span></button>
        <AnimatePresence>{showBox&&(<motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} className="overflow-hidden"><div className="glass-card p-5 mt-3"><div className="flex gap-4 mb-4"><div className="flex-1 bg-[#f5f3ee] rounded-xl p-3 border border-[#d5d5cc]"><p className="text-[10px] text-[#9a9a8f] uppercase tracking-wide mb-1">Outer Carton</p><div className="h-16 bg-white rounded-lg flex items-center justify-center border border-[#e8e8e0]"><span className="text-xs text-[#C85A32] font-semibold">Minor corner creasing</span></div></div><div className="flex-1 bg-[#f5f3ee] rounded-xl p-3 border border-[#d86018]/20"><p className="text-[10px] text-[#9a9a8f] uppercase tracking-wide mb-1">Machine Inside</p><div className="h-16 bg-white rounded-lg flex items-center justify-center border border-[#e8e8e0]"><span className="text-xs text-[#166534] font-semibold">100% Factory Mint</span></div></div></div><p className="text-xs text-[#6b6b5f] leading-relaxed"><strong className="text-[#49493f]">Zero Waste Commitment:</strong> During international container transit to Port Botany, outer recycled cartons sustained minor superficial creasing. While unsuitable for retail department shelves, internal machines are 100% brand new, pressure-tested, and covered by our full warranty. Rather than landfilling, we allocate them to qualified research panelists.</p></div></motion.div>)}</AnimatePresence>
      </motion.div>

      {/* CTA */}
      <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.6}} className="max-w-md mx-auto text-center">
        <button onClick={()=>{playClick();onStartSurvey();}} className="w-full py-4 btn-primary font-bold text-sm rounded-2xl pulse-ring active:scale-[0.98] tracking-wide mb-2">START 2-MINUTE EVALUATION →</button>
        <p className="text-[10px] text-[#9a9a8f] tracking-wide">10 Questions • Instant Approval • AU$9.85 Australia Post Dispatch</p>
      </motion.div>
    </section>
  );
}
