import ResourceCard from "../components/ResourceCard";
import recursos from "../data/recursos";


function Home() {
    return (
        <div className="tela ativa">

            <section className="captura-destaque">

                <h2>Capture seu conteúdo</h2>

                <p>
                    Tire uma foto da lousa, caderno, apostila ou
                    projetor e deixe o StudyLens ajudar você a estudar.
                </p>

                <a
                    href="/app/camera"
                    className="
                        mt-5
                        inline-flex
                        items-center
                        justify-center
                        rounded-study-md
                        bg-study-surface
                        px-5 py-3
                        font-semibold
                        text-study-primary
                        no-underline
                        transition
                        hover:bg-study-primary-soft
                    "
                >
                    Abrir câmera StudyLens
                </a>

            </section>

            <section>

                <h2>Recursos</h2>

                <div className="cards">

                    {recursos.map((recurso) => (
                        <ResourceCard
                            key={recurso.titulo}
                            titulo={recurso.titulo}
                            descricao={recurso.descricao}
                        />
                    ))}

                </div>

            </section>

            <section>

                <h2>Últimos conteúdos</h2>

                <div id="listaConteudos"></div>

            </section>

        </div>
    );
}

export default Home;