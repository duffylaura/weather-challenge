var searchBtnEl = document.querySelector('.btn');

searchBtnEl.addEventListener ("click", function(event){
    event.preventDefault(); 
    var input = $('#input').val();  
    accessAPI(input);
});

//access geocode API based on user input 
function accessAPI (input) {
    var apiURL = 'https://api.openweathermap.org/geo/1.0/direct?q='+input+'&appid=31c7e1b3bd169805a458edfc303e0b06';
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
        alert("Error: "+err);
    })
};

//Get latitude and longitude coordinates and pass them to weather function
function coordinates (data) {
    var latitude = data[0].lat; 
    var longitude = data[0].lon; 

    weatherNow (latitude, longitude); 
    weatherLater(latitude, longitude);
};

//Get the weather using "call current weather data"

function weatherNow (latitude, longitude) {
   var apiURL = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=31c7e1b3bd169805a458edfc303e0b06';
   fetch (apiURL)
   .then (function(response){
    if(response.ok){
        response.json().then(function(data){
            var city = data.name; 
            var temp = Math.round(((data.main.temp)-273.15)*(1.8)+32); //convert temp from K to F, round to nearest integer
            var humidity = data.main.humidity; // measured as a %
            var wind = data.wind.speed; // measured in mph
            var iconTag = data.weather[0].icon; 
            var iconLink = "https://openweathermap.org/img/wn/" + iconTag + "@2x.png";

            generateStorage(city);
            generateWeatherNow (city, temp, humidity, wind, iconLink);
        })}
    else {alert("Error")}
    })
    .catch(function(err){ alert("Error: "+err)})
};

var storage = document.querySelector('#storage'); 
var searchedCityNames = []; 


function generateStorage(city){
    var cityStorage = JSON.parse(localStorage.getItem('storage')) || [];
    console.log(cityStorage);
    cityStorage.push(city);  
    localStorage.setItem ('storage', JSON.stringify(cityStorage));

    generateSavedSearchButtons(cityStorage); 
}

$(storage).on ('click', function(event) { //event listener; already on the page; listening on the whole div; only will do something if click on something in the div with a text content 
    event.preventDefault(); 
    clearContent(); 
    var x = event.target.textContent; 
    accessAPI(x);
});

function generateSavedSearchButtons (cityStorage) {
        for (var i=0; i < cityStorage.length; i++) {
            var button = document.createElement('button');
            button.classList.add("storageButton");
            button.textContent = cityStorage[i]; 
            storage.appendChild(button);
        };
}

var cityName = document.querySelector('#cityName');
var todayForecast = document.querySelector('#todayForecast');
var todayForecastImage = document.querySelector('#todayForecastImage');

function generateWeatherNow(city, temp, humidity, wind, iconLink){
    var heading = document.createElement('h5');
    heading.textContent = city; 
    cityName.appendChild(heading);

    var tempItem = document.createElement('li'); 
    tempItem.textContent = "Temperature: "+temp+"°F"; 
    todayForecast.appendChild(tempItem);

    var humidityItem = document.createElement('li'); 
    humidityItem.textContent = "Humidity: "+humidity+"%";
    todayForecast.appendChild(humidityItem);

    var windItem = document.createElement('li');
    windItem.textContent = "Wind: "+wind+"mph";
    todayForecast.appendChild(windItem);

    var img = document.createElement('img');
    img.src = iconLink; 
    todayForecastImage.appendChild(img);
};


