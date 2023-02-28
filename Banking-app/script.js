"use strict";

// data
const account1 = {
  owner: "Omkar Patole",
  movements: [22, 12, -40, 233, 500, -90, 66, 22, -99, 1000, -6, -30, 225, 633],
  // movements: [10, -5, 10],
  interestRate: 0.9,
  password: 1,
};

const account2 = {
  owner: "Suraj Ghodke",
  movements: [10, 21, -3, 800, -300, 287],
  interestRate: 1.5,
  password: 2,
};

const account3 = {
  owner: "Yash Patil",
  movements: [66, 22, -99, 1000, -6, -30, 225, 633],
  interestRate: 1.9,
  password: 3,
};

const accounts = [account1, account2, account3];

// selection of html elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
const balanceDate = document.querySelector(".balance__date");
const appMain = document.querySelector(".app");
const date = new Date();

// initial conditions
// this function is immediately invoked function
// this function only runs one time at starting
(function () {
  appMain.classList.add("opacity_zero");
})();

// display movements in list
const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (movement, i) {
    const type = movement > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    }: ${type}</div>
        <div class="movements__value">${movement} EUR</div>
    </div>`;

    // this inserts adjacent html in the container
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const userNameCreate = function (accounts) {
  accounts.forEach(function (account) {
    account.owner
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.at(0);
      })
      .join("")
      .split(" ")
      .forEach(function (el) {
        account.userName = el;
      });
  });
};
userNameCreate(accounts);

// display balance of the user
const displayBalance = function (account) {
  account.balance = account.movements.reduce(function (accumulator, movement) {
    return accumulator + movement;
  }, 0);

  labelBalance.textContent = account.balance + " EUR";
};

// display summary of the account

const displaySummary = function (account) {
  // display deposit
  const depositSummary = account.movements
    .filter(function (movement) {
      return movement > 0;
    })
    .reduce(function (accumulator, movement) {
      return accumulator + movement;
    }, 0);
  labelSumIn.textContent = depositSummary + "EUR";

  // display withdrawal
  const withdrawalSummary = account.movements
    .filter(function (movement) {
      return movement < 0;
    })
    .reduce(function (accumulator, movement) {
      return accumulator + movement;
    });
  labelSumOut.textContent = withdrawalSummary + "EUR";

  // display interest
  const interestSummary = account.movements
    .filter((movement) => {
      return movement > 0;
    })
    .map((movement) => {
      return (movement * account.interestRate) / 100;
    })
    .filter((movement) => {
      return movement >= 1;
    })
    .reduce((accumulator, movement) => {
      return accumulator + movement;
    });

  labelSumInterest.textContent = interestSummary;
};

// let currentUser;
// // login on button click
// btnLogin.addEventListener("click", function (e) {
//   e.preventDefault();

//   // get the values from input field
//   currentUser = accounts.find((account) => {
//     return account.userName === inputLoginUsername.value;
//   });

//   // also check if pin is correct and the login
//   if (currentUser.password === Number(inputLoginPin.value)) {
//     appMain.classList.remove("opacity_zero");
//     displayBalance(currentUser.movements);
//     displayMovements(currentUser.movements);
//     displaySummary(currentUser);
//     labelWelcome.textContent = `Welcome ${currentUser.owner.split(" ")[0]}`;
//     balanceDate.textContent = `
//     As of ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
//   } else {
//     alert("Wrong info");
//   }
// });

// display UI function
function displayUI(account) {
  displayMovements(account.movements);
  displayBalance(account);
  displaySummary(account);
}

let currentUser;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentUser = accounts.find((account) => {
    return account.userName === inputLoginUsername.value;
  });
  if (currentUser?.password === Number(inputLoginPin.value)) {
    console.log("LOGIN");
    appMain.classList.remove("opacity_zero");
    labelWelcome.textContent = `Welcome ${currentUser.owner}`;
    displayUI(currentUser);
  } else {
    alert("Invalid credentials");
  }
});

// transfer money
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const sendingAmount = Number(inputTransferAmount.value);
  const reciverAccount = accounts.find((account) => {
    return account.userName === inputTransferTo.value;
  });

  if (
    reciverAccount &&
    currentUser.balance >= sendingAmount &&
    sendingAmount > 0 &&
    reciverAccount.userName !== currentUser.userName
  ) {
    currentUser.movements.push(-sendingAmount);
    reciverAccount.movements.push(sendingAmount);
    displayUI(currentUser);
  } else {
    alert("Wrong Info");
  }
});

// delete account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentUser.userName &&
    Number(inputClosePin.value) === currentUser.password
  ) {
    const index = accounts.findIndex(
      (account) => inputCloseUsername.value === currentUser.userName
    );

    accounts.splice(index, 1);
    appMain.classList.add("opacity_zero");
  } else {
    alert("Wrong info");
  }
});
