import { useContext, useEffect, useState } from 'react'
import livrossacola from 'date/dadosLivros/livros.json'
import styles from './Sacola.module.scss'
import { AppContext } from 'main'
import { HiTrash } from "react-icons/hi2";
import { useNavigate } from 'react-router';

export default function Sacola() {

    const { itensCarrinho, setItensCarrinho } = useContext(AppContext)!;
    const somaPrecos = itensCarrinho.reduce((total, item) => total + item.preco, 0);
    const [desconto, setDesconto] = useState(0);
    const [popUp, setPopUp] = useState(false);
    const [idRemover, SetIdRemover] = useState('')
    const [nomeLivroRemover, setNomeLivroRemover] = useState("");
    const [valorProgr, setValorProgr] = useState(0)
    const [barraProgre, setBarraProgre] = useState(0);
    const estrelaCheia = "★"
    const estrelaVazia = "☆"
    const navigate = useNavigate();


    useEffect(() => {
        if (somaPrecos > 150 && somaPrecos < 250) {
            setDesconto(somaPrecos * 0.1);
            setValorProgr(10);
        } else if (somaPrecos >= 250 && somaPrecos < 350) {
            setDesconto(somaPrecos * 0.15);
            setValorProgr(15);
        } else if (somaPrecos > 350) {
            setDesconto(somaPrecos * 0.25);
            setValorProgr(25);
        } else if (somaPrecos < 150) {
            setDesconto(0);
            setValorProgr(0);
        }
        setBarraProgre((somaPrecos / 350) * 100);

    }, [somaPrecos])

    function removerItem() {
        const novoArray = itensCarrinho.filter(item => item.idAlt !== idRemover);
        setItensCarrinho(novoArray);
    }

    function manPopUp(id: number, idAlt: string) {
        setPopUp(!popUp);
        SetIdRemover(idAlt);
        const nomeLivroDelete = itensCarrinho.filter(item => item.id === id);
        setNomeLivroRemover(nomeLivroDelete[0]?.nome);
    }

    return (
        <section className={styles.sacola}>
            <div className={styles.sacola__itens}>
                <div className={styles.sacola__itens__vazio}
                    style={{ display: itensCarrinho.length <= 0 ? 'flex' : 'none' }}>
                    <label>Sua sacola esta vazia 😕, clique <strong onClick={() => navigate('/catalogo')}>aqui</strong> e confira nosso catálogo.</label>
                </div>
                <div style={{ display: itensCarrinho.length <= 0 ? 'flex' : 'none' }}
                className={styles.sacola__item}>
                    {livrossacola.map(list => (
                        <div className={styles.sacola__item__itens}
                            onClick={() => navigate(`/produto/${list.id}`)} key={list.id} >
                            <img src={`/assets/imagens/livros/${list.src}.jpg`} alt={list.titulo} />
                            <label style={{color: 'gold', fontWeight:'400'}} 
                            className={styles.estrelas}> {estrelaCheia.repeat(list.estrelas) + estrelaVazia.repeat(5 - (list.estrelas))}<strong>({list.avaliacao})</strong></label>
                            <label>{`R$: ${(list.preco - 0.01).toFixed(2)}`}</label>
                        </div>
                    ))}
                </div>
                {itensCarrinho.map(item => (
                    <div key={item.id} className={styles.sacola__itens__sac}>
                        <img src={`../../assets/imagens/livros/${item.src}.jpg`} alt={item.nome} />
                        <p style={{ textAlign: 'unset' }}>{item.nome}</p>
                        <label>{`R$: ${(item.preco - 0.01).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</label>
                        <HiTrash size={25} color='rgb(0, 1, 85)'
                            onClick={() => manPopUp(item.id, item.idAlt)}
                            style={{ cursor: 'pointer' }} />
                    </div>
                ))}
            </div>
            <div className={styles.sacola__2pg}>
                <img src='/assets/imagens/sacola/img1.png' alt='promoção' />
                <div className={styles.sacola__2pg__2ln}>
                    <div className={styles.barraProgresso}>
                        <div className={styles.barraProgresso__barra}>
                            <div className={styles.barraProgresso__barra__progreco}
                                style={{ width: `${barraProgre}%` }}
                            ></div>
                        </div>
                        <div className={styles.pontos} style={{ marginTop: '5px', fontWeight: '900' }}>
                            <label>{`${valorProgr} %`}</label>
                        </div>
                    </div>
                    <div className={styles.sacola__2pg__2ln__precos}>
                        <div className={styles.sacola__2pg__2ln__precos__item}>
                            <label>Valor da compra: </label>
                            <label><strong>{` R$ ${(somaPrecos - (itensCarrinho.length * 0.01)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</strong></label>
                        </div>
                        <div className={styles.sacola__2pg__2ln__precos__item}>
                            <label>Desconto: </label>
                            <label><strong>{`R$ ${desconto.toFixed(2)}`}</strong></label>
                        </div>
                        <div className={styles.sacola__2pg__2ln__precos__item}>
                            <p>Valor total: </p>
                            <p><strong>{`R$ ${(somaPrecos - desconto).toFixed(2)}`}</strong></p>
                        </div>
                    </div>
                </div>
                <button>Efetuar pagamento</button>
            </div>
            <div className={styles.sacola__popup}
                style={{ display: popUp ? 'flex' : 'none' }}
            >
                <p>Você realmente deseja retirar o livro: <strong>{nomeLivroRemover}</strong></p>
                <div className={styles.sacola__popup__sn}>
                    <label onClick={() => {
                        removerItem();
                        setPopUp(false)
                    }
                    }>Sim</label>
                    <label
                        onClick={() => setPopUp(false)}>Não</label>
                </div>
            </div>
        </section>
    )
}