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
            `materia.html?nome=${materia}`;

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

        window.location.href = "home.html";

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

    const dados = {

        resumo: `
            <h2>Resumo</h2>

            <p>
                Este é um resumo simplificado sobre ${conteudo}.
                Aqui apareceria a explicação gerada pela IA.
            </p>
        `,

        flashcards: `
            <div class="flashcard">
                <h3>Pergunta</h3>

                <p>O que é ${conteudo}?</p>

                <hr>

                <p><strong>Resposta:</strong> Conceito principal do tema.</p>
            </div>
        `,

        questoes: `
            <div class="questao">

                <h3>Questão 1</h3>

                <p>
                    Explique com suas palavras o conceito de ${conteudo}.
                </p>

            </div>

            <div class="questao">

                <h3>Questão 2</h3>

                <p>
                    Cite uma aplicação prática deste conteúdo.
                </p>

            </div>
        `
    };

    const conteudoDinamico =
        document.getElementById("conteudoDinamico");

    conteudoDinamico.innerHTML = dados.resumo;

    const abas = document.querySelectorAll(".aba");

    abas.forEach(aba => {

        aba.addEventListener("click", () => {

            abas.forEach(a => a.classList.remove("ativa"));

            aba.classList.add("ativa");

            conteudoDinamico.innerHTML =
                dados[aba.dataset.aba];

        });

    });

}