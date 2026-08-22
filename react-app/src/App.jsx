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

function App() {

    const [telaAtiva, setTelaAtiva] = useState("inicio");

    const [historico, setHistorico] = useState(() => {

        const historicoSalvo =
            localStorage.getItem("studylens-historico");

        if (historicoSalvo) {
            return JSON.parse(historicoSalvo);
        }

        return historicoInicial;
    });

    const [resultadoAtual, setResultadoAtual] = useState(null);
    const [analisando, setAnalisando] = useState(false);
    const [erroAnalise, setErroAnalise] = useState("");

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
                materia: resultado.materia,
                conteudo: resultado.conteudo
            });
            
            const novoConteudo = {
                id: Date.now(),
                materia: resultado.materia,
                conteudo: resultado.conteudo
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

    function renderizarTela() {

        if (telaAtiva === "inicio") {
            return (
                <Home
                    onImagemConfirmada={receberImagem}
                    resultadoAtual={resultadoAtual}
                    analisando={analisando}
                    erroAnalise={erroAnalise}
                />
            );

        }

        if (telaAtiva === "materias") {
            return <Materias />;
        }

        if (telaAtiva === "historico") {
            return (
                <Historico
                    historico={historico}
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