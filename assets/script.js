





 


 var requestedCity = $("input:text").val();
 var searchBtn = $("#searchBtn");
 var unorderedCityList = $('#cityList')
 
 searchBtn.on("click", runFetch);

 function runFetch(event) {
   event.preventDefault();
   var userInputArray = JSON.parse(localStorage.getItem("recentCity"))
   
   var userInput = $("#search");
   var userInputValue = userInput.val();
   var cityToCoord = `http://api.openweathermap.org/geo/1.0/direct?q=${userInputValue},US&APPID=c30d18cd0f8a02106652813da038e7c8`;

   console.log(userInput.val());
  
   if (userInputArray === null) {
    userInputArray = [];
  }

  userInputArray.push(userInputValue)
   localStorage.setItem("recentCity",JSON.stringify(userInputArray))
    
  for (var i = 0; i<userInputArray.length; i++){
    var buttonEl = $('<button>')
    buttonEl.text(userInputArray[i])
    console.log(buttonEl.text())
    unorderedCityList.append(buttonEl)
    var newLine = $('<div>')
    unorderedCityList.append(newLine)

  }


   userInput = userInput.val("");


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
           showTemperatureStats(temperatureData);
           show5DayForecast(temperatureData);
         });
     });
 }

 function showTemperatureStats(temperatureData) {
   var currentTemp = temperatureData.list[0].main.temp;
   var currentWind = temperatureData.list[0].wind.speed;
   var currentHumidity = temperatureData.list[0].main.humidity;

   var today = dayjs();
   var cityName = $("#cityName").text(
     `${temperatureData.city.name} ${today.format("M[/]D[/]YYYY")}`
   );
   //look up degrees symbol
   $("#temp").text(`Temp: ${currentTemp} F`);
   $("#wind").text(`Wind: ${currentWind} MPH`);
   $("#humidity").text(`Humidity: ${currentHumidity}%`);
 }

 function show5DayForecast(temperatureData) {
   var day1Temp = temperatureData.list[1].main.temp;
   var day1Wind = temperatureData.list[1].wind.speed;
   var day1Humidity = temperatureData.list[1].main.humidity;

   var day2Temp = temperatureData.list[2].main.temp;
   var day2Wind = temperatureData.list[2].wind.speed;
   var day2Humidity = temperatureData.list[2].main.humidity;

   var day3Temp = temperatureData.list[3].main.temp;
   var day3Wind = temperatureData.list[3].wind.speed;
   var day3Humidity = temperatureData.list[3].main.humidity;

   var day4Temp = temperatureData.list[4].main.temp;
   var day4Wind = temperatureData.list[4].wind.speed;
   var day4Humidity = temperatureData.list[4].main.humidity;

   var day5Temp = temperatureData.list[5].main.temp;
   var day5Wind = temperatureData.list[5].wind.speed;
   var day5Humidity = temperatureData.list[5].main.humidity;
 }


  /*
  create a city search box
  search button that fetches the url with the city name but changed to latitude and longitude
use imperial and geocoding API

grab name from 


  dispay searched city with date and with the temp, wind speed, and humidity
  display the forecast with same info for next 5 days
  
  */

