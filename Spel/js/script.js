
//Globala konstanter och variabler
var newGameBtn;  //referns till startsknappen
var newTilesBtn;  //referns till knappen för nya brickor
var newTilesElems; //referns till rutorna för nya brickor
var msgElem;        //referns till meddelande
var numberList;     //ska användas för att kopierar inhållet i array. 
var dragtile;    //refence till de dragna brickorna
var countGamesElem; //referar till elementet för att räkna spelomgång
var totpointsElem; //referar till elementet för att räkna poängen
var countGames=0;  //räknar antal spelomgångar
var totPoints=0;  //referar till poängen

//touch
// Global variables
var touchX, touchY; // To store touch coordinates


// Initiering av globala variabler samt händelsehanterare.

function init(){
    newGameBtn=document.getElementById("newGameBtn");
    newTilesBtn=document.getElementById("newTilesBtn"); 
    msgElem=document.getElementById("message");
    newTilesElems=document.getElementById("newTiles").getElementsByClassName("empty");
    boardElem=document.getElementById("board").getElementsByClassName("empty");

    totpointsElem=document.getElementById("totPoints");
    countGamesElem=document.getElementById("countGames");

    //hämta localstorage
    getData() 

    //document.getElementById("div1").style.pointerEvents = "none";
    //händelsehanterare för aktivering av spelet
    newGameBtn.addEventListener("click",newGame); //startar spelet 
    newTilesBtn.addEventListener("click",newTiles); //hämtar 4 nya brickor

    
    //aktivering och inaktovering av knapperna
    newGameBtn.disabled=false; //knappen för nytt spel aktiverad
	newTilesBtn.disabled=true; //knappen för nya brickor inaktiverad
    

    //touch 
     // Add touch event listeners for newTiles elements
     for (let i = 0; i < newTilesElems.length; i++) {
        newTilesElems[i].addEventListener("touchstart", touchstartTiles);
        newTilesElems[i].addEventListener("touchmove", touchmoveTiles);
        newTilesElems[i].addEventListener("touchend", touchendTiles);
    }

} // End init
window.addEventListener("load",init); // Se till att init aktiveras då sidan är inladdad


 //starta spelet
function newGame(){

    numberList=newTilesNr.slice(0); //koppierar inneållet i arrayen till Numberlist
    newGameBtn.disabled=true; //knappen för nytt spel aktiverad
    newTilesBtn.disabled=false; //knappen för nya brickor inaktiverad

 //renasar spelplanen så att en ny omgång kan börjar
    let board=document.getElementsByTagName("img");

    for (let i=0; i < board.length; i++){
        board[i].classList.add("empty"); //lägger in classen empty i rutorna i spelplanen
        board[i].classList.remove("filled"); //tar bort classen filled från rutorna i spelplanen, denna class finns med i bildbrickan som man lägger på spelrutan 
        board[i].src="img/empty.png"; //ersätter bildbrickan med en tom bild. 
    }

    //tar bort bock och kryss
    let markElem=document.getElementsByClassName("mark");
    //en loop som går genom alla element med classen mark och ersätter det med en tom textsträng, detta används för att ta bort bock och kryss.
    for (let i=0;i < markElem.length; i++){
         markElem[i].innerHTML="";
    }
    msgElem.innerHTML="";
 
}// end newGame

  //array med nya brickor
const newTilesNr=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15", "16","17","18","19","20","21","22","23","24","24","26","27","28","29","30","31","32","34","35","36","37","38","39","40"]

 //visar 4 nya slumpmässigt valda brickor
function newTiles(){
    newTilesBtn.disabled=true; //avaktiverar knappen för nya brickor

    //väljer ut fyra slummässiga bildbrickor från array
    for (let i=0; i < newTilesElems.length; i++){

        let b=Math.floor(numberList.length*Math.random());  //ger ett slumptal till numberlistan
    
        newTilesElems[i].src="img/" + numberList[b] + ".png"; //ger slump valda bilder
        newTilesElems[i].id=numberList[b]; //sprarar innehållet i vald bildbricka i newTilesElem[i].id så att datan på bildbrickan dras med när bildbrickan ska dras till spelplanen. 
    
        numberList.splice(b,1); //tar bort använda bildbrickor från array.  
     
       //händelsehanterar för drag and drop
       newTilesElems[i].addEventListener("dragstart",dragstartTiles);
       newTilesElems[i].addEventListener("dragend", dragendTiles);
       newTilesElems[i].classList.add("filled");
       newTilesElems[i].style.pointerEvents="auto";
    }


    //tar bort empty bilden i rutan för nya brickor
    var newTilesElemsTag=document.getElementById("newTiles").getElementsByTagName("img");
    //tar bort classen empty så att de kan ersättas med noll
    for (let i=0; i <newTilesElemsTag.length; i++){
        newTilesElemsTag[i].classList.remove("empty");   
    }

}//end NewTiles

 //---------------------------------------
