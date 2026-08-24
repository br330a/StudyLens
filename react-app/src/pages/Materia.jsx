function Materia({
    materia,
    historico,
    onAbrirConteudo,
    onVoltar
}) {

    const conteudosDaMateria =
        historico.filter((item) =>

            item.materia
                ?.toLowerCase()
                .trim() ===
            materia
                ?.toLowerCase()
                .trim()

        );


    return (
        <div className="tela ativa">

            <section className="materias-header">

                <button
                    type="button"
                    className="btn-voltar"
                    onClick={onVoltar}
                >
                    ←
                </button>

                <h2>
                    {materia}
                </h2>

                <p>
                    {conteudosDaMateria.length}{" "}
                    {conteudosDaMateria.length === 1
                        ? "conteúdo disponível"
                        : "conteúdos disponíveis"}
                </p>

            </section>


            <div className="lista-materia">

                {conteudosDaMateria.map(
                    (item) => (

                        <article
                            key={item.id}
                            className="conteudo-card"
                            onClick={() =>
                                onAbrirConteudo(
                                    item,
                                    "materia"
                                )
                            }
                        >

                            <h3>
                                {item.conteudo}
                            </h3>

                            <p>
                                Resumo • Flashcards • Questões
                            </p>

                        </article>

                    )
                )}

            </div>

        </div>
    );
}

export default Materia;