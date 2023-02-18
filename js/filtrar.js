// change é o evento de mudança de elemento, exeplo select
const select = document.querySelector("#filter-select")
    
select.addEventListener("change", function(){
        const todo = document.querySelectorAll(".todo")
        let optionSelected = select.options[select.selectedIndex]

        let value = optionSelected.value

        if (value == "all"){
            for (let i of todo){
                i.classList.remove("hide")
            }
        } else if (value == "done"){
            for (let i of todo){
                if (!i.classList.contains("done")){
                    i.classList.add("hide")
                } else {
                    i.classList.remove("hide")
                }
            }
        } else if (value == "todo"){
            for (let i of todo){
                if (i.classList.contains("done")){
                    i.classList.add("hide")
                } else {
                    i.classList.remove("hide")
                }
            }
        }
})
        
    
    
    
    
    
    
    
    
    
    // switch (value) {
        //     case "all":
        //         console.log(value)
        //         for (let i of todo){
        //             i.classList.remove("hide")
        //         }
        //         break
        //     case "done": 
        //         for (let i of todo){
        //             console.log(i)
        //             if (!i.classList.contains("done")){
        //                 i.classList.add("hide")
        //             } else {
        //                 i.classList.add("hide")
        //             }
        //         break
        //         }   
        //     case "todo":
        //         console.log(value)
        //         for (let i of todo){
        //             if (i.classList.contains("done")){
        //                 i.classList.add("hide")
        //             } else {
        //                 i.classList.remove("hide")
        //             }
        //         }

        // }
        
    