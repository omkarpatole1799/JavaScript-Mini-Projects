'use strict';

// todo
/*
1. select the two players score and set to zero
2. select dice and make display hidden by adding class name
3. generate random number between 1-6
4. set the dice according to the number generated
5. check which player is playing the game
6. set the score of the player accoding to dice number who is playing game
*/

// hiding display of dice at starting of game
document.querySelector(".dice").classList.add('hidden')

// selecting the score elements
const score0Element = document.getElementById('score--0')
const score1Element = document.getElementById('score--1')

// setting up scores zero at starting
score0Element.textContent = 0
score1Element.textContent = 0



// getting player 0 and 1 scores
let player0Current = document.getElementById('current--0')
let player1Current = document.getElementById('current--1')

// initially scores are zero
player0Current = 0
player1Current = 0

// getting players 0 & 1
const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')

const rollDiceBtn = document.querySelector('.btn--roll')
rollDiceBtn.addEventListener("click", function(){
    // generating random number between 1-6
    const diceRoll = Math.trunc(Math.random() * 6) + 1

    // setting up the dice image according to random number generated
    let diceImage = document.querySelector('.dice')
    diceImage.src = `dice-${diceRoll}.png`

    // making dice visible when clicked on roll dice button
    document.querySelector(".dice").classList.remove('hidden')

    // checking which player is playing
    if (player0.classList.contains('player--active')){
        player0Current += diceRoll
        document.getElementById('current--0').textContent = player0Current

        // set score to 0 if 1 occurs on dice
        if (diceRoll === 1) {
            player0Current = 0
            player0.classList.remove('player--active')
            player1.classList.add('player--active')
        }

    } else if (player1.classList.contains('player--active')){
        player1Current += diceRoll
        document.getElementById('current--1').textContent = player1Current

        // set score to 0 if 1 occurs on dice
        if (diceRoll === 1){
            player1Current = 0
            player1.classList.remove('player--active')
            player0.classList.add('player--active')
        }
    }

})


// shifting player when clicked on hold button

const holdButton = document.querySelector('.btn--hold')
holdButton.addEventListener("click",function(){
    if (player0.classList.contains('player--active')){
        player0.classList.remove('player--active')
        player1.classList.add('player--active')
        score0Element.textContent = player0Current
    } else if (player1.classList.contains('player--active')){
        player1.classList.remove('player--active')
        player0.classList.add('player--active')
        score1Element.textContent = player1Current
    }
})

// new game button 
const newGameBtn = document.querySelector('.btn--new')
newGameBtn.addEventListener("click", function(){
    score0Element.textContent = 0
    score1Element.textContent = 0

    document.querySelector(".dice").classList.add('hidden')

    // player0Current = 0
    // player1Current = 0

})