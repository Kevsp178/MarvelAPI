import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import MarvelInfo from "./Components/Marvel";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      const url = `https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&city=${location}&start_date=2024-03-16&end_date=2024-03-17&key=f88cd683b08c43f6b114fa83ec1375f9`;
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
      setLocation(""); // Clear the input field after making the API call
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
            <p>Miami</p>
          </div>
          <div className='temp'>
            <h1>60F </h1>
          </div>
          <div className='description'>
            <p>Clouds</p>
          </div>
        </div>
        <div className='bottom'>
          <div className='feels'>
            <p>Feels like</p>
            <p className='bold'>65F</p>
          </div>
          <div className='humidity'>
            <p>Humidity</p>
            <p className='bold'>20%</p>
          </div>
          <div className='wind'>
            <p>Wind Speed</p>
            <p className='bold'>12 MPH</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
