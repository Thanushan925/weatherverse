import React, { useState } from 'react'
import axios from 'axios'

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=45.3848&lon=-70.8626&units=metric&appid=7fe57d3d219cd9512845e116e4c353c5`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })

      setLocation("")
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
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
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              <p>Feels Like</p>
              {data.main ? <h2 className='bold'>{data.main.feels_like}°C</h2> : null}
            </div>

            <div className="humidity">
              <p>Humidity</p>
              {data.main ? <h2 className='bold'>{data.main.humidity}%</h2> : null}
            </div>

            <div className="wind">
              <p>Wind Speed</p>
              {data.wind ? <h2 className='bold'>{data.wind.speed} KMPH</h2> : null}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
