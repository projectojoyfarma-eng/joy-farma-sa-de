import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, PackageOpen, ShieldCheck, Stethoscope, ClipboardList } from "lucide-react";
import { CATEGORIES, findCategory } from "@/lib/categories";
import { cn } from "@/lib/utils";

type HomeSearch = { categoria?: string };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): HomeSearch =>
    typeof search["categoria"] === "string" ? { categoria: search["categoria"] } : {},
  head: () => ({
    meta: [
      { title: "JOYFARMA | Farmácia Online" },
      { name: "description", content: "JOYFARMA — farmácia online. Consulte as categorias de produtos de saúde e bem-estar disponíveis." },
      { property: "og:title", content: "JOYFARMA | Farmácia Online" },
      { property: "og:description", content: "Consulte as categorias de produtos de saúde e bem-estar da JOYFARMA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { categoria } = Route.useSearch();
  const selected = findCategory(categoria);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-20 border-b bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" search={{}} className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
              <Stethoscope className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-xl font-bold tracking-tight">JOYFARMA</span>
          </Link>
          <nav aria-label="Navegação principal">
            <ul className="flex items-center gap-1 text-sm font-medium">
              <li><a href="#categorias" className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">Categorias</a></li>
              <li><a href="#catalogo" className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">Catálogo</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="border-b bg-secondary/60">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Farmácia Online</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Produtos de saúde e bem-estar, organizados por categoria.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Explore as categorias da JOYFARMA para encontrar o que procura de forma simples e rápida.
            </p>
            <a href="#categorias" className="mt-8 inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              Ver categorias
            </a>
          </div>
        </section>

        <section id="categorias" aria-labelledby="categorias-titulo" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6">
          <h2 id="categorias-titulo" className="text-2xl font-bold tracking-tight sm:text-3xl">Categorias</h2>
          <p className="mt-2 text-muted-foreground">Seleccione uma categoria para ver os produtos disponíveis.</p>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {CATEGORIES.map(({ slug, name, icon: Icon }) => {
              const active = selected?.slug === slug;
              return (
                <li key={slug}>
                  <Link
                    to="/"
                    search={{ categoria: slug }}
                    hash="catalogo"
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "group flex h-full flex-col items-start gap-4 rounded-lg border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:p-5",
                      active && "border-primary ring-1 ring-primary",
                    )}
                  >
                    <span className={cn(
                      "grid h-11 w-11 place-items-center rounded-md bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground",
                      active && "bg-primary text-primary-foreground",
                    )}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold leading-snug sm:text-base">{name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section id="catalogo" aria-labelledby="catalogo-titulo" className="scroll-mt-20 border-t bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <h2 id="catalogo-titulo" className="text-2xl font-bold tracking-tight sm:text-3xl">
              {selected ? selected.name : "Catálogo"}
            </h2>
            <div className="mt-8 flex flex-col items-center rounded-lg border border-dashed bg-card px-6 py-14 text-center" role="status">
              <PackageOpen className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
              <p className="mt-4 text-base font-medium">
                {selected
                  ? "Ainda não existem produtos publicados nesta categoria."
                  : "Ainda não existem produtos publicados. Seleccione uma categoria acima."}
              </p>
              {selected && (
                <Link to="/" search={{}} hash="categorias" className="mt-6 inline-flex items-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Voltar a todas as categorias
                </Link>
              )}
            </div>
          </div>
        </section>

        <section aria-labelledby="confianca-titulo" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 id="confianca-titulo" className="sr-only">Informação importante</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex gap-4 rounded-lg border bg-card p-5">
              <ShieldCheck className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">Uso responsável de medicamentos</h3>
                <p className="mt-1 text-sm text-muted-foreground">Leia sempre o folheto informativo e siga as indicações do seu médico ou farmacêutico.</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border bg-card p-5">
              <ClipboardList className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">Aconselhamento profissional</h3>
                <p className="mt-1 text-sm text-muted-foreground">Em caso de dúvida, consulte um profissional de saúde antes de iniciar qualquer tratamento.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} JOYFARMA. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
