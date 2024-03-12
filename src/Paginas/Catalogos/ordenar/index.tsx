import { useState } from 'react';
import styles from './Ordenar.module.scss';
import dados from './dados.json'
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
interface Props {
    ordenador: string,
    setOrdenador: React.Dispatch<React.SetStateAction<string>>
}
export default function Ordenar({ ordenador, setOrdenador }: Props) {
    const [aberto, setAberto] = useState(false)
    const nomeOrd = ordenador && dados.find(item => item.value === ordenador)?.nome
    return (
        <button
            style={{
                backgroundColor: (ordenador !== '' && !aberto) ? "rgb(0, 0, 160)" : "",
                color: (ordenador !== '' && !aberto) ? "white" : "black",
                border: aberto ? '0' : '',
            }}
            className={styles.ordenador}
            onClick={() => setAberto(!aberto)}
            onBlur={() => setAberto(false)}
        >
            <span style={{ display: aberto ? 'none' : '' }}>{nomeOrd || "Ordenar por"}</span>
            {!aberto ? <MdKeyboardArrowDown size={25} /> : ""}
            <div className={styles.labels}
                style={{ display: aberto ? 'flex' : 'none' }}>
                {dados.map(item => (
                    <span onClick={() => setOrdenador(item.value)} key={item.value}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                {item.nome}
                            </div>
                            <MdKeyboardArrowUp size={25} />
                        </div>
                    </span>
                ))}
            </div>
        </button>
    )
}