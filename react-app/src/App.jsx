import { useEffect, useState } from "react";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Historico from "./pages/Historico";

import "./styles/app.css";

import Materias from "./pages/Materias";
import historicoInicial from "./data/historicoInicial";
import Progresso from "./pages/Progresso";

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

    useEffect(() => {

        localStorage.setItem(
            "studylens-historico",
            JSON.stringify(historico)
        );

    }, [historico]);

    function adicionarConteudoTeste() {

        const opcoes = [
            {
                materia: "Matemática",
                conteudo: "Função Afim"
            },
            {
                materia: "Biologia",
                conteudo: "Genética"
            },
            {
                materia: "Física",
                conteudo: "Cinemática"
            }
        ];

        const indice =
            Math.floor(
                Math.random() * opcoes.length
            );

        const conteudoSelecionado =
            opcoes[indice];

        const novoConteudo = {
            id: Date.now(),
            ...conteudoSelecionado
        };

        setHistorico((historicoAtual) => [
            novoConteudo,
            ...historicoAtual
        ]);
    }

    function receberImagem(imagem) {

        console.log(
            "Imagem pronta para análise:",
            imagem
        );

    }

    function renderizarTela() {

        if (telaAtiva === "inicio") {
            return (
                <Home
                    onAdicionarConteudo={
                        adicionarConteudoTeste
                    }
                    onImagemConfirmada={
                        receberImagem
                    }
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