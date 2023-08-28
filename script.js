//importing elements
var fetchButton = document.getElementById("fetchButton");
var weatherKey = config.weatherKey;
var cityInfo = document.getElementById("cityInfo");
var forecastContainer = document.getElementById("forecast");
var warningMessage = document.getElementById ("warningMessage");


//changes user input from city name to lat and lon, then calls getWeather
function getLatLong (cityEntered) {
    let latLongUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityEntered + "&limit=1&appid=" + weatherKey;

    fetch (latLongUrl)
    .then (function (response) {
        return response.json();
    })

    .then (function (data){
        // console.log ("longitude is " + data[0].lon);
        // console.log ("latitude is " + data[0].lat);

        getWeather(data[0].lat, data[0].lon);
    });
}

//retrieves weather information
function getWeather(lat, lon) {
    //open weather needs lat, lon, and API key.

    // console.log ("longitude is " + lon);
    // console.log ("latitude is " + lat);

    let requestURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + weatherKey + "&units=imperial";
    // console.log(requestURL);

    fetch(requestURL)
    .then (function (response){
        return response.json();
    })
    
    .then (function (data){
        console.log(data);
        printDayData(data, 0);
        
    })

    .catch (error => {
        console.log ("There was an error and location weather information was not retrieved.");
    });
}

//when user puts in a location, 
fetchButton.addEventListener("click", function () {
    if (document.getElementById("cityWeather").value != "") {
        if (!warningMessage.classList.contains("hidden")) {
            warningMessage.classList.add("hidden");
        }
        let location = document.getElementById("cityWeather");
        // console.log(location.value);
        getLatLong(location.value);

    } else {
        warningMessage.classList.remove("hidden");
    }
    
});


function printDayData (data, i) {
    console.log ("Temperature: " + data.list[i].main.temp + "\u00b0 F");
    console.log ("Humidity: " + data.list[i].main.humidity + "%");
    console.log ("Lowest Temp: " + data.list[i].main.temp_min + "\u00b0 F");
    console.log ("Highest Temp: " + data.list[i].main.temp_max + "\u00b0 F");
    console.log ("Wind Speed: " + data.list[i].wind.speed + "mph");
    console.log ("City: " + data.city.name);
    console.log (data.list[i].dt_txt);
    console.log ("Icon: " + data.list[i].weather[i].icon);
}

//initial population
getLatLong("Orlando");
