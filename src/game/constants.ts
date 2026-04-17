import type { Challenge } from "./types";

export const BOOT_MESSAGES = [
  "Iniciando consola del amor v4.0...",
  "Retirando dolores de rodilla... [OK]",
  "Cargando felicidad premium... [OK]",
  "Consultando al sombrerero loco... [HECHO]",
  "Ajustando modo familia y risas... [OK]",
  "Desbloqueando nivel: Cumple 40 legendario..."
];

export const MATRIX_STREAMS = [
  "01A7F0Z9X3",
  "FAMILY4042",
  "MACBOOKAIR",
  "PLANOS1986",
  "RISAS7777",
  "HAPPY40YY",
  "BEEPBEEP1",
  "ECONOMIA$",
  "LOVE_SYS_",
  "MISION_OK_",
  "MATRIX_4_",
  "DOSMODEM++",
  "C0MM0D0RE",
  "SYS_LOAD__",
  "40BIT_MODE",
  "H0ME_PLANS",
  "K3YBOARD__",
  "MODEM_9600"
];

export const SUDOKU_SIZE = 6;

/** Pistas reducidas respecto al puzzle anterior; misma solución única que SUDOKU_SOLUTION. */
export const SUDOKU_INITIAL: number[] = [
  0, 2, 0, 0, 5, 6, 4, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 4, 2, 3, 1, 3, 0, 0, 0, 0, 5, 0, 4, 0, 3, 0, 0
];

export const SUDOKU_SOLUTION: number[] = [
  1, 2, 3, 4, 5, 6, 4, 5, 6, 1, 2, 3, 2, 3, 1, 5, 6, 4, 5, 6, 4, 2, 3, 1, 3, 1, 2, 6, 4, 5, 6, 4, 5, 3, 1, 2
];

export const CHALLENGES: Challenge[] = [
  {
    kind: "text",
    title: "RETO 1 - Arquitecta del hogar",
    prompt: "Si toca reforma en casa, quien manda en planos y decisiones?",
    acceptedAnswers: ["yo", "lara"],
    hint: "Pista: piensa en ti o en tu nombre."
  },
  {
    kind: "text",
    title: "RETO 2 - Economia ninja",
    prompt: "Completa: ahorro + cabeza fria = ____ familiar",
    acceptedAnswers: ["paz", "tranquilidad"],
    hint: "Pista: tres letras o su sinonimo largo."
  },
  {
    kind: "text",
    title: "RETO 3 - Misión gente",
    prompt: "Tu superpoder favorito: estar con la ______.",
    acceptedAnswers: ["familia", "gente"],
    hint: "Pista: siempre es el centro de todo."
  },
  {
    kind: "text",
    title: "RETO 4 - Mini jefa",
    prompt: "Completa el codigo secreto: con nuestra hija de 4 años, cada dia es una ____.",
    acceptedAnswers: ["aventura", "locura"],
    hint: "Pista: nunca hay aburrimiento en casa."
  },
  {
    kind: "sudoku",
    title: "RETO 5 - Sudoku express",
    prompt:
      "Completa el sudoku 6x6 con menos pistas que antes: más huecos, mismo reto. Tienes 60 segundos desde que empiezas a editar la cuadrícula.",
    hint: "Pista: filas, columnas y bloques 2x3 sin repetir del 1 al 6."
  }
];
