import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Heart, Sparkles, Stethoscope, Baby, Shield, Flower2, Star, Loader2, Check, Award, Users, MapPin, Clock, Phone, Navigation } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import heroPhoto from "@/assets/dra-lara-hero-framed.png";
import aboutPhoto from "@/assets/dra-lara-about.png";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import doctoraliaLogo from "@/assets/doctoralia-logo.png";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { createContactMessage } from "@/lib/contact.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/")({ component: Home });

const services = [
  { icon: Stethoscope, title: "Ginecologia Clínica", desc: "Consultas de rotina, exames preventivos e diagnóstico." },
  { icon: Baby, title: "Pré-natal", desc: "Acompanhamento completo da gestação, com afeto e técnica." },
  { icon: Sparkles, title: "Saúde Hormonal", desc: "Equilíbrio hormonal, TPM, SOP, endometriose e menopausa." },
  { icon: Heart, title: "Planejamento Reprodutivo", desc: "DIU, Implanon e orientação sobre contracepção." },
  { icon: Shield, title: "Prevenção e Rastreamento", desc: "Papanicolau, colposcopia e check-up feminino completo." },
  { icon: Flower2, title: "Saúde Íntima", desc: "Laser íntimo, ninfoplastia e cuidados com a saúde sexual." },
];

const testimonials = [
  { name: "Ana Paula M.", role: "★ Google", text: "A Dra. Lara mudou completamente minha relação com minha saúde. Ela explica tudo com paciência e me faz sentir segura a cada consulta.", photo: testimonial1 },
  { name: "Camila R.", role: "★ Doctoralia", text: "Fiz todo meu pré-natal com ela e foi uma experiência incrível. Cuidadosa, atenciosa e sempre disponível.", title: "Atendimento que acolhe", photo: testimonial2 },
  { name: "Fernanda S.", role: "★ Google", text: "Finalmente encontrei uma médica que me trata como pessoa, não como número.", photo: testimonial3 },
  { name: "Juliana T.", role: "★ Doctoralia", text: "Profissional excepcional. O consultório é lindo e o atendimento é impecável.", photo: testimonial4 },
  { name: "Mariana O.", role: "★ Google", text: "Sempre saio das consultas com clareza e tranquilidade. Recomendo de olhos fechados.", photo: testimonial5 },
];


