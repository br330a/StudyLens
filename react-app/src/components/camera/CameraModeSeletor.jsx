const MODOS = [
    {
        id: "noite",
        rotulo: "Noite",
        interativo: false,
    },
    {
        id: "retrato",
        rotulo: "Retrato",
        interativo: false,
    },
    {
        id: "foto",
        rotulo: "Foto",
        interativo: true,
    },
    {
        id: "video",
        rotulo: "Vídeo",
        interativo: false,
    },
    {
        id: "studylens",
        rotulo: "StudyLens",
        interativo: true,
    },
    {
        id: "mais",
        rotulo: "Mais",
        interativo: false,
    },
];

const LARGURA_MODO = 76;


function CameraModeSelector({
    modoAtivo,
    onAlterarModo,
}) {
    const indiceAtivo =
        MODOS.findIndex(
            (modo) =>
                modo.id === modoAtivo
        );

    function classeModo(modo) {
        const base = `
            relative
            m-0
            flex
            w-[76px]
            shrink-0
            appearance-none
            items-center
            justify-center
            border-0
            bg-transparent
            p-0
            text-[11px]
            transition-colors
            sm:text-xs
        `;

        if (modo.id === modoAtivo) {
            if (modo.id === "foto") {
                return `
                    ${base}
                    font-semibold
                    text-[#e8c63d]
                `;
            }

            if (
                modo.id ===
                "studylens"
            ) {
                return `
                    ${base}
                    font-semibold
                    text-white
                `;
            }
        }

        if (modo.interativo) {
            return `
                ${base}
                cursor-pointer
                text-white/65
                hover:text-white
            `;
        }

        return `
            ${base}
            cursor-default
            text-white/35
        `;
    }


    return (
        <nav
            aria-label="Modos da câmera JOVI"
            className="
                relative
                h-7
                w-full
                overflow-hidden
            "
        >
            <div
                className="
                    absolute
                    left-1/2 top-0
                    flex
                    h-full
                    items-center
                    transition-transform
                    duration-300
                    ease-out
                "
                style={{
                    transform:
                        `translateX(-${
                            indiceAtivo *
                            LARGURA_MODO +
                            LARGURA_MODO / 2
                        }px)`,
                }}
            >
                {MODOS.map((modo) => {

                    const ativo =
                        modo.id ===
                        modoAtivo;

                    if (
                        modo.interativo
                    ) {
                        return (
                            <button
                                key={
                                    modo.id
                                }
                                type="button"
                                className={
                                    classeModo(
                                        modo
                                    )
                                }
                                aria-pressed={
                                    ativo
                                }
                                onClick={() =>
                                    onAlterarModo(
                                        modo.id
                                    )
                                }
                            >
                                {
                                    modo.rotulo
                                }

                                {ativo && (
                                    <span
                                        aria-hidden="true"
                                        className={`
                                            absolute
                                            -bottom-1
                                            left-1/2
                                            h-0.5
                                            w-7
                                            -translate-x-1/2
                                            rounded-full
                                            ${
                                                modo.id ===
                                                "foto"
                                                    ? "bg-[#e8c63d]"
                                                    : "bg-study-primary"
                                            }
                                        `}
                                    />
                                )}
                            </button>
                        );
                    }

                    return (
                        <span
                            key={modo.id}
                            className={
                                classeModo(
                                    modo
                                )
                            }
                        >
                            {
                                modo.rotulo
                            }
                        </span>
                    );
                })}
            </div>
        </nav>
    );
}

export default CameraModeSelector;