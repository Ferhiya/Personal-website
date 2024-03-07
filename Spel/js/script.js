
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

    // Event listeners for touch events
    for (let i = 0; i < newTilesElems.length; i++) {
        newTilesElems[i].addEventListener("touchstart", touchstartTiles);
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

//aktiveras när brickorna börjar dras
function dragstartTiles(e){   
    e.dataTransfer.setData("text",this.id); //förr över innehållet i id-taggen new bricks till rutan i board.
    dragtile=this; //överför information i dragtile till this


//handesehanterare för drag och drop eventet när brickorna släpps på vald ruta på board 
    for (let i=0; i < boardElem.length; i++){
        boardElem[i].addEventListener("dragover", tilesoverBoard);
        boardElem[i].addEventListener("drop", tilesoverBoard);
        boardElem[i].addEventListener("dragleave", tilesoverBoard);
    }


} //end dragstartTiles

//----------------------------------

 //slutar drag
function dragendTiles(e){
    e.preventDefault();

//gör så att det inte går att lägga mer än en brick åt gången på spelplanenens rutor
    let boardElem=document.getElementsByTagName("img"); 

//avslutar drag och drop eventet när brickorna släpps på vald ruta på board
    for (let i=0; i < boardElem.length; i++){
        boardElem[i].removeEventListener("dragover", tilesoverBoard);
        boardElem[i].removeEventListener("drop", tilesoverBoard);
        boardElem[i].removeEventListener("dragleave", tilesoverBoard);
    }

} //end dragendBricks

//-------------------------------------------------

 //släpper brickorna över vald ruta på board
function tilesoverBoard(e){
    e.preventDefault(); //prevents default functins
    
    //släpper brickorna över vald ruta på board
	if (e.type == "drop"){
        let idNr=e.dataTransfer.getData("text"); //läser av info i id-taggen i vald bricka
       
        this.src="img/" + idNr + ".png"; //lägger in rätt bildbricka i spelplanen med hjälp av idNr och img taggen

        this.id=idNr; //överför this informationen som finns på spelbrickan som dras till idNr så att det kan användas för att visa bildbrickan när det placeras på spelplanen 

        dragtile.src="img/empty.png"; //ersätter bildbrickan i rutan för nya brickor med en en tom bild, när bildbrickan börjar dras från rutan. 
        dragtile.classList.remove("filled"); //tar bort classen filled i rutan för nya bildbrickor när bildbrickan dras. 
        dragtile.classList.add("empty");  //lägger in classen tom så att rutan för nya bildbrickor aktiveras för en ny bildbricka.  
        this.classList.remove("empty");//tar bort classen tom på spelplanen så att det kan ersättas med bildbrickans klass som är filled som ska dras över
        this.classList.add("filled"); //fyller den tomma rutan på spelplanen med en bildbricka och classen filled som kommer med bildbrickan.  
        this.style.background=""; //tom bakgrund i spelplanensrutor  

        dragtile.style.pointerEvents="none";
	}
      //byter bakgrundsfärgen i spelplanensrutan dragover
    if (e.type == "dragover"){

       this.style.background="#9C9"; //grön bakgrund i spelplanenruta när bildbricka körs över ruta
    }
      //tar bort bakgrundsfärgen i spelrutan dragleave
    if (e.type == "dragleave"){
       this.style.background=""; 
    }

     //Skapar ny variabel för att kolla om rutorna för nya brickor är filled
    let tiles=document.getElementById("newTiles")
     //if-sats för att kolla om rutorna för nya brickor är full, om rutorna är tomma så återaktiveras knappen för nya brickor
    if (tiles.getElementsByClassName("filled").length==0){
    //aktiverar knappen för nya brickor när alla brickor är tomma
    newTilesBtn.disabled=false;
    }
     //skapar ny variabel för att kolla om rutorna på spelplanen är tomma
    let board=document.getElementById("board")
     //if-sats för att kolla om det finns någon tomruta kvar på spelplanen.
    if (board.getElementsByClassName("empty").length==0){
       finalCounter(); //anroppar function finalcounter när spelplanen är full.
    }

} //end BrickoverBoard
//----------------------------------------------------------

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
        localStorage.clear();
    }

    
} //end localstorage



//touce screens
// Function to handle touchstart event for tiles
function touchstartTiles(e) {
    e.preventDefault();
    dragtile = this;
    // Add event listeners for touch events on board elements
    for (let i = 0; i < boardElem.length; i++) {
        boardElem[i].addEventListener("touchmove", touchmoveTiles);
        boardElem[i].addEventListener("touchend", touchendTiles);
    }
}

function touchmoveTiles(e) {
    e.preventDefault();
    // Implement the necessary logic to move the tile along with the touch movement
    // You may need to update the tile's position based on touch coordinates
}


// Function to handle touchend event for tiles
function touchendTiles(e) {
    e.preventDefault();
    // Implement logic to drop the tile when touch ends
    // You may need to check if the tile is dropped within a valid drop zone
    // Similar to your existing logic for dragendTiles function
    // Remove event listeners for touchmove and touchend from board elements
    for (let i = 0; i < boardElem.length; i++) {
        boardElem[i].removeEventListener("touchmove", touchmoveTiles);
        boardElem[i].removeEventListener("touchend", touchendTiles);
    }
}