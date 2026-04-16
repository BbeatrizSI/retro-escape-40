type Props = {
  messages: string[];
  visibleCount: number;
};

export function BootSequencePanel({ messages, visibleCount }: Props) {
  return (
    <div className="relative z-20 flex-1 space-y-2 rounded-lg border border-[#7fff75]/35 bg-black/75 p-3 backdrop-blur-sm">
      {messages.slice(0, visibleCount).map((msg) => (
        <p key={msg} className="animate-flicker">
          &gt; {msg}
        </p>
      ))}
      <p className="animate-pulse text-[#7fff75]/65">&gt; ...</p>
    </div>
  );
}
