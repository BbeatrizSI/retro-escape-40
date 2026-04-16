import { SUDOKU_SIZE } from "../game/constants";

type Props = {
  grid: number[];
  fixedMask: boolean[];
  onCellChange: (index: number, raw: string) => void;
};

export function SudokuBoard({ grid, fixedMask, onCellChange }: Props) {
  return (
    <div className="w-full rounded-lg border border-[#7fff75]/30 bg-black/70 p-1.5 backdrop-blur-sm">
      <div className="aspect-square w-full rounded border border-[#7fff75]/40 bg-[#7fff75]/30 p-px">
        <div className="grid h-full w-full grid-cols-6 grid-rows-6 gap-px">
          {grid.map((cell, idx) => {
            const row = Math.floor(idx / SUDOKU_SIZE);
            const col = idx % SUDOKU_SIZE;
            const thickR = col === 2;
            const thickB = row === 1 || row === 3;
            const fixed = fixedMask[idx];
            return (
              <input
                key={idx}
                inputMode="numeric"
                maxLength={1}
                disabled={fixed}
                value={cell === 0 ? "" : String(cell)}
                onChange={(e) => onCellChange(idx, e.target.value)}
                className={`min-h-0 min-w-0 h-full w-full border-0 p-0 text-center text-[clamp(0.65rem,5.8vmin,1.25rem)] font-bold outline-none ${
                  fixed ? "cursor-default bg-[#7fff75]/15 text-[#7fff75]" : "bg-black/80 text-[#7fff75]"
                } ${thickR ? "border-r border-[#7fff75]/55" : ""} ${thickB ? "border-b border-[#7fff75]/55" : ""}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
