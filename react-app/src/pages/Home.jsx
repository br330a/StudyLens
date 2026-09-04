import {
    useNavigate,
} from "react-router-dom";

function Home({
    historico,
    onAbrirConteudo,
}) {

    const navigate =
        useNavigate();
    const historicoSeguro =
        Array.isArray(historico)
            ? historico
            : [];

    const ultimoConteudo =
        historicoSeguro[0] || null;

    const ultimasCapturas =
        historicoSeguro.slice(0, 3);

    const materiasUnicas =
        new Set(
            historicoSeguro
                .map((item) =>
                    item.materia
                        ?.toLowerCase()
                        .trim()
                )
                .filter(Boolean)
        );

    return (
        <div className="tela ativa">

            <section
                className="
                    rounded-study-lg
                    bg-gradient-to-br
                    from-study-primary
                    to-study-primary-hover
                    p-5
                    text-white
                    shadow-study-md
                "
            >
                <span
                    className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-white/70
                    "
                >
                    Área StudyLens
                </span>

                <h2
                    className="
                        m-0
                        mt-2
                        text-2xl
                        font-bold
                    "
                >
                    Sua biblioteca de estudos
                </h2>

                <p
                    className="
                        m-0
                        mt-2
                        text-sm
                        leading-6
                        text-white/80
                    "
                >
                    Tudo o que você transforma com
                    o modo StudyLens da câmera JOVI
                    fica organizado aqui para estudar,
                    revisar e ouvir depois.
                </p>

                <button
                    type="button"
                    className="
                        mt-5
                        appearance-none
                        rounded-study-md
                        border-0
                        bg-white
                        px-5 py-3
                        font-semibold
                        text-study-primary
                        cursor-pointer
                        transition
                        hover:bg-study-primary-soft
                    "
                    onClick={() =>
                        navigate("/app")
                    }
                >
                    + Nova captura
                </button>
            </section>


            <section>
                <div
                    className="
                        mb-4
                        flex
                        items-end
                        justify-between
                    "
                >
                    <div>
                        <span
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.12em]
                                text-study-primary
                            "
                        >
                            Biblioteca
                        </span>

                        <h2
                            className="
                                m-0
                                mt-1
                                text-xl
                                font-bold
                                text-study-text
                            "
                        >
                            Visão geral
                        </h2>
                    </div>
                </div>

                <div
                    className="
                        grid
                        grid-cols-2
                        gap-3
                    "
                >
                    <article
                        className="
                            rounded-study-md
                            border
                            border-study-border
                            bg-study-surface
                            p-4
                        "
                    >
                        <strong
                            className="
                                block
                                text-2xl
                                text-study-primary
                            "
                        >
                            {historicoSeguro.length}
                        </strong>

                        <span
                            className="
                                text-sm
                                text-study-text-muted
                            "
                        >
                            {historicoSeguro.length === 1
                                ? "conteúdo salvo"
                                : "conteúdos salvos"}
                        </span>
                    </article>

                    <article
                        className="
                            rounded-study-md
                            border
                            border-study-border
                            bg-study-surface
                            p-4
                        "
                    >
                        <strong
                            className="
                                block
                                text-2xl
                                text-study-primary
                            "
                        >
                            {materiasUnicas.size}
                        </strong>

                        <span
                            className="
                                text-sm
                                text-study-text-muted
                            "
                        >
                            {materiasUnicas.size === 1
                                ? "matéria organizada"
                                : "matérias organizadas"}
                        </span>
                    </article>
                </div>
            </section>


            {ultimoConteudo && (
                <section>
                    <span
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.12em]
                            text-study-primary
                        "
                    >
                        Continue estudando
                    </span>

                    <button
                        type="button"
                        className="
                            mt-3
                            w-full
                            appearance-none
                            rounded-study-lg
                            border
                            border-study-border
                            bg-study-surface
                            p-5
                            text-left
                            cursor-pointer
                            shadow-study-sm
                            transition
                            hover:-translate-y-0.5
                            hover:shadow-study-md
                        "
                        onClick={() =>
                            onAbrirConteudo(
                                ultimoConteudo
                            )
                        }
                    >
                        <div
                            className="
                                mb-3
                                flex flex-wrap
                                gap-2
                            "
                        >
                            {ultimoConteudo.contexto && (
                                <span
                                    className="
                                        rounded-full
                                        bg-study-primary-soft
                                        px-3 py-1
                                        text-xs
                                        font-semibold
                                        text-study-primary
                                    "
                                >
                                    {ultimoConteudo.contexto}
                                </span>
                            )}

                            {ultimoConteudo.nivelPedagogico && (
                                <span
                                    className="
                                        rounded-full
                                        bg-study-surface-muted
                                        px-3 py-1
                                        text-xs
                                        font-semibold
                                        text-study-text-muted
                                    "
                                >
                                    {ultimoConteudo.nivelPedagogico}
                                </span>
                            )}
                        </div>

                        <span
                            className="
                                text-sm
                                font-semibold
                                text-study-primary
                            "
                        >
                            {ultimoConteudo.materia}
                        </span>

                        <h3
                            className="
                                m-0
                                mt-1
                                text-lg
                                font-bold
                                text-study-text
                            "
                        >
                            {ultimoConteudo.conteudo}
                        </h3>

                        <p
                            className="
                                m-0
                                mt-2
                                text-sm
                                text-study-text-muted
                            "
                        >
                            Resumo • Flashcards • Questões • StudyCast
                        </p>
                    </button>
                </section>
            )}


            <section>
                <div
                    className="
                        mb-4
                        flex
                        items-center
                        justify-between
                    "
                >
                    <h2
                        className="
                            m-0
                            text-xl
                            font-bold
                            text-study-text
                        "
                    >
                        Últimas capturas
                    </h2>

                    {historicoSeguro.length > 3 && (
                        <span
                            className="
                                text-xs
                                font-medium
                                text-study-text-muted
                            "
                        >
                            Mais no Histórico
                        </span>
                    )}
                </div>


                {ultimasCapturas.length === 0 ? (
                    <div
                        className="
                            rounded-study-md
                            border
                            border-dashed
                            border-study-border
                            bg-study-surface
                            p-5
                            text-center
                        "
                    >
                        <p
                            className="
                                m-0
                                text-sm
                                text-study-text-muted
                            "
                        >
                            Suas capturas aparecerão
                            aqui depois da primeira
                            análise com o StudyLens.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-3">
                        {ultimasCapturas.map(
                            (item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    className="
                                        w-full
                                        appearance-none
                                        rounded-study-md
                                        border
                                        border-study-border
                                        bg-study-surface
                                        p-4
                                        text-left
                                        cursor-pointer
                                        transition
                                        hover:bg-study-surface-muted
                                    "
                                    onClick={() =>
                                        onAbrirConteudo(
                                            item
                                        )
                                    }
                                >
                                    <span
                                        className="
                                            text-xs
                                            font-semibold
                                            text-study-primary
                                        "
                                    >
                                        {item.materia}
                                    </span>

                                    <h3
                                        className="
                                            m-0
                                            mt-1
                                            text-base
                                            font-semibold
                                            text-study-text
                                        "
                                    >
                                        {item.conteudo}
                                    </h3>

                                    <p
                                        className="
                                            m-0
                                            mt-1
                                            text-xs
                                            text-study-text-muted
                                        "
                                    >
                                        Abrir material de estudo →
                                    </p>
                                </button>
                            )
                        )}
                    </div>
                )}
            </section>

        </div>
    );
}

export default Home;