import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import heroPhoto from "@/assets/dra-lara-hero.png";
import { Heart, Award, Shield, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export const Route = createFileRoute("/sobre")({
  component: Sobre,
  head: () => ({ meta: [{ title: "Sobre | Dra. Lara Ganem" }, { name: "description", content: "Conheça a Dra. Lara Ganem, ginecologista clínica e especialista em pré-natal em Nova Serrana - MG." }] }),
});

const formacao = [
  "Graduação em Medicina",
  "Residência em Ginecologia e Obstetrícia",
  "Especialização em Ginecologia Clínica",
  "Especialista em Pré-natal de Baixo e Alto Risco",
];

const valores = [
  { icon: Heart, title: "Humanização", desc: "Cada paciente é única. Ouço com atenção e explico com clareza." },
  { icon: Award, title: "Excelência", desc: "Atualização constante para oferecer o que há de melhor em ginecologia." },
  { icon: Shield, title: "Confiança", desc: "Um espaço seguro para você cuidar de si com tranquilidade." },
];

function Sobre() {
  return (
    <>
      <PageHero
        title="Sobre a Dra. Lara Ganem"
        breadcrumb="Início · Sobre"
        eyebrow="Cuidar é uma arte"
        subtitle="Ginecologia clínica e pré-natal com escuta, técnica e acolhimento — em cada fase da sua vida."
      />

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 border border-primary/40" />
              <img src={heroPhoto} alt="Dra. Lara Ganem" className="relative w-full aspect-[4/5] object-cover shadow-xl" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary">Apresentação</span>
              <h2 className="font-serif text-4xl md:text-5xl text-dark mt-4 text-balance leading-tight">Muito prazer, eu sou a Dra. Lara Ganem</h2>
              <div className="w-16 h-px bg-primary my-8" />
              <div className="space-y-5 font-sans font-light text-text-muted leading-relaxed">
                <p>Sou ginecologista clínica e especialista em pré-natal, apaixonada pela saúde da mulher em todas as suas fases. Acredito que o verdadeiro cuidado começa pela escuta — quando a paciente se sente ouvida, acolhida e respeitada.</p>
                <p>Atuo em Nova Serrana - MG, no Núcleo LV, com uma proposta de atendimento que une rigor técnico e humanização. Cada consulta é um espaço seguro para você falar sobre seu corpo, suas dúvidas e suas necessidades.</p>
                <p>Minha missão é transformar cuidado em confiança — e te acompanhar em cada etapa da sua saúde feminina com dedicação e excelência.</p>
              </div>
              <p className="font-sans text-xs tracking-[0.25em] uppercase text-primary mt-8">CRM MG 90916 · RQE 54639</p>
              <a href="https://wa.me/5537994219291" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 mt-8 px-8 py-3.5 bg-gradient-gold text-white font-sans text-[11px] tracking-[0.25em] uppercase transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]">
                <WhatsAppIcon className="size-4" /> Agendar minha consulta <ArrowRight className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-gradient-cream relative overflow-hidden">
        <div className="absolute inset-0 noise opacity-50 pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-accent/30 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 lg:px-10 relative">
          <Reveal>
            <div className="text-center mb-16">
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary">Trajetória</span>
              <h2 className="font-serif text-4xl md:text-5xl text-dark mt-4">Formação & Especialidades</h2>
            </div>
          </Reveal>
          <div className="relative pl-8 border-l border-primary/30 space-y-10">
            {formacao.map((f, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="relative">
                  <div className="absolute -left-[37px] top-2 size-3 rounded-full bg-primary ring-4 ring-bg-alt" />
                  <h3 className="font-serif text-2xl text-dark">{f}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid md:grid-cols-3 gap-10">
          {valores.map((v, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-center">
                <v.icon className="size-10 text-primary mx-auto stroke-[1.25]" />
                <h3 className="font-serif text-2xl text-dark mt-6">{v.title}</h3>
                <p className="font-sans text-sm text-text-muted font-light mt-3 leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
