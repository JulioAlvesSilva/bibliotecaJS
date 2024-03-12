import { useContext } from 'react';
import style from './Filtro.module.scss'
import categorias from  './dados.json'
import {AppContext} from 'main'

export default function Filtro() {

    const { filtro, SelecFiltro } = useContext(AppContext)!;

    return (
        <div className={style.filtro}>
            {categorias.map((item) => (
                <button
                    key={item.id}
                    onClick={() => SelecFiltro(item)}
                    style={{
                        backgroundColor: filtro === item.id ?
                            "rgb(160, 217, 255)" : 'rgb(0, 0, 160)',
                        color: filtro === item.id ? "black" : 'white',
                        fontSize: filtro === item.id ? '1.07rem' : '1rem'
                    }}
                >
                    {item.Categoria}
                </button>
            ))}
        </div>
    )
}