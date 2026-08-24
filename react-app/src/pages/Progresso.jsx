function Progresso({ historico }) {

    const historicoSeguro =
        Array.isArray(historico)
            ? historico
            : [];

    const metaSemanal = 7;


    // =========================
    // TOTAL ESTUDADO
    // =========================

    const totalConteudos =
        historicoSeguro.length;


    // =========================
    // MATÉRIA FAVORITA
    // =========================

    const contagemMaterias =
        historicoSeguro.reduce(
            (acumulador, item) => {

                const materia =
                    item?.materia?.trim();

                if (!materia) {
                    return acumulador;
                }

                if (!acumulador[materia]) {
                    acumulador[materia] = 0;
                }

                acumulador[materia]++;

                return acumulador;

            },
            {}
        );


    const materiaFavorita =
        Object.entries(contagemMaterias)
            .sort((a, b) =>
                b[1] - a[1]
            )[0]?.[0] || "Nenhuma";


    // =========================
    // META DOS ÚLTIMOS 7 DIAS
    // =========================

    const hoje = new Date();

    const inicioSemana =
        new Date();

    inicioSemana.setDate(
        hoje.getDate() - 6
    );

    inicioSemana.setHours(
        0,
        0,
        0,
        0
    );


    const conteudosSemana =
        historicoSeguro.filter(
            (item) => {

                if (!item.dataEstudo) {
                    return false;
                }

                const data =
                    new Date(
                        item.dataEstudo
                    );

                return (
                    !Number.isNaN(
                        data.getTime()
                    ) &&
                    data >= inicioSemana
                );

            }
        );


    const totalSemana =
        conteudosSemana.length;


    const percentual =
        Math.min(
            Math.round(
                (
                    totalSemana /
                    metaSemanal
                ) * 100
            ),
            100
        );


    // =========================
    // SEQUÊNCIA DE DIAS
    // =========================

    function chaveData(data) {

        const ano =
            data.getFullYear();

        const mes =
            String(
                data.getMonth() + 1
            ).padStart(2, "0");

        const dia =
            String(
                data.getDate()
            ).padStart(2, "0");

        return `${ano}-${mes}-${dia}`;
    }


    const diasEstudados =
        new Set(
            historicoSeguro
                .filter(
                    (item) =>
                        item.dataEstudo
                )
                .map((item) => {

                    const data =
                        new Date(
                            item.dataEstudo
                        );

                    return chaveData(data);

                })
        );


    let sequencia = 0;

    const dataVerificada =
        new Date();

    while (
        diasEstudados.has(
            chaveData(
                dataVerificada
            )
        )
    ) {

        sequencia++;

        dataVerificada.setDate(
            dataVerificada.getDate() - 1
        );

    }


    // =========================
    // INSIGHT
    // =========================

    let insight =
        "Capture seu primeiro conteúdo para começar a acompanhar sua evolução.";

    if (totalConteudos > 0) {

        insight =
            `Você estudou ${totalConteudos} ${
                totalConteudos === 1
                    ? "conteúdo"
                    : "conteúdos"
            }. Sua matéria mais estudada é ${materiaFavorita}.`;

    }

    if (percentual >= 100) {

        insight =
            `Meta semanal concluída! Continue revisando ${materiaFavorita} e explore novos conteúdos.`;

    }


    return (
        <div className="tela ativa">

            <section className="progresso-banner">

                <h2>Seu desempenho</h2>

                <p>
                    Continue estudando para
                    atingir suas metas.
                </p>

                <div className="streak-badge">

                    🔥 {sequencia}{" "}
                    {sequencia === 1
                        ? "dia seguido"
                        : "dias seguidos"}

                </div>

            </section>


            <div className="meta-principal">

                <div>

                    <span>
                        Meta semanal
                    </span>

                    <h2>
                        {totalSemana} de{" "}
                        {metaSemanal} conteúdos
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
                        width:
                            `${percentual}%`
                    }}
                />

            </div>


            <div className="progresso-grid">

                <article className="progresso-card">

                    <span>📚</span>

                    <h3>
                        Total estudado
                    </h3>

                    <strong>
                        {totalConteudos}
                    </strong>

                </article>


                <article className="progresso-card">

                    <span>⭐</span>

                    <h3>
                        Matéria favorita
                    </h3>

                    <strong>
                        {materiaFavorita}
                    </strong>

                </article>


                <article className="progresso-card">

                    <span>🎯</span>

                    <h3>
                        Meta concluída
                    </h3>

                    <strong>
                        {percentual}%
                    </strong>

                </article>


                <article className="progresso-card">

                    <span>🔥</span>

                    <h3>
                        Sequência
                    </h3>

                    <strong>
                        {sequencia}{" "}
                        {sequencia === 1
                            ? "dia"
                            : "dias"}
                    </strong>

                </article>

            </div>


            <div className="insight-card">

                <h3>
                    💡 Insight
                </h3>

                <p>
                    {insight}
                </p>

            </div>

        </div>
    );
}

export default Progresso;