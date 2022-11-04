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

function coordinates(input) {
    var apiURL = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}'
}