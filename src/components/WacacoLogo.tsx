export default function WacacoLogo({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dimensions = size === 'sm' ? { w: 100, h: 20 } : size === 'md' ? { w: 140, h: 28 } : { w: 180, h: 36 };

  return (
    <svg
      width={dimensions.w}
      height={dimensions.h}
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="WACACO"
    >
      <path d="M10 12h12v16H10z" fill="currentColor" />
      <path d="M28 12l8 16 8-16" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M52 12h3l10 11 10-11h3v16h-3V16L65 28h-2L53 16v12h-3V12z" fill="currentColor" />
      <path d="M85 12h3v16h-3z" fill="currentColor" />
      <path d="M96 12h3l8 16 8-16h3v16h-3V16l-7 12h-2l-7-12v12h-3V12z" fill="currentColor" />
      <path d="M125 12h3v16h-3z" fill="currentColor" />
      <circle cx="138" cy="20" r="8" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="138" cy="20" r="3" fill="currentColor" />
      <text x="155" y="30" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="800" fill="currentColor" letterSpacing="0.15em">WACACO</text>
    </svg>
  );
}