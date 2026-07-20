import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { currency } from "@/lib/api";

export const Route = createFileRoute("/carrinho")({
  component: CarrinhoPage,
  head: () => ({ meta: [{ title: "Carrinho — Eletrocel" }] }),
});

function CarrinhoPage() {
  const { items, updateQty, removeItem, subtotal, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Seu carrinho está vazio</h1>
        <p className="mt-2 text-muted-foreground">Que tal dar uma olhada no nosso catálogo?</p>
        <Link to="/catalogo" className="btn-gold mt-6 inline-block rounded-lg px-6 py-3 text-sm">
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold md:text-4xl">Seu carrinho</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.produto.id} className="card-glass flex gap-4 rounded-2xl p-4">
              <img
                src={item.produto.imagemUrl ?? ""}
                alt={item.produto.nome}
                className="h-24 w-24 rounded-lg object-cover"
              />
              <div className="flex flex-1 flex-col">
                <Link to="/produto/$id" params={{ id: item.produto.id }} className="font-semibold hover:text-primary">
                  {item.produto.nome}
                </Link>
                <span className="text-xs text-muted-foreground">{item.produto.categoria}</span>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-border bg-secondary/60">
                    <button onClick={() => updateQty(item.produto.id, item.quantidade - 1)} className="px-3 py-1.5">−</button>
                    <span className="w-8 text-center text-sm">{item.quantidade}</span>
                    <button onClick={() => updateQty(item.produto.id, item.quantidade + 1)} className="px-3 py-1.5">+</button>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{currency(item.produto.precoVenda * item.quantidade)}</div>
                    <button onClick={() => removeItem(item.produto.id)} className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3 w-3" /> Remover
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={clear} className="text-xs text-muted-foreground hover:text-destructive">
            Esvaziar carrinho
          </button>
        </div>

        <aside className="card-glass h-fit rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Resumo</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{currency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Frete</span>
              <span>calculado no checkout</span>
            </div>
          </div>
          <div className="my-4 border-t border-border" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{currency(subtotal)}</span>
          </div>
          <Link to="/checkout" className="btn-gold hover:btn-gold-hover mt-6 flex items-center justify-center rounded-lg px-4 py-3 text-sm">
            Finalizar pedido
          </Link>
        </aside>
      </div>
    </div>
  );
}
