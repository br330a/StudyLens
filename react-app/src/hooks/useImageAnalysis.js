import { useState } from "react";

import { analisarImagem } from "../services/api";

function useImageAnalysis(adicionarConteudo) {
    const [resultadoAtual, setResultadoAtual] =
        useState(null);

    const [analisando, setAnalisando] =
        useState(false);

    const [erroAnalise, setErroAnalise] =
        useState("");

    async function analisar(imagem) {
        try {
            setAnalisando(true);
            setErroAnalise("");
            setResultadoAtual(null);

            const resultado =
                await analisarImagem(imagem);

            const idConteudo = Date.now();
            const dataEstudo =
                new Date().toISOString();

            const novoConteudo = {
                id: idConteudo,
                materia: resultado.materia,
                conteudo: resultado.conteudo,
                resumo: resultado.resumo,
                flashcards: resultado.flashcards,
                questoes: resultado.questoes,
                dataEstudo,
            };

            setResultadoAtual({
                id: idConteudo,
                materia: resultado.materia,
                conteudo: resultado.conteudo,
                resumo: resultado.resumo,
                flashcards: resultado.flashcards,
                questoes: resultado.questoes,
            });

            adicionarConteudo(novoConteudo);

            return novoConteudo;
        } catch (erro) {
            console.error(
                "Erro na análise:",
                erro
            );

            setErroAnalise(
                erro.message ||
                    "Não foi possível analisar a imagem."
            );

            return null;
        } finally {
            setAnalisando(false);
        }
    }

    return {
        resultadoAtual,
        analisando,
        erroAnalise,
        analisar,
    };
}

export default useImageAnalysis;