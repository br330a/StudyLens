import { useState } from "react";

import useStudyHistory from "./hooks/useStudyHistory";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Historico from "./pages/Historico";

import "./styles/app.css";

import Materias from "./pages/Materias";
import Progresso from "./pages/Progresso";

import { analisarImagem } from "./services/api";

import {
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";

import MateriaRoute from "./pages/MateriaRoute";
import ConteudoRoute from "./pages/ConteudoRoute";

import Landing from "./pages/Landing";

function App() {

    const navigate = useNavigate();

    const {
        historico,
        adicionarConteudo,
    } = useStudyHistory();
    
    const [resultadoAtual, setResultadoAtual] = useState(null);
    const [analisando, setAnalisando] = useState(false);
    const [erroAnalise, setErroAnalise] = useState("");

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

            adicionarConteudo(novoConteudo);

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
            `/app/conteudo/${conteudo.id}`
        );

    }

    function abrirMateria(materia) {

        navigate(
            `/app/materias/${encodeURIComponent(
                materia
            )}`
        );

    }

    return (
        <Routes>

            <Route
                path="/"
                element={<Landing />}
            />

            <Route
                path="/app/*"
                element={
                    <div className="app">

                        <Header />

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

                        <BottomNav />

                    </div>
                }
            />

        </Routes>
    );
}

export default App;