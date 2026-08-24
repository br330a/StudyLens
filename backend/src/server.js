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
    upload.single("imagem"),
    async (req, res) => {

        try {

            if (!req.file) {

                return res.status(400).json({
                    erro: "Nenhuma imagem foi enviada."
                });
            }

            const imagemBase64 =
                req.file.buffer.toString("base64");

            const resposta =
                await ai.models.generateContent({

                    model: "gemini-3.6-flash",

                    contents: [
                        {
                            inlineData: {
                                mimeType: req.file.mimetype,
                                data: imagemBase64
                            }
                        },
                        {
                            text: `
            Analise a imagem enviada como material de estudo.

            Identifique a matéria e o assunto principal.

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
                                "resumo",
                                "flashcards",
                                "questoes"
                            ]
                        }
                    }
                });

            const texto =
                resposta.text.trim();

            console.log(
                "Resposta Gemini:",
                texto
            );

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
                resumo: resultado.resumo,
                flashcards: resultado.flashcards,
                questoes: resultado.questoes

            });

        } catch (erro) {

            console.error(
                "Erro Gemini completo:",
                erro
            );

            console.error(
                "Mensagem:",
                erro?.message
            );

            console.error(
                "Status:",
                erro?.status
            );

            return res.status(500).json({
                erro:
                    erro?.message ||
                    "Não foi possível analisar a imagem."
            });
        }
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