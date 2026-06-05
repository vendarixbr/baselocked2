import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { MapPin, Phone, Instagram, Clock, Send, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/contato")({
  component: Contato,
  head: () => ({ meta: [{ title: "Contato | Dra. Lara Ganem" }, { name: "description", content: "Entre em contato com a Dra. Lara Ganem em Nova Serrana - MG. WhatsApp, endereço e formulário online." }] }),
});

function Contato() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "Consulta", message: "" });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.message) { toast.error("Preencha nome e mensagem."); return; }
    setLoading(true);
    const { error } = await supabase.from("contacts").insert([form]);
    setLoading(false);
    if (error) { toast.error("Erro ao enviar. Tente pelo WhatsApp."); return; }
    toast.success("Mensagem enviada! Retornaremos em breve.");
    setForm({ name: "", email: "", phone: "", subject: "Consulta", message: "" });
  }

  return (
    <>
      <PageHero
        title="Vamos conversar"
        breadcrumb="Início · Contato"
        eyebrow="Estamos aqui por você"
        subtitle="Agende sua consulta, tire dúvidas ou converse pelo WhatsApp — atendemos com agilidade e cuidado."
      />

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-3xl text-dark">Informações</h2>
            <div className="w-12 h-px bg-primary my-6" />
            <ul className="space-y-6 font-sans font-light text-text-muted">
              <li className="flex gap-4"><MapPin className="size-5 text-primary mt-1 shrink-0" /><span>Edifício Camel — R. Cornélio Benfica, 63<br/>Sala 1101/1102 — Jardim do Lago<br/>Nova Serrana - MG, 35522-024</span></li>
              <li className="flex gap-4"><WhatsAppIcon className="size-5 text-[#25D366] mt-1 shrink-0" /><a href="https://wa.me/5537994219291" target="_blank" rel="noreferrer" className="hover:text-primary">(37) 99421-9291 — WhatsApp</a></li>
              <li className="flex gap-4"><Instagram className="size-5 text-primary mt-1 shrink-0" /><a href="https://www.instagram.com/dralaraganem.gineco/" target="_blank" rel="noreferrer" className="hover:text-primary">@dralaraganem.gineco</a></li>
              <li className="flex gap-4"><Clock className="size-5 text-primary mt-1 shrink-0" /><span>Segunda a Sexta: 08h às 18h<br/>Sábados: 08h às 12h</span></li>
            </ul>
            <a
              href="https://wa.me/5537994219291"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-3 px-7 py-3.5 bg-[#25D366] text-white font-sans text-[11px] tracking-[0.25em] uppercase transition-all hover:bg-[#1ebe5d] hover:shadow-xl hover:shadow-emerald-900/20 hover:scale-[1.02]"
            >
              <WhatsAppIcon className="size-4" /> Falar agora <ArrowRight className="size-4" />
            </a>
            <div className="mt-10 aspect-[4/3] overflow-hidden border border-border">
              <iframe
                title="Mapa do consultório"
                src="https://www.google.com/maps?q=R.+Corn%C3%A9lio+Benfica,+63,+Nova+Serrana+-+MG&output=embed"
                className="w-full h-full grayscale"
                loading="lazy"
              />
            </div>
          </div>
          <form onSubmit={submit} className="relative bg-gradient-cream p-8 lg:p-12 border-t-2 border-primary shadow-soft overflow-hidden">
            <div className="absolute inset-0 noise opacity-40 pointer-events-none" />
            <div className="relative">
            <h2 className="font-serif text-3xl text-dark">Envie uma mensagem</h2>
            <div className="w-12 h-px bg-primary my-6" />
            <div className="space-y-5">
              {[
                { k: "name", label: "Nome completo *", type: "text" },
                { k: "email", label: "E-mail", type: "email" },
                { k: "phone", label: "Telefone", type: "tel" },
              ].map((f) => (
                <div key={f.k}>
                  <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-text-muted mb-2">{f.label}</label>
                  <input
                    type={f.type}
                    value={(form as any)[f.k]}
                    onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                    className="w-full bg-background border border-border px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-text-muted mb-2">Assunto</label>
                <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full bg-background border border-border px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary">
                  {["Consulta", "Pré-natal", "Dúvida", "Outro"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-text-muted mb-2">Mensagem *</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-gold text-white font-sans text-[11px] tracking-[0.25em] uppercase transition-all hover:shadow-xl hover:shadow-primary/30 disabled:opacity-60">
                <Send className="size-4" /> {loading ? "Enviando..." : "Enviar mensagem"}
              </button>
            </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
