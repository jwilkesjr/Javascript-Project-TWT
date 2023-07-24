// Require prompt-sync to read user inputs
const prompt = require("prompt-sync")();

// Define the number of rows and columns for the game grid
const ROWS = 3;
const COLS = 3;

// Define the count of each symbol
const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

// Define the value of each symbol
const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

// Function to get deposit from user
const deposit = () => {
  while (true) {
    const depositAmount = parseFloat(prompt("Enter a deposit amount: "));

    // If entered deposit amount is invalid, prompt user to try again
    if (isNaN(depositAmount) || depositAmount <= 0) {
      console.log("Invalid deposit amount, try again.");
    } else {
      return depositAmount;
    }
  }
};

// Function to get number of lines to bet on from user
const getNumberOfLines = () => {
  while (true) {
    const numberOfLines = parseFloat(prompt("Enter the number of lines to bet on (1-3): "));

    // If entered number of lines is invalid, prompt user to try again
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines, try again.");
    } else {
      return numberOfLines;
    }
  }
};

// Function to get bet amount from user
const getBet = (balance, lines) => {
  while (true) {
    const numberBet = parseFloat(prompt("Enter the bet per line: "));

    // If entered bet amount is invalid, prompt user to try again
    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet, try again.");
    } else {
      return numberBet;
    }
  }
};

// Function to spin the reel and generate symbols
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    symbols.push(...Array(count).fill(symbol));
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    const reelSymbols = [...symbols];
    reels.push(
      Array(ROWS)
        .fill(null)
        .map(() => {
          const randomIndex = Math.floor(Math.random() * reelSymbols.length);
          return reelSymbols.splice(randomIndex, 1)[0];
        })
    );
  }

  return reels;
};

// Function to transpose the reels into rows
const transpose = (reels) => {
  return reels[0].map((_, i) => reels.map(row => row[i]));
};

// Function to print the rows
const printRows = (rows) => {
  for (const row of rows) {
    console.log(row.join(" | "));
  }
};

// Function to calculate winnings
const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    if (rows[row].every(symbol => symbol === rows[row][0])) {
      winnings += bet * SYMBOL_VALUES[rows[row][0]];
    }
  }

  return winnings;
};

// Function to run the game
const game = () => {
  let balance = deposit();

  while (true) {
    console.log(`You have a balance of $${balance}`);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log(`You won, $${winnings}`);

    if (balance <= 0) {
      console.log("You ran out of money!");
      break;
    }

    const playAgain = prompt("Do you want to play again (y/n)? ");

    if (playAgain !== "y") break;
  }
};

// Start the game
game();
