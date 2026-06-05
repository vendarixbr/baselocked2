import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Phone, Clock } from "lucide-react";
import logoStacked from "@/assets/logo-stacked.png";

export function Footer() {
  return (
    <footer className="bg-gradient-footer text-white relative overflow-hidden">

      <div className="absolute inset-0 noise-dark opacity-60 pointer-events-none" />
      <div className="gold-divider relative" />

      {/* Brand */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 sm:pt-20 pb-10 flex flex-col items-center text-center">
        <div className="bg-background/95 rounded-md px-3 py-2 sm:px-4 sm:py-2.5 shadow-xl shadow-black/30 border border-primary/20">
          <img
            src={logoStacked}
            alt="Dra. Lara Ganem — Ginecologia e Obstetrícia"
            className="h-24 sm:h-28 w-auto object-contain"
          />
        </div>
        <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary/90 font-medium mt-6">
          CRM MG 90916 · RQE 54639
        </p>
        <div className="w-12 h-px bg-primary/50 mt-6" />
      </div>

      {/* Columns */}
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 pb-16 grid sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12">
        <div>
          <h4 className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary font-medium mb-5">Navegação</h4>
          <ul className="space-y-3 font-sans text-sm text-white/70 font-light">
            {[
              ["/", "Home"],
              ["/sobre", "Sobre"],
              ["/servicos", "Serviços"],
              ["/blog", "Blog"],
              ["/contato", "Contato"],
            ].map(([to, l]) => (
              <li key={to}><Link to={to} className="hover:text-primary transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary font-medium mb-5">Consultório</h4>
          <ul className="space-y-4 font-sans text-sm text-white/70 font-light">
            <li className="flex gap-3"><MapPin className="size-4 mt-0.5 text-primary shrink-0" /><span className="leading-relaxed">Edifício Camel<br/>R. Cornélio Benfica, 63 — sala 1101/1102<br/>Jardim do Lago, Nova Serrana — MG</span></li>
            <li className="flex gap-3"><Clock className="size-4 mt-0.5 text-primary shrink-0" /><span className="leading-relaxed">Seg a Sex — 08h às 18h<br/>Sábados — 08h às 12h</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary font-medium mb-5">Contato</h4>
          <ul className="space-y-4 font-sans text-sm text-white/70 font-light">
            <li className="flex gap-3"><Phone className="size-4 mt-0.5 text-primary shrink-0" /><a href="https://wa.me/5537994219291" className="hover:text-primary transition-colors">(37) 99421-9291</a></li>
            <li className="flex gap-3"><Instagram className="size-4 mt-0.5 text-primary shrink-0" /><a href="https://www.instagram.com/dralaraganem.gineco/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">@dralaraganem.gineco</a></li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1.5">
            <p className="font-sans text-[11px] tracking-[0.18em] uppercase text-white/55 font-light">
              © {new Date().getFullYear()} Dra. Lara Ganem — Todos os direitos reservados
            </p>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-primary/70 font-light">
              CRM MG 90916 · RQE 54639 · Ginecologia &amp; Obstetrícia
            </p>
          </div>
          <div className="space-y-1.5 sm:text-right">
            <p className="font-serif italic text-[14px] text-primary/90 leading-snug">
              Saúde feminina com técnica e cuidado.
            </p>
            <a
              href="https://www.instagram.com/dralaraganem.gineco/"
              target="_blank"
              rel="noreferrer"
              className="inline-block font-sans text-[11px] tracking-[0.2em] text-white/55 hover:text-primary transition-colors"
            >
              @dralaraganem.gineco
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

