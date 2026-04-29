import { useMemo, useState } from "react";
import type { WordSearchWord } from "../game/types";

type Props = {
  rows: string[];
  words: WordSearchWord[];
  foundIds: Set<string>;
  onSelectEndpoints: (a: { r: number; c: number }, b: { r: number; c: number }) => void;
};

function cellKey(r: number, c: number) {
  return `${r},${c}`;
}

export function WordSearchPanel({ rows, words, foundIds, onSelectEndpoints }: Props) {
  const [pending, setPending] = useState<{ r: number; c: number } | null>(null);

  const highlighted = useMemo(() => {
    const set = new Set<string>();
    for (const w of words) {
      if (!foundIds.has(w.id)) continue;
      const dr = Math.sign(w.r1 - w.r0);
      const dc = Math.sign(w.c1 - w.c0);
      let r = w.r0;
      let c = w.c0;
      for (let i = 0; i < 40; i++) {
        set.add(cellKey(r, c));
        if (r === w.r1 && c === w.c1) break;
        r += dr;
        c += dc;
      }
    }
    return set;
  }, [words, foundIds]);

  const cols = rows[0]?.length ?? 0;

  const handleCell = (r: number, c: number) => {
    if (!pending) {
      setPending({ r, c });
      return;
    }
    if (pending.r === r && pending.c === c) {
      setPending(null);
      return;
    }
    onSelectEndpoints(pending, { r, c });
    setPending(null);
  };

  return (
    <div className="space-y-3">
      <div
        className="grid w-full max-w-full gap-px rounded-lg border border-[#7fff75]/40 bg-[#7fff75]/30 p-px"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {rows.flatMap((row, r) =>
          row.split("").map((ch, c) => {
            const k = cellKey(r, c);
            const isFound = highlighted.has(k);
            const isPending = pending?.r === r && pending?.c === c;
            return (
              <button
                key={k}
                type="button"
                onClick={() => handleCell(r, c)}
                className={`flex aspect-square min-h-0 min-w-0 items-center justify-center border-0 p-0 font-mono text-[clamp(0.65rem,3.2vmin,0.95rem)] font-bold transition ${
                  isFound
                    ? "bg-[#7fff75]/35 text-[#0a140a]"
                    : isPending
                      ? "bg-amber-400/40 text-[#0a140a] ring-2 ring-amber-300/90"
                      : "bg-black/85 text-[#7fff75] active:bg-[#7fff75]/15"
                }`}
              >
                {ch}
              </button>
            );
          })
        )}
      </div>
      <ul className="flex flex-wrap gap-2 text-xs font-mono text-[#7fff75]/90">
        {words.map((w) => (
          <li
            key={w.id}
            className={`rounded border px-2 py-1 ${
              foundIds.has(w.id) ? "border-[#7fff75]/50 bg-[#7fff75]/15 line-through opacity-70" : "border-[#7fff75]/35"
            }`}
          >
            {w.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
