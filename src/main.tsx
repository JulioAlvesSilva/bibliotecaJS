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
    CliqueNoFace: () => void;
    CliqueWhats: () => void;
    CliqueNoIsta: () => void;
    CliqueNoLinkedin: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {

    const [itensCarrinho, setItensCarrinho] = useState<Iitem[]>([]);
    const [filtro, setFiltro] = useState<number | null>(null);
    const phoneNumber = '62993129673';
    const message = 'Olá, como posso ajudar?';

    function SelecFiltro(item: Ifiltro) {
        if (filtro === item.id) return setFiltro(null)
        return setFiltro(item.id)
    }

    const CliqueWhats = () => {
        const isMobile = window.innerWidth <= 700;
        const baseUrl = isMobile ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
            : `https://web.whatsapp.com/send?phone=${encodeURIComponent(phoneNumber)}&text=${encodeURIComponent(message)}`
        window.open(baseUrl, '_blank');
    };
    const CliqueNoIsta = () => {
        const instagram = "https://www.instagram.com/jswebprogramador?igsh=MWl5dnRqdHg1bjM2OQ=="
        window.open(instagram, '_blank');
    }
    const CliqueNoFace = () => {
        const facebook = "https://www.facebook.com/profile.php?id=61553007513798&mibextid=ZbWKwL"
        window.open(facebook, '_blank');
    }

    const CliqueNoLinkedin = () => {
        const linkedin = "www.linkedin.com/in/júlio-cesar-alves-da-silva-b72732a8"
        window.open(linkedin, '_blank');
    }

    return (
        <AppContext.Provider value={{ setItensCarrinho, itensCarrinho, SelecFiltro, setFiltro, filtro, CliqueNoFace, CliqueNoIsta, CliqueWhats, CliqueNoLinkedin }}>
            {children}
        </AppContext.Provider>
    );
};
