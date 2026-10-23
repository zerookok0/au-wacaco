import { useCallback, useRef } from 'react';

export function useAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const getCtx = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return ctxRef.current;
  }, []);

  const resume = useCallback(() => { try { const c = getCtx(); if (c.state === 'suspended') c.resume(); } catch {} }, [getCtx]);

  const playClick = useCallback(() => {
    try {
      const c = getCtx(); if (c.state === 'suspended') c.resume();
      const o = c.createOscillator(), g = c.createGain(), t = c.currentTime;
      o.type = 'triangle'; o.frequency.setValueAtTime(120, t);
      g.gain.setValueAtTime(0.09, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
      o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + 0.045);
    } catch {}
  }, [getCtx]);

  const playSuccess = useCallback(() => {
    try {
      const c = getCtx(); if (c.state === 'suspended') c.resume(); const t = c.currentTime;
      [261.63, 329.63, 392.0, 493.88].forEach((f, i) => {
        const o = c.createOscillator(), g = c.createGain(), s = t + i * 0.06;
        o.type = 'sine'; o.frequency.setValueAtTime(f, s);
        g.gain.setValueAtTime(0, s); g.gain.linearRampToValueAtTime(0.07, s + 0.03); g.gain.exponentialRampToValueAtTime(0.001, s + 1.2);
        o.connect(g); g.connect(c.destination); o.start(s); o.stop(s + 1.2);
      });
    } catch {}
  }, [getCtx]);

  return { playClick, playSuccess, resume };
}
