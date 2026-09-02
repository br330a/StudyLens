const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000";

const TEMPO_LIMITE_ANALISE =
    90 * 1000;

export async function analisarImagem(imagem) {
    const formData = new FormData();

    const extensao =
        imagem.type === "image/png"
            ? "png"
            : "jpg";

    formData.append(
        "imagem",
        imagem,
        `captura.${extensao}`
    );

    const controller =
        new AbortController();

    const timeout = setTimeout(
        () => controller.abort(),
        TEMPO_LIMITE_ANALISE
    );

    try {
        const resposta = await fetch(
            `${API_URL}/api/analisar`,
            {
                method: "POST",
                body: formData,
                signal: controller.signal,
            }
        );

        let dados = {};

        try {
            dados =
                await resposta.json();
        } catch {
            // O backend pode retornar algo
            // inesperado em falhas de infraestrutura.
        }

        if (!resposta.ok) {
            if (resposta.status === 429) {
                throw new Error(
                    dados.erro ||
                        "O limite de análises com IA foi atingido. Tente novamente mais tarde."
                );
            }

            if (resposta.status === 413) {
                throw new Error(
                    "A imagem é muito grande para ser processada."
                );
            }

            if (resposta.status >= 500) {
                throw new Error(
                    dados.erro ||
                        "A IA está temporariamente indisponível. Tente novamente."
                );
            }

            throw new Error(
                dados.erro ||
                    "Não foi possível analisar a imagem."
            );
        }

        return dados;
    } catch (erro) {
        if (erro.name === "AbortError") {
            throw new Error(
                "A análise demorou mais que o esperado. Tente novamente.",
                {
                    cause: erro,
                }
            );
        }

        if (erro instanceof TypeError) {
            throw new Error(
                "Não foi possível conectar ao servidor do StudyLens.",
                {
                    cause: erro,
                }
            );
        }

        throw erro;
    } finally {
        clearTimeout(timeout);
    }
}

const TEMPO_LIMITE_STUDYCAST =
    200 * 1000;

export async function gerarStudyCast(
    roteiroAudio
) {
    const controller =
        new AbortController();

    const timeout =
        setTimeout(
            () =>
                controller.abort(),
            TEMPO_LIMITE_STUDYCAST
        );

    try {

        const resposta =
            await fetch(
                `${API_URL}/api/studycast`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        roteiroAudio
                    }),

                    signal:
                        controller.signal
                }
            );

        if (!resposta.ok) {

            let dados = {};

            try {
                dados =
                    await resposta.json();
            } catch {
                // Resposta inesperada
                // da infraestrutura.
            }

            if (
                resposta.status === 429
            ) {
                throw new Error(
                    dados.erro ||
                        "O limite de geração de áudio foi atingido."
                );
            }

            if (
                resposta.status >= 500
            ) {
                throw new Error(
                    dados.erro ||
                        "O StudyCast está temporariamente indisponível."
                );
            }

            throw new Error(
                dados.erro ||
                    "Não foi possível gerar o StudyCast."
            );
        }

        return await resposta.blob();

    } catch (erro) {

        if (
            erro.name ===
            "AbortError"
        ) {
            throw new Error(
                "A geração do StudyCast demorou mais que o esperado. Tente novamente.",
                {
                    cause: erro
                }
            );
        }

        if (
            erro instanceof TypeError
        ) {
            throw new Error(
                "Não foi possível conectar ao servidor do StudyLens.",
                {
                    cause: erro
                }
            );
        }

        throw erro;

    } finally {

        clearTimeout(
            timeout
        );
    }
}