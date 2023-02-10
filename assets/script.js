





// var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=Dover,NH,+1&APPID=c30d18cd0f8a02106652813da038e7c8'



 var searchBtn = $('#searchBtn')
 searchBtn.on("click",runFetch)

 function runFetch(){

    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=London,UK&units=imperial&APPID=e531facda3803f5942523ed720e4f547';

    var data = fetch(requestUrl)
    
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
     
    });
 }

  /*
  create a city search box
  search button that fetches the url with the city name but changed to latitude and longitude
use imperial and geocoding API

grab name from 


  dispay searched city with date and with the temp, wind speed, and humidity
  display the forecast with same info for next 5 days
  
  */

