var weatherElem;
var latitude;
var longitude;
var testElem;
var knappar; //refens till tryckt knapp
let cities = [
    {name: "Älmhult", lat: 56.552421, lng: 14.137449, temp: 0, conditions: 0},
    {name: "Växjö", lat: 56.879025, lng: 14.805434, temp: 0, conditions: 0},
    {name: "Ljungby", lat: 56.832700, lng: 13.941018, temp: 0, conditions: 0},
    {name: "Kalmar", lat: 56.663177, lng: 16.356674, temp: 0, conditions: 0},
    {name: "Jönköping", lat: 57.757687, lng: 16.637028, temp: 0, conditions: 0},
    {name: "Västervik", lat: 57.781323, lng: 14.161182, temp: 0, conditions: 0},
    {name: "Värnamo", lat: 57.183132, lng: 14.047798, temp: 0, conditions: 0},
    {name: "Oskarshamn", lat: 57.265678, lng: 16.447400, temp: 0, conditions: 0},
    {name: "Nässjö", lat: 57.653020, lng: 14.696725, temp: 0, conditions: 0},
    {name: "Tranås", lat: 58.037, lng: 14.9767, temp: 0, conditions: 0},
    {name: "Vetlanda", lat: 57.427446, lng: 15.085333, temp: 0, conditions: 0},
    {name: "Öland", lat: 56.664757, lng: 16.636482, temp: 0, conditions: 0},
    {name: "Stockholm", lat: 59.325, lng: 18.05, temp: 0, conditions: 0},
    {name: "Göteborg", lat: 57.70887000, lng: 11.97456000, temp: 0, conditions: 0}
];
var weatherImg;
function init() {
    testElem = document.getElementById("test");
    knappar = document.getElementsByClassName("knappar");
    weatherElem = document.getElementById("väder2");
    weatherImg = document.getElementById("väder");
    for (let i = 0; i < cities.length; i++) {
        requestTemp(cities[i]);
    }

    for (let i = 0; i < knappar.length; i++) {
        knappar[i].addEventListener("click", something);
    }

}
window.addEventListener("load", init);

//Start requestTemp
function requestTemp(city) {
    

    let request = new XMLHttpRequest();
    request.open("GET", "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/" + city.lng + "/lat/" + city.lat + "/data.json");
    request.send(null);
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200); {
            getTemp(request.responseText, city);
            }
        }
    };
}//End requestTemp

function getTemp(response, city) {

    response = JSON.parse(response);
    params = response.timeSeries[0].parameters;
    city.temp = params[10].values[0];
    city.conditions = params[18].values[0];


}

function hämtaVäder() {
    // Hämta stadsnamnet från input-fältet
    var stadsName=document.getElementById("cityInput").value;
    var found=false;
    

    // Sök efter staden i din cities-array
    for(var i=0; i < cities.length; i++)
    {
           // Sök efter staden i din cities-array
      if (cities[i].name.toLowerCase() === stadsName.toLowerCase())
      
      {
        var city=cities[i];
        var väderElement=document.getElementById("weatherInfo");

        //temp
        var väderElem=document.getElementById("temp");
        väderElem.textContent="Temperatur: "+ Math.round(city.temp) + "°C";

        //condition
        var väderCon=document.getElementById("cond");
        väderCon.textContent="Förhållande: "+ city.conditions;
        document.getElementById("cityInput").value = "";

        found = true;
      
        return; // Avsluta sökningen när staden har hittats
      }
    }  

    // Om staden inte hittades
  
     // If the city was not found
     if (!found) {
        var väderElement=document.getElementById("weatherInfo");
        väderElement.innerHTML="<p>Väder information om staden finns inte</p>";
        // Clear the input field after the search
        document.getElementById("cityInput").value = "";
    }
}
