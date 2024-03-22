import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [dateInput, setDateInput] = useState(""); // State for date input
  const [temperatureRangeInput, setTemperatureRangeInput] = useState([30, 90]);

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

  const filterInfo = () => {
    // Check if data.data is iterable (an array)
    if (!Array.isArray(data.data)) {
      return; // Exit early if data.data is not iterable
    }

    let filteredData = [...data.data]; // Make a copy of the data to avoid mutating the original state

    // Filter data based on date input
    if (dateInput) {
      filteredData = filteredData.filter((dayData) =>
        dayData.datetime.includes(dateInput)
      );
    }

    // Filter data based on temperature range input
    if (temperatureRangeInput) {
      filteredData = filteredData.filter(
        (dayData) =>
          dayData.min_temp >= temperatureRangeInput[0] &&
          dayData.max_temp <= temperatureRangeInput[1]
      );
    }

    // Update the state with the filtered data
    setData({ ...data, data: filteredData });
  };

  const applyFilter = () => {
    filterInfo();
  };

  return (
    <div className='app'>
      <div className='container'>
        <div className='search'>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder='Enter Location'
            onKeyDown={searchLocation}
            type='text'
          />
        </div>
        <div className='filters'>
          <input
            placeholder='Enter Date'
            type='text'
            value={dateInput}
            onChange={(event) => setDateInput(event.target.value)}
            onKeyDown={filterInfo}
          />
          <input
            name='Temperature'
            type='text'
            value={temperatureRangeInput[1]}
            onChange={(event) =>
              setTemperatureRangeInput([30, parseInt(event.target.value)])
            }
          />
          <button onClick={applyFilter}>Apply Filter</button>
        </div>
        <div className='top'>
          {data.city_name && (
            <div className='location'>
              <p>{data.city_name}</p>
            </div>
          )}
          {data.data && data.data.length > 0 && (
            <div className='temp'>
              <p>{data.data[0].temp.toFixed()} F</p>
            </div>
          )}
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
