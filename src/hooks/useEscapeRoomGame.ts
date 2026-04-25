import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BOOT_MESSAGES, CHALLENGES, SUDOKU_INITIAL, SUDOKU_SIZE, SUDOKU_SOLUTION } from "../game/constants";
import { formatUnlockClock, isStepUnlocked, msUntilStepUnlock } from "../game/schedule";
import { buildSudokuFixedMask, gridsEqual } from "../game/sudokuModel";
import type { Challenge } from "../game/types";
import { useRetroAudio } from "./useRetroAudio";

const GAME_STATE_STORAGE_KEY = "retro_escape_game_state_v1";

type PersistedGameState = {
  started: boolean;
  bootIndex: number;
  step: number;
  input: string;
  feedback: string;
  showConfetti: boolean;
  sudokuGrid: number[];
  sudokuTimerActive: boolean;
  sudokuSecondsLeft: number;
};

function loadPersistedState(): PersistedGameState {
  const fallback: PersistedGameState = {
    started: false,
    bootIndex: 0,
    step: 0,
    input: "",
    feedback: "",
    showConfetti: false,
    sudokuGrid: [...SUDOKU_INITIAL],
    sudokuTimerActive: false,
    sudokuSecondsLeft: 60
  };
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(GAME_STATE_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<PersistedGameState>;
    const safeStep = Math.min(Math.max(parsed.step ?? 0, 0), CHALLENGES.length - 1);
    const safeGrid =
      Array.isArray(parsed.sudokuGrid) && parsed.sudokuGrid.length === SUDOKU_INITIAL.length
        ? parsed.sudokuGrid.map((n) => (Number.isInteger(n) ? Number(n) : 0))
        : [...SUDOKU_INITIAL];

    return {
      started: Boolean(parsed.started),
      bootIndex: Math.min(Math.max(parsed.bootIndex ?? 0, 0), BOOT_MESSAGES.length),
      step: safeStep,
      input: typeof parsed.input === "string" ? parsed.input : "",
      feedback: typeof parsed.feedback === "string" ? parsed.feedback : "",
      showConfetti: Boolean(parsed.showConfetti),
      sudokuGrid: safeGrid,
      sudokuTimerActive: Boolean(parsed.sudokuTimerActive),
      sudokuSecondsLeft:
        typeof parsed.sudokuSecondsLeft === "number" && parsed.sudokuSecondsLeft >= 0 && parsed.sudokuSecondsLeft <= 60
          ? parsed.sudokuSecondsLeft
          : 60
    };
  } catch {
    return fallback;
  }
}

