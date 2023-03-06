"use strict";
console.log("Hi");

const taskContainer = document.querySelector(".taskContainer");
const submitBtn = document.querySelector('.submit')
const task_heading = document.getElementById('task_heading')
const task_description = document.getElementById('task_description')
// data
const todoList = [

];

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    todoList.push({
        "heading": task_heading.value,
        "description": task_description.value
    })

    console.log(displayTodoList(todoList))
})

const displayTodoList = function (todoList) {
    taskContainer.innerHTML = "";
    todoList.forEach(function (el, i) {

        const html = `<div class="card" style="width: 18rem;">
                    <div class="card-body">
                        
                        <h5 class="card-title">Task ${i + 1} : ${el.heading}</h5>
                        <p class="card-text">Description: ${el.description}</p>
                    </div>
                 </div>`;

        taskContainer.insertAdjacentHTML("afterbegin", html);
    });
    return todoList
}
