import livros from 'date/dadosLivros/livros.json'
import styles from './Itens.module.scss'
import { useNavigate } from 'react-router';
import { FcGlobe } from "react-icons/fc";


type Props = typeof livros[0]

export default function Itens(item: Props) {
    const estrelaCheia = "★"
    const estrelaVazia = "☆"
    const { titulo, src, resumo, preco, idioma, estrelas, categoria, avaliacao, autor, ano, id } = item
    const navigate =  useNavigate();

    const navegarCatalago = (id: number) => {
        navigate(`/produto/${id}`);
        window.scrollTo(0, 0);
    }
    
    return (
        <div className={styles.card}
        onClick={() => navegarCatalago(id) }>
            <img src={`assets/imagens/livros/${src}.jpg`} alt={titulo} />
            <div className={styles.card__inf}>
                <h2>{titulo} <strong>{`(${ano})`}</strong></h2>
                <p>{resumo}</p>
                <p>Autor: <strong>{autor}</strong></p>
                <div className={styles.card__inf__dl}>
                    <div className={styles.card__inf__dl__1st}>
                        <label>{categoria}</label>
                        <label className={styles.card__inf__dl__1st__stars}>{estrelaCheia.repeat(estrelas) + estrelaVazia.repeat(5 - (estrelas))}<strong>({avaliacao})</strong></label>
                        <label><FcGlobe style={{ verticalAlign: 'bottom' }} /> Idioma: <strong>{idioma}</strong></label>
                    </div>
                    <div className={styles.card__inf__dl__2st}>
                        <label className={styles.card__inf__dl__2st__de}>
                            de: R$
                            {(preco + (preco * 0.1)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </label>
                        <label>R$ {(preco - 0.01).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}