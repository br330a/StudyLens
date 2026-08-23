import { useState } from "react";

function Conteudo({
    conteudo,
    onVoltar
}) {

    const [abaAtiva, setAbaAtiva] =
        useState("resumo");

    const [flashcardAtual, setFlashcardAtual] =
        useState(0);


    if (!conteudo) {

        return (
            <div className="tela ativa">

                <section>

                    <p>
                        Nenhum conteúdo selecionado.
                    </p>

                    <button
                        type="button"
                        onClick={onVoltar}
                    >
                        Voltar
                    </button>

                </section>

            </div>
        );
    }


    function proximoFlashcard() {

        setFlashcardAtual((indiceAtual) => {

            const proximo =
                indiceAtual + 1;

            if (
                proximo >=
                conteudo.flashcards.length
            ) {
                return 0;
            }

            return proximo;

        });
    }


    return (
        <div className="tela ativa conteudo-page">

            <section className="conteudo-header">

                <button
                    type="button"
                    className="btn-voltar"
                    onClick={onVoltar}
                >
                    ←
                </button>

                <div>

                    <h2>
                        {conteudo.conteudo}
                    </h2>

                    <p>
                        {conteudo.materia}
                    </p>

                </div>

            </section>


            <div className="conteudo-abas">

                <button
                    type="button"
                    className={
                        abaAtiva === "resumo"
                            ? "ativa"
                            : ""
                    }
                    onClick={() =>
                        setAbaAtiva("resumo")
                    }
                >
                    Resumo
                </button>

                <button
                    type="button"
                    className={
                        abaAtiva === "flashcards"
                            ? "ativa"
                            : ""
                    }
                    onClick={() =>
                        setAbaAtiva("flashcards")
                    }
                >
                    Flashcards
                </button>

                <button
                    type="button"
                    className={
                        abaAtiva === "questoes"
                            ? "ativa"
                            : ""
                    }
                    onClick={() =>
                        setAbaAtiva("questoes")
                    }
                >
                    Questões
                </button>

            </div>


            {abaAtiva === "resumo" && (

                <section className="conteudo-bloco">

                    <h3>Resumo</h3>

                    <p>
                        {conteudo.resumo}
                    </p>

                </section>

            )}


            {abaAtiva === "flashcards" &&
                conteudo.flashcards?.length > 0 && (

                <section className="conteudo-bloco">

                    <div className="flashcard-caixa">

                        <span>
                            Pergunta
                        </span>

                        <h3>
                            {
                                conteudo.flashcards[
                                    flashcardAtual
                                ].pergunta
                            }
                        </h3>

                        <p>
                            {
                                conteudo.flashcards[
                                    flashcardAtual
                                ].resposta
                            }
                        </p>

                    </div>

                    <p className="contador">

                        {flashcardAtual + 1}
                        /
                        {conteudo.flashcards.length}

                    </p>

                    <button
                        type="button"
                        onClick={proximoFlashcard}
                    >
                        Próximo flashcard
                    </button>

                </section>

            )}


            {abaAtiva === "questoes" && (

                <section className="conteudo-bloco">

                    {conteudo.questoes?.map(
                        (questao, index) => (

                            <article
                                key={index}
                                className="questao-card"
                            >

                                <h3>
                                    Questão {index + 1}
                                </h3>

                                <p>
                                    {questao.pergunta}
                                </p>

                                <details>

                                    <summary>
                                        Ver resposta
                                    </summary>

                                    <p>
                                        {questao.resposta}
                                    </p>

                                </details>

                            </article>

                        )
                    )}

                </section>

            )}

        </div>
    );
}

export default Conteudo;