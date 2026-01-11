// app.js
import { getWeather,getCityCoordinates } from "./api.js";
import { updateCurrentWeather,updateHourlyForecast,updateDailyForecast,updateAirConditions } from "./ui.js";

const input=document.querySelector(".search-container input")



async function loadWeather(city,showError=false) {
  try{

  const location= await getCityCoordinates(city);
  const weather= await getWeather(location.lat,location.lon);
  console.log("Data:",weather);
  updateCurrentWeather(weather,location.name);
  updateHourlyForecast(weather);
  updateDailyForecast(weather);
  updateAirConditions(weather)
}
catch(err){
  
  console.error(err.message);
  if (showError && err.message === "City not found") {
      alert("City not found");
  }
 }
}
// chat_gpt_full code
async function loadLiveLocationWeather() {
  if (!navigator.geolocation) {
    console.error("Geolocation not supported");
    loadWeather("Mumbai");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const weather = await getWeather(lat, lon);
        console.log(weather);

        // use existing UI functions
        updateCurrentWeather(weather, "Current Location");
        updateHourlyForecast(weather);
        updateDailyForecast(weather);
        updateAirConditions(weather);

      } catch (err) {
        console.error(err);
        loadWeather("Mumbai");
      }
    },
    () => {
      // if user denies permission
      loadWeather("Mumbai");
    }
  );
}


document.addEventListener("DOMContentLoaded", () => {
  loadLiveLocationWeather();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = input.value.trim();

    if (city !== "") {
      loadWeather(city,true);   
      input.value = "";
    }
  }
});










