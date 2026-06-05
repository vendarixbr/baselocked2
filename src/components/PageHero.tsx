import { Link } from "@tanstack/react-router";

type Crumb = { label: string; to?: string };

export function PageHero({
  title,
  subtitle,
  breadcrumb,
  eyebrow,
  crumbs,
  align = "left",
}: {
  title: string;
  subtitle?: string;
  /** legacy string breadcrumb, e.g. "Início · Sobre" */
  breadcrumb?: string;
  /** small eyebrow tag above the title */
  eyebrow?: string;
  /** structured breadcrumb with links */
  crumbs?: Crumb[];
  align?: "left" | "center";
}) {
  // Derive structured crumbs from legacy string if needed
  const resolvedCrumbs: Crumb[] =
    crumbs ??
    (breadcrumb
      ? breadcrumb.split("·").map((p, i, arr) => {
          const label = p.trim();
          if (i === 0 && label.toLowerCase() === "início") return { label, to: "/" };
          if (i < arr.length - 1) return { label };
          return { label };
        })
      : []);

  const centered = align === "center";

  return (
    <section className="relative isolate overflow-hidden pt-36 pb-24 lg:pt-44 lg:pb-28 bg-gradient-warm">
      {/* Texture & ambient glow */}
      <div className="absolute inset-0 noise opacity-60 pointer-events-none" />
      <div className="absolute -top-32 -right-24 w-[32rem] h-[32rem] rounded-full bg-accent/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-24 w-[34rem] h-[34rem] rounded-full bg-gold-light/15 blur-3xl pointer-events-none" />
      {/* Top hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div
        className={`relative max-w-6xl mx-auto px-6 lg:px-10 ${
          centered ? "text-center" : ""
        }`}
      >
        {/* Breadcrumb */}
        {resolvedCrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[10.5px] tracking-[0.32em] uppercase text-text-muted font-light ${
              centered ? "justify-center" : ""
            }`}
          >
            {resolvedCrumbs.map((c, i) => {
              const isLast = i === resolvedCrumbs.length - 1;
              return (
                <span key={`${c.label}-${i}`} className="inline-flex items-center gap-2">
                  {c.to && !isLast ? (
                    <Link to={c.to} className="hover:text-primary transition-colors">
                      {c.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "text-primary" : ""}>{c.label}</span>
                  )}
                  {!isLast && (
                    <span aria-hidden className="text-primary/50">
                      —
                    </span>
                  )}
                </span>
              );
            })}
          </nav>
        )}

        {/* Eyebrow */}
        {eyebrow && (
          <p
            className={`mt-5 font-script italic text-primary text-xl md:text-2xl ${
              centered ? "" : ""
            }`}
          >
            {eyebrow}
          </p>
        )}

        {/* Title */}
        <h1 className="mt-6 font-serif text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl text-dark text-balance leading-[1.02] tracking-[-0.03em]">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            className={`mt-7 font-sans font-light text-text-muted text-base md:text-lg leading-relaxed max-w-2xl ${
              centered ? "mx-auto" : ""
            }`}
          >
            {subtitle}
          </p>
        )}

        {/* Ornament */}
        <div
          className={`mt-10 flex items-center gap-3 ${
            centered ? "justify-center" : ""
          }`}
          aria-hidden
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
          <span className="size-1.5 rotate-45 bg-primary" />
          <span className="h-px w-24 bg-gradient-to-r from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
}
