import { stringify } from "querystring"
import { Weather } from "./model/weather"

const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

type APIResult<T> = SucessAPIResult<T> | ErrorAPIResult
type SucessAPIResult<T> = {
  kind: "success"
  data: T
}
type ErrorAPIResult = {
  kind: "error"
  reason: string
}

export const getWeatherData = async (
  zipCode: string,
): Promise<APIResult<Weather>> => {
  const apiKey = "a20e79a015bdfe45f6956561d85a4ea0"
  const url = `${baseUrl}?zip=${zipCode},us&appid=${apiKey}`

  const response = await fetch(url)
  const json = await response.json()

  if (response.ok) {
    return {
      kind: "success",
      data: json,
    }
  } else {
    return {
      kind: "error",
      reason: JSON.stringify(json.message),
    }
  }
}
