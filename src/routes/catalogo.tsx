import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { listProdutos } from "@/lib/api";
import { ProductCard } from "@/components/produto/ProductCard";
import { ProductRail } from "@/components/produto/ProductRail";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/catalogo")({
  component: CatalogoPage,
  head: () => ({
    meta: [
      { title: "Catálogo — Eletrocel" },
      {
        name: "description",
        content: "Explore ofertas, novidades e produtos em alta. Smartphones, notebooks e acessórios.",
      },
    ],
  }),
});

type Sort = "novidades" | "menor" | "maior" | "nome";

function CatalogoPage() {
  const { data: produtos = [], isLoading } = useQuery({
    queryKey: ["produtos"],
    queryFn: listProdutos,
  });
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("Todas");
  const [sort, setSort] = useState<Sort>("novidades");

  const categorias = useMemo(() => {
    const set = new Set(produtos.map((p) => p.categoria));
    return ["Todas", ...Array.from(set)];
  }, [produtos]);

  const filtered = useMemo(() => {
    let list = produtos;
    if (cat !== "Todas") list = list.filter((p) => p.categoria === cat);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((p) => p.nome.toLowerCase().includes(s));
    }
    const sorted = [...list];
    if (sort === "menor") sorted.sort((a, b) => a.precoVenda - b.precoVenda);
    if (sort === "maior") sorted.sort((a, b) => b.precoVenda - a.precoVenda);
    if (sort === "nome") sorted.sort((a, b) => a.nome.localeCompare(b.nome));
    return sorted;
  }, [produtos, cat, q, sort]);

  const ofertas = produtos.filter((p) => p.tags?.includes("oferta"));
  const emAlta = produtos.filter((p) => p.tags?.includes("emAlta"));
  const novidades = produtos.filter((p) => p.tags?.includes("novidade"));

  const hasFilter = q.trim().length > 0 || cat !== "Todas";

  return (
    <div>
      {/* Header do catálogo */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Catálogo</h1>
          <p className="mt-1 text-muted-foreground">
            Descubra ofertas, novidades e produtos em alta.
          </p>

          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar produto..."
                className="w-full rounded-full border border-border bg-secondary/60 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="rounded-full border border-border bg-secondary/60 px-4 py-2.5 text-sm outline-none focus:border-primary"
            >
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-full border border-border bg-secondary/60 px-4 py-2.5 text-sm outline-none focus:border-primary"
            >
              <option value="novidades">Novidades</option>
              <option value="menor">Menor preço</option>
              <option value="maior">Maior preço</option>
              <option value="nome">Nome (A–Z)</option>
            </select>
          </div>

          {/* Chips de categoria */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categorias.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  cat === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-secondary/60 hover:border-primary/50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Se não há filtro, mostra rails estilo ML/Amazon */}
      {!hasFilter && !isLoading && (
        <>
          {ofertas.length > 0 && (
            <Reveal>
              <ProductRail accent="Ofertas do dia" title="Promoções relâmpago" products={ofertas} />
            </Reveal>
          )}
          {emAlta.length > 0 && (
            <Reveal>
              <ProductRail accent="Em alta" title="Mais buscados agora" products={emAlta} />
            </Reveal>
          )}
          {novidades.length > 0 && (
            <Reveal>
              <ProductRail accent="Novidades" title="Recém-chegados" products={novidades} />
            </Reveal>
          )}
        </>
      )}

      {/* Grade completa */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-bold md:text-2xl">
            {hasFilter ? "Resultados" : "Todos os produtos"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {filtered.length} produto{filtered.length !== 1 && "s"}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card-glass aspect-[3/4] animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card-glass rounded-2xl p-10 text-center text-muted-foreground">
            Nenhum produto encontrado.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
