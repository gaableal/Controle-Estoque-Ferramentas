// src/app/models/item.interface.ts
export interface Item {
  id: number;
  nome: string;
  quantidade: number;
  imagemUrl?: string;
  descricao?: string;
  imagens?: string[];
}

