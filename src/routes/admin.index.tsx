import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";
import { FileText, Inbox, Settings as SettingsIcon, LogOut, Plus, Trash2, Edit3, Mail, Phone, Check } from "lucide-react";
import { getAdminData, removeAdminPost, setContactRead, updateAdminSettings, upsertAdminPost } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/")({ component: Admin });

type Tab = "dashboard" | "posts" | "contacts" | "settings";

function slugify(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [posts, setPosts] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState<any | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const getAdminDataFn = useServerFn(getAdminData);
  const upsertAdminPostFn = useServerFn(upsertAdminPost);
  const removeAdminPostFn = useServerFn(removeAdminPost);
  const setContactReadFn = useServerFn(setContactRead);
  const updateAdminSettingsFn = useServerFn(updateAdminSettings);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) { navigate({ to: "/admin/login" }); return; }
      setUser(session.user);
      setIsAdmin(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) { navigate({ to: "/admin/login" }); return; }
      setUser(data.session.user);
      setIsAdmin(true);
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function loadAll() {
    try {
      const { posts, contacts, settings: rows } = await getAdminDataFn();
      setPosts(posts ?? []);
      setContacts(contacts ?? []);
    const map: Record<string, string> = {};
      (rows ?? []).forEach((r: any) => { map[r.key] = r.value ?? ""; });
    setSettings(map);
    } catch {
      setIsAdmin(false);
    }
  }

  useEffect(() => { if (isAdmin) loadAll(); }, [isAdmin]);

  if (isAdmin === null) return <div className="min-h-screen flex items-center justify-center font-sans text-text-muted">Carregando...</div>;
  if (isAdmin === false) return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-dark">Acesso restrito</h1>
        <p className="font-sans text-sm text-text-muted mt-3 font-light">Você está logado como <strong>{user?.email}</strong>, mas não possui permissão de administrador. Solicite o acesso ao gestor do site.</p>
        <button onClick={() => supabase.auth.signOut()} className="mt-6 px-6 py-3 border border-primary text-primary text-[11px] tracking-[0.25em] uppercase">Sair</button>
      </div>
    </div>
  );

  const unread = contacts.filter((c) => !c.read).length;
  const published = posts.filter((p) => p.published).length;
  const drafts = posts.length - published;

  async function savePost(p: any) {
    const payload = { ...p, slug: p.slug || slugify(p.title) };
    try {
      await upsertAdminPostFn({ data: payload });
    } catch (error: any) {
      return toast.error(error?.message ?? "Erro ao salvar post");
    }
    toast.success("Post salvo");
    setEditing(null); loadAll();
  }
  async function delPost(id: string) {
    if (!confirm("Excluir este post?")) return;
    try {
      await removeAdminPostFn({ data: { id } });
    } catch (error: any) {
      return toast.error(error?.message ?? "Erro ao excluir post");
    }
    toast.success("Excluído"); loadAll();
  }
  async function markRead(id: string, read: boolean) {
    await setContactReadFn({ data: { id, read } });
    loadAll();
  }
  async function saveSettings() {
    await updateAdminSettingsFn({ data: { settings } });
    toast.success("Configurações salvas");
  }

  return (
    <div className="min-h-screen bg-bg-alt flex">
      <aside className="w-64 bg-dark text-white p-6 flex flex-col">
        <div className="text-primary"><Logo variant="stacked" /></div>
        <nav className="mt-12 flex-1 space-y-1">
          {([
            ["dashboard", "Dashboard", FileText],
            ["posts", "Posts", FileText],
            ["contacts", "Contatos", Inbox],
            ["settings", "Configurações", SettingsIcon],
          ] as const).map(([k, l, Icon]) => (
            <button key={k} onClick={() => setTab(k)} className={`w-full flex items-center gap-3 px-4 py-3 text-left font-sans text-xs tracking-[0.2em] uppercase transition-colors ${tab === k ? "bg-primary text-white" : "text-white/70 hover:bg-white/5"}`}>
              <Icon className="size-4" /> {l}
            </button>
          ))}
        </nav>
        <Link to="/" className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50 hover:text-white py-3">← Ver site</Link>
        <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-2 font-sans text-[10px] tracking-[0.3em] uppercase text-white/50 hover:text-white py-3">
          <LogOut className="size-3.5" /> Sair
        </button>
      </aside>

      <main className="flex-1 p-10 overflow-auto">
        {tab === "dashboard" && (
          <>
            <h1 className="font-serif text-4xl text-dark">Bem-vinda, Dra. Lara</h1>
            <div className="grid md:grid-cols-4 gap-6 mt-10">
              {[
                { kpi: contacts.length, l: "Contatos recebidos" },
                { kpi: unread, l: "Não lidos" },
                { kpi: published, l: "Posts publicados" },
                { kpi: drafts, l: "Rascunhos" },
              ].map((s, i) => (
                <div key={i} className="bg-background p-6 border-l-2 border-primary">
                  <div className="font-serif text-4xl text-primary">{s.kpi}</div>
                  <div className="font-sans text-xs text-text-muted mt-2 tracking-wide">{s.l}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "posts" && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-serif text-4xl text-dark">Posts</h1>
              <button onClick={() => setEditing({ title: "", slug: "", category: "", summary: "", content: "", cover_image_url: "", published: false })} className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white text-[11px] tracking-[0.25em] uppercase"><Plus className="size-4" /> Novo post</button>
            </div>
            <div className="bg-background border">
              {posts.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-4 px-6 py-4 border-b last:border-0">
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-lg text-dark truncate">{p.title}</div>
                    <div className="font-sans text-xs text-text-muted mt-1">{p.category} · {new Date(p.created_at).toLocaleDateString("pt-BR")}</div>
                  </div>
                  <span className={`font-sans text-[10px] tracking-[0.2em] uppercase px-3 py-1 ${p.published ? "bg-primary/10 text-primary" : "bg-bg-alt text-text-muted"}`}>{p.published ? "Publicado" : "Rascunho"}</span>
                  <button onClick={() => setEditing(p)} className="p-2 text-text-muted hover:text-primary"><Edit3 className="size-4" /></button>
                  <button onClick={() => delPost(p.id)} className="p-2 text-text-muted hover:text-destructive"><Trash2 className="size-4" /></button>
                </div>
              ))}
              {posts.length === 0 && <div className="p-10 text-center font-sans text-sm text-text-muted">Nenhum post ainda.</div>}
            </div>

            {editing && (
              <div className="fixed inset-0 z-50 bg-dark/50 flex items-start justify-center overflow-auto p-6" onClick={() => setEditing(null)}>
                <div className="bg-background w-full max-w-3xl my-12 p-8 border-t-2 border-primary" onClick={(e) => e.stopPropagation()}>
                  <h2 className="font-serif text-3xl text-dark mb-6">{editing.id ? "Editar post" : "Novo post"}</h2>
                  <div className="space-y-4">
                    {[
                      ["title", "Título"],
                      ["slug", "Slug (URL)"],
                      ["category", "Categoria"],
                      ["summary", "Resumo"],
                      ["cover_image_url", "URL da imagem de capa"],
                    ].map(([k, l]) => (
                      <div key={k}>
                        <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-text-muted mb-2">{l}</label>
                        <input value={editing[k] ?? ""} onChange={(e) => setEditing({ ...editing, [k]: e.target.value })} className="w-full bg-background border border-border px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary" />
                      </div>
                    ))}
                    <div>
                      <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-text-muted mb-2">Conteúdo (Markdown)</label>
                      <textarea rows={12} value={editing.content ?? ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="w-full bg-background border border-border px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary font-mono" />
                    </div>
                    <label className="flex items-center gap-3 font-sans text-sm">
                      <input type="checkbox" checked={!!editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="size-4 accent-[var(--primary)]" />
                      Publicado
                    </label>
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button onClick={() => savePost(editing)} className="px-6 py-3 bg-primary text-white text-[11px] tracking-[0.25em] uppercase">Salvar</button>
                    <button onClick={() => setEditing(null)} className="px-6 py-3 border border-border text-text-muted text-[11px] tracking-[0.25em] uppercase">Cancelar</button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {tab === "contacts" && (
          <>
            <h1 className="font-serif text-4xl text-dark mb-8">Contatos</h1>
            <div className="bg-background border">
              {contacts.map((c) => (
                <div key={c.id} className="border-b last:border-0">
                  <div className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-bg-alt" onClick={() => setExpanded(expanded === c.id ? null : c.id)}>
                    {!c.read && <span className="size-2 rounded-full bg-primary" />}
                    <div className="flex-1 min-w-0">
                      <div className={`font-sans text-sm ${c.read ? "text-text-muted" : "text-dark font-medium"}`}>{c.name} · <span className="text-text-muted">{c.subject}</span></div>
                      <div className="font-sans text-xs text-text-muted truncate">{c.message}</div>
                    </div>
                    <span className="font-sans text-xs text-text-muted">{new Date(c.created_at).toLocaleDateString("pt-BR")}</span>
                  </div>
                  {expanded === c.id && (
                    <div className="px-6 pb-6 space-y-3 bg-bg-alt/50">
                      <p className="font-sans text-sm text-dark whitespace-pre-wrap">{c.message}</p>
                      <div className="flex flex-wrap gap-3 text-xs">
                        {c.email && <a href={`mailto:${c.email}`} className="inline-flex items-center gap-2 px-3 py-2 border border-border"><Mail className="size-3.5" /> {c.email}</a>}
                        {c.phone && <a href={`https://wa.me/55${c.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 border border-border"><Phone className="size-3.5" /> {c.phone}</a>}
                        <button onClick={() => markRead(c.id, !c.read)} className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-white"><Check className="size-3.5" /> Marcar como {c.read ? "não lido" : "lido"}</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {contacts.length === 0 && <div className="p-10 text-center font-sans text-sm text-text-muted">Nenhum contato ainda.</div>}
            </div>
          </>
        )}

        {tab === "settings" && (
          <>
            <h1 className="font-serif text-4xl text-dark mb-8">Configurações</h1>
            <div className="bg-background p-8 max-w-2xl space-y-5">
              {[
                ["whatsapp", "WhatsApp (somente números, com DDI)"],
                ["email", "E-mail de contato"],
                ["hours", "Horários de atendimento"],
              ].map(([k, l]) => (
                <div key={k}>
                  <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-text-muted mb-2">{l}</label>
                  <input value={settings[k] ?? ""} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} className="w-full bg-background border border-border px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary" />
                </div>
              ))}
              <button onClick={saveSettings} className="px-6 py-3 bg-primary text-white text-[11px] tracking-[0.25em] uppercase">Salvar</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
