import {
    useRef,
    useState,
} from "react";

import { analisarImagem } from "../services/api";

import {
    gerarHashImagem,
    prepararImagemParaAnalise,
} from "../utils/imageProcessing";

const CACHE_PREFIX =
    "studylens-analise:";

function useImageAnalysis(adicionarConteudo) {
    const [resultadoAtual, setResultadoAtual] =
        useState(null);

    const [analisando, setAnalisando] =
        useState(false);

    const [erroAnalise, setErroAnalise] =
        useState("");

    const requisicaoEmAndamento =
        useRef(false);

    async function analisar(imagem) {
        if (requisicaoEmAndamento.current) {
            return null;
        }

        requisicaoEmAndamento.current = true;

        try {
            setAnalisando(true);
            setErroAnalise("");
            setResultadoAtual(null);

            const imagemPreparada =
                await prepararImagemParaAnalise(
                    imagem
                );

            const hashImagem =
                await gerarHashImagem(
                    imagemPreparada
                );

            if (hashImagem) {
                const cache =
                    sessionStorage.getItem(
                        `${CACHE_PREFIX}${hashImagem}`
                    );

                if (cache) {
                    const conteudoSalvo =
                        JSON.parse(cache);

                    setResultadoAtual(
                        conteudoSalvo
                    );

                    return conteudoSalvo;
                }
            }

            const resultado =
                await analisarImagem(
                    imagemPreparada
                );

            const idConteudo = Date.now();

            const dataEstudo =
                new Date().toISOString();

            const novoConteudo = {
                id: idConteudo,
                materia: resultado.materia,
                conteudo: resultado.conteudo,
                contexto: resultado.contexto,
                roteiroAudio: resultado.roteiroAudio,   
                resumo: resultado.resumo,
                flashcards: resultado.flashcards,
                questoes: resultado.questoes,
                dataEstudo,
            };

            setResultadoAtual(
                novoConteudo
            );

            adicionarConteudo(
                novoConteudo
            );

            if (hashImagem) {
                try {
                    sessionStorage.setItem(
                        `${CACHE_PREFIX}${hashImagem}`,
                        JSON.stringify(
                            novoConteudo
                        )
                    );
                } catch {
                    // Cache é apenas uma otimização.
                }
            }

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
            requisicaoEmAndamento.current =
                false;

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