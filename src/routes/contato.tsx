import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contato")({
  component: ContatoPage,
  head: () => ({ meta: [{ title: "Contato — Eletrocel" }] }),
});

function ContatoPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1fr_1.2fr]">
      <div>
        <h1 className="text-3xl font-bold md:text-4xl">Fale com a gente</h1>
        <p className="mt-2 text-muted-foreground">
          Dúvida, orçamento ou suporte? Estamos aqui pra ajudar.
        </p>
        <ul className="mt-6 space-y-4 text-sm">
          <li className="flex items-center gap-3">
            <div className="btn-gold flex h-9 w-9 items-center justify-center rounded-lg">
              <Phone className="h-4 w-4" />
            </div>
            (41) 99999-9999
          </li>
          <li className="flex items-center gap-3">
            <div className="btn-gold flex h-9 w-9 items-center justify-center rounded-lg">
              <Mail className="h-4 w-4" />
            </div>
            contato@eletrocel.com.br
          </li>
          <li className="flex items-center gap-3">
            <div className="btn-gold flex h-9 w-9 items-center justify-center rounded-lg">
              <MapPin className="h-4 w-4" />
            </div>
            Rua Exemplo, 123 — Curitiba/PR
          </li>
        </ul>
        <a
          href="https://wa.me/5541999999999"
          target="_blank"
          rel="noreferrer"
          className="btn-gold mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm"
        >
          <MessageCircle className="h-4 w-4" /> Chamar no WhatsApp
        </a>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Mensagem enviada! Retornaremos em breve.");
          (e.currentTarget as HTMLFormElement).reset();
        }}
        className="card-glass rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold">Envie uma mensagem</h2>
        <div className="mt-4 space-y-3">
          <input required placeholder="Seu nome" className="w-full rounded-lg border border-border bg-secondary/60 px-3 py-2.5 text-sm outline-none focus:border-primary" />
          <input required type="email" placeholder="E-mail" className="w-full rounded-lg border border-border bg-secondary/60 px-3 py-2.5 text-sm outline-none focus:border-primary" />
          <input placeholder="Telefone" className="w-full rounded-lg border border-border bg-secondary/60 px-3 py-2.5 text-sm outline-none focus:border-primary" />
          <textarea required rows={5} placeholder="Como podemos ajudar?" className="w-full rounded-lg border border-border bg-secondary/60 px-3 py-2.5 text-sm outline-none focus:border-primary" />
          <button className="btn-gold hover:btn-gold-hover w-full rounded-lg px-4 py-3 text-sm">
            Enviar mensagem
          </button>
        </div>
      </form>
    </div>
  );
}
