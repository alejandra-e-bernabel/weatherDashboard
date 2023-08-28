var fetchButton = document.getElementById("fetchButton");
var weatherKey = config.weatherKey;

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

fetchButton.addEventListener("click", function () {
    let location = document.getElementById("cityWeather");
    // console.log(location.value);
    getLatLong(location.value);
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
