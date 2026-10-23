export default function WacacoLogo({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims = size === 'sm' ? { w: 100, h: 22 } : size === 'md' ? { w: 140, h: 30 } : { w: 180, h: 40 };
  return (
    <img
      src="https://wacaco.ae/cdn/shop/files/wacaco_logo.png"
      alt="WACACO"
      width={dims.w}
      height={dims.h}
      style={{ height: 'auto', objectFit: 'contain' }}
    />
  );
}
