import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getService, services, type Service } from "@/data/services";

export const Route = createFileRoute("/servicos/$slug")({
  component: ServiceDetail,
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Serviço | Dra. Lara Ganem" }] };
    return {
      meta: [
        { title: `${s.title} | Dra. Lara Ganem` },
        { name: "description", content: s.desc },
        { property: "og:title", content: `${s.title} | Dra. Lara Ganem` },
        { property: "og:description", content: s.desc },
        { property: "og:image", content: s.image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-serif text-4xl text-dark">Serviço não encontrado</h1>
      <Link to="/servicos" className="mt-6 font-sans text-[11px] tracking-[0.25em] uppercase text-primary inline-flex items-center gap-2">
        <ArrowLeft className="size-4" /> Ver todos os serviços
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-[60vh] flex items-center justify-center px-6 text-center">
      <p className="text-text-muted">Não foi possível carregar este serviço. {error.message}</p>
    </div>
  ),
});

function ServiceDetail() {
  const { service: s } = Route.useLoaderData();
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-24 bg-gradient-warm">
        <div className="absolute inset-0 noise opacity-60 pointer-events-none" />
        <div className="absolute -top-32 -right-24 w-[32rem] h-[32rem] rounded-full bg-accent/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-24 w-[34rem] h-[34rem] rounded-full bg-gold-light/15 blur-3xl pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 font-sans text-[10.5px] tracking-[0.32em] uppercase text-text-muted font-light"
            >
              <Link to="/" className="hover:text-primary transition-colors">Início</Link>
              <span aria-hidden className="text-primary/50">—</span>
              <Link to="/servicos" className="hover:text-primary transition-colors">Serviços</Link>
              <span aria-hidden className="text-primary/50">—</span>
              <span className="text-primary">{s.title}</span>
            </nav>
            <p className="mt-5 font-script italic text-primary text-xl md:text-2xl">Especialidade</p>
            <h1 className="mt-3 font-serif text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl text-dark leading-[1.02] tracking-[-0.03em] text-balance">
              {s.title}
            </h1>
            <p className="mt-7 font-sans font-light text-text-muted text-lg max-w-xl leading-relaxed">
              {s.tagline}
            </p>
            <div className="mt-10 flex items-center gap-3" aria-hidden>
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
              <span className="size-1.5 rotate-45 bg-primary" />
              <span className="h-px w-24 bg-gradient-to-r from-primary to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-4 border border-primary/30" />
              <div className="absolute -bottom-6 -right-6 size-24 border border-primary/40 bg-gradient-cream hidden md:block" />
              <img
                src={s.image}
                alt={s.title}
                width={1024}
                height={1280}
                className="relative w-full aspect-[4/5] object-cover shadow-xl"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-24 bg-background relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3">
            <Reveal>
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary">Sobre o serviço</span>
              <p className="font-serif text-2xl md:text-3xl text-dark leading-snug mt-4 text-balance">{s.intro}</p>
              <p className="font-sans font-light text-text-muted leading-relaxed mt-6">{s.desc}</p>

              <h2 className="font-serif text-3xl text-dark mt-14 mb-6">Perguntas frequentes</h2>
              <Accordion type="single" collapsible className="space-y-3">
                {s.faqs.map((f: Service["faqs"][number], i: number) => (
                  <AccordionItem key={i} value={`f-${i}`} className="border border-border/70 bg-gradient-cream px-5 data-[state=open]:border-primary/40 transition-all">
                    <AccordionTrigger className="font-serif text-lg text-dark hover:text-primary hover:no-underline py-4 text-left">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans font-light text-text-muted leading-relaxed pb-5">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <Reveal delay={0.1}>
              <div className="bg-gradient-cream border border-border/70 p-8 lg:p-10 sticky top-28">
                <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary">O que inclui</span>
                <ul className="mt-6 space-y-4">
                  {s.highlights.map((h: string, i: number) => (
                    <li key={i} className="flex gap-3 font-sans font-light text-dark/90">
                      <Check className="size-5 text-primary shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/5537994219291"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-gold text-white font-sans text-[11px] tracking-[0.25em] uppercase transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  <WhatsAppIcon className="size-4" /> Agendar consulta <ArrowRight className="size-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Outros serviços */}
      <section className="py-20 bg-gradient-cream relative overflow-hidden">
        <div className="absolute inset-0 noise opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-dark">Outros serviços</h2>
            <Link to="/servicos" className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary inline-flex items-center gap-2">
              Ver todos <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/servicos/$slug"
                params={{ slug: o.slug }}
                className="group block bg-background/80 border border-border/70 hover:border-primary/40 transition-all hover:shadow-elegant overflow-hidden"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={o.image}
                    alt={o.title}
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-dark group-hover:text-primary transition-colors">{o.title}</h3>
                  <p className="font-sans font-light text-text-muted text-sm mt-2 line-clamp-2">{o.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
