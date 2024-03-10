const flagImg = document.getElementById("flag");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resultMessage = document.getElementById("result");
const startButton = document.getElementById("start");
const timerDisplay = document.getElementById("timer");

// Flag array
let flags = [
    { name:"france", src: "img/France.jpg" },
    { name:"spain",  src: "img/Spain.jpg"},
    { name:"norway", src: "img/Norway.jpg"},
    { name:"russia", src: "img/Russia.jpg"},
    { name:"denmark", src: "img/Denmark.jpg"},
    { name:"sweden", src: "img/Sweden.jpg"},
    { name:"finland", src: "img/Finland.jpg"},
    { name:"italy", src: "img/Italy.png"},
    { name:"germany", src: "img/Germany.jpg"},
    { name:"great britan", src:"img/Great-Britian.jpg"},
    { name:"japan", src:"img/japan.png"},
    { name:"china", src:"img/china.jpg"},
    { name:"India", src:"img/india.png"},
    { name:"saudi arabia", src:"img/Flag_of_Saudi_Arabia.png"}
];
let startTime, endTime, timerInterval; // start timer for game
let gameStarted = false;

// Create a function to generate a random flag object from the array.
function getRandomFlag() {
    const randomIndex = Math.floor(Math.random() * flags.length);
    return flags[randomIndex];
}

// Create a function to display a random flag in the flag image container.
function displayFlag() {
    const randomFlag = getRandomFlag();
    flagImg.src = randomFlag.src;
    flagImg.alt = randomFlag.name;
    resultMessage.textContent = "";
    // Remove the displayed flag from the array
    flags = flags.filter(flag => flag !== randomFlag);
    if (flags.length === 0) {
        // If all flags have been displayed, reset the array
        flags = [...Flags];
    }
}

// Add an event listener to the start button to start the game.
startButton.addEventListener("click", function () {
    if (!gameStarted) {
        gameStarted = true;
        startTimer();
        displayFlag();
        startButton.disabled = true; // Disable start button after starting the game
    }
});

// Add an event listener to the submit button to handle the user's guess.
submitButton.addEventListener("click", function () {
    submitGuess();
});

// Listen for Enter key press on the input field
guessInput.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        submitGuess();
    }
});

function submitGuess() {
    const userGuess = guessInput.value.toLowerCase();
    const currentFlag = flagImg.alt.toLowerCase();

    if (userGuess === currentFlag) {
        resultMessage.textContent = `Correct! It's ${currentFlag}.`;
        setTimeout(function () {
            displayFlag();
            remainingChances = 3; // Reset chances for the new flag
        }, 1000);

    } else {
        remainingChances--;

        if (remainingChances > 0) {
            resultMessage.textContent = `Incorrect. You have ${remainingChances} ${remainingChances === 1 ? 'chance' : 'chances'} left. Try again.`;
            resultMessage.classList.add("message", "incorrect");
        } else {
            resultMessage.textContent = `Sorry, you're out of chances. The correct answer is ${currentFlag}.`;
            resultMessage.classList.add("message", "incorrect");
            setTimeout(function () {
                displayFlag();
                remainingChances = 3; // Reset chances for the new flag
            }, 2500);
        }
    }
    guessInput.value = "";
}

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    timerDisplay.textContent = `Time: ${elapsedTime} seconds`;
}

function stopTimer() {
    clearInterval(timerInterval);
    endTime = new Date().getTime();
    const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000);
    timerDisplay.textContent = `Total time: ${totalTimeInSeconds} seconds`;
}
