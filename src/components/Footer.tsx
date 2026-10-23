import { motion } from 'framer-motion';
import WacacoLogo from './WacacoLogo';

export default function Footer() {
  const links = [
    { label: 'Privacy Policy', href: 'https://www.wacaco.com/pages/privacy-policy' },
    { label: 'Terms of Service', href: 'https://www.wacaco.com/pages/terms-of-service' },
    { label: 'Warranty', href: 'https://www.wacaco.com/pages/warranty' },
    { label: 'Contact', href: 'https://www.wacaco.com/pages/contact' },
  ];

  return (
    <footer className="py-12 px-5 border-t border-white/5">
      <div className="max-w-md mx-auto">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="text-white mb-3">
            <WacacoLogo size="sm" />
          </div>
          <p className="text-[10px] text-[#6B7280] max-w-xs">
            WACACO Australia Research Initiative. All products and trademarks are property of WACACO.
            This is an official research panel operated under WACACO authorisation.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] text-[#6B7280] text-center"
        >
          &copy; {new Date().getFullYear()} WACACO. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}