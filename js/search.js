const searchInput = document.querySelector("#search-input")
const btnErase = document.querySelector("#erase-button")
var titulo 
var pesquisa
var expressao

btnErase.addEventListener("click", (e)=>{
    e.preventDefault()
    searchInput.value = ""
    const toDoList = document.querySelectorAll(".todo")
    for (let j of toDoList){
        j.classList.remove("hide")
    }
})

searchInput.addEventListener("input", function(){
    const toDoList = document.querySelectorAll(".todo")
    //usar o "this" para se referir ao searchInput aqui dentro
    pesquisa = searchInput.value
    expressao = new RegExp(pesquisa, "i")
    if (pesquisa.length > 0) {
        for (let i of toDoList) {
            titulo = i.querySelector("h3").innerText
            if (!titulo.match(expressao)){
                i.classList.add("hide")
            } else {
                i.classList.remove("hide")
            }
        }
    } else {
        for (let j of toDoList){
            j.classList.remove("hide")
        }
    }
})