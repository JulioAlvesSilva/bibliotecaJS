import Styles from './SobreNos.module.scss'
import dados from './dados.json'

export function SobreNos() {
    return (
        <section className={Styles.sobreNos}>
            {dados.map((dados, index) => (
                <div className={Styles.sobreNos__itens} key={index}>
                    <h2>{dados.titulo}</h2>
                    {index === 1 && window.innerWidth > 600 ? (
                        <div>
                            <p>{dados.texto}</p>
                            <img src={`/assets/imagens/sobreNos/${dados.src}`} alt={dados.src} />
                        </div>
                    ) : (
                        <div>
                            <img src={`/assets/imagens/sobreNos/${dados.src}`} alt={dados.src} />
                            <p>{dados.texto}</p>
                        </div>
                    )}
                </div>
            ))}
        </section>
    )
}