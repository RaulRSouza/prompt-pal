import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Shield, Sparkles, Truck, Wrench } from "lucide-react";
import { listProdutos } from "@/lib/api";
import { ProductRail } from "@/components/produto/ProductRail";
import { Reveal } from "@/components/Reveal";
import heroImg from "@/assets/hero-eletrocel.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Eletrocel — Loja e Assistência Técnica de Celulares" },
      {
        name: "description",
        content:
          "Ofertas do dia, novidades e os produtos em alta. Smartphones, notebooks e acessórios com assistência técnica especializada.",
      },
    ],
  }),
});

function HomePage() {
  const { data: produtos = [] } = useQuery({ queryKey: ["produtos"], queryFn: listProdutos });

  const ofertas = produtos.filter((p) => p.tags?.includes("oferta"));
  const emAlta = produtos.filter((p) => p.tags?.includes("emAlta"));
  const novidades = produtos.filter((p) => p.tags?.includes("novidade"));
  const maisVendidos = produtos.filter((p) => p.tags?.includes("maisVendido"));

  return (
    <div>
      {/* Hero — Apple-style */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 text-center md:pt-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Novidades da semana
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
              Tecnologia que{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
                encanta
              </span>
              .<br className="hidden md:inline" /> Serviço que resolve.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Ofertas exclusivas em smartphones, notebooks e acessórios. Assistência técnica com
              garantia e rastreio de OS em tempo real.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/catalogo"
                className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm"
              >
                Comprar agora <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/rastreio"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-6 py-3 text-sm hover:border-primary/50"
              >
                Rastrear minha OS
              </Link>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-3xl border border-border shadow-2xl">
              <img
                src={heroImg}
                alt="Vitrine Eletrocel — smartphones, notebooks e acessórios"
                width={1600}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Rails estilo Amazon / Mercado Livre */}
      {ofertas.length > 0 && (
        <Reveal>
          <ProductRail
            accent="Ofertas do dia"
            title="Promoções imperdíveis"
            subtitle="Descontos por tempo limitado."
            products={ofertas}
          />
        </Reveal>
      )}
      {emAlta.length > 0 && (
        <Reveal>
          <ProductRail
            accent="Em alta"
            title="O que está bombando hoje"
            subtitle="Os produtos mais buscados da semana."
            products={emAlta}
          />
        </Reveal>
      )}
      {novidades.length > 0 && (
        <Reveal>
          <ProductRail
            accent="Novidades"
            title="Recém-chegados"
            subtitle="Lançamentos direto pra sua vitrine."
            products={novidades}
          />
        </Reveal>
      )}
      {maisVendidos.length > 0 && (
        <Reveal>
          <ProductRail
            accent="Mais vendidos"
            title="Escolhidos por quem já comprou"
            products={maisVendidos}
          />
        </Reveal>
      )}

      {/* Serviços */}
      <Reveal>
        <section className="mx-auto max-w-7xl px-4 py-20">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Mais que uma loja. Um atendimento.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Da compra à assistência, cuidamos de cada detalhe.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Wrench,
                title: "Reparo especializado",
                desc: "Troca de tela, bateria, placa e mais — orçamento sem compromisso.",
              },
              {
                icon: Shield,
                title: "Garantia real",
                desc: "Todos os serviços com 90 dias de garantia oficial.",
              },
              {
                icon: Truck,
                title: "Frete rápido",
                desc: "Cálculo automático de frete com IA. Envio para todo o Brasil.",
              },
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
      </Reveal>

      {/* CTA Apple-style */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="card-glass overflow-hidden rounded-3xl p-10 text-center md:p-16">
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Precisa de ajuda com seu aparelho?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Envie sua OS e acompanhe cada etapa em tempo real.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                to="/contato"
                className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm"
              >
                Falar com a gente <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-6 py-3 text-sm hover:border-primary/50"
              >
                Explorar catálogo
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
