function Historico({ historico, onAbrirConteudo }) {

    return (
        <div className="tela ativa">

            <section>

                <h2>Histórico completo</h2>

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

                                <strong>
                                    {item.materia}
                                </strong>

                                <p>
                                    {item.conteudo}
                                </p>

                            </article>

                        ))

                    )}

                </div>

            </section>

        </div>
    );
}

export default Historico;