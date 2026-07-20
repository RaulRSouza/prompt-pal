export type Produto = {
  id: string;
  nome: string;
  categoria: string;
  precoVenda: number;
  quantidadeEstoque: number;
  descricao: string;
  imagemUrl?: string;
  especificacoes?: Record<string, string>;
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
