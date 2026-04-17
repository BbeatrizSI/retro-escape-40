import { useCallback, useEffect, useMemo, useState } from "react";
import { BOOT_MESSAGES, CHALLENGES, SUDOKU_INITIAL, SUDOKU_SIZE, SUDOKU_SOLUTION } from "../game/constants";
import { formatUnlockClock, isStepUnlocked } from "../game/schedule";
import { buildSudokuFixedMask, gridsEqual } from "../game/sudokuModel";
import type { Challenge } from "../game/types";
import { useRetroAudio } from "./useRetroAudio";

export function useEscapeRoomGame() {
  const { beep, modem } = useRetroAudio();
  const [started, setStarted] = useState(false);
  const [bootIndex, setBootIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [sudokuGrid, setSudokuGrid] = useState<number[]>(() => [...SUDOKU_INITIAL]);
  const [sudokuTimerActive, setSudokuTimerActive] = useState(false);
  const [sudokuSecondsLeft, setSudokuSecondsLeft] = useState(60);

  const fixedMask = useMemo(() => buildSudokuFixedMask(), []);
  const currentChallenge: Challenge | undefined = CHALLENGES[step];
  const progress = useMemo(() => ((step + 1) / CHALLENGES.length) * 100, [step]);
  const isSudokuStep = currentChallenge?.kind === "sudoku";

  useEffect(() => {
    if (!started || bootIndex >= BOOT_MESSAGES.length) return;
    const id = window.setTimeout(() => setBootIndex((v) => v + 1), 950);
    return () => window.clearTimeout(id);
  }, [started, bootIndex]);

  useEffect(() => {
    if (bootIndex === BOOT_MESSAGES.length) {
      beep(720, 0.18, "triangle");
    }
  }, [bootIndex, beep]);

  useEffect(() => {
    if (!isSudokuStep) {
      setSudokuTimerActive(false);
      setSudokuSecondsLeft(60);
      return;
    }
    setSudokuGrid([...SUDOKU_INITIAL]);
    setSudokuTimerActive(false);
    setSudokuSecondsLeft(60);
    setFeedback("");
  }, [isSudokuStep]);

  useEffect(() => {
    if (!sudokuTimerActive) return;
    const id = window.setInterval(() => {
      setSudokuSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [sudokuTimerActive]);

  useEffect(() => {
    if (!isSudokuStep || !sudokuTimerActive || sudokuSecondsLeft > 0) return;
    beep(200, 0.35, "sawtooth");
    setSudokuTimerActive(false);
    setSudokuGrid([...SUDOKU_INITIAL]);
    setSudokuSecondsLeft(60);
    setFeedback("Tiempo agotado. Cuadricula reiniciada. Vuelve a intentarlo.");
  }, [isSudokuStep, sudokuTimerActive, sudokuSecondsLeft, beep]);

  const advanceOrWin = useCallback(() => {
    if (step < CHALLENGES.length - 1) {
      window.setTimeout(() => {
        setStep((prev) => prev + 1);
        setFeedback("");
      }, 550);
    } else {
      window.setTimeout(() => {
        setShowConfetti(true);
        setFeedback("");
      }, 550);
    }
  }, [step]);

  const startGame = useCallback(async () => {
    await modem();
    setStarted(true);
  }, [modem]);

  const checkTextAnswer = useCallback(() => {
    if (!currentChallenge || currentChallenge.kind !== "text") return;
    if (!isStepUnlocked(step)) {
      beep(200, 0.15, "sawtooth");
      setFeedback(`Este reto abre a las ${formatUnlockClock(step)} (hora local).`);
      return;
    }
    const clean = input.trim().toLowerCase();
    const ok = currentChallenge.acceptedAnswers.some((a) => a.toLowerCase() === clean);
    if (ok) {
      beep(1040, 0.08);
      beep(1320, 0.1);
      setFeedback("Correcto. Nivel superado.");
      setInput("");
      advanceOrWin();
    } else {
      beep(200, 0.2, "sawtooth");
      setFeedback(`Ups... ${currentChallenge.hint}`);
    }
  }, [currentChallenge, step, input, beep, advanceOrWin]);

  const checkSudoku = useCallback(() => {
    if (!currentChallenge || currentChallenge.kind !== "sudoku") return;
    if (!isStepUnlocked(step)) {
      beep(200, 0.15, "sawtooth");
      setFeedback(`El sudoku se desbloquea a las ${formatUnlockClock(step)}.`);
      return;
    }
    if (sudokuGrid.some((n) => n === 0)) {
      beep(200, 0.15, "sawtooth");
      setFeedback("Faltan celdas. Rellena todo el tablero.");
      return;
    }
    if (gridsEqual(sudokuGrid, SUDOKU_SOLUTION)) {
      beep(1040, 0.08);
      beep(1320, 0.1);
      setSudokuTimerActive(false);
      setFeedback("Sudoku correcto. Nivel superado.");
      advanceOrWin();
    } else {
      beep(200, 0.25, "sawtooth");
      setFeedback("Hay errores. Revisa filas, columnas y bloques 2x3.");
    }
  }, [currentChallenge, step, sudokuGrid, beep, advanceOrWin]);

  const onSudokuCellChange = useCallback(
    (index: number, raw: string) => {
      if (!isStepUnlocked(step)) return;
      if (fixedMask[index]) return;
      if (!sudokuTimerActive && raw !== "") {
        setSudokuTimerActive(true);
        setSudokuSecondsLeft(60);
      }
      const digit = raw.replace(/\D/g, "").slice(-1);
      if (digit === "") {
        setSudokuGrid((g) => {
          const next = [...g];
          next[index] = 0;
          return next;
        });
        return;
      }
      const n = Number(digit);
      if (n < 1 || n > SUDOKU_SIZE) return;
      setSudokuGrid((g) => {
        const next = [...g];
        next[index] = n;
        return next;
      });
    },
    [fixedMask, sudokuTimerActive, step]
  );

  return {
    started,
    bootIndex,
    bootMessages: BOOT_MESSAGES,
    step,
    input,
    setInput,
    feedback,
    showConfetti,
    currentChallenge,
    progress,
    isSudokuStep,
    sudokuGrid,
    sudokuTimerActive,
    sudokuSecondsLeft,
    fixedMask,
    startGame,
    checkTextAnswer,
    checkSudoku,
    onSudokuCellChange
  };
}
