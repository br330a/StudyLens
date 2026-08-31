import "../styles/landing.css";

import dashboardImage from "../assets/landing/dashboard.jpeg";
import materiasImage from "../assets/landing/materias.jpeg";
import flashcardImage from "../assets/landing/flashcard.jpeg";

function Landing() {
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
                                className="button button-primary"
                            >
                                Conheça a solução
                            </a>

                            <a
                                href="/app"
                                className="button button-secondary"
                            >
                                Experimentar StudyLens
                            </a>

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


                    <div className="steps-grid">

                        <article className="step-card">

                            <span className="step-number">
                                01
                            </span>

                            <div>

                                <h3>
                                    Capture
                                </h3>

                                <p>
                                    Fotografe o conteúdo que você está estudando.
                                </p>

                            </div>

                        </article>


                        <article className="step-card">

                            <span className="step-number">
                                02
                            </span>

                            <div>

                                <h3>
                                    Identifique
                                </h3>

                                <p>
                                    A inteligência artificial reconhece a matéria
                                    e o conteúdo presente na imagem.
                                </p>

                            </div>

                        </article>


                        <article className="step-card">

                            <span className="step-number">
                                03
                            </span>

                            <div>

                                <h3>
                                    Personalize
                                </h3>

                                <p>
                                    O conteúdo pode ser transformado em diferentes
                                    recursos para facilitar seus estudos.
                                </p>

                            </div>

                        </article>


                        <article className="step-card">

                            <span className="step-number">
                                04
                            </span>

                            <div>

                                <h3>
                                    Aprenda
                                </h3>

                                <p>
                                    Revise, pratique e acompanhe sua evolução
                                    ao longo da sua jornada de estudos.
                                </p>

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
                            Uma visão da experiência que estamos desenvolvendo.
                        </p>

                    </div>


                    <div className="gallery-grid">

                        <figure className="gallery-item">

                            <div className="phone-frame">

                                <img
                                    src={dashboardImage}
                                    alt="Tela principal do StudyLens"
                                />

                            </div>

                            <figcaption>
                                Interface do StudyLens
                            </figcaption>

                        </figure>


                        <figure className="gallery-item">

                            <div className="phone-frame">

                                <img
                                    src={materiasImage}
                                    alt="Tela de conteúdo do StudyLens"
                                />

                            </div>

                            <figcaption>
                                Conteúdo Organizado
                            </figcaption>

                        </figure>


                        <figure className="gallery-item">

                            <div className="phone-frame">

                                <img
                                    src={flashcardImage}
                                    alt="Recurso de estudo do StudyLens"
                                />

                            </div>

                            <figcaption>
                                Recurso de Estudo
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