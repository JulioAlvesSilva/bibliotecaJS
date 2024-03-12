/* eslint-disable react-hooks/exhaustive-deps */
import styles from './Catalogos.module.scss'
import livros from 'date/dadosLivros/livros.json'
import { useContext, useEffect, useState } from 'react';
import { CgChevronDoubleDown, CgChevronDoubleUp } from "react-icons/cg";
import categoriasLivros from './filtros/dados.json'
import Itens from './itens';
import Filtro from './filtros';
import Pesquisa from './pesquisa';
import { HiOutlineSearch } from "react-icons/hi";
import Ordenar from './ordenar';
import { Embaralhar } from 'Types/hooks/aleatorio';
import {AppContext} from 'main'

export default function Catalogos() {

    const { filtro } = useContext(AppContext)!;
    const livrosEmbaralhados = Embaralhar(livros);
    let [verMais, setVerMais] = useState(10);
    const [pesquisa, setPesquisa] = useState('');
    const [ordenador, setOrdenador] = useState('')
    const [itemLista, setItemLista] = useState(livrosEmbaralhados)
    const novoFiltro = categoriasLivros.filter(item => item.id === filtro)
    const segFiltro = novoFiltro.find(item => item.Categoria)
    const terFiltro = segFiltro ? segFiltro.Categoria : '';

    function AddVerMais() {
        if (verMais < (terFiltro !== '' ? terFiltro : livrosEmbaralhados).length) {
            setVerMais(verMais + 10);
        }
    }
    function AddVerMenos() {
        if (verMais > 10) {
            setVerMais(verMais - 10);
        }
    }

    function testePesquisa(titulo: string) {
        const regex = new RegExp(pesquisa, 'i');
        return regex.test(titulo)
    }
    function ordenar(novaLista: typeof livros) {
        switch (ordenador) {
            case ("avaliacao"):
                return novaLista.sort((a, b) => a.estrelas > b.estrelas ? -1 : 1)
            case 'qtd_avaliacao':
                return novaLista.sort((a, b) => a.avaliacao > b.avaliacao ? -1 : 1);
            case 'preco':
                return novaLista.sort((a, b) => a.preco > b.preco ? 1 : -1);
            default:
                return novaLista;
        }
    }
    useEffect(() => {
        const novaLista = livros.filter(item => (terFiltro !== '' ? item.categoria === terFiltro : true) && testePesquisa(item.titulo))
        const listaOrdenada = ordenar(novaLista)
        setItemLista(listaOrdenada)
    }, [pesquisa, terFiltro, ordenador])



    return (
        <section className={styles.catalogos}>
            <Filtro />
            <div className={styles.ordenadorPesq}>
                <div className={styles.PesquisaOrdenar}>
                    <Pesquisa
                        pesquisa={pesquisa}
                        setPesquisa={setPesquisa}
                    />
                    <HiOutlineSearch size={21} />
                </div>
                <Ordenar
                    ordenador={ordenador}
                    setOrdenador={setOrdenador}
                />
            </div>
            {itemLista.slice(0, verMais).map(livro => (
                <Itens key={livro.titulo} {...livro} />
            ))}
            <div className={styles.card__inf__verMais}
                onClick={AddVerMais}
                style={{ display: verMais < (itemLista).length ? "flex" : "none" }}
            >
                <label>
                    Ver mais <CgChevronDoubleDown
                        style={{ verticalAlign: 'bottom' }} />
                </label>
            </div>
            <div className={styles.card__inf__verMenos}
                onClick={AddVerMenos}
                style={{
                    display:
                      verMais > 10 && (terFiltro.length !== 0 ? terFiltro.length > 10 : true)
                        ? 'flex'
                        : 'none',
                  }}
            >
                <label>
                    Ver menos <CgChevronDoubleUp
                        style={{ verticalAlign: 'bottom' }} />
                </label>
            </div>
        </section>
    )
}