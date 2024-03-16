import Styles from './Rodape.module.scss';
import dadosFiltor from '../../Paginas/Catalogos/filtros/dados.json'
import { IoLogoInstagram, IoLogoLinkedin, IoLogoFacebook, IoLogoWhatsapp } from "react-icons/io";
import { AppContext } from 'main'
import { useContext } from 'react';
import { useNavigate } from 'react-router';

interface Props {
    id: number;
    Categoria: string;
}

export function Rodape() {

    const { SelecFiltro, CliqueNoFace, CliqueNoIsta, CliqueNoLinkedin, CliqueWhats } = useContext(AppContext)!;
    const navigate = useNavigate()

    const irCatalogoFiltro = (item: Props) => {
        navigate('/catalogo');
        SelecFiltro(item);
        window.scrollTo(0, 0);
    }

    return (
        <div className={Styles.rodape}>
            <div className={Styles.rodape__icons}>
                < IoLogoInstagram color='rgb(136, 0, 106)'
                    onClick={CliqueNoIsta}
                />
                < IoLogoLinkedin color='RGB(0, 119, 181)'
                    onClick={CliqueNoLinkedin}
                />
                < IoLogoFacebook color='RGB(0, 34, 109)'
                    onClick={CliqueNoFace}
                />
                < IoLogoWhatsapp color='RGB(0, 172, 63)'
                    onClick={CliqueWhats}
                />
            </div>
            <div className={Styles.rodape__2ln}>
                <img src="/assets/imagens/header/logo.png" alt="logo da livraria" />
                <div className={Styles.rodape__2ln__infs}>
                    <ul>
                        <h4>Categorias</h4>
                        {dadosFiltor.map(item => (
                            <div key={item.id}>
                                <li
                                    onClick={() => irCatalogoFiltro(item)}
                                >{item.Categoria}</li>
                            </div>
                        ))}
                    </ul>
                    <ul>
                        <h4>Fale conosco</h4>
                        <li
                            onClick={CliqueWhats}
                        >Dúvidas</li>
                        <li
                            onClick={CliqueWhats}
                        >Sugestões</li>
                        <li
                            onClick={CliqueWhats}
                        >Reclamações</li>
                    </ul>
                </div>
            </div>
            <div className={Styles.rodape__direitos}>
                <p>JSweb © 2023 todos os direitos reservados</p>
            </div>
        </div>
    )
}
