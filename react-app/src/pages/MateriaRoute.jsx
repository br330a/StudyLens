import {
    useNavigate,
    useParams
} from "react-router-dom";

import Materia from "./Materia";

function MateriaRoute({
    historico,
    onAbrirConteudo
}) {

    const navigate = useNavigate();

    const { materia } = useParams();

    const nomeMateria =
        decodeURIComponent(materia);


    return (
        <Materia
            materia={nomeMateria}
            historico={historico}
            onAbrirConteudo={
                onAbrirConteudo
            }
            onVoltar={() =>
                navigate("/app/materias")
            }
        />
    );
}

export default MateriaRoute;