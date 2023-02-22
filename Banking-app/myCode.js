
// calculating user names for each account
// method 1
// const userName = accounts.map((account) => {
//   const accountNameInArr = account.owner.toLowerCase().split(" ");

//   const ownerInitial = accountNameInArr.map((ownerName) => {
//     return ownerName.at(0);
//   });
//   return ownerInitial.join("");
// });

// accounts.forEach(function (account, i) {
//   account.userName = userName[i];
// });
// console.log("+++++++++++++++++++++");

// creating user names for accounts
// method 2
// push the created user names in to each acccount object

// function createUserName(accounts) {
//   accounts.forEach(function (account) {
//     account.userName = account.owner
//       .toLowerCase()
//       .split(" ")
//       .map((word) => {
//         return word.at(0);
//       })
//       .join("");
//   });
// }
// createUserName(accounts);
// console.log(accounts);

// console.log("+++++++++++++++++++++");

// calculating user names for each account
// method 3
// const userName = accounts.map((account) => {
//   const ownerInitial = account.owner
//     .toLowerCase()
//     .split(" ")
//     .map((ownerName) => {
//       return ownerName.at(0);
//     });
//   return ownerInitial.join("");
// });
// console.log(userName);

// accounts.forEach(function (account, i) {
//   account.userName = userName[i];
// });
// console.log(accounts);

// console.log("+++++++++++++++++++++");

// calculate balance of all the users
// const displayBalance = function (accounts) {
//   accounts.forEach(function (account) {
//     const bal = account.movements.reduce(function (accumulator, movement) {
//       return accumulator + movement;
//     }, 0);
//   });
// };
// displayBalance(accounts);