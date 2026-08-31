import { useEffect, useState } from "react";

const STORAGE_KEY = "studylens-historico";

function useStudyHistory() {
    const [historico, setHistorico] = useState(() => {
        const historicoSalvo =
            localStorage.getItem(STORAGE_KEY);

        if (!historicoSalvo) {
            return [];
        }

        try {
            const dados = JSON.parse(historicoSalvo);

            return Array.isArray(dados)
                ? dados
                : [];
        } catch (erro) {
            console.error(
                "Erro ao carregar histórico:",
                erro
            );

            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(historico)
        );
    }, [historico]);

    function adicionarConteudo(conteudo) {
        setHistorico((historicoAtual) => [
            conteudo,
            ...historicoAtual,
        ]);
    }

    return {
        historico,
        adicionarConteudo,
    };
}

export default useStudyHistory;