
const GEO_URL="https://geocoding-api.open-meteo.com/v1/search"
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export async function getCityCoordinates(city){
    const url = `${GEO_URL}?name=${encodeURIComponent(city)}&count=1`;
    const raw= await fetch(url);
    const data=await raw.json();
    console.log(data)
     if (!data.results || data.results.length === 0) {
          throw new Error("City not found");
  }
    return {
    name: data.results[0].name,
    lat: data.results[0].latitude,
    lon: data.results[0].longitude
  };
}

export async function getWeather(lat, lon) {
  const url = `${WEATHER_URL}?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,apparent_temperature,weathercode,precipitation_probability,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode,uv_index_max&timezone=auto`;

  const response = await fetch(url);
  const data = await response.json(); 
  return data;
}


