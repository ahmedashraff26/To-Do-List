"use strict"

let checkBtns = document.querySelectorAll('.checkBtn');
let deleteBtn = document.querySelectorAll('.deleteBtn');
let addToDo = document.querySelector('#addToDo');
let toDoInput = document.querySelector('#toDoText');
let todoListDiv = document.querySelector('.todoList');
let emptyAlert = document.querySelector('#emptyAlert');
let mySelect = document.getElementById('mySelect');
let searchTodo = document.querySelector('#searchTodo');
let allToDos;
let ToDosCompleted = [];
let ToDosUnCompleted = [];


searchTodo.addEventListener('input' , function (e) {
    let ToDos = [];
    for (let i = 0; i < allToDos.length; i++) {
        if (searchTodo.value == '') {
            displayToDo(allToDos);
        }
        if (allToDos[i].taskDetails.includes(searchTodo.value)) {
            ToDos.push(allToDos[i]);
        }
    }
    displayToDo(ToDos);
})

if(localStorage.getItem('allToDos') == null){
    allToDos = []
}
else{
    allToDos = JSON.parse(localStorage.getItem('allToDos'));
    displayToDo(allToDos);
}

for(let i = 0;i < allToDos.length;i++){
    if (allToDos[i].isCompleted == true) {
        ToDosCompleted.push(allToDos[i]);
    }
    else{
        ToDosUnCompleted.push(allToDos[i]);
    }
}

mySelect.addEventListener('change' , function(){
    if(mySelect.value == 'all'){
        displayToDo(allToDos);
    }else if(mySelect.value == 'completed'){
        displayToDo(ToDosCompleted);
    }else{
        displayToDo(ToDosUnCompleted);
    }
})

addToDo.addEventListener('click', function(){
    if(toDoInput.value == ""){
        emptyAlert.classList.remove('d-none');
        emptyAlert.classList.add('d-block');
    }
    else{
        emptyAlert.classList.remove('d-block')
        emptyAlert.classList.add('d-none')
        let task = {
            taskDetails : toDoInput.value,
            isCompleted: false,
            id: `${Math.random()*100000000}`
        }
        allToDos.push(task);
        console.log(allToDos);
        displayToDo(allToDos);
        localStorage.setItem('allToDos', JSON.stringify(allToDos));
    }
})

for (let i = 0; i < checkBtns.length; i++) {
    checkBtns[i].addEventListener('click', function(e){
        console.log('Hello');
        let parent =  e.target.parentNode;
        if(parent.classList.contains('completed')){
            parent.classList.remove('completed');
            console.log('hello');
        }
        else{
            console.log('completed');
            parent.classList.add('completed');
        }
    })
}


function displayToDo(arr){
    let cartoona = "";
    for (const task of arr) {
        cartoona += `<div class="bg-dark row px-0 mt-5 ${task.isCompleted == true ? "completed" : ""}">
                    <div class="col-8 fs-5 text-white d-flex justify-content-start align-items-center fs-4">${task.taskDetails}</div>
                    <div class="btn checkBtn rounded-0 col-2 py-3 bg-success d-flex justify-content-center" onclick="isCompleted(${task.id})">
                        <i class="fa-solid fa-check fs-3 text-white"></i>
                    </div>
                    <div class="btn deleteBtn rounded-0 col-2 py-3 bg-danger d-flex justify-content-center" onclick="deleteTask(${task.id})">
                        <i class="fa-solid fa-trash fs-3 text-white"></i>
                    </div>
            </div>`
    }
    todoListDiv.innerHTML = cartoona;
}


function isCompleted(id){
    console.log(id);
    let index = allToDos.findIndex(function(task){return task.id == id});
    console.log(index);
    if(index != -1){
        if(allToDos[index].isCompleted == false){
            allToDos[index].isCompleted = true
        }
        else{
            allToDos[index].isCompleted = false;
        }
    }
    localStorage.setItem('allToDos', JSON.stringify(allToDos));
    displayToDo(allToDos);
}

function deleteTask(id){
    let index = allToDos.findIndex(function(task){return task.id == id});
    if(index != -1){
        allToDos.splice(index, 1);
    }
    localStorage.setItem('allToDos', JSON.stringify(allToDos));
    displayToDo(allToDos)
}