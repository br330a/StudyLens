import { useCallback, useEffect, useRef, useState } from "react";

function CameraCapture({ onImagemConfirmada, analisando = false, autoStart = false, }) {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const inputRef = useRef(null);

    const [streamCamera, setStreamCamera] = useState(null);
    const [imagens, setImagens] =
        useState([]);
    const [cameraAberta, setCameraAberta] = useState(false);
    const [mensagem, setMensagem] = useState("");

    const [envioIniciado, setEnvioIniciado] =
        useState(false);
    
    const LIMITE_IMAGENS = 4;


    function adicionarImagem(
        arquivo,
        previewUrl
    ) {
        setImagens((imagensAtuais) => {

            if (
                imagensAtuais.length >=
                LIMITE_IMAGENS
            ) {
                URL.revokeObjectURL(
                    previewUrl
                );

                setMensagem(
                    `Você pode enviar no máximo ${LIMITE_IMAGENS} imagens por análise.`
                );

                return imagensAtuais;
            }

            return [
                ...imagensAtuais,
                {
                    id:
                        crypto.randomUUID(),
                    arquivo,
                    previewUrl,
                }
            ];
        });
    }


    // =========================
    // CÂMERA
    // =========================

    const iniciarCamera =
        useCallback(async () => {

            setMensagem("");

            if (
                !navigator.mediaDevices ||
                !navigator.mediaDevices.getUserMedia
            ) {
                setMensagem(
                    "Seu navegador não permite acesso à câmera."
                );

                return;
            }

            try {

                const stream =
                    await navigator.mediaDevices.getUserMedia({
                        video: {
                            facingMode: {
                                ideal: "environment"
                            },
                            width: {
                                ideal: 1920
                            },
                            height: {
                                ideal: 1080
                            }
                        },
                        audio: false
                    });

                setStreamCamera(stream);
                setCameraAberta(true);

            } catch (erro) {

                console.error(
                    "Erro ao acessar a câmera:",
                    erro
                );

                setMensagem(
                    "Não foi possível acessar a câmera. Verifique a permissão do navegador."
                );
            }

        }, []);



    function pararCamera() {

        if (streamCamera) {

            streamCamera
                .getTracks()
                .forEach((track) => {
                    track.stop();
                });
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }

        setStreamCamera(null);
        setCameraAberta(false);
    }



    function capturarFoto() {

        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) {
            return;
        }

        if (
            !video.videoWidth ||
            !video.videoHeight
        ) {
            setMensagem(
                "A câmera ainda não está pronta."
            );

            return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const contexto =
            canvas.getContext("2d");

        contexto.drawImage(
            video,
            0,
            0,
            canvas.width,
            canvas.height
        );

        canvas.toBlob(
            (blob) => {

                if (!blob) {

                    setMensagem(
                        "Não foi possível capturar a imagem."
                    );

                    return;
                }

                const url =
                    URL.createObjectURL(blob);

                adicionarImagem(
                    blob,
                    url
                );

                pararCamera();

            },
            "image/jpeg",
            0.9
        );
    }



    // =========================
    // GALERIA
    // =========================

    function selecionarImagem(event) {

        const arquivos =
            Array.from(
                event.target.files || []
            );

        if (
            arquivos.length === 0
        ) {
            return;
        }

        setMensagem("");

        pararCamera();

        const espacosDisponiveis =
            LIMITE_IMAGENS -
            imagens.length;

        const arquivosPermitidos =
            arquivos.slice(
                0,
                espacosDisponiveis
            );

        arquivosPermitidos.forEach(
            (arquivo) => {

                if (
                    !arquivo.type.startsWith(
                        "image/"
                    )
                ) {
                    return;
                }

                const url =
                    URL.createObjectURL(
                        arquivo
                    );

                adicionarImagem(
                    arquivo,
                    url
                );
            }
        );

        if (
            arquivos.length >
            espacosDisponiveis
        ) {
            setMensagem(
                `O limite é de ${LIMITE_IMAGENS} imagens por análise.`
            );
        }

        event.target.value = "";
    }

    function removerImagem(id) {

        setImagens(
            (imagensAtuais) => {

                const imagemRemovida =
                    imagensAtuais.find(
                        (imagem) =>
                            imagem.id === id
                    );

                if (
                    imagemRemovida
                        ?.previewUrl
                ) {
                    URL.revokeObjectURL(
                        imagemRemovida
                            .previewUrl
                    );
                }

                return imagensAtuais.filter(
                    (imagem) =>
                        imagem.id !== id
                );
            }
        );
    }



    // =========================
    // PREVIEW
    // =========================

    function novaCaptura() {

        setMensagem("");

        if (
            imagens.length >=
            LIMITE_IMAGENS
        ) {
            setMensagem(
                `Você já atingiu o limite de ${LIMITE_IMAGENS} imagens.`
            );

            return;
        }

        iniciarCamera();
    }



    async function confirmarImagem() {

        if (
            imagens.length === 0
        ) {
            setMensagem(
                "Nenhuma imagem foi selecionada."
            );

            return;
        }

        if (
            analisando ||
            envioIniciado
        ) {
            return;
        }

        try {
            setEnvioIniciado(true);

            if (onImagemConfirmada) {
                await onImagemConfirmada(
                    imagens.map(
                        (imagem) =>
                            imagem.arquivo
                    )
                );
            }

        } finally {
            setEnvioIniciado(false);
        }
    }


    // =========================
    // EFFECTS
    // =========================

    useEffect(() => {

        if (!autoStart) {
            return;
        }

        const timeout =
            setTimeout(() => {
                iniciarCamera();
            }, 0);

        return () => {
            clearTimeout(timeout);
        };

    }, [
        autoStart,
        iniciarCamera
    ]);

    useEffect(() => {

        if (
            cameraAberta &&
            streamCamera &&
            videoRef.current
        ) {

            videoRef.current.srcObject =
                streamCamera;

            videoRef.current
                .play()
                .catch((erro) => {

                    console.error(
                        "Erro ao iniciar preview da câmera:",
                        erro
                    );

                });
        }

    }, [cameraAberta, streamCamera]);



    useEffect(() => {

        return () => {

            if (streamCamera) {

                streamCamera
                    .getTracks()
                    .forEach((track) => {
                        track.stop();
                    });
            }

        };

    }, [streamCamera]);



    const imagensRef =
        useRef(imagens);

    useEffect(() => {
        imagensRef.current =
            imagens;
    }, [imagens]);

    useEffect(() => {

        return () => {

            imagensRef.current.forEach(
                (imagem) => {

                    if (
                        imagem.previewUrl
                    ) {
                        URL.revokeObjectURL(
                            imagem.previewUrl
                        );
                    }
                }
            );
        };

    }, []);



    // =========================
    // INTERFACE
    // =========================

    const ultimaImagem =
        imagens.length > 0
            ? imagens[
                imagens.length - 1
            ]
            : null;


    return (
        <div
            className="
                flex h-full
                min-h-0
                flex-col
                bg-black
            "
        >

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={
                    selecionarImagem
                }
            />


            {mensagem && (
                <div
                    className="
                        shrink-0

                        bg-study-danger

                        px-5 py-2.5

                        text-center
                        text-xs
                        text-white
                    "
                >
                    {mensagem}
                </div>
            )}


            <div
                className="
                    relative
                    min-h-0
                    flex-1
                    overflow-hidden
                    bg-neutral-950
                "
            >

                {cameraAberta && (
                    <>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="
                                h-full
                                w-full
                                object-cover
                            "
                        />

                        <canvas
                            ref={canvasRef}
                            hidden
                        />


                        <div
                            className="
                                pointer-events-none

                                absolute
                                bottom-4
                                left-1/2

                                -translate-x-1/2

                                rounded-full

                                bg-black/55

                                px-2.5 py-1

                                text-[10px]
                                font-semibold
                                text-white/80

                                backdrop-blur-sm
                            "
                        >
                            1x
                        </div>
                    </>
                )}


                {!cameraAberta &&
                    imagens.length > 0 && (

                        <div
                            className="
                                h-full
                                overflow-y-auto
                                bg-black
                                p-3
                            "
                        >

                            <div
                                className="
                                    grid
                                    grid-cols-2
                                    gap-2.5

                                    sm:grid-cols-3
                                "
                            >
                                {imagens.map(
                                    (
                                        imagem,
                                        index
                                    ) => (

                                        <div
                                            key={
                                                imagem.id
                                            }
                                            className="
                                                relative

                                                overflow-hidden

                                                rounded-lg

                                                bg-white/10
                                            "
                                        >

                                            <img
                                                src={
                                                    imagem.previewUrl
                                                }
                                                alt={`Captura ${
                                                    index +
                                                    1
                                                }`}
                                                className="
                                                    aspect-[4/3]
                                                    w-full
                                                    object-cover
                                                "
                                            />


                                            <span
                                                className="
                                                    absolute
                                                    left-2 top-2

                                                    rounded-full

                                                    bg-black/65

                                                    px-2 py-1

                                                    text-[10px]
                                                    font-semibold
                                                    text-white
                                                "
                                            >
                                                {
                                                    index +
                                                    1
                                                }
                                            </span>


                                            <button
                                                type="button"
                                                aria-label={`Remover captura ${
                                                    index +
                                                    1
                                                }`}
                                                className="
                                                    absolute
                                                    right-2 top-2

                                                    mt-0

                                                    flex size-7

                                                    appearance-none

                                                    items-center
                                                    justify-center

                                                    rounded-full
                                                    border-0

                                                    bg-black/65

                                                    p-0

                                                    text-sm
                                                    text-white

                                                    cursor-pointer
                                                "
                                                onClick={() =>
                                                    removerImagem(
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


                            <p
                                className="
                                    m-0
                                    mt-3

                                    text-center
                                    text-xs
                                    text-white/50
                                "
                            >
                                {imagens.length}
                                {" "}
                                {imagens.length === 1
                                    ? "captura"
                                    : "capturas"}
                                {" • "}
                                máximo {
                                    LIMITE_IMAGENS
                                }
                            </p>

                        </div>
                    )}


                {!cameraAberta &&
                    imagens.length === 0 && (

                        <div
                            className="
                                flex h-full

                                flex-col

                                items-center
                                justify-center

                                px-8

                                text-center
                            "
                        >

                            <div
                                className="
                                    mb-3

                                    size-9

                                    animate-pulse

                                    rounded-full

                                    border-2
                                    border-white/20
                                    border-t-white
                                "
                            />

                            <p
                                className="
                                    m-0

                                    text-sm
                                    text-white/60
                                "
                            >
                                Preparando câmera...
                            </p>

                        </div>
                    )}

            </div>


            <div
                className="
                    shrink-0

                    border-t
                    border-white/5

                    bg-black

                    px-4
                    pb-[max(18px,env(safe-area-inset-bottom))]
                    pt-3
                "
            >

                <div
                    className="
                        mb-4

                        flex
                        items-center
                        justify-center

                        gap-4

                        whitespace-nowrap

                        text-[11px]

                        sm:gap-6
                        sm:text-xs
                    "
                >

                    <span
                        className="
                            text-white/35
                        "
                    >
                        Retrato
                    </span>

                    <span
                        className="
                            text-white/45
                        "
                    >
                        Foto
                    </span>

                    <span
                        className="
                            text-white/45
                        "
                    >
                        Vídeo
                    </span>


                    <span
                        className="
                            relative

                            font-semibold

                            text-white
                        "
                    >
                        StudyLens

                        <span
                            className="
                                absolute

                                -bottom-2
                                left-1/2

                                h-0.5
                                w-8

                                -translate-x-1/2

                                rounded-full

                                bg-study-primary
                            "
                        />
                    </span>


                    <span
                        className="
                            text-white/35
                        "
                    >
                        Mais
                    </span>

                </div>


                {cameraAberta && (

                    <div
                        className="
                            grid
                            grid-cols-3
                            items-center
                        "
                    >

                        <button
                            type="button"
                            aria-label="Escolher imagem da galeria"
                            className="
                                mt-0

                                flex size-12

                                justify-self-start

                                appearance-none

                                items-center
                                justify-center

                                overflow-hidden

                                rounded-lg

                                border
                                border-white/15

                                bg-white/10

                                p-0

                                text-lg
                                text-white

                                cursor-pointer

                                transition

                                hover:bg-white/15
                            "
                            onClick={() =>
                                inputRef.current
                                    ?.click()
                            }
                        >

                            {ultimaImagem ? (
                                <img
                                    src={
                                        ultimaImagem.previewUrl
                                    }
                                    alt="Última captura"
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                    "
                                />
                            ) : (
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
                            )}

                        </button>


                        <button
                            type="button"
                            aria-label="Capturar foto"
                            className="
                                mt-0

                                flex size-[74px]

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

                                transition

                                active:scale-95
                            "
                            onClick={
                                capturarFoto
                            }
                        >
                            <span
                                className="
                                    block
                                    size-full

                                    rounded-full

                                    bg-study-primary

                                    shadow-[inset_0_0_0_2px_rgba(255,255,255,0.18)]
                                "
                            />
                        </button>


                        <div
                            className="
                                flex size-11

                                justify-self-end

                                items-center
                                justify-center

                                rounded-full

                                border
                                border-white/10

                                bg-white/5

                                text-[11px]
                                font-semibold
                                text-white/65
                            "
                        >
                            {imagens.length}
                            /
                            {LIMITE_IMAGENS}
                        </div>

                    </div>
                )}


                {!cameraAberta &&
                    imagens.length === 0 && (

                        <div
                            className="
                                grid
                                grid-cols-3
                                items-center
                            "
                        >

                            <button
                                type="button"
                                aria-label="Escolher imagem da galeria"
                                className="
                                    mt-0

                                    flex size-12

                                    justify-self-start

                                    appearance-none

                                    items-center
                                    justify-center

                                    rounded-lg

                                    border
                                    border-white/15

                                    bg-white/10

                                    p-0

                                    text-lg
                                    text-white

                                    cursor-pointer
                                "
                                onClick={() =>
                                    inputRef.current
                                        ?.click()
                                }
                            >
                                ▦
                            </button>


                            <button
                                type="button"
                                aria-label="Abrir câmera"
                                className="
                                    mt-0

                                    flex size-[74px]

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
                                "
                                onClick={
                                    iniciarCamera
                                }
                            >
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
                            </button>


                            <div
                                className="
                                    flex size-11

                                    justify-self-end

                                    items-center
                                    justify-center

                                    rounded-full

                                    border
                                    border-white/10

                                    bg-white/5

                                    text-[11px]
                                    font-semibold
                                    text-white/50
                                "
                            >
                                0/{LIMITE_IMAGENS}
                            </div>

                        </div>
                    )}


                {!cameraAberta &&
                    imagens.length > 0 && (

                        <div
                            className="
                                grid
                                gap-2.5
                            "
                        >

                            <button
                                type="button"
                                disabled={
                                    analisando ||
                                    envioIniciado
                                }
                                className="
                                    mt-0
                                    w-full

                                    appearance-none

                                    rounded-full

                                    border-0

                                    bg-study-primary

                                    px-4 py-3

                                    text-sm
                                    font-semibold
                                    text-white

                                    cursor-pointer

                                    transition

                                    hover:bg-study-primary-hover

                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                                onClick={
                                    confirmarImagem
                                }
                            >
                                {analisando ||
                                envioIniciado
                                    ? "Analisando..."
                                    : imagens.length ===
                                        1
                                        ? "Analisar captura"
                                        : `Analisar ${imagens.length} capturas`}
                            </button>


                            {imagens.length <
                                LIMITE_IMAGENS && (

                                    <div
                                        className="
                                            grid
                                            grid-cols-2
                                            gap-2
                                        "
                                    >

                                        <button
                                            type="button"
                                            disabled={
                                                analisando ||
                                                envioIniciado
                                            }
                                            className="
                                                mt-0

                                                appearance-none

                                                rounded-full

                                                border
                                                border-white/15

                                                bg-white/5

                                                px-4 py-2.5

                                                text-xs
                                                font-semibold
                                                text-white/80

                                                cursor-pointer

                                                transition

                                                hover:bg-white/10

                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                            onClick={
                                                novaCaptura
                                            }
                                        >
                                            + Foto
                                        </button>


                                        <button
                                            type="button"
                                            disabled={
                                                analisando ||
                                                envioIniciado
                                            }
                                            className="
                                                mt-0

                                                appearance-none

                                                rounded-full

                                                border
                                                border-white/15

                                                bg-white/5

                                                px-4 py-2.5

                                                text-xs
                                                font-semibold
                                                text-white/80

                                                cursor-pointer

                                                transition

                                                hover:bg-white/10

                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                            onClick={() =>
                                                inputRef.current
                                                    ?.click()
                                            }
                                        >
                                            + Galeria
                                        </button>

                                    </div>
                                )}

                        </div>
                    )}

            </div>

        </div>
    );
}

export default CameraCapture;