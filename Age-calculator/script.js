const buttonSubmit = document.getElementById("submit-button");

buttonSubmit.onclick = function () {
const birthYear = document.getElementById("birth-year").value;
const toYear = document.getElementById("to-year").value;

console.log(toYear);
console.log(birthYear);

const age = toYear - birthYear;

console.log(age);

if (birthYear == "" && toYear == ""){
    document.getElementById("age").innerHTML = "Please enter value";
}
else if (birthYear == ""){
    document.getElementById("age").innerHTML = "Please enter birth year";
}
else if (toYear == ""){
    document.getElementById("age").innerHTML = "Please Enter To Year";
}
else{
    document.getElementById("age").innerHTML = "Your age is = " + age;
}
};


