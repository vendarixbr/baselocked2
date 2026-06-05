import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({ component: Login });

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return toast.error(error.message);
      navigate({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Conta criada! Verifique seu e-mail e peça acesso de administrador.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-alt px-6">
      <div className="w-full max-w-md bg-background p-10 shadow-xl border-t-2 border-primary">
        <div className="text-center text-primary"><Logo variant="stacked" /></div>
        <h1 className="font-serif text-3xl text-dark mt-8 text-center">Painel Administrativo</h1>
        <p className="font-sans text-sm text-text-muted text-center mt-2 font-light">{mode === "signin" ? "Acesse sua conta" : "Crie sua conta"}</p>
        <form onSubmit={submit} className="mt-8 space-y-5">
          <div>
            <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-text-muted mb-2">E-mail</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-background border border-border px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-text-muted mb-2">Senha</label>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-background border border-border px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary" />
          </div>
          <button disabled={loading} className="w-full py-3 bg-primary text-white font-sans text-[11px] tracking-[0.25em] uppercase hover:bg-primary-dark disabled:opacity-60">
            {loading ? "Aguarde..." : mode === "signin" ? "Entrar" : "Criar conta"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="font-sans text-xs text-text-muted hover:text-primary">
            {mode === "signin" ? "Não tem conta? Criar agora" : "Já tem conta? Entrar"}
          </button>
        </div>
        <div className="mt-8 text-center"><Link to="/" className="font-sans text-[10px] tracking-[0.3em] uppercase text-text-muted hover:text-primary">← Voltar ao site</Link></div>
      </div>
    </div>
  );
}
