import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    gerarStudyCast,
} from "../services/api";

import {
    obterStudyCast,
    salvarStudyCast,
} from "../services/audioStorage";


function useStudyCast(conteudo) {

    const [audioUrl, setAudioUrl] =
        useState("");

    const [gerando, setGerando] =
        useState(false);

    const [carregandoAudio, setCarregandoAudio] =
        useState(true);

    const [erro, setErro] =
        useState("");

    const requisicaoEmAndamento =
        useRef(false);


    useEffect(() => {

        let componenteAtivo = true;

        async function carregarAudioSalvo() {

            setCarregandoAudio(true);
            setErro("");

            if (!conteudo?.id) {

                if (componenteAtivo) {
                    setCarregandoAudio(false);
                }

                return;
            }

            try {

                const audioSalvo =
                    await obterStudyCast(
                        conteudo.id
                    );

                if (
                    !componenteAtivo ||
                    !audioSalvo
                ) {
                    return;
                }

                const url =
                    URL.createObjectURL(
                        audioSalvo
                    );

                setAudioUrl(
                    url
                );

            } catch (erroStorage) {

                console.warn(
                    "Não foi possível carregar o StudyCast salvo:",
                    erroStorage
                );

            } finally {

                if (componenteAtivo) {
                    setCarregandoAudio(
                        false
                    );
                }
            }
        }


        carregarAudioSalvo();


        return () => {
            componenteAtivo = false;
        };

    }, [conteudo?.id]);


    useEffect(() => {

        return () => {

            if (audioUrl) {

                URL.revokeObjectURL(
                    audioUrl
                );
            }
        };

    }, [audioUrl]);


    async function gerar() {

        if (
            !conteudo
                ?.roteiroAudio
                ?.trim()
        ) {
            setErro(
                "Este conteúdo ainda não possui um roteiro para o StudyCast."
            );

            return null;
        }


        if (
            requisicaoEmAndamento.current ||
            audioUrl
        ) {
            return audioUrl;
        }


        setErro("");

        requisicaoEmAndamento.current =
            true;

        setGerando(true);


        try {

            /*
             * Confere novamente o banco antes
             * de gastar uma chamada TTS.
             */
            let audio =
                await obterStudyCast(
                    conteudo.id
                );


            if (!audio) {

                audio =
                    await gerarStudyCast(
                        conteudo
                            .roteiroAudio
                    );


                /*
                 * Se o armazenamento falhar,
                 * ainda permitimos ouvir o áudio.
                 */
                try {

                    await salvarStudyCast(
                        conteudo.id,
                        audio
                    );

                } catch (erroStorage) {

                    console.warn(
                        "StudyCast gerado, mas não pôde ser salvo:",
                        erroStorage
                    );
                }
            }


            const url =
                URL.createObjectURL(
                    audio
                );


            setAudioUrl(
                url
            );


            return url;

        } catch (erroGeracao) {

            console.error(
                "Erro ao gerar StudyCast:",
                erroGeracao
            );


            setErro(
                erroGeracao.message ||
                    "Não foi possível gerar o StudyCast."
            );


            return null;

        } finally {

            requisicaoEmAndamento.current =
                false;

            setGerando(false);
        }
    }


    return {
        audioUrl,
        gerando,
        carregandoAudio,
        erro,
        gerar,
    };
}


export default useStudyCast;