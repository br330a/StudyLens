import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

function criarWavBuffer(
    pcmBuffer,
    sampleRate = 24000,
    channels = 1,
    bitDepth = 16
) {
    const bytesPorAmostra =
        bitDepth / 8;

    const blockAlign =
        channels * bytesPorAmostra;

    const byteRate =
        sampleRate * blockAlign;

    const header =
        Buffer.alloc(44);

    header.write(
        "RIFF",
        0
    );

    header.writeUInt32LE(
        36 + pcmBuffer.length,
        4
    );

    header.write(
        "WAVE",
        8
    );

    header.write(
        "fmt ",
        12
    );

    header.writeUInt32LE(
        16,
        16
    );

    header.writeUInt16LE(
        1,
        20
    );

    header.writeUInt16LE(
        channels,
        22
    );

    header.writeUInt32LE(
        sampleRate,
        24
    );

    header.writeUInt32LE(
        byteRate,
        28
    );

    header.writeUInt16LE(
        blockAlign,
        32
    );

    header.writeUInt16LE(
        bitDepth,
        34
    );

    header.write(
        "data",
        36
    );

    header.writeUInt32LE(
        pcmBuffer.length,
        40
    );

    return Buffer.concat([
        header,
        pcmBuffer
    ]);
}

const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 8 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {

        if (!file.mimetype.startsWith("image/")) {
            return cb(
                new Error("O arquivo enviado precisa ser uma imagem.")
            );
        }

        cb(null, true);
    }
});

const origensPermitidas = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(
    cors({
        origin(origin, callback) {

            if (
                !origin ||
                origensPermitidas.includes(origin)
            ) {
                return callback(null, true);
            }

            return callback(
                new Error(
                    "Origem não permitida pelo CORS."
                )
            );
        }
    })
);
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
    res.json({
        status: "online",
        message: "StudyLens Backend"
    });
});

app.get(
    "/api/health",
    (req, res) => {

        res.json({
            status: "ok",
            servico: "StudyLens API"
        });

    }
);

