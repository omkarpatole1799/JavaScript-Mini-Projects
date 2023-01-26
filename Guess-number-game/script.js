'use strict';

// generate random number
let randomNumber = Math.trunc(Math.random()*20)+1;
// document.querySelector(".number").innerHTML = randomNumber;
// default score
let score = 20
let highScore = 0
document.querySelector(".checkBtn").addEventListener('click',
function(){
    
    // taking input number
    let inputNumber = Number(document.querySelector(".guessNumber").value);
    if (!inputNumber){
        document.querySelector(".message").textContent = "please enter number"

    }else if (inputNumber > 20){
        document.querySelector(".message").textContent = "not more than 20";

    }else if(inputNumber === randomNumber){
        document.querySelector(".message").textContent = "correct";
        document.querySelector(".number").innerHTML = randomNumber;
        document.querySelector("body").style.backgroundColor = "#E4C988";

        if(score > highScore){
            highScore = score
            document.querySelector(".highscore").textContent = highScore;
        }

    }else if(inputNumber > randomNumber){
        if(score > 1){
            document.querySelector(".message").textContent = "too high";
            score -- 
            document.querySelector(".score").textContent = score

        }else {
            document.querySelector(".message").textContent = "loose";
            document.querySelector(".score").textContent = 0
        }
        
    }else if(inputNumber < randomNumber){
        if (score > 1) {
            document.querySelector(".message").textContent = "too low";
            score--;
            document.querySelector(".score").textContent = score;
        } else {
            document.querySelector(".message").textContent = "loose";
            document.querySelector(".score").textContent = 0;
        }
    } 
})

document.querySelector(".againBtn").addEventListener("click",
function(){
    score = 20
    randomNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector(".message").textContent = "Start guessing..."
    document.querySelector(".score").textContent = score
    document.querySelector(".number").innerHTML = "?";
    document.querySelector("body").style.backgroundColor = "#658864";
    document.querySelector(".guessNumber").value = ""
})
