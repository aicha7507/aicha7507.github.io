const apiKey = "bc7f0f837dmshee0922f03837470p171b82jsn61739a5e72c7";

// ---------------- START ----------------
window.addEventListener("DOMContentLoaded", function () {
  getLocation();
  loadCities();

  document.getElementById("changeLocationBtn").onclick = getLocation;
  document.getElementById("savedCities").onchange = function () {
    getWeatherCity(this.value);
  };
  document.getElementById("resetBtn").onclick = getLocation;
});

// ---------------- GPS ----------------
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, fallback);
  } else {
    getWeatherCity("Seattle");
  }
}

function success(position) {
  getWeatherCoords(position.coords.latitude, position.coords.longitude);
}

function fallback() {
  getWeatherCity("Seattle");
}

// ---------------- WEATHER ----------------
function getWeatherCity(city) {
  showLoading();

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(res => res.json())
    .then(data => {
      if (!data || data.cod != 200) {
        document.getElementById("location").textContent = "City not found";
        return;
      }

      displayWeather(data);
      saveCity(city);
      getForecastCity(city);
    })
    .catch(() => {
      document.getElementById("location").textContent = "Error loading data";
    });
}

function getWeatherCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    .then(res => res.json())
    .then(data => {
      if (!data) return;

      displayWeather(data);
      getForecastCoords(lat, lon);
    })
    .catch(() => {
      document.getElementById("location").textContent = "Error loading data";
    });
}

function showLoading() {
  document.getElementById("location").textContent = "Loading...";
}

// ---------------- DISPLAY ----------------
function displayWeather(data) {
  document.getElementById("location").textContent = data.name;
  document.getElementById("temperature").textContent = Math.round(data.main.temp) + "°";
  document.getElementById("currentCondition").textContent = data.weather[0].main;
  document.getElementById("windSpeed").textContent = data.wind.speed;
  document.getElementById("humidity").textContent = data.main.humidity;

  document.getElementById("currentIcon").src =
    "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
}

// ---------------- FORECAST ----------------
function getForecastCity(city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
    .then(res => res.json())
    .then(data => {
      if (data && data.list) {
        showHourly(data.list);
      }
    });
}

function getForecastCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    .then(res => res.json())
    .then(data => {
      if (data && data.list) {
        showHourly(data.list);
      }
    });
}

function showHourly(list) {
  let container = document.getElementById("hourlyContainer");
  container.innerHTML = "";

  for (let i = 0; i < 24; i++) {
    let date = new Date(list[i].dt * 1000);

    let box = document.createElement("div");
    box.className = "hour-card";

    box.innerHTML =
      date.getDate() + "/" + (date.getMonth() + 1) + " " + date.getHours() + ":00<br>" +
      Math.round(list[i].main.temp) + "°<br>" +
      list[i].weather[0].main;

    container.appendChild(box);
  }
}

// ---------------- SAVED CITIES ----------------
function saveCity(city) {
  let cities = JSON.parse(getCookie("cities") || "[]");

  cities.unshift(city);
  cities = [...new Set(cities)].slice(0, 5);

  document.cookie = "cities=" + JSON.stringify(cities) + "; path=/; max-age=2592000";

  loadCities();
}

function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function loadCities() {
  let cities = JSON.parse(getCookie("cities") || "[]");

  let select = document.getElementById("savedCities");
  select.innerHTML = "";

  if (cities.length === 0) {
    let option = document.createElement("option");
    option.textContent = "No saved cities";
    select.appendChild(option);
    return;
  }

  cities.forEach(city => {
    let option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    select.appendChild(option);
  });
}