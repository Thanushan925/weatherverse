import React, { useState } from 'react'
import axios from 'axios'

function App() {

  const [data, setData] = useState({})
  const [postalcode, setPostalCode] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const geocodingURL = `http://api.openweathermap.org/geo/1.0/zip?zip=${postalcode},CA&limit=1&appid=7fe57d3d219cd9512845e116e4c353c5`
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=7fe57d3d219cd9512845e116e4c353c5`
  
  const searchPostalCode = (event) => {
    if (event.key === 'Enter') {
      axios.get(geocodingURL).then((response) => {
        setData(response.data)
        console.log(response.data)
      })

      axios.get(weatherURL).then((response) => {
        setLatitude(data.lat)
        setLongitude(data.lon)
        setData(response.data)
        console.log(response.data)
      })

      setPostalCode("")
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={postalcode}
          onChange={event => setPostalCode(event.target.value) && setLatitude(data.lat) && setLongitude(data.lon)}
          onKeyPress={searchPostalCode}
          searchWeather
          placeholder='Enter Postal Code'
          type="text"/>
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>

          <div className="temperature">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>

          <div className="description">
            {data.weather ? <h1>{data.weather.main}</h1> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              <p>Feels Like</p>
              {data.main ? <h1 className='bold'>{data.main.feels_like}°C</h1> : null}
            </div>

            <div className="humidity">
              <p>Humidity</p>
              {data.main ? <h1 className='bold'>{data.main.humidity}%</h1> : null}
            </div>

            <div className="wind">
              <p>Wind Speed</p>
              {data.wind ? <h1 className='bold'>{data.wind.speed} KMPH</h1> : null}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
