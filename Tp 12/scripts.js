

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'bc7f0f837dmshee0922f03837470p171b82jsn61739a5e72c7',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};


async function getWeather(city){

const url =
`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`;

const response = await fetch(url, options);

const data = await response.json();


/* CURRENT WEATHER */

document.querySelector("#location").textContent =
data.location.name + ", " + data.location.region;

document.querySelector("#temperature").textContent =
Math.round(data.current.temp_f) + "°F";

document.querySelector("#currentCondition").textContent =
data.current.condition.text;

document.querySelector("#currentIcon").src =
data.current.condition.icon;

document.querySelector("#windSpeed").textContent =
data.current.wind_mph + " mph";

document.querySelector("#humidity").textContent =
data.current.humidity + "%";


/* 3 DAY FORECAST */

const forecast =
data.forecast.forecastday;


document.querySelector("#day1Name").textContent =
new Date(forecast[0].date).toLocaleDateString('en-US', { weekday: 'short' });

document.querySelector("#day1Temp").textContent =
Math.round(forecast[0].day.maxtemp_f) + "° / " +
Math.round(forecast[0].day.mintemp_f) + "°";

document.querySelector("#day1Condition").textContent =
forecast[0].day.condition.text;

document.querySelector("#day1Icon").src =
forecast[0].day.condition.icon;

document.querySelector("#day1Wind").textContent =
forecast[0].day.maxwind_mph + " mph";



document.querySelector("#day2Name").textContent =
new Date(forecast[1].date).toLocaleDateString('en-US', { weekday: 'short' });

document.querySelector("#day2Temp").textContent =
Math.round(forecast[1].day.maxtemp_f) + "° / " +
Math.round(forecast[1].day.mintemp_f) + "°";

document.querySelector("#day2Condition").textContent =
forecast[1].day.condition.text;

document.querySelector("#day2Icon").src =
forecast[1].day.condition.icon;

document.querySelector("#day2Wind").textContent =
forecast[1].day.maxwind_mph + " mph";



document.querySelector("#day3Name").textContent =
new Date(forecast[2].date).toLocaleDateString('en-US', { weekday: 'short' });

document.querySelector("#day3Temp").textContent =
Math.round(forecast[2].day.maxtemp_f) + "° / " +
Math.round(forecast[2].day.mintemp_f) + "°";

document.querySelector("#day3Condition").textContent =
forecast[2].day.condition.text;

document.querySelector("#day3Icon").src =
forecast[2].day.condition.icon;

document.querySelector("#day3Wind").textContent =
forecast[2].day.maxwind_mph + " mph";

}



/* MODAL */

const modal =
document.querySelector("#modal");

const btn =
document.querySelector("#changeLocationBtn");

const form =
document.querySelector("#locationForm");


btn.onclick = () => {
modal.classList.remove("hidden");
};


form.onsubmit = (e) => {

e.preventDefault();

const city =
document.querySelector("#locationInput").value;

getWeather(city);

modal.classList.add("hidden");

};


/* DEFAULT CITY */

getWeather("Seattle");