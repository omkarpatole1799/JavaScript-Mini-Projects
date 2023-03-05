"use strict";

// data
const account1 = {
  owner: "Omkar Patole",
  movements: [66, 222, -99, 1000, -6, -30, 225, 1633],
  // movements: [10, -5, 10],
  interestRate: 0.9,
  password: 1,
  movementsDates: [
    "Sun Mar 05 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Mar 03 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Feb 13 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Feb 12 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Feb 11 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Feb 10 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Feb 09 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Feb 08 2023 13:09:20 GMT+0530 (India Standard Time)",
  ],
  locale: "pt-PT", // de-DE
  currency: "USD",
};

const account2 = {
  owner: "Suraj Ghodke",
  movements: [62226, 2293422, -99, 1430100, -6, -30, 224555, 63433],
  interestRate: 1.5,
  password: 2,
  movementsDates: [
    "Sun Mar 05 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Mar 03 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Feb 13 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Feb 12 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Feb 11 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Feb 10 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Feb 09 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Feb 08 2023 13:09:20 GMT+0530 (India Standard Time)",
  ],
  locale: "en-US",
  currency: "EUR",
};

const account3 = {
  owner: "Yash Patil",
  movements: [61236, 2222, -199, 1000, -226, -530, 22325, 633],
  interestRate: 1.9,
  password: 3,
  movementsDates: [
    "Sun Mar 05 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Mar 03 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Feb 13 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Feb 12 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Feb 11 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Feb 10 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Feb 09 2023 13:09:20 GMT+0530 (India Standard Time)",
    "Sun Feb 08 2023 13:09:20 GMT+0530 (India Standard Time)",
  ],
  locale: "en-US",
  currency: "USD",
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

let currentUser, timer;
// initial condition
appMain.classList.add("opacity_zero");
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
function getCurrentTime() {
  return String(new Date());
}

// format date using intl api
function formatLocaleDate(date, locale) {
  return new Intl.DateTimeFormat(locale).format(date);
}

// format currency and movements using intl api
function formatLocaleMoney(locale, currency, value) {
  const options = {
    style: "currency",
    currency: currency,
  };
  return new Intl.NumberFormat(locale, options).format(value);
}

// formatted Date
const formatedDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) => {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };

  const daysPassed = calcDaysPassed(getCurrentTime(), date);

  if (daysPassed === 0) {
    return "Today";
  }
  if (daysPassed === 1) {
    return "Yesterday";
  }
  if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  } else {
    // const day = date.getDate();
    // const month = date.getMonth() + 1;
    // const year = date.getFullYear();
    // const displayFullDate = `${month}/${day}/${year}`;

    return formatLocaleDate(date, currentUser.locale);
  }
};

// display movements in list
const displayMovements = function (account, sorting = false) {
  const transactions = sorting
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  containerMovements.innerHTML = "";

  transactions.forEach(function (movement, i) {
    const type = movement > 0 ? "deposit" : "withdrawal";

    const date = formatedDate(
      new Date(account.movementsDates[i]),
      currentUser.locale
    );

    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1}: ${type}
        </div> 
        <div class="movements__date">${date}</div>
        <div class="movements__value">${formatLocaleMoney(
          currentUser.locale,
          currentUser.currency,
          movement.toFixed(2)
        )}</div>
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

  labelBalance.textContent = formatLocaleMoney(
    currentUser.locale,
    currentUser.currency,
    account.balance.toFixed(2)
  );
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
  labelSumIn.textContent = formatLocaleMoney(
    currentUser.locale,
    currentUser.currency,
    depositSummary.toFixed(2)
  );

  // display withdrawal
  const withdrawalSummary = account.movements
    .filter(function (movement) {
      return movement < 0;
    })
    .reduce(function (accumulator, movement) {
      return accumulator + movement;
    });
  labelSumOut.textContent = formatLocaleMoney(
    currentUser.locale,
    currentUser.currency,
    withdrawalSummary.toFixed(2)
  );

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

  labelSumInterest.textContent = formatLocaleMoney(
    currentUser.locale,
    currentUser.currency,
    interestSummary.toFixed(2)
  );
};

// logout timer
const logOutTimer = function () {
  let time = 120;

  let tick = function () {
    // calculate minute and seconds
    const minute = Math.trunc(time / 60);
    const seconds = Math.trunc(time % 60);

    // decrease time in UI
    labelTimer.textContent = ` ${minute}: ${seconds} `;

    // logout when time is zero
    if (time === 0) {
      appMain.classList.add("opacity_zero");
    }
    // decrease the time
    time--;
  };

  // calling the function first time
  tick();
  timer = setInterval(tick, 1000);
  return timer;
};

// restart timer
function restartTimer() {
  clearInterval(timer);
  timer = logOutTimer();
}

// login functionality
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentUser = accounts.find((account) => {
    return account.userName === inputLoginUsername.value;
  });
  if (currentUser?.password === Number(inputLoginPin.value)) {
    appMain.classList.remove("opacity_zero");
    labelWelcome.textContent = `Welcome ${currentUser.owner}`;

    // update UI
    displayUI(currentUser);

    // start logout timer
    logOutTimer();

    labelWelcome.textContent = `Welcome ${currentUser.owner.split(" ")[0]}`;
    balanceDate.textContent = `
    As of ${formatLocaleDate(new Date(), currentUser.locale)}`;
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
    reciverAccount.movementsDates.push(getCurrentTime());
    currentUser.movementsDates.push(getCurrentTime());

    // update the UI
    displayUI(currentUser);

    // restart the timer
    restartTimer();
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
    // approving the loan after 3 seconds
    setTimeout(() => {
      // add the loan amount to the movement array of current user
      currentUser.movements.push(loanAmount);

      // also push current time to the momventsDates array
      currentUser.movementsDates.push(getCurrentTime());

      // update the UI
      displayUI(currentUser);

      // restart the timer again
      restartTimer();
    }, 3000);
  } else {
    alert("Wrong info");
  }
});

// sorting the movements
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentUser.movements, !isSorted);
  isSorted = !isSorted;
});
