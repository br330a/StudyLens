const DB_NAME =
    "studylens-storage";

const DB_VERSION = 1;

const STORE_NAME =
    "studycast-audios";


function abrirBanco() {
    return new Promise(
        (resolve, reject) => {

            const requisicao =
                indexedDB.open(
                    DB_NAME,
                    DB_VERSION
                );

            requisicao.onupgradeneeded =
                () => {

                    const banco =
                        requisicao.result;

                    if (
                        !banco.objectStoreNames
                            .contains(
                                STORE_NAME
                            )
                    ) {
                        banco.createObjectStore(
                            STORE_NAME,
                            {
                                keyPath:
                                    "conteudoId"
                            }
                        );
                    }
                };


            requisicao.onsuccess =
                () => {
                    resolve(
                        requisicao.result
                    );
                };


            requisicao.onerror =
                () => {
                    reject(
                        requisicao.error
                    );
                };
        }
    );
}


export async function salvarStudyCast(
    conteudoId,
    audioBlob
) {
    const banco =
        await abrirBanco();

    try {
        await new Promise(
            (resolve, reject) => {

                const transacao =
                    banco.transaction(
                        STORE_NAME,
                        "readwrite"
                    );

                const store =
                    transacao.objectStore(
                        STORE_NAME
                    );

                store.put({
                    conteudoId:
                        String(
                            conteudoId
                        ),

                    audioBlob,

                    salvoEm:
                        new Date()
                            .toISOString()
                });


                transacao.oncomplete =
                    () => {
                        resolve();
                    };


                transacao.onerror =
                    () => {
                        reject(
                            transacao.error
                        );
                    };


                transacao.onabort =
                    () => {
                        reject(
                            transacao.error
                        );
                    };
            }
        );
    } finally {
        banco.close();
    }
}


export async function obterStudyCast(
    conteudoId
) {
    const banco =
        await abrirBanco();

    try {
        return await new Promise(
            (resolve, reject) => {

                const transacao =
                    banco.transaction(
                        STORE_NAME,
                        "readonly"
                    );

                const store =
                    transacao.objectStore(
                        STORE_NAME
                    );

                const requisicao =
                    store.get(
                        String(
                            conteudoId
                        )
                    );


                requisicao.onsuccess =
                    () => {

                        const registro =
                            requisicao.result;

                        resolve(
                            registro
                                ?.audioBlob ||
                            null
                        );
                    };


                requisicao.onerror =
                    () => {
                        reject(
                            requisicao.error
                        );
                    };
            }
        );
    } finally {
        banco.close();
    }
}