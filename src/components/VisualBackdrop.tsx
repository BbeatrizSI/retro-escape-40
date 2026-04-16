import { CrtAtmosphere } from "./CrtAtmosphere";
import { MatrixRain } from "./MatrixRain";

/** Fondo global: Matrix + CRT. Siempre detras del contenido (z-bajo en main). */
export function VisualBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden bg-black">
      <MatrixRain />
      <CrtAtmosphere />
    </div>
  );
}
