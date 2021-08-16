let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click",e => {
    //preventDefault是避免原本的動作執行
    e.preventDefault();

    //get the input values 
    let form = e.target.parentElement;
    let todoText = form.children[0].value;
    let todoMonth = form.children[1].value;
    let todoDate = form.children[2].value;

    if(todoText === ""){
        alert("請填入文字");
        return; //在這裡指沒有要回傳任何東西，表示結束。
    }
    
    //creat an todo item
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = todoText;

    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = todoMonth + " / " + todoDate;

    todo.appendChild(text);
    todo.appendChild(time);

    //create green check and red trash can
    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        //toggle：只要點擊 button 就能讓它出現或消失
        todoItem.classList.toggle("done");
    })

    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';

    trashButton.addEventListener("click",e => {
        let todoItem = e.target.parentElement;

        //如果直接執行todoItem.remove() ,0.3s效果就不會實現。
        //因此需設置回呼函數(callback function)，讓動畫結束時執行remove。
        todoItem.addEventListener("animationend", () =>{

        //remove from local storage
        let text = todoItem.children[0].innerText;
        let myListArray = JSON.parse(localStorage.getItem("list"));
        myListArray.forEach((item, index) => {
            if(item.todoText == text){
                myListArray.splice(index, 1);
                localStorage.setItem("list", JSON.stringify(myListArray));
            }
        })
            todoItem.remove();
        })

        todoItem.style.animation = "scaleDown 0.3s forwards";
    })

    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    todo.style.animation = "scaleUp 0.3s forwards";




    //Tips:
    //JSON.stringify() ：物件變 JSON
    //JSON.parse()：JSON 變物件
    //


    //create an object
    let myTodo = {
        todoText:todoText,
        todoMonth:todoMonth,
        todoDate:todoDate
    }

    //store data into an array of object(將資料儲存於local)
    //將資料儲存於陣列中，且都是物件
    let myList = localStorage.getItem("list");
    if (myList === null){
        //JSON.stringify 將 JavaScript 值轉換為 JSON 字符串
        localStorage.setItem("list", JSON.stringify([myTodo]));
    }else{
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArray));
    }

    console.log(JSON.parse(localStorage.getItem("list")));

    form.children[0].value = ""; //CLEAR THE TEXT INPUT

    section.appendChild(todo);
})




let myList = localStorage.getItem("list");
if(myList !== null){
    let myListArray = JSON.parse(myList);
    myListArray.forEach(item => {

        //create a todo
        let todo = document.createElement("div");
        todo.classList.add("todo");
        let text = document.createElement("p");
        text.classList.add("todo-text");
        text.innerText = item.todoText;
        let time = document.createElement("p");
        time.classList.add("todo-time");
        time.innerText = item.todoMonth + "/" + item.todoDate;
        todo.appendChild(text);
        todo.appendChild(time);


        //create green check and red trash can
        let completeButton = document.createElement("button");
        completeButton.classList.add("complete");
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.addEventListener("click", e => {
            let todoItem = e.target.parentElement;
            //toggle：只要點擊 button 就能讓它出現或消失
            todoItem.classList.toggle("done");
        })
    
        let trashButton = document.createElement("button");
        trashButton.classList.add("trash");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    
        trashButton.addEventListener("click",e => {
            let todoItem = e.target.parentElement;
    
            
            todoItem.addEventListener("animationend", () =>{
                
                //remove from local storage
                let text = todoItem.children[0].innerText;
                let myListArray = JSON.parse(localStorage.getItem("list"));
                myListArray.forEach((item, index) => {
                    if(item.todoText == text){
                        myListArray.splice(index, 1);
                        localStorage.setItem("list", JSON.stringify(myListArray));
                    }
                })
                todoItem.remove();
            })
    
            todoItem.style.animation = "scaleDown 0.3s forwards";
        })

        todo.appendChild(completeButton);
        todo.appendChild(trashButton);

        section.appendChild(todo);
    })
}

