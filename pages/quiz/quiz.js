import { verificarTema, trocarTema} from "../../helpers/tema-helper.js"

const botaoTema = document.querySelector(".tema button")
const body = document.querySelector("body")
const assunto = localStorage.getItem("assunto")

let quiz = {}
let pontos = 0
let pergunta = 1

botaoTema.addEventListener("click", () => {
    trocarTema(body, botaoTema)
})

verificarTema(body, botaoTema)

function alterarAssunto() {
    const diviIcone = document.querySelector(".assunto_icone")
    const iconeImg = document.querySelector(".assunto_icone img")
    const assuntoTitulo = document.querySelector(".assunto h1")

    divIcone.classList.add(assunto.toLowerCase())
    iconeImg.setAttribute("src", `../../assets/images/icon-${assunto.toLowerCase()}.svg`)
    iconeImg.setAttribute("alt",`icone de ${assunto}`)
    assuntoTitulo.innerText = assunto
}

async function buscarPerguntas() {
    const urlDados = "../../data.json"

    await fetch(urlDados).then(resposta => resposta.json()).then(dados => {
        dados.quizzes.forEach(dado => {
            if (dado.tilte === assunto) {
                quiz = dado
            }
        })
            
    })

}

function montarPergunta() {
    const main = document.querySelector("main")

    main.innerHTML = `
    <section class="pergunta">
    <div>
        <p>Questão ${pergunta} de 10</p>

        <h2>${alterarSinais(quiz.questions[pergunta-1].question)}</h2>
    </div>
    <div class="barra_progresso">
        <div style="width: ${pergunta * 10}"></div>
    </div>
    </section>

        <section class="altenativas">
         <form action="">
                <label for="altenativa_a">
                    <input type="radio" id="altenativa_a" name="altenativa">

                    <div>
                        <span>A</span>
                        ${alterarSinais(quiz.questions[pergunta-1].options[0])}
                    </div>
                </label>

                <label for="altenativa_b">
                    <input type="radio" id="altenativa_b" name="altenativa">

                    <div>
                        <span>B</span>
                        ${alterarSinais(quiz.questions[pergunta-1].options[1])}
                    </div>
                </label>

                <label for="altenativa_c">
                    <input type="radio" id="altenativa_c" name="altenativa">

                    <div>
                        <span>C</span>
                        ${alterarSinais(quiz.questions[pergunta-1].options[2])}
                    </div>
                </label>

                <label for="altenativa_d">
                    <input type="radio" id="altenativa_d" name="alternativa">

                    <div>
                        <span>D</span>
                        ${alterarSinais(quiz.questions[pergunta-1].options[3])}
                    </div>
                </label>
            </form>

            <button>Enviar</button>
        </section>
    `
}

function alterarSinais(texto) {
    return texto.replace(/</g,"&lt;").replace(/>/g,"&gt;")
}

async function iniciar() {
    alterarAssunto()
    await buscarPerguntas()
    montarPergunta()
}

iniciar()