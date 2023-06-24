// Global variables for selected elements
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining-span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

// Starting word
const word = "magnolia";
const guessedLetters = [];

// Display our symbols as placeholders for the chosen word's letters

const displayWordInProgress = function (word) {
    const wordArray = Array.from(word); // Convert word string to an array of characters
    const hiddenWord = wordArray.map(() => "●"); // Create an array of circle symbols (●) with the same length as the word
    const hiddenWordString = hiddenWord.join(""); // Join the array back to a string

    wordInProgress.innerText = hiddenWordString; // Update the innerText of wordInProgress with the hidden word symbols
};

// Call the function and pass it the word variable
displayWordInProgress(word);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  // Empty message paragraph
  message.innerText = "";
  
  const guess = letterInput.value;
  
  const goodGuess = validateInput(guess);

  if (goodGuess) {
    
    makeGuess(guess);
  }
  letterInput.value = "";
});


const validateInput = function (input) {
        const acceptedLetter = /[a-zA-Z]/; // Regular expression to match a single alphabetical character

        if (input === "") {
            // Empty input
            console.log("Please enter a letter.");
        } else if (input.length > 1) {
            // More than one letter
            console.log("Please enter only one letter.");
        } else if (!input.match(acceptedLetter)) {
            // Non-letter character
            console.log("Please enter a valid letter.");
        } else {
            // Valid input: Single alphabetical character
            return input;
        }
    };

    const makeGuess = function (guess) {
        guess = guess.toUpperCase();
        if (guessedLetters.includes(guess)) {
            message.innerText = "You already guessed that letter, silly. Try again.";
        } else {
            guessedLetters.push(guess);
            console.log(guessedLetters);
        }
    };