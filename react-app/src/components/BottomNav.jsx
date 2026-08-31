import {
    useLocation,
    useNavigate
} from "react-router-dom";

function BottomNav() {

    const navigate = useNavigate();
    const location = useLocation();

    function estaAtivo(caminho) {
        if (caminho === "/app") {
            return location.pathname === "/app";
        }

        return location.pathname.startsWith(caminho);
    }


    return (
        <nav>
            <ul>

                <li
                    className={
                        estaAtivo("/app")
                            ? "nav-item active"
                            : "nav-item"
                    }
                    onClick={() =>
                        navigate("/app")
                    }
                >
                    Início
                </li>


                <li
                    className={
                        estaAtivo("/app/historico")
                            ? "nav-item active"
                            : "nav-item"
                    }
                    onClick={() =>
                        navigate("/app/historico")
                    }
                >
                    Histórico
                </li>


                <li
                    className="nav-item center"
                    onClick={() =>
                        navigate("/app")
                    }
                >
                    +
                </li>


                <li
                    className={
                        estaAtivo("/app/materias")
                            ? "nav-item active"
                            : "nav-item"
                    }
                    onClick={() =>
                        navigate("/app/materias")
                    }
                >
                    Matérias
                </li>


                <li
                    className={
                        estaAtivo("/app/progresso")
                            ? "nav-item active"
                            : "nav-item"
                    }
                    onClick={() =>
                        navigate("/app/progresso")
                    }
                >
                    Progresso
                </li>

            </ul>
        </nav>
    );
}

export default BottomNav;