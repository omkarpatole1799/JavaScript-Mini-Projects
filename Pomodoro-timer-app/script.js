'use strict'
let minuteElement = document.querySelector('.minutes')
let secondElement = document.querySelector('.seconds')
let startBtn = document.querySelector('.startBtn')

let pauseBtn = document.querySelector('.pauseBtn')
let playBtn = document.querySelector('.playBtn')
let resetBtn = document.querySelector('.resetBtn')
let settingBtn = document.querySelector('.settingBtn')

// model elements select
let modal = document.querySelector('.modal')
let overlay = document.querySelector('.overlay')
let closeModal = document.querySelector('.close-modal')

// model option buttons select
const time25 = document.getElementById('time25')
const time50 = document.getElementById('time50')
const timeSubmitBtn = document.querySelector('.time-submit-btn')

let seconds
let interval
let isPaused = false
let minutes

function initialCondition() {
  isPaused = false
  minutes = 25
  minuteElement.innerHTML = '25:'
  secondElement.innerHTML = '00'
  clearTimeout(interval)

  startBtn.classList.remove('hidden')
  playBtn.classList.add('hidden')
  pauseBtn.classList.add('hidden')
  resetBtn.classList.add('hidden')
}
initialCondition()

function timer() {
  seconds = minutes * 60
  interval = setInterval(() => {
    if (!isPaused) {
      seconds--
      minuteElement.innerHTML = Math.trunc(seconds / 60) + ':'
      secondElement.innerHTML = seconds % 60
      console.log(`${Math.trunc(seconds / 60)}: ${seconds % 60}`)
    }
  }, 1000)
}

startBtn.addEventListener('click', function () {
  startBtn.classList.add('hidden')
  pauseBtn.classList.remove('hidden')
  playBtn.classList.add('hidden')
  resetBtn.classList.remove('hidden')

  isPaused = false
  timer()
})

pauseBtn.addEventListener('click', function () {
  startBtn.classList.add('hidden')
  playBtn.classList.remove('hidden')
  pauseBtn.classList.add('hidden')
  resetBtn.classList.remove('hidden')
  isPaused = true
})

playBtn.addEventListener('click', function () {
  startBtn.classList.add('hidden')
  playBtn.classList.add('hidden')
  pauseBtn.classList.remove('hidden')
  resetBtn.classList.remove('hidden')
  isPaused = false
})

resetBtn.addEventListener('click', function () {
  initialCondition()
})

// settings model show hide
function showSettings() {
  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
}
function hideSettings() {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
}

settingBtn.addEventListener('click', showSettings)

closeModal.addEventListener('click', hideSettings)

overlay.addEventListener('click', hideSettings)

// taking input according to model input
function selectTime25() {
  time25.classList.add('selected')
  time50.classList.remove('selected')
}
function selectTime50() {
  time25.classList.remove('selected')
  time50.classList.add('selected')
}
time25.addEventListener('click', selectTime25)
time50.addEventListener('click', selectTime50)

timeSubmitBtn.addEventListener('click', function () {
  if (time25.classList.contains('selected')) {
    minutes = time25.value
    minuteElement.innerHTML = minutes + ':'
  } else if (time50.classList.contains('selected')) {
    minutes = time50.value
    minuteElement.innerHTML = minutes + ':'
  }
  hideSettings()
})
