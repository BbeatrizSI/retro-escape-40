/** Generador pseudoaleatorio determinista por semilla (sin estado global). */
export function prng(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 0.12345) * 43758.5453123;
  return x - Math.floor(x);
}
