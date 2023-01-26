"use strict";

// generate random number
let randomNumber = Math.trunc(Math.random() * 20) + 1;

// default score
let score = 20
let highScore = 0

// message display function
function displayMessage(message){
    document.querySelector(".message").textContent = message
}

function displayScore(score){
    document.querySelector(".score").textContent = score
}

document.querySelector(".checkBtn").addEventListener("click",
function(){

    const inputNumber = Number(document.querySelector(".guessNumber").value)
    console.log(inputNumber)

    if(!inputNumber){
        displayMessage("Please Enter Number")

    } else if (inputNumber === randomNumber){
        displayMessage("you win")
        document.querySelector(".number").innerHTML = randomNumber;
        document.querySelector("body").style.backgroundColor = "#E4C988";

        if (score > highScore) {
            highScore = score
            document.querySelector(".highscore").textContent = highScore;
        }

    }else if(inputNumber !== randomNumber){
        if(score > 1){
            displayMessage(inputNumber > randomNumber ? "high" : "low")
            score--
            displayScore(score)
        }

    }

})

document.querySelector(".againBtn").addEventListener("click",
function(){
    score = 20
    displayMessage("Start guessing...")
    displayScore(score)
    document.querySelector(".guessNumber").value = ''
    document.querySelector(".number").innerHTML = "?"
    document.querySelector("body").style.backgroundColor = "#658864"
})
