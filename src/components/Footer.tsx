import WacacoLogo from './WacacoLogo';

export default function Footer() {
  return (
    <footer className="py-12 px-5 border-t border-[#d5d5cc]">
      <div className="max-w-md mx-auto text-center">
        <div className="inline-block text-[#49493f] mb-3"><WacacoLogo size="sm" /></div>
        <p className="text-[10px] text-[#9a9a8f] max-w-xs mx-auto mb-4">WACACO Australia Research Initiative. All products and trademarks are property of WACACO. This is an official research panel operated under WACACO authorisation.</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
          {['Privacy Policy','Terms of Service','Warranty','Contact'].map(l=><a key={l} href="https://www.wacaco.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#6b6b5f] hover:text-[#d86018] transition-colors tracking-wide">{l}</a>)}
        </div>
        <p className="text-[10px] text-[#9a9a8f]">&copy; {new Date().getFullYear()} WACACO. All rights reserved.</p>
      </div>
    </footer>
  );
}
