import { POST_RETO_3_MESSAGE } from "../game/constants";

type Props = {
  open: boolean;
  onOk: () => void;
};

export function PillowMessageModal({ open, onOk }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 px-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pillow-message-title"
    >
      <div className="max-w-lg rounded-2xl border-2 border-[#7fff75] bg-black/95 p-8 shadow-[0_0_48px_rgba(127,255,117,0.35),inset_0_0_32px_rgba(127,255,117,0.08)]">
        <p
          id="pillow-message-title"
          className="text-center text-2xl font-bold leading-snug tracking-tight text-[#7fff75] sm:text-3xl md:text-4xl"
          style={{ textShadow: "0 0 24px rgba(127,255,117,0.45)" }}
        >
          {POST_RETO_3_MESSAGE}
        </p>
        <p className="mt-5 text-center text-sm text-[#7fff75]/75">
          Cuando lo tengas claro, pulsa OK para seguir con el siguiente reto.
        </p>
        <button
          type="button"
          onClick={onOk}
          className="mt-8 w-full rounded-xl border-2 border-[#7fff75] bg-[#7fff75]/25 py-4 text-lg font-bold text-[#7fff75] shadow-[0_0_20px_rgba(127,255,117,0.3)] transition hover:bg-[#7fff75]/35 active:scale-[0.99]"
        >
          OK
        </button>
      </div>
    </div>
  );
}
