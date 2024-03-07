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
const currentDate = new Date();

// Array med dagar
const daysOfWeek = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];

// Hämta dagens namn (stavat ut)
const dayName = daysOfWeek[currentDate.getDay()];

const currentTime = new Date();

// Hämta timmar, minuter och sekunder
const hours = currentTime.getHours();
const minutes = currentTime.getMinutes();

// Formatera tid i HH:MM:SS-format
const formattedTime = `${hours}:${minutes}`;

var Displaydate;
var weatherImg;
var DisplayCity;

function init() {
    testElem = document.getElementById("test");
    knappar = document.getElementsByClassName("knappar");
    weatherElem = document.getElementById("väder2");
    weatherImg = document.getElementById("väder");
    Displaydate=document.getElementById("date");
    DisplayTime=document.getElementById("time");
    DisplayCity=document.getElementById("stad");

  
    for (let i = 0; i < cities.length; i++) {
        requestTemp(cities[i]);
    }

    for (let i = 0; i < knappar.length; i++) {
        knappar[i].addEventListener("click", something);
    }

}
window.addEventListener("load", init);



function sökVäder() {
    var stadsName = document.getElementById("cityInput").value;
    hämtaVäder(stadsName);
}
//Start requestTemp
function requestTemp(city) {
    
    let request = new XMLHttpRequest();
    request.open("GET", "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/" + city.lng + "/lat/" + city.lat + "/data.json");
    request.send(null);
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
            getTemp(request.responseText, city);
            }
        }
    };
}//End requestTemp

function getTemp(response, city) {
   
    response = JSON.parse(response);
    params = response.timeSeries[0].parameters;
    city.temp = params[11].values[0];
    city.precipitationCode = params[15].values[0]; // Retrieve precipitation code
console.log(params);
    // Determine weather condition
    city.conditions = getWeatherCondition(city.precipitationCode);
    visaStandardStadsVäder("stockholm")
}

function visaStandardStadsVäder(stad)
{
    hämtaVäder(stad);
   
}

function getWeatherCondition(precipitationCode) {

    switch (precipitationCode) {
        case 0:
            return "Inget nederbörd";
        case 1:
            return "Snö";
        case 2:
            return "Snö och regn";
        case 3:
            return "Regn";
        case 4:
            return "Duggregn";
        case 5:
            return "Underkylt regn";
        case 6:
            return "Underkylt duggregn";
        default:
            return "Okänd";
    }
}

function hämtaVäder(stadsName) {
    //Display dagens datum
    Displaydate.textContent= dayName + " Klockan" +formattedTime ;
    DisplayCity.textContent="Stad: "+stadsName;
    var found = false;
    
    // Sök efter staden i din cities-array
    for (var i = 0; i < cities.length; i++) {
        // Sök efter staden i din cities-array
        
        if (cities[i].name.toLowerCase() === stadsName.toLowerCase()) {

            var city = cities[i];
            var väderElement = document.getElementById("weatherInfo");

            //temp
            var väderElem = document.getElementById("temp");
            väderElem.textContent = "Temperaturen är: " + Math.round(city.temp) + "°C";

            //precipitationCode 
            // Determine weather condition
            var weatherCondition = getWeatherCondition(city.precipitationCode);
            
             // Update weather condition display
             var väderCon = document.getElementById("cond");
             väderCon.textContent = " " + weatherCondition;

             
             // Update weather image based on temperature
             updateWeatherImage(weatherCondition);
           
// Update weather image based on temperature
      
      
           
            found = true;

            return; // Avsluta sökningen när staden har hittats
        }
    }

    // Om staden inte hittades
    // If the city was not found
    if (!found) {
        var väderElement = document.getElementById("weatherInfo");
        väderElement.innerHTML = "<p>Väder information om staden finns inte</p>";
        // Clear the input field after the search
        document.getElementById("cityInput").value = "";
        return;
    }
}

// Function to update the weather image based on temperature
function updateWeatherImage(weatherCondition) {
    const imgElement = document.getElementById('Weatherimg');
    
    let imgSrc = "/img/startweather.jpg"; // Default image
    
    
    // Check weather condition and update image source accordingly
    if (weatherCondition === "Inget nederbörd") {
        imgSrc = "/img/sunnyDay.jpg"; // Rainy weather image
    } 
    else if (weatherCondition === "Snö") {
        imgSrc = "/img/ColdDays.jpg"; // Snowy weather image
    } 
    else if (weatherCondition === "Regn"){
        imgSrc = "/img/sunnyDay.jpg"; // Hot weather image
    }

    else if (weatherCondition === "Snö och regn"){
        imgSrc = "/img/sunnyDay.jpg"; // Hot weather image
    }
    else if (weatherCondition === "Duggregn"){
        imgSrc = "/img/sunnyDay.jpg"; // Hot weather image
    }
    else if (weatherCondition === "Underkylt regn"){
        imgSrc = "/img/sunnyDay.jpg"; // Hot weather image
    }
    else if (weatherCondition === "Underkylt duggregn"){
        imgSrc = "/img/sunnyDay.jpg"; // Hot weather image
    }
    

  
  
    // Update the image source
    imgElement.src = imgSrc;
  }
  
  // Example temperature value (replace this with actual temperature data)
  const temperature = 20;
  
  // Update the weather image based on the temperature
  updateWeatherImage(temperature);
  
