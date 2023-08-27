var fetchButton = document.getElementById("fetchButton");


function getLatLong (cityEntered) {
    let latLongUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityEntered + "&limit=1&appid=ca007cce6aac096fab36f61f7e4396a9";

    fetch (latLongUrl)
    .then (function (response) {
        return response.json();
    })

    .then (function (data){
        console.log ("longitude is " + data[0].lon);
        console.log ("latitude is " + data[0].lat);

        getWeather(data[0].lat, data[0].lon);
    });
}

function getWeather(lat, lon) {
    //open weather needs lat, lon, and API key.
    let requestURL = "api.openweathermap.org/data/2.5/forecast?lat="+ lat + "&lon=" + lon + "&appid=ca007cce6aac096fab36f61f7e4396a9";

    fetch(requestURL)
    .then (function (response){
        return response.json();
    })
    
    .then (function (data){
        console.log ("longitude is " + data[0].lon);
        console.log ("latitude is " + data[0].lat);

    });
}





fetchButton.addEventListener("click", getWeather);