function formatRemainingTime(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, "0")}m`;
  return `${minutes}m`;
}

export function useEscapeRoomGame() {
  const MAX_SOFT_TEXT_ATTEMPTS = 3;
  const LOW_MOOD_OPTIONS = new Set(["fatal", "podría estar mejor", "podria estar mejor", "regular"]);

  const { beep, modem } = useRetroAudio();
  const initialState = useMemo(() => loadPersistedState(), []);
  const [started, setStarted] = useState(initialState.started);
  const [bootIndex, setBootIndex] = useState(initialState.bootIndex);
  const [step, setStep] = useState(initialState.step);
  const [input, setInput] = useState(initialState.input);
  const [feedback, setFeedback] = useState(initialState.feedback);
  const [showConfetti, setShowConfetti] = useState(initialState.showConfetti);
  const [sudokuGrid, setSudokuGrid] = useState<number[]>(initialState.sudokuGrid);
  const [sudokuTimerActive, setSudokuTimerActive] = useState(initialState.sudokuTimerActive);
  const [sudokuSecondsLeft, setSudokuSecondsLeft] = useState(initialState.sudokuSecondsLeft);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [feedbackTone, setFeedbackTone] = useState<"normal" | "alert">("normal");
  const [textWrongAttempts, setTextWrongAttempts] = useState(0);

  const fixedMask = useMemo(() => buildSudokuFixedMask(), []);
  const currentChallenge: Challenge | undefined = CHALLENGES[step];
  const progress = useMemo(() => ((step + 1) / CHALLENGES.length) * 100, [step]);
  const isMoodStep = currentChallenge?.kind === "mood";
  const isSudokuStep = currentChallenge?.kind === "sudoku";
  const isSequenceStep = currentChallenge?.kind === "sequence";
  const prevIsSudokuStep = useRef<boolean | undefined>(undefined);

  useEffect(() => {
    setTextWrongAttempts(0);
    setSelectedMood(null);
    setFeedbackTone("normal");
  }, [step]);

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
    const prev = prevIsSudokuStep.current;
    prevIsSudokuStep.current = isSudokuStep;
    if (prev === undefined) return;

    if (prev && !isSudokuStep) {
      setSudokuTimerActive(false);
      setSudokuSecondsLeft(60);
      return;
    }
    if (!prev && isSudokuStep) {
      setSudokuGrid([...SUDOKU_INITIAL]);
      setSudokuTimerActive(false);
      setSudokuSecondsLeft(60);
      setFeedback("");
    }
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const data: PersistedGameState = {
      started,
      bootIndex,
      step,
      input,
      feedback,
      showConfetti,
      sudokuGrid,
      sudokuTimerActive,
      sudokuSecondsLeft
    };
    window.localStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(data));
  }, [started, bootIndex, step, input, feedback, showConfetti, sudokuGrid, sudokuTimerActive, sudokuSecondsLeft]);

  const advanceOrWin = useCallback(() => {
    if (step < CHALLENGES.length - 1) {
      const nextStep = step + 1;
      const nextAt = formatUnlockClock(nextStep);
      const remaining = formatRemainingTime(msUntilStepUnlock(nextStep));
      setFeedbackTone("normal");
      setFeedback(`Correcto. Siguiente reto a las ${nextAt}. Falta ${remaining}.`);
      window.setTimeout(() => {
        setStep((prev) => prev + 1);
        setFeedback("");
      }, 3400);
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

  const checkMoodAnswer = useCallback(
    (value: string) => {
      if (!currentChallenge || currentChallenge.kind !== "mood") return;
      if (!isStepUnlocked(step)) {
        beep(200, 0.15, "sawtooth");
        setFeedbackTone("alert");
        setFeedback(`Este reto abre a las ${formatUnlockClock(step)} (hora local).`);
        return;
      }

      const normalized = value.trim().toLowerCase();
      const message = LOW_MOOD_OPTIONS.has(normalized)
        ? "Pues arriba ese ánimo y a desayunar."
        : "Pues ahora... A desayunar!";

      beep(1040, 0.08);
      setSelectedMood(value);
      setFeedbackTone("normal");
      setFeedback(message);
    },
    [currentChallenge, step, beep]
  );

  const confirmMoodAndAdvance = useCallback(() => {
    if (!currentChallenge || currentChallenge.kind !== "mood") return;
    if (!selectedMood) return;
    advanceOrWin();
  }, [currentChallenge, selectedMood, advanceOrWin]);

  const checkTextAnswer = useCallback(() => {
    if (!currentChallenge || currentChallenge.kind !== "text") return;
    if (!isStepUnlocked(step)) {
      beep(200, 0.15, "sawtooth");
      setFeedbackTone("alert");
      setFeedback(`Este reto abre a las ${formatUnlockClock(step)} (hora local).`);
      return;
    }
    const clean = input.trim().toLowerCase();
    const ok = currentChallenge.acceptedAnswers.some((a) => a.toLowerCase() === clean);
    if (ok) {
      beep(1040, 0.08);
      beep(1320, 0.1);
      setTextWrongAttempts(0);
      setFeedbackTone("normal");
      setFeedback("Correcto. Nivel superado.");
      setInput("");
      advanceOrWin();
    } else {
      beep(200, 0.2, "sawtooth");
      const nextAttemptCount = textWrongAttempts + 1;
      setTextWrongAttempts(nextAttemptCount);
      setFeedbackTone("alert");
      const hintLine = currentChallenge.hint.trim();
      const hintSuffix = hintLine ? `\n\n${hintLine}` : "";
      if (nextAttemptCount <= MAX_SOFT_TEXT_ATTEMPTS) {
        const remaining = MAX_SOFT_TEXT_ATTEMPTS - nextAttemptCount;
        setFeedback(`Respuesta incorrecta. Te quedan ${remaining} intentos más.${hintSuffix}`);
      } else {
        setFeedback(`Venga que puedes probar otra vez.${hintSuffix}`);
      }
    }
  }, [currentChallenge, step, input, beep, advanceOrWin, textWrongAttempts]);

  const checkSudoku = useCallback(() => {
    if (!currentChallenge || currentChallenge.kind !== "sudoku") return;
    if (!isStepUnlocked(step)) {
      beep(200, 0.15, "sawtooth");
      setFeedbackTone("alert");
      setFeedback(`El sudoku se desbloquea a las ${formatUnlockClock(step)}.`);
      return;
    }
    if (sudokuGrid.some((n) => n === 0)) {
      beep(200, 0.15, "sawtooth");
      setFeedbackTone("alert");
      setFeedback("Faltan celdas. Rellena todo el tablero.");
      return;
    }
    if (gridsEqual(sudokuGrid, SUDOKU_SOLUTION)) {
      beep(1040, 0.08);
      beep(1320, 0.1);
      setSudokuTimerActive(false);
      setFeedbackTone("normal");
      setFeedback("Sudoku correcto. Nivel superado.");
      advanceOrWin();
    } else {
      beep(200, 0.25, "sawtooth");
      setFeedbackTone("alert");
      setFeedback("Hay errores. Revisa filas, columnas y bloques 2x3.");
    }
  }, [currentChallenge, step, sudokuGrid, beep, advanceOrWin]);

  const checkSequenceAnswer = useCallback(
    (value: number) => {
      if (!currentChallenge || currentChallenge.kind !== "sequence") return;
      if (!isStepUnlocked(step)) {
        beep(200, 0.15, "sawtooth");
        setFeedbackTone("alert");
        setFeedback(`Este reto abre a las ${formatUnlockClock(step)} (hora local).`);
        return;
      }
      if (value === currentChallenge.answer) {
        beep(1040, 0.08);
        beep(1320, 0.1);
        setFeedbackTone("normal");
        advanceOrWin();
      } else {
        beep(200, 0.2, "sawtooth");
        setFeedbackTone("alert");
        setFeedback(`Ups... ${currentChallenge.hint}`);
      }
    },
    [currentChallenge, step, beep, advanceOrWin]
  );

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
    feedbackTone,
    selectedMood,
    showConfetti,
    currentChallenge,
    progress,
    isMoodStep,
    isSudokuStep,
    isSequenceStep,
    sudokuGrid,
    sudokuTimerActive,
    sudokuSecondsLeft,
    fixedMask,
    startGame,
    checkMoodAnswer,
    confirmMoodAndAdvance,
    checkTextAnswer,
    checkSudoku,
    checkSequenceAnswer,
    onSudokuCellChange
  };
}
