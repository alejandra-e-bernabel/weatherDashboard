//importing elements
var fetchButton = document.getElementById("fetchButton");
var weatherKey = config.weatherKey;
var cityInfo = document.getElementById("cityInfo");
var forecastContainer = document.getElementById("forecast");
var warningMessage = document.getElementById ("warningMessage");
var cityInfoEl = document.getElementById ("cityInfo");
var forecastEl = document.getElementById ("forecast");


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
        printForecastCards(data);
        
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

        //code to store current search object into previous search array.
        let currHistory = JSON.parse(localStorage.getItem("searchHistory"));
        console.log("current history is "+ currHistory);
 
        currHistory.push(location.value);

        localStorage.setItem("searchHistory", JSON.stringify(currHistory));
        console.log("current history is "+ currHistory);



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

    //changes month from number to spelled out month
    dateMonth = getMonth(dateMonth);

    let dateDay = date.substring(8,10);

    // console.log ("Icon: " + data.list[i].weather[i].icon);

    cityInfo.innerHTML = "<div class=\"cityHeader\" id=cityHeader></div>";

    const img = document.createElement("img");
    img.src = "https://openweathermap.org/img/wn/" + data.list[i].weather[i].icon + ".png";
    document.getElementById("cityHeader").append(img);

    // document.createElement("h1");
    document.getElementById("cityHeader").innerHTML += "<h1>" + data.city.name + "</h1>";

    cityInfo.innerHTML +="<h4>" + dateMonth + " " + dateDay + ", " + dateYear + "</h4>";
    cityInfo.innerHTML += "<p>Current temperature: " + data.list[i].main.temp + "\u00b0 F</p>";
    cityInfo.innerHTML += "<p>Feels like: " + data.list[i].main.feels_like + "\u00b0 F</p>";
    cityInfo.innerHTML += "<p>Humidity: " + data.list[i].main.humidity + "%</p>";
    cityInfo.innerHTML += "<p>Today's Low: " + data.list[i].main.temp_min + "\u00b0 F</p>";
    cityInfo.innerHTML += "<p>Today's High: " + data.list[i].main.temp_max + "\u00b0 F</p>";
    cityInfo.innerHTML += "<p>Wind Speed: " + data.list[i].wind.speed + "mph</p>";

}

function printForecastCards (data) {
    //will grab only data indices for future days at 12:00pm.
    let forecastDays = [5, 13, 21, 29, 37];

    forecastEl.innerHTML = "";

    for (i=0 ; i<forecastDays.length; i++) {
        const forecastCard = document.createElement("div");

        let date= data.list[forecastDays[i]].dt_txt;
        let dateYear = date.substring(0,4);
        let dateMonth = date.substring(6,7);

        //changes month from number to spelled out month
        dateMonth = getMonth(dateMonth);

        let dateDay = date.substring(8,10);

        const forecastCardHeader = document.createElement("div");
        forecastCardHeader.classList.add("forecastCardHeader");
        forecastCardHeader.id = "forecastCardHeader";
        forecastCard.append(forecastCardHeader);

        let forecastImg = document.createElement("img");
        forecastImg.src = "https://openweathermap.org/img/wn/" + data.list[forecastDays[i]].weather[0].icon + ".png";

        //adds image and date to forecastCardHeader
        forecastCardHeader.append(forecastImg);
        forecastCardHeader.innerHTML += "<h5>" + dateMonth + " " + dateDay + ", " + dateYear + "</h5>";
        
        forecastCard.innerHTML += "<p>Temperature: " + data.list[forecastDays[i]].main.temp + "\u00b0 F</p>";
        // forecastCard.innerHTML += "<p>Feels like: " + data.list[forecastDays[i]].main.feels_like + "\u00b0 F</p>";
        forecastCard.innerHTML += "<p>Humidity: " + data.list[forecastDays[i]].main.humidity + "%</p>";
        // forecastCard.innerHTML += "<p>Low: " + data.list[forecastDays[i]].main.temp_min + "\u00b0 F</p>";
        // forecastCard.innerHTML += "<p>High: " + data.list[forecastDays[i]].main.temp_max + "\u00b0 F</p>";
        forecastCard.innerHTML += "<p>Wind Speed: " + data.list[forecastDays[i]].wind.speed + "mph</p>";

        forecastCard.classList.add("forecastCard");

        document.getElementById("forecast").appendChild(forecastCard);
    }
}

function getMonth (dateMonth) {

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

    return dateMonth;
}

//initial population
getLatLong("Orlando");
let previousSearches = [];
localStorage.setItem("searchHistory", JSON.stringify(previousSearches));


