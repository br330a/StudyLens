import {
    useLocation,
    useNavigate
} from "react-router-dom";

function BottomNav() {

    const navigate = useNavigate();
    const location = useLocation();

    function estaAtivo(caminho) {

        if (caminho === "/") {
            return location.pathname === "/";
        }

        return location.pathname.startsWith(caminho);
    }


    return (
        <nav>
            <ul>

                <li
                    className={
                        estaAtivo("/")
                            ? "nav-item active"
                            : "nav-item"
                    }
                    onClick={() =>
                        navigate("/")
                    }
                >
                    Início
                </li>


                <li
                    className={
                        estaAtivo("/historico")
                            ? "nav-item active"
                            : "nav-item"
                    }
                    onClick={() =>
                        navigate("/historico")
                    }
                >
                    Histórico
                </li>


                <li
                    className="nav-item center"
                    onClick={() =>
                        navigate("/")
                    }
                >
                    +
                </li>


                <li
                    className={
                        estaAtivo("/materias")
                            ? "nav-item active"
                            : "nav-item"
                    }
                    onClick={() =>
                        navigate("/materias")
                    }
                >
                    Matérias
                </li>


                <li
                    className={
                        estaAtivo("/progresso")
                            ? "nav-item active"
                            : "nav-item"
                    }
                    onClick={() =>
                        navigate("/progresso")
                    }
                >
                    Progresso
                </li>

            </ul>
        </nav>
    );
}

export default BottomNav;