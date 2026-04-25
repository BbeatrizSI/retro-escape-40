type Props = {
  sequence: number[];
  options: number[];
  onSelectOption: (value: number) => void;
};

export function SequenceChallengePanel({ sequence, options, onSelectOption }: Props) {
  return (
    <div className="space-y-3 rounded-lg border border-[#7fff75]/35 bg-black/75 p-3 backdrop-blur-sm">
      <p className="font-mono text-lg tracking-wide text-[#7fff75]">
        {sequence.join(", ")}, <span className="text-amber-300">?</span>
      </p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onSelectOption(value)}
            className="rounded-lg border border-[#7fff75]/45 bg-[#7fff75]/10 px-3 py-2 font-mono text-base font-bold text-[#7fff75] transition hover:bg-[#7fff75]/20"
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
