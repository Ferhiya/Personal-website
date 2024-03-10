// script.js

// Array to store card values
const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'];

let flippedCards = [];
let matchedCards = [];
let gameStarted = false;
let timerInterval;
let startTime; // Variable to store start time
let endTime; // Variable to store end time

// Shuffle function
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Function to create memory cards
function createMemoryCards() {
  const shuffledCards = shuffle(cards);

  const gameContainer = document.querySelector('.memory-game');

  shuffledCards.forEach((value, index) => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    const content = document.createElement('div');
    content.textContent = value;

    cardContent.appendChild(content);
    card.appendChild(cardContent);
    gameContainer.appendChild(card);
  });
}

// Function to flip card
function flipCard() {
  if (!gameStarted) return;

  if (flippedCards.length < 2 && !this.classList.contains('flip')) {
    this.classList.add('flip');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkForMatch, 1000);
    }
  }
}

// Function to check for match
function checkForMatch() {
  const [card1, card2] = flippedCards;
  const value1 = card1.dataset.value;
  const value2 = card2.dataset.value;

  if (value1 === value2) {
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);
    matchedCards.push(card1, card2);
    if (matchedCards.length === cards.length) {
      // All cards matched
      clearInterval(timerInterval);
      endTime = new Date().getTime(); // Record end time when all cards are matched
      const durationInSeconds = (endTime - startTime) / 1000;
      alert(`Congratulations! You won in ${durationInSeconds} seconds!`);
    }
  } else {
    // Flip back unmatched cards
    card1.classList.remove('flip');
    card2.classList.remove('flip');
  }

  flippedCards = [];
}

// Function to start the game
function startGame() {
  gameStarted = true;
  startTime = new Date().getTime(); // Record start time when game starts
  timerInterval = setInterval(updateTimer, 1000);
  createMemoryCards();
}

// Function to update timer
function updateTimer() {
  const timerElem = document.getElementById('timer');
  const time = parseInt(timerElem.textContent.split(' ')[1]);
  timerElem.textContent = `Time: ${time + 1} seconds`;
}

// Initialize the game when Start Game button is clicked
document.getElementById('start').addEventListener('click', startGame);

