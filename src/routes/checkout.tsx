import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { calcularFrete, criarPedido, currency } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({ meta: [{ title: "Checkout — Eletrocel" }] }),
});

const schema = z.object({
  nome: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(8, "Telefone inválido"),
  cep: z.string().min(8, "CEP inválido"),
  endereco: z.string().min(3, "Informe o endereço"),
  numero: z.string().min(1, "Número"),
  cidade: z.string().min(2),
  uf: z.string().length(2, "UF"),
  formaPagamento: z.enum(["PIX", "CARTAO", "BOLETO"]),
});
type FormData = z.infer<typeof schema>;

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [frete, setFrete] = useState<{ valor: number; prazo: string } | null>(null);
  const [pedidoNum, setPedidoNum] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { formaPagamento: "PIX" },
  });

  const cep = watch("cep");

  async function handleCalcFrete() {
    if (!cep || cep.length < 8) return toast.error("Informe um CEP válido");
    const r = await calcularFrete(cep);
    if (r) setFrete(r);
  }

  async function onSubmit(data: FormData) {
    if (items.length === 0) return;
    const total = subtotal + (frete?.valor ?? 0);
    const res = await criarPedido({
      clienteNome: data.nome,
      clienteEmail: data.email,
      clienteTelefone: data.telefone,
      endereco: {
        cep: data.cep,
        rua: data.endereco,
        numero: data.numero,
        cidade: data.cidade,
        uf: data.uf,
      },
      produtos: items.map((i) => ({ produtoId: i.produto.id, quantidade: i.quantidade })),
      formaPagamento: data.formaPagamento,
      valorTotal: total,
    });
    if (res) {
      setPedidoNum(res.numero);
      clear();
    }
  }

  if (pedidoNum) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <div className="btn-gold mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-3xl font-bold">Pedido confirmado!</h1>
        <p className="mt-2 text-muted-foreground">
          Seu número de pedido é <b className="text-primary">{pedidoNum}</b>. Em breve entraremos em contato.
        </p>
        <button onClick={() => navigate({ to: "/" })} className="btn-gold mt-6 rounded-lg px-6 py-3 text-sm">
          Voltar ao início
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center text-muted-foreground">
        Seu carrinho está vazio.
      </div>
    );
  }

  const total = subtotal + (frete?.valor ?? 0);
  const inputCls =
    "w-full rounded-lg border border-border bg-secondary/60 px-3 py-2.5 text-sm outline-none focus:border-primary";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold md:text-4xl">Finalizar pedido</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="card-glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Seus dados</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Nome completo" error={errors.nome?.message}>
              <input className={inputCls} {...register("nome")} />
            </Field>
            <Field label="E-mail" error={errors.email?.message}>
              <input type="email" className={inputCls} {...register("email")} />
            </Field>
            <Field label="Telefone" error={errors.telefone?.message}>
              <input className={inputCls} {...register("telefone")} />
            </Field>
            <Field label="CEP" error={errors.cep?.message}>
              <div className="flex gap-2">
                <input className={inputCls} {...register("cep")} />
                <button type="button" onClick={handleCalcFrete} className="rounded-lg border border-border px-3 text-xs">
                  Calcular
                </button>
              </div>
            </Field>
            <Field label="Endereço" error={errors.endereco?.message} className="md:col-span-2">
              <input className={inputCls} {...register("endereco")} />
            </Field>
            <Field label="Número" error={errors.numero?.message}>
              <input className={inputCls} {...register("numero")} />
            </Field>
            <Field label="Cidade" error={errors.cidade?.message}>
              <input className={inputCls} {...register("cidade")} />
            </Field>
            <Field label="UF" error={errors.uf?.message}>
              <input maxLength={2} className={inputCls} {...register("uf")} />
            </Field>
          </div>

          <h2 className="mt-8 text-lg font-semibold">Forma de pagamento</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            {(["PIX", "CARTAO", "BOLETO"] as const).map((f) => (
              <label
                key={f}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-secondary/60 px-4 py-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/10"
              >
                <input type="radio" value={f} {...register("formaPagamento")} className="accent-primary" />
                {f === "CARTAO" ? "Cartão" : f}
              </label>
            ))}
          </div>
        </div>

        <aside className="card-glass h-fit rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Resumo</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {items.map((i) => (
              <li key={i.produto.id} className="flex justify-between text-muted-foreground">
                <span className="line-clamp-1">
                  {i.quantidade}× {i.produto.nome}
                </span>
                <span>{currency(i.produto.precoVenda * i.quantidade)}</span>
              </li>
            ))}
          </ul>
          <div className="my-4 border-t border-border" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span>{currency(subtotal)}</span>
          </div>
          <div className="mt-1 flex justify-between text-sm text-muted-foreground">
            <span>Frete</span>
            <span>{frete ? currency(frete.valor) : "—"}</span>
          </div>
          {frete && <div className="text-xs text-muted-foreground">Prazo: {frete.prazo}</div>}
          <div className="mt-3 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{currency(total)}</span>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gold hover:btn-gold-hover mt-6 flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm disabled:opacity-60"
          >
            {isSubmitting ? "Enviando..." : "Confirmar pedido"}
          </button>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
