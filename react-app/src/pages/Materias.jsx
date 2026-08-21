import MateriaCard from "../components/MateriaCard";
import materias from "../data/materias";

function Materias() {

    return (
        <div className="tela ativa">

            <section className="materias-header">

                <h2>Matérias</h2>

                <p>
                    {materias.length} matérias organizadas
                </p>

            </section>

            <div className="materias-grid">

                {materias.map((materia) => (

                    <MateriaCard
                        key={materia.id}
                        nome={materia.nome}
                        emoji={materia.emoji}
                        conteudos={materia.conteudos}
                        progresso={materia.progresso}
                    />

                ))}

            </div>

        </div>
    );
}

export default Materias;