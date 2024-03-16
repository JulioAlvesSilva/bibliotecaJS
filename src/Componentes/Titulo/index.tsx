import { useLocation, useNavigate } from 'react-router';
import styles from './Titulo.module.scss';
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoBagHandleOutline } from "react-icons/io5";
import { useContext } from 'react';
import { AppContext } from 'main';

export default function Titulo() {
  const titulos = ["Inicio", "Catálogo", "Sobre nós"];
  const { itensCarrinho, CliqueWhats} = useContext(AppContext)!;
  const navigate = useNavigate();
  const location = useLocation();
  let labelClicada: number | null = null;

  if (location.pathname === '/') {
    labelClicada = 0;
  } else if (location.pathname === '/catalogo') {
    labelClicada = 1;
  } else if (location.pathname === '/sobrenos') {
    labelClicada = 2;
  }

  return (
    <div>
      <div className={styles.titulo}>
        <img src='../assets/imagens/header/logo.png' alt='logo' />
        <div className={styles.labels}>
          {titulos.map((item, index) => (
            <label key={index}
            onClick={() => navigate(index === 0 ? '/' : index === 1 ? '/catalogo' : '/sobrenos')}
              style={{ color: labelClicada === index ? 'rgb(105, 105, 105)' : '', textDecoration: labelClicada === index ? 'underline' : '' }}
            >{item}</label>
          ))}
        </div>
        <div className={styles.icons}>
          <div className={styles.icons__sacola}
            onClick={() => {
              navigate("/sacola");
            }} >
            <div className={styles.icons__sacola__clique}>
              <IoBagHandleOutline size={30} style={{ marginRight: '20px' }} />
              <label style={{display: itensCarrinho.length !== 0 ? 'flex' : 'none' }}>{itensCarrinho.length}</label>
            </div>
          </div>
          <MdOutlineSupportAgent size={30} color='rgb(1, 1, 85)' className={styles.icons__svg2}
          onClick={CliqueWhats}
          />
        </div>
      </div>
    </div>
  )
}
