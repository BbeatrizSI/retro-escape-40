import type { Challenge } from "../game/types";
import { AnswerFooter } from "./AnswerFooter";
import { ChallengePromptPanel } from "./ChallengePromptPanel";
import { ProgressStrip } from "./ProgressStrip";
import { SudokuBoard } from "./SudokuBoard";

type Props = {
  challenge: Challenge;
  gameStep: number;
  progressPct: number;
  feedback: string;
  input: string;
  onInputChange: (v: string) => void;
  onSubmitText: () => void;
  onSubmitSudoku: () => void;
  isSudoku: boolean;
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
  input,
  onInputChange,
  onSubmitText,
  onSubmitSudoku,
  isSudoku,
  sudokuGrid,
  fixedMask,
  onSudokuCellChange,
  sudokuTimerActive,
  sudokuSecondsLeft
}: Props) {
  const timerLabel = isSudoku
    ? `Tiempo: ${sudokuTimerActive ? sudokuSecondsLeft : 60}s max (cuenta al escribir la primera celda editable)`
    : null;

  return (
    <div className="relative z-20 flex flex-1 flex-col">
      <div className="space-y-4 overflow-y-auto pb-3">
        <ProgressStrip progressPct={progressPct} />
        <ChallengePromptPanel title={challenge.title} prompt={challenge.prompt} sudokuTimerLabel={timerLabel} />
        {isSudoku ? <SudokuBoard grid={sudokuGrid} fixedMask={fixedMask} onCellChange={onSudokuCellChange} /> : null}
        <p className="min-h-6 text-sm text-[#7fff75]/90">{feedback}</p>
      </div>
      <AnswerFooter
        mode={isSudoku ? "sudoku" : "text"}
        gameStep={gameStep}
        input={input}
        onInputChange={onInputChange}
        onSubmitText={onSubmitText}
        onSubmitSudoku={onSubmitSudoku}
      />
    </div>
  );
}
