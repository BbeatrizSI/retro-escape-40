import { CHALLENGES } from "../game/constants";
import { getStepUnlockDate } from "../game/schedule";

let timeoutIds: number[] = [];

function clearScheduled() {
  timeoutIds.forEach((id) => window.clearTimeout(id));
  timeoutIds = [];
}

export async function showUnlockNotification(title: string, body: string): Promise<void> {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  const icon =
    typeof import.meta.env.BASE_URL === "string"
      ? `${import.meta.env.BASE_URL.replace(/\/?$/, "/")}pwa-192.png`
      : "/pwa-192.png";

  try {
    const reg = await navigator.serviceWorker?.ready;
    if (reg) {
      await reg.showNotification(title, {
        body,
        icon,
        badge: icon,
        tag: `escape-${title}`
      });
      return;
    }
  } catch {
    /* fallback */
  }
  new Notification(title, { body, icon });
}

/** Programa avisos para los retos que aún no han abierto hoy (hora local). */
export function scheduleUnlockNotifications(): () => void {
  clearScheduled();
  if (typeof window === "undefined" || !("Notification" in window)) return () => {};
  if (Notification.permission !== "granted") return () => {};

  const now = new Date();
  CHALLENGES.forEach((ch, i) => {
    const at = getStepUnlockDate(i, now);
    if (at.getTime() <= now.getTime()) return;
    const ms = at.getTime() - now.getTime();
    const id = window.setTimeout(() => {
      void showUnlockNotification(ch.title, "Ya puedes seguir con el escape en la app.");
    }, ms);
    timeoutIds.push(id);
  });

  return clearScheduled;
}

export async function requestNotificationsAndSchedule(): Promise<NotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "denied";
  }
  const p = await Notification.requestPermission();
  if (p === "granted") scheduleUnlockNotifications();
  return p;
}
