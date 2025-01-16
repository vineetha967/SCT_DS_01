const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class NumberGuessingGame {
  constructor() {
    this.minRange = 1;
    this.maxRange = 100;
    this.maxAttempts = 10;
    this.rounds = 0;
    this.wins = 0;
    this.targetNumber = 0;
    this.attempts = 0;
  }

  generateNumber() {
    return Math.floor(Math.random() * (this.maxRange - this.minRange + 1)) + this.minRange;
  }

  async startNewRound() {
    console.clear();
    console.log('\n=== Number Guessing Game ===');
    console.log(`Rounds Played: ${this.rounds} | Wins: ${this.wins}`);
    console.log(`\nGuess a number between ${this.minRange} and ${this.maxRange}`);
    console.log(`You have ${this.maxAttempts} attempts.\n`);
    
    this.targetNumber = this.generateNumber();
    this.attempts = 0;
    
    await this.playRound();
  }

  async playRound() {
    while (this.attempts < this.maxAttempts) {
      const guess = await this.getGuess();
      this.attempts++;

      if (isNaN(guess) || guess < this.minRange || guess > this.maxRange) {
        console.log(`\nPlease enter a valid number between ${this.minRange} and ${this.maxRange}`);
        continue;
      }

      if (guess === this.targetNumber) {
        console.log('\n🎉 Congratulations! You got it right!');
        console.log(`You won in ${this.attempts} attempts!`);
        this.wins++;
        break;
      } else {
        const remaining = this.maxAttempts - this.attempts;
        const hint = guess < this.targetNumber ? 'Too low!' : 'Too high!';
        console.log(`\n${hint} ${remaining} attempts remaining.`);
      }
    }

    if (this.attempts >= this.maxAttempts) {
      console.log(`\nGame Over! The number was ${this.targetNumber}`);
    }

    this.rounds++;
    await this.askToPlayAgain();
  }

  async getGuess() {
    return new Promise((resolve) => {
      rl.question('Enter your guess: ', (answer) => {
        resolve(parseInt(answer));
      });
    });
  }

  async askToPlayAgain() {
    const answer = await new Promise((resolve) => {
      rl.question('\nWould you like to play again? (y/n): ', resolve);
    });

    if (answer.toLowerCase() === 'y') {
      await this.startNewRound();
    } else {
      console.log(`\nFinal Score: ${this.wins} wins out of ${this.rounds} rounds`);
      console.log('Thanks for playing!\n');
      rl.close();
    }
  }
}

// Start the game
const game = new NumberGuessingGame();
game.startNewRound();