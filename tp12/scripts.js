const apiKey = "YOUR_API_KEY_HERE";

/* ---------------- GPS ---------------- */

document.getElementById("changeLocationBtn").addEventListener("click", getLocationWeather);

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    getWeatherByCity("Seattle");
  }
}

function success(position) {
  getWeatherByCoords(position.coords.latitude, position.coords.longitude);
}

function error() {
  getWeatherByCity("Seattle");
}

/* ---------------- WEATHER ---------------- */

function getWeatherByCity(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(res => res.json())
    .then(data => {
      updateCurrentWeather(data);
      saveCity(city);
    });

  fetchForecastCity(city);
}

function getWeatherByCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    .then(res => res.json())
    .then(data => updateCurrentWeather(data));

  fetchForecastCoords(lat, lon);
}

function updateCurrentWeather(data) {
  document.getElementById("location").textContent = data.name;
  document.getElementById("temperature").textContent = Math.round(data.main.temp) + "°";
  document.getElementById("currentCondition").textContent = data.weather[0].main;
  document.getElementById("windSpeed").textContent = data.wind.speed;
  document.getElementById("humidity").textContent = data.main.humidity;
}

/* ---------------- FORECAST ---------------- */

function fetchForecastCity(city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
    .then(res => res.json())
    .then(data => displayHourly(data.list));
}

function fetchForecastCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    .then(res => res.json())
    .then(data => displayHourly(data.list));
}

function displayHourly(list) {
  const container = document.getElementById("hourlyContainer");
  container.innerHTML = "";

  for (let i = 0; i < 72; i++) {
    if (!list[i]) break;

    const hour = new Date(list[i].dt * 1000).getHours();

    const div = document.createElement("div");
    div.className = "hour-card";

    div.innerHTML = `
      <div>${hour}:00</div>
      <div>${Math.round(list[i].main.temp)}°</div>
      <div>${list[i].weather[0].main}</div>
    `;

    container.appendChild(div);
  }
}

/* ---------------- COOKIES ---------------- */

function saveCity(city) {
  let cities = JSON.parse(getCookie("cities") || "[]");

  cities.unshift(city);
  cities = [...new Set(cities)].slice(0, 5);

  document.cookie = "cities=" + JSON.stringify(cities);

  loadCities();
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function loadCities() {
  const cities = JSON.parse(getCookie("cities") || "[]");

  const select = document.getElementById("savedCities");
  select.innerHTML = "";

  cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    select.appendChild(option);
  });
}

document.getElementById("savedCities").addEventListener("change", (e) => {
  getWeatherByCity(e.target.value);
});

document.getElementById("resetBtn").addEventListener("click", getLocationWeather);

/* ---------------- START ---------------- */

getLocationWeather();