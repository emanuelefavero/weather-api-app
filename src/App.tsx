import { useState, useEffect } from 'react'
import './App.scss'
import backgroundImage from './images/night.jpg'

const weatherAPI = {
  key: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
  base: 'https://api.openweathermap.org/data/2.5/',
}

const countryAPI = {
  key: import.meta.env.VITE_OPEN_CAGE_API_KEY,
  base: `https://api.opencagedata.com/geocode/v1/`,
}

function App() {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [units, setUnits] = useState('metric')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [weather, setWeather] = useState<any>({})
  const [country, setCountry] = useState('')

  const getWeather = () => {
    setLoading(true)

    // Get weather
    fetch(
      `${weatherAPI.base}weather?q=${search}&units=metric&APPID=${weatherAPI.key}`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result)
        console.log(result)

        // Get country
        fetch(
          `${countryAPI.base}json?q=${result?.name}&key=${countryAPI.key}&language=en&pretty=1`
        )
          .then((res) => res.json())
          .then((result) => {
            setCountry(result?.results[0]?.components?.country)
            setLoading(false)
            setSearch('')
          })
      })
  }

  // get weather on page load from user's location
  const getWeatherFromLocation = () => {
    if (navigator.geolocation) {
      setLoading(true)
      // Get user location
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords

        // Get weather
        fetch(
          `${weatherAPI.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${weatherAPI.key}`
        )
          .then((res) => res.json())
          .then((result) => {
            setWeather(result)

            // Get country
            fetch(
              `${countryAPI.base}json?q=${result?.name}&key=${countryAPI.key}&language=en&pretty=1`
            )
              .then((res) => res.json())
              .then((result) => {
                setCountry(result?.results[0]?.components?.country)
                setLoading(false)
              })
          })
      })
    }

    setLoading(false)
  }

  useEffect(() => {
    getWeatherFromLocation()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const style = {
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div className='App' style={style}>
      {/* HEADER */}
      <header>
        {/* Search Box */}
        <section className='search'>
          {/* Select Units */}
          <select
            defaultValue='metric'
            onChange={(e) => setUnits(e.target.value)}
          >
            <option value='metric'>Celsius</option>
            <option value='imperial'>Fahrenheit</option>
          </select>

          <input
            type='text'
            placeholder='Search city...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                getWeather()
              }
            }}
          />

          <button onClick={getWeather}>Search</button>
        </section>
      </header>

      {/* MAIN */}
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : typeof weather.main != 'undefined' ? (
          <>
            {/* Condition */}
            <section className='condition-and-location'>
              <div className='condition'>
                <p>{weather?.weather[0]?.description}</p>
                {/* Condition Icon */}
                {/* <p>{weather?.weather[0]?.main}</p> */}
                <img
                  src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                  alt='weather condition'
                />
              </div>
              {/* Location */}
              <h2 className='location'>
                {weather?.name}
                {country?.length > 0 ? `, ${country}` : ''}
              </h2>
            </section>

            {/* Temperature F/C */}
            <section className='temperature-and-stats'>
              <h1 className='temperature'>
                {/* If units is imperial, convert values to Fahrenheit */}
                {units === 'metric'
                  ? `${Math.round(Number(weather?.main?.temp))}`
                  : `${Math.round(Number(weather?.main?.temp) * 1.8 + 32)}`}
                <sup>{units === 'metric' ? '°C' : '°F'}</sup>
              </h1>
              <div className='vertical-divider'></div>
              <div className='stats'>
                <p className='feels-like'>
                  FEELS LIKE:{' '}
                  {/* If units is imperial, convert values to Fahrenheit */}
                  {units === 'metric'
                    ? `${Math.round(Number(weather?.main?.feels_like))}`
                    : `${Math.round(
                        Number(weather?.main?.feels_like) * 1.8 + 32
                      )}`}
                  <sup>{units === 'metric' ? '°C' : '°F'}</sup>
                </p>
                <p className='wind'>
                  WIND:{' '}
                  {units === 'metric'
                    ? `${Math.round(Number(weather?.wind?.speed))} m/s`
                    : `${Math.round(
                        Number(weather?.wind?.speed) / 0.44704
                      )} MPH`}
                </p>
                <p className='humidity'>HUMIDITY: {weather?.main?.humidity}%</p>
              </div>
            </section>
          </>
        ) : (
          <p className='no-result'>Enter a city...</p>
        )}
      </main>
    </div>
  )
}

export default App
