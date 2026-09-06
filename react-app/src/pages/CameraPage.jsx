import { useNavigate } from "react-router-dom";

import CameraCapture from "../components/CameraCapture";
import CameraTopBar from "../components/camera/CameraTopBar";

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
            <CameraTopBar
                onAbrirBiblioteca={() =>
                    navigate(
                        "/app/biblioteca"
                    )
                }
            />


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