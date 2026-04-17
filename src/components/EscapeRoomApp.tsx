import { useEffect } from "react";
import { useEscapeRoomGame } from "../hooks/useEscapeRoomGame";
import { scheduleUnlockNotifications, requestNotificationsAndSchedule } from "../utils/pwaNotifications";
import { AppHeader } from "./AppHeader";
import { BootSequencePanel } from "./BootSequencePanel";
import { GamePlayScreen } from "./GamePlayScreen";
import { GameShell } from "./GameShell";
import { VisualBackdrop } from "./VisualBackdrop";
import { ScheduleGate } from "./ScheduleGate";
import { WelcomePanel } from "./WelcomePanel";
import { WinCelebration } from "./WinCelebration";

export function EscapeRoomApp() {
  const game = useEscapeRoomGame();

  return (
    <main className="relative min-h-dvh w-full bg-black text-[17px] text-[#7fff75]">
      <VisualBackdrop />
      <WinCelebration active={game.showConfetti} />

      {!game.showConfetti ? (
        <GameShell>
          <AppHeader />

          {!game.started ? (
            <WelcomePanel
              onStart={game.startGame}
              onEnableNotifications={() => requestNotificationsAndSchedule()}
            />
          ) : game.bootIndex < game.bootMessages.length ? (
            <BootSequencePanel messages={game.bootMessages} visibleCount={game.bootIndex} />
          ) : game.currentChallenge ? (
            <ScheduleGate step={game.step} challenge={game.currentChallenge}>
              <GamePlayScreen
                challenge={game.currentChallenge}
                gameStep={game.step}
                progressPct={game.progress}
                feedback={game.feedback}
                input={game.input}
                onInputChange={game.setInput}
                onSubmitText={game.checkTextAnswer}
                onSubmitSudoku={game.checkSudoku}
                isSudoku={game.isSudokuStep}
                sudokuGrid={game.sudokuGrid}
                fixedMask={game.fixedMask}
                onSudokuCellChange={game.onSudokuCellChange}
                sudokuTimerActive={game.sudokuTimerActive}
                sudokuSecondsLeft={game.sudokuSecondsLeft}
              />
            </ScheduleGate>
          ) : null}
        </GameShell>
      ) : null}
    </main>
  );
}
