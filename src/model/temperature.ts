export const kelvinToFarenheit = (kelvin: number): number => {
  const farenheit = (kelvin - 273.15) * (9 / 5) + 32
  return Math.round(farenheit)
}
