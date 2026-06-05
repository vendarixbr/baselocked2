import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  component: Blog,
  head: () => ({ meta: [{ title: "Blog | Dra. Lara Ganem" }, { name: "description", content: "Conteúdos sobre saúde feminina, ginecologia, pré-natal e bem-estar." }] }),
});

function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("posts").select("*").eq("published", true).order("created_at", { ascending: false }).then(({ data }) => {
      setPosts(data ?? []); setLoading(false);
    });
  }, []);

  return (
    <>
      <PageHero title="Blog" breadcrumb="Início · Blog" subtitle="Conteúdo sobre saúde feminina, escrito com carinho e técnica." />
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <div key={i} className="aspect-[4/3] bg-bg-alt animate-pulse" />)}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 0.08}>
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block">
                    <div className="aspect-[4/3] bg-gradient-to-br from-bg-alt to-accent/40 mb-5 overflow-hidden">
                      {p.cover_image_url ? <img src={p.cover_image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> : <div className="w-full h-full flex items-center justify-center font-serif text-7xl text-primary/20">LG</div>}
                    </div>
                    <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-primary">{p.category}</span>
                    <h2 className="font-serif text-2xl text-dark mt-3 leading-tight group-hover:text-primary transition-colors">{p.title}</h2>
                    <p className="font-sans text-sm text-text-muted font-light mt-3 line-clamp-2">{p.summary}</p>
                    <div className="inline-flex items-center gap-2 mt-4 text-primary text-[11px] tracking-[0.25em] uppercase">Ler artigo <ArrowRight className="size-3" /></div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
