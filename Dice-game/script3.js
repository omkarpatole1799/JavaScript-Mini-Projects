'use strict'

// selecting the elements
const p0Score = document.querySelector('#score--0')
const p1Score = document.querySelector('#score--1')

const p0CurrentScore = document.querySelector("#current--0")
const p1CurrentScore = document.querySelector("#current--1")

const player0 = document.querySelector(".player--0")
const player1 = document.querySelector(".player--1")

// life
const lifeElement = document.querySelector(".life")

// selecting buttons
const newGame = document.querySelector('.btn--new')
const rollDice = document.querySelector('.btn--roll')
const holdBtn = document.querySelector('.btn--hold')

// selecting dice
let diceImage = document.querySelector('.dice')

// state variables
let currentScore, currentPlayer, scores, isPlaying, isRolled, life

function initial() {
    life = 3
    isRolled = false
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
    lifeElement.textContent = "Health: " + life
}
initial()

function switchPlayer() {
    document.getElementById(`current--${currentPlayer}`).textContent = 0;
    currentScore = 0
    currentPlayer = currentPlayer === 0 ? 1 : 0
    player0.classList.toggle('player--active')
    player1.classList.toggle('player--active')
    life = 3
    lifeElement.textContent = "Health: " + life
    checkWinner()
}

function checkWinner() {
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

// rolling dice
rollDice.addEventListener("click", function () {

    if (isPlaying) {
        isRolled = true

        // generate random number between 1-6
        let diceNum = Math.trunc(Math.random() * 6) + 1

        // set dice according to number generated
        diceImage.classList.remove('hidden')
        diceImage.src = `dice-${diceNum}.png`

        // if diceNum is 1 then reset score to zero and switch player

        if (diceNum !== 1 && life !== 0) {
            // add score to current score
            currentScore += diceNum
            document.querySelector(`#current--${currentPlayer}`)
                .textContent = currentScore

            life--
            lifeElement.textContent = "Health: " + life

        } else {
            // switch player
            scores[currentPlayer] += currentScore
            document.getElementById(`score--${currentPlayer}`).textContent = scores[currentPlayer]
            switchPlayer()
        }
    }
})

// new game button
newGame.addEventListener("click", initial)

// hold button switch player

holdBtn.addEventListener("click", function () {
    if (isPlaying) {
        scores[currentPlayer] += currentScore
        document.getElementById(`score--${currentPlayer}`)
            .textContent = scores[currentPlayer]

        checkWinner()
    }
})

// model js 

const rulesButton = document.querySelector('.btn--rules')
const closeModelBtn = document.querySelector(".close-modal")
const model = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
// show model function
function showModel() {
    model.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

function hideModel() {
    model.classList.add('hidden')
    overlay.classList.add('hidden')
}

const btnArr = [closeModelBtn, overlay]

rulesButton.addEventListener("click", function () {
    showModel()
})

for (let i = 0; i < btnArr.length; i++) {
    btnArr[i].addEventListener("click", function () {
        hideModel()
    })
}