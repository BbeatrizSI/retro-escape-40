type Props = {
  progressPct: number;
};

export function ProgressStrip({ progressPct }: Props) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-[#7fff75]/80">Progreso {Math.round(progressPct)}%</p>
      <div className="mt-2 h-2 rounded bg-[#7fff75]/20">
        <div className="h-2 rounded bg-[#7fff75] transition-all" style={{ width: `${progressPct}%` }} />
      </div>
    </div>
  );
}
