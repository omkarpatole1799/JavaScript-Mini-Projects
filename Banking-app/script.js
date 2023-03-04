"use strict";

// data
const account1 = {
  owner: "Omkar Patole",
  movements: [22, 12, -40, 233, 500, -90, 66, 22, -99, 1000, -6, -30, 225, 633],
  // movements: [10, -5, 10],
  interestRate: 0.9,
  password: 1,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
    "2020-07-26T12:01:20.894Z",
    "2020-07-26T12:01:20.894Z",
    "2020-07-26T12:01:20.894Z",
    "2020-07-26T12:01:20.894Z",
    "2020-07-26T12:01:20.894Z",
    "2020-07-26T12:01:20.894Z",
  ],
};

const account2 = {
  owner: "Suraj Ghodke",
  movements: [10, 21, -3, 800, -300, 287],
  interestRate: 1.5,
  password: 2,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
  ],
};

const account3 = {
  owner: "Yash Patil",
  movements: [66, 22, -99, 1000, -6, -30, 225, 633],
  interestRate: 1.9,
  password: 3,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
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

let currentUser;

// state variable
let isSorted = false;
// create user names
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

// display UI function
function displayUI(account) {
  displayMovements(account);
  displayBalance(account);
  displaySummary(account);
}

// get current time
const currentTime = () => {
  return new Date();
};

// display movements in list
const displayMovements = function (account, sorting = false) {
  const transactions = sorting
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  containerMovements.innerHTML = "";
  transactions.forEach(function (movement, i) {
    const type = movement > 0 ? "deposit" : "withdrawal";

    const date = new Date(account.movementsDates[i]);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const displayFullDate = `${day}/${month}/${year}`;
    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1}: ${type}
        </div> 
        <div class="movements__date">${displayFullDate}</div>
        <div class="movements__value">${movement.toFixed(2)} EUR</div>
    </div>`;

    // this inserts adjacent html in the container
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// display balance of the user
const displayBalance = function (account) {
  account.balance = account.movements.reduce(function (accumulator, movement) {
    return accumulator + movement;
  }, 0);

  labelBalance.textContent = account.balance.toFixed(2) + " EUR";
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
  labelSumIn.textContent = depositSummary.toFixed(2) + " EUR";

  // display withdrawal
  const withdrawalSummary = account.movements
    .filter(function (movement) {
      return movement < 0;
    })
    .reduce(function (accumulator, movement) {
      return accumulator + movement;
    });
  labelSumOut.textContent = withdrawalSummary.toFixed(2) + " EUR";

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

  labelSumInterest.textContent = interestSummary.toFixed(2) + " EUR";
};

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

    labelWelcome.textContent = `Welcome ${currentUser.owner.split(" ")[0]}`;
    balanceDate.textContent = `
    As of ${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
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
    currentUser.movementsDates.push(currentTime());
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

// loan functionality
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  // input the loan amount
  const loanAmount = Number(Math.floor(inputLoanAmount.value));

  // bank only gives 10 % loan of max deposit amount
  if (
    loanAmount > 0 &&
    currentUser.movements.some((movement) => {
      return movement > loanAmount * 0.1;
    })
  ) {
    // add the loan amount to the movement array of current user
    currentUser.movements.push(loanAmount);

    // also push current time to the momventsDates array
    currentUser.movementsDates.push(currentTime());

    // update the UI
    displayUI(currentUser);
  } else {
    console.log("NO loan ");
  }
});

// sorting the movements
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentUser.movements, !isSorted);
  isSorted = !isSorted;
});

// // always logged in for testing purpose
// // this function is immediately invoked function
// // this function only runs one time at starting
// (function () {
//   appMain.classList.add("opacity_zero");
// })();
