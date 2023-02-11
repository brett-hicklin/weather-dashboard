





 var cityToCoord = 'http://api.openweathermap.org/geo/1.0/direct?q=Dover,NH,US&APPID=c30d18cd0f8a02106652813da038e7c8'



 var searchBtn = $('#searchBtn')
 searchBtn.on("click",runFetch)

 function runFetch() {
   fetch(cityToCoord)
     .then(function (response) {
       return response.json();
     })

     .then(function (CoordData) {
       console.log(CoordData);
       var latitude = CoordData[0].lat;
       var longitude = CoordData[0].lon;
       var coordToTemperature = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&APPID=e531facda3803f5942523ed720e4f547`;
       fetch(coordToTemperature)
         .then(function (response2) {
           return response2.json();
         })

         .then(function (temperatureData) {
           console.log(temperatureData);
           console.log(temperatureData.list[0].main.temp)
         });
     });
 }
runFetch()
  /*
  create a city search box
  search button that fetches the url with the city name but changed to latitude and longitude
use imperial and geocoding API

grab name from 


  dispay searched city with date and with the temp, wind speed, and humidity
  display the forecast with same info for next 5 days
  
  */

