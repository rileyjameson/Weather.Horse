export type Condition =
  | "Thunderstorm"
  | "Drizzle"
  | "Rain"
  | "Snow"
  | "Mist"
  | "Smoke"
  | "Haze"
  | "Dust"
  | "Fog"
  | "Sand"
  | "Ash"
  | "Squall"
  | "Tornado"
  | "Clear"
  | "Clouds"

type MainWeather = {
  id: number
  main: Condition
  description: string
  icon: string
}

export type Weather = {
  coord: {
    lon: number
    lat: number
  }
  weather: MainWeather[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: 1
    id: number
    message: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}
