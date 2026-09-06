function StudyLensCaptureStrip({
    imagens,
    onRemover,
}) {
    if (
        !Array.isArray(imagens) ||
        imagens.length === 0
    ) {
        return null;
    }


    return (
        <div
            className="
                mb-2
                flex
                min-h-14
                items-center
                justify-start
                gap-2
                px-1
            "
            aria-label="Capturas selecionadas para o StudyLens"
        >
            {imagens.map(
                (imagem, index) => (

                    <div
                        key={imagem.id}
                        className="
                            relative
                            h-14
                            w-14
                            shrink-0
                        "
                    >
                        <div
                            className="
                                absolute
                                bottom-0 left-0

                                size-12

                                overflow-hidden

                                rounded-lg

                                border
                                border-white/25

                                bg-white/10

                                shadow-md
                            "
                        >
                            <img
                                src={
                                    imagem.previewUrl
                                }
                                alt={`Captura ${
                                    index + 1
                                }`}
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />

                            <span
                                className="
                                    absolute
                                    bottom-1 left-1

                                    flex size-4

                                    items-center
                                    justify-center

                                    rounded-full

                                    bg-black/70

                                    text-[9px]
                                    font-bold
                                    text-white
                                "
                            >
                                {index + 1}
                            </span>
                        </div>


                        <button
                            type="button"
                            aria-label={`Remover captura ${
                                index + 1
                            }`}
                            className="
                                absolute
                                right-0 top-0

                                m-0

                                flex
                                size-[22px]

                                appearance-none

                                items-center
                                justify-center

                                rounded-full

                                border
                                border-white/30

                                bg-black/90

                                p-0

                                text-xs
                                font-semibold
                                leading-none
                                text-white

                                shadow-md

                                cursor-pointer

                                transition

                                hover:bg-study-danger
                            "
                            onClick={() =>
                                onRemover(
                                    imagem.id
                                )
                            }
                        >
                            ×
                        </button>
                    </div>

                )
            )}
        </div>
    );
}

export default StudyLensCaptureStrip;