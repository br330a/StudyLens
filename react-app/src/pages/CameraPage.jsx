import { useNavigate } from "react-router-dom";

import CameraCapture from "../components/CameraCapture";

function CameraPage({
    onImagemConfirmada,
    analisando,
    erroAnalise,
    resultadoAtual,
    onAbrirConteudo,
}) {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-black text-white">
            <header className="flex shrink-0 items-center justify-between bg-black px-5 py-4">
                <button
                    type="button"
                    aria-label="Fechar câmera"
                    className="
                        flex size-10
                        appearance-none
                        items-center justify-center
                        rounded-full
                        border-0
                        bg-white/10
                        text-xl text-white
                        cursor-pointer
                        transition
                        hover:bg-white/20
                    "
                    onClick={() => navigate("/app")}
                >
                    ×
                </button>

                <div className="text-center">
                    <p className="m-0 text-xs font-medium tracking-[0.16em] text-white/60">
                        CÂMERA JOVI
                    </p>

                    <p className="m-0 mt-0.5 text-sm font-semibold">
                        StudyLens
                    </p>
                </div>

                <div
                    className="
                        flex h-10
                        items-center
                        rounded-full
                        bg-study-primary/20
                        px-3
                        text-xs
                        font-semibold
                        text-white
                    "
                >
                    IA
                </div>
            </header>

            <div className="min-h-0 flex-1">
                <CameraCapture
                    onImagemConfirmada={onImagemConfirmada}
                    analisando={analisando}
                />
            </div>

            {analisando && (
                <div
                    className="
                        absolute inset-x-4 bottom-32 z-30
                        rounded-study-lg
                        bg-black/80
                        px-5 py-4
                        text-center
                        backdrop-blur-md
                    "
                >
                    <p className="m-0 text-sm font-semibold">
                        Analisando conteúdo com IA...
                    </p>

                    <p className="m-0 mt-1 text-xs text-white/60">
                        Identificando matéria e preparando seu estudo.
                    </p>
                </div>
            )}

            {erroAnalise && !analisando && (
                <div
                    className="
                        absolute inset-x-4 bottom-32 z-30
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

            {resultadoAtual && !analisando && (
                <div
                    className="
                        absolute inset-x-4 bottom-28 z-30
                        rounded-study-lg
                        bg-study-surface
                        p-5
                        text-study-text
                        shadow-study-lg
                    "
                >
                    <span className="text-xs font-semibold text-study-primary">
                        Conteúdo identificado
                    </span>

                    {resultadoAtual.contexto && (
                        <div className="mt-3">
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
                                {resultadoAtual.contexto} detectado
                            </span>
                        </div>
                    )}

                    <h2 className="m-0 mt-2 text-xl font-bold">
                        {resultadoAtual.conteudo}
                    </h2>

                    <p className="m-0 mt-1 text-sm text-study-text-muted">
                        {resultadoAtual.materia}
                    </p>

                    <button
                        type="button"
                        className="
                            mt-4 w-full
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
                            onAbrirConteudo(resultadoAtual)
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