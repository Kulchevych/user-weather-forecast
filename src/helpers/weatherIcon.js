import sunIcon from "../assets/clear-day.svg";
import nightIcon from "../assets/clear-night.svg";
import mainlyClearIcon from "../assets/mainly-clear.svg";
import fogIcon from "../assets/fog.svg";
import drizzleIcon from "../assets/drizzle.svg";
import freezingDrizzleIcon from "../assets/freezing-drizzle.svg";
import rainIconIcon from "../assets/rain.svg";
import freezingRainIcon from "../assets/freezing-rain.svg";
import snowIcon from "../assets/snow.svg";
import snowGrainsIcon from "../assets/snow-grains.svg";
import snowShoversIcon from "../assets/snow-shovers.svg";
import thunderstorm from "../assets/thunderstorm.svg";

export function getWeatherIcon(weatherCode, time) {
  const isNight =
    Number(time?.slice(-5, -3)) > 22 || Number(time?.slice(-5, -3)) < 5;

  switch (true) {
    case [0, 1, 2, 3].includes(weatherCode) && isNight:
      return nightIcon;
    case 0 === weatherCode:
      return sunIcon;
    case [1, 2, 3].includes(weatherCode):
      return mainlyClearIcon;
    case [45, 48].includes(weatherCode):
      return fogIcon;
    case [51, 53, 55].includes(weatherCode):
      return drizzleIcon;
    case [56, 57].includes(weatherCode):
      return freezingDrizzleIcon;
    case [61, 63, 65].includes(weatherCode):
      return rainIconIcon;
    case [66, 67].includes(weatherCode):
      return freezingRainIcon;
    case [71, 73, 75].includes(weatherCode):
      return snowIcon;
    case [77].includes(weatherCode):
      return snowGrainsIcon;
    case [80, 81, 82].includes(weatherCode):
      return freezingRainIcon;
    case [85, 86].includes(weatherCode):
      return snowShoversIcon;
    case 95 === weatherCode:
      return thunderstorm;
    case [96, 99].includes(weatherCode):
      return thunderstorm;
    default:
      return mainlyClearIcon;
  }
}
