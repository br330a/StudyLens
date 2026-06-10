const botao = document.getElementById("btnCapturar");
const resultado = document.getElementById("resultadoTexto");
const lista = document.getElementById("listaConteudos");
const historicoCompleto = document.getElementById("historicoCompleto");
const materias = [
    "Fotossíntese",
    "Revolução Industrial",
    "Equações do 2º grau",
    "Sistema Digestório",
    "Química Orgânica",
    "Leis de Newton",
    "Tabela Periódica",
    "Mitose e Meiose",
    "Globalização",
    "Função Afim",
    "Geopolítica Mundial",
    "Eletricidade",
    "Probabilidade"
];
const navItems = document.querySelectorAll(".nav-item");
const telas = document.querySelectorAll(".tela");
const totalEstudado = document.getElementById("totalEstudado");
const barra = document.querySelector(".progresso-preenchido");
const textoMeta = document.getElementById("textoMeta");

const botaoCentral = document.querySelector(".center");


const titulo = document.querySelector("header h1");

if (titulo) {
    titulo.innerText = "Olá, Bruno";
}

let totalConteudos = 0;


if(botao){
    botao.addEventListener("click", function() {
        resultado.innerText = "Analisando imagem...";

        setTimeout(function(){
            let materiaDetectada = materias[Math.floor(Math.random() * materias.length)];

            resultado.innerText = "Conteúdo identificado: " + materiaDetectada;

            const novoItem = document.createElement("p");
            novoItem.innerText = materiaDetectada;

            lista.prepend(novoItem);

            const itemHistorico = document.createElement("p");
            itemHistorico.innerText = materiaDetectada;

            historicoCompleto.prepend(itemHistorico);


            totalConteudos++;

            totalEstudado.innerText = totalConteudos + " conteúdos";

            textoMeta.innerText = totalConteudos + " de 7 conteúdos";

            let porcentagem = (totalConteudos / 7) * 100;

            if (porcentagem > 100) {
                porcentagem = 100;
            }

            barra.style.width = porcentagem + "%";


        }, 1500)
    });
}

if(botaoCentral && botao){
    botaoCentral.addEventListener("click", function() {
        botao.click();
    });
}


if(navItems.length > 0){
    navItems.forEach(item => {
        item.addEventListener("click", function() {

            if (this.classList.contains("center")) return;

            const tela = this.getAttribute("data-tela");

            telas.forEach(t => t.classList.remove("ativa"));
            document.getElementById(tela).classList.add("ativa");

            navItems.forEach(i => i.classList.remove("active"));
            this.classList.add("active");

        });
    });
}


const cardsMaterias = document.querySelectorAll(".materia-card");

cardsMaterias.forEach(card => {

    card.addEventListener("click", () => {

        const materia = card.dataset.materia;

        window.location.href =
            `src/pages/materia.html?nome=${materia}`;

    });

});

const dadosMaterias = {
    matematica: [
        "Equação do 2º grau",
        "Função Afim",
        "Função Logarítmica",
        "Limites",
        "Derivadas",
        "Trigonometria"
    ],

    biologia: [
        "Fotossíntese",
        "Respiração Celular",
        "Divisão Celular",
        "Genética",
        "Ecologia"
    ],

    fisica: [
        "Leis de Newton",
        "Eletricidade",
        "Cinemática",
        "Óptica",
        "Termologia"
    ],

    quimica: [
        "Tabela Periódica",
        "Ligações Químicas",
        "Química Orgânica",
        "Estequiometria"
    ],

    historia: [
        "Revolução Industrial",
        "Idade Média",
        "Brasil Colônia",
        "Guerra Fria"
    ],

    geografia: [
        "Globalização",
        "Geopolítica",
        "Cartografia",
        "Climatologia"
    ]
};

if (window.location.pathname.includes("materia.html")) {

    const params = new URLSearchParams(window.location.search);

    const materia = params.get("nome");

    const titulo = document.getElementById("tituloMateria");
    const subtitulo = document.getElementById("subtituloMateria");
    const lista = document.getElementById("listaConteudosMateria");

    titulo.innerText =
        materia.charAt(0).toUpperCase() + materia.slice(1);

    const conteudos = dadosMaterias[materia] || [];

    subtitulo.innerText =
        `${conteudos.length} conteúdos disponíveis`;

    conteudos.forEach(conteudo => {

        const card = document.createElement("article");

        card.className = "conteudo-card";

        card.innerHTML = `
            <h3>${conteudo}</h3>
            <p>Resumo • Flashcards • Questões</p>
        `;

        card.addEventListener("click", () => {

            window.location.href =
                `conteudo.html?materia=${materia}&conteudo=${encodeURIComponent(conteudo)}`;

        });

        lista.appendChild(card);

    });

}


const btnVoltar = document.getElementById("btnVoltar");

if (btnVoltar) {

    btnVoltar.addEventListener("click", () => {

        window.location.href = "../../home.html";

    });

}

