type Variant = "horizontal" | "stacked";

export function Logo({ variant = "horizontal", className = "", color }: { variant?: Variant; className?: string; color?: string }) {
  const c = color ?? "currentColor";
  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`} style={{ color: c }}>
        <div className="font-serif italic text-5xl leading-none" style={{ color: c }}>LG</div>
        <div className="font-sans text-[10px] tracking-[0.4em] uppercase font-light">Dra. Lara Ganem</div>
        <div className="font-sans text-[8px] tracking-[0.3em] uppercase font-light opacity-70">Ginecologia & Obstetrícia</div>
      </div>
    );
  }
  return (
    <div className={`flex items-center gap-3 ${className}`} style={{ color: c }}>
      <div className="font-serif italic text-3xl leading-none">LG</div>
      <div className="hidden sm:block h-8 w-px" style={{ background: "currentColor", opacity: 0.3 }} />
      <div className="flex flex-col leading-tight">
        <span className="font-sans text-[11px] tracking-[0.32em] uppercase font-light">Dra. Lara Ganem</span>
        <span className="font-sans text-[8px] tracking-[0.28em] uppercase font-light opacity-60">Ginecologia & Obstetrícia</span>
      </div>
    </div>
  );
}
