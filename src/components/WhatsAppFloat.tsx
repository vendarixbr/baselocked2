import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5537994219291"
      target="_blank"
      rel="noreferrer"
      aria-label="Agendar consulta pelo WhatsApp"
      className="group fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3"
    >
      <span className="hidden sm:inline-block bg-dark/90 backdrop-blur text-white text-[11px] font-sans tracking-[0.15em] uppercase px-4 py-2 rounded-full opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-lg">
        Agendar consulta
      </span>
      <span className="relative inline-flex">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 blur-md" />
        <span className="relative inline-flex size-14 sm:size-15 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-xl shadow-emerald-900/30 ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-110">
          <WhatsAppIcon className="size-7 text-white" />
        </span>
      </span>
    </a>
  );
}
