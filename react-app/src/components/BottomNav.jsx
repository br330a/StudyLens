function BottomNav({ telaAtiva, onNavigate }) {

    return (
        <nav>
            <ul>

                <li
                    className={telaAtiva === "inicio" ? "nav-item active" : "nav-item"}
                    onClick={() => onNavigate("inicio")}
                >
                    Início
                </li>

                <li
                    className={telaAtiva === "historico" ? "nav-item active" : "nav-item"}
                    onClick={() => onNavigate("historico")}
                >
                    Histórico
                </li>

                <li
                    className="nav-item center"
                    onClick={() => onNavigate("inicio")}
                >
                    +
                </li>

                <li
                    className={telaAtiva === "materias" ? "nav-item active" : "nav-item"}
                    onClick={() => onNavigate("materias")}
                >
                    Matérias
                </li>

                <li
                    className={telaAtiva === "progresso" ? "nav-item active" : "nav-item"}
                    onClick={() => onNavigate("progresso")}
                >
                    Progresso
                </li>

            </ul>
        </nav>
    );
}

export default BottomNav;