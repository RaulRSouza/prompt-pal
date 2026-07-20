import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import type { Produto } from "@/lib/types";
import { currency } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const TAG_LABEL: Record<string, { label: string; className: string }> = {
  oferta: { label: "Oferta", className: "bg-destructive text-destructive-foreground" },
  novidade: { label: "Novo", className: "bg-success text-success-foreground" },
  emAlta: { label: "Em alta", className: "bg-accent text-accent-foreground" },
  maisVendido: { label: "Mais vendido", className: "bg-primary text-primary-foreground" },
};

export function ProductCard({ product, compact = false }: { product: Produto; compact?: boolean }) {
  const { addItem } = useCart();
  const desconto = product.precoOriginal
    ? Math.round((1 - product.precoVenda / product.precoOriginal) * 100)
    : 0;

  return (
    <div
      className={`card-glass group relative flex flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-0.5 hover:border-primary/50 ${
        compact ? "w-64" : ""
      }`}
    >
      {/* Badges */}
      <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1">
        {desconto > 0 && (
          <span className="rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold text-destructive-foreground">
            -{desconto}%
          </span>
        )}
        {product.tags?.slice(0, 1).map((t) => {
          const meta = TAG_LABEL[t];
          if (!meta) return null;
          return (
            <span
              key={t}
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${meta.className}`}
            >
              {meta.label}
            </span>
          );
        })}
      </div>

      <Link to="/produto/$id" params={{ id: product.id }} className="block">
        <div className="product-plate aspect-square overflow-hidden">
          <img
            src={product.imagemUrl}
            alt={product.nome}
            loading="lazy"
            width={600}
            height={600}
            className="h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {product.categoria}
        </span>
        <Link to="/produto/$id" params={{ id: product.id }}>
          <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] font-semibold text-foreground group-hover:text-primary">
            {product.nome}
          </h3>
        </Link>
        <div className="mt-3 flex items-baseline gap-2">
          <p className="text-2xl font-bold">{currency(product.precoVenda)}</p>
          {product.precoOriginal && (
            <p className="text-xs text-muted-foreground line-through">
              {currency(product.precoOriginal)}
            </p>
          )}
        </div>
        <p className="text-xs text-success">em até 12x sem juros</p>
        <button
          onClick={() => {
            addItem(product);
            toast.success("Adicionado ao carrinho", { description: product.nome });
          }}
          className="btn-gold hover:btn-gold-hover mt-4 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm"
        >
          <ShoppingCart className="h-4 w-4" />
          Adicionar
        </button>
      </div>
    </div>
  );
}
