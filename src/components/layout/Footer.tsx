import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="text-lg font-bold">Eletrocel</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Cuidando do seu celular com excelência desde sempre.
          </p>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">Navegação</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/catalogo" className="hover:text-primary">Catálogo</Link></li>
            <li><Link to="/rastreio" className="hover:text-primary">Rastrear OS</Link></li>
            <li><Link to="/sobre" className="hover:text-primary">Sobre</Link></li>
            <li><Link to="/contato" className="hover:text-primary">Contato</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">Contato</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> (41) 99999-9999</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> contato@eletrocel.com.br</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Curitiba/PR</li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">Horário</div>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>Seg — Sex: 9h às 18h</li>
            <li>Sábado: 9h às 13h</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Eletrocel Assistência Técnica. Todos os direitos reservados.
      </div>
    </footer>
  );
}
