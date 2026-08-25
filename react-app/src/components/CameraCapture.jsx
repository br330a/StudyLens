import { useEffect, useRef, useState } from "react";

function CameraCapture({ onImagemConfirmada }) {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const inputRef = useRef(null);

    const [streamCamera, setStreamCamera] = useState(null);
    const [imagemArquivo, setImagemArquivo] = useState(null);
    const [imagemPreview, setImagemPreview] = useState(null);
    const [cameraAberta, setCameraAberta] = useState(false);
    const [mensagem, setMensagem] = useState("");



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



    function confirmarImagem() {

        if (!imagemArquivo) {

            setMensagem(
                "Nenhuma imagem foi selecionada."
            );

            return;
        }

        if (onImagemConfirmada) {
            onImagemConfirmada(imagemArquivo);
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
        <div className="captura-react">

            <div className="captura-acoes">

                <button
                    type="button"
                    onClick={iniciarCamera}
                >
                    📷 Capturar agora
                </button>

                <button
                    type="button"
                    onClick={() =>
                        inputRef.current?.click()
                    }
                >
                    🖼️ Escolher da galeria
                </button>

            </div>


            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={selecionarImagem}
            />


            {mensagem && (

                <p className="mensagem-captura">
                    {mensagem}
                </p>

            )}


            {cameraAberta && (

                <div className="area-captura">

                    <div className="camera-container">

                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                        />

                        <canvas
                            ref={canvasRef}
                            hidden
                        />

                    </div>


                    <div className="captura-controles">

                        <button
                            type="button"
                            onClick={capturarFoto}
                        >
                            Capturar foto
                        </button>

                        <button
                            type="button"
                            onClick={pararCamera}
                        >
                            Cancelar
                        </button>

                    </div>

                </div>

            )}


            {imagemPreview && (

                <div className="preview-imagem">

                    <img
                        src={imagemPreview}
                        alt="Pré-visualização do conteúdo capturado"
                    />


                    <div className="preview-acoes">

                        <button
                            type="button"
                            onClick={confirmarImagem}
                        >
                            Usar imagem
                        </button>

                        <button
                            type="button"
                            onClick={novaCaptura}
                        >
                            Tirar novamente
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}

export default CameraCapture;