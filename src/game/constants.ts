import type { Challenge } from "./types";

export const BOOT_MESSAGES = [
  "Iniciando consola del amor v4.0...",
  "Retirando dolores de rodilla... [OK]",
  "Cargando felicidad premium... [OK]",
  "Consultando al sombrerero loco... [HECHO]",
  "Ajustando modo familia y risas... [OK]",
  "Sincronizando relojes con el despertador del universo... [WAIT]",
  "Descargando cafeína virtual (0 kcal)... [OK]",
  "Indexando abrazos en base de datos cálida... [HECHO]",
  "Compilando modulos: paciencia, ironía, cariño... [OK]",
  "Instalando parches anti-mal humor... [OK]",
  "Calibrando brillo nostálgico del monitor verde... [OK]",
  "Enrutando paquetes de risa por TCP/IP... [OK]",
  "Desfragmentando la semana laboral (solo simbólico)... [SKIP]",
  "Actualizando drivers de miradas complices... [OK]",
  "Probando modem 56k de emociones... [BRRR]",
  "Escaneando virus... solo encontramos ternura... [CLEAN]",
  "Haciendo backup de recuerdos en cinta imaginaria... [OK]",
  "Optimizando cache de planes futuros... [OK]",
  "Importando playlist 'Rock del bueno'... [OK]",
  "Subiendo prioridad del proceso 'celebracion'... [OK]",
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
    kind: "mood",
    title: "RETO 1 - La mejor convaleciente",
    prompt: "Eres una buena paciente, pero cómo te sientes hoy?",
    options: ["Fenomenal", "Bastante bien", "Regular", "Podría estar mejor", "Fatal"]
  },
  {
    kind: "text",
    title: "RETO 2 - Arquitecta del hogar",
    prompt: "Si toca reforma en casa, quién manda en planos y decisiones?",
    acceptedAnswers: ["yo", "lara", "todas", "todos", "barbara", "bárbara"],
    hint: "Pista: piensa en quién tiene la última palabra."
  },
  {
    kind: "text",
    title: "RETO 3 - Color secreto",
    prompt: "¿Qué nombre le pondrías al siguiente color?",
    swatchColor: "#C9E82A",
    acceptedAnswers: ["verde", "verde lima", "nuestro coche"],
    hint: "Solo diré que NO es amarillo"
  },
  {
    kind: "sequence",
    title: "RETO 4 - Serie lógica turbo",
    prompt: "Completa la serie: 2, 6, 12, 20, 30, ...",
    sequence: [2, 6, 12, 20, 30],
    options: [36, 40, 42, 48],
    answer: 42,
    hint: "Pista: se multiplica y también crece el salto."
  },
  {
    kind: "text",
    title: "RETO 5 - Mini jefa",
    prompt: "Completa el código secreto: con nuestra hija de 4 años, cada día es una ____.",
    acceptedAnswers: ["aventura", "locura"],
    hint: "Pista: nunca hay aburrimiento en casa."
  },
  {
    kind: "sudoku",
    title: "RETO 6 - Sudoku express",
    prompt:
      "Completa el sudoku 6x6. Tienes 60 segundos desde que empiezas a editar la cuadrícula.",
    hint: "Pista: filas, columnas y bloques 2x3 sin repetir del 1 al 6."
  }
];
