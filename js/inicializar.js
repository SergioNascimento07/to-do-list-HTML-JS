var TodosSalvos = JSON.parse(localStorage.getItem("atividades"))
var TodoList = document.querySelector("#todo-list")
console.log(TodosSalvos)

    
if (TodosSalvos.length>0){ 
    for (let x of TodosSalvos) {
        var nomeAtividade = x["nomeAtividade"]
        var idAtividade = x["id"]

        var todo = document.createElement("div")
        todo.classList.add("todo")
        todo.id = idAtividade

        const todoTitle = document.createElement("h3")
        todoTitle.innerText = nomeAtividade
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

        console.log(todo)
    
        TodoList.appendChild(todo)
    }
}