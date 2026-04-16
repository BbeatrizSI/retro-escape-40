import { MATRIX_STREAMS } from "../game/constants";

const STREAMS = [...MATRIX_STREAMS, ...MATRIX_STREAMS];

export function MatrixRain() {
  return (
    <div className="matrix-rain pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {STREAMS.map((stream, i) => (
        <span
          key={`${stream}-${i}`}
          className="matrix-column"
          style={{
            left: `${(i * 100) / STREAMS.length}%`,
            animationDuration: `${7 + (i % 6) * 1.4}s`,
            animationDelay: `${(i % 8) * 0.45}s`
          }}
        >
          {stream}
          <br />
          {stream}
          <br />
          {stream}
          <br />
          {stream}
          <br />
          {stream}
        </span>
      ))}
    </div>
  );
}
