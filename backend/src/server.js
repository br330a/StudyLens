const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
    res.json({
        status: "online",
        message: "StudyLens Backend"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor StudyLens rodando na porta ${PORT}`);
});