const botao = document.getElementById("btnCapturar");
const resultado = document.getElementById("resultadoTexto");
const lista = document.getElementById("listaConteudos");
const historicoCompleto = document.getElementById("historicoCompleto");
const materias = ["Fotossíntese", "Revolução Industrial", "Equações do 2º grau", "Sistema Digestório", "Química Orgânica", ];
const navItems = document.querySelectorAll(".nav-item");
const telas = document.querySelectorAll(".tela");
const form = document.getElementById("loginForm");
const nomeUsuario = localStorage.getItem("usuario");


if (window.location.pathname.includes("login.html")) {
    localStorage.removeItem("usuario");
}

const usuarioLogado = localStorage.getItem("usuario");

if (!usuarioLogado && window.location.pathname.includes("home.html")) {
    window.location.href = "../../login.html";
}

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


        }, 1500)
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
// LOGIN 



if(form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const usuario = document.getElementById("usuario").value;
        const senha = document.getElementById("senha").value;

        if (usuario === "" || senha === "") {
            alert("Preencha todos os campos!");
            return;
        }

        if (usuario === "admin" && senha === "123") {
            localStorage.setItem("usuario", usuario);
            window.location.href = "src/pages/home.html";
        } else {
            alert("Usuário ou senha inválidos!");
        }
    });
}

if(nomeUsuario) {
    const titulo = document.querySelector("header h1");
    titulo.innerText = "Olá, " + nomeUsuario;  
}
