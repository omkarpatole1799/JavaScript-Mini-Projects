'use strict'

let keysArr = []

for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {

    let keys = document.querySelectorAll(".drum")[i]
    keysArr.push(keys.classList[0])

    keys.addEventListener("click",function(){
        let btn = this.classList[0]
        playSound(btn)
        buttonAnimation(btn)
    })    
}

function playSound(key) {
    buttonAnimation(key)
    if (key === keysArr[0]) {
        let drumSound = new Audio("sounds/crash.mp3")
        drumSound.play()
    } else if (key === keysArr[1]) {
        let kichBass = new Audio("sounds/kick-bass.mp3")
        kichBass.play()
    }else if (key === keysArr[2]) {
        let snare = new Audio("sounds/snare.mp3")
        snare.play()
    }else if (key === keysArr[3]){
        let tom1 = new Audio("sounds/tom-1.mp3")
        tom1.play()
    } else if (key === keysArr[4]) {
        let tom2 = new Audio("sounds/tom-2.mp3")
        tom2.play()
    } else if (key === keysArr[5]) {
        let tom3 = new Audio("sounds/tom-3.mp3")
        tom3.play()
    } else if (key === keysArr[6]) {
        let tom4 = new Audio("sounds/tom-4.mp3")
        tom4.play()
    }
}

// recording keyboard key press

document.addEventListener("keydown", function (e) {
    playSound(e.key)
})

// button animation
function buttonAnimation(key){
    let pressedButton = document.querySelector(`.${key}`)
    
    pressedButton.classList.add('pressed')

    setTimeout(function(){
        pressedButton.classList.remove("pressed")
    },50)
}