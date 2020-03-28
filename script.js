/*
Game Function:
- Player must guess a number between a min and a max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of the correct answer if lost
- Let player choose to play again
*/

// Game values

let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elements

const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");


// Assign UI min and max

minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});



// Listen for guess

guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  if (guess === winningNum) {
    // // Disable Input
    // guessInput.disabled = true;
    // // Change border color
    // guessInput.style.borderColor = "green";
    // // Set message
    // setMessage(`${winningNum} is correct, YOU WIN!`, "green");

    // Above code replaced with gameOver function
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over - lost
      // // Disable Input
      // guessInput.disabled = true;
      // // Change border color
      // guessInput.style.borderColor = "red";
      // // Set message
      // setMessage(`Game Over, you lost. The correct number was ${winningNum}`, "red");

      // Above replaced with gameOver(false)
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);

    } else {
      // Game continues - answer wrong
      // Change border color
      guessInput.style.borderColor = "red";

      // Clear Input
      guessInput.value = "";

      // Tell user guess is wrong, # guesses left
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});



// Game over function
function gameOver(won, msg) {
  let color;
  won === true ? color = "green" : color = "red";
  // Disable Input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Random winning number function
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}


