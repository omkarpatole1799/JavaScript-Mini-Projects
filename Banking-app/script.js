"use strict";

// data
const account1 = {
  owner: "Omkar Patole",
  movements: [22, 12, -40, 233, 500, -90, 66, 22, -99, 1000, -6, -30, 225, 633],
  // movements: [10, -5, 10],
  interestRate: 1.22,
  password: 1111,
};

const account2 = {
  owner: "Suraj Ghodke",
  movements: [10, 21, -3, 800, -300, 287],
  interestRate: 1.23,
  password: 2222,
};

const account3 = {
  owner: "Yash Patil Patil",
  movements: [66, 22, -99, 1000, -6, -30, 225, 633],
  interestRate: 1.24,
  password: 3333,
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
displayMovements(account1.movements);

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
const displayBalance = function (movements) {
  labelBalance.textContent =
    movements.reduce(function (accumulator, movement) {
      return accumulator + movement;
    }, 0) + " EUR";
};
displayBalance(account1.movements);

// display summary of the account
const eurToUsd = 1.2;
const displaySummary = function (movements) {
  console.log(movements);

  const depositSummary = movements
    .filter(function (movement) {
      return movement > 0;
    })
    .reduce(function (accumulator, movement) {
      return accumulator + movement;
    }, 0);
  labelSumIn.textContent = depositSummary + "EUR";

  const withdrawalSummary = movements
    .filter(function (movement) {
      return movement < 0;
    })
    .reduce(function (accumulator, movement) {
      return accumulator + movement;
    });
  labelSumOut.textContent = withdrawalSummary + "EUR";

  const interestSummary = movements
    .filter((movement) => {
      return movement > 0;
    })
    .map((movement) => {
      return (movement * eurToUsd) / 100;
    })
    .filter((movement) => {
      return movement >= 1;
    })
    .reduce((accumulator, movement) => {
      return accumulator + movement;
    });

  labelSumInterest.textContent = interestSummary;
};
displaySummary(account1.movements);
