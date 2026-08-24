import MateriaCard from "../components/MateriaCard";

function Materias({historico, onAbrirMateria}) {

    const historicoSeguro =
        Array.isArray(historico)
            ? historico
            : [];

    const materiasAgrupadas = historicoSeguro.reduce(
        (acumulador, item) => {

            const nomeMateria =
                item.materia?.trim() || "Outros";

            const chaveMateria =
                nomeMateria.toLowerCase();

            if (!acumulador[chaveMateria]) {

                acumulador[chaveMateria] = {
                    id: chaveMateria,
                    nome: nomeMateria,
                    conteudos: 0
                };

            }

            acumulador[chaveMateria].conteudos++;

            return acumulador;

        },
        {}
    );

    const materias =
        Object.values(materiasAgrupadas);

    function obterEmojiMateria(nome) {

        const nomeNormalizado =
            nome.toLowerCase();

        if (nomeNormalizado.includes("matem")) {
            return "📘";
        }

        if (nomeNormalizado.includes("biolog")) {
            return "📗";
        }

        if (nomeNormalizado.includes("fís") ||
            nomeNormalizado.includes("fis")) {
            return "⚛️";
        }

        if (nomeNormalizado.includes("quím") ||
            nomeNormalizado.includes("quim")) {
            return "🧪";
        }

        if (nomeNormalizado.includes("hist")) {
            return "📙";
        }

        if (nomeNormalizado.includes("geograf")) {
            return "🌎";
        }

        return "📚";
    }

    return (
        <div className="tela ativa">

            <section className="materias-header">

                <span className="materias-label">
                    Organização
                </span>

                <h2>Suas matérias</h2>

                <p>
                    {materias.length}{" "}
                    {materias.length === 1
                        ? "matéria organizada"
                        : "matérias organizadas"}
                </p>

            </section>


            {materias.length === 0 ? (

                <section>

                    <p>
                        Nenhuma matéria foi adicionada ainda.
                    </p>

                    <p>
                        Capture um conteúdo para começar.
                    </p>

                </section>

            ) : (

                <div className="materias-grid">

                    {materias.map((materia) => (

                        <MateriaCard
                            key={materia.id}
                            nome={materia.nome}
                            emoji={
                                obterEmojiMateria(
                                    materia.nome
                                )
                            }
                            conteudos={
                                materia.conteudos
                            }
                            onClick={() =>
                                onAbrirMateria(
                                    materia.nome
                                )
                            }
                        />

                    ))}

                </div>

            )}

        </div>
    );
}

export default Materias;