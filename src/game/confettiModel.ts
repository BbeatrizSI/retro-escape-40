import { prng } from "../utils/prng";

export type BurstPiece = {
  id: number;
  txvmin: number;
  tyvmin: number;
  spinDeg: number;
  delay: number;
  duration: number;
  color: string;
  glyph: string;
  fontVmin: number;
};

export type RainPiece = {
  id: number;
  leftPct: number;
  delay: number;
  duration: number;
  dxvmin: number;
  color: string;
  fontVmin: number;
};

const BURST_PALETTE = ["#ff3cac", "#7fff75", "#2fb8ff", "#ffdd57", "#ff6b6b", "#c77dff", "#ffffff"];
const RAIN_PALETTE = ["#ff3cac", "#7fff75", "#2fb8ff", "#ffdd57", "#ff6b6b", "#c77dff"];
const GLYPHS = ["*", "+", ".", "~", ":", "x", "o"];

export function buildConfettiBurst(count: number): BurstPiece[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = prng(i * 7 + 1) * Math.PI * 2;
    const dist = 32 + prng(i * 7 + 2) * 78;
    return {
      id: i,
      txvmin: Math.cos(angle) * dist,
      tyvmin: Math.sin(angle) * dist,
      spinDeg: (prng(i * 7 + 3) - 0.5) * 920,
      delay: prng(i * 7 + 4) * 0.28,
      duration: 0.75 + prng(i * 7 + 5) * 1.05,
      color: BURST_PALETTE[i % BURST_PALETTE.length],
      glyph: GLYPHS[i % GLYPHS.length],
      fontVmin: 2.2 + prng(i * 7 + 6) * 3.8
    };
  });
}

export function buildConfettiRain(count: number): RainPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    leftPct: prng(i * 11 + 1) * 100,
    delay: prng(i * 11 + 2) * 0.45,
    duration: 1.8 + prng(i * 11 + 3) * 2.2,
    dxvmin: (prng(i * 11 + 4) - 0.5) * 55,
    color: RAIN_PALETTE[i % RAIN_PALETTE.length],
    fontVmin: 1.8 + prng(i * 11 + 5) * 2.6
  }));
}
