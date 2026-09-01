
import useStudyHistory from "./hooks/useStudyHistory";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Historico from "./pages/Historico";

import "./styles/app.css";

import Materias from "./pages/Materias";
import Progresso from "./pages/Progresso";

import useImageAnalysis from "./hooks/useImageAnalysis";

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
    
    const {
        resultadoAtual,
        analisando,
        erroAnalise,
        analisar: receberImagem,
    } = useImageAnalysis(adicionarConteudo);

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