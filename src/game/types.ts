export type TextChallenge = {
  kind: "text";
  title: string;
  prompt: string;
  hint: string;
  acceptedAnswers: string[];
};

export type SudokuChallenge = {
  kind: "sudoku";
  title: string;
  prompt: string;
  hint: string;
};

export type Challenge = TextChallenge | SudokuChallenge;
