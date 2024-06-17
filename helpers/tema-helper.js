let tema = "claro"

export function trocarTema(tema, body, botaoTema) {
    if (localStorage.getItem("tema")){
        tema = localStorage.getItem("tema")
    }
    const body = document.querySelector("body")

    if (tema === "claro") {
        body.classList.add("escuro")
        localStorage.setItem("tema", "escuro")
        botaoTema.style.justfyContent = "flex-end"
    } else {
        body.classList.remove("escuro")
        localStorage.setItem("tema", "claro")
        botaoTema.style.justfyContent = "flex-start"
    }
}


export function verificarTema(tema, body, botaoTema){
    if (localStorage.getItem("tema")){
        tema = localStorage.getItem("tema")
    }

    if (tema === "escuro") {
        body.classList.add("escuro")
        botaoTema.style.justfyContent = "flex-end"
    }
}