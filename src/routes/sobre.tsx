import { createFileRoute } from "@tanstack/react-router";
import { Award, Clock, MapPin, Target } from "lucide-react";

export const Route = createFileRoute("/sobre")({
  component: SobrePage,
  head: () => ({ meta: [{ title: "Sobre — Eletrocel" }] }),
});

function SobrePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-4xl">Sobre a Eletrocel</h1>
      <p className="mt-4 max-w-3xl text-muted-foreground">
        Somos uma assistência técnica de celulares comprometida com excelência. Combinamos técnicos experientes com tecnologia (inclusive IA) para diagnósticos rápidos, preços justos e transparência total no processo.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { icon: Target, title: "Missão", desc: "Devolver seu aparelho funcionando como novo, com o menor tempo e melhor custo possível." },
          { icon: Award, title: "Visão", desc: "Ser referência em assistência técnica no sul do Brasil, unindo qualidade e tecnologia." },
          { icon: Clock, title: "Valores", desc: "Honestidade, agilidade, transparência e cuidado com cada cliente." },
        ].map((c) => (
          <div key={c.title} className="card-glass rounded-2xl p-6">
            <div className="btn-gold flex h-10 w-10 items-center justify-center rounded-lg">
              <c.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="card-glass mt-10 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <MapPin className="h-4 w-4 text-primary" /> Onde estamos
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Rua Exemplo, 123 — Curitiba/PR</p>
        <p className="text-sm text-muted-foreground">Seg–Sex 9h às 18h · Sáb 9h às 13h</p>
        <div className="mt-4 aspect-[16/7] w-full overflow-hidden rounded-xl border border-border">
          <iframe
            title="Mapa Eletrocel"
            src="https://www.google.com/maps?q=Curitiba,PR&output=embed"
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
