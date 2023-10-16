
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




  