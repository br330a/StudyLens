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

import {
    Routes,
    Route,
    useNavigate,
    useParams
} from "react-router-dom";

import MateriaRoute from "./pages/MateriaRoute";
import ConteudoRoute from "./pages/ConteudoRoute";

function App() {

    const navigate = useNavigate();

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
            
            const idConteudo = Date.now();
            const dataEstudo = new Date().toISOString();
            
            setResultadoAtual({
                id: idConteudo,
                materia: resultado.materia,
                conteudo: resultado.conteudo,
                resumo: resultado.resumo,
                flashcards: resultado.flashcards,
                questoes: resultado.questoes
            });
            
            const novoConteudo = {
                id: idConteudo,
                materia: resultado.materia,
                conteudo: resultado.conteudo,
                resumo: resultado.resumo,
                flashcards: resultado.flashcards,
                questoes: resultado.questoes,
                dataEstudo: dataEstudo
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

    function abrirConteudo(conteudo) {

        navigate(
            `/conteudo/${conteudo.id}`
        );

    }

    function abrirMateria(materia) {

        navigate(
            `/materias/${encodeURIComponent(
                materia
            )}`
        );

    }

    function navegarPara(tela) {

        if (tela === "inicio") {
            navigate("/");
            return;
        }

        navigate(`/${tela}`);
    }

    return (
        <div className="app">

            <Header/>

            <main>

                <Routes>

                    <Route
                        path="/"
                        element={
                            <Home
                                onImagemConfirmada={
                                    receberImagem
                                }
                                resultadoAtual={
                                    resultadoAtual
                                }
                                analisando={
                                    analisando
                                }
                                erroAnalise={
                                    erroAnalise
                                }
                                onAbrirConteudo={
                                    abrirConteudo
                                }
                            />
                        }
                    />


                    <Route
                        path="/historico"
                        element={
                            <Historico
                                historico={
                                    historico
                                }
                                onAbrirConteudo={
                                    abrirConteudo
                                }
                            />
                        }
                    />


                    <Route
                        path="/materias"
                        element={
                            <Materias
                                historico={
                                    historico
                                }
                                onAbrirMateria={
                                    abrirMateria
                                }
                            />
                        }
                    />


                    <Route
                        path="/materias/:materia"
                        element={
                            <MateriaRoute
                                historico={
                                    historico
                                }
                                onAbrirConteudo={
                                    abrirConteudo
                                }
                            />
                        }
                    />


                    <Route
                        path="/conteudo/:id"
                        element={
                            <ConteudoRoute
                                historico={
                                    historico
                                }
                            />
                        }
                    />


                    <Route
                        path="/progresso"
                        element={
                            <Progresso
                                historico={
                                    historico
                                }
                            />
                        }
                    />

                </Routes>

            </main>

            <BottomNav/>

        </div>
    );
}

export default App;