import {
    useNavigate,
} from "react-router-dom";

import {
    criarChaveConteudo,
    lerProgressoFlashcards,
} from "../hooks/useFlashcardProgress";

function Progresso({
    historico,
}) {

    const navigate =
        useNavigate();

    const historicoSeguro =
        Array.isArray(historico)
            ? historico
            : [];

    const referenciaSemanal = 7;


    // =========================
    // BIBLIOTECA
    // =========================

    const totalConteudos =
        historicoSeguro.length;


    const materiasAgrupadas =
        historicoSeguro.reduce(
            (acumulador, item) => {

                const nome =
                    item?.materia?.trim();

                if (!nome) {
                    return acumulador;
                }

                const chave =
                    nome.toLocaleLowerCase(
                        "pt-BR"
                    );

                if (!acumulador[chave]) {
                    acumulador[chave] = {
                        nome,
                        total: 0,
                    };
                }

                acumulador[chave].total++;

                return acumulador;

            },
            {}
        );


    const rankingMaterias =
        Object.values(
            materiasAgrupadas
        ).sort(
            (a, b) =>
                b.total - a.total
        );


    const totalMaterias =
        rankingMaterias.length;


    const materiaMaisEstudada =
        rankingMaterias[0]
            ?.nome || "Nenhuma ainda";


    const maiorQuantidadeMateria =
        rankingMaterias[0]
            ?.total || 1;


    // =========================
    // PROGRESSO DOS FLASHCARDS
    // =========================

    const progressoFlashcards =
        lerProgressoFlashcards();


    const resumoFlashcards =
        historicoSeguro.reduce(
            (resumo, item) => {

                const flashcards =
                    Array.isArray(
                        item?.flashcards
                    )
                        ? item.flashcards
                        : [];


                resumo.totalDisponiveis +=
                    flashcards.length;


                const chaveConteudo =
                    criarChaveConteudo(
                        item
                    );


                const cardsSalvos =
                    chaveConteudo
                        ? progressoFlashcards[
                            chaveConteudo
                        ]?.cards || {}
                        : {};


                flashcards.forEach(
                    (_, indice) => {

                        const status =
                            cardsSalvos[
                                indice
                            ];


                        if (
                            status ===
                            "dominado"
                        ) {

                            resumo.dominados++;

                            resumo.avaliados++;

                        }


                        if (
                            status ===
                            "revisar"
                        ) {

                            resumo.paraRevisar++;

                            resumo.avaliados++;

                        }

                    }
                );


                return resumo;

            },
            {
                totalDisponiveis: 0,
                avaliados: 0,
                dominados: 0,
                paraRevisar: 0,
            }
        );


    const {
        totalDisponiveis:
            totalFlashcards,
        avaliados:
            flashcardsAvaliados,
        dominados:
            flashcardsDominados,
        paraRevisar:
            flashcardsParaRevisar,
    } = resumoFlashcards;


    const percentualDominio =
        flashcardsAvaliados > 0
            ? Math.round(
                (
                    flashcardsDominados /
                    flashcardsAvaliados
                ) * 100
            )
            : 0;

    // =========================
    // PENDÊNCIAS DE REVISÃO
    // =========================

    const conteudosPendentes =
        historicoSeguro
            .map((item) => {

                const flashcards =
                    Array.isArray(
                        item?.flashcards
                    )
                        ? item.flashcards
                        : [];


                const chaveConteudo =
                    criarChaveConteudo(
                        item
                    );


                const cardsSalvos =
                    chaveConteudo
                        ? progressoFlashcards[
                            chaveConteudo
                        ]?.cards || {}
                        : {};


                const indicesPendentes =
                    flashcards
                        .map(
                            (_, indice) =>
                                indice
                        )
                        .filter(
                            (indice) =>
                                cardsSalvos[
                                    indice
                                ] === "revisar"
                        );


                return {
                    id:
                        item?.id,

                    materia:
                        item?.materia ||
                        "Sem matéria",

                    conteudo:
                        item?.conteudo ||
                        "Conteúdo sem título",

                    quantidade:
                        indicesPendentes.length,

                    primeiroIndice:
                        indicesPendentes[0],
                };

            })
            .filter(
                (item) =>
                    item.quantidade > 0
            );


    function abrirRevisao(
        item
    ) {

        if (
            item.id === undefined ||
            item.id === null
        ) {
            return;
        }


        const id =
            encodeURIComponent(
                String(
                    item.id
                )
            );


        navigate(
            `/app/biblioteca/conteudo/${id}?aba=flashcards&card=${item.primeiroIndice}`
        );
    }

    // =========================
    // DATAS
    // =========================

    function chaveData(
        data
    ) {

        const ano =
            data.getFullYear();

        const mes =
            String(
                data.getMonth() + 1
            ).padStart(
                2,
                "0"
            );

        const dia =
            String(
                data.getDate()
            ).padStart(
                2,
                "0"
            );

        return `${ano}-${mes}-${dia}`;
    }


    // =========================
    // ÚLTIMOS 7 DIAS
    // =========================

    const agora =
        new Date();


    const inicioPeriodo =
        new Date();

    inicioPeriodo.setDate(
        agora.getDate() - 6
    );

    inicioPeriodo.setHours(
        0,
        0,
        0,
        0
    );


    const conteudosRecentes =
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
                    data >= inicioPeriodo &&
                    data <= agora
                );

            }
        );


    const totalSemana =
        conteudosRecentes.length;


    const percentualSemana =
        Math.min(
            Math.round(
                (
                    totalSemana /
                    referenciaSemanal
                ) * 100
            ),
            100
        );


    // =========================
    // SEQUÊNCIA
    // =========================

    const diasEstudados =
        new Set(
            historicoSeguro
                .filter(
                    (item) =>
                        item.dataEstudo
                )
                .map(
                    (item) =>
                        new Date(
                            item.dataEstudo
                        )
                )
                .filter(
                    (data) =>
                        !Number.isNaN(
                            data.getTime()
                        )
                )
                .map(
                    (data) =>
                        chaveData(data)
                )
        );


    let sequencia = 0;


    const dataVerificada =
        new Date();

    dataVerificada.setHours(
        0,
        0,
        0,
        0
    );


    // Se ainda não estudou hoje,
    // mantém a sequência de ontem.
    if (
        !diasEstudados.has(
            chaveData(
                dataVerificada
            )
        )
    ) {

        dataVerificada.setDate(
            dataVerificada.getDate() - 1
        );

    }


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
        "Sua evolução começa com a primeira captura no modo StudyLens.";


    if (
        totalConteudos > 0
    ) {

        insight =
            `Sua biblioteca já possui ${totalConteudos} ${
                totalConteudos === 1
                    ? "conteúdo"
                    : "conteúdos"
            } em ${totalMaterias} ${
                totalMaterias === 1
                    ? "matéria"
                    : "matérias"
            }. ${materiaMaisEstudada} é a área com mais materiais no momento.`;

    }


    if (
        percentualSemana >= 100
    ) {

        insight =
            `Você alcançou a referência de ${referenciaSemanal} conteúdos nos últimos 7 dias. Continue revisando os materiais já salvos e explore novas matérias.`;

    }

    if (
        flashcardsAvaliados > 0
    ) {

        if (
            flashcardsParaRevisar > 0
        ) {

            insight =
                `Você já avaliou ${flashcardsAvaliados} ${
                    flashcardsAvaliados === 1
                        ? "flashcard"
                        : "flashcards"
                }. ${flashcardsDominados} ${
                    flashcardsDominados === 1
                        ? "está dominado"
                        : "estão dominados"
                } e ${flashcardsParaRevisar} ${
                    flashcardsParaRevisar === 1
                        ? "foi marcado para revisão"
                        : "foram marcados para revisão"
                }.`;

        } else {

            insight =
                `Você já avaliou ${flashcardsAvaliados} ${
                    flashcardsAvaliados === 1
                        ? "flashcard"
                        : "flashcards"
                } e todos estão marcados como dominados até o momento.`;

        }

    }


    return (
        <div className="tela ativa progresso-page">

            <div className="progresso-hero">

                <span className="progresso-hero-label">
                    Área StudyLens
                </span>

                <h2>
                    Seu progresso
                </h2>

                <p>
                    Acompanhe como sua biblioteca
                    de estudos evolui ao longo do tempo.
                </p>

                <div className="progresso-streak">
                    <span aria-hidden="true">
                        🔥
                    </span>

                    <strong>
                        {sequencia}
                    </strong>

                    <span>
                        {sequencia === 1
                            ? "dia em sequência"
                            : "dias em sequência"}
                    </span>
                </div>

            </div>


            <div className="progresso-bloco">

                <div className="progresso-titulo">

                    <div>

                        <span className="progresso-label">
                            Biblioteca
                        </span>

                        <h2>
                            Sua evolução
                        </h2>

                    </div>

                </div>


                <div className="progresso-overview-grid">

                    <article className="progresso-overview-card">

                        <span className="progresso-overview-icon">
                            📚
                        </span>

                        <div>

                            <strong>
                                {totalConteudos}
                            </strong>

                            <span>
                                {totalConteudos === 1
                                    ? "conteúdo salvo"
                                    : "conteúdos salvos"}
                            </span>

                        </div>

                    </article>


                    <article className="progresso-overview-card">

                        <span className="progresso-overview-icon">
                            🗂️
                        </span>

                        <div>

                            <strong>
                                {totalMaterias}
                            </strong>

                            <span>
                                {totalMaterias === 1
                                    ? "matéria explorada"
                                    : "matérias exploradas"}
                            </span>

                        </div>

                    </article>

                </div>

            </div>


            <div className="progresso-bloco progresso-atividade">

                <div className="progresso-atividade-topo">

                    <div>

                        <span className="progresso-label">
                            Últimos 7 dias
                        </span>

                        <h2>
                            Atividade recente
                        </h2>

                    </div>


                    <strong className="progresso-atividade-percentual">
                        {percentualSemana}%
                    </strong>

                </div>


                <div className="progresso-atividade-info">

                    <strong>
                        {totalSemana}
                    </strong>

                    <span>
                        de {referenciaSemanal} conteúdos
                        como referência semanal
                    </span>

                </div>


                <div className="progresso-barra">

                    <div
                        className="progresso-barra-preenchida"
                        style={{
                            width:
                                `${percentualSemana}%`,
                        }}
                    />

                </div>

            </div>


            <div className="progresso-bloco">

                <div className="progresso-titulo">

                    <div>

                        <span className="progresso-label">
                            Aprendizado
                        </span>

                        <h2>
                            Domínio dos flashcards
                        </h2>

                    </div>

                </div>



                <div className="progresso-dominio">

                    {totalFlashcards === 0 ? (

                        <div className="progresso-vazio">

                            <p>
                                Seus dados de domínio
                                aparecerão aqui quando
                                houver flashcards disponíveis.
                            </p>

                        </div>

                    ) : flashcardsAvaliados === 0 ? (

                        <div className="progresso-dominio-inicial">

                            <div className="progresso-dominio-icon">
                                ◎
                            </div>

                            <div>

                                <strong>
                                    Comece sua primeira revisão
                                </strong>

                                <p>
                                    Você possui {totalFlashcards}{" "}
                                    {totalFlashcards === 1
                                        ? "flashcard disponível"
                                        : "flashcards disponíveis"}.
                                    Classifique-os como
                                    “Já sei” ou “Revisar depois”
                                    para acompanhar seu domínio.
                                </p>

                            </div>

                        </div>

                    ) : (

                        <>
                            <div className="progresso-dominio-topo">

                                <div>

                                    <strong className="progresso-dominio-percentual">
                                        {percentualDominio}%
                                    </strong>

                                    <span>
                                        domínio entre os cards avaliados
                                    </span>

                                </div>


                                <span className="progresso-dominio-contagem">
                                    {flashcardsAvaliados} de{" "}
                                    {totalFlashcards} avaliados
                                </span>

                            </div>


                            <div className="progresso-barra progresso-dominio-barra">

                                <div
                                    className="progresso-barra-preenchida"
                                    style={{
                                        width:
                                            `${percentualDominio}%`,
                                    }}
                                />

                            </div>


                            <div className="progresso-dominio-status">

                                <div className="progresso-status dominado">

                                    <span className="progresso-status-icon">
                                        ✓
                                    </span>

                                    <div>

                                        <strong>
                                            {flashcardsDominados}
                                        </strong>

                                        <span>
                                            {flashcardsDominados === 1
                                                ? "dominado"
                                                : "dominados"}
                                        </span>

                                    </div>

                                </div>


                                <div className="progresso-status revisar">

                                    <span className="progresso-status-icon">
                                        ↻
                                    </span>

                                    <div>

                                        <strong>
                                            {flashcardsParaRevisar}
                                        </strong>

                                        <span>
                                            para revisar
                                        </span>

                                    </div>

                                </div>

                            </div>
                        </>

                    )}

                </div>

            </div>


            {conteudosPendentes.length > 0 && (

                <div className="progresso-bloco">

                    <div className="progresso-titulo">

                        <div>

                            <span className="progresso-label">
                                Revisão
                            </span>

                            <h2>
                                Pendentes para revisar
                            </h2>

                        </div>

                    </div>


                    <div className="progresso-pendentes">

                        {conteudosPendentes.map(
                            (item) => (

                                <button
                                    key={`${item.id}-${item.conteudo}`}
                                    type="button"
                                    className="progresso-pendente-card"
                                    onClick={() =>
                                        abrirRevisao(
                                            item
                                        )
                                    }
                                    disabled={
                                        item.id === undefined ||
                                        item.id === null
                                    }
                                >

                                    <div className="progresso-pendente-conteudo">

                                        <span className="progresso-pendente-materia">
                                            {item.materia}
                                        </span>

                                        <strong>
                                            {item.conteudo}
                                        </strong>

                                        <span className="progresso-pendente-total">
                                            {item.quantidade}{" "}
                                            {item.quantidade === 1
                                                ? "card para revisar"
                                                : "cards para revisar"}
                                        </span>

                                    </div>


                                    <span className="progresso-pendente-acao">

                                        Revisar

                                        <span aria-hidden="true">
                                            →
                                        </span>

                                    </span>

                                </button>

                            )
                        )}

                    </div>

                </div>

            )}


            <div className="progresso-bloco">

                <div className="progresso-titulo">

                    <div>

                        <span className="progresso-label">
                            Organização
                        </span>

                        <h2>
                            Matérias mais estudadas
                        </h2>

                    </div>

                </div>


                {rankingMaterias.length === 0 ? (

                    <div className="progresso-vazio">

                        <p>
                            Suas matérias aparecerão
                            aqui depois da primeira
                            análise com o StudyLens.
                        </p>

                    </div>

                ) : (

                    <div className="progresso-ranking">

                        {rankingMaterias
                            .slice(0, 4)
                            .map(
                                (materia) => {

                                    const largura =
                                        Math.round(
                                            (
                                                materia.total /
                                                maiorQuantidadeMateria
                                            ) * 100
                                        );

                                    return (
                                        <div
                                            key={
                                                materia.nome
                                            }
                                            className="progresso-ranking-item"
                                        >

                                            <div className="progresso-ranking-topo">

                                                <span>
                                                    {materia.nome}
                                                </span>

                                                <strong>
                                                    {materia.total}{" "}
                                                    {materia.total === 1
                                                        ? "conteúdo"
                                                        : "conteúdos"}
                                                </strong>

                                            </div>


                                            <div className="progresso-ranking-barra">

                                                <div
                                                    className="progresso-ranking-preenchido"
                                                    style={{
                                                        width:
                                                            `${largura}%`,
                                                    }}
                                                />

                                            </div>

                                        </div>
                                    );

                                }
                            )}

                    </div>

                )}

            </div>


            <div className="progresso-insight">

                <div className="progresso-insight-icon">
                    ✦
                </div>

                <div>

                    <span>
                        Insight StudyLens
                    </span>

                    <p>
                        {insight}
                    </p>

                </div>

            </div>

        </div>
    );
}


export default Progresso;