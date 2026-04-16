/**
 * Efectos CRT en capas reales (no pseudo-elementos) para controlar z-index
 * respecto a Matrix y al contenido.
 */
export function CrtAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5]" aria-hidden>
      <div className="crt-lines-layer" />
      <div className="crt-bloom-sweep" />
      <div className="crt-beam-line" />
    </div>
  );
}
