
const Weathericon={
  sunny:"icon/sun.png",
  cloudy:"icon/cloudy.png",
  rain:"icon/rain.png"
}
function getWeathercode(code) {
  if (code === 0) return "icon/sun.png";

  if (code >= 1 && code <= 3) return "icon/cloudy-day.png";

  if (code >= 45 && code <= 48) return "icon/fog.png";

  if ((code >= 51 && code <= 65) ||  
    (code >= 80 && code <= 82)   ) return "icon/rain.png";

  if (code >= 71 && code <= 75) return "icon/snowy.png";

  if (code >= 95) return "icon/light.png";

  return "icon/cloudy-day.png";
}

function getWeatherText(code){
  if (code === 0) return "Sunny";

  if (code >= 1 && code <= 3) return "Cloudy";

  if (code >= 45 && code <= 48) return "Fog";

  if ((code >= 51 && code <= 65) ||  
    (code >= 80 && code <= 82)   ) return "Rainy";

  if (code >= 71 && code <= 75) return "Snowy";

  if (code >= 95) return "Strom";

  return "unknown";

}


export function updateCurrentWeather(data,city){
    document.querySelector(".temperature h1").innerText=
    data.current_weather.temperature+"°C";
    document.querySelector(".location h2").innerText=city;

    const icon=document.querySelector(".weather-icon img");
    console.log(icon)
    const code=data.current_weather.weathercode;
    console.log(code);
    icon.src=getWeathercode(code);

  
}
export function updateAirConditions(data){
  const realFeel=data.hourly.apparent_temperature[0];
  console.log(realFeel);
  document.querySelector(".real-feel").innerText=realFeel+"°";

  const windSpeed=data.current_weather.windspeed;
 document.querySelector(".wind-speed").innerText=windSpeed+" km/h";

 const ctRain=data.hourly.precipitation_probability[0]
 console.log(ctRain);
    document.querySelector(".location p").innerText=`Chance to rain:${ctRain}%`;
    document.querySelector(".prob-rain").innerText=ctRain+"%";
  
    const uvIndex=data.daily.uv_index_max[0]
  console.log(uvIndex)
  document.querySelector(".uv-index").innerText=uvIndex;

}

export function updateHourlyForecast(data){
const hourCard=document.querySelectorAll(".hour-card");
const times = data.hourly.time;
const temps = data.hourly.temperature_2m;
const codes = data.hourly.weathercode;

const indexes=[6,9,12,15,18,21];
hourCard.forEach((card,i)=>{
  const idx= indexes[i];
  const time = new Date(times[idx]).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });

  const temp = temps[idx];
  const icon = getWeathercode(codes[idx]);



  console.log(time, temp, icon);
    console.log(codes[idx])
  card.querySelector(".hour-time").innerText=time;
  card.querySelector(".hour-temp").innerText=temp+"°"
  card.querySelector("img").src=icon;
});
}

export function updateDailyForecast(data){
  const dayCard=document.querySelectorAll(".day-card");
  // console.log(dayCard);
   const days = data.daily.time;
  //  console.log(days)
  const maxTemps = data.daily.temperature_2m_max;
  const minTemps = data.daily.temperature_2m_min;
  const codes = data.daily.weathercode;

  dayCard.forEach((card,i)=>{
    
        const date = new Date(days[i]);
        // console.log(date);
        const dayName = i === 0
          ? "Today"
          : date.toLocaleDateString("en-US", { weekday: "short" });
        const icon=getWeathercode(codes[i]);
        const climate=getWeatherText(codes[i]);
        // console.log(codes[i]);
        
        card.querySelector(".week-day").innerText=dayName;
        card.querySelector(".climate").innerText=climate;
        card.querySelector("img").src=icon;
        card.querySelector(".temp").innerText =`${minTemps[i]}° / ${maxTemps[i]}°`;
      });

}