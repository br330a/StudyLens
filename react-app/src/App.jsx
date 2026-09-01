
import useStudyHistory from "./hooks/useStudyHistory";

import "./styles/app.css";

import AppRoutes from "./routes/AppRoutes";

import useImageAnalysis from "./hooks/useImageAnalysis";

import { useNavigate } from "react-router-dom";


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
        <AppRoutes
            historico={historico}
            resultadoAtual={resultadoAtual}
            analisando={analisando}
            erroAnalise={erroAnalise}
            receberImagem={receberImagem}
            abrirConteudo={abrirConteudo}
            abrirMateria={abrirMateria}
        />
    );
}

export default App;