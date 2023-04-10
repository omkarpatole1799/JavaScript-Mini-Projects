'use strict';

// to do

/*
1. Select all the elements and store into variables
2. loop through all the buttons 
    - add event listeners to all the buttons
    - on the event perform action like adding or removing the class of model

 */

const model = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
const openButton = document.querySelectorAll(".show-modal")
const closeButton = document.querySelector(".close-modal")
console.log(closeButton)

// looping through add buttons
// for(let i = 0; i < openButton.length ; i++){
//     openButton[i].addEventListener("click",function(){
//         model.classList.remove('hidden')
//         overlay.classList.remove('hidden')
//     })
// }

// closeButton.addEventListener("click",function(){
//     model.classList.add("hidden")
//     overlay.classList.add("hidden")
// })

// overlay.addEventListener("click",function(){
//     model.classList.add("hidden")
//     overlay.classList.add("hidden")
// })


// this function opens the model
function openModel(){
    model.classList.remove("hidden")
    overlay.classList.remove("hidden")
}

// this function closes the model
function closeModel(){
    model.classList.add("hidden")
    overlay.classList.add("hidden")
}

// looping through all the buttons
for (let i = 0 ; i < openButton.length ; i ++){
    openButton[i].addEventListener("click",openModel)
}

// when clicked on close button this closes the model
closeButton.addEventListener("click",closeModel)

// when clicked on overlay this closts the model
overlay.addEventListener("click", closeModel)


// closing the model when escape key is pressed

document.addEventListener("keydown", function(e){
    if(e.key === 'Escape' && !model.classList.contains("hidden")){
        closeModel();
    }
})
