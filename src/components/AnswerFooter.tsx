import { useEffect, useState } from "react";

/** RETO 4 en la lista de desafíos (índice 0-based). */
const RETO_4_STEP_INDEX = 3;
const OK_DODGES_BEFORE_SUBMIT = 2;

type Props = {
  mode: "text" | "sudoku";
  input: string;
  onInputChange: (v: string) => void;
  onSubmitText: () => void;
  onSubmitSudoku: () => void;
  /** Paso actual del juego; solo en RETO 4 el botón OK “huye” dos veces. */
  gameStep?: number;
};

export function AnswerFooter({
  mode,
  input,
  onInputChange,
  onSubmitText,
  onSubmitSudoku,
  gameStep = -1
}: Props) {
  const [okDodgeCount, setOkDodgeCount] = useState(0);

  useEffect(() => {
    if (gameStep !== RETO_4_STEP_INDEX) setOkDodgeCount(0);
  }, [gameStep]);

  const isReto4 = mode === "text" && gameStep === RETO_4_STEP_INDEX;

  const footerRowClass =
    okDodgeCount === 0
      ? "flex flex-row items-stretch"
      : okDodgeCount === 1
        ? "flex flex-row-reverse items-stretch"
        : "flex flex-col items-stretch";

  const handleOkClick = () => {
    if (isReto4 && okDodgeCount < OK_DODGES_BEFORE_SUBMIT) {
      setOkDodgeCount((c) => c + 1);
      return;
    }
    onSubmitText();
  };

  return (
    <div className="mt-auto border-t border-[#7fff75]/30 bg-black/75 pt-3 backdrop-blur-sm">
      {mode === "sudoku" ? (
        <button
          type="button"
          onClick={onSubmitSudoku}
          className="w-full rounded-lg border border-[#7fff75] bg-[#7fff75]/20 py-3 text-base font-bold text-[#7fff75]"
        >
          Comprobar sudoku
        </button>
      ) : (
        <div className={`gap-2 ${footerRowClass}`}>
          <input
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmitText()}
            placeholder="Escribe tu respuesta..."
            className={`min-h-[48px] flex-1 rounded-lg border border-[#7fff75]/45 bg-black/80 px-3 py-3 text-base text-[#7fff75] outline-none placeholder:text-[#7fff75]/55 ${isReto4 && okDodgeCount >= 2 ? "order-2" : ""}`}
          />
          <button
            type="button"
            onClick={handleOkClick}
            className={`min-h-[48px] shrink-0 rounded-lg border border-[#7fff75] bg-[#7fff75]/20 px-4 text-base font-bold text-[#7fff75] ${isReto4 && okDodgeCount >= 2 ? "order-1 w-full sm:w-auto" : ""}`}
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
}
