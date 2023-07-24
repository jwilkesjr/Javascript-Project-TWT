This is a JavaScript-based command-line slot machine game. This game was inspired by a tutorial from the "Tech with Tim" YouTube channel and was written to demonstrate how such games could be developed using JavaScript.

In this game:
    1. The player first deposits a certain amount of money which becomes the balance.
    2. They then enter the number of lines they want to bet on, between 1 and 3.
    3. They enter the amount of money they want to bet per line. This cannot be more than the balance divided by the number of lines.
    4. The game then "spins" the reel, generating a grid of symbols (represented by 'A', 'B', 'C', 'D') in 3 rows and 3 columns.
    5. The game then checks if the symbols in each line are the same. If so, the player wins the bet multiplied by the value of the symbol.
    6. The winnings are added to the player's balance, and the player can decide to play again or quit.
    7. If the balance becomes zero, the game ends.
    8. Run the script in Node.js to play the game. Enter the inputs as prompted by the script.