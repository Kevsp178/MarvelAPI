import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      const url = `https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&city=${location}&start_date=2024-03-10&end_date=2024-03-20&units=imperial&key=f88cd683b08c43f6b114fa83ec1375f9`;

      setLoading(true);

      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        })
        .finally(() => {
          setLoading(false);
        });

      setLocation("");
    }
  };

  return (
    <div className='app'>
      <div className='container'>
        <div className='search'>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder='Enter Location'
            onKeyPress={searchLocation}
            type='text'
          />
        </div>
        <div className='top'>
          <div className='location'>
            <p>{data.city_name}</p>
          </div>
          <div className='temp'>
            {data.data ? <p>{data.data[0].temp.toFixed()} F</p> : null}
          </div>
        </div>
        <div className='bottom'>
          <div className='header'>
            <p>Date</p>
            <p>Min Temp</p>
            <p>Max Temp</p>
            <p>Wind Speed</p>
            <p>Total Rain</p>
          </div>
          {data.data
            ? data.data.map((dayData, index) => (
                <div key={index} className='daily-info'>
                  <p>{dayData.datetime}</p>
                  <p>{dayData.min_temp.toFixed()} F</p>
                  <p>{dayData.max_temp.toFixed()} F</p>
                  <p>{dayData.wind_spd} MPH</p>
                  <p>{dayData.precip} In</p>
                </div>
              ))
            : null}
        </div>
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default App;
