import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronLeft, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import { calcularFrete, currency, getProduto, listProdutos } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";
import { ProductCard } from "@/components/produto/ProductCard";
import { toast } from "sonner";

export const Route = createFileRoute("/produto/$id")({
  component: ProdutoPage,
});

function ProdutoPage() {
  const { id } = Route.useParams();
  const { data: produto, isLoading } = useQuery({
    queryKey: ["produto", id],
    queryFn: async () => {
      const p = await getProduto(id);
      if (!p) throw notFound();
      return p;
    },
  });
  const { data: todos = [] } = useQuery({ queryKey: ["produtos"], queryFn: listProdutos });
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState<{ valor: number; prazo: string } | null>(null);
  const [calculando, setCalculando] = useState(false);

  if (isLoading) {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-center text-muted-foreground">Carregando...</div>;
  }
  if (!produto) return null;

  const relacionados = todos.filter((p) => p.categoria === produto.categoria && p.id !== produto.id).slice(0, 4);

  async function handleFrete() {
    setCalculando(true);
    const r = await calcularFrete(cep);
    setFrete(r);
    setCalculando(false);
    if (!r) toast.error("Não foi possível calcular. Verifique o CEP.");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <Link to="/catalogo" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ChevronLeft className="h-4 w-4" /> Voltar ao catálogo
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="product-plate overflow-hidden rounded-3xl border border-border">
          <img
            src={produto.imagemUrl}
            alt={produto.nome}
            className="aspect-square w-full object-contain p-10"
          />
        </div>

        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-primary">{produto.categoria}</span>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">{produto.nome}</h1>
          <p className="mt-4 text-muted-foreground">{produto.descricao}</p>

          <div className="mt-6 text-4xl font-extrabold">{currency(produto.precoVenda)}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            {produto.quantidadeEstoque > 0
              ? `${produto.quantidadeEstoque} em estoque`
              : "Sem estoque"}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-border bg-secondary/60">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2">−</button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2">+</button>
            </div>
            <button
              onClick={() => {
                addItem(produto, qty);
                toast.success("Adicionado ao carrinho");
              }}
              className="btn-gold hover:btn-gold-hover flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm"
            >
              <ShoppingCart className="h-4 w-4" /> Adicionar ao carrinho
            </button>
          </div>

          <div className="card-glass mt-6 rounded-2xl p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Truck className="h-4 w-4 text-primary" /> Calcular frete
            </div>
            <div className="flex gap-2">
              <input
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                placeholder="Digite seu CEP"
                className="flex-1 rounded-lg border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <button
                onClick={handleFrete}
                disabled={calculando}
                className="btn-gold rounded-lg px-4 py-2 text-sm disabled:opacity-60"
              >
                {calculando ? "..." : "Calcular"}
              </button>
            </div>
            {frete && (
              <div className="mt-3 text-sm">
                Frete: <b>{currency(frete.valor)}</b> — prazo {frete.prazo}
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" /> Garantia de 90 dias e nota fiscal.
          </div>

          {produto.especificacoes && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold">Especificações</h3>
              <dl className="mt-2 grid grid-cols-2 gap-2 text-sm">
                {Object.entries(produto.especificacoes).map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-border bg-secondary/40 px-3 py-2">
                    <dt className="text-xs text-muted-foreground">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Produtos relacionados</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relacionados.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
