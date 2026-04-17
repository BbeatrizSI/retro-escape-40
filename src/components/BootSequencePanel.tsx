import { useEffect, useRef } from "react";

type Props = {
  messages: string[];
  visibleCount: number;
};

export function BootSequencePanel({ messages, visibleCount }: Props) {
  const visible = messages.slice(0, visibleCount);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [visibleCount]);

  return (
    <div className="relative z-20 flex min-h-[52dvh] flex-1 flex-col sm:min-h-[58dvh]">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#7fff75]/35 bg-black/80 shadow-[inset_0_0_24px_rgba(0,0,0,0.45)] backdrop-blur-sm">
        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3"
        >
          <div className="space-y-1.5">
            {visible.map((msg, i) => (
              <p key={`${i}-${msg.slice(0, 24)}`} className="font-mono text-[13px] leading-snug text-[#7fff75] animate-flicker sm:text-[14px]">
                &gt; {msg}
              </p>
            ))}
          </div>
        </div>
        <div className="shrink-0 border-t border-[#7fff75]/25 bg-black/60 px-3 py-2">
          <p className="font-mono text-[13px] animate-pulse text-[#7fff75]/70">&gt; ...</p>
        </div>
      </div>
    </div>
  );
}