app.post(
    "/api/analisar",
    upload.array(
        "imagens",
        4
    ),
    async (req, res) => {

        try {

            if (
                !req.files ||
                req.files.length === 0
            ) {

                return res.status(400).json({
                    erro: "Nenhuma imagem foi enviada."
                });
            }


            const imagensGemini =
                req.files.map(
                    (arquivo) => ({
                        inlineData: {
                            mimeType:
                                arquivo.mimetype,
                            data:
                                arquivo.buffer
                                    .toString(
                                        "base64"
                                    )
                        }
                    })
                );
            const resposta =
                await ai.models.generateContent({

                    model: "gemini-3.6-flash",

                    contents: [
                        ...imagensGemini,
                        {
                            text: `

            Estas imagens fazem parte da mesma sessão de estudo.

            Analise todas em conjunto e respeite a ordem em que foram enviadas.

            As imagens podem representar:
            - páginas consecutivas de um caderno;
            - partes diferentes de uma mesma lousa;
            - páginas de uma apostila ou livro;
            - diferentes partes de um mesmo exercício;
            - continuação do mesmo conteúdo.

            Não gere um material separado para cada imagem.

            Produza um único material de estudo coerente, reunindo as informações relevantes de todas as imagens.
            
            Analise a imagem enviada como material de estudo.

            Identifique a matéria e o assunto principal.

            Identifique também o contexto visual principal da captura.

            Use no campo "contexto" somente uma destas categorias:

            - Lousa
            - Caderno
            - Slide
            - Apostila
            - Livro
            - Exercício
            - Documento
            - Outro

            Escolha apenas uma categoria.
            Não invente uma categoria diferente.

            Depois gere material educacional sobre o conteúdo identificado.

            Regras:

            - O resumo deve ser claro, didático e adequado para um estudante.
            - O campo "resumo" deve ser escrito em Markdown.
            - Organize o resumo usando títulos, subtítulos, listas e palavras em negrito quando fizer sentido.
            - Não use blocos de código Markdown, a menos que o conteúdo realmente envolva programação.
            - Evite um único parágrafo longo.
            - O resumo deve explicar o conceito, destacar pontos importantes e incluir exemplos quando apropriado.
            - O resumo deve ser escrito em Markdown bem estruturado.
            - Use no máximo títulos de nível 2 e 3, usando ## e ###.
            - Nunca use títulos com #.
            - Todo título deve ocupar uma linha própria.
            - Sempre coloque uma linha em branco depois de um título.
            - Não transforme parágrafos completos em títulos.
            - Títulos devem ter no máximo 8 palavras.
            - O texto explicativo deve ficar em parágrafos normais.
            - Use listas para pontos importantes quando fizer sentido.

            - Gere exatamente 3 flashcards.
            - Gere exatamente 3 questões.

            - Para expressões matemáticas, use LaTeX compatível com Markdown.
            - Use $...$ para fórmulas inline.
            - Use $$...$$ para fórmulas em bloco.

            - Para o campo "materia", use apenas o nome geral da disciplina.
            - Exemplos válidos: Matemática, Física, Química, Biologia, História, Geografia, Português, Inglês.
            - Não coloque subtópicos, áreas ou explicações dentro do campo "materia".
            - O subtópico deve ficar no campo "conteudo".

            - Para qualquer expressão matemática presente no resumo, flashcards ou questões, use LaTeX compatível com Markdown.
            - Use $...$ para fórmulas matemáticas inline.
            - Use $$...$$ para fórmulas matemáticas em bloco.
            - Não escreva fórmulas matemáticas fora dessa sintaxe.

            - Gere também o campo "roteiroAudio".

            - "roteiroAudio" deve ser um roteiro curto de explicação oral sobre o conteúdo identificado.
            - O roteiro deve parecer uma explicação natural de professor ou podcast educacional, e não uma leitura mecânica do resumo.
            - Deve ser adequado para um estudante ouvir durante deslocamentos, como ônibus ou metrô.
            - Comece apresentando brevemente o assunto.
            - Explique os pontos essenciais em uma sequência lógica.
            - Quando apropriado, inclua um exemplo simples.
            - Termine retomando a ideia principal.
            - Não use Markdown no roteiroAudio.
            - Não use títulos, listas, símbolos de formatação ou marcações como ##, ** ou -.
            - Não escreva instruções de locução como "pausa", "música" ou "efeito sonoro".
            - O roteiro deve ter aproximadamente 250 a 450 palavras.
                            `
                        }
                    ],

                    config: {

                        responseMimeType: "application/json",

                        responseSchema: {

                            type: "object",

                            properties: {

                                materia: {
                                    type: "string"
                                },

                                conteudo: {
                                    type: "string"
                                },

                                contexto: {
                                    type: "string"
                                },

                                roteiroAudio: {
                                    type: "string"
                                },

                                resumo: {
                                    type: "string"
                                },

                                flashcards: {

                                    type: "array",

                                    items: {

                                        type: "object",

                                        properties: {

                                            pergunta: {
                                                type: "string"
                                            },

                                            resposta: {
                                                type: "string"
                                            }

                                        },

                                        required: [
                                            "pergunta",
                                            "resposta"
                                        ]
                                    }
                                },

                                questoes: {

                                    type: "array",

                                    items: {

                                        type: "object",

                                        properties: {

                                            pergunta: {
                                                type: "string"
                                            },

                                            resposta: {
                                                type: "string"
                                            }

                                        },

                                        required: [
                                            "pergunta",
                                            "resposta"
                                        ]
                                    }
                                }

                            },

                            required: [
                                "materia",
                                "conteudo",
                                "contexto",
                                "roteiroAudio",
                                "resumo",
                                "flashcards",
                                "questoes"
                            ]
                        }
                    }
                });

            const texto =
                resposta.text.trim();

            let resultado;

            try {

                resultado = JSON.parse(texto);

            } catch {

                return res.status(502).json({
                    erro:
                        "A IA retornou uma resposta em formato inesperado."
                });
            }

            return res.json({
                sucesso: true,

                materia: resultado.materia,
                conteudo: resultado.conteudo,
                contexto: resultado.contexto,
                roteiroAudio: resultado.roteiroAudio,
                resumo: resultado.resumo,
                flashcards: resultado.flashcards,
                questoes: resultado.questoes
            });

        } catch (erro) {

            console.error(
                "Erro Gemini completo:",
                erro
            );

            const mensagem =
                erro?.message || "";

            const status =
                Number(
                    erro?.status ||
                    erro?.statusCode
                );

            const quotaExcedida =
                status === 429 ||
                /quota|rate limit|resource_exhausted/i
                    .test(mensagem);

            if (quotaExcedida) {
                return res.status(429).json({
                    codigo:
                        "IA_QUOTA_EXCEDIDA",

                    erro:
                        "O limite de análises com IA foi atingido. Tente novamente mais tarde."
                });
            }

            const servicoIndisponivel =
                status === 503 ||
                status === 502 ||
                /unavailable|overloaded/i
                    .test(mensagem);

            if (servicoIndisponivel) {
                return res.status(503).json({
                    codigo:
                        "IA_INDISPONIVEL",

                    erro:
                        "A IA está temporariamente indisponível. Tente novamente em alguns instantes."
                });
            }

            return res.status(502).json({
                codigo:
                    "ERRO_ANALISE_IA",

                erro:
                    "Não foi possível analisar a imagem neste momento."
            });
        }
    }
);

