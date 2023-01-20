'use strict'

// const buttonClick = document.getElementById("button")

document.getElementById("button").onclick = function(){
    
    let tempInCelcius = document.getElementById("celcius").value
    let tempInFahrenheit = document.getElementById("fahrenheit").value

    if (tempInCelcius){
        const celciusToFahrenhit = (tempInCelcius * 1.8 ) + 32
        document.getElementById('fahrenheit').value = celciusToFahrenhit
    } else if (tempInFahrenheit){
        const fahrenhitToCelcius = (tempInFahrenheit -32) * (5/9)
        document.getElementById('celcius').value = fahrenhitToCelcius
    }else {
        document.getElementById('answer').innerHTML = "please enter value"
    }
}



