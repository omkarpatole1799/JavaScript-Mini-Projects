'use strict'

// selecting the elements
const p0Score = document.querySelector('#score--0')
const p1Score = document.querySelector('#score--1')

const p0CurrentScore = document.querySelector("#current--0")
const p1CurrentScore = document.querySelector("#current--1")

const player0 = document.querySelector(".player--0")
const player1 = document.querySelector(".player--1")

// selecting buttons
const newGame = document.querySelector('.btn--new')
const rollDice = document.querySelector('.btn--roll')
const holdBtn = document.querySelector('.btn--hold')

// selecting dice
let diceImage = document.querySelector('.dice')

// state variables
let currentScore, currentPlayer, scores, isPlaying

function initial() {
    isPlaying = true
    currentPlayer = 0
    currentScore = 0
    scores = [0, 0] // zero score for both player

    p0Score.textContent = 0
    p1Score.textContent = 0
    p0CurrentScore.textContent = 0
    p1CurrentScore.textContent = 0

    diceImage.classList.add('hidden')
    player0.classList.add('player--active')
    player1.classList.remove('player--active')

    player0.classList.remove('player--winner')
    player1.classList.remove('player--winner')
    
}
initial()

function switchPlayer() {
    document.getElementById(`current--${currentPlayer}`).textContent = 0;
    currentScore = 0
    currentPlayer = currentPlayer === 0 ? 1 : 0
    player0.classList.toggle('player--active')
    player1.classList.toggle('player--active')
}

// rolling dice
rollDice.addEventListener("click", function () {

    if (isPlaying) {
        // generate random number between 1-6
        let diceNum = Math.trunc(Math.random() * 6) + 1
        console.log(diceNum)

        // set dice according to number generated
        diceImage.classList.remove('hidden')
        diceImage.src = `dice-${diceNum}.png`

        // if diceNum is 1 then reset score to zero and switch player

        if (diceNum !== 1) {
            // add score to current score
            currentScore += diceNum
            document.querySelector(`#current--${currentPlayer}`)
                .textContent = currentScore

        } else {
            // switch player
            switchPlayer()
        }
    }
})

// new game button
newGame.addEventListener("click",initial)

// hold button switch player
holdBtn.addEventListener("click", function () {

    if (isPlaying) {
        scores[currentPlayer] += currentScore
        document.getElementById(`score--${currentPlayer}`)
            .textContent = scores[currentPlayer]

        if (scores[currentPlayer] >= 30) {
            isPlaying = false
            diceImage.classList.add('hidden')
            document.querySelector(`.player--${currentPlayer}`)
                .classList.remove('player--active')
            document.querySelector(`.player--${currentPlayer}`)
                .classList.add("player--winner")
        } else {
            switchPlayer()
        }
    }
})