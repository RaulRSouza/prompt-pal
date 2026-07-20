import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Package, Search } from "lucide-react";
import { getOS } from "@/lib/api";
import type { OrdemServico } from "@/lib/types";

export const Route = createFileRoute("/rastreio")({
  component: RastreioPage,
  head: () => ({ meta: [{ title: "Rastreio de OS — Eletrocel" }] }),
});

const statusMap: Record<OrdemServico["status"], { label: string; color: string }> = {
  AGUARDANDO: { label: "Aguardando", color: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
  EM_ANDAMENTO: { label: "Em andamento", color: "bg-primary/20 text-primary border-primary/40" },
  PRONTO: { label: "Pronto para retirada", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
  ENTREGUE: { label: "Entregue", color: "bg-muted text-muted-foreground border-border" },
};

function RastreioPage() {
  const [numero, setNumero] = useState("");
  const [os, setOs] = useState<OrdemServico | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function buscar(e: React.FormEvent) {
    e.preventDefault();
    if (!numero.trim()) return;
    setLoading(true);
    setErr("");
    const r = await getOS(numero.trim());
    setOs(r);
    if (!r) setErr("OS não encontrada.");
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-center">
        <div className="btn-gold mx-auto flex h-14 w-14 items-center justify-center rounded-2xl">
          <Package className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-3xl font-bold md:text-4xl">Rastreie sua Ordem de Serviço</h1>
        <p className="mt-2 text-muted-foreground">Digite o número da sua OS para acompanhar o status em tempo real.</p>
      </div>

      <form onSubmit={buscar} className="card-glass mt-8 flex gap-2 rounded-2xl p-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="Ex.: OS-20260720-001"
            className="w-full rounded-lg border border-border bg-background/60 py-3 pl-10 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-gold rounded-lg px-6 text-sm">
          {loading ? "..." : "Buscar"}
        </button>
      </form>

      {err && <p className="mt-4 text-center text-sm text-destructive">{err}</p>}

      {os && (
        <div className="card-glass mt-8 rounded-2xl p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs text-muted-foreground">OS</div>
              <div className="text-xl font-bold">{os.numero}</div>
            </div>
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusMap[os.status].color}`}>
              {statusMap[os.status].label}
            </span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Info label="Cliente" value={os.clienteNome} />
            <Info label="Aparelho" value={os.aparelho} />
            <Info label="Defeito" value={os.defeito} />
            <Info label="Previsão de entrega" value={new Date(os.previsaoEntrega).toLocaleDateString("pt-BR")} />
          </div>

          {os.historico && os.historico.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-sm font-semibold">Histórico</h3>
              <ol className="space-y-3">
                {os.historico.map((h, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-primary" />
                    <div>
                      <div className="text-sm">{h.descricao}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(h.data).toLocaleString("pt-BR")}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/40 px-4 py-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
