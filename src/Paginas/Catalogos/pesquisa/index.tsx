import styles from './Pesquisa.module.scss'

interface Props  {
    pesquisa: string,
    setPesquisa: React.Dispatch<React.SetStateAction<string>>
}
export default function Pesquisa({pesquisa, setPesquisa}: Props) {
    return(
        <div className={styles.pesquisa}>
            <input 
            type='search'
            value={pesquisa}
            onChange={(evento)=> setPesquisa(evento.target.value)}
            placeholder='Buscar'
            />
        </div>
    )
}