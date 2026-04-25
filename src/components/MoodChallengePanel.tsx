type Props = {
  options: string[];
  selectedOption: string | null;
  onSelectOption: (value: string) => void;
};

const DEFAULT_STYLE = "border-amber-400/70 bg-amber-500/15 text-amber-200 hover:bg-amber-500/25";

const STYLES_BY_MOOD: Record<string, string> = {
  fatal: "border-red-500/70 bg-red-500/20 text-red-200 hover:bg-red-500/30",
  "podría estar mejor": "border-orange-400/70 bg-orange-500/15 text-orange-200 hover:bg-orange-500/25",
  "podria estar mejor": "border-orange-400/70 bg-orange-500/15 text-orange-200 hover:bg-orange-500/25",
  regular: "border-amber-400/70 bg-amber-500/15 text-amber-200 hover:bg-amber-500/25",
  "bastante bien": "border-lime-400/70 bg-lime-500/15 text-lime-200 hover:bg-lime-500/25",
  fenomenal: "border-[#7fff75]/85 bg-[#7fff75]/20 text-[#a7ff9f] hover:bg-[#7fff75]/30"
};

function normalizeMoodLabel(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function MoodChallengePanel({ options, selectedOption, onSelectOption }: Props) {
  return (
    <div className="space-y-2 rounded-lg border border-[#7fff75]/35 bg-black/75 p-3 backdrop-blur-sm">
      {options.map((option) => {
        const normalized = normalizeMoodLabel(option);
        const baseStyle = STYLES_BY_MOOD[normalized] ?? DEFAULT_STYLE;
        const isSelected = selectedOption === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelectOption(option)}
            className={`w-full rounded-lg border px-3 py-2 text-left text-sm font-semibold transition ${baseStyle} ${isSelected ? "ring-2 ring-white/70" : ""}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
