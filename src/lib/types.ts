export type ProdutoTag = "novidade" | "emAlta" | "oferta" | "maisVendido";

export type Produto = {
  id: string;
  nome: string;
  categoria: string;
  precoVenda: number;
  precoOriginal?: number;
  quantidadeEstoque: number;
  descricao: string;
  imagemUrl?: string;
  especificacoes?: Record<string, string>;
  tags?: ProdutoTag[];
};

export type CartItem = {
  produto: Produto;
  quantidade: number;
};

export type OrdemServico = {
  numero: string;
  clienteNome: string;
  aparelho: string;
  defeito: string;
  status: "AGUARDANDO" | "EM_ANDAMENTO" | "PRONTO" | "ENTREGUE";
  createdAt: string;
  previsaoEntrega: string;
  historico?: { data: string; descricao: string }[];
};
