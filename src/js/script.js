const botao = document.getElementById("btnCapturar");
const resultado = document.getElementById("resultadoTexto");
const lista = document.getElementById("listaConteudos");

const materias = ["Fotossíntese", "Revolução Industrial", "Equações do 2º grau", "Sistema Digestório"];


botao.addEventListener("click", function() {
    resultado.innerText = "Analisando imagem...";

    setTimeout(function(){
        let materiaDetectada = materias[Math.floor(Math.random() * materias.length)];

        resultado.innerText = "Conteúdo identificado: " + materiaDetectada;

        const novoItem = document.createElement("p");
        novoItem.innerText = materiaDetectada;

        lista.prepend(novoItem);

    }, 1500)
});