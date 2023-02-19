const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
// estudar uso de arrow function
// arrow permite criar funcao como se fosse uma variavel
let oldValue //salvar o titulo antigo, oq estava digitado na variavel antes
//adicionar rolagem nas atividades


// Adicionar alterações na mudanca de atividades e guardar informação
// sobre estar feita ou não ---- "hide": on / "hide": off


function geradorId() {
    var idAleatorio = Math.floor(Date.now() * Math.random()).toString(36)
    return idAleatorio
}

const saveTodo = (text)=> {

    const todo = document.createElement("div") 
    todo.classList.add("todo")
    todo.id = geradorId()
// testar se da pra inicializar varias vezes variavel por funcao com const
    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo)
    // aplicaçao do localstorage

    var ListaStorage = []
    if (localStorage.hasOwnProperty("atividades")) {
        ListaStorage = JSON.parse(localStorage.getItem("atividades"))
    }   
    ListaStorage.push({"nomeAtividade":text, "done": false, "id":todo.id})

    localStorage.setItem("atividades", JSON.stringify(ListaStorage))

    todoInput.value = ""
    todoInput.focus() //para focar de novo na caixa de texto após adicionar tarefa
}

todoForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    const inputValue = todoInput.value

    if (inputValue) { //validando se inputValue é nulo ou 
        saveTodo(inputValue)                //para salvar esse texto de titulo
    }
})

const toggleForms = ()=>{
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

document.addEventListener("click", (e)=>{ //essa funcao vai identificar o click em cada lugar
    const targetEl = e.target
    const parentEl = targetEl.closest("div") //seleciona a div mais proxima, ou seja, a div pai
    var todoTitle // pegar titulo e modificar elemento com base nele
    //console.log(targetEl) estaria printando 
    // linha abaixo -- verificando se exite parentElement e se ele possui h3
    if (parentEl && parentEl.querySelector("h3")) { 
        todoTitle = parentEl.querySelector("h3").innerText
    }

    if (targetEl.classList.contains("finish-todo")) { //se o elemento possuir essa classe
        parentEl.classList.toggle("done")
        var listaAtividades = JSON.parse(localStorage.getItem("atividades"))
        for (let i of listaAtividades){
            if (parentEl.id == i["id"]) {
                if (i["done"] == false){
                    i["done"] = true
                    localStorage.setItem("atividades", JSON.stringify(listaAtividades))
                } else {
                    i["done"] = false
                    localStorage.setItem("atividades", JSON.stringify(listaAtividades))
                }
            }
        }
    }

    if (targetEl.classList.contains("remove-todo")) {
        
        ListaStorage = JSON.parse(localStorage.getItem("atividades"))

        for (let i=0; i<ListaStorage.length; i++) {
            if (ListaStorage[i]["id"] == parentEl.id){
                ListaStorage.splice(i, 1) //para remover o elemento 3
                localStorage.setItem("atividades", JSON.stringify(ListaStorage))
            }
        }

        parentEl.remove() //remove o elemento
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms() //funcao para mudar o formulario

        editInput.value = todoTitle 
        oldInputValue = todoTitle
    }
})

cancelEditBtn.addEventListener("click", (e)=> {
    e.preventDefault()

    toggleForms()
})

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo") //pra garantir que pegou os ultimos todos

    for (let i of todos){

        let todoTitle = i.querySelector("h3")

        if(todoTitle.innerText == oldInputValue){
            todoTitle.innerText = text
            var listaAtividades = JSON.parse(localStorage.getItem("atividades"))
            for (let j of listaAtividades){
                if (i.id == j["id"]){
                    j["nomeAtividade"] = text
                    localStorage.setItem("atividades",JSON.stringify(listaAtividades))
                }
            }
        }
    }

}

editForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    const editInputValue = editInput.value //novo valor do input para editar

    if(editInputValue) { //se estiver preenchido
        updateTodo(editInputValue)
    }

    toggleForms()
})




