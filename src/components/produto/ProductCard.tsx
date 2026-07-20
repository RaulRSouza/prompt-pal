import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import type { Produto } from "@/lib/types";
import { currency } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Produto }) {
  const { addItem } = useCart();
  return (
    <div className="card-glass group relative flex flex-col overflow-hidden rounded-2xl transition-all hover:border-primary/50">
      <Link to="/produto/$id" params={{ id: product.id }} className="block">
        <div className="aspect-square overflow-hidden bg-black/40">
          <img
            src={product.imagemUrl ?? "https://placehold.co/600x600/1a1a1a/FBBF24?text=Produto"}
            alt={product.nome}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-medium uppercase tracking-wider text-primary">
          {product.categoria}
        </span>
        <Link to="/produto/$id" params={{ id: product.id }}>
          <h3 className="mt-1 line-clamp-2 font-semibold text-foreground group-hover:text-primary">
            {product.nome}
          </h3>
        </Link>
        <p className="mt-3 text-2xl font-bold">{currency(product.precoVenda)}</p>
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
