type Props = {
  title: string;
  prompt: string;
  sudokuTimerLabel?: string | null;
};

export function ChallengePromptPanel({ title, prompt, sudokuTimerLabel }: Props) {
  return (
    <div className="rounded-xl border border-[#7fff75]/35 bg-black/75 p-3 backdrop-blur-sm">
      <h2 className="text-base font-bold text-[#7fff75]">{title}</h2>
      <p className="mt-2 leading-relaxed">{prompt}</p>
      {sudokuTimerLabel ? <p className="mt-2 font-mono text-sm text-[#7fff75]/90">{sudokuTimerLabel}</p> : null}
    </div>
  );
}
