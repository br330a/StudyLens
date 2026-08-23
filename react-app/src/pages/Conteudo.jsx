import { useState } from "react";
import ReactMarkdown from "react-markdown";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

function Conteudo({
    conteudo,
    onVoltar
}) {

    const [abaAtiva, setAbaAtiva] =
        useState("resumo");

    const [flashcardAtual, setFlashcardAtual] =
        useState(0);
    const [flashcardVirado, setFlashcardVirado] =
        useState(false);

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

        setFlashcardVirado(false);

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

    function virarFlashcard() {
        setFlashcardVirado((estadoAtual) => !estadoAtual);
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

                <section className="conteudo-bloco resumo-markdown">

                    <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                    >
                        {conteudo.resumo}
                    </ReactMarkdown>

                </section>

            )}


            {abaAtiva === "flashcards" &&
                conteudo.flashcards?.length > 0 && (

                <section className="conteudo-bloco">

                    <div
                        className={`flashcard ${
                            flashcardVirado ? "virado" : ""
                        }`}
                    >

                        <div className="flashcard-inner">

                            <div className="flashcard-frente">

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

                            </div>


                            <div className="flashcard-verso">

                                <span>
                                    Resposta
                                </span>

                                <p>
                                    {
                                        conteudo.flashcards[
                                            flashcardAtual
                                        ].resposta
                                    }
                                </p>

                            </div>

                        </div>

                    </div>

                    <button
                        type="button"
                        className="btn-virar"
                        onClick={virarFlashcard}
                    >
                        {flashcardVirado
                            ? "↩ Ver pergunta"
                            : "↻ Virar card"}
                    </button>

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