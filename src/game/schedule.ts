import { CHALLENGES } from "./constants";

/**
 * Hora local del dispositivo a la que se desbloquea cada reto (índice = CHALLENGES).
 * Ajusta aquí el día del evento: el primero suele ser “tras despertar”, el último 19:00.
 */
export const STEP_UNLOCK_LOCAL: readonly string[] = [
  "09:00",
  "11:00",
  "14:00",
  "18:00",
  "19:00"
];

function assertScheduleLength() {
  if (STEP_UNLOCK_LOCAL.length !== CHALLENGES.length) {
    throw new Error("STEP_UNLOCK_LOCAL debe tener la misma longitud que CHALLENGES");
  }
}
assertScheduleLength();

export function getStepUnlockDate(stepIndex: number, ref: Date = new Date()): Date {
  const hm = STEP_UNLOCK_LOCAL[stepIndex];
  if (!hm) return new Date(0);
  const [h, m] = hm.split(":").map((x) => Number(x));
  const d = new Date(ref);
  d.setHours(h, m, 0, 0);
  return d;
}

export function isStepUnlocked(stepIndex: number, ref: Date = new Date()): boolean {
  return ref.getTime() >= getStepUnlockDate(stepIndex, ref).getTime();
}

export function formatUnlockClock(stepIndex: number): string {
  return STEP_UNLOCK_LOCAL[stepIndex] ?? "--:--";
}

export function msUntilStepUnlock(stepIndex: number, ref: Date = new Date()): number {
  return Math.max(0, getStepUnlockDate(stepIndex, ref).getTime() - ref.getTime());
}
