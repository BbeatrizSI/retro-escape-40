type Props = {
  onStart: () => void;
};

export function WelcomePanel({ onStart }: Props) {
  return (
    <div className="relative z-20 flex flex-1 flex-col justify-center space-y-4 pt-2">
      <p className="rounded-lg border border-[#7fff75]/45 bg-black/75 p-3 leading-relaxed backdrop-blur-sm">
        Bienvenida, agente especial. Para desbloquear tu sorpresa, activa el sistema retro y supera unos retos con un poco de 
        humor. Los retos se abren a horas concretas del día; el último llega a las 19:00.
      </p>
      <p className="text-xs leading-relaxed text-[#7fff75]/65">
        Puedes instalar la web como app: en Chrome/Android, menú &quot;Añadir a pantalla de inicio&quot;.
      </p>
      <button
        type="button"
        className="w-full rounded-xl border border-[#7fff75] bg-[#7fff75]/15 px-4 py-4 mt-4 text-base font-bold uppercase tracking-wider text-[#7fff75]"
        onClick={onStart}
      >
        Iniciar actualización
      </button>
    </div>
  );
}
