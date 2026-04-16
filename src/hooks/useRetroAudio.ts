import { useCallback, useState } from "react";

export function useRetroAudio() {
  const [ctx, setCtx] = useState<AudioContext | null>(null);

  const ensureCtx = useCallback(() => {
    if (ctx) return ctx;
    const audio = new AudioContext();
    setCtx(audio);
    return audio;
  }, [ctx]);

  const beep = useCallback(
    (frequency = 880, duration = 0.08, type: OscillatorType = "square") => {
      const audio = ensureCtx();
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = type;
      osc.frequency.value = frequency;
      gain.gain.value = 0.0001;
      gain.gain.exponentialRampToValueAtTime(0.08, audio.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);
      osc.connect(gain);
      gain.connect(audio.destination);
      osc.start();
      osc.stop(audio.currentTime + duration);
    },
    [ensureCtx]
  );

  const modem = useCallback(async () => {
    const audio = ensureCtx();
    const sequence = [480, 620, 520, 1100, 760, 940, 660, 1200];
    sequence.forEach((freq, i) => {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = i % 2 === 0 ? "sawtooth" : "square";
      osc.frequency.value = freq;
      gain.gain.value = 0.03;
      osc.connect(gain);
      gain.connect(audio.destination);
      const startAt = audio.currentTime + i * 0.12;
      osc.start(startAt);
      osc.stop(startAt + 0.1);
    });
  }, [ensureCtx]);

  return { beep, modem };
}
