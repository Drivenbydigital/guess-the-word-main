// Global variables for selected elements
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

// Starting word
let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8; // Maximum number of guesses

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    displayWordInProgress(word);
};

getWord();
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
        updateGuessedLetters();
        updateWordInProgress(guessedLetters);
        updateRemainingGuesses(guess); // Call the function to update remaining guesses
        checkWin();
    }
};

const updateGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.appendChild(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealedWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealedWord.push(letter.toUpperCase());
        } else {
            revealedWord.push("●");
        }
    }
    wordInProgress.innerText = revealedWord.join("");
    checkWin();
};

const updateRemainingGuesses = function (guess) {
    const wordUpper = word.toUpperCase();
    if (!wordUpper.includes(guess)) {
        message.innerText = `The word doesn't contain the letter "${guess}".`;
        remainingGuesses--;
    } else {
        message.innerText = `Good guess! The word contains the letter "${guess}".`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `<p class="highlight">Game over! The word was <span class="word">${word}</span>. Better luck next time!</p>`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};


const checkWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};


playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = []; // Empty the guessedLetters array
    guessedLettersElement.innerHTML = ""; // Clear the guessed letters from the display
    remainingGuesses = 8; // Reset remaining guesses
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`; // Update remaining guesses display
    message.innerText = ""; // Clear the message
    getWord();

guessButton.classList.remove("hide");
playAgainButton.classList.add("hide");
remainingGuessesElement.classList.remove("hide");
guessedLettersElement.classList.remove("hide");
});