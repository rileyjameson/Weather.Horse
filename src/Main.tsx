import React, { FormEventHandler, useState } from "react"
import { getWeatherData } from "./api"
import { Weather, Condition } from "./model/weather"
import * as Temperature from "./model/temperature"
import { RemoteData } from "./remoteData"
import HorseSunny from "./assets/horse_sunny.jpg"
import HorseCloudy from "./assets/horse_cloudy.jpg"
import HorseOther from "./assets/horse_other.jpg"
import HorseSnow from "./assets/horse_snow.jpg"

const Main = () => {
  const [zipCode, setZipCode] = useState("")
  const [weatherData, setWeatherData] = useState<RemoteData<Weather>>({
    kind: "uninitialized",
  })

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    setWeatherData({ kind: "loading" })

    const result = await getWeatherData(zipCode)

    if (result.kind === "success") {
      setWeatherData({ kind: "success", data: result.data })
    }

    if (result.kind === "error") {
      setWeatherData({ kind: "error", reason: result.reason })
    }
  }

  const handleOnClickReset = () => {
    setWeatherData({ kind: "uninitialized" })
  }

  const ResetButton = () => {
    return <button onClick={handleOnClickReset}>Reset</button>
  }

  if (weatherData.kind === "uninitialized") {
    return (
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="zipCode">Zip Code</label>
        <input
          id="zipCode"
          name="zipCode"
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
    )
  }

  if (weatherData.kind === "loading") {
    return <p>Penis…</p>
  }

  if (weatherData.kind === "error") {
    return (
      <div>
        <p>{weatherData.reason}</p>
        <ResetButton />
      </div>
    )
  }

  const {
    data: {
      main: { temp, feels_like },
      weather,
    },
  } = weatherData

  const { main } = weather[0]

  const temperatureText = Temperature.kelvinToFarenheit(temp)
  const feelsLikeText = Temperature.kelvinToFarenheit(feels_like)

  const determineHorseImage = (condition: Condition) => {
    switch (condition) {
      case "Snow":
        return HorseSnow
      case "Thunderstorm":
      case "Drizzle":
      case "Rain":
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Clouds":
        return HorseCloudy
      case "Ash":
      case "Squall":
      case "Tornado":
      case "Clear":
        return HorseSunny
      default:
        return HorseOther
    }
  }

  const horseImage = determineHorseImage(main)

  return (
    <div>
      <p>{temperatureText}˚ Farenheit</p>
      <p>Feels like {feelsLikeText}˚ Farenheit</p>
      <p>{main}</p>
      <img src={horseImage} width="400px" />
      <ResetButton />
    </div>
  )
}

export default Main
