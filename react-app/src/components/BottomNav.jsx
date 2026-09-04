import {
    useLocation,
    useNavigate,
} from "react-router-dom";

function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    function estaAtivo(caminho) {
        if (caminho === "/app/biblioteca") {
            return (
                location.pathname ===
                "/app/biblioteca"
            );
        }

        return location.pathname.startsWith(
            caminho
        );
    }

    function classeItem(caminho) {
        const classeBase = `
            w-full
            appearance-none
            border-0
            bg-transparent
            px-1.5 py-2
            font-study
            text-sm
            cursor-pointer
            rounded-study-sm
            transition-colors
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-study-primary
        `;

        const classeEstado = estaAtivo(caminho)
            ? `
                bg-study-primary-soft
                font-semibold
                text-study-primary
            `
            : `
                text-study-text-muted
                hover:bg-study-surface-muted
            `;

        return `${classeBase} ${classeEstado}`;
    }

    return (
        <nav
            aria-label="Navegação do StudyLens"
            className="
                sticky bottom-0 z-20
                shrink-0
                rounded-t-[20px]
                bg-study-surface
                p-[15px]
                shadow-[0_-4px_15px_rgba(0,0,0,0.15)]
            "
        >
            <ul
                className="
                    m-0
                    flex
                    w-full
                    list-none
                    items-center
                    justify-between
                    gap-1
                    p-0
                "
            >
                <li className="flex-1">
                    <button
                        type="button"
                        className={classeItem("/app/biblioteca")}
                        onClick={() =>
                            navigate("/app/biblioteca")
                        }
                    >
                        Início
                    </button>
                </li>

                <li className="flex-1">
                    <button
                        type="button"
                        className={classeItem(
                            "/app/biblioteca/historico"
                        )}
                        onClick={() =>
                            navigate("/app/biblioteca/historico")
                        }
                    >
                        Histórico
                    </button>
                </li>

                <li className="flex-none">
                    <button
                        type="button"
                        aria-label="Nova captura com a câmera JOVI"
                        className="
                            -mt-5
                            flex size-10
                            appearance-none
                            items-center
                            justify-center
                            rounded-full
                            border-0
                            bg-study-primary
                            text-xl
                            text-white
                            cursor-pointer
                            shadow-study-sm
                            transition-colors
                            hover:bg-study-primary-hover
                            focus-visible:outline-2
                            focus-visible:outline-offset-2
                            focus-visible:outline-study-primary
                        "
                        onClick={() =>
                            navigate("/app")
                        }
                    >
                        +
                    </button>
                </li>

                <li className="flex-1">
                    <button
                        type="button"
                        className={classeItem(
                            "/app/biblioteca/materias"
                        )}
                        onClick={() =>
                            navigate("/app/biblioteca/materias")
                        }
                    >
                        Matérias
                    </button>
                </li>

                <li className="flex-1">
                    <button
                        type="button"
                        className={classeItem(
                            "/app/biblioteca/progresso"
                        )}
                        onClick={() =>
                            navigate("/app/biblioteca/progresso")
                        }
                    >
                        Progresso
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default BottomNav;