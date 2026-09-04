import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import Landing from "../pages/Landing";
import Home from "../pages/Home";
import Historico from "../pages/Historico";
import Materias from "../pages/Materias";
import MateriaRoute from "../pages/MateriaRoute";
import ConteudoRoute from "../pages/ConteudoRoute";
import Progresso from "../pages/Progresso";

import StudyLayout from "../layouts/StudyLayout";

import CameraPage from "../pages/CameraPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes({
    historico,
    resultadoAtual,
    analisando,
    erroAnalise,
    limparResultado,
    receberImagem,
    abrirConteudo,
    abrirMateria,
}) {
    return (
        <Routes>

            <Route
                path="/"
                element={<Landing />}
            />

            <Route
                path="/app"
                element={
                    <ProtectedRoute>
                        <CameraPage
                            onImagemConfirmada={
                                receberImagem
                            }
                            analisando={
                                analisando
                            }
                            erroAnalise={
                                erroAnalise
                            }
                            resultadoAtual={
                                resultadoAtual
                            }
                            onLimparResultado={
                                limparResultado
                            }
                            onAbrirConteudo={
                                abrirConteudo
                            }
                        />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/app/camera"
                element={
                    <Navigate
                        to="/app"
                        replace
                    />
                }
            />

            <Route
                path="/app/biblioteca"
                element={
                    <ProtectedRoute>
                        <StudyLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    index
                    element={
                        <Home
                            historico={historico}
                            onAbrirConteudo={
                                abrirConteudo
                            }
                        />
                    }
                />

                <Route
                    path="historico"
                    element={
                        <Historico
                            historico={historico}
                            onAbrirConteudo={
                                abrirConteudo
                            }
                        />
                    }
                />

                <Route
                    path="materias"
                    element={
                        <Materias
                            historico={historico}
                            onAbrirMateria={
                                abrirMateria
                            }
                        />
                    }
                />

                <Route
                    path="materias/:materia"
                    element={
                        <MateriaRoute
                            historico={historico}
                            onAbrirConteudo={
                                abrirConteudo
                            }
                        />
                    }
                />

                <Route
                    path="conteudo/:id"
                    element={
                        <ConteudoRoute
                            historico={historico}
                        />
                    }
                />

                <Route
                    path="progresso"
                    element={
                        <Progresso
                            historico={historico}
                        />
                    }
                />

            </Route>

        </Routes>
    );
}

export default AppRoutes;