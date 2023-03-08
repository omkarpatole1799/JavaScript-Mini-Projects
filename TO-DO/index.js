"use strict";
console.log("Hi");

const todoContainer = document.querySelector(".todoContainer");
const todoSubmit = document.querySelector(".todoSubmitBtn");
const todoHeading = document.getElementById("task_heading");
const todoDescription = document.getElementById("task_description");

// data
const todoListArr = [];
todoContainer.innerHTML = "Start adding your todo list!";

// add todo functionality
todoSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    const todoHeadingValue = todoHeading.value;
    const todoDescriptionValue = todoDescription.value;

    // check if the input values are empty
    if (todoHeadingValue !== "" && todoDescriptionValue !== "") {
        // inserting the values in array of objects
        todoListArr.push({
            heading: todoHeadingValue, description: todoDescriptionValue,
        });

        displayTodoList(todoListArr);
    } else {
        alert("Insert information");
    }
    todoHeading.textContent = "";
    todoDescription.textContent = "";
});

// display todo
const displayTodoList = function (todoList) {
    todoContainer.innerHTML = "";

    // check if array is empty or not
    if (todoListArr.length !== 0) {
        // loop through each item
        todoList.forEach(function (el, i) {
            const html = `<div class="card" style="width: 18rem;">
                    <div class="card-body">
                        
                        <h5 class="card-title">Task ${i + 1} : ${el.heading}</h5>
                        <p class="card-text">Description: ${el.description}</p>
                        <button class="todoCompleteBtn btn btn-primary">Done</button>
                    </div>
                 </div>`;
            todoContainer.insertAdjacentHTML("afterbegin", html);

            // complete the task
            const todoCompleteBtn = document.querySelector(".todoCompleteBtn");
            todoCompleteBtn.addEventListener("click", function (e) {
                e.preventDefault();
                todoListArr.splice(i, 1);
                displayTodoList(todoListArr);
            });
        });
    } else {
        todoContainer.innerHTML = "Hurray! no task due";
    }
};

