import { useNavigate } from "react-router-dom";

import CameraCapture from "../components/CameraCapture";

function CameraPage({
    onImagemConfirmada,
    analisando,
    erroAnalise,
    resultadoAtual,
    onLimparResultado,
    onAbrirConteudo,
}) {
    const navigate = useNavigate();

    return (
        <div
            className="
                fixed inset-0 z-50
                flex flex-col
                bg-black
                text-white
            "
        >
            <header
                className="
                    shrink-0
                    border-b
                    border-white/5
                    bg-black
                    px-4 py-2.5
                    sm:px-5
                "
            >
                <div
                    className="
                        grid
                        grid-cols-[1fr_auto_1fr]
                        items-center
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                        "
                    >
                        <button
                            type="button"
                            title="Biblioteca StudyLens"
                            aria-label="Abrir biblioteca StudyLens"
                            className="
                                mt-0
                                flex size-9
                                appearance-none
                                items-center
                                justify-center
                                rounded-full
                                border-0
                                bg-transparent
                                p-0
                                text-white
                                cursor-pointer
                                transition
                                hover:bg-white/10
                            "
                            onClick={() =>
                                navigate(
                                    "/app/biblioteca"
                                )
                            }
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="size-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H10l2 2h5.5A2.5 2.5 0 0 1 20 7.5v10A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5z" />
                                <path d="M8 10h8" />
                                <path d="M8 14h6" />
                            </svg>
                        </button>
                    </div>


                    <div
                        className="
                            text-center
                            leading-tight
                        "
                    >
                        <p
                            className="
                                m-0
                                text-[10px]
                                font-medium
                                tracking-[0.22em]
                                text-white/50
                            "
                        >
                            JOVI
                        </p>

                        <p
                            className="
                                m-0
                                mt-0.5
                                text-sm
                                font-semibold
                                text-white
                            "
                        >
                            StudyLens
                        </p>
                    </div>


                    <div
                        className="
                            flex
                            items-center
                            justify-end
                            gap-3
                        "
                    >
                        <span
                            className="
                                inline-flex
                                size-8
                                items-center
                                justify-center
                                rounded-full
                                bg-study-primary/20
                                text-[10px]
                                font-bold
                                text-white
                            "
                        >
                            AI
                        </span>

                        <span
                            aria-hidden="true"
                            className="
                                text-base
                                text-white/65
                            "
                        >
                            ⚙
                        </span>
                    </div>
                </div>
            </header>


            <div
                className="
                    min-h-0
                    flex-1
                "
            >
                <CameraCapture
                    onImagemConfirmada={
                        onImagemConfirmada
                    }
                    analisando={
                        analisando
                    }
                    autoStart
                />
            </div>


            {analisando && (
                <div
                    className="
                        absolute
                        inset-x-4
                        bottom-40
                        z-30

                        rounded-study-lg

                        bg-black/80

                        px-5 py-4

                        text-center

                        backdrop-blur-md
                    "
                >
                    <p
                        className="
                            m-0
                            text-sm
                            font-semibold
                        "
                    >
                        Analisando conteúdo com IA...
                    </p>

                    <p
                        className="
                            m-0
                            mt-1
                            text-xs
                            text-white/60
                        "
                    >
                        Identificando o contexto e
                        preparando seu material de estudo.
                    </p>
                </div>
            )}


            {erroAnalise &&
                !analisando && (
                    <div
                        className="
                            absolute
                            inset-x-4
                            bottom-40
                            z-30

                            rounded-study-md

                            bg-study-danger

                            px-5 py-4

                            text-sm
                            text-white

                            shadow-study-md
                        "
                    >
                        {erroAnalise}
                    </div>
                )}


            {resultadoAtual &&
                !analisando && (
                    <div
                        className="
                            absolute
                            inset-x-4
                            bottom-40
                            z-30

                            max-h-[48vh]
                            overflow-y-auto

                            rounded-study-lg

                            bg-study-surface

                            p-5

                            text-study-text

                            shadow-study-lg
                        "
                    >
                        <button
                            type="button"
                            aria-label="Fechar resultado"
                            className="
                                absolute
                                right-3 top-3

                                mt-0

                                flex size-8

                                appearance-none

                                items-center
                                justify-center

                                rounded-full
                                border-0

                                bg-study-surface-muted

                                p-0

                                text-lg
                                text-study-text-muted

                                cursor-pointer

                                transition

                                hover:bg-study-primary-soft
                                hover:text-study-primary
                            "
                            onClick={
                                onLimparResultado
                            }
                        >
                            ×
                        </button>


                        <span
                            className="
                                text-xs
                                font-semibold
                                text-study-primary
                            "
                        >
                            Conteúdo identificado
                        </span>


                        {(
                            resultadoAtual.contexto ||
                            resultadoAtual.nivelPedagogico
                        ) && (
                            <div
                                className="
                                    mt-3
                                    flex
                                    flex-wrap
                                    gap-2
                                "
                            >
                                {resultadoAtual.contexto && (
                                    <span
                                        className="
                                            inline-flex
                                            items-center

                                            rounded-full

                                            bg-study-primary-soft

                                            px-3 py-1

                                            text-xs
                                            font-semibold
                                            text-study-primary
                                        "
                                    >
                                        {
                                            resultadoAtual.contexto
                                        }
                                    </span>
                                )}

                                {resultadoAtual.nivelPedagogico && (
                                    <span
                                        className="
                                            inline-flex
                                            items-center

                                            rounded-full

                                            bg-study-surface-muted

                                            px-3 py-1

                                            text-xs
                                            font-semibold
                                            text-study-text-muted
                                        "
                                    >
                                        {
                                            resultadoAtual.nivelPedagogico
                                        }
                                    </span>
                                )}
                            </div>
                        )}


                        <h2
                            className="
                                m-0
                                mt-2
                                pr-8
                                text-xl
                                font-bold
                            "
                        >
                            {
                                resultadoAtual.conteudo
                            }
                        </h2>


                        <p
                            className="
                                m-0
                                mt-1
                                text-sm
                                text-study-text-muted
                            "
                        >
                            {
                                resultadoAtual.materia
                            }
                        </p>


                        <button
                            type="button"
                            className="
                                mt-4
                                w-full

                                appearance-none

                                rounded-study-md
                                border-0

                                bg-study-primary

                                px-4 py-3

                                font-semibold
                                text-white

                                cursor-pointer

                                transition

                                hover:bg-study-primary-hover
                            "
                            onClick={() =>
                                onAbrirConteudo(
                                    resultadoAtual
                                )
                            }
                        >
                            Estudar conteúdo
                        </button>
                    </div>
                )}
        </div>
    );
}

export default CameraPage;