function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [lead, setLead] = useState({ name: "", phone: "", email: "" });
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success">("idle");
  const submitLead = useServerFn(createContactMessage);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.name.trim() || !lead.phone.trim()) {
      toast.error("Por favor, preencha nome e telefone.");
      return;
    }
    setLeadStatus("loading");
    try {
      await submitLead({
        data: {
          name: lead.name.trim(),
          email: lead.email.trim(),
          phone: lead.phone.trim(),
          subject: "Consulta",
          message: "Lead enviado pelo formulário rápido da página inicial.",
        },
      });
      setLeadStatus("success");
      setLead({ name: "", phone: "", email: "" });
      toast.success("Recebemos seu contato! Entraremos em breve.");
    } catch (err) {
      setLeadStatus("idle");
      toast.error("Não foi possível enviar. Tente novamente.");
    }
  };

  useEffect(() => {
    supabase.from("posts").select("*").eq("published", true).order("created_at", { ascending: false }).limit(3).then(({ data }) => {
      if (data) setPosts(data);
    });
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[88vh] lg:min-h-screen pt-28 lg:pt-0 lg:flex items-center overflow-hidden bg-gradient-warm">
        <div className="absolute inset-0 noise opacity-70 pointer-events-none" />
        <div className="absolute right-0 top-1/4 w-[55%] h-[60%] rounded-full bg-accent/40 blur-3xl pointer-events-none" />
        <div className="absolute -left-32 bottom-0 w-[40%] h-[50%] rounded-full bg-gold-light/15 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 w-full grid lg:grid-cols-12 gap-10 lg:gap-12 items-center relative pb-16 lg:pb-0">
          <div className="lg:col-span-5 relative order-1 lg:order-1">
            <div className="absolute -left-6 top-2 bottom-2 w-px bg-primary hidden lg:block" />
            <Stagger className="space-y-5 sm:space-y-6 lg:space-y-7">
              <StaggerItem>
                <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-primary font-medium">Ginecologia Clínica & Pré-natal</span>
              </StaggerItem>
              <StaggerItem>
                <h1 className="font-serif text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-dark text-balance">
                  Cuidado especializado para <em className="text-primary not-italic font-light">cada fase</em> da sua vida
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="font-sans font-light text-text-muted text-base sm:text-lg max-w-md leading-relaxed">
                  Atendimento humanizado, diagnóstico preciso e acolhimento em cada consulta.
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
                  <a href="https://wa.me/5537994219291" target="_blank" rel="noreferrer" className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 bg-primary text-white font-sans text-[11px] tracking-[0.25em] uppercase hover:bg-primary-dark transition-all hover:shadow-xl hover:shadow-primary/25">
                    <WhatsAppIcon className="size-4" /> Agendar Consulta <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link to="/sobre" className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 border border-primary text-primary font-sans text-[11px] tracking-[0.25em] uppercase hover:bg-primary hover:text-white transition-all">
                    Conhecer a Dra. Lara
                  </Link>
                </div>
              </StaggerItem>
            </Stagger>
          </div>
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end order-2 lg:order-2">

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-[320px] sm:max-w-[440px] lg:max-w-[560px] w-full"
            >
              {/* Outer gold frame */}
              <div className="relative p-2.5 sm:p-3 md:p-4 bg-gradient-to-br from-[#f5ede0] via-background to-[#ead9bf] shadow-premium">
                {/* Inner gold border */}
                <div className="relative p-1.5 sm:p-2 border border-gold-light/70">
                  <div className="absolute inset-0 border border-primary/20 m-[3px] pointer-events-none" />
                  <img
                    src={heroPhoto}
                    alt="Dra. Lara Ganem - Ginecologista"
                    className="relative w-full h-auto object-cover"
                  />
                </div>
                {/* Corner accents */}
                <span className="absolute top-0 left-0 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-l-2 border-primary -translate-x-1 -translate-y-1" />
                <span className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-r-2 border-primary translate-x-1 -translate-y-1" />
                <span className="absolute bottom-0 left-0 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-l-2 border-primary -translate-x-1 translate-y-1" />
                <span className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-r-2 border-primary translate-x-1 translate-y-1" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Pilares de atendimento */}
      <section className="bg-gradient-cream py-16 sm:py-20 lg:py-24 border-t border-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 noise opacity-50 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-gold-light/10 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10 relative">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-primary font-medium">Por que escolher a Dra. Lara</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mt-4 leading-[1.1] text-balance">
                Um cuidado que une <em className="font-script text-primary">técnica e sensibilidade</em>
              </h2>
              <div className="mt-6 mx-auto w-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              { icon: Award, kpi: "10+", title: "Anos de experiência", desc: "Trajetória dedicada à saúde feminina, com formação contínua e atualização constante." },
              { icon: Users, kpi: "+2.000", title: "Mulheres atendidas", desc: "Pacientes que confiam na Dra. Lara em cada fase — da adolescência à menopausa." },
              { icon: MapPin, kpi: "Nova Serrana", title: "Referência regional", desc: "Consultório próprio com estrutura completa para ginecologia e pré-natal." },

            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="group relative h-full bg-background/80 backdrop-blur-sm border border-primary/10 rounded-sm p-6 sm:p-7 lg:p-8 shadow-soft hover:shadow-premium transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
                    <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-gold opacity-[0.07] blur-2xl group-hover:opacity-[0.14] transition-opacity" />
                    <div className="relative">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-accent to-bg-alt border border-primary/20 mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      </div>
                      <div className="font-serif text-2xl sm:text-3xl bg-gradient-gold bg-clip-text text-transparent leading-none mb-3">{s.kpi}</div>
                      <h3 className="font-serif text-base sm:text-lg text-dark mb-2 sm:mb-3 leading-tight">{s.title}</h3>
                      <p className="font-sans text-[13px] text-text-muted font-light leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* Quem é a Dra. Lara */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="relative max-w-md mx-auto lg:max-w-none w-full">
              <div className="absolute -inset-3 sm:-inset-4 border border-primary/40 -rotate-2" />
              <div className="relative aspect-[4/5] bg-gradient-to-br from-accent to-bg-alt -rotate-2 overflow-hidden">
                <img src={aboutPhoto} alt="Dra. Lara Ganem em seu consultório" className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-primary font-medium">Sobre a Dra. Lara</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mt-4 text-balance leading-tight">Transformando cuidado em confiança</h2>
              <div className="w-16 h-px bg-primary my-6 sm:my-8" />
              <p className="font-sans text-text-muted font-light leading-relaxed text-[15px] sm:text-base line-clamp-2 md:line-clamp-none">
                A Dra. Lara Ganem é ginecologista clínica e especialista em pré-natal, com formação sólida e dedicação integral à saúde da mulher em todas as fases da vida. Seu atendimento une precisão técnica e escuta ativa, porque acredita que toda mulher merece se sentir acolhida e informada sobre o próprio corpo.
              </p>

              <Link to="/sobre" className="inline-flex items-center gap-3 mt-7 sm:mt-8 text-primary font-sans text-[11px] tracking-[0.25em] uppercase group">
                Saiba mais sobre mim <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>


      {/* Serviços */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-cream relative overflow-hidden">
        <div className="absolute inset-0 noise opacity-50 pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-accent/30 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10 relative">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-primary font-medium">Especialidades</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mt-4">Áreas de Atuação</h2>
              <p className="font-sans text-text-muted font-light mt-4 text-sm sm:text-base">Cuidado especializado em cada etapa da sua saúde</p>
            </div>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {services.map((s, i) => (
              <StaggerItem key={i}>
                <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="group relative bg-background/80 backdrop-blur-sm p-7 sm:p-8 border border-border/60 hover:border-primary/40 transition-all shadow-soft hover:shadow-premium h-full overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-accent/30 via-transparent to-transparent pointer-events-none" />
                  <div className="relative">
                    <div className="inline-flex items-center justify-center size-12 sm:size-14 rounded-full bg-gradient-to-br from-accent to-bg-alt mb-5 sm:mb-6">
                      <s.icon className="size-6 sm:size-7 text-primary stroke-[1.25]" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-dark mb-3">{s.title}</h3>
                    <p className="font-sans text-sm text-text-muted font-light leading-relaxed">{s.desc}</p>
                    <Link to="/servicos" className="inline-flex items-center gap-2 mt-5 sm:mt-6 text-primary text-[11px] tracking-[0.25em] uppercase group-hover:gap-3 transition-all">
                      Saiba mais <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>


      {/* Depoimentos - bento collage */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-cream relative overflow-hidden">
        <div className="absolute inset-0 noise opacity-50 pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-accent/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-gold-light/20 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10 relative">
          <Reveal>
            <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-primary font-medium">Depoimentos</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mt-4 text-balance">O que dizem minhas pacientes</h2>
              <p className="font-sans text-text-muted font-light mt-4 text-sm sm:text-base">Histórias reais de mulheres que confiaram seu cuidado a mim.</p>
            </div>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-5">

            <StaggerItem className="md:col-span-2">
              <motion.div whileHover={{ y: -4 }} className="relative bg-background/90 backdrop-blur-sm p-7 rounded-2xl shadow-soft border border-border/40 h-full">
                <span className="absolute top-4 left-5 font-serif text-5xl text-primary/30 leading-none">"</span>
                <p className="font-sans text-sm text-text-muted font-light leading-relaxed pt-6">{testimonials[0].text}</p>
                <div className="mt-6 pt-5 border-t border-border/50 flex items-center gap-3">
                  <img src={testimonials[0].photo} alt={testimonials[0].name} loading="lazy" width={48} height={48} className="size-12 rounded-full object-cover shadow-soft" />
                  <div>
                    <div className="font-sans text-sm text-dark font-medium">{testimonials[0].name}</div>
                    <div className="font-sans text-[11px] text-primary tracking-wide italic">{testimonials[0].role}</div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>

            <StaggerItem className="md:col-span-2 md:row-span-2">
              <motion.div whileHover={{ y: -4 }} className="relative bg-background/90 backdrop-blur-sm p-8 rounded-2xl shadow-soft border border-border/40 h-full overflow-hidden flex flex-col justify-between min-h-[360px]">
                <div className="relative">
                  <div className="mx-auto mb-5 flex items-center justify-center h-12"><img src={doctoraliaLogo} alt="Doctoralia" loading="lazy" width={180} height={48} className="h-10 w-auto object-contain" /></div>
                  <div className="flex justify-center gap-1 mb-4">{[...Array(5)].map((_, k) => <Star key={k} className="size-4 fill-gold-light text-gold-light" />)}</div>
                  <h3 className="font-serif text-2xl md:text-3xl text-center text-balance leading-tight text-dark">{testimonials[1].title}</h3>
                  <p className="font-sans text-sm text-text-muted font-light leading-relaxed mt-5 text-center">{testimonials[1].text}</p>
                </div>
                <div className="relative flex items-center justify-center gap-3 mt-6 pt-5 border-t border-border/50">
                  <img src={testimonials[1].photo} alt={testimonials[1].name} loading="lazy" width={48} height={48} className="size-12 rounded-full object-cover shadow-soft" />
                  <div className="text-left">
                    <div className="font-sans text-sm text-dark font-medium">{testimonials[1].name}</div>
                    <div className="font-sans text-[11px] text-primary tracking-wide mt-0.5 italic">{testimonials[1].role}</div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>


            <StaggerItem className="md:col-span-2">
              <motion.div whileHover={{ y: -4 }} className="relative bg-background/90 backdrop-blur-sm p-7 rounded-2xl shadow-soft border border-border/40 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <img src={testimonials[2].photo} alt={testimonials[2].name} loading="lazy" width={48} height={48} className="size-12 rounded-full object-cover shadow-soft" />
                  <div>
                    <div className="font-sans text-sm text-dark font-medium">{testimonials[2].name}</div>
                    <div className="font-sans text-[11px] text-primary tracking-wide italic">{testimonials[2].role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">{[...Array(5)].map((_, k) => <Star key={k} className="size-3.5 fill-gold-light text-gold-light" />)}</div>
                <p className="font-sans text-sm text-text-muted font-light leading-relaxed italic">"{testimonials[2].text}"</p>
              </motion.div>
            </StaggerItem>

            <StaggerItem className="md:col-span-2">
              <motion.div whileHover={{ y: -4 }} className="relative bg-gradient-warm p-7 rounded-2xl shadow-soft border border-primary/15 h-full overflow-hidden">
                <div className="absolute inset-0 noise opacity-60 pointer-events-none" />
                <div className="relative">
                  <span className="font-serif text-4xl bg-gradient-gold bg-clip-text text-transparent leading-none">"</span>
                  <p className="font-sans text-sm text-dark/80 font-light leading-relaxed mt-2">{testimonials[3].text}</p>
                  <div className="mt-5 flex items-center gap-3">
                    <img src={testimonials[3].photo} alt={testimonials[3].name} loading="lazy" width={40} height={40} className="size-10 rounded-full object-cover shadow-soft" />
                    <div>
                      <div className="font-sans text-sm text-dark font-medium">{testimonials[3].name}</div>
                      <div className="font-sans text-[11px] text-primary tracking-wide italic">{testimonials[3].role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>

            <StaggerItem className="md:col-span-2">
              <motion.div whileHover={{ y: -4 }} className="relative bg-background/90 backdrop-blur-sm p-7 rounded-2xl shadow-soft border border-border/40 h-full">
                <p className="font-serif text-lg text-dark/90 italic leading-relaxed text-balance">"{testimonials[4].text}"</p>
                <div className="mt-6 pt-5 border-t border-border/50 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-sans text-sm text-dark font-medium">{testimonials[4].name}</div>
                    <div className="font-sans text-[11px] text-primary tracking-wide italic">{testimonials[4].role}</div>
                  </div>
                  <img src={testimonials[4].photo} alt={testimonials[4].name} loading="lazy" width={48} height={48} className="size-12 rounded-full object-cover shadow-soft" />
                </div>
              </motion.div>
            </StaggerItem>
          </Stagger>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-14">
              <div className="flex -space-x-3">
                {testimonials.slice(0, 4).map((tt, i) => (
                  <img key={i} src={tt.photo} alt={tt.name} loading="lazy" width={40} height={40} className="size-10 rounded-full border-2 border-background object-cover shadow-soft" />
                ))}
              </div>
              <div className="flex gap-1">{[...Array(5)].map((_, k) => <Star key={k} className="size-4 fill-gold-light text-gold-light" />)}</div>
              <span className="font-sans text-sm text-text-muted">+ centenas de pacientes atendidas</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Localização */}
      <section className="py-16 sm:py-20 lg:py-28 bg-bg-alt/30">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-primary font-medium">Onde estamos</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mt-4 text-balance">Venha nos visitar em Nova Serrana</h2>
              <div className="w-12 h-px bg-primary mx-auto my-6" />
              <p className="font-sans font-light text-text-muted text-[15px] sm:text-base leading-relaxed">
                Consultório próprio com estrutura completa, ambiente acolhedor e fácil acesso no centro da cidade.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative max-w-4xl mx-auto bg-background rounded-md border border-primary/25 shadow-soft overflow-hidden">
              {/* Badge */}
              <div className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 px-3.5 py-1.5 bg-background/95 backdrop-blur-sm border border-primary/30 rounded-full shadow-sm">
                <MapPin className="size-3.5 text-primary" />
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-primary font-medium">Consultório</span>
              </div>

              {/* Mapa */}
              <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[380px] border-b border-primary/15">
                <iframe
                  title="Localização do consultório da Dra. Lara Ganem"
                  src="https://www.google.com/maps?q=Edif%C3%ADcio+Camel+R.+Corn%C3%A9lio+Benfica+63+Nova+Serrana+MG&output=embed"
                  className="w-full h-full grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Info */}
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-dark leading-tight">Edifício Camel</h3>
                    <p className="font-sans text-[13px] text-text-muted mt-1.5">Nova Serrana — MG</p>
                  </div>
                  <div className="flex gap-2.5">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Edif%C3%ADcio+Camel+R.+Corn%C3%A9lio+Benfica+63+Nova+Serrana+MG"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-gold text-white font-sans text-[10px] tracking-[0.25em] uppercase rounded-sm transition-all hover:shadow-lg hover:shadow-primary/30"
                    >
                      <Navigation className="size-3.5" /> Como chegar
                    </a>
                    <a
                      href="https://wa.me/5537994219291"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 border border-primary/40 text-primary font-sans text-[10px] tracking-[0.25em] uppercase rounded-sm transition-all hover:bg-primary hover:text-white"
                    >
                      <WhatsAppIcon className="size-3.5" /> Agendar
                    </a>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 pt-6 border-t border-primary/15 font-sans text-[13.5px] text-text-muted font-light">
                  <div className="flex gap-3">
                    <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">R. Cornélio Benfica, 63<br />Sala 1101 / 1102<br />Jardim do Lago</span>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="size-4 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Seg a Sex — 08h às 18h<br />Sábados — 08h às 12h</span>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="size-4 text-primary shrink-0 mt-0.5" />
                    <a href="https://wa.me/5537994219291" className="leading-relaxed hover:text-primary transition-colors">(37) 99421-9291</a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>



      {/* CTA Final */}
      <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-gradient-dark">
        <div className="absolute inset-0 noise-dark opacity-70" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-1 bg-gradient-to-r from-transparent via-gold-light/60 to-transparent" />
        <div className="absolute -top-32 -left-20 w-[28rem] h-[28rem] rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] rounded-full bg-gold-light/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Texto */}
          <Reveal>
            <div className="text-white">
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold-light/90 font-medium">Vamos conversar</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-balance leading-[1.05] mt-5">
                Sua saúde merece{" "}
                <em className="not-italic bg-gradient-gold bg-clip-text text-transparent">atenção especializada</em>
              </h2>
              <p className="font-sans font-light text-white/70 mt-5 sm:mt-6 max-w-md leading-relaxed text-[15px] sm:text-base">
                Deixe seu contato e nossa equipe retorna em poucas horas para agendar sua consulta — ou fale agora mesmo no WhatsApp.
              </p>
              <a href="https://wa.me/5537994219291" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 mt-7 sm:mt-8 px-7 sm:px-8 py-3.5 bg-gradient-gold text-white font-sans text-[11px] tracking-[0.3em] uppercase transition-all hover:shadow-2xl hover:shadow-primary/40 hover:scale-[1.02] rounded-sm">
                <WhatsAppIcon className="size-4" /> Agendar pelo WhatsApp <ArrowRight className="size-4" />
              </a>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-4 border border-gold-light/20 rounded-2xl -rotate-1 hidden md:block" />
              <form
                onSubmit={handleLeadSubmit}
                className="relative bg-background/95 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl shadow-premium border border-white/10"
              >

                <div className="mb-6">
                  <h3 className="font-serif text-2xl text-dark">Receba um retorno</h3>
                  <p className="font-sans text-sm text-text-muted font-light mt-1">Preencha e entramos em contato.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="font-sans text-[11px] tracking-[0.2em] uppercase text-text-muted block mb-2">Nome*</label>
                    <input
                      type="text"
                      required
                      value={lead.name}
                      onChange={(e) => setLead({ ...lead, name: e.target.value })}
                      className="w-full bg-bg-alt/40 border border-border/60 px-4 py-3 text-sm font-sans text-dark focus:outline-none focus:border-primary transition-colors rounded-sm"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-[11px] tracking-[0.2em] uppercase text-text-muted block mb-2">Telefone*</label>
                    <input
                      type="tel"
                      required
                      value={lead.phone}
                      onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                      className="w-full bg-bg-alt/40 border border-border/60 px-4 py-3 text-sm font-sans text-dark focus:outline-none focus:border-primary transition-colors rounded-sm"
                      placeholder="(37) 99999-9999"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-[11px] tracking-[0.2em] uppercase text-text-muted block mb-2">E-mail</label>
                    <input
                      type="email"
                      value={lead.email}
                      onChange={(e) => setLead({ ...lead, email: e.target.value })}
                      className="w-full bg-bg-alt/40 border border-border/60 px-4 py-3 text-sm font-sans text-dark focus:outline-none focus:border-primary transition-colors rounded-sm"
                      placeholder="voce@email.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={leadStatus === "loading" || leadStatus === "success"}
                  className="w-full mt-7 inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-gold text-white font-sans text-[11px] tracking-[0.3em] uppercase transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed rounded-sm"
                >
                  {leadStatus === "loading" && <><Loader2 className="size-4 animate-spin" /> Enviando</>}
                  {leadStatus === "success" && <><Check className="size-4" /> Contato recebido</>}
                  {leadStatus === "idle" && <>Quero ser contatada <ArrowRight className="size-4" /></>}
                </button>

                <p className="font-sans text-[11px] text-text-muted text-center mt-4 font-light">Seus dados são tratados com sigilo.</p>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
