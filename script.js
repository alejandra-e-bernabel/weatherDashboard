//importing elements
var fetchButton = document.getElementById("fetchButton");
var weatherKey = config.weatherKey;
var cityInfo = document.getElementById("cityInfo");
var forecastContainer = document.getElementById("forecast");
var warningMessage = document.getElementById ("warningMessage");
var cityInfoEl = document.getElementById ("cityInfo");


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
    let date= data.list[i].dt_txt;
    let dateYear = date.substring(0,4);
    let dateMonth = date.substring(6,7);

    // changes date to spelled out month
    switch (dateMonth) {
        case "1":
            dateMonth = "January";
            break;
        case "2":
            dateMonth = "February";
            break;
        case "3":
            dateMonth = "March";
            break;
        case "4":
            dateMonth = "April";
            break;
        case "5":
            dateMonth = "May";
            break;
        case "6":
            dateMonth = "June";
            break;
        case "7":
            dateMonth = "July";
            break;
        case "8":
            dateMonth = "August";
            break;
        case "9":
            dateMonth = "September";
            break;
        case "10":
            dateMonth = "October";
            break;
        case "11":
            dateMonth = "November";
            break;
        case "12":
            dateMonth = "December";
            break;   
    }

    let dateDay = date.substring(8,10);

    console.log ("Icon: " + data.list[i].weather[i].icon);

    cityInfo.innerHTML = "<div class=\"cityHeader\" id=cityHeader></div>";

    const img = document.createElement("img");
    img.src = "https://openweathermap.org/img/wn/" + data.list[i].weather[i].icon + ".png";
    document.getElementById("cityHeader").append(img);

    document.createElement("h1");
    document.getElementById("cityHeader").innerHTML += "<h1>" + data.city.name + "</h1>";

    cityInfo.innerHTML +="<h4>" + dateMonth + " " + dateDay + ", " + dateYear + "</h4>";
    cityInfo.innerHTML += "<p>Current temperature: " + data.list[i].main.temp + "\u00b0 F</p>";
    cityInfo.innerHTML += "<p>Feels like: " + data.list[i].main.feels_like + "\u00b0 F</p>";
    cityInfo.innerHTML += "<p>Humidity: " + data.list[i].main.humidity + "%</p>";
    cityInfo.innerHTML += ("<p>Today's Low: " + data.list[i].main.temp_min + "\u00b0 F</p>");
    cityInfo.innerHTML += ("<p>Today's High: " + data.list[i].main.temp_max + "\u00b0 F</p>");

    

}

function getIcon (data, i) {

    let icon = data.list[i].weather[i].icon;
    let iconUrl = "";
    switch (data.icon) {
        case "01d": //clear sky, day
            iconUrl = "https://openweathermap.org/img/wn/01d@2x.png"
            break;

        case "02d": //few clouds, day
            iconUrl = "https://openweathermap.org/img/wn/01d@2x.png"
            break;
        
        



    }
}

//initial population
getLatLong("Orlando");


