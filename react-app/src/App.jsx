import { useState } from "react";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";

import "./styles/app.css";

import Materias from "./pages/Materias";

function App() {

    const [telaAtiva, setTelaAtiva] = useState("inicio");

    function renderizarTela() {

        if (telaAtiva === "inicio") {
            return <Home />;
        }

        if (telaAtiva === "materias") {
            return <Materias />;
        }

        return (
            <div className="tela ativa">
                <section>
                    <h2>{telaAtiva}</h2>

                    <p>
                        Esta tela será migrada em seguida.
                    </p>
                </section>
            </div>
        );
    }

    return (
        <div className="app">

            <Header nome="Bruno" />

            <main>
                {renderizarTela()}
            </main>

            <BottomNav
                telaAtiva={telaAtiva}
                onNavigate={setTelaAtiva}
            />

        </div>
    );
}

export default App;