// Get the weather using forecast api for five day forecast
function weatherLater (latitude, longitude) {
    var apiURL = 'https://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&appid=31c7e1b3bd169805a458edfc303e0b06';
    fetch (apiURL)
    .then (function(response){
        if(response.ok) {
            response.json().then(function (data){

                console.log(data);
                var tempDate1 = data.list[7].dt_txt;
                var date1 = tempDate1.split(' ')[0];
                var year1 = date1.split('-')[0];
                var day1 = date1.split('-').slice(1).join('/'); 
                var dateFinal1 = day1+"/"+year1;
                var temp1 = data.list[7].main.temp; 
                var wind1 = data.list[7].wind.speed; 
                var hum1 = data.list[7].main.humidity; 
                var icon1 = data.list[7].weather[0].icon; 
                var link1= "https://openweathermap.org/img/wn/"+icon1+"@2x.png";

                var tempDate2 = data.list[15].dt_txt;
                var date2 = tempDate2.split(' ')[0];
                var year2 = date2.split('-')[0];
                var day2 = date2.split('-').slice(1).join('/'); 
                var dateFinal2 = day2+"/"+year2;
                var temp2 = data.list[15].main.temp; 
                var wind2 = data.list[15].wind.speed; 
                var hum2 = data.list[15].main.humidity; 
                var icon2 = data.list[15].weather[0].icon; 
                var link2= "https://openweathermap.org/img/wn/"+icon2+"@2x.png";

                var tempDate3 = data.list[23].dt_txt;
                var date3 = tempDate3.split(' ')[0];
                var year3 = date3.split('-')[0];
                var day3 = date3.split('-').slice(1).join('/'); 
                var dateFinal3 = day3+"/"+year3;
                var temp3 = data.list[23].main.temp; 
                var wind3 = data.list[23].wind.speed; 
                var hum3 = data.list[23].main.humidity; 
                var icon3 = data.list[23].weather[0].icon; 
                var link3= "https://openweathermap.org/img/wn/"+icon3+"@2x.png";

                var tempDate4 = data.list[31].dt_txt;
                var date4 = tempDate4.split(' ')[0];
                var year4 = date4.split('-')[0];
                var day4 = date4.split('-').slice(1).join('/'); 
                var dateFinal4 = day4+"/"+year4;
                var temp4 = data.list[31].main.temp; 
                var wind4 = data.list[31].wind.speed; 
                var hum4 = data.list[31].main.humidity; 
                var icon4 = data.list[31].weather[0].icon; 
                var link4= "https://openweathermap.org/img/wn/"+icon4+"@2x.png";

                var tempDate5 = data.list[39].dt_txt;
                var date5 = tempDate5.split(' ')[0];
                var year5 = date5.split('-')[0];
                var day5 = date5.split('-').slice(1).join('/'); 
                var dateFinal5 = day5+"/"+year5;
                var temp5 = data.list[39].main.temp; 
                var wind5 = data.list[39].wind.speed; 
                var hum5 = data.list[39].main.humidity; 
                var icon5 = data.list[39].weather[0].icon; 
                var link5= "https://openweathermap.org/img/wn/"+icon5+"@2x.png";

                generateWeatherLater (temp1, temp2, temp3, temp4, temp5, wind1, wind2, wind3, wind4, wind5, hum1, hum2, hum3, hum4, hum5, link1, link2, link3, link4, link5, dateFinal1, dateFinal2, dateFinal3, dateFinal4, dateFinal5);
            })}
        else {alert("Error")}
        })
        .catch(function(err){alert("Error: "+err)})
};

//id = day1 it is a header (for the date)
var header1 = document.querySelector('#day1');
//id=forecast1 it is a ul to append the list items 
var ul1 = document.querySelector('#forecast1');
//id=image1 for the icon
var image1 = document.querySelector('#image1');
//
var header2 = document.querySelector('#day2');
var ul2 = document.querySelector('#forecast2');
var image2 = document.querySelector('#image2');
//
var header3 = document.querySelector('#day3');
var ul3 = document.querySelector('#forecast3');
var image3 = document.querySelector('#image3');
//
var header4 = document.querySelector('#day4');
var ul4 = document.querySelector('#forecast4');
var image4 = document.querySelector('#image4');
//
var header5 = document.querySelector('#day5');
var ul5 = document.querySelector('#forecast5');
var image5 = document.querySelector('#image5');

