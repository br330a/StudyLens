import {
    useNavigate,
    useParams
} from "react-router-dom";

import Conteudo from "./Conteudo";

function ConteudoRoute({
    historico
}) {

    const navigate = useNavigate();

    const { id } = useParams();


    const conteudo =
        historico.find(
            (item) =>
                String(item.id) === String(id)
        );


    if (!conteudo) {

        return (
            <div className="tela ativa">

                <section>

                    <h2>
                        Conteúdo não encontrado
                    </h2>

                    <p>
                        Este conteúdo pode ter sido removido
                        do histórico.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/app/biblioteca/historico")
                        }
                    >
                        Voltar ao histórico
                    </button>

                </section>

            </div>
        );
    }


    return (
        <Conteudo
            key={conteudo.id}
            conteudo={conteudo}
            onVoltar={() =>
                navigate(-1)
            }
        />
    );
}

export default ConteudoRoute;