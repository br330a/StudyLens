const MAX_DIMENSION = 1920;
const MAX_SIZE_WITHOUT_COMPRESSION =
    2 * 1024 * 1024;
const JPEG_QUALITY = 0.85;

async function carregarImagem(imagem) {
    const url = URL.createObjectURL(imagem);

    try {
        const elemento = new Image();

        await new Promise((resolve, reject) => {
            elemento.onload = resolve;
            elemento.onerror = reject;
            elemento.src = url;
        });

        return elemento;
    } finally {
        URL.revokeObjectURL(url);
    }
}

export async function prepararImagemParaAnalise(
    imagem
) {
    if (!(imagem instanceof Blob)) {
        throw new Error(
            "A imagem selecionada é inválida."
        );
    }

    if (!imagem.type.startsWith("image/")) {
        throw new Error(
            "O arquivo selecionado precisa ser uma imagem."
        );
    }

    let elemento;

    try {
        elemento = await carregarImagem(imagem);
    } catch {
        throw new Error(
            "Não foi possível processar esta imagem."
        );
    }

    const maiorDimensao = Math.max(
        elemento.naturalWidth,
        elemento.naturalHeight
    );

    const precisaRedimensionar =
        maiorDimensao > MAX_DIMENSION;

    const precisaComprimir =
        imagem.size >
        MAX_SIZE_WITHOUT_COMPRESSION;

    if (
        !precisaRedimensionar &&
        !precisaComprimir
    ) {
        return imagem;
    }

    const escala = Math.min(
        1,
        MAX_DIMENSION / maiorDimensao
    );

    const largura = Math.round(
        elemento.naturalWidth * escala
    );

    const altura = Math.round(
        elemento.naturalHeight * escala
    );

    const canvas =
        document.createElement("canvas");

    canvas.width = largura;
    canvas.height = altura;

    const contexto = canvas.getContext("2d");

    if (!contexto) {
        throw new Error(
            "Não foi possível preparar a imagem."
        );
    }

    contexto.drawImage(
        elemento,
        0,
        0,
        largura,
        altura
    );

    const imagemOtimizada =
        await new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(
                            new Error(
                                "Não foi possível otimizar a imagem."
                            )
                        );

                        return;
                    }

                    resolve(blob);
                },
                "image/jpeg",
                JPEG_QUALITY
            );
        });

    return imagemOtimizada;
}

export async function gerarHashImagem(imagem) {
    if (
        !window.crypto ||
        !window.crypto.subtle
    ) {
        return null;
    }

    const buffer = await imagem.arrayBuffer();

    const hash = await window.crypto.subtle.digest(
        "SHA-256",
        buffer
    );

    return Array.from(
        new Uint8Array(hash)
    )
        .map((byte) =>
            byte
                .toString(16)
                .padStart(2, "0")
        )
        .join("");
}