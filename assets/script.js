var input = document.querySelector('#input');
var searchBtn = document.querySelector('#searchBtn');
var storage = document.querySelector('#storage');
var cityName = document.querySelector ('#cityName');
var todayForecast = document.querySelector('#todayForecast');
var day1 = document.querySelector('#day1');
var forecast1 = document.querySelector('#forecast1');
var day2 = document.querySelector('#day2');
var forecast2 = document.querySelector('#forecast2');
var day3 = document.querySelector('#day3');
var forecast3 = document.querySelector('#forecast3');
var day4 = document.querySelector('#day4');
var forecast4 = document.querySelector('#forecast4');
var day5 = document.querySelector('#day5');
var forecast5 = document.querySelector('#forecast5');

//access geocode API based on user input 

function accessAPI (input) {
    var apiURL = `http://api.openweathermap.org/geo/1.0/direct?q={${input}}&limit={limit}&appid={31c7e1b3bd169805a458edfc303e0b06}`
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

    weather (latitude, longitude); 
};

// Get the weather using forecast api 
function weather (latitude, longitude) {
    var apiURL = `api.openweathermap.org/data/2.5/forecast?lat={${latitude}}&lon={${longitude}}&appid={31c7e1b3bd169805a458edfc303e0b06}`
    fetch (apiURL)
    .then (function(response){
        if(response.ok) {
            response.json().then(function (data){
                var temp = data[0].list.main.temp; 
                var wind = data[0].list.main.wind.speed; 
                var humidity = data[0].list.main.humidity; 
                var icon = data[0].list.weather.icon; 
                
                console.log (temp); 
                console.log(wind);
                console.log(humidity); 
                console.log(icon);

            });
        };
    });
};

function init () {
accessAPI("Paris");};

init(); 