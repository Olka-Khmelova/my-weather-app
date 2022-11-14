////////                  CURRENT DAY&TIME                 ///////////
let now = new Date();
// day
function formatDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wensday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  return day;
}
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = formatDay();
// time
function padTo2Digits(num) {
  return String(num).padStart(2, "0");
}
let hour = padTo2Digits(now.getHours());
let minutes = padTo2Digits(now.getMinutes());
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hour}:${minutes}`;

//////////////////////     Search form      /////////////////////
function currentWeather(response) {
  let displayCity = document.querySelector("#display-city");
  displayCity.innerHTML = response.data.name;

  let displayTemperature = document.querySelector("#current-temperature");
  displayTemperature.innerHTML = Math.round(response.data.main.temp);

  let feelsTemperature = document.querySelector("#feels-temperature");
  feelsTemperature.innerHTML = Math.round(response.data.main.feels_like);

  let weatherDescr = document.querySelector("#weather-description");
  weatherDescr.innerHTML = response.data.weather[0].main;

  let humidity = document.querySelector("#humidity-info");
  humidity.innerHTML = response.data.main.humidity;

  let windSpeed = document.querySelector("#wind-speed-info");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}
function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(currentWeather);
}

function currentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}
let currentCityBtn = document.querySelector(".geo-location-button");
currentCityBtn.addEventListener("click", currentCity);

function showWeather(response) {
  let displayCity = document.querySelector("#display-city");
  displayCity.innerHTML = response.data.name;

  let displayTemperature = document.querySelector("#current-temperature");
  displayTemperature.innerHTML = Math.round(response.data.main.temp);

  let feelsTemperature = document.querySelector("#feels-temperature");
  feelsTemperature.innerHTML = Math.round(response.data.main.feels_like);

  let weatherDescr = document.querySelector("#weather-description");
  weatherDescr.innerHTML = response.data.weather[0].main;

  let humidity = document.querySelector("#humidity-info");
  humidity.innerHTML = response.data.main.humidity;

  let windSpeed = document.querySelector("#wind-speed-info");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}
function search(city) {
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function searchingSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
let serchingForm = document.querySelector("#searching-form");
serchingForm.addEventListener("submit", searchingSubmit);
search("Kyiv");
