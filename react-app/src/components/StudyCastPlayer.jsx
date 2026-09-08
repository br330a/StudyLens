import {
    useEffect,
    useRef,
    useState,
} from "react";


const VELOCIDADES = [
    0.75,
    1,
    1.25,
    1.5,
    1.75,
    2,
];


function formatarTempo(segundos) {

    if (
        !Number.isFinite(segundos)
    ) {
        return "0:00";
    }

    const minutos =
        Math.floor(
            segundos / 60
        );

    const segundosRestantes =
        Math.floor(
            segundos % 60
        );

    return `${minutos}:${String(
        segundosRestantes
    ).padStart(2, "0")}`;
}


function StudyCastPlayer({
    src,
}) {

    const audioRef =
        useRef(null);

    const [
        tocando,
        setTocando
    ] = useState(false);

    const [
        tempoAtual,
        setTempoAtual
    ] = useState(0);

    const [
        duracao,
        setDuracao
    ] = useState(0);

    const [
        velocidade,
        setVelocidade
    ] = useState(1);

    const [
        menuVelocidadeAberto,
        setMenuVelocidadeAberto
    ] = useState(false);


    useEffect(() => {

        const audio =
            audioRef.current;

        if (!audio) {
            return undefined;
        }


        function atualizarTempo() {
            setTempoAtual(
                audio.currentTime
            );
        }


        function atualizarDuracao() {
            setDuracao(
                audio.duration || 0
            );
        }


        function finalizarAudio() {
            setTocando(false);
        }


        audio.addEventListener(
            "timeupdate",
            atualizarTempo
        );

        audio.addEventListener(
            "loadedmetadata",
            atualizarDuracao
        );

        audio.addEventListener(
            "durationchange",
            atualizarDuracao
        );

        audio.addEventListener(
            "ended",
            finalizarAudio
        );


        return () => {

            audio.removeEventListener(
                "timeupdate",
                atualizarTempo
            );

            audio.removeEventListener(
                "loadedmetadata",
                atualizarDuracao
            );

            audio.removeEventListener(
                "durationchange",
                atualizarDuracao
            );

            audio.removeEventListener(
                "ended",
                finalizarAudio
            );
        };

    }, [src]);


    async function alternarReproducao() {

        const audio =
            audioRef.current;

        if (!audio) {
            return;
        }


        if (tocando) {

            audio.pause();

            setTocando(false);

            return;
        }


        try {

            await audio.play();

            setTocando(true);

        } catch (erro) {

            console.error(
                "Erro ao reproduzir StudyCast:",
                erro
            );
        }
    }


    function alterarProgresso(
        event
    ) {

        const novoTempo =
            Number(
                event.target.value
            );

        if (
            !audioRef.current
        ) {
            return;
        }

        audioRef.current.currentTime =
            novoTempo;

        setTempoAtual(
            novoTempo
        );
    }


    function selecionarVelocidade(
        novaVelocidade
    ) {

        setVelocidade(
            novaVelocidade
        );

        if (
            audioRef.current
        ) {
            audioRef.current.playbackRate =
                novaVelocidade;
        }

        setMenuVelocidadeAberto(
            false
        );
    }


    return (
        <div
            className="
                mt-5
                rounded-[22px]
                border
                border-study-primary/10
                bg-gradient-to-br
                from-white
                to-[#f6f3ff]
                p-4
                shadow-sm
            "
        >

            <audio
                ref={audioRef}
                src={src}
                preload="metadata"
            />


            <div
                className="
                    mb-4
                    flex
                    items-center
                    justify-between
                    gap-3
                "
            >

                <div>

                    <span
                        className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            text-study-primary
                        "
                    >
                        StudyCast
                    </span>

                    <p
                        className="
                            m-0
                            mt-1
                            text-sm
                            font-semibold
                            text-study-text
                        "
                    >
                        Seu áudio está pronto
                    </p>

                </div>


                <span
                    className="
                        rounded-full
                        bg-study-primary-soft
                        px-3 py-1
                        text-[10px]
                        font-bold
                        text-study-primary
                    "
                >
                    Áudio IA
                </span>

            </div>


            <div
                className="
                    flex
                    items-center
                    gap-4
                "
            >

                <button
                    type="button"
                    aria-label={
                        tocando
                            ? "Pausar StudyCast"
                            : "Reproduzir StudyCast"
                    }
                    onClick={
                        alternarReproducao
                    }
                    className="
                        mt-0
                        flex
                        size-14
                        shrink-0
                        appearance-none
                        items-center
                        justify-center
                        rounded-full
                        border-0
                        bg-study-primary
                        p-0
                        text-white
                        shadow-[0_8px_20px_rgba(75,44,255,0.25)]
                        cursor-pointer
                        transition
                        hover:bg-study-primary-hover
                        active:scale-95
                    "
                >

                    {tocando ? (

                        <svg
                            viewBox="0 0 24 24"
                            className="size-5"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <rect
                                x="6"
                                y="5"
                                width="4"
                                height="14"
                                rx="1"
                            />

                            <rect
                                x="14"
                                y="5"
                                width="4"
                                height="14"
                                rx="1"
                            />
                        </svg>

                    ) : (

                        <svg
                            viewBox="0 0 24 24"
                            className="
                                ml-0.5
                                size-5
                            "
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>

                    )}

                </button>


                <div
                    className="
                        min-w-0
                        flex-1
                    "
                >

                    <input
                        type="range"
                        min="0"
                        max={
                            duracao || 0
                        }
                        step="0.1"
                        value={
                            tempoAtual
                        }
                        onChange={
                            alterarProgresso
                        }
                        aria-label="Progresso do StudyCast"
                        className="
                            m-0
                            w-full
                            cursor-pointer
                            accent-[#5936ff]
                        "
                    />


                    <div
                        className="
                            mt-1
                            flex
                            justify-between
                            text-[11px]
                            font-medium
                            text-study-text-muted
                        "
                    >

                        <span>
                            {
                                formatarTempo(
                                    tempoAtual
                                )
                            }
                        </span>

                        <span>
                            {
                                formatarTempo(
                                    duracao
                                )
                            }
                        </span>

                    </div>

                </div>

            </div>


            <div
                className="
                    mt-4
                    flex
                    items-center
                    justify-between
                    gap-2
                    border-t
                    border-study-primary/10
                    pt-3
                "
            >

                <div
                    className="
                        relative
                    "
                >

                    <button
                        type="button"
                        aria-expanded={
                            menuVelocidadeAberto
                        }
                        aria-label="Selecionar velocidade de reprodução"
                        onClick={() =>
                            setMenuVelocidadeAberto(
                                (aberto) => !aberto
                            )
                        }
                        className="
                            mt-0
                            inline-flex
                            appearance-none
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            border-study-primary/15
                            bg-white
                            px-3.5
                            py-2
                            text-xs
                            font-bold
                            text-study-primary
                            cursor-pointer
                            transition
                            hover:bg-study-primary-soft
                        "
                    >
                        {velocidade}x

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className={`
                                size-3.5
                                transition-transform
                                ${
                                    menuVelocidadeAberto
                                        ? "rotate-180"
                                        : ""
                                }
                            `}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>

                    </button>


                    {menuVelocidadeAberto && (

                        <div
                            className="
                                absolute
                                bottom-[calc(100%+8px)]
                                left-0
                                z-20

                                flex
                                items-center
                                gap-1

                                rounded-full

                                border
                                border-study-primary/10

                                bg-white

                                p-1.5

                                shadow-[0_10px_30px_rgba(35,25,80,0.16)]
                            "
                        >

                            {VELOCIDADES.map(
                                (opcao) => (

                                    <button
                                        key={opcao}
                                        type="button"
                                        onClick={() =>
                                            selecionarVelocidade(
                                                opcao
                                            )
                                        }
                                        className={`
                                            mt-0

                                            min-w-[42px]

                                            appearance-none

                                            rounded-full
                                            border-0

                                            px-2.5
                                            py-2

                                            text-[11px]
                                            font-bold

                                            cursor-pointer

                                            transition

                                            ${
                                                velocidade ===
                                                opcao
                                                    ? `
                                                        bg-study-primary
                                                        text-white
                                                    `
                                                    : `
                                                        bg-transparent
                                                        text-study-text-muted
                                                        hover:bg-study-primary-soft
                                                        hover:text-study-primary
                                                    `
                                            }
                                        `}
                                    >
                                        {opcao}x
                                    </button>

                                )
                            )}

                        </div>

                    )}

                </div>


                <a
                    href={src}
                    download="StudyCast.wav"
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-study-primary/15
                        bg-white
                        px-3.5
                        py-2
                        text-xs
                        font-bold
                        text-study-primary
                        no-underline
                        transition
                        hover:bg-study-primary-soft
                    "
                >

                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="size-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 3v12" />
                        <path d="m7 10 5 5 5-5" />
                        <path d="M5 21h14" />
                    </svg>

                    Baixar áudio

                </a>

            </div>

        </div>
    );
}


export default StudyCastPlayer;