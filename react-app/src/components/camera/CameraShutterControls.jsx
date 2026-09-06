function GalleryIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect
                x="3"
                y="4"
                width="18"
                height="16"
                rx="2"
            />

            <circle
                cx="9"
                cy="9"
                r="2"
            />

            <path d="m4 17 5-5 4 4 2-2 5 5" />
        </svg>
    );
}


function SwitchCameraIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 11a8 8 0 0 0-14.8-4" />
            <path d="M5 3v4h4" />

            <path d="M4 13a8 8 0 0 0 14.8 4" />
            <path d="M19 21v-4h-4" />
        </svg>
    );
}


function CameraShutterControls({
    modoAtivo,
    ultimaImagem,
    cameraAtiva = true,
    onAbrirGaleria,
    onObturador,
}) {
    const modoFoto =
        modoAtivo === "foto";

    return (
        <div
            className="
                grid
                grid-cols-3
                items-center
                px-1
            "
        >
            <button
                type="button"
                aria-label="Abrir galeria"
                className="
                    mt-0
                    flex size-12
                    justify-self-start
                    appearance-none
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-md
                    border
                    border-white/15
                    bg-white/5
                    p-0
                    text-white/80
                    cursor-pointer
                    transition
                    hover:bg-white/10
                "
                onClick={
                    onAbrirGaleria
                }
            >
                {modoFoto &&
                ultimaImagem ? (
                    <img
                        src={
                            ultimaImagem.previewUrl
                        }
                        alt="Última fotografia"
                        className="
                            h-full
                            w-full
                            object-cover
                        "
                    />
                ) : (
                    <GalleryIcon />
                )}
            </button>


            <button
                type="button"
                aria-label={
                    cameraAtiva
                        ? "Capturar foto"
                        : "Abrir câmera"
                }
                className="
                    mt-0
                    flex
                    size-[78px]
                    justify-self-center
                    appearance-none
                    items-center
                    justify-center
                    rounded-full
                    border-[3px]
                    border-white
                    bg-transparent
                    p-[5px]
                    cursor-pointer
                    transition-transform
                    active:scale-95
                "
                onClick={
                    onObturador
                }
            >
                <span
                    className={`
                        flex
                        size-full
                        items-center
                        justify-center
                        rounded-full
                        border-2
                        ${
                            modoFoto
                                ? "border-[#e8c63d]"
                                : "border-study-primary"
                        }
                        bg-black
                    `}
                >
                    {!modoFoto && (
                        <span
                            className="
                                size-[48px]
                                rounded-full
                                bg-study-primary/30
                            "
                        />
                    )}
                </span>
            </button>


            <div
                aria-hidden="true"
                className="
                    flex size-12
                    justify-self-end
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-white/5
                    text-white/75
                "
            >
                <SwitchCameraIcon />
            </div>
        </div>
    );
}

export default CameraShutterControls;