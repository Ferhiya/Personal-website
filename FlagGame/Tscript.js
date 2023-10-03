/*
document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.querySelector(".image-container");
    const randomImage = document.getElementById("random-image");
    const generateButton = document.getElementById("generate-button");
  
    const imageFolderPath = "img/"; // Replace with your image folder path
    const imageExtension = ".jpg"; // Replace with the image file extension you're using
  
    // Function to generate a random number between min and max
    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    // Function to generate a random image
    function generateRandomImage() {
      const randomImageIndex = getRandomNumber(1, 3); // Adjust the range based on your image count
      const imagePath = `${imageFolderPath}${randomImageIndex}${imageExtension}`;
      randomImage.src = imagePath;
      randomImage.alt = "Random Image";
    }
  
    generateButton.addEventListener("click", generateRandomImage);
  
    // Generate a random image on page load
    generateRandomImage();
  });
  document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("name");
    const output = document.getElementById("output");
  
    nameInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent Enter key from adding a new line
        output.textContent = `Hello, ${nameInput.value}!`;
        nameInput.value = ""; // Clear the input
      }
    });
  });*/
  const flagImg = document.getElementById("flag");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resultMessage = document.getElementById("result");


//flag array
const Flags =[
{ name:"france", src: "img/France.jpg" },
{ name:"spain",  src: "img/Spain.jpg"},
{ name:"norway", src: "img/Norway.jpg"},
]

//Create a function to generate a random flag object from the array.
function Random_flag()
{
    const RandomFlagindex=Math.floor(Math.random()*Flags.length);
    return Flags[RandomFlagindex];
}


// Create a function to display a random flag in the flag image container.
function DisplayFlag()
{
    const RandomFlag=Random_flag();
    flagImg.src=RandomFlag.src;
    flagImg.alt=RandomFlag.name;
    resultMessage.textContent = "";
}
 
//Add an event listener to the submit button to handle the user's guess.
submitButton.addEventListener("click", function () {
    const userGuess = guessInput.value;
    const currentFlag = flagImg.alt;
    
    if (userGuess.toLowerCase() === currentFlag.toLowerCase()) {
      resultMessage.textContent = `Correct! It's ${currentFlag}.`;
      
      DisplayFlag();
    } else {
      resultMessage.textContent = `Incorrect. It's ${currentFlag}.`;
      resultMessage.classList.add("message", "incorrect");
    }
    
    guessInput.value = "";
    
  });;

  DisplayFlag();




  