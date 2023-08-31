//importing elements
var fetchButton = document.getElementById("fetchButton");
var cityInfo = document.getElementById("cityInfo");
var forecastContainer = document.getElementById("forecast");
var warningMessage = document.getElementById ("warningMessage");
var cityInfoEl = document.getElementById ("cityInfo");
var forecastEl = document.getElementById ("forecast");


//changes user input from city name to lat and lon, then calls getWeather
function getLatLong (cityEntered) {
    let latLongUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityEntered + "&limit=1&appid=706edb09d7da2e400737ec394e01c5cb";

    fetch (latLongUrl)
    .then (function (response) {
        return response.json();
    })

    .then (function (data){
        getWeather(data[0].lat, data[0].lon);
    });
}

//retrieves weather information
function getWeather(lat, lon) {
    //open weather needs lat, lon, and API key.
    let requestURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=706edb09d7da2e400737ec394e01c5cb&units=imperial";

    fetch(requestURL)
    .then (function (response){
        return response.json();
    })
    
    .then (function (data){
        printDayData(data, 0);
        printForecastCards(data);
        
    })

    .catch (error => {
        console.log ("There was an error and location weather information was not retrieved.");
    });
}

//when user puts in a location, get latitude and longitude and populate the search history
fetchButton.addEventListener("click", function () {
    if (document.getElementById("cityWeather").value != "") {
        if (!warningMessage.classList.contains("hidden")) {
            warningMessage.classList.add("hidden");
        }

        let location = document.getElementById("cityWeather");
        getLatLong(location.value);

        //code to store current search object into previous search array.
        let currHistory = JSON.parse(localStorage.getItem("searchHistory")); 
        currHistory.push(location.value);
        localStorage.setItem("searchHistory", JSON.stringify(currHistory));

        populatePreviousSearches();

    } else {
        warningMessage.classList.remove("hidden");
    }
    
});


function printDayData (data, i) {
    let date= data.list[i].dt_txt;
    let dateYear = date.substring(0,4);
    let dateMonth = date.substring(6,7);

    //changes month from number to spelled out month
    dateMonth = getMonth(dateMonth);

    let dateDay = date.substring(8,10);

    cityInfo.innerHTML = "<div class=\"cityHeader\" id=cityHeader></div>";

    const img = document.createElement("img");
    img.src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
    document.getElementById("cityHeader").append(img);

    document.getElementById("cityHeader").innerHTML += "<h1>" + data.city.name + "</h1>";

    cityInfo.innerHTML +="<h4>" + dateMonth + " " + dateDay + ", " + dateYear + "</h4>";
    cityInfo.innerHTML += "<p class=p><b>Current temperature:</b> " + data.list[i].main.temp + "\u00b0 F</p>";
    cityInfo.innerHTML += "<p class=p><b>Feels like:</b> " + data.list[i].main.feels_like + "\u00b0 F</p>";
    cityInfo.innerHTML += "<p class=p><b>Humidity:</b> " + data.list[i].main.humidity + "%</p>";
    cityInfo.innerHTML += "<p class=p><b>Today's Low:</b> " + data.list[i].main.temp_min + "\u00b0 F</p>";
    cityInfo.innerHTML += "<p class=p><b>Today's High:</b> " + data.list[i].main.temp_max + "\u00b0 F</p>";
    cityInfo.innerHTML += "<p class=p><b>Wind Speed:</b> " + data.list[i].wind.speed + "mph</p>";

}

function printForecastCards (data) {
    //will grab only data indices for future days at 12:00pm.
    let forecastDays = [8, 16, 24, 32, 39];

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
        forecastCard.innerHTML += "<p>Humidity: " + data.list[forecastDays[i]].main.humidity + "%</p>";
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

function populatePreviousSearches () {
    let currHistory = JSON.parse(localStorage.getItem("searchHistory")); 

    document.getElementById("searchHistory").innerHTML = "";

    currHistory.forEach(function(element) {
        const previousSearchButton = document.createElement("div");
        previousSearchButton.classList.add("historyButtonContainer");
        previousSearchButton.innerHTML = "<button type= button class= \"form-control btn btn-dark\">" + element + "</button>";

        previousSearchButton.addEventListener("click", function() {
            getLatLong(element);
        });

        document.getElementById("searchHistory").append(previousSearchButton);
    })
}


document.getElementById("clearButton").addEventListener("click", clearSearchHistory);

function clearSearchHistory () {
    let previousSearches = [];
    localStorage.setItem("searchHistory", JSON.stringify(previousSearches));
    populatePreviousSearches();
}

let autocomplete;
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("cityWeather"),
        {
            types: ["(cities)"]
        });
}


//initial population
getLatLong("Orlando");

if (localStorage.getItem("searchHistory")) {
    populatePreviousSearches();

} else {
    let previousSearches = [];
    localStorage.setItem("searchHistory", JSON.stringify(previousSearches));

}



