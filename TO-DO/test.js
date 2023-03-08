"use strict";
console.log("Hi");

const todoContainer = document.querySelector(".todoContainer");
const todoSubmit = document.querySelector('.todoSubmitBtn')
// const todoHeading = document.getElementById('task_heading')
// const todoDescription = document.getElementById('task_description')
// data
const todoList = [
    {
        "heading": "test todo",
        "description": "test description",
    },


];

todoSubmit.addEventListener("click", function (e) {
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
    todoContainer.innerHTML = ''
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

        todoContainer.insertAdjacentHTML("afterbegin", html);
    });
}
