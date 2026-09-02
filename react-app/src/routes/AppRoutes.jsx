import {
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

function AppRoutes({
    historico,
    resultadoAtual,
    analisando,
    erroAnalise,
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
                path="/app/camera"
                element={
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
                        onAbrirConteudo={
                            abrirConteudo
                        }
                    />
                }
            />

            <Route
                path="/app"
                element={<StudyLayout />}
            >

                <Route
                    index
                    element={
                        <Home/>
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