import { useEffect, useRef, useState } from "react";

function CameraCapture({ onImagemConfirmada, analisando = false, }) {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const inputRef = useRef(null);

    const [streamCamera, setStreamCamera] = useState(null);
    const [imagemArquivo, setImagemArquivo] = useState(null);
    const [imagemPreview, setImagemPreview] = useState(null);
    const [cameraAberta, setCameraAberta] = useState(false);
    const [mensagem, setMensagem] = useState("");

    const [envioIniciado, setEnvioIniciado] =
        useState(false);



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

                setImagemArquivo(blob);

                const url =
                    URL.createObjectURL(blob);

                setImagemPreview(url);

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

        const arquivo =
            event.target.files?.[0];

        if (!arquivo) {
            return;
        }

        if (!arquivo.type.startsWith("image/")) {

            setMensagem(
                "Selecione um arquivo de imagem válido."
            );

            event.target.value = "";

            return;
        }

        setMensagem("");

        pararCamera();

        setImagemArquivo(arquivo);

        const url =
            URL.createObjectURL(arquivo);

        setImagemPreview(url);
    }



    // =========================
    // PREVIEW
    // =========================

    function novaCaptura() {

        setImagemArquivo(null);
        setImagemPreview(null);
        setMensagem("");

        if (inputRef.current) {
            inputRef.current.value = "";
        }

        iniciarCamera();
    }



    async function confirmarImagem() {
        if (!imagemArquivo) {
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
                    imagemArquivo
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



    useEffect(() => {

        return () => {

            if (imagemPreview) {
                URL.revokeObjectURL(
                    imagemPreview
                );
            }

        };

    }, [imagemPreview]);



    // =========================
    // INTERFACE
    // =========================

    return (
        <div className="flex h-full min-h-0 flex-col bg-black">

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
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

                {!cameraAberta && imagemPreview && (
                    <img
                        src={imagemPreview}
                        alt="Pré-visualização do conteúdo capturado"
                        className="h-full w-full object-contain"
                    />
                )}

                {!cameraAberta && !imagemPreview && (
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

                {!imagemPreview && (
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
                            aria-label={
                                cameraAberta
                                    ? "Capturar foto"
                                    : "Abrir câmera"
                            }
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
                            onClick={
                                cameraAberta
                                    ? capturarFoto
                                    : iniciarCamera
                            }
                        >
                            <span
                                className="
                                    block size-full
                                    rounded-full
                                    bg-white
                                "
                            />
                        </button>

                        {cameraAberta ? (
                            <button
                                type="button"
                                className="
                                    justify-self-end
                                    appearance-none
                                    border-0
                                    bg-transparent
                                    text-sm
                                    text-white/60
                                    cursor-pointer
                                "
                                onClick={pararCamera}
                            >
                                Fechar
                            </button>
                        ) : (
                            <span />
                        )}
                    </div>
                )}

                {imagemPreview && (
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            disabled={
                                analisando ||
                                envioIniciado
                            }
                            className="
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
                            {analisando || envioIniciado
                                ? "Analisando..."
                                : "Usar imagem"}
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
                                border border-white/20
                                bg-white/10
                                px-4 py-3
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
                            Tirar novamente
                        </button>
                    </div>
                )}

            </div>

        </div>
    );
}

export default CameraCapture;