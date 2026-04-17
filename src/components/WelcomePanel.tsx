type Props = {
  onStart: () => void;
  onEnableNotifications: () => Promise<NotificationPermission>;
};

export function WelcomePanel({ onStart, onEnableNotifications }: Props) {
  return (
    <div className="relative z-20 flex flex-1 flex-col justify-center space-y-4 pt-2">
      <p className="rounded-lg border border-[#7fff75]/45 bg-black/75 p-3 leading-relaxed backdrop-blur-sm">
        Bienvenida, agente especial. Para desbloquear tu sorpresa, activa el sistema retro y supera unos retos con
        humor inteligente. Los retos se abren a horas concretas del día; el último llega a las 19:00.
      </p>
      <p className="text-xs leading-relaxed text-[#7fff75]/65">
        Puedes instalar la web como app: en Chrome/Android, menú &quot;Añadir a pantalla de inicio&quot;. Las avisos
        programados funcionan mejor en Android; en iOS las notificaciones push web no están disponibles y el sistema
        puede no avisarte si la app está cerrada.
      </p>
      <button
        type="button"
        className="w-full rounded-xl border border-[#7fff75] bg-[#7fff75]/15 px-4 py-4 text-base font-bold uppercase tracking-wider text-[#7fff75]"
        onClick={onStart}
      >
        Iniciar actualización
      </button>
      <button
        type="button"
        className="w-full rounded-xl border border-[#7fff75]/55 bg-black/60 px-4 py-3 text-sm font-semibold text-[#7fff75]/95"
        onClick={() => void onEnableNotifications()}
      >
        Activar avisos del día (notificaciones)
      </button>
    </div>
  );
}
