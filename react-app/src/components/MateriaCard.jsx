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

            <h3>
                {emoji} {nome}
            </h3>

            <p>
                {conteudos}{" "}
                {conteudos === 1
                    ? "conteúdo"
                    : "conteúdos"}
            </p>

            <span>
                Toque para visualizar
            </span>

        </article>
    );
}

export default MateriaCard;