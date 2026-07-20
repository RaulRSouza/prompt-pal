import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { Produto } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductRail({
  title,
  subtitle,
  products,
  accent,
}: {
  title: string;
  subtitle?: string;
  products: Produto[];
  accent?: string;
}) {
  if (products.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-4 flex items-end justify-between">
        <div>
          {accent && (
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {accent}
            </span>
          )}
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <Link
          to="/catalogo"
          className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
        >
          Ver tudo <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="rail -mx-4 px-4">
        {products.map((p) => (
          <div key={p.id} className="rail-item">
            <ProductCard product={p} compact />
          </div>
        ))}
      </div>
    </section>
  );
}
