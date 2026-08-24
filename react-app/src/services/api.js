const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000";

export async function analisarImagem(imagem) {

    const formData = new FormData();

    formData.append(
        "imagem",
        imagem,
        "captura.jpg"
    );

    const resposta = await fetch(
        `${API_URL}/api/analisar`,
        {
            method: "POST",
            body: formData
        }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {

        throw new Error(
            dados.erro ||
            "Não foi possível analisar a imagem."
        );
    }

    return dados;
}