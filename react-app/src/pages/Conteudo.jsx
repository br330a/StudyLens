import { useState } from "react";
import ReactMarkdown from "react-markdown";
import useStudyCast from "../hooks/useStudyCast";

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
    const {
        audioUrl,
        gerando: gerandoStudyCast,
        carregandoAudio,
        erro: erroStudyCast,
        gerar: gerarAudioStudyCast,
    } = useStudyCast(conteudo);

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

    function classeAba(nomeAba) {
        return `
            min-w-0
            px-2 py-3
            text-xs
            sm:text-sm
            ${
                abaAtiva === nomeAba
                    ? "ativa"
                    : ""
            }
        `;
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

                    {conteudo.nivelPedagogico && (
                        <span
                            className="
                                mt-2
                                inline-flex
                                rounded-full
                                bg-study-primary-soft
                                px-3 py-1
                                text-xs
                                font-semibold
                                text-study-primary
                            "
                        >
                            {conteudo.nivelPedagogico}
                        </span>
                    )}

                </div>

            </section>


            <div 
                className="
                    conteudo-abas 
                    grid grid-cols-4
                    gap-2
                "
            >

                <button
                    type="button"
                    className={classeAba("resumo")}
                    onClick={() =>
                        setAbaAtiva("resumo")
                    }
                >
                    Resumo
                </button>

                <button
                    type="button"
                    className={classeAba("flashcards")}
                    onClick={() =>
                        setAbaAtiva("flashcards")
                    }
                >
                    Flashcards
                </button>

                <button
                    type="button"
                    className={classeAba("questoes")}
                    onClick={() =>
                        setAbaAtiva("questoes")
                    }
                >
                    Questões
                </button>

                <button
                    type="button"
                    className={classeAba("ouvir")}
                    onClick={() =>
                        setAbaAtiva("ouvir")
                    }
                >
                    Ouvir
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

                                <div className="flashcard-pergunta">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkMath]}
                                        rehypePlugins={[rehypeKatex]}
                                    >
                                        {
                                            conteudo.flashcards[
                                                flashcardAtual
                                            ].pergunta
                                        }
                                    </ReactMarkdown>
                                </div>

                            </div>


                            <div className="flashcard-verso">

                                <span>
                                    Resposta
                                </span>

                                <div className="flashcard-resposta">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkMath]}
                                        rehypePlugins={[rehypeKatex]}
                                    >
                                        {
                                            conteudo.flashcards[
                                                flashcardAtual
                                            ].resposta
                                        }
                                    </ReactMarkdown>
                                </div>

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


                                <div className="questao-texto">

                                    <ReactMarkdown
                                        remarkPlugins={[
                                            remarkMath
                                        ]}
                                        rehypePlugins={[
                                            rehypeKatex
                                        ]}
                                    >
                                        {questao.pergunta}
                                    </ReactMarkdown>

                                </div>


                                <details>

                                    <summary>
                                        Ver resposta
                                    </summary>

                                    <div className="questao-resposta">

                                        <ReactMarkdown
                                            remarkPlugins={[
                                                remarkMath
                                            ]}
                                            rehypePlugins={[
                                                rehypeKatex
                                            ]}
                                        >
                                            {questao.resposta}
                                        </ReactMarkdown>

                                    </div>

                                </details>

                            </article>

                        )
                    )}

                </section>

            )}

            {abaAtiva === "ouvir" && (

                <section
                    className="
                        rounded-study-lg
                        bg-study-surface
                        p-5
                        shadow-study-sm
                    "
                >

                    <div
                        className="
                            mb-5
                            flex
                            items-center
                            gap-3
                        "
                    >
                        <div
                            className="
                                flex
                                size-12
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-study-primary-soft
                                text-2xl
                            "
                        >
                            🎧
                        </div>

                        <div>
                            <h2
                                className="
                                    m-0
                                    text-xl
                                    font-bold
                                    text-study-primary
                                "
                            >
                                StudyCast
                            </h2>

                            <p
                                className="
                                    m-0
                                    mt-0.5
                                    text-xs
                                    font-medium
                                    text-study-text-muted
                                "
                            >
                                Áudio gerado por IA
                            </p>
                        </div>
                    </div>

                    <h3
                        className="
                            m-0
                            mt-2
                            text-xl
                            font-bold
                            text-study-text
                        "
                    >
                        Aprenda também ouvindo
                    </h3>

                    <p
                        className="
                            m-0
                            mt-2
                            text-sm
                            leading-6
                            text-study-text-muted
                        "
                    >
                        Ouça uma explicação criada pela IA e continue estudando no ônibus, metrô ou em qualquer momento do seu dia.
                    </p>


                    {!conteudo.roteiroAudio && (

                        <div
                            className="
                                mt-5
                                rounded-study-md
                                bg-study-surface-muted
                                p-4
                                text-sm
                                text-study-text-muted
                            "
                        >
                            Este conteúdo foi criado antes
                            da implementação do StudyCast.
                            Faça uma nova captura para gerar
                            uma versão em áudio.
                        </div>

                    )}

                    {carregandoAudio && (
                        <p
                            className="
                                m-0
                                mt-5
                                text-center
                                text-sm
                                text-study-text-muted
                            "
                        >
                            Carregando StudyCast...
                        </p>
                    )}


                    {conteudo.roteiroAudio &&
                        !audioUrl &&
                        !carregandoAudio && (

                        <button
                            type="button"
                            disabled={
                                gerandoStudyCast
                            }
                            className="
                                mt-5
                                w-full
                                appearance-none
                                rounded-study-md
                                border-0
                                bg-study-primary
                                px-5 py-3
                                font-semibold
                                text-white
                                cursor-pointer
                                transition
                                hover:bg-study-primary-hover
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                            onClick={
                                gerarAudioStudyCast
                            }
                        >
                            {gerandoStudyCast
                                ? "Preparando StudyCast..."
                                : "Gerar StudyCast"}
                        </button>

                    )}


                    {gerandoStudyCast && (

                        <p
                            className="
                                m-0
                                mt-3
                                text-center
                                text-xs
                                text-study-text-muted
                            "
                        >
                            Transformando a explicação em áudio...
                        </p>

                    )}


                    {erroStudyCast && (

                        <div
                            className="
                                mt-4
                                rounded-study-md
                                bg-red-50
                                p-4
                                text-sm
                                text-study-danger
                            "
                        >
                            {erroStudyCast}
                        </div>

                    )}


                    {audioUrl && (

                        <div
                            className="
                                mt-5
                                rounded-study-md
                                bg-study-surface-muted
                                p-4
                            "
                        >

                            <p
                                className="
                                    m-0
                                    mb-3
                                    text-sm
                                    font-semibold
                                    text-study-text
                                "
                            >
                                Seu StudyCast está pronto
                            </p>

                            <audio
                                controls
                                preload="metadata"
                                src={audioUrl}
                                className="w-full"
                            >
                                Seu navegador não suporta
                                reprodução de áudio.
                            </audio>

                        </div>

                    )}

                </section>

            )}

        </div>
    );
}

export default Conteudo;