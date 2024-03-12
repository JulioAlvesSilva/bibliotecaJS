import itens from 'date/dadosLivros/livros.json'

export interface Iitem{
    id: number;
    nome: string;
    preco: number;
    src: string;
    idAlt: string
}

export type ILivros = typeof itens;