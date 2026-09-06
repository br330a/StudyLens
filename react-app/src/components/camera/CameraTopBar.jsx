function CameraTopBar({
    onAbrirBiblioteca,
}) {
    return (
        <header
            className="
                shrink-0
                bg-black
                px-4 py-4
                sm:px-6
            "
        >
            <div
                className="
                    grid
                    grid-cols-7
                    items-center
                "
            >
                {/* Biblioteca StudyLens */}
                <button
                    type="button"
                    title="Biblioteca StudyLens"
                    aria-label="Abrir biblioteca StudyLens"
                    className="
                        mt-0
                        flex size-9
                        justify-self-start
                        appearance-none
                        items-center
                        justify-center
                        rounded-full
                        border-0
                        bg-transparent
                        p-0
                        text-white/90
                        cursor-pointer
                        transition
                        hover:bg-white/10
                    "
                    onClick={
                        onAbrirBiblioteca
                    }
                >
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="size-[19px]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H10l2 2h5.5A2.5 2.5 0 0 1 20 8.5v9A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5z" />
                        <path d="M8 11h8" />
                        <path d="M8 15h5" />
                    </svg>
                </button>


                {/* Foco */}
                <span
                    aria-hidden="true"
                    className="
                        flex size-8
                        justify-self-center
                        items-center
                        justify-center
                        text-white/65
                    "
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="size-[18px]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="4"
                        />
                        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                    </svg>
                </span>


                {/* Ajuste visual */}
                <span
                    aria-hidden="true"
                    className="
                        flex size-8
                        justify-self-center
                        items-center
                        justify-center
                        text-white/55
                    "
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="size-[18px]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="7"
                        />
                        <path d="M12 5v14" />
                    </svg>
                </span>


                {/* Marca central */}
                <span
                    className="
                        justify-self-center
                        whitespace-nowrap
                        text-[10px]
                        font-extrabold
                        tracking-[0.12em]
                        text-[#e8c63d]
                    "
                >
                    JOVI
                </span>


                {/* IA / StudyLens */}
                <span
                    aria-hidden="true"
                    className="
                        flex size-8
                        justify-self-center
                        items-center
                        justify-center
                        text-white/60
                    "
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="size-[18px]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 3l1.2 4.2L17 9l-3.8 1.8L12 15l-1.2-4.2L7 9l3.8-1.8z" />
                        <path d="M18 15l.7 2.3L21 18l-2.3.7L18 21l-.7-2.3L15 18l2.3-.7z" />
                    </svg>
                </span>


                {/* Controle visual */}
                <span
                    aria-hidden="true"
                    className="
                        flex size-8
                        justify-self-center
                        items-center
                        justify-center
                        text-white/55
                    "
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="size-[18px]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                    >
                        <path d="M5 7h14M8 12h8M10 17h4" />
                    </svg>
                </span>


                {/* Configurações */}
                <span
                    aria-hidden="true"
                    className="
                        flex size-8
                        justify-self-end
                        items-center
                        justify-center
                        text-white/70
                    "
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="size-[19px]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="3"
                        />
                        <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.8-1L14.4 3h-4.8l-.4 3.1a8 8 0 0 0-1.8 1l-2.4-1-2 3.4L5.1 11a7 7 0 0 0 0 2L3 14.5l2 3.4 2.4-1a8 8 0 0 0 1.8 1l.4 3.1h4.8l.4-3.1a8 8 0 0 0 1.8-1l2.4 1 2-3.4-2.1-1.5a7 7 0 0 0 .1-1z" />
                    </svg>
                </span>
            </div>
        </header>
    );
}

export default CameraTopBar;