import { SUDOKU_INITIAL } from "./constants";

export function buildSudokuFixedMask(): boolean[] {
  return SUDOKU_INITIAL.map((n) => n !== 0);
}

export function gridsEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((v, i) => v === b[i]);
}
