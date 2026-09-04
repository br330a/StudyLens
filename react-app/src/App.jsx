
import useStudyHistory from "./hooks/useStudyHistory";


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
        limparResultado,
    } = useImageAnalysis(adicionarConteudo);

    function abrirConteudo(conteudo) {

        navigate(
            `/app/biblioteca/conteudo/${conteudo.id}`
        );

    }

    function abrirMateria(materia) {

        navigate(
            `/app/biblioteca/materias/${encodeURIComponent(
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
            limparResultado={limparResultado}
        />
    );
}

export default App;