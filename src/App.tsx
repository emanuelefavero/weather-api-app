import { useState } from 'react'
import './App.scss'

const api = {
  key: import.meta.env.VITE_API_KEY,
  base: 'https://api.openweathermap.org/data/2.5/',
}

function App() {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [units, setUnits] = useState('metric')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [weather, setWeather] = useState<any>({})

  const searchPressed = () => {
    setLoading(true)
    fetch(`${api.base}weather?q=${search}&units=${units}&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setLoading(false)
        setWeather(result)
        setSearch('')
        console.log(result)
      })
  }

  return (
    <div className='App'>
      <header className='App-header'>
        {/* HEADER */}
        <h1>Weather App</h1>

        {/* Search Box */}
        <div>
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
            placeholder='Enter city/town...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={searchPressed}>Search</button>
        </div>
      </header>

      <main>
        {loading ? (
          <p>Loading...</p>
        ) : typeof weather.main != 'undefined' ? (
          <>
            {/* Location */}
            <p>{weather?.name}</p>

            {/* Temperature F/C */}
            <p>
              {weather?.main?.temp} &#176;{units === 'metric' ? 'C' : 'F'}
            </p>

            {/* Condition (Sunny) */}
            <p>{weather?.weather[0]?.main}</p>
            <p>{weather?.weather[0]?.description}</p>
          </>
        ) : (
          <p>Enter a city/town</p>
        )}
      </main>
    </div>
  )
}

export default App
