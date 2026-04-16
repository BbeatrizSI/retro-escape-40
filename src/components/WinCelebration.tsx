import { useMemo } from "react";
import { createPortal } from "react-dom";
import { buildConfettiBurst, buildConfettiRain } from "../game/confettiModel";

type Props = {
  active: boolean;
};

/**
 * Capa de victoria: confeti a pantalla completa vía portal (por encima de todo)
 * + tarjeta de mensaje. Evita recortes por overflow del layout principal.
 */
export function WinCelebration({ active }: Props) {
  const burst = useMemo(() => (active ? buildConfettiBurst(150) : []), [active]);
  const rain = useMemo(() => (active ? buildConfettiRain(70) : []), [active]);

  if (!active || typeof document === "undefined") return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 2147483000 }}>
      <div className="pointer-events-none absolute inset-0">
        {burst.map((p) => (
          <span
            key={`b-${p.id}`}
            className="absolute font-bold will-change-transform"
            style={{
              left: "50vw",
              top: "42vh",
              color: p.color,
              fontSize: `${p.fontVmin}vmin`,
              textShadow: "0 0 8px rgba(0,0,0,0.9)",
              ["--tx" as string]: `${p.txvmin}vmin`,
              ["--ty" as string]: `${p.tyvmin}vmin`,
              ["--spin" as string]: `${p.spinDeg}deg`,
              animation: `confetti-burst ${p.duration}s cubic-bezier(0.08, 0.75, 0.22, 1) ${p.delay}s forwards`
            }}
          >
            {p.glyph}
          </span>
        ))}
        {rain.map((p) => (
          <span
            key={`r-${p.id}`}
            className="absolute top-[-6vh] font-bold will-change-transform"
            style={{
              left: `${p.leftPct}%`,
              color: p.color,
              fontSize: `${p.fontVmin}vmin`,
              textShadow: "0 0 6px rgba(0,0,0,0.85)",
              ["--dx" as string]: `${p.dxvmin}vmin`,
              ["--dy" as string]: "125vh",
              animation: `confetti-drift ${p.duration}s linear ${p.delay}s infinite`
            }}
          >
            +
          </span>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
        <div className="pointer-events-auto relative max-w-lg rounded-xl border border-[#7fff75]/55 bg-black/80 p-6 text-center shadow-[0_0_28px_rgba(127,255,117,0.35)] backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.18em] text-[#7fff75]/80">Sistema desbloqueado</p>
          <h2 className="mt-2 text-3xl font-black text-[#7fff75]">FELIZ CUMPLE 40</h2>
          <p className="mt-3 leading-relaxed text-[#7fff75]">
            Premio final detectado:
            <br />
            <span className="font-bold">Un MacBook Air te espera en el mundo real.</span>
          </p>
          <p className="mt-2 text-sm text-[#7fff75]/75">
            Mision completada por la reina de la familia, planos perfectos y economia con estilo.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
