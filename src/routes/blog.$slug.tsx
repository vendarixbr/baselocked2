import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({ component: Post });

function Post() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    supabase.from("posts").select("*").eq("slug", slug).eq("published", true).maybeSingle().then(({ data }) => {
      setPost(data); setLoading(false);
      if (data) {
        supabase.from("posts").select("*").eq("published", true).neq("id", data.id).limit(3).then(({ data: r }) => setRelated(r ?? []));
      }
    });
  }, [slug]);

  if (loading) return <div className="pt-40 pb-24 text-center font-sans text-text-muted">Carregando...</div>;
  if (!post) return (
    <div className="pt-40 pb-24 text-center">
      <h1 className="font-serif text-4xl text-dark">Artigo não encontrado</h1>
      <Link to="/blog" className="inline-flex items-center gap-2 mt-6 text-primary text-[11px] tracking-[0.25em] uppercase"><ArrowLeft className="size-4" /> Voltar ao blog</Link>
    </div>
  );

  const date = new Date(post.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  const minutes = Math.max(2, Math.ceil((post.content?.length ?? 0) / 1000));

  return (
    <>
      <article className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-text-muted text-[11px] tracking-[0.25em] uppercase hover:text-primary"><ArrowLeft className="size-4" /> Blog</Link>
          <span className="block font-sans text-[10px] tracking-[0.3em] uppercase text-primary mt-8">{post.category}</span>
          <h1 className="font-serif text-4xl md:text-6xl text-dark mt-4 leading-tight text-balance">{post.title}</h1>
          <div className="flex items-center gap-6 mt-6 font-sans text-xs text-text-muted">
            <span className="flex items-center gap-2"><Calendar className="size-3.5" /> {date}</span>
            <span className="flex items-center gap-2"><Tag className="size-3.5" /> {minutes} min de leitura</span>
          </div>
        </div>
        {post.cover_image_url && (
          <div className="max-w-5xl mx-auto px-6 lg:px-10 mt-12">
            <img src={post.cover_image_url} alt={post.title} className="w-full aspect-[16/9] object-cover" />
          </div>
        )}
        <div className="max-w-3xl mx-auto px-6 lg:px-10 mt-12">
          <div className="prose prose-stone max-w-none font-sans font-light text-text-muted prose-headings:font-serif prose-headings:text-dark prose-headings:font-normal prose-strong:text-dark prose-a:text-primary">
            <ReactMarkdown>{post.content ?? ""}</ReactMarkdown>
          </div>
          <div className="mt-16 p-8 bg-bg-alt border-l-2 border-primary">
            <h3 className="font-serif text-2xl text-dark">Quer cuidar da sua saúde com atenção especializada?</h3>
            <p className="font-sans text-sm text-text-muted font-light mt-2">Agende sua consulta com a Dra. Lara Ganem.</p>
            <a href="https://wa.me/5537994219291" target="_blank" rel="noreferrer" className="inline-flex mt-5 px-6 py-3 bg-primary text-white text-[11px] tracking-[0.25em] uppercase">Agendar consulta</a>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-20 bg-bg-alt">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <h3 className="font-serif text-3xl text-dark mb-10">Continue lendo</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {related.map((p) => (
                <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group block">
                  <div className="aspect-[4/3] bg-gradient-to-br from-background to-accent/40 mb-4 flex items-center justify-center font-serif text-6xl text-primary/20">LG</div>
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-primary">{p.category}</span>
                  <h4 className="font-serif text-xl text-dark mt-2 group-hover:text-primary transition-colors">{p.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
