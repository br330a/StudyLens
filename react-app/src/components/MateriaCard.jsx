function MateriaCard({
    nome,
    emoji,
    conteudos,
    progresso
}) {

    return (
        <article className="materia-card">

            <h3>
                {emoji} {nome}
            </h3>

            <p>
                {conteudos} conteúdos
            </p>

            <span>
                {progresso}% concluído
            </span>

        </article>
    );
}

export default MateriaCard;