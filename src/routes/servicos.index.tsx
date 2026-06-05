import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { services } from "@/data/services";

export const Route = createFileRoute("/servicos/")({
  component: Servicos,
  head: () => ({
    meta: [
      { title: "Serviços | Dra. Lara Ganem" },
      { name: "description", content: "Ginecologia, pré-natal, saúde hormonal, planejamento reprodutivo e mais. Conheça os serviços da Dra. Lara Ganem." },
    ],
  }),
});

function Servicos() {
  return (
    <>
      <PageHero
        title="Serviços & Especialidades"
        breadcrumb="Início · Serviços"
        eyebrow="Cuidado dedicado"
        subtitle="Acompanhamento especializado para a saúde da mulher em cada fase da vida — da adolescência à maturidade."
      />

      <section className="py-24 bg-gradient-cream relative overflow-hidden">
        <div className="absolute inset-0 noise opacity-50 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06}>
                <Link
                  to="/servicos/$slug"
                  params={{ slug: s.slug }}
                  className="group block bg-background/80 backdrop-blur-sm border border-border/70 hover:border-primary/40 transition-all hover:shadow-elegant overflow-hidden h-full"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      width={1024}
                      height={1280}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/10 to-transparent" />
                    <span className="absolute top-5 left-5 font-sans text-[10px] tracking-[0.3em] uppercase text-white/90 bg-dark/30 backdrop-blur-sm px-3 py-1.5">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="p-7 lg:p-8">
                    <h3 className="font-serif text-2xl text-dark group-hover:text-primary transition-colors">
                      {s.title}
                    </h3>
                    <p className="font-sans font-light text-text-muted text-sm leading-relaxed mt-3 line-clamp-3">
                      {s.desc}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.25em] uppercase text-primary">
                      Saber mais
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-rose text-white relative overflow-hidden">
        <div className="absolute inset-0 noise-dark opacity-60 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative">
          <div>
            <h3 className="font-serif text-3xl md:text-4xl text-balance">Não encontrou o que procurava?</h3>
            <p className="font-sans font-light text-white/80 mt-2">Entre em contato e vamos conversar.</p>
          </div>
          <a
            href="https://wa.me/5537994219291"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-gold text-white font-sans text-[11px] tracking-[0.25em] uppercase transition-all hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02] shrink-0"
          >
            <WhatsAppIcon className="size-4" /> Falar no WhatsApp <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
    </>
  );
}
