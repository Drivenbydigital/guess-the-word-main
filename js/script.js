// Global variables for selected elements
const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess-button");
const guessInput = document.querySelector(".guess-input");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining-guesses");
const remainingGuessesSpan = document.querySelector(".remaining-guesses-span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again-button");

// Starting word
const word = "magnolia";

const displayWordInProgress = function(word) {
  const wordArray = Array.from(word); // Convert word string to an array of characters
  const hiddenWord = wordArray.map(() => "●"); // Create an array of circle symbols (●) with the same length as the word
  const hiddenWordString = hiddenWord.join(""); // Join the array back to a string

  wordInProgress.innerText = hiddenWordString; // Update the innerText of wordInProgress with the hidden word symbols
};

// Call the function and pass it the word variable
displayWordInProgress(word);

guessButton.addEventListener("click", function(e) {
  e.preventDefault(); // Prevent the default form behavior

  const inputValue = guessInput.value; // Capture the value of the input
  console.log(inputValue); // Log out the captured input value
  guessInput.value = ""; // Empty the value of the input
});
