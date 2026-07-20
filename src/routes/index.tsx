import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Shield, Truck, Wrench, Sparkles, Star } from "lucide-react";
import { listProdutos } from "@/lib/api";
import { ProductCard } from "@/components/produto/ProductCard";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Eletrocel — Loja e Assistência Técnica de Celulares" },
      {
        name: "description",
        content:
          "Smartphones, notebooks e acessórios com o melhor preço. Assistência técnica especializada e rastreio de OS online.",
      },
    ],
  }),
});

function HomePage() {
  const { data: produtos = [] } = useQuery({
    queryKey: ["produtos"],
    queryFn: listProdutos,
  });
  const destaques = produtos.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-40"
          style={{
            background:
              "radial-gradient(600px 300px at 20% 20%, oklch(0.85 0.18 90 / 0.25), transparent 60%), radial-gradient(500px 300px at 80% 60%, oklch(0.72 0.19 70 / 0.2), transparent 60%)",
          }}
        />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Assistência com IA integrada
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Seu celular em <span className="bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent">boas mãos</span>.
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Loja e assistência técnica com garantia. Rastreie sua OS em tempo real e compre os melhores aparelhos com frete calculado por IA.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/catalogo" className="btn-gold inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm">
                Ver catálogo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/rastreio"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/60 px-6 py-3 text-sm hover:border-primary/50"
              >
                Rastrear minha OS
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
                <span className="ml-2">4.9/5 (+1.200 clientes)</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="card-glass aspect-square rounded-3xl p-6">
              <img
                src="https://placehold.co/800x800/0f0f0f/FBBF24?text=Eletrocel"
                alt="Vitrine Eletrocel"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Wrench, title: "Reparo especializado", desc: "Troca de tela, bateria, placa e mais — orçamento sem compromisso." },
            { icon: Shield, title: "Garantia real", desc: "Todos os serviços com 90 dias de garantia oficial." },
            { icon: Truck, title: "Frete rápido", desc: "Cálculo automático de frete com IA. Envio para todo o Brasil." },
          ].map((s) => (
            <div key={s.title} className="card-glass rounded-2xl p-6">
              <div className="btn-gold flex h-11 w-11 items-center justify-center rounded-lg">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Destaques */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Destaques da loja</h2>
            <p className="text-sm text-muted-foreground">Produtos selecionados a dedo pra você.</p>
          </div>
          <Link to="/catalogo" className="text-sm font-medium text-primary hover:underline">
            Ver tudo →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destaques.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">O que dizem nossos clientes</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { nome: "Ana P.", texto: "Trocaram a tela do meu iPhone em 2h. Perfeito, ficou como novo!" },
            { nome: "Rodrigo M.", texto: "Comprei um Galaxy e o atendimento foi impecável. Recomendo demais." },
            { nome: "Larissa T.", texto: "Sistema de rastreio da OS é sensacional, sabia de tudo em tempo real." },
          ].map((d) => (
            <div key={d.nome} className="card-glass rounded-2xl p-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">"{d.texto}"</p>
              <div className="mt-4 text-sm font-semibold">{d.nome}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
