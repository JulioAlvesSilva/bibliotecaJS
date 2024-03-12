import React, { ReactNode, createContext, useState } from 'react';
import categorias from './Paginas/Catalogos/filtros/dados.json'
import { Iitem } from 'Types/itens';
type Ifiltro = typeof categorias[0]

interface AppContextType {
    itensCarrinho: Iitem[];
    setItensCarrinho: React.Dispatch<React.SetStateAction<Iitem[]>>;
    filtro: number | null;
    setFiltro: React.Dispatch<React.SetStateAction<number | null>>;
    SelecFiltro: (item: Ifiltro) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {

    const [itensCarrinho, setItensCarrinho] = useState<Iitem[]>([]);
    const [filtro, setFiltro] = useState<number | null>(null);

    function SelecFiltro(item: Ifiltro) {
        if(filtro === item.id) return setFiltro(null)
         return setFiltro(item.id)
    }

    return (
        <AppContext.Provider value={{ setItensCarrinho, itensCarrinho, SelecFiltro, setFiltro, filtro  }}>
            {children}
        </AppContext.Provider>
    );
};