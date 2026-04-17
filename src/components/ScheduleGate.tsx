import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Challenge } from "../game/types";
import { formatUnlockClock, getStepUnlockDate, isStepUnlocked, msUntilStepUnlock } from "../game/schedule";

type Props = {
  step: number;
  challenge: Challenge;
  children: ReactNode;
};

function formatCountdown(ms: number): string {
  if (ms <= 0) return "0:00";
  const total = Math.ceil(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function ScheduleGate({ step, challenge, children }: Props) {
  const [now, setNow] = useState(() => new Date());

  const locked = !isStepUnlocked(step, now);
  const unlockAt = useMemo(() => getStepUnlockDate(step, now), [step, now]);

  useEffect(() => {
    if (!locked) return;
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, [locked]);

  useEffect(() => {
    if (!locked) return;
    const ms = msUntilStepUnlock(step, now);
    if (ms > 60000) return;
    const id = window.setTimeout(() => setNow(new Date()), ms + 250);
    return () => window.clearTimeout(id);
  }, [locked, step, now]);

  if (!locked) return <>{children}</>;

  const clock = formatUnlockClock(step);
  const countdown = formatCountdown(msUntilStepUnlock(step, now));

  return (
    <div className="relative z-20 flex flex-1 flex-col justify-center space-y-4">
      <div className="rounded-lg border border-amber-400/60 bg-black/80 p-4 backdrop-blur-sm">
        <p className="text-xs uppercase tracking-widest text-amber-300/90">Reto programado</p>
        <h2 className="mt-2 font-mono text-lg font-bold text-[#7fff75]">{challenge.title}</h2>
        <p className="mt-3 leading-relaxed text-[#7fff75]/90">
          Este reto se abre a las <span className="font-mono font-bold text-[#7fff75]">{clock}</span> (hora de tu móvil).
          Falta <span className="font-mono font-bold text-amber-300">{countdown}</span>.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-[#7fff75]/65">
          El final solo está disponible desde las {formatUnlockClock(4)}: hasta entonces puedes avanzar en los
          retos anteriores cuando toque cada hora.
        </p>
      </div>
    </div>
  );
}
