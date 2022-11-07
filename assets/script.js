var searchBtnEl = document.querySelector('.btn');

searchBtnEl.addEventListener ("click", function(event){
    event.preventDefault(); 
    var input = $('#input').val();  
    accessAPI(input);
});

//access geocode API based on user input 
function accessAPI (input) {
    var apiURL = 'http://api.openweathermap.org/geo/1.0/direct?q='+input+'&appid=31c7e1b3bd169805a458edfc303e0b06';
    fetch(apiURL)
    .then (function (response){
        if (response.ok) {
            response.json().then(function(data){
                coordinates(data);
            })}
        else {
            alert("Error");
        }
    })
    .catch (function (err) {
        alert("Error");
    })
};

//Get latitude and longitude coordinates and pass them to weather function
function coordinates (data) {
    var latitude = data[0].lat; 
    var longitude = data[0].lon; 

    weatherNow (latitude, longitude); 
    //will need to call weatherlater here 
};

//Get the weather using "call current weather data"

function weatherNow (latitude, longitude) {
   var apiURL = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=31c7e1b3bd169805a458edfc303e0b06';
   fetch (apiURL)
   .then (function(response){
    if(response.ok){
        response.json().then(function(data){
            //console.log(data);
            var city = data.name; 
            var temp = Math.round(((data.main.temp)-273.15)*(9/5)+32); //convert temp from K to F, round to nearest integer
            var humidity = data.main.humidity; // measured as a %
            var wind = data.wind.speed; // measured in mph
            var iconTag = data.weather[0].icon; 
            var iconLink = "https://openweathermap.org/img/wn/" + iconTag + "@2x.png";

            generateWeatherNow (city, temp, humidity, wind, iconLink);
        })}
    else {alert("Error")}
    })
    .catch(function(err){ alert("Error")})
};

var cityName = document.querySelector('#cityName');
var todayForecast = document.querySelector('#todayForecast');

function generateWeatherNow(city, temp, humidity, wind, iconLink){
    var heading = document.createElement('h1');
    heading.textContent = city; 
    cityName.appendChild(heading);
};


// Get the weather using forecast api for five day forecast
function weatherLater (latitude, longitude) {
    var apiURL = 'http://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&appid=31c7e1b3bd169805a458edfc303e0b06';
    fetch (apiURL)
    .then (function(response){
        if(response.ok) {
            response.json().then(function (data){
                //var temp = data[0].list.main.temp; 
                //var wind = data[0].list.main.wind.speed; 
                //var humidity = data[0].list.main.humidity; 
                //var icon = data[0].list.weather[0].icon; 
                
                console.log(data);

            });
        };
    });
};
