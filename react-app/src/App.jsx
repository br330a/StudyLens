import { useEffect, useState } from "react";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Historico from "./pages/Historico";

import "./styles/app.css";

import Materias from "./pages/Materias";
import historicoInicial from "./data/historicoInicial";
import Progresso from "./pages/Progresso";

import { analisarImagem } from "./services/api";

import Conteudo from "./pages/Conteudo";

import Materia from "./pages/Materia";

function App() {

    const [telaAtiva, setTelaAtiva] = useState("inicio");

    const [historico, setHistorico] = useState(() => {

        const historicoSalvo =
            localStorage.getItem("studylens-historico");

        if (historicoSalvo) {

            try {

                const dados =
                    JSON.parse(historicoSalvo);

                if (Array.isArray(dados)) {
                    return dados;
                }

            } catch (erro) {

                console.error(
                    "Erro ao carregar histórico:",
                    erro
                );

            }

        }

        return [];
    });

    const [resultadoAtual, setResultadoAtual] = useState(null);
    const [analisando, setAnalisando] = useState(false);
    const [erroAnalise, setErroAnalise] = useState("");

    const [
        conteudoSelecionado,
        setConteudoSelecionado
    ] = useState(null);

    const [
        materiaSelecionada,
        setMateriaSelecionada
    ] = useState(null);

    const [
        origemConteudo,
        setOrigemConteudo
    ] = useState("historico");

    useEffect(() => {

        localStorage.setItem(
            "studylens-historico",
            JSON.stringify(historico)
        );

    }, [historico]);


    async function receberImagem(imagem) {

        try {

            setAnalisando(true);
            setErroAnalise("");
            setResultadoAtual(null);

            console.log(
                "Enviando imagem para o backend..."
            );

            const resultado =
                await analisarImagem(imagem);
            
            setResultadoAtual({

                id: Date.now(),

                materia: resultado.materia,
                conteudo: resultado.conteudo,

                resumo: resultado.resumo,
                flashcards: resultado.flashcards,
                questoes: resultado.questoes

            });
            
            const novoConteudo = {

                id: Date.now(),

                materia: resultado.materia,
                conteudo: resultado.conteudo,

                resumo: resultado.resumo,
                flashcards: resultado.flashcards,
                questoes: resultado.questoes

            };

            setHistorico((historicoAtual) => [
                novoConteudo,
                ...historicoAtual
            ]);

            console.log(
                "Resposta do backend:",
                resultado
            );

        } catch (erro) {

            console.error(
                "Erro na análise:",
                erro
            );

            setErroAnalise(
                erro.message ||
                "Não foi possível analisar a imagem."
            );

        }

        finally {

            setAnalisando(false);

        }
    }

    function abrirConteudo(
        conteudo,
        origem = "historico"
    ) {

        setConteudoSelecionado(conteudo);

        setOrigemConteudo(origem);

        setTelaAtiva("conteudo");

    }

    function abrirMateria(materia) {

        setMateriaSelecionada(materia);

        setTelaAtiva("materia");

    }

    function renderizarTela() {

        if (telaAtiva === "inicio") {
            return (
                <Home
                    onImagemConfirmada={receberImagem}
                    resultadoAtual={resultadoAtual}
                    analisando={analisando}
                    erroAnalise={erroAnalise}
                    onAbrirConteudo={abrirConteudo}
                />
            );

        }

        if (telaAtiva === "materias") {

            return (
                <Materias
                    historico={historico}
                    onAbrirMateria={abrirMateria}
                />
            );

        }

        if (telaAtiva === "historico") {
            return (
                <Historico
                    historico={historico}
                    onAbrirConteudo={abrirConteudo}
                />
            );
        }

        if (telaAtiva === "progresso") {

            return (
                <Progresso
                    historico={historico}
                />
            );

        }

        if (telaAtiva === "conteudo") {

            return (
                <Conteudo
                    conteudo={conteudoSelecionado}
                    onVoltar={() => {

                        if (origemConteudo === "materia") {
                            setTelaAtiva("materia");
                            return;
                        }

                        setTelaAtiva("historico");

                    }}
                />
            );

        }

        if (telaAtiva === "materia") {

            return (
                <Materia
                    materia={materiaSelecionada}
                    historico={historico}
                    onAbrirConteudo={
                        abrirConteudo
                    }
                    onVoltar={() =>
                        setTelaAtiva("materias")
                    }
                />
            );

        }

        return (
            <div className="tela ativa">
                <section>
                    <h2>{telaAtiva}</h2>

                    <p>
                        Esta tela será migrada em seguida.
                    </p>
                </section>
            </div>
        );
    }

    return (
        <div className="app">

            <Header nome="Bruno" />

            <main>
                {renderizarTela()}
            </main>

            <BottomNav
                telaAtiva={telaAtiva}
                onNavigate={setTelaAtiva}
            />

        </div>
    );
}

export default App;