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

export type Challenge = MoodChallenge | TextChallenge | SequenceChallenge | SudokuChallenge;
