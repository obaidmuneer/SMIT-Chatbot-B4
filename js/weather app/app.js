const container = document.querySelector(".container")
const apiKey = "your api key"
const lat = "33.44"
const lon = "-94.04"
const city = "karachi"

const getWeather = async () => {
  // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

  const result = await fetch(url)
  const json = await result.json()
  console.log(json);
}