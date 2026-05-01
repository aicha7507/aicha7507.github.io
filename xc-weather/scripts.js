const apiKey ="bc7f0f837dmshee0922f03837470p171b82jsn61739a5e72c7"

// ---------------- GPS ----------------

document.getElementById("changeLocationBtn").onclick = function () {
  getLocation();
};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, fallback);
  } else {
    getWeatherCity("Seattle");
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  getWeatherCoords(lat, lon);
}

function fallback() {
  getWeatherCity("Seattle");
}

// ---------------- WEATHER ----------------

function getWeatherCity(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
  )
    .then(res => res.json())
    .then(data => {
      displayWeather(data);
      saveCity(city);
      getForecastCity(city);
    });
}

function getWeatherCoords(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  )
    .then(res => res.json())
    .then(data => {
      displayWeather(data);
      getForecastCoords(lat, lon);
    });
}

function displayWeather(data) {
  document.getElementById("location").textContent = data.name;
  document.getElementById("temperature").textContent =
    Math.round(data.main.temp) + "°";

  document.getElementById("currentCondition").textContent =
    data.weather[0].main;

  document.getElementById("windSpeed").textContent = data.wind.speed;
  document.getElementById("humidity").textContent = data.main.humidity;
}

// ---------------- FORECAST ----------------

function getForecastCity(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
  )
    .then(res => res.json())
    .then(data => {
      showHourly(data.list);
    });
}

function getForecastCoords(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  )
    .then(res => res.json())
    .then(data => {
      showHourly(data.list);
    });
}

function showHourly(list) {
  let container = document.getElementById("hourlyContainer");
  container.innerHTML = "";

  for (let i = 0; i < 72; i++) {
    if (!list[i]) break;

    let hour = new Date(list[i].dt * 1000).getHours();

    let box = document.createElement("div");
    box.className = "hour-card";

    box.innerHTML =
      "<p>" +
      hour +
      ":00</p>" +
      "<p>" +
      Math.round(list[i].main.temp) +
      "°</p>" +
      "<p>" +
      list[i].weather[0].main +
      "</p>";

    container.appendChild(box);
  }
}

// ---------------- COOKIES ----------------

function saveCity(city) {
  let cities = JSON.parse(getCookie("cities") || "[]");

  cities.unshift(city);

  cities = [...new Set(cities)].slice(0, 5);

  document.cookie = "cities=" + JSON.stringify(cities);

  loadCities();
}

function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");

  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}

function loadCities() {
  let cities = JSON.parse(getCookie("cities") || "[]");

  let select = document.getElementById("savedCities");
  select.innerHTML = "";

  for (let i = 0; i < cities.length; i++) {
    let option = document.createElement("option");
    option.value = cities[i];
    option.textContent = cities[i];
    select.appendChild(option);
  }
}

document.getElementById("savedCities").onchange = function () {
  getWeatherCity(this.value);
};

document.getElementById("resetBtn").onclick = function () {
  getLocation();
};

// ---------------- START ----------------

getLocation();
loadCities();