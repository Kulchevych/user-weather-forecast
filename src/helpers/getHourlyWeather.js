import { getWeatherIcon } from "./weatherIcon";

export function getHourlyWeather(weather) {
  if (!weather) {
    return;
  }

  const { hourly } = weather;

  const timeIndex = hourly.time.findIndex(
    (time) => time === weather.current.time.slice(0, -2) + "00"
  );

  const hours = 24;
  const time = hourly.time.slice(timeIndex, timeIndex + hours);

  return time.map((hourDate, index) => ({
    time: new Date(hourDate).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    date: new Date(hourDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    }),
    weatherCode: getWeatherIcon(
      hourly.weather_code[timeIndex + index],
      hourDate
    ),
    temperature: Math.round(hourly.temperature_2m[timeIndex + index]),
  }));
}
