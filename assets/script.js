 var requestedCity = $("input:text").val();
 var btn = $(".btn");
 var unorderedCityList = $("#cityList");

 btn.on("click", inputValidation);
//provides input validation that the user won't try to search an empty string
 function inputValidation(event) {
   event.preventDefault();
   var userInput = $("#search");
   var userInputValue = userInput.val();
   //checks to see if the user input is an empty string, if so, alerts them to enter a city
   if (userInputValue === "") {
     alert("Please enter a city");
   } else {
    //if it passes validation, it runs the runFetch function which gets the info from the API and displays it
     runFetch();
   }
 }
// the function that kicks off the grabbing of the data from the open weather map API
 function runFetch() {
   var userInput = $("#search");
   var userInputValue = userInput.val() || $(this).text();
   //converts the city the user entered to latitude and longitude to be used on the API
   var cityToCoord = `http://api.openweathermap.org/geo/1.0/direct?q=${userInputValue},US&APPID=c30d18cd0f8a02106652813da038e7c8`;

   fetch(cityToCoord)
   //provides further validation to make sure the city will return an ok status
     .then(function (response) {
       if (response.status !== 200) {
         alert("No City found");
       }
       return response.json();
     })
     // more validation to check if the city entered is valid
     .then(function (CoordData) {
       if (CoordData.length === 0) {
         alert("Please enter a valid city");
         userInput = userInput.val("");
         // if the city is valid, it takes the latitude and longitude from the users' city and inputs into the open weather map API to get weather info
       } else {
         var latitude = CoordData[0].lat;
         var longitude = CoordData[0].lon;
         var coordToTemperature = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&APPID=e531facda3803f5942523ed720e4f547`;
         fetch(coordToTemperature)
           .then(function (response2) {
             return response2.json();
           })

           .then(function (temperatureData) {
             showTemperatureStats(temperatureData);
             show5DayForecast(temperatureData);
             showSearchHistory();
           });
       }
     });
 }
  //displays the temperature, wind speed, and humidity for the current day
 function showTemperatureStats(temperatureData) {
   $("#infoDisplay").addClass("forecast mt-2 p-2");
   var currentTemp = temperatureData.list[0].main.temp;
   var currentWind = temperatureData.list[0].wind.speed;
   var currentHumidity = temperatureData.list[0].main.humidity;
  //displays current date at the top of the screen with the city searched
   var today = dayjs();
   $("#cityName").text(
     `${temperatureData.city.name} ${today.format("M[/]D[/]YYYY")}`
   );
  //displays the current weather's icon
   var currentIcon = temperatureData.list[0].weather[0].icon;
   var currentIconEl = $("#weatherIconCurrent");
   currentIconEl.attr(
     "src",
     `https://openweathermap.org/img/wn/${currentIcon}.png`
   );
   //taking the id from the HTML and adding the text to display temp, wind speed and humidity
   $("#temp").text(`Temp: ${currentTemp}  ${String.fromCharCode(176)}F`);
   $("#wind").text(`Wind: ${currentWind} MPH`);
   $("#humidity").text(`Humidity: ${currentHumidity}%`);
 }
 //displays the 5 day forecast temp, wind speed, and humidity data beneath current weather data
 function show5DayForecast(temperatureData) {
   var today = dayjs();
   $("#forecastHeader").text("5 Day Forecast");
   for (var i = 1; i < 6; i++) {
    //displays the icons for the weather in the 5 day forecast as well as the date of the forecast listed
     $(`#forecastDay${[i]}`).addClass("forecast");
     var icons = temperatureData.list[i].weather[0].icon;
     $(`#day${[i]}`).text(today.add(i, "day").format("M[/]D[/]YYYY"));
     $(`#weatherIconDay${[i]}`).attr(
       "src",
       `https://openweathermap.org/img/wn/${icons}.png`
     );
      //displays the temp, wind speed, and humidity for the dates in the 5 day forecast
     var temp = temperatureData.list[i].main.temp;
     $(`#tempDay${[i]}`).text(`Temp: ${temp} ${String.fromCharCode(176)}F`);
     var wind = temperatureData.list[i].wind.speed;
     $(`#windDay${[i]}`).text(`Wind: ${wind} MPH`);
     var humidity = temperatureData.list[i].main.humidity;
     $(`#humidityDay${i}`).text(`Humidity: ${humidity}%`);
   }
 }
 //removes duplicates from the search history if the user were to search the same city more than once
 function removeDuplicates(array) {
   var cities = [];
   array.forEach(function (city) {
     if (!cities.includes(city.toLowerCase())) {
       cities.push(city);
     }
   });
   return cities;
 }
 //displays the list of 10 most recently searched cities
 function showSearchHistory() {
   var userInput = $("#search");
   var userInputValue = userInput.val();
   var userInputArray = JSON.parse(localStorage.getItem("recentCity"));
  //creates an empty array if there are no recently searched cities
   if (userInputArray === null) {
     userInputArray = [];
   }
   //disallows empty strings to be added to recent city search list and makes them all the same case to also help stop duplicates
   if (userInputValue) {
     userInputArray.push(userInputValue.toLowerCase());
     localStorage.setItem("recentCity", JSON.stringify(userInputArray));
   }
   //empties the list each time a new input is added to stop the stacking of inputs, and also orders the search history start at most recently first
   unorderedCityList.empty();
   var cities = removeDuplicates(userInputArray);
   cities = cities.reverse();
   //creates the buttons to search based on the city searched
   for (var i = 0; i < cities.length; i++) {
     if (i < 10) {
       var buttonEl = $("<button>");
       buttonEl.addClass("btn  btn-light w-100 m-1 p-2");
       buttonEl.text(cities[i].charAt(0).toUpperCase() + cities[i].slice(1));

       unorderedCityList.append(buttonEl);
       var newLine = $("<div>");
       unorderedCityList.append(newLine);

       buttonEl.on("click", runFetch);
     }
   }
   userInput = userInput.val("");
 }
  

