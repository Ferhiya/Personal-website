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
    {name: "Göteborg", lat: 57.70887000, lng: 11.97456000, temp: 0, conditions: 0},
    {name: "Västerås", lat: 59.611366, lng: 16.545025, temp: 0, conditions: 0},
    {name: "Uppsala", lat: 59.858562, lng: 17.638927, temp: 0, conditions: 0},
    {name: "Malmö", lat: 55.6050, lng: 13.0038, temp: 0, conditions: 0},
    {name: "Linköping", lat: 58.410807, lng: 15.621372, temp: 0, conditions: 0},
    {name: "Helsingborg", lat: 56.0465, lng: 12.6944, temp: 0, conditions: 0},
    {name: "Norrköping", lat: 58.5877, lng: 16.1924, temp: 0, conditions: 0},
    {name: "Lund", lat: 55.7047, lng: 13.1910, temp: 0, conditions: 0},
    {name: "Umeå", lat: 63.8258, lng: 20.2630, temp: 0, conditions: 0},
    {name: "Halmstad", lat: 56.6745, lng: 12.8568, temp: 0, conditions: 0},
    {name: "Eskilstuna", lat: 59.3666, lng: 16.5077, temp: 0, conditions: 0},
    {name: "Alingsås", lat: 57.9301, lng: 12.5330, temp: 0, conditions: 0},
    {name: "Arboga", lat: 59.3939, lng: 15.8409, temp: 0, conditions: 0},
    {name: "Arvika", lat: 59.6551, lng: 12.5886, temp: 0, conditions: 0},
    {name: "Askersund", lat: 58.9960, lng: 14.9107, temp: 0, conditions: 0},
    {name: "Avesta", lat: 60.1442, lng: 16.1674, temp: 0, conditions: 0},
    {name: "Boden", lat: 65.8252, lng: 21.6883, temp: 0, conditions: 0},
    {name: "Bollnäs", lat: 61.3527, lng: 16.3989, temp: 0, conditions: 0},
    {name: "Borgholm", lat: 56.8792, lng: 16.6608, temp: 0, conditions: 0},
    {name: "Borlänge", lat: 60.4842, lng: 15.4331, temp: 0, conditions: 0},
    {name: "Borås", lat: 57.7210, lng: 12.9393, temp: 0, conditions: 0},
    {name: "Båstad", lat: 56.4283, lng: 12.8333, temp: 0, conditions: 0},
    {name: "Eksjö", lat: 57.6586, lng: 14.9694, temp: 0, conditions: 0},
    {name: "Enköping", lat: 59.6379, lng: 17.0845, temp: 0, conditions: 0},
    {name: "Eslöv", lat: 55.8409, lng: 13.3032, temp: 0, conditions: 0},
    {name: "Fagersta", lat: 59.9984, lng: 15.8024, temp: 0, conditions: 0},
    {name: "Falkenberg", lat: 56.9023, lng: 12.4913, temp: 0, conditions: 0},
    {name: "Falköping", lat: 58.1776, lng: 13.5539, temp: 0, conditions: 0},
    {name: "Falsterbo", lat: 55.4019, lng: 12.8299, temp: 0, conditions: 0},
    {name: "Falun", lat: 60.6057, lng: 15.6256, temp: 0, conditions: 0},
    {name: "Filipstad", lat: 59.7190, lng: 14.1713, temp: 0, conditions: 0},
    {name: "Flen", lat: 59.0553, lng: 16.5869, temp: 0, conditions: 0},
    {name: "Gränna", lat: 58.0437, lng: 14.4549, temp: 0, conditions: 0},
    {name: "Gävle", lat: 60.6745, lng: 17.1411, temp: 0, conditions: 0},
    {name: "Hagfors", lat: 60.0362, lng: 13.6940, temp: 0, conditions: 0},
    {name: "Haparanda", lat: 65.8409, lng: 24.1284, temp: 0, conditions: 0},
    {name: "Hedemora", lat: 60.2756, lng: 15.9943, temp: 0, conditions: 0},
    {name: "Hjo", lat: 58.3064, lng: 14.2752, temp: 0, conditions: 0},
    {name: "Hudiksvall", lat: 61.7297, lng: 17.1032, temp: 0, conditions: 0},
    {name: "Huskvarna", lat: 57.7867, lng: 14.2632, temp: 0, conditions: 0},
    {name: "Härnösand", lat: 62.6323, lng: 17.9377, temp: 0, conditions: 0},
    {name: "Hässleholm", lat: 56.1582, lng: 13.7627, temp: 0, conditions: 0},
    {name: "Höganäs", lat: 56.2006, lng: 12.5601, temp: 0, conditions: 0},
    {name: "Kiruna", lat: 67.8557, lng: 20.2252, temp: 0, conditions: 0},
    {name: "Kramfors", lat: 62.9290, lng: 17.7430, temp: 0, conditions: 0},
    {name: "Kristianstad", lat: 56.0313, lng: 14.1524, temp: 0, conditions: 0},
    {name: "Kristinehamn", lat: 59.3093, lng: 14.1080, temp: 0, conditions: 0},
    {name: "Kumla", lat: 59.1256, lng: 15.1386, temp: 0, conditions: 0},
    {name: "Kungsbacka", lat: 57.4869, lng: 12.0766, temp: 0, conditions: 0},
    {name: "Kungälv", lat: 57.8727, lng: 11.9768, temp: 0, conditions: 0},
    {name: "Köping", lat: 59.5073, lng: 15.9960, temp: 0, conditions: 0},
    {name: "Laholm", lat: 56.5003, lng: 13.0406, temp: 0, conditions: 0},
    {name: "Landskrona", lat: 55.8709, lng: 12.8306, temp: 0, conditions: 0},
    {name: "Lidköping", lat: 58.5051, lng: 13.1576, temp: 0, conditions: 0},
    {name: "Lindesberg", lat: 59.6133, lng: 15.2190, temp: 0, conditions: 0},
    {name: "Luleå", lat: 65.5848, lng: 22.1567, temp: 0, conditions: 0},
    {name: "Lycksele", lat: 64.5942, lng: 18.6887, temp: 0, conditions: 0},
    {name: "Lysekil", lat: 58.2777, lng: 11.4417, temp: 0, conditions: 0},
    {name: "Mariestad", lat: 58.7094, lng: 13.8264, temp: 0, conditions: 0},
    {name: "Marstrand", lat: 57.8887, lng: 11.5730, temp: 0, conditions: 0},
    {name: "Mjölby", lat: 58.3251, lng: 15.1269, temp: 0, conditions: 0},
    {name: "Motala", lat: 58.5370, lng: 15.0366, temp: 0, conditions: 0},
    {name: "Mölndal", lat: 57.6584, lng: 12.0071, temp: 0, conditions: 0},
    {name: "Nora", lat: 59.5215, lng: 15.0503, temp: 0, conditions: 0},
    {name: "Norrtälje", lat: 59.7584, lng: 18.7015, temp: 0, conditions: 0},
    {name: "Nybro", lat: 56.7515, lng: 15.9051, temp: 0, conditions: 0},
    {name: "Nyköping", lat: 58.7489, lng: 17.0015, temp: 0, conditions: 0},
    {name: "Nynäshamn", lat: 58.9030, lng: 17.9479, temp: 0, conditions: 0},
    {name: "Sala", lat: 59.9209, lng: 16.6045, temp: 0, conditions: 0},
    {name: "Sandviken", lat: 60.6214, lng: 16.7758, temp: 0, conditions: 0},
    {name: "Sigtuna", lat: 59.6176, lng: 17.7227, temp: 0, conditions: 0},
    {name: "Simrishamn", lat: 55.5570, lng: 14.3490, temp: 0, conditions: 0},
    {name: "Skara", lat: 58.3895, lng: 13.5166, temp: 0, conditions: 0},
    {name: "Skellefteå", lat: 64.7505, lng: 20.9528, temp: 0, conditions: 0},
    {name: "Skänninge", lat: 58.2500, lng: 15.3167, temp: 0, conditions: 0},
    {name: "Skövde", lat: 58.3926, lng: 13.8451, temp: 0, conditions: 0},
    {name: "Sollefteå", lat: 63.1692, lng: 17.2750, temp: 0, conditions: 0},
    {name: "Strängnäs", lat: 59.3776, lng: 17.0092, temp: 0, conditions: 0},
    {name: "Strömstad", lat: 58.9381, lng: 11.1825, temp: 0, conditions: 0},
    {name: "Sundsvall", lat: 62.3908, lng: 17.3069, temp: 0, conditions: 0},
    {name: "Säffle", lat: 59.1301, lng: 12.9353, temp: 0, conditions: 0},
    {name: "Säter", lat: 60.3360, lng: 15.7282, temp: 0, conditions: 0},
    {name: "Sävsjö", lat: 57.4926, lng: 14.6683, temp: 0, conditions: 0},
    {name: "Söderhamn", lat: 61.3019, lng: 17.0629, temp: 0, conditions: 0},
    {name: "Söderköping", lat: 58.4867, lng: 16.3152, temp: 0, conditions: 0},
    {name: "Södertälje", lat: 59.1957, lng: 17.6253, temp: 0, conditions: 0},
    {name: "Sölvesborg", lat: 56.0500, lng: 14.5852, temp: 0, conditions: 0},
    {name: "Tidaholm", lat: 58.2297, lng: 13.9417, temp: 0, conditions: 0},
    {name: "Torshälla", lat: 59.4044, lng: 16.5269, temp: 0, conditions: 0},
    {name: "Trelleborg", lat: 55.3752, lng: 13.1569, temp: 0, conditions: 0},
    {name: "Trollhättan", lat: 58.2839, lng: 12.2882, temp: 0, conditions: 0},
    {name: "Trosa", lat: 58.9036, lng: 17.5569, temp: 0, conditions: 0},
    {name: "Uddevalla", lat: 58.3471, lng: 11.9414, temp: 0, conditions: 0},
    {name: "Ulricehamn", lat: 57.7895, lng: 13.4433, temp: 0, conditions: 0},
    {name: "Vadstena", lat: 58.4495, lng: 14.9004, temp: 0, conditions: 0},
    {name: "Varberg", lat: 57.1071, lng: 12.2521, temp: 0, conditions: 0},
    {name: "Vimmerby", lat: 57.6654, lng: 15.8582, temp: 0, conditions: 0},
    {name: "Visby", lat: 57.6406, lng: 18.2960, temp: 0, conditions: 0},
    {name: "Vänersborg", lat: 58.3742, lng: 12.3235, temp: 0, conditions: 0},
    {name: "Åhus", lat: 55.9230, lng: 14.3050, temp: 0, conditions: 0},
    {name: "Åmål", lat: 59.0540, lng: 12.7183, temp: 0, conditions: 0},
    {name: "Ängelholm", lat: 56.2426, lng: 12.8622, temp: 0, conditions: 0},
    {name: "Örebro", lat: 59.2753, lng: 15.2134, temp: 0, conditions: 0},
    {name: "Öregrund", lat: 60.3523, lng: 18.7114, temp: 0, conditions: 0},
    {name: "Örnsköldsvik", lat: 63.2850, lng: 18.7153, temp: 0, conditions: 0},
    {name: "Östersund", lat: 63.1792, lng: 14.6351, temp: 0, conditions: 0},
    {name: "Östhammar", lat: 60.2390, lng: 18.3143, temp: 0, conditions: 0}
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
var DisplayTime;
var tempElem;
var condElem;

