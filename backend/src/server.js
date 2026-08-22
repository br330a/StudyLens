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

const PORT = process.env.PORT || 3000;

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

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
    res.json({
        status: "online",
        message: "StudyLens Backend"
    });
});

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
                                mimeType:
                                    req.file.mimetype,

                                data:
                                    imagemBase64
                            }
                        },
                        {
                            text: `
    Analise esta imagem como parte do aplicativo educacional StudyLens.

    A imagem deve representar algum conteúdo de estudo, como:
    - lousa;
    - caderno;
    - apostila;
    - livro;
    - exercício;
    - slide;
    - projetor.

    Identifique:

    1. A matéria escolar principal.
    2. O conteúdo ou assunto específico mostrado.

    Responda SOMENTE em JSON válido neste formato:

    {
        "materia": "nome da matéria",
        "conteudo": "assunto identificado"
    }

    Não use markdown.
    Não coloque explicações antes ou depois do JSON.
                            `
                        }
                    ]
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
                conteudo: resultado.conteudo
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

app.listen(PORT, () => {
    console.log(`Servidor StudyLens rodando na porta ${PORT}`);
});