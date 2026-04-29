import { useEscapeRoomGame } from "../hooks/useEscapeRoomGame";
import { AppHeader } from "./AppHeader";
import { BootSequencePanel } from "./BootSequencePanel";
import { GamePlayScreen } from "./GamePlayScreen";
import { GameShell } from "./GameShell";
import { VisualBackdrop } from "./VisualBackdrop";
import { ScheduleGate } from "./ScheduleGate";
import { PillowMessageModal } from "./PillowMessageModal";
import { WelcomePanel } from "./WelcomePanel";
import { WinCelebration } from "./WinCelebration";

export function EscapeRoomApp() {
  const game = useEscapeRoomGame();

  return (
    <main className="relative h-dvh max-h-dvh min-h-0 w-full overflow-hidden bg-black text-[17px] text-[#7fff75]">
      <VisualBackdrop />
      <PillowMessageModal open={game.pillowMessageOpen} onOk={game.acknowledgePillowMessage} />
      <WinCelebration active={game.showConfetti} />

      {!game.showConfetti ? (
        <GameShell>
          <AppHeader />

          <div className="flex min-h-0 flex-1 flex-col">
            {!game.started ? (
              <WelcomePanel onStart={game.startGame} />
            ) : game.bootIndex < game.bootMessages.length ? (
              <BootSequencePanel messages={game.bootMessages} visibleCount={game.bootIndex} />
            ) : game.currentChallenge ? (
              <ScheduleGate step={game.step} challenge={game.currentChallenge}>
                <GamePlayScreen
                  challenge={game.currentChallenge}
                  gameStep={game.step}
                  progressPct={game.progress}
                  feedback={game.feedback}
                  feedbackTone={game.feedbackTone}
                  input={game.input}
                  onInputChange={game.setInput}
                  onSubmitMood={game.checkMoodAnswer}
                  onConfirmMood={game.confirmMoodAndAdvance}
                  selectedMood={game.selectedMood}
                  onSubmitText={game.checkTextAnswer}
                  onSubmitSudoku={game.checkSudoku}
                  onSubmitSequence={game.checkSequenceAnswer}
                  onWordSearchEndpoints={game.submitWordSearchEndpoints}
                  wordSearchFoundIds={game.wordSearchFoundIds}
                  isMood={game.isMoodStep}
                  isSudoku={game.isSudokuStep}
                  isSequence={game.isSequenceStep}
                  isWordSearch={game.isWordSearchStep}
                  sudokuGrid={game.sudokuGrid}
                  fixedMask={game.fixedMask}
                  onSudokuCellChange={game.onSudokuCellChange}
                  sudokuTimerActive={game.sudokuTimerActive}
                  sudokuSecondsLeft={game.sudokuSecondsLeft}
                />
              </ScheduleGate>
            ) : null}
          </div>
        </GameShell>
      ) : null}
    </main>
  );
}
