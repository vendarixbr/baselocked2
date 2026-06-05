import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteLayout } from "@/components/SiteLayout";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-primary">404</h1>
        <h2 className="mt-4 font-serif text-2xl text-dark">Página não encontrada</h2>
        <p className="mt-2 text-sm text-text-muted font-light">A página que você procura não existe ou foi movida.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white text-[11px] tracking-[0.25em] uppercase">
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl text-dark">Algo deu errado</h1>
        <p className="mt-2 text-sm text-text-muted font-light">Tente novamente ou volte ao início.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="px-6 py-2.5 bg-primary text-white text-[11px] tracking-[0.25em] uppercase">Tentar novamente</button>
          <a href="/" className="px-6 py-2.5 border border-primary text-primary text-[11px] tracking-[0.25em] uppercase">Início</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dra. Lara Ganem | Ginecologista Clínica e Pré-natal em Nova Serrana - MG" },
      { name: "description", content: "Atendimento ginecológico humanizado em Nova Serrana - MG. Consultas de rotina, pré-natal, saúde hormonal e muito mais. CRM MG 90916. Agende pelo WhatsApp." },
      { name: "author", content: "Dra. Lara Ganem" },
      { property: "og:title", content: "Dra. Lara Ganem | Ginecologista Clínica e Pré-natal em Nova Serrana - MG" },
      { property: "og:description", content: "Atendimento ginecológico humanizado em Nova Serrana - MG. Consultas de rotina, pré-natal, saúde hormonal e muito mais. CRM MG 90916. Agende pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Dra. Lara Ganem | Ginecologista Clínica e Pré-natal em Nova Serrana - MG" },
      { name: "twitter:description", content: "Atendimento ginecológico humanizado em Nova Serrana - MG. Consultas de rotina, pré-natal, saúde hormonal e muito mais. CRM MG 90916. Agende pelo WhatsApp." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/be88a225-e8cd-4f31-9ec3-c0caac5c2872/id-preview-07f62749--026341ff-763b-41f8-ac06-99d02d129e55.lovable.app-1779882489580.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/be88a225-e8cd-4f31-9ec3-c0caac5c2872/id-preview-07f62749--026341ff-763b-41f8-ac06-99d02d129e55.lovable.app-1779882489580.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { location } = useRouterState();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      {isAdmin ? <Outlet /> : <SiteLayout><Outlet /></SiteLayout>}
      <Toaster />
    </QueryClientProvider>
  );
}
