import type { OrdemServico, Produto } from "./types";
import { mockProdutos } from "./mock-data";

const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "");

async function tryFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function listProdutos(): Promise<Produto[]> {
  const data = await tryFetch<Produto[]>("/produtos");
  return data ?? mockProdutos;
}

export async function getProduto(id: string): Promise<Produto | undefined> {
  const data = await tryFetch<Produto>(`/produtos/${id}`);
  return data ?? mockProdutos.find((p) => p.id === id);
}

export async function getOS(numero: string): Promise<OrdemServico | null> {
  const data = await tryFetch<OrdemServico>(`/os/${numero}`);
  if (data) return data;
  // Fallback demo
  if (!numero.trim()) return null;
  return {
    numero,
    clienteNome: "Cliente Demonstração",
    aparelho: "iPhone 13 Pro",
    defeito: "Troca de tela",
    status: "EM_ANDAMENTO",
    createdAt: new Date(Date.now() - 3 * 864e5).toISOString(),
    previsaoEntrega: new Date(Date.now() + 2 * 864e5).toISOString(),
    historico: [
      { data: new Date(Date.now() - 3 * 864e5).toISOString(), descricao: "OS recebida" },
      { data: new Date(Date.now() - 2 * 864e5).toISOString(), descricao: "Diagnóstico concluído" },
      { data: new Date(Date.now() - 1 * 864e5).toISOString(), descricao: "Peça encomendada" },
    ],
  };
}

export async function calcularFrete(cep: string, peso = 0.5): Promise<{ valor: number; prazo: string } | null> {
  const data = await tryFetch<{ resposta: string }>("/ia/chat", {
    method: "POST",
    body: JSON.stringify({
      mensagem: `Calcule frete para CEP ${cep}, peso ${peso}kg, tipo NORMAL`,
    }),
  });
  if (data?.resposta) {
    // parse "Frete calculado: R$ 25,00, prazo 3 dias úteis" — best effort
    const valorMatch = data.resposta.match(/R\$\s*([\d.,]+)/);
    const prazoMatch = data.resposta.match(/(\d+\s*dias?[^,.]*)/i);
    return {
      valor: valorMatch ? Number(valorMatch[1].replace(/\./g, "").replace(",", ".")) : 25,
      prazo: prazoMatch?.[1] ?? "3 dias úteis",
    };
  }
  // Mock: base + digit factor
  const digits = cep.replace(/\D/g, "");
  if (digits.length < 8) return null;
  const base = 18 + (Number(digits.slice(0, 2)) % 40);
  return { valor: base, prazo: `${3 + (Number(digits[0]) % 4)} dias úteis` };
}

export async function criarPedido(payload: unknown): Promise<{ numero: string } | null> {
  const data = await tryFetch<{ numero: string }>("/pedidos", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return (
    data ?? {
      numero: `PED-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(
        Math.random() * 900 + 100,
      )}`,
    }
  );
}

export const currency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
