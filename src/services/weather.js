export async function getWeather(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
