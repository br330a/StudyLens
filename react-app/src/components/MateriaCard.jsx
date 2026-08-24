function MateriaCard({
    nome,
    emoji,
    conteudos,
    onClick
}) {

    return (
        <article
            className="materia-card"
            onClick={onClick}
        >

            <div className="materia-card-topo">

                <span className="materia-emoji">
                    {emoji}
                </span>

                <span className="materia-seta">
                    ›
                </span>

            </div>

            <h3>
                {nome}
            </h3>

            <p>
                {conteudos}{" "}
                {conteudos === 1
                    ? "conteúdo"
                    : "conteúdos"}
            </p>

            <span className="materia-acao">
                Ver conteúdos
            </span>

        </article>
    );
}

export default MateriaCard;