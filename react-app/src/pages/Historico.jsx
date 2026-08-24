function Historico({ historico, onAbrirConteudo }) {

    return (
        <div className="tela ativa historico-page">

            <section className="historico-section">

                <div className="historico-header">

                    <span className="historico-label">
                        Biblioteca
                    </span>

                    <h2>Histórico</h2>

                    <p>
                        {historico.length}{" "}
                        {historico.length === 1
                            ? "conteúdo estudado"
                            : "conteúdos estudados"}
                    </p>

                </div>

                <div id="historicoCompleto">

                    {historico.length === 0 ? (

                        <p>
                            Nenhum conteúdo estudado ainda.
                        </p>

                    ) : (

                        historico.map((item) => (

                            <article
                                key={item.id}
                                className="historico-item"
                                onClick={() =>
                                    onAbrirConteudo(item)
                                }
                            >

                                <div className="historico-item-icon">
                                    📚
                                </div>

                                <div className="historico-item-info">

                                    <span className="historico-materia">
                                        {item.materia}
                                    </span>

                                    <h3>
                                        {item.conteudo}
                                    </h3>

                                    <p>
                                        Resumo • Flashcards • Questões
                                    </p>

                                </div>

                                <span className="historico-seta">
                                    ›
                                </span>

                            </article>

                        ))

                    )}

                </div>

            </section>

        </div>
    );
}

export default Historico;