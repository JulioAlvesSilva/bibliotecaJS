import Style from './Inicio.module.scss'
import livrosCar from 'date/dadosLivros/livros.json';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsBook, BsRocketTakeoff } from "react-icons/bs";

export default function Inicio() {
    const navigate = useNavigate();
    const chaves = [{ src: "livro1", id: 1 }, { src: "livro10", id: 10 }, { src: "livro40", id: 40 }];
    const [telefone, setTelefone] = useState('');
    const [click, setClick] = useState(false);
    const [telaQnt, setTelaQnt] = useState(window.innerWidth > 590 ? 5 : 3);
    const listaHeader = ["header1.png", "header2.png","header4.png"];

    function aoClicar() {
        setClick(!click)
    }


    const formatarTelefone = (value: string) => {
        const cleaned = ('' + value).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            setTelefone(`(${match[1]}) ${match[2]}-${match[3]}`);
        } else {
            setTelefone(value);
        }
    };
    useEffect(() => {
        const atualizarTelaQnt = () => {
            setTelaQnt(window.innerWidth > 590 ? 5 : 3);
        };
        window.addEventListener('resize', atualizarTelaQnt);
        return () => {
            window.removeEventListener('resize', atualizarTelaQnt);
        };
    }, []);


    let sliderRef = useRef<Slider>(null);

    const menu = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: telaQnt,
        slidesToScroll: 3
    };
    const menu2 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const menu3 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const goToNextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const goToPrevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };
    return (
        <section className={Style.principal}>
             
            <div className={Style.header}>
            <Slider {...menu3}>
                {listaHeader.map((item, index) => (
                    <div key={index}>
                        <img src={`/assets/imagens/header/header/${item}`} alt={`imagem ${index}`} />
                    </div>
                ))}
            </Slider>
            </div>

            <div className={Style.slid}
                style={{ width: '95vw' }}>
                <div className={Style.slid__titulo}>
                    <div>
                        <h2>Confira nossos livros</h2>
                        <BsBook size={35} />
                    </div>
                    <label onClick={() => navigate('/catalogo')}>Ver mais</label>
                </div>
                <Slider {...menu} ref={sliderRef}>
                    {livrosCar.map(itens => (
                        <div key={itens.id} className={Style.livros}>
                            <img src={`/assets/imagens/livros/${itens.src}.jpg`} alt={itens.titulo} />
                            <div className={Style.livros__infs}>
                                <label>{itens.titulo}</label>
                                <div className={Style.livros__infs__1dv}>
                                    <button onClick={() => {
                                        navigate(`/produto/${itens.id}`)
                                        window.scrollTo(0, 0);
                                    }
                                    }>Adicionar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <BsFillArrowLeftCircleFill
                    size={35}
                    onClick={goToPrevSlide}
                    className={Style.SetaEsquerda}
                />
                <BsFillArrowRightCircleFill
                    size={35}
                    onClick={goToNextSlide}
                    className={Style.SetaDireita}
                />
            </div>
            <div className={Style.top3}>
                <div className={Style.top3__titulo}>
                    <h2>Top 3 semanal</h2>
                    <BsRocketTakeoff size={35} />
                </div>
                <div className={Style.top3__img}>
                    {chaves.map(chave => (
                        <img
                            key={chave.id}
                            src={`/assets/imagens/livros/${chave.src}.jpg`}
                            alt={chave.src}
                            onClick={() => {
                                navigate(`/produto/${chave.id}`)
                                window.scrollTo(0, 0);
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className={Style.let}>
                <h2>Beneficios da leitura</h2>
                <div className={Style.leitura}>
                    <div className={Style.leitura__pt1}>
                        <Slider {...menu2} >

                            <div><img src='/assets/imagens/leitura/livro1.png' alt='livro1' /></div>
                            <div><img src='/assets/imagens/leitura/livro2.png' alt='livro2' /></div>
                            <div><img src='/assets/imagens/leitura/livro3.png' alt='livro3' /></div>

                        </Slider>
                    </div>
                    <div className={Style.leitura__pt2}>
                        <p>A leitura oferece uma infinidade de benefícios para a mente, o corpo e a alma. Desde expandir o conhecimento até reduzir o estresse, a leitura é uma prática que pode enriquecer profundamente a vida de uma pessoa. Aqui estão alguns dos principais benefícios da leitura:</p>
                        <ul>
                            <li><strong>Expansão do Conhecimento:</strong> A leitura expõe você a novas ideias, culturas, histórias e informações. Isso ajuda a expandir seus horizontes e a adquirir conhecimento em uma ampla gama de tópicos.</li>
                            <li><strong>Melhora da Habilidade de Comunicação: </strong>Ler regularmente pode melhorar sua habilidade de comunicação verbal e escrita. Expor-se a diferentes estilos de escrita e vocabulário pode enriquecer sua própria maneira de se expressar.</li>
                            <li><strong>Redução do Estresse: </strong>A leitura é uma forma comprovada de reduzir o estresse e a ansiedade. Perder-se em um bom livro pode ajudar a relaxar e a aliviar as tensões do dia a dia.</li>
                            <li><strong>Estímulo Mental: </strong>A leitura regular estimula o cérebro, melhorando a memória, a concentração e a capacidade de foco. Isso pode ser especialmente benéfico à medida que envelhecemos para manter a saúde mental.</li>
                            <li><strong>Aumento da Empatia: </strong>Ao se colocar no lugar dos personagens de um livro, você pode desenvolver uma maior compreensão e empatia pelos outros, o que pode melhorar seus relacionamentos pessoais.</li>
                            <li><strong>Melhoria do Sono: </strong>Ler antes de dormir pode ajudar a relaxar a mente e a preparar o corpo para o sono, contribuindo para uma melhor qualidade de sono.</li>
                            <li><strong>Entretenimento e Diversão: </strong>Além de todos os benefícios mencionados, a leitura também pode ser uma forma de entretenimento e diversão, proporcionando horas de prazer e escapismo.</li>
                        </ul>
                        <p>Em resumo, a leitura é uma prática que oferece uma infinidade de benefícios para o bem-estar físico, mental e emocional. Fazer da leitura um hábito regular pode enriquecer sua vida de várias maneiras e ajudar a alcançar um maior entendimento do mundo e de si mesmo.</p>
                    </div>
                </div>
            </div>
            <div className={Style.formulario}>
                <h2 style={{ display: click ? 'none' : '' }}>Preencha os campos e cadastre para receber nossas promoções!</h2>
                <form action="" style={{ display: click ? 'none' : 'flex' }} onSubmit={(e) => {
                    e.preventDefault();
                    aoClicar();
                }}>
                    <ul>
                        <li>
                            <label>Nome</label>
                            <input type="text" placeholder='Digite seu nome' required />
                        </li>
                        <li>
                            <label>E-mail</label>
                            <input type="email" placeholder='Digite seu E-mail' required />
                        </li>
                        <li>
                            <label>Telefone</label>
                            <input type="text" min={0} placeholder='Digite seu telefone'
                                value={telefone}
                                onChange={(e) => formatarTelefone(e.target.value)} required />
                        </li>
                    </ul>
                    <button type='submit'>Cadastrar</button>
                </form>
                <label className={Style.formulario__label} style={{ display: click ? 'flex' : 'none' }}>Cadastro realizado, em breve você recebera nossas pormoções 😊!</label>

            </div>
        </section>
    )
}
