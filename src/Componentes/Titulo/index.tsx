import { useNavigate } from 'react-router';
import styles from './Titulo.module.scss';
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoBagHandleOutline } from "react-icons/io5";
import { useContext, useState } from 'react';
import { AppContext } from 'main';

export default function Titulo() {
  const titulos = ["Inicio", "Catálogo", "Sobre nós"];
  const [labelClicada, setLabelClicada] = useState<number | null>(0);
  const { itensCarrinho } = useContext(AppContext)!;
  const navigate = useNavigate();
  const handleClick = (index: number) => {
    setLabelClicada(index);
    switch (index) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/catalogo');
        break;
      case 2:
        navigate('/sobrenos');
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <div className={styles.titulo}>
        <img src='../assets/imagens/header/logo.png' alt='logo' />
        <div className={styles.labels}>
          {titulos.map((item, index) => (
            <label key={index}
              onClick={() => handleClick(index)}
              style={{ color: labelClicada === index ? 'rgb(105, 105, 105)' : '', textDecoration: labelClicada === index ? 'underline' : '' }}
            >{item}</label>
          ))}
        </div>
        <div className={styles.icons}>
          <div className={styles.icons__sacola}
            onClick={() => {
              navigate("/sacola");
              handleClick(5)
            }} >
            <div className={styles.icons__sacola__clique}>
              <IoBagHandleOutline size={30} style={{ marginRight: '20px' }} />
              <label style={{display: itensCarrinho.length !== 0 ? 'flex' : 'none' }}>{itensCarrinho.length}</label>
            </div>
          </div>
          <MdOutlineSupportAgent size={30} color='rgb(1, 1, 85)' />
        </div>
      </div>
    </div>
  )
}