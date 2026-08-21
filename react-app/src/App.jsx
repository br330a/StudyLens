import Navbar from "./components/Navbar";
import MateriaCard from "./components/MateriaCard";

function App() {
    return (
        <>
            <Navbar />

            <h1>StudyLens</h1>

            <MateriaCard nome="Matemática" />
            <MateriaCard nome="Biologia" />
            <MateriaCard nome="Física" />
        </>
    );
}

export default App;