function generateWeatherLater (temp1, temp2, temp3, temp4, temp5, wind1, wind2, wind3, wind4, wind5, hum1, hum2, hum3, hum4, hum5, link1, link2, link3, link4, link5, dateFinal1, dateFinal2, dateFinal3, dateFinal4, dateFinal5){
   
    // Day 1 //

    var heading1 = document.createElement('h6');
    heading1.textContent = dateFinal1; 
    header1.appendChild(heading1);

    var tempItem1 = document.createElement('li'); 
    tempItem1.textContent = "Temperature: "+temp1+"°F"; 
    ul1.appendChild(tempItem1);

    var humidityItem1 = document.createElement('li'); 
    humidityItem1.textContent = "Humidity: "+hum1+"%";
    ul1.appendChild(humidityItem1);

    var windItem1 = document.createElement('li');
    windItem1.textContent = "Wind: "+wind1+"mph";
    ul1.appendChild(windItem1);

    var img1 = document.createElement('img');
    img1.src = link1; 
    image1.appendChild(img1);

    // Day 2 //

    var heading2 = document.createElement('h6');
    heading2.textContent = dateFinal2; 
    header2.appendChild(heading2);

    var tempItem2 = document.createElement('li'); 
    tempItem2.textContent = "Temperature: "+temp2+"°F"; 
    ul2.appendChild(tempItem2);

    var humidityItem2 = document.createElement('li'); 
    humidityItem2.textContent = "Humidity: "+hum2+"%";
    ul2.appendChild(humidityItem2);

    var windItem2 = document.createElement('li');
    windItem2.textContent = "Wind: "+wind2+"mph";
    ul2.appendChild(windItem2);

    var img2 = document.createElement('img');
    img2.src = link2; 
    image2.appendChild(img2);

    // Day 3 //

    var heading3 = document.createElement('h6');
    heading3.textContent = dateFinal3; 
    header3.appendChild(heading3);

    var tempItem3 = document.createElement('li'); 
    tempItem3.textContent = "Temperature: "+temp3+"°F"; 
    ul3.appendChild(tempItem3);

    var humidityItem3 = document.createElement('li'); 
    humidityItem3.textContent = "Humidity: "+hum3+"%";
    ul3.appendChild(humidityItem3);

    var windItem3 = document.createElement('li');
    windItem3.textContent = "Wind: "+wind3+"mph";
    ul3.appendChild(windItem3);

    var img3 = document.createElement('img');
    img3.src = link3; 
    image3.appendChild(img3);

    // Day 4 //

    var heading4 = document.createElement('h6');
    heading4.textContent = dateFinal4; 
    header4.appendChild(heading4);

    var tempItem4 = document.createElement('li'); 
    tempItem4.textContent = "Temperature: "+temp4+"°F"; 
    ul4.appendChild(tempItem4);

    var humidityItem4 = document.createElement('li'); 
    humidityItem4.textContent = "Humidity: "+hum4+"%";
    ul4.appendChild(humidityItem4);

    var windItem4 = document.createElement('li');
    windItem4.textContent = "Wind: "+wind4+"mph";
    ul4.appendChild(windItem4);

    var img4 = document.createElement('img');
    img4.src = link4; 
    image4.appendChild(img4);

    // Day 5 //

    var heading5 = document.createElement('h6');
    heading5.textContent = dateFinal5; 
    header5.appendChild(heading5);

    var tempItem5 = document.createElement('li'); 
    tempItem5.textContent = "Temperature: "+temp5+"°F"; 
    ul5.appendChild(tempItem5);

    var humidityItem5 = document.createElement('li'); 
    humidityItem5.textContent = "Humidity: "+hum5+"%";
    ul5.appendChild(humidityItem5);

    var windItem5 = document.createElement('li');
    windItem5.textContent = "Wind: "+wind5+"mph";
    ul5.appendChild(windItem5);

    var img5 = document.createElement('img');
    img5.src = link5; 
    image5.appendChild(img5);

}

function clearContent() {
    cityName.innerHTML = "";
    todayForecast.innerHTML = "";
    todayForecastImage.innerHTML = "";
    header1.innerHTML = "";
    ul1.innerHTML=""; 
    image1.innerHTML=""; 
    header2.innerHTML = "";
    ul2.innerHTML=""; 
    image2.innerHTML=""; 
    header3.innerHTML = "";
    ul3.innerHTML=""; 
    image3.innerHTML=""; 
    header4.innerHTML = "";
    ul4.innerHTML=""; 
    image4.innerHTML=""; 
    header5.innerHTML = "";
    ul5.innerHTML=""; 
    image5.innerHTML=""; 
    storage.innerHTML="";
}