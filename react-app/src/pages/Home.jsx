import ResourceCard from "../components/ResourceCard";
import recursos from "../data/recursos";

import CameraCapture from "../components/CameraCapture";

function Home({ onImagemConfirmada, resultadoAtual, analisando, erroAnalise, onAbrirConteudo }) {
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

                {analisando && (

                    <div className="status-analise">

                        <span className="status-spinner"></span>

                        <p>
                            Analisando conteúdo com IA...
                        </p>

                    </div>

                )}

                {erroAnalise && (

                    <div className="erro-analise">

                        <p>
                            {erroAnalise}
                        </p>

                    </div>

                )}

                {resultadoAtual && (

                    <div className="resultado-analise">

                        <span className="resultado-label">
                            Conteúdo identificado
                        </span>

                        <h3>
                            {resultadoAtual.conteudo}
                        </h3>

                        <p>
                            {resultadoAtual.materia}
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                onAbrirConteudo(resultadoAtual)
                            }
                        >
                            Estudar conteúdo
                        </button>

                    </div>

                )}

            </section>

            <section>

                <h2 className="outline-4 outline-red-500">Recursos</h2>

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

                <h2 className="bg-study-primary text-white">Últimos conteúdos</h2>

                <div id="listaConteudos"></div>

            </section>

        </div>
    );
}

export default Home;