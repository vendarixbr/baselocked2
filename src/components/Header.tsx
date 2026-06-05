import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import logoHorizontal from "@/assets/logo-horizontal.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/sobre", label: "Sobre" },
  { to: "/servicos", label: "Serviços" },
  { to: "/blog", label: "Blog" },
  { to: "/contato", label: "Contato" },
];

const WHATSAPP = "https://wa.me/5537994219291";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {

    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-md shadow-[0_1px_12px_rgba(0,0,0,0.06)]" : "bg-background/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 sm:h-24 lg:h-28 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center shrink-0" aria-label="Dra. Lara Ganem">
          <img src={logoHorizontal} alt="Dra. Lara Ganem — Ginecologia e Obstetrícia" className="h-14 sm:h-16 lg:h-20 w-auto object-contain" />
        </Link>
        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-sans text-[12px] tracking-[0.25em] uppercase font-light text-dark hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="hidden lg:inline-flex items-center gap-2.5 px-6 py-2.5 bg-gradient-gold text-white font-sans text-[11px] tracking-[0.25em] uppercase font-medium transition-all hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.03]"
        >
          <WhatsAppIcon className="size-4" />
          Agendar Consulta
        </a>
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-gradient-gold text-white font-sans text-[11px] tracking-[0.2em] uppercase font-medium px-3.5 py-2 shadow-sm shadow-primary/20"
          >
            <WhatsAppIcon className="size-3.5" />
            Agendar
          </a>
          <button
            onClick={() => setOpen(true)}
            className="text-dark p-1"
            aria-label="Abrir menu"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>
      <div className="gold-divider" />
      {open && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-dark/70 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-0 h-[100dvh] w-[88%] max-w-sm bg-background shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-6 h-20 sm:h-24 border-b border-primary/15 bg-background shrink-0">
              <Link to="/" className="flex items-center" onClick={() => setOpen(false)} aria-label="Dra. Lara Ganem">
                <img src={logoHorizontal} alt="Dra. Lara Ganem" className="h-12 sm:h-14 w-auto object-contain" />
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="text-dark hover:text-primary transition-colors p-1"
              >
                <X className="size-6" />
              </button>
            </div>
            <div className="gold-divider shrink-0" />
            <nav className="flex-1 flex flex-col px-8 py-6 gap-1 overflow-y-auto bg-background">
              {links.map((l, i) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="group font-serif text-[26px] leading-none text-dark hover:text-primary transition-colors py-4 border-b border-primary/10 flex items-center justify-between"
                  activeProps={{ className: "text-primary" }}
                >
                  <span>{l.label}</span>
                  <span className="font-sans text-[10px] tracking-[0.25em] text-primary/40 group-hover:text-primary transition-colors">
                    0{i + 1}
                  </span>
                </Link>
              ))}
            </nav>
            <div className="p-6 border-t border-primary/15 bg-bg-alt shrink-0">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-gold text-white font-sans text-[11px] tracking-[0.25em] uppercase font-medium shadow-lg shadow-primary/20"
              >
                <WhatsAppIcon className="size-4" />
                Agendar Consulta
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