function init() {
    testElem = document.getElementById("test");
    knappar = document.getElementsByClassName("knappar");
    weatherElem = document.getElementById("väder2");
    weatherImg = document.getElementById("väder");
    Displaydate=document.getElementById("date");
    DisplayTime=document.getElementById("time");
    DisplayCity=document.getElementById("stad");
    tempElem=document.getElementById("temp");
    condElem=document.getElementById("cond");
  
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
    console.log(stadsName);
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

    // Find the parameter values by their names
    for (let param of params) {
        if (param.name === "t") {
            city.temp = param.values[0];
        } else if (param.name === "pcat") {
            city.precipitationCode = param.values[0];
        }
    }

    // Determine weather condition
    city.conditions = getWeatherCondition(city.precipitationCode);
    
    // Update weather display for Stockholm (You may want to change this)
    visaStandardStadsVäder("stockholm");

    console.log(params);
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
    // Update the time
    console.log(stadsName);
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const formattedTime = `${hours}:${minutes}`;
    DisplayTime.textContent = "Klockan " + formattedTime;
   
    //Display dagens datum
    Displaydate.textContent= dayName;
    DisplayCity.textContent="Stad: "+stadsName;
    var found = false;
    
    // Sök efter staden i din cities-array
    for (var i = 0; i < cities.length; i++) {
        // Sök efter staden i din cities-array
        var väderElement = document.getElementById("wrongCityname");
        väderElement.textContent = " ";
        if (cities[i].name.toLowerCase() === stadsName.toLowerCase()) {

            var city = cities[i];
            var väderElement = document.getElementById("weatherInfo");

            //temp
           
              if (tempElem !== null) {
                tempElem.textContent = "Temperaturen är: " + Math.round(city.temp) + "°C";
            }

            //precipitationCode 
            // Determine weather condition
            var weatherCondition = getWeatherCondition(city.precipitationCode);
            
             // Update weather condition display
           
             condElem.textContent = " " + weatherCondition;

             
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
        //clear temp and condtion
       
        tempElem.textContent = " ";

      
        condElem.textContent = " ";

        var väderElement = document.getElementById("wrongCityname");
    
        väderElement.innerHTML = "<p>Väder information om staden finns inte</p>";
        väderElement.style.display = "block"; // Show the error message
    
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
  
