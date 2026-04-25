import type { Challenge } from "../game/types";
import { AnswerFooter } from "./AnswerFooter";
import { ChallengePromptPanel } from "./ChallengePromptPanel";
import { MoodChallengePanel } from "./MoodChallengePanel";
import { ProgressStrip } from "./ProgressStrip";
import { SequenceChallengePanel } from "./SequenceChallengePanel";
import { SudokuBoard } from "./SudokuBoard";

type Props = {
  challenge: Challenge;
  gameStep: number;
  progressPct: number;
  feedback: string;
  feedbackTone: "normal" | "alert";
  input: string;
  onInputChange: (v: string) => void;
  onSubmitMood: (value: string) => void;
  onConfirmMood: () => void;
  selectedMood: string | null;
  onSubmitText: () => void;
  onSubmitSudoku: () => void;
  onSubmitSequence: (value: number) => void;
  isMood: boolean;
  isSudoku: boolean;
  isSequence: boolean;
  sudokuGrid: number[];
  fixedMask: boolean[];
  onSudokuCellChange: (index: number, raw: string) => void;
  sudokuTimerActive: boolean;
  sudokuSecondsLeft: number;
};

export function GamePlayScreen({
  challenge,
  gameStep,
  progressPct,
  feedback,
  feedbackTone,
  input,
  onInputChange,
  onSubmitMood,
  onConfirmMood,
  selectedMood,
  onSubmitText,
  onSubmitSudoku,
  onSubmitSequence,
  isMood,
  isSudoku,
  isSequence,
  sudokuGrid,
  fixedMask,
  onSudokuCellChange,
  sudokuTimerActive,
  sudokuSecondsLeft
}: Props) {
  const timerLabel = isSudoku
    ? `Tiempo: ${sudokuTimerActive ? sudokuSecondsLeft : 60}s max`
    : null;

  return (
    <div className="relative z-20 flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain pb-2">
        <ProgressStrip progressPct={progressPct} />
        <ChallengePromptPanel title={challenge.title} prompt={challenge.prompt} sudokuTimerLabel={timerLabel} />
        {challenge.kind === "text" && challenge.swatchColor ? (
          <div
            className="mt-4 h-24 w-[full] shrink-0 rounded-md border-2 border-[#7fff75]/60 shadow-[0_0_14px_rgba(127,255,117,0.25)]"
            style={{ backgroundColor: challenge.swatchColor }}
            aria-label="Muestra de color del reto"
          />
        ) : null}
        {isMood && challenge.kind === "mood" ? (
          <MoodChallengePanel options={challenge.options} selectedOption={selectedMood} onSelectOption={onSubmitMood} />
        ) : null}
        {isSequence && challenge.kind === "sequence" ? (
          <SequenceChallengePanel
            sequence={challenge.sequence}
            options={challenge.options}
            onSelectOption={onSubmitSequence}
          />
        ) : null}
        {isSudoku ? <SudokuBoard grid={sudokuGrid} fixedMask={fixedMask} onCellChange={onSudokuCellChange} /> : null}
        <p
          className={`min-h-6 whitespace-pre-wrap text-sm ${feedbackTone === "alert" ? "text-red-300" : "text-[#7fff75]/90"}`}
        >
          {feedback}
        </p>
      </div>
      <div className="shrink-0 border-t border-[#7fff75]/25 bg-black/90 pt-2 shadow-[0_-10px_28px_rgba(0,0,0,0.55)] backdrop-blur-md">
        <AnswerFooter
          mode={isSudoku ? "sudoku" : isSequence ? "sequence" : isMood ? "mood" : "text"}
          gameStep={gameStep}
          input={input}
          onInputChange={onInputChange}
          canConfirmMood={selectedMood !== null}
          onConfirmMood={onConfirmMood}
          onSubmitText={onSubmitText}
          onSubmitSudoku={onSubmitSudoku}
        />
      </div>
    </div>
  );
}
