export const getCustomWeatherImage = (weatherType) => {
  switch (weatherType) {
    case "Clear":
      return require("../assets/weather/clear.jpg");
    case "Clouds":
      return require("../assets/weather/clouds.jpg");
    case "Rain":
      return require("../assets/weather/rain.jpg");
    case "Drizzle":
      return require("../assets/weather/drizzle.jpg");
    case "Thunderstorm":
      return require("../assets/weather/thunderstorm.jpg");
    case "Snow":
      return require("../assets/weather/snow.jpg");
    case "Mist":
    case "Fog":
    case "Haze":
      return require("../assets/weather/fog.jpg");
    case "Tornado":
    case "Smoke":
    case "Dust":
    case "Ash":
    case "Sand":
    case "Squall":
      return require("../assets/weather/extreme.jpg");
    default:
      return require("../assets/weather/clouds.jpg"); // fallback
  }
};
