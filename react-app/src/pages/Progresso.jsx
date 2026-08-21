function Progresso({ historico }) {

    const metaSemanal = 7;

    const totalConteudos = historico.length;

    const percentual =
        Math.min(
            Math.round(
                (totalConteudos / metaSemanal) * 100
            ),
            100
        );

    return (
        <div className="tela ativa">

            <section className="progresso-banner">

                <h2>Seu desempenho</h2>

                <p>
                    Continue estudando para atingir suas metas.
                </p>

                <div className="streak-badge">
                    🔥 5 dias seguidos
                </div>

            </section>

            <div className="meta-principal">

                <div>

                    <span>
                        Meta semanal
                    </span>

                    <h2>
                        {totalConteudos} de {metaSemanal} conteúdos
                    </h2>

                </div>

                <span className="meta-percentual">
                    {percentual}%
                </span>

            </div>

            <div className="barra-progresso grande">

                <div
                    className="progresso-preenchido"
                    style={{
                        width: `${percentual}%`
                    }}
                />

            </div>

            <div className="progresso-grid">

                <article className="progresso-card">

                    <span>📚</span>

                    <h3>Total estudado</h3>

                    <strong>
                        {totalConteudos} conteúdos
                    </strong>

                </article>

                <article className="progresso-card">

                    <span>⭐</span>

                    <h3>Matéria favorita</h3>

                    <strong>
                        Matemática
                    </strong>

                </article>

                <article className="progresso-card">

                    <span>🎯</span>

                    <h3>Meta concluída</h3>

                    <strong>
                        {percentual}%
                    </strong>

                </article>

                <article className="progresso-card">

                    <span>🔥</span>

                    <h3>Sequência</h3>

                    <strong>
                        5 dias
                    </strong>

                </article>

            </div>

            <div className="insight-card">

                <h3>
                    💡 Insight da IA
                </h3>

                <p>
                    Continue estudando Matemática.
                    Você está evoluindo acima da média.
                </p>

            </div>

        </div>
    );
}

export default Progresso;