//starts dragstartBricks
// Function to start dragging tiles
function dragstartTiles(e) {
    e.preventDefault();
    // For touch events, retrieve the touch coordinates
    if (e.type === "touchstart") {
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
    }
    e.dataTransfer.setData("text", this.id); // Set the data to be transferred
    dragtile = this; // Store the reference to the dragged tile

    // Add event listeners for touch events while dragging
    document.addEventListener("touchmove", touchmoveTiles);
    document.addEventListener("touchend", touchendTiles);
}

// Function to end dragging tiles
function dragendTiles(e) {
    e.preventDefault();
    // Remove event listeners for touch events after dragging
    document.removeEventListener("touchmove", touchmoveTiles);
    document.removeEventListener("touchend", touchendTiles);
}

// Function to handle tile movement during dragging
function touchmoveTiles(e) {
    e.preventDefault();
    // For touch events, calculate the tile movement based on touch coordinates
    let deltaX = e.touches[0].clientX - touchX;
    let deltaY = e.touches[0].clientY - touchY;
    // Move the dragged tile based on touch movement
    dragtile.style.transform = "translate(" + deltaX + "px, " + deltaY + "px)";
}

// Function to handle tile drop on the board
function tilesoverBoard(e) {
    e.preventDefault();
    // Get the data from the dragged tile
    let idNr = e.dataTransfer.getData("text");

    // Place the dragged tile on the board if dropped
    if (e.type === "drop") {
        this.src = "img/" + idNr + ".png"; // Set the image source on the board
        this.id = idNr; // Set the ID of the dropped tile on the board

        // Reset the source and class of the dragged tile
        dragtile.src = "img/empty.png";
        dragtile.classList.remove("filled");
        dragtile.classList.add("empty");

        // Remove empty class from the board tile and add filled class
        this.classList.remove("empty");
        this.classList.add("filled");
        this.style.background = ""; // Reset background color

        dragtile.style.pointerEvents = "none"; // Disable pointer events for the dragged tile
    }
    // Change background color when tile is dragged over
    if (e.type === "dragover") {
        this.style.background = "#9C9"; // Green background
    }
    // Reset background color when tile is dragged out
    if (e.type === "dragleave") {
        this.style.background = "";
    }

    // Check if all tiles on the board are filled
    let board = document.getElementById("board");
    if (board.getElementsByClassName("empty").length === 0) {
        finalCounter(); // Call function to finalize the game
    }
}

//räknar ihop poängen i slutet
function finalCounter(){
    let Points=0; //börjar räkna poängen på noll
     
     //function för att kolla om brickorna är stiggande
    for (let i= 1; i <= 8; i++){
        let marktiles=document.getElementsByClassName("s"+i);
        let markElem=document.getElementById("s"+i+"mark")
        //jämnför rader och kolumner för att avgöra om de är stiggande
        if (Number(marktiles[0].id) < Number(marktiles[1].id)&&
           Number(marktiles[1].id) < Number(marktiles[2].id) &&
           Number(marktiles[2].id) < Number(marktiles[3].id)){ 
           console.log([1].id);

           markElem.style.color="#0C0";//grön färg
           markElem.innerHTML="&#10003;";//grön check=stigande rad eller kolumn
           Points++; //räknar antalet poäng     
 
    }

    else{ markElem.innerHTML="&#10007";//rött kryss=ej stiggande rad eller kolumn
          markElem.style.color="#C00";//röd färg
    }
   
     
    } 
 
    countGames++;//räknar antalet spel omgångar
//function för att skriva ut poäng och spelomgångar
    totPoints += Points; //lägger ihop antalen poängen från en spelomgång till totalpoängen
    totpointsElem.innerHTML=totPoints; //skriver ut antalen poäng
    countGamesElem.innerHTML=countGames; //skriver ut antalet spel omgångar

//skriver ut meddelande med antal poäng
    msgElem.innerHTML=" Grattis du fick " + Points + " poäng ";
 
 //aktiverar startknappen tills spelomgången har körts klart
    newGameBtn.disabled=false;
 //avaktiverar knappen för nya brickor
    newTilesBtn.disabled=true;
 //sparar antalet poäng och antal spel så att det kan läsas av loocalstorage, ifall sidan laddas om efter man har kört spelet minst en omgång. 
    localStorage.fa223caUserinfo= totPoints + "&" + countGames;

}//end finalcounter
//---------------------------------------------

 //funktion för Localstorage
function getData() {
   
    localStorage.clear();
    if (localStorage.fa223caUserinfo) {
       let dataArr=localStorage.fa223caUserinfo.split("&"); //skapar array av spelpoängen och spelomgångerna och delar upp det.
       totPoints= Number(dataArr[0]); //läser in spelpoäng 
       countGames= Number(dataArr[1]); //läser in spelomgångar

       console.log(totPoints);
         
       totpointsElem.innerHTML=totPoints; //skriver ut sparad poäng från förragående spelomgång
       countGamesElem.innerHTML=countGames;  //skriver ut sparade spelomgångar från föregående spelomgång 


    }

    else {
        // If no data is found in local storage, reset scores to 0
        totPoints = 0;
        countGames = 0;
        totpointsElem.innerHTML = 0;
        countGamesElem.innerHTML = 0;
          
    }

    
} //end localstorage
