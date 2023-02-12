





 


 var requestedCity = $("input:text").val();
 var btn = $(".btn");
 var unorderedCityList = $('#cityList')
 
 btn.on("click", runFetch);

 function runFetch(event) {
  
   event.preventDefault();
   var userInputArray = JSON.parse(localStorage.getItem("recentCity"))
   var userInput = $("#search");
   var userInputValue = userInput.val() ||  $(this).text()
   var cityToCoord = `http://api.openweathermap.org/geo/1.0/direct?q=${userInputValue},US&APPID=c30d18cd0f8a02106652813da038e7c8`;

   console.log(userInput.val());
  
   if (userInputArray === null) {
    userInputArray = [];
  }

   userInputArray.push(userInputValue.toLowerCase())
   localStorage.setItem("recentCity",JSON.stringify(userInputArray))
  
    unorderedCityList.empty()
    var cities = removeDuplicates(userInputArray)
    cities = cities.reverse()
    console.log(cities)

  for (var i = 0; i<cities.length; i++){
    var buttonEl = $('<button>')
    buttonEl.addClass("btn btn-light")
    buttonEl.text(cities[i].charAt(0).toUpperCase()+cities[i].slice(1))
    
    unorderedCityList.append(buttonEl)
    var newLine = $('<div>')
    unorderedCityList.append(newLine)
    
    buttonEl.on("click", runFetch);
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
   var currentIcon = temperatureData.list[0].weather[0].icon;
   var currentIconEl = $("#weatherIconCurrent");
   currentIconEl.attr(
     "src",
     `https://openweathermap.org/img/wn/${currentIcon}.png`
   );
   $("#temp").text(`Temp: ${currentTemp} F`);
   $("#wind").text(`Wind: ${currentWind} MPH`);
   $("#humidity").text(`Humidity: ${currentHumidity}%`);
 }

 function show5DayForecast(temperatureData) {
   var today = dayjs();
   
   for (var i = 1; i < 6; i++) {
    var icons = temperatureData.list[i].weather[0].icon;
     $(`#day${[i]}`).text(today.add(i, "day").format("M[/]D[/]YYYY"));
     $(`#weatherIconDay${[i]}`).attr("src",`https://openweathermap.org/img/wn/${icons}.png`)

     var temp = temperatureData.list[i].main.temp;
     $(`#tempDay${[i]}`).text(`Temp: ${temp} F`);
     var wind = temperatureData.list[i].wind.speed;
     $(`#windDay${[i]}`).text(`Wind: ${wind} MPH`);
     var humidity = temperatureData.list[i].main.humidity;
     $(`#humidityDay${i}`).text(`Humidity: ${humidity}%`);
   }
 }

 function removeDuplicates(array) {
   var cities = [];
   array.forEach(function (city) {
     if (!cities.includes(city.toLowerCase())) {
       cities.push(city);
     }
   });
   return cities;
 }

  /*
  create a city search box
  search button that fetches the url with the city name but changed to latitude and longitude
use imperial and geocoding API

grab name from 


  dispay searched city with date and with the temp, wind speed, and humidity
  display the forecast with same info for next 5 days
  
  */

