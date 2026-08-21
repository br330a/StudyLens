import ResourceCard from "../components/ResourceCard";
import recursos from "../data/recursos";

import CameraCapture from "../components/CameraCapture";

function Home({ onAdicionarConteudo, onImagemConfirmada }) {
    return (
        <div className="tela ativa">

            <section className="captura-destaque">

                <h2>Capture seu conteúdo</h2>

                <p>
                    Tire uma foto da lousa, caderno, apostila ou
                    projetor e deixe o StudyLens ajudar você a estudar.
                </p>

                <CameraCapture
                    onImagemConfirmada={onImagemConfirmada}
                />

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