"use strict";
console.log("Hi");

const taskContainer = document.querySelector(".taskContainer");
const submitBtn = document.querySelector('.submit')
const task_heading = document.getElementById('task_heading')
const task_description = document.getElementById('task_description')
// data
const todoList = [
    {
        "heading": "test todo",
        "description": "test description",
    },


];

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    console.log(typeof heading)
    todoList.push({
        "heading": task_heading.value,
        "description": task_description.value
    })
    displayTodoList(todoList)
})

const displayTodoList = function (todoListFun) {
    console.log(todoListFun)

    todoListFun.forEach(function (el, i) {
        const taskHeading = el.heading;
        const taskDescription = el.description;
        console.log(el);


        const html = `<div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${taskHeading}</h5>
                        <p class="card-text">${taskDescription}</p>
                    </div>
                 </div>`;

        taskContainer.insertAdjacentHTML("afterbegin", html);
    });
}
