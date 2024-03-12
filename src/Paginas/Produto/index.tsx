import styles from './Produto.module.scss';
import itens from 'date/dadosLivros/livros.json'
import { IoIosGlobe } from "react-icons/io";
import { useNavigate, useParams } from 'react-router';
import { FaShoppingBag, FaBook } from "react-icons/fa";
import { useContext, useEffect, useState } from 'react';
import { AppContext } from 'main';
import { Iitem } from 'Types/itens';
import { v4 as uuidv4 } from 'uuid';
import { Embaralhar } from 'Types/hooks/aleatorio';

export default function Produto() {
    const { id } = useParams();
    const itemAtual = itens.filter(item => item.id === Number(id));
    const estrelaCheia = "★"
    const estrelaVazia = "☆"
    const navigate = useNavigate();
    const { setItensCarrinho, itensCarrinho } = useContext(AppContext)!;
    const somaPrecos = itensCarrinho.reduce((total, item) => total + item.preco, 0);
    const [exibir, setExibir] = useState(false);
    const meuId = uuidv4();

    useEffect(() => {
        const tempoEx = setTimeout(() => {
            setExibir(false)
        }, 3000)
        return () => clearTimeout(tempoEx)
    }, [exibir])

    const listaInicialVariavel = Embaralhar(itens);

    let [listaVariavel, setListaVariavel] = useState(listaInicialVariavel)
    useEffect(() => {
        const interval = setInterval(() => {
            setListaVariavel(Embaralhar([...listaVariavel]));
        }, 5000);

        return () => clearInterval(interval);
    }, [listaVariavel]);

    function addItensCar(novoItem: Iitem) {
        setItensCarrinho([...itensCarrinho, novoItem])
    }

    return (
        <section className={styles.produto}>
            {itemAtual.map(item => (
                <div key={item.id} className={styles.itens}>
                    <img src={`../../assets/imagens/livros/${item.src}.jpg`} alt={item.titulo} />
                    <div className={styles.container}>
                        <h1>
                            {item.titulo} <strong>{`(${item.avaliacao})`}</strong>
                        </h1>
                        <p>{item.resenha}</p>
                        <label>Autor: <strong>{item.autor}</strong></label>
                        <label className={styles.estrelas}> {estrelaCheia.repeat(item.estrelas) + estrelaVazia.repeat(5 - (item.estrelas))}<strong>({item.avaliacao})</strong></label>
                        <label><IoIosGlobe style={{ verticalAlign: 'bottom' }} /> Idioma: <strong>{item.idioma}</strong></label>
                        <div className={styles.container__fl}>
                            <label>{item.categoria}</label>
                            <label className={styles.container__fl__preco}>R$ {(item.preco - 0.01).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</label>
                        </div>
                    </div>
                </div>
            ))}
            <div className={styles.adicional}>
                <div className={styles.adicional__sacola}>
                    <div className={styles.adicional__sacola__preco}>
                        <FaShoppingBag size={25} />
                        <label>{`R$: ${(somaPrecos - (0.01 * itensCarrinho.length)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</label>
                    </div>
                    <button
                        onClick={() => navigate("/sacola")}
                    >Ver sacola</button>
                </div>
                <div className={styles.adicional__itens}>
                    {listaVariavel.slice(0, 2).map(item => (
                        <div className={styles.adicional__itens__cont} key={item.id}>
                            <img src={`../../assets/imagens/livros/${item.src}.jpg`} alt='livro1' />
                            <label onClick={() => navigate(`/produto/${item.id}`)}>Ver mais</label>
                        </div>
                    ))}
                </div>
                <div className={styles.adicional__adicionar}>
                    <p style={{ display: exibir ? 'flex' : 'none' }}>Livro adicionado</p>
                    <button
                        onClick={() => {
                            const livroSelec = itemAtual[0];
                            const novoItem = {
                                id: livroSelec.id,
                                nome: livroSelec.titulo,
                                preco: livroSelec.preco,
                                src: livroSelec.src,
                                idAlt: meuId
                            }
                            addItensCar(novoItem);
                            setExibir(true)
                        }}
                    >Adicionar livro <FaBook />
                    </button>
                </div>
            </div>
        </section>
    )
}