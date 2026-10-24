import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ArrowRight } from 'lucide-react';
import PackagingTermsModal from './PackagingTermsModal';
import { SPRING_CONFIG, SPRING_SNAPPY } from '../constants';
import { useAudio } from '../hooks/useAudio';
interface Props { onStartSurvey: () => void; }

export default function RewardViewer({ onStartSurvey }: Props) {
  const [termsOpen, setTermsOpen] = useState(false);
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
        <button onClick={()=>{playClick();setTermsOpen(true);}} className="w-full flex items-center justify-between glass-card p-4 text-left"><div className="flex items-center gap-3"><Package size={18} className="text-[#d86018]"/><span className="text-sm font-semibold text-[#49493f]">VIEW OUTER BOX TRANSIT STATUS</span></div><ArrowRight size={16} className="text-[#9a9a8f]"/></button>
      </motion.div>

      <AnimatePresence>
        {termsOpen && <PackagingTermsModal isOpen onClose={() => setTermsOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
