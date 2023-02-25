console.log("hi");

const game = {
  team1: "Bayern Munich",
  team2: "Borussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnabry",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// itrating using for of loop

for (const [i, player] of game.scored.entries()) {
  console.log(i, player);
}

Object.entries(game.scored).forEach(([i, player]) => {
  console.log(i, player);
});

const goalScores = {};
for (const player of game.scored) {
  if (goalScores[player]) {
    goalScores[player] += 1;
  } else {
    goalScores[player] = 1;
  }
}
// console.log(goalScores);

const goalScores1 = {};
Object.entries(game.scored).forEach(([i, player]) => {
  console.log(player);
  if (goalScores1[player]) {
    goalScores1[player] += 1;
  } else {
    goalScores1[player] = 1;
  }
});
// console.log(goalScores1);
console.log("++++++++++++++++");
console.log(game.scored);
console.log(Object.entries(game.scored));
Object.entries(game.scored).forEach(([i, player]) => {
  console.log(`Goal ${i}: ${player}`);
});
const gameScored = game.scored;
for (const [i, player] of gameScored.entries()) {
  console.log(i + 1, player);
}
console.log(game.odds);
console.log(Object.entries(game.odds));
Object.entries(game.odds).forEach(([team, odd]) => {
  console.log(team, odd);
});
game.scored.forEach((p, i) => {
  console.log(i + 1, p);
});
for (const [i, p] of game.scored.entries()) {
  console.log(i + 1, p);
}

gameScored.forEach((p,i) => {
    console.log(`Goal ${i+1} : ${p}`);
});
