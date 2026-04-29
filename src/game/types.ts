export type TextChallenge = {
  kind: "text";
  title: string;
  prompt: string;
  hint: string;
  acceptedAnswers: string[];
  swatchColor?: string;
};

export type MoodChallenge = {
  kind: "mood";
  title: string;
  prompt: string;
  options: string[];
};

export type SudokuChallenge = {
  kind: "sudoku";
  title: string;
  prompt: string;
  hint: string;
};

export type SequenceChallenge = {
  kind: "sequence";
  title: string;
  prompt: string;
  hint: string;
  sequence: number[];
  options: number[];
  answer: number;
};

export type WordSearchWord = {
  id: string;
  label: string;
  r0: number;
  c0: number;
  r1: number;
  c1: number;
};

export type WordSearchChallenge = {
  kind: "wordsearch";
  title: string;
  prompt: string;
  hint: string;
  rows: string[];
  words: WordSearchWord[];
};

export type Challenge =
  | MoodChallenge
  | TextChallenge
  | WordSearchChallenge
  | SequenceChallenge
  | SudokuChallenge;
