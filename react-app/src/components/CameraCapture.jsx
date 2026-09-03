import { useEffect, useRef, useState } from "react";

function CameraCapture({ onImagemConfirmada, analisando = false, }) {

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

    async function iniciarCamera() {

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
    }



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

    return (
        <div className="flex h-full min-h-0 flex-col bg-black">

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={selecionarImagem}
            />

            {mensagem && (
                <div className="shrink-0 bg-study-danger px-5 py-3 text-center text-sm text-white">
                    {mensagem}
                </div>
            )}

            <div className="relative min-h-0 flex-1 overflow-hidden bg-black">

                {cameraAberta && (
                    <>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="h-full w-full object-cover"
                        />

                        <canvas
                            ref={canvasRef}
                            hidden
                        />

                        <div
                            className="
                                pointer-events-none
                                absolute inset-5
                                rounded-study-lg
                                border border-white/25
                            "
                        />
                    </>
                )}

                {!cameraAberta &&
                    imagens.length > 0 && (

                    <div
                        className="
                            h-full
                            overflow-y-auto
                            p-4
                        "
                    >
                        <div
                            className="
                                grid
                                grid-cols-2
                                gap-3
                            "
                        >
                            {imagens.map(
                                (imagem, index) => (

                                    <div
                                        key={imagem.id}
                                        className="
                                            relative
                                            overflow-hidden
                                            rounded-study-md
                                            bg-white/10
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
                                                bg-black/70
                                                px-2 py-1
                                                text-xs
                                                font-semibold
                                                text-white
                                            "
                                        >
                                            {index + 1}
                                        </span>

                                        <button
                                            type="button"
                                            aria-label={`Remover captura ${
                                                index + 1
                                            }`}
                                            className="
                                                absolute
                                                right-2 top-2
                                                flex size-8
                                                appearance-none
                                                items-center
                                                justify-center
                                                rounded-full
                                                border-0
                                                bg-black/70
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
                                mt-4
                                text-center
                                text-sm
                                text-white/60
                            "
                        >
                            {imagens.length}
                            {" "}
                            {imagens.length === 1
                                ? "imagem selecionada"
                                : "imagens selecionadas"}
                            {" • "}
                            máximo {LIMITE_IMAGENS}
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
                                mb-4
                                flex size-16
                                items-center
                                justify-center
                                rounded-full
                                bg-white/10
                                text-3xl
                            "
                        >
                            ◉
                        </div>

                        <h2 className="m-0 text-xl font-semibold">
                            StudyLens
                        </h2>

                        <p className="m-0 mt-2 max-w-xs text-sm leading-6 text-white/60">
                            Aponte a câmera para uma lousa,
                            caderno, apostila ou exercício.
                        </p>
                    </div>
                )}

            </div>

            <div className="shrink-0 bg-black px-5 pb-7 pt-4">

                <div
                    className="
                        mb-5 flex
                        items-center
                        justify-center
                        gap-7
                        text-sm
                    "
                >
                    <span className="text-white/40">
                        Foto
                    </span>

                    <span className="text-white/40">
                        Vídeo
                    </span>

                    <span className="relative font-semibold text-white">
                        StudyLens

                        <span
                            className="
                                absolute -bottom-2
                                left-1/2
                                h-1 w-8
                                -translate-x-1/2
                                rounded-full
                                bg-study-primary
                            "
                        />
                    </span>
                </div>

                {cameraAberta && (
                    <div
                        className="
                            grid grid-cols-3
                            items-center
                        "
                    >
                        <button
                            type="button"
                            className="
                                justify-self-start
                                appearance-none
                                border-0
                                bg-transparent
                                text-sm
                                text-white/60
                                cursor-pointer
                            "
                            onClick={pararCamera}
                        >
                            Cancelar
                        </button>

                        <button
                            type="button"
                            aria-label="Capturar foto"
                            className="
                                justify-self-center
                                flex size-18
                                appearance-none
                                items-center
                                justify-center
                                rounded-full
                                border-4
                                border-white
                                bg-white/20
                                p-1
                                cursor-pointer
                            "
                            onClick={capturarFoto}
                        >
                            <span
                                className="
                                    block size-full
                                    rounded-full
                                    bg-white
                                "
                            />
                        </button>

                        <span
                            className="
                                justify-self-end
                                text-xs
                                text-white/50
                            "
                        >
                            {imagens.length + 1}/{LIMITE_IMAGENS}
                        </span>
                    </div>
                )}

                {!cameraAberta &&
                    imagens.length === 0 && (
                        <div
                            className="
                                grid grid-cols-3
                                items-center
                            "
                        >
                            <button
                                type="button"
                                aria-label="Escolher imagem da galeria"
                                className="
                                    justify-self-start
                                    appearance-none
                                    rounded-study-md
                                    border-0
                                    bg-white/10
                                    px-4 py-3
                                    text-sm
                                    text-white
                                    cursor-pointer
                                    transition
                                    hover:bg-white/20
                                "
                                onClick={() =>
                                    inputRef.current?.click()
                                }
                            >
                                Galeria
                            </button>

                            <button
                                type="button"
                                aria-label="Abrir câmera"
                                className="
                                    justify-self-center
                                    flex size-18
                                    appearance-none
                                    items-center
                                    justify-center
                                    rounded-full
                                    border-4
                                    border-white
                                    bg-white/20
                                    p-1
                                    cursor-pointer
                                "
                                onClick={iniciarCamera}
                            >
                                <span
                                    className="
                                        block size-full
                                        rounded-full
                                        bg-white
                                    "
                                />
                            </button>

                            <span />
                        </div>
                    )}

                {!cameraAberta &&
                    imagens.length > 0 && (
                        <div className="grid gap-3">
                            <button
                                type="button"
                                disabled={
                                    analisando ||
                                    envioIniciado
                                }
                                className="
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
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                                onClick={confirmarImagem}
                            >
                                {analisando ||
                                envioIniciado
                                    ? "Analisando..."
                                    : imagens.length === 1
                                        ? "Analisar imagem"
                                        : `Analisar ${imagens.length} imagens`}
                            </button>

                            {imagens.length <
                                LIMITE_IMAGENS && (
                                    <div
                                        className="
                                            grid grid-cols-2
                                            gap-3
                                        "
                                    >
                                        <button
                                            type="button"
                                            disabled={
                                                analisando ||
                                                envioIniciado
                                            }
                                            className="
                                                appearance-none
                                                rounded-study-md
                                                border
                                                border-white/20
                                                bg-white/10
                                                px-4 py-3
                                                text-sm
                                                font-semibold
                                                text-white
                                                cursor-pointer
                                                transition
                                                hover:bg-white/20
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                            onClick={novaCaptura}
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
                                                appearance-none
                                                rounded-study-md
                                                border
                                                border-white/20
                                                bg-white/10
                                                px-4 py-3
                                                text-sm
                                                font-semibold
                                                text-white
                                                cursor-pointer
                                                transition
                                                hover:bg-white/20
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                            onClick={() =>
                                                inputRef.current?.click()
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