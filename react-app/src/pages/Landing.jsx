import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import {
    iniciarSessaoStudyLens,
} from "../services/studySession";

import "../styles/landing.css";

import cameraJoviImage from "../assets/landing/imagem1.jpeg";
import conteudoGeradoImage from "../assets/landing/imagem2.jpeg";
import flashcardsEstudoImage from "../assets/landing/imagem3.png";

function Landing() {
    const navigate =
        useNavigate();
    
    const [
        etapaAtiva,
        setEtapaAtiva
    ] = useState(null);

    const stepsRef =
        useRef(null);


    useEffect(() => {

        function fecharAoClicarFora(
            event
        ) {

            if (
                !etapaAtiva ||
                !stepsRef.current
            ) {
                return;
            }

            const cardClicado =
                event.target.closest(
                    ".step-card"
                );

            if (
                cardClicado &&
                stepsRef.current.contains(
                    cardClicado
                )
            ) {
                return;
            }

            setEtapaAtiva(null);
        }


        document.addEventListener(
            "pointerdown",
            fecharAoClicarFora
        );


        return () => {
            document.removeEventListener(
                "pointerdown",
                fecharAoClicarFora
            );
        };

    }, [etapaAtiva]);


    function alternarEtapa(
        numeroEtapa
    ) {
        setEtapaAtiva(
            (etapaAtual) =>
                etapaAtual === numeroEtapa
                    ? null
                    : numeroEtapa
        );
    }


    function experimentarStudyLens() {
        iniciarSessaoStudyLens();

        navigate(
            "/app"
        );
    }


    return (
        <div className="landing-page">

            <header className="site-header">

                <nav
                    className="navbar"
                    aria-label="Navegação principal"
                >

                    <a href="#inicio" className="logo">
                        StudyLens
                    </a>

                    <ul className="nav-links">

                        <li>
                            <a href="#solucao">
                                A Solução
                            </a>
                        </li>

                        <li>
                            <a href="#como-funciona">
                                Como Funciona
                            </a>
                        </li>

                        <li>
                            <a href="#publico-alvo">
                                Público-Alvo
                            </a>
                        </li>

                        <li>
                            <a href="#galeria">
                                Galeria
                            </a>
                        </li>

                        <li>
                            <a href="#equipe">
                                Nossa Equipe
                            </a>
                        </li>

                        <li>
                            <a href="#contato">
                                Contato
                            </a>
                        </li>

                    </ul>

                </nav>

            </header>


            <main>

                <section
                    id="inicio"
                    className="hero"
                >

                    <div className="hero-content">

                        <p className="hero-label">
                            NEXTAGE × JOVI
                        </p>

                        <h1>
                            Transforme sua câmera
                            em uma ferramenta
                            para aprender.
                        </h1>

                        <p className="hero-highlight">
                            Estude a partir do que você já tem em mãos.
                        </p>

                        <p className="hero-description">
                            Fotografe uma lousa, apostila, caderno ou projetor.
                            O StudyLens utiliza inteligência artificial para interpretar
                            o conteúdo e transformá-lo em uma experiência de estudo
                            personalizada.
                        </p>

                        <div className="hero-actions">

                            <a
                                href="#solucao"
                                className="button button-secondary"
                            >
                                Conheça a solução
                            </a>

                            <button
                                type="button"
                                className="button button-primary"
                                onClick={
                                    experimentarStudyLens
                                }
                            >
                                Experimentar StudyLens
                            </button>

                            <a
                                href="https://github.com/br330a/StudyLens"
                                className="button button-secondary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Ver projeto no GitHub
                            </a>

                        </div>

                    </div>

                </section>


                <section
                    id="solucao"
                    className="section solution"
                >

                    <div className="section-header">

                        <p className="section-label">
                            A SOLUÇÃO
                        </p>

                        <h2>
                            Do conteúdo capturado ao conhecimento.
                        </h2>

                        <p>
                            O StudyLens foi desenvolvido para o Challenge JOVI
                            com o objetivo de transformar a câmera do smartphone
                            em uma ferramenta ativa de aprendizagem. Muitos
                            estudantes fotografam lousas, apostilas e materiais
                            para consultar depois, mas essas capturas acabam
                            dispersas e pouco aproveitadas. O StudyLens utiliza
                            inteligência artificial para interpretar essas
                            imagens e transformá-las em conteúdos organizados
                            para estudo.
                        </p>

                    </div>


                    <div className="solution-grid">

                        <article className="solution-card">

                            <h3>
                                Capture
                            </h3>

                            <p>
                                Fotografe conteúdos de uma lousa, apostila,
                                caderno, projetor ou qualquer material legível.
                            </p>

                        </article>


                        <article className="solution-card">

                            <h3>
                                Entenda
                            </h3>

                            <p>
                                A inteligência artificial identifica a matéria
                                e interpreta o conteúdo capturado.
                            </p>

                        </article>


                        <article className="solution-card">

                            <h3>
                                Estude
                            </h3>

                            <p>
                                Transforme o conteúdo em recursos como
                                resumos, questões e flashcards.
                            </p>

                        </article>

                    </div>

                </section>


                <section
                    id="como-funciona"
                    className="section how-it-works"
                >

                    <div className="section-header">

                        <p className="section-label">
                            COMO FUNCIONA
                        </p>

                        <h2>
                            Do clique ao conhecimento.
                        </h2>

                        <p>
                            O StudyLens transforma uma simples captura em uma
                            experiência de estudo personalizada.
                        </p>

                    </div>


                    <div
                        ref={stepsRef}
                        className="steps-grid"
                    >

                        <article
                            className={`step-card ${
                                etapaAtiva === 1
                                    ? "ativo"
                                    : ""
                            }`}
                            role="button"
                            tabIndex={0}
                            onClick={() =>
                                alternarEtapa(1)
                            }
                            onKeyDown={(event) => {
                                if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                ) {
                                    event.preventDefault();
                                    alternarEtapa(1);
                                }
                            }}
                        >
                            <span className="step-number">
                                01
                            </span>

                            <div>
                                <h3>
                                    Capturar
                                </h3>

                                <p>
                                    Registre conteúdos da sua rotina de estudos diretamente pela câmera JOVI.
                                </p>

                                <div className="step-extra-wrapper">
                                    <div>
                                        <p className="step-extra">
                                            No modo StudyLens, o estudante pode capturar lousas,
                                            cadernos, slides, exercícios e outros materiais,
                                            usando até quatro imagens na mesma análise.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>


                        <article
                            className={`step-card ${
                                etapaAtiva === 2
                                    ? "ativo"
                                    : ""
                            }`}
                            role="button"
                            tabIndex={0}
                            onClick={() =>
                                alternarEtapa(2)
                            }
                            onKeyDown={(event) => {
                                if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                ) {
                                    event.preventDefault();
                                    alternarEtapa(2);
                                }
                            }}
                        >
                            <span className="step-number">
                                02
                            </span>

                            <div>
                                <h3>
                                    Interpretar
                                </h3>

                                <p>
                                    A Inteligência Artificial compreende o conteúdo presente nas imagens.
                                </p>

                                <div className="step-extra-wrapper">
                                    <div>
                                        <p className="step-extra">
                                            O StudyLens identifica matéria, assunto, contexto
                                            e nível pedagógico aparente para adaptar o material
                                            à complexidade encontrada.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>


                        <article
                            className={`step-card ${
                                etapaAtiva === 3
                                    ? "ativo"
                                    : ""
                            }`}
                            role="button"
                            tabIndex={0}
                            onClick={() =>
                                alternarEtapa(3)
                            }
                            onKeyDown={(event) => {
                                if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                ) {
                                    event.preventDefault();
                                    alternarEtapa(3);
                                }
                            }}
                        >
                            <span className="step-number">
                                03
                            </span>

                            <div>
                                <h3>
                                    Estudar
                                </h3>

                                <p>
                                    Transforme a captura em diferentes materiais para aprender e praticar.
                                </p>

                                <div className="step-extra-wrapper">
                                    <div>
                                        <p className="step-extra">
                                            A análise gera resumo, flashcards, questões e
                                            StudyCast, permitindo estudar o mesmo conteúdo
                                            de diferentes maneiras.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>


                        <article
                            className={`step-card ${
                                etapaAtiva === 4
                                    ? "ativo"
                                    : ""
                            }`}
                            role="button"
                            tabIndex={0}
                            onClick={() =>
                                alternarEtapa(4)
                            }
                            onKeyDown={(event) => {
                                if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                ) {
                                    event.preventDefault();
                                    alternarEtapa(4);
                                }
                            }}
                        >
                            <span className="step-number">
                                04
                            </span>

                            <div>
                                <h3>
                                    Revisar
                                </h3>

                                <p>
                                    Continue estudando depois da captura através da Biblioteca StudyLens.
                                </p>

                                <div className="step-extra-wrapper">
                                    <div>
                                        <p className="step-extra">
                                            Os materiais permanecem organizados por conteúdo
                                            e matéria, permitindo acompanhar o histórico e
                                            retomar os estudos posteriormente.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>

                    </div>

                </section>


                <section
                    id="publico-alvo"
                    className="section audience"
                >

                    <div className="section-header">

                        <p className="section-label">
                            PÚBLICO-ALVO
                        </p>

                        <h2>
                            Feito para quem vive a rotina de estudos.
                        </h2>

                        <p>
                            O StudyLens foi pensado principalmente para jovens
                            estudantes que precisam lidar diariamente com grandes
                            volumes de conteúdo. A solução é relevante para esse
                            público porque transforma registros feitos com a câmera
                            em materiais organizados para revisão e aprendizagem,
                            reduzindo a dependência de fotos dispersas na galeria.
                        </p>

                    </div>

                </section>


                <section
                    id="galeria"
                    className="section gallery"
                >

                    <div className="section-header">

                        <p className="section-label">
                            GALERIA
                        </p>

                        <h2>
                            Veja o StudyLens em ação.
                        </h2>

                        <p>
                            Da captura do conteúdo até a revisão, veja como o
                            StudyLens transforma a câmera em uma ferramenta de estudo.
                        </p>

                    </div>


                    <div className="gallery-grid">

                        <figure className="gallery-item">

                            <div className="phone-frame">

                                <img
                                    src={cameraJoviImage}
                                    alt="Interface da câmera JOVI com o modo StudyLens"
                                />

                            </div>

                            <figcaption>
                                Captura inteligente com modo StudyLens
                            </figcaption>

                        </figure>


                        <figure className="gallery-item">

                            <div className="phone-frame">

                                <img
                                    src={conteudoGeradoImage}
                                    alt="Conteúdo gerado automaticamente pelo StudyLens"
                                />

                            </div>

                            <figcaption>
                                A IA transforma a imagem em material de estudo
                            </figcaption>

                        </figure>


                        <figure className="gallery-item">

                            <div className="phone-frame">

                                <img
                                    src={flashcardsEstudoImage}
                                    alt="Flashcards e recursos de estudo do StudyLens"
                                />

                            </div>

                            <figcaption>
                                Revisão prática com flashcards e estudo guiado
                            </figcaption>

                        </figure>

                    </div>

                </section>


                <section
                    id="equipe"
                    className="section team"
                >

                    <div className="section-header">

                        <p className="section-label">
                            NOSSA EQUIPE
                        </p>

                        <h2>
                            NEXTAGE
                        </h2>

                        <p>
                            Uma equipe dedicada a transformar tecnologia em
                            experiências mais úteis para estudantes.
                        </p>

                    </div>


                    <div className="team-grid">

                        <article className="team-card">

                            <h3>
                                Bruno Gonçalves Minitti
                            </h3>

                            <p>
                                Desenvolvimento Front-End e integração
                            </p>

                        </article>


                        <article className="team-card">

                            <h3>
                                Nicolas Gomes de Almeida
                            </h3>

                            <p>
                                UX/UI e desenvolvimento
                            </p>

                        </article>


                        <article className="team-card">

                            <h3>
                                Lucas Ferreira Rodrigues Silva
                            </h3>

                            <p>
                                Desenvolvimento e documentação
                            </p>

                        </article>

                    </div>

                </section>


                <section
                    id="contato"
                    className="section contact"
                >

                    <div className="section-header">

                        <p className="section-label">
                            CONTATO
                        </p>

                        <h2>
                            Quer conhecer o StudyLens?
                        </h2>

                        <p>
                            Entre em contato com a equipe NEXTAGE para conhecer
                            mais sobre nossa solução.
                        </p>

                    </div>

                    <a
                        href="https://github.com/br330a/StudyLens"
                        className="button button-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ver projeto no GitHub
                    </a>

                </section>

            </main>


            <footer className="site-footer">

                <p>
                    StudyLens — NEXTAGE
                </p>

                <p>
                    Challenge JOVI × FIAP
                </p>

            </footer>

        </div>
    );
}

export default Landing;