app.post(
    "/api/studycast",
    async (req, res) => {

        const roteiroAudio =
            req.body?.roteiroAudio;

        if (
            typeof roteiroAudio !== "string" ||
            !roteiroAudio.trim()
        ) {
            return res.status(400).json({
                codigo:
                    "ROTEIRO_INVALIDO",

                erro:
                    "Nenhum roteiro válido foi enviado."
            });
        }

        const roteiro =
            roteiroAudio.trim();

        if (roteiro.length > 12000) {
            return res.status(413).json({
                codigo:
                    "ROTEIRO_MUITO_GRANDE",

                erro:
                    "O roteiro é muito grande para gerar o StudyCast."
            });
        }

        try {

            const interaction =
                await ai.interactions.create({

                    model:
                        "gemini-3.1-flash-tts-preview",

                    input: `
Narre o texto abaixo em português do Brasil.

A voz deve soar natural, clara, didática e acolhedora, como uma explicação de estudo feita para um jovem estudante.

Use ritmo moderado e boa entonação.

Não acrescente introduções, comentários ou informações que não estejam no roteiro.

Leia apenas o conteúdo do roteiro.

Roteiro:

${roteiro}
                    `.trim(),

                    response_format: {
                        type: "audio"
                    },

                    generation_config: {
                        speech_config: [
                            {
                                voice:
                                    "Sadaltager"
                            }
                        ]
                    }
                });

            const audioBase64 =
                interaction
                    ?.output_audio
                    ?.data;

            if (!audioBase64) {
                return res.status(502).json({
                    codigo:
                        "AUDIO_NAO_GERADO",

                    erro:
                        "A IA não conseguiu gerar o áudio do StudyCast."
                });
            }

            const pcmBuffer =
                Buffer.from(
                    audioBase64,
                    "base64"
                );

            const wavBuffer =
                criarWavBuffer(
                    pcmBuffer
                );

            res.setHeader(
                "Content-Type",
                "audio/wav"
            );

            res.setHeader(
                "Content-Length",
                wavBuffer.length
            );

            res.setHeader(
                "Cache-Control",
                "no-store"
            );

            return res.send(
                wavBuffer
            );

        } catch (erro) {

            console.error(
                "Erro StudyCast:",
                erro
            );

            const mensagem =
                erro?.message || "";

            const status =
                Number(
                    erro?.status ||
                    erro?.statusCode
                );

            const quotaExcedida =
                status === 429 ||
                /quota|rate limit|resource_exhausted/i
                    .test(mensagem);

            if (quotaExcedida) {
                return res.status(429).json({
                    codigo:
                        "TTS_QUOTA_EXCEDIDA",

                    erro:
                        "O limite de geração de áudio foi atingido. Tente novamente mais tarde."
                });
            }

            const indisponivel =
                status === 502 ||
                status === 503 ||
                /unavailable|overloaded/i
                    .test(mensagem);

            if (indisponivel) {
                return res.status(503).json({
                    codigo:
                        "TTS_INDISPONIVEL",

                    erro:
                        "O StudyCast está temporariamente indisponível. Tente novamente em alguns instantes."
                });
            }

            return res.status(502).json({
                codigo:
                    "ERRO_STUDYCAST",

                erro:
                    "Não foi possível gerar o StudyCast neste momento."
            });
        }
    }
);

app.use(
    (erro, req, res, next) => {

        if (
            erro instanceof
                multer.MulterError &&
            erro.code ===
                "LIMIT_FILE_SIZE"
        ) {
            return res.status(413).json({
                codigo:
                    "IMAGEM_MUITO_GRANDE",

                erro:
                    "A imagem enviada é muito grande."
            });
        }

        if (
            erro?.message ===
            "O arquivo enviado precisa ser uma imagem."
        ) {
            return res.status(400).json({
                codigo:
                    "ARQUIVO_INVALIDO",

                erro:
                    erro.message
            });
        }

        console.error(
            "Erro não tratado:",
            erro
        );

        return res.status(500).json({
            erro:
                "Ocorreu um erro inesperado no servidor."
        });
    }
);

const PORT =
    process.env.PORT || 3000;

app.listen(
    PORT,
    "0.0.0.0",
    () => {
        console.log(
            `Servidor StudyLens rodando na porta ${PORT}`
        );
    }
);