if (window.location.pathname.includes("conteudo.html")) {

    const params = new URLSearchParams(window.location.search);

    const materia = params.get("materia");
    const conteudo = params.get("conteudo");

    document.getElementById("tituloConteudo").innerText = conteudo;
    document.getElementById("subtituloConteudo").innerText =
        materia.charAt(0).toUpperCase() + materia.slice(1);

    const btnVoltar = document.getElementById("btnVoltar");

    btnVoltar.addEventListener("click", () => {

        window.history.back();

    });

    const bancoConteudos = {

        "Derivadas": {

            resumo: `
                <h2>Resumo</h2>

                <p>
                    Derivadas representam a taxa de variação instantânea
                    de uma função.
                </p>
            `,

            flashcards: [
                {
                    pergunta: "O que é derivada?",
                    resposta: "Taxa de variação instantânea de uma função."
                },
                {
                    pergunta: "Onde é utilizada?",
                    resposta: "Otimização, Física e Economia."
                },
                {
                    pergunta: "Qual o significado geométrico?",
                    resposta: "Representa a inclinação da reta tangente."
                }
            ],

            questoes: [
                {
                    pergunta: "Explique o significado geométrico da derivada.",
                    resposta: "A derivada representa a inclinação da reta tangente."
                },
                {
                    pergunta: "Determine a derivada de f(x)=x².",
                    resposta: "f'(x)=2x"
                }
            ]
        },

        "Fotossíntese": {

            resumo: `
                <h2>Resumo</h2>

                <p>
                    Processo pelo qual plantas convertem energia solar
                    em energia química, produzindo glicose e oxigênio.
                </p>
            `,

            flashcards: [
                {
                    pergunta: "Qual é a função da fotossíntese?",
                    resposta: "Produzir alimento para a planta utilizando luz solar."
                },
                {
                    pergunta: "Onde ocorre?",
                    resposta: "Nos cloroplastos."
                },
                {
                    pergunta: "Principal pigmento?",
                    resposta: "Clorofila."
                }
            ],

            questoes: [
                {
                    pergunta: "Explique a importância da fotossíntese.",
                    resposta: "Ela produz glicose e libera oxigênio."
                },
                {
                    pergunta: "Qual pigmento absorve luz?",
                    resposta: "A clorofila."
                }
            ]
        },

        "Leis de Newton": {

            resumo: `
                <h2>Resumo</h2>

                <p>
                    As três leis de Newton descrevem a relação entre forças e movimento.
                </p>
            `,

            flashcards: [
                {
                    pergunta: "O que diz a 1ª Lei?",
                    resposta: "Princípio da Inércia."
                },
                {
                    pergunta: "O que representa F = m·a?",
                    resposta: "A Segunda Lei de Newton."
                },
                {
                    pergunta: "O que é ação e reação?",
                    resposta: "A Terceira Lei de Newton."
                }
            ],

            questoes: [
                {
                    pergunta: "Explique a diferença entre massa e peso.",
                    resposta: "Massa é quantidade de matéria; peso é força gravitacional."
                },
                {
                    pergunta: "Qual lei utiliza F = m·a?",
                    resposta: "A Segunda Lei de Newton."
                }
            ]
        }

    };

    const conteudoDinamico =
        document.getElementById("conteudoDinamico");

    const dados = bancoConteudos[conteudo] || {

        resumo: `
            <h2>Resumo</h2>

            <p>
                Resumo gerado automaticamente pela IA.
            </p>
        `,

        flashcards: [
            {
                pergunta: "Flashcard",
                resposta: "Conteúdo gerado automaticamente."
            }
        ],

        questoes: [
            {
                pergunta: "Questão sugerida pela IA.",
                resposta: "Resposta sugerida automaticamente."
            }
        ]
    };

    conteudoDinamico.innerHTML = dados.resumo;

    let indiceFlashcard = 0;

    function renderizarFlashcard() {

        const card = dados.flashcards[indiceFlashcard];

        conteudoDinamico.innerHTML = `
            <div class="flashcard-app">

                <div class="flashcard-caixa">

                    <h2>${card.pergunta}</h2>

                    <p class="resposta">
                        ${card.resposta}
                    </p>

                </div>

                <span class="contador">
                    ${indiceFlashcard + 1}/${dados.flashcards.length}
                </span>

                <div class="acoes-flashcard">

                    <button class="nao-sei">
                        Não sei
                    </button>

                    <button class="proximo">
                        ↻
                    </button>

                    <button class="sei">
                        Sei
                    </button>

                </div>

            </div>
        `;

        document.querySelector(".nao-sei").onclick = proximo;
        document.querySelector(".proximo").onclick = proximo;
        document.querySelector(".sei").onclick = proximo;
    }

    function proximo() {

        indiceFlashcard++;

        if (indiceFlashcard >= dados.flashcards.length) {
            indiceFlashcard = 0;
        }

        renderizarFlashcard();
    }

    function renderizarQuestoes() {

        conteudoDinamico.innerHTML = "";

        dados.questoes.forEach((questao, index) => {

            conteudoDinamico.innerHTML += `
                <div class="questao-card">

                    <h3>Questão ${index + 1}</h3>

                    <p>${questao.pergunta}</p>

                    <button class="btn-resposta">
                        Ver resposta
                    </button>

                    <div class="resposta-questao">

                        ${questao.resposta}

                    </div>

                </div>
            `;
        });

        document.querySelectorAll(".btn-resposta")
            .forEach(botao => {

                botao.onclick = () => {

                    const resposta = botao.nextElementSibling;

                    resposta.style.display =
                        resposta.style.display === "block"
                            ? "none"
                            : "block";
                };

            });
    }

    const abas = document.querySelectorAll(".aba");

    abas.forEach(aba => {

        aba.addEventListener("click", () => {

            abas.forEach(a => a.classList.remove("ativa"));

            aba.classList.add("ativa");

            if (aba.dataset.aba === "resumo") {

                conteudoDinamico.innerHTML = dados.resumo;

            }

            else if (aba.dataset.aba === "flashcards") {

                indiceFlashcard = 0;

                renderizarFlashcard();

            }

            else if (aba.dataset.aba === "questoes") {

                renderizarQuestoes();

            }

        });

    });

}