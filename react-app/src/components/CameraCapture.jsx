import { useCallback, useEffect, useRef, useState } from "react";

import CameraModeSeletor from "./camera/CameraModeSeletor";
import StudyLensCaptureStrip from "./camera/StudyLensCaptureStrip";
import CameraShutterControls from "./camera/CameraShutterControls";

function CameraCapture({ onImagemConfirmada, analisando = false, autoStart = false, }) {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const inputRef = useRef(null);

    const [streamCamera, setStreamCamera] = useState(null);
    const [imagens, setImagens] =
        useState([]);
    const [cameraAberta, setCameraAberta] = useState(false);
    const [mensagem, setMensagem] = useState("");

    const [modoAtivo, setModoAtivo] =
        useState("studylens");
    

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

                if (
                    modoAtivo ===
                    "studylens"
                ) {
                    pararCamera();
                }

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

        if (
            modoAtivo ===
            "studylens"
        ) {
            pararCamera();
        }

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

    function alterarModoCamera(
        novoModo
    ) {
        if (
            novoModo ===
            modoAtivo
        ) {
            return;
        }

        setMensagem("");

        setModoAtivo(
            novoModo
        );


        if (
            novoModo === "foto"
        ) {
            if (!cameraAberta) {
                iniciarCamera();
            }

            return;
        }


        if (
            novoModo ===
                "studylens" &&
            imagens.length > 0 &&
            cameraAberta
        ) {
            pararCamera();
        }
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

    const imagensAnteriores =
        imagens.length > 1
            ? imagens.slice(
                0,
                -1
            )
            : [];


    const imagensMiniaturaStudyLens =
        cameraAberta
            ? imagens
            : imagensAnteriores;
    
    function refazerCapturaAtual() {
        if (!ultimaImagem) {
            return;
        }

        removerImagem(
            ultimaImagem.id
        );

        iniciarCamera();
    }


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
                                bottom-3
                                left-1/2
                                flex
                                -translate-x-1/2
                                items-center
                                gap-1
                                rounded-full
                                bg-black/55
                                p-1
                                text-[9px]
                                font-semibold
                                text-white/70
                                backdrop-blur-sm
                            "
                        >
                            <span
                                className="
                                    flex h-6
                                    min-w-7
                                    items-center
                                    justify-center
                                    rounded-full
                                    px-1
                                "
                            >
                                0.5
                            </span>

                            <span
                                className="
                                    flex size-7
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#e8c63d]
                                    text-[9px]
                                    font-bold
                                    text-black
                                "
                            >
                                1x
                            </span>

                            <span
                                className="
                                    flex h-6
                                    min-w-7
                                    items-center
                                    justify-center
                                    rounded-full
                                    px-1
                                "
                            >
                                2
                            </span>
                        </div>

                        <div
                            aria-hidden="true"
                            className="
                                pointer-events-none
                                absolute
                                bottom-3 right-3
                                flex size-8
                                items-center
                                justify-center
                                rounded-full
                                bg-black/55
                                text-white/70
                                backdrop-blur-sm
                            "
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="size-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m5 19 10-10" />
                                <path d="m14 5 5 5" />
                                <path d="m4 14 6 6" />
                                <path d="M17 3v3M20 6h-3" />
                            </svg>
                        </div>
                    
                    </>
                )}


                {!cameraAberta &&
                    imagens.length > 0 &&
                    ultimaImagem && (

                        <div
                            className="
                                relative
                                flex
                                h-full
                                items-center
                                justify-center
                                overflow-hidden
                                bg-black
                            "
                        >
                            <img
                                src={
                                    ultimaImagem.previewUrl
                                }
                                alt="Prévia da captura atual"
                                className="
                                    h-full
                                    w-full
                                    object-contain
                                "
                            />

                            {modoAtivo ===
                                "studylens" && (
                                <button
                                    type="button"
                                    aria-label="Descartar captura e tirar outra"
                                    className="
                                        absolute
                                        bottom-4 right-4
                                        z-10
                                        mt-0
                                        flex
                                        appearance-none
                                        items-center
                                        gap-1.5
                                        rounded-full
                                        border
                                        border-white/20
                                        bg-black/65
                                        px-3 py-2
                                        text-xs
                                        font-semibold
                                        text-white
                                        shadow-md
                                        backdrop-blur-sm
                                        cursor-pointer
                                        transition
                                        hover:bg-black/80
                                    "
                                    onClick={
                                        refazerCapturaAtual
                                    }
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="size-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M20 11a8 8 0 0 0-14.8-4" />
                                        <path d="M5 3v4h4" />
                                        <path d="M4 13a8 8 0 0 0 14.8 4" />
                                    </svg>

                                    Refazer
                                </button>
                            )}

                            {modoAtivo ===
                                "studylens" && (
                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        left-1/2 top-3

                                        -translate-x-1/2

                                        rounded-full

                                        bg-black/55

                                        px-3 py-1.5

                                        text-[10px]
                                        font-medium
                                        text-white/75

                                        backdrop-blur-sm
                                    "
                                >
                                    Confira a captura antes de analisar
                                </div>
                            )}
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
                    bg-black
                    px-4
                    pb-[max(20px,env(safe-area-inset-bottom))]
                    pt-2
                "
            >

                {modoAtivo ===
                    "studylens" &&
                    imagensMiniaturaStudyLens.length >
                        0 && (

                        <StudyLensCaptureStrip
                            imagens={
                                imagensMiniaturaStudyLens
                            }
                            onRemover={
                                removerImagem
                            }
                        />
                    )}
                <div className="mb-5">
                    <CameraModeSeletor
                        modoAtivo={modoAtivo}
                        onAlterarModo={alterarModoCamera}
                    />
                </div>


                {cameraAberta && (
                    <CameraShutterControls
                        modoAtivo={
                            modoAtivo
                        }
                        ultimaImagem={
                            ultimaImagem
                        }
                        cameraAtiva
                        onAbrirGaleria={() =>
                            inputRef.current
                                ?.click()
                        }
                        onObturador={
                            capturarFoto
                        }
                    />
                )}


                {!cameraAberta &&
                    imagens.length === 0 && (
                        <CameraShutterControls
                            modoAtivo={
                                modoAtivo
                            }
                            ultimaImagem={
                                ultimaImagem
                            }
                            cameraAtiva={false}
                            onAbrirGaleria={() =>
                                inputRef.current
                                    ?.click()
                            }
                            onObturador={
                                iniciarCamera
                            }
                        />
                    )}


                {!cameraAberta &&
                    imagens.length > 0 &&
                    modoAtivo ===
                        "studylens" && (

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
                                            Nova Foto
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
                                            Adicionar da galeria
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