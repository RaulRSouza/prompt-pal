import { Link } from "@tanstack/react-router";
import { Instagram, Moon, ShoppingCart, Sun, Zap } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useTheme } from "@/contexts/ThemeContext";

const nav = [
  { to: "/", label: "Início" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/rastreio", label: "Rastrear OS" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

export const INSTAGRAM_URL = "https://instagram.com/eletrocelloja/";
export const INSTAGRAM_HANDLE = "@eletrocelloja";

export function Header() {
  const { totalItems } = useCart();
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="btn-gold flex h-9 w-9 items-center justify-center rounded-lg">
            <Zap className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight">Eletrocel</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Loja & Assistência
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Eletrocel"
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary/60 transition-colors hover:border-primary/50 hover:text-primary sm:flex"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary/60 transition-colors hover:border-primary/50 hover:text-primary"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/carrinho"
            className="relative flex items-center gap-2 rounded-lg border border-border bg-secondary/60 px-3 py-2 text-sm transition-colors hover:border-primary/50"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Carrinho</span>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
