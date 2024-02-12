
const flagImg = document.getElementById("flag");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resultMessage = document.getElementById("result");


//flag array
const Flags =[
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
{ name:"saudi arabia", src:"img/Flag_of_Saudi_Arabia.png"},
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
let remainingChances = 3;

submitButton.addEventListener("click", function () {
  const userGuess = guessInput.value.toLowerCase();
  const currentFlag = flagImg.alt.toLowerCase();
  
  if (userGuess === currentFlag) {
    resultMessage.textContent = `Correct! It's ${currentFlag}.`;

    setTimeout(function()
    {
      DisplayFlag();
      remainingChances = 3; // Reset chances for the new flag
    },1000);
   
  } else {
    remainingChances--;

    if (remainingChances > 0) {
      resultMessage.textContent = `Incorrect. You have ${remainingChances} ${remainingChances === 1 ? 'chance' : 'chances'} left. Try again.`;
      resultMessage.classList.add("message", "incorrect");
    } else {
      resultMessage.textContent = `Sorry, you're out of chances. The correct answer is ${currentFlag}.`;
      resultMessage.classList.add("message", "incorrect");
      setTimeout(function()
      {
        DisplayFlag();
        remainingChances = 3; // Reset chances for the new flag
      },2500);
      

    }
  }
  guessInput.value="";
});

  DisplayFlag();




  