'use strict'

// selecting final scores of players
const score0Element = document.getElementById('score--0')
const score1Element = document.getElementById('score--1')

// selecting current scores of players
const current0Element = document.getElementById('current--0')
const current1Element = document.getElementById('current--1')

// selecting players
const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')

// selecting the buttons
const newGameBtn = document.querySelector('.btn--new')
const rollDiceBtn = document.querySelector('.btn--roll')
const holdGameBtn = document.querySelector('.btn--hold')

let diceImage = document.querySelector('.dice')

// state variables
let scores, currentScore, currentPlayer, playing
// initial condition 

function initial() {
    // scores of players in array
    scores = [0, 0]
    currentScore = 0
    currentPlayer = 0
    playing = true

    score0Element.textContent = 0
    score1Element.textContent = 0

    current0Element.textContent = 0
    current1Element.textContent = 0

    // hiding the dice before starting the game
    diceImage.classList.add('hidden')

    // switching to player 0 
    player0.classList.add('player--active')
    player1.classList.remove('player--active')

    player0.classList.remove('player--winner')
    player1.classList.remove('player--winner')

}
initial();

// switch player function
function switchPlayer() {
    // switch player
    document.getElementById(`current--${currentPlayer}`)
        .textContent = 0
    currentScore = 0
    currentPlayer = currentPlayer === 0 ? 1 : 0

    // changing active class of corresponding player
    player0.classList.toggle('player--active')
    player1.classList.toggle('player--active')

    // removing the winner class
    
}

// rolling the dice when button pressed
rollDiceBtn.addEventListener("click", function () {
    if (playing) {
        // generate random number between 1-6
        let diceRollNumber = Math.trunc(Math.random() * 6) + 1

        // setting dice according to rolled dice
        diceImage.classList.remove('hidden')
        diceImage.src = `dice-${diceRollNumber}.png`

        // if the score is 1 then make score 0 and switch player
        if (diceRollNumber !== 1) {
            // add score to corresponding player
            currentScore += diceRollNumber
            document.getElementById(`current--${currentPlayer}`)
                .textContent = currentScore
        } else {
            // switch player
            switchPlayer()
        }
    }
})

// new game button


// hold score
holdGameBtn.addEventListener("click", function () {

    // if(currentPlayer === 0){
    //     scores[currentPlayer] += currentScore
    //     score0Element.textContent = scores[currentPlayer]
    //     switchPlayer()
    // } else if (currentPlayer === 1){
    //     scores[currentPlayer] += currentScore
    //     score1Element.textContent = scores[currentPlayer]
    //     switchPlayer()
    // }    

    if (playing) {
        // setting up scores of corresponding players
        scores[currentPlayer] += currentScore

        document.getElementById(`score--${currentPlayer}`)
            .textContent = scores[currentPlayer]

        // checking if scores are more than 30
        if(scores[currentPlayer] >= 15){
            playing = false
            diceImage.classList.add('hidden')
            document.querySelector(`.player--${currentPlayer}`)
                .classList.add('player--winner')

            document.querySelector(`.player--${currentPlayer}`)
                .classList.remove('player--active')
            
        } else{
            switchPlayer()
        }

        // switch player
        switchPlayer()
    }
})