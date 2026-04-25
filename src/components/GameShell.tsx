import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/** Marco principal del juego: sin fondo opaco para que se vea el VisualBackdrop. */
export function GameShell({ children }: Props) {
  return (
    <section className="relative z-[10] flex h-full min-h-0 w-full flex-col border-y border-[#7fff75]/40 bg-transparent px-3 py-2 shadow-[0_0_14px_rgba(127,255,117,0.25)] pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] pt-[max(0.5rem,env(safe-area-inset-top,0px))]">
      {children}
    </section>
  );
}
