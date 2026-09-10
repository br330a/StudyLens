import {
    useState,
} from "react";


export const FLASHCARD_PROGRESS_STORAGE_KEY =
    "studylens-flashcard-progress-v1";


export function criarChaveConteudo(
    conteudo
) {

    if (!conteudo) {
        return null;
    }


    if (
        conteudo.id !== undefined &&
        conteudo.id !== null
    ) {
        return String(
            conteudo.id
        );
    }


    const materia =
        conteudo.materia
            ?.trim()
            .toLowerCase() ||
        "sem-materia";

    const titulo =
        conteudo.conteudo
            ?.trim()
            .toLowerCase() ||
        "sem-conteudo";


    return `${materia}::${titulo}`;
}


export function lerProgressoFlashcards() {

    try {

        const salvo =
            localStorage.getItem(
                FLASHCARD_PROGRESS_STORAGE_KEY
            );


        if (!salvo) {
            return {};
        }


        const progresso =
            JSON.parse(
                salvo
            );


        return (
            progresso &&
            typeof progresso === "object"
                ? progresso
                : {}
        );

    } catch {

        return {};

    }
}


function useFlashcardProgress(
    conteudo
) {

    const [
        progresso,
        setProgresso
    ] = useState(
        lerProgressoFlashcards
    );


    const chaveConteudo =
        criarChaveConteudo(
            conteudo
        );


    function marcarFlashcard(
        indice,
        status
    ) {

        if (
            !chaveConteudo ||
            (
                status !== "revisar" &&
                status !== "dominado"
            )
        ) {
            return;
        }


        setProgresso(
            (progressoAtual) => {

                const conteudoAtual =
                    progressoAtual[
                        chaveConteudo
                    ] || {};


                const novoProgresso = {
                    ...progressoAtual,

                    [chaveConteudo]: {
                        ...conteudoAtual,

                        atualizadoEm:
                            new Date()
                                .toISOString(),

                        cards: {
                            ...conteudoAtual.cards,

                            [indice]:
                                status,
                        },
                    },
                };


                try {

                    localStorage.setItem(
                        FLASHCARD_PROGRESS_STORAGE_KEY,
                        JSON.stringify(
                            novoProgresso
                        )
                    );

                } catch {

                    // A interface continua
                    // funcionando mesmo se
                    // o navegador bloquear
                    // o armazenamento.

                }


                return novoProgresso;

            }
        );
    }


    function obterStatus(
        indice
    ) {

        if (!chaveConteudo) {
            return null;
        }


        return (
            progresso[
                chaveConteudo
            ]
                ?.cards
                ?.[indice] ||
            null
        );
    }


    return {
        marcarFlashcard,
        obterStatus,
    };
}


export default useFlashcardProgress;