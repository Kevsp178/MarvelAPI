import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [dateInput, setDateInput] = useState(""); // State for date input
  const [temperatureRangeInput, setTemperatureRangeInput] = useState([30, 90]);

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      const url = `https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&city=${location}&start_date=2024-03-30&end_date=2024-04-07&units=imperial&key=f88cd683b08c43f6b114fa83ec1375f9`;

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
    if (!Array.isArray(data.data)) {
      return;
    }

    let filteredData = [...data.data];

    if (dateInput) {
      filteredData = filteredData.filter((dayData) =>
        dayData.datetime.includes(dateInput)
      );
    }

    if (temperatureRangeInput) {
      filteredData = filteredData.filter(
        (dayData) =>
          dayData.min_temp >= temperatureRangeInput[0] &&
          dayData.max_temp <= temperatureRangeInput[1]
      );
    }

    setData({ ...data, data: filteredData });
  };

  const applyFilter = () => {
    filterInfo();
  };

  const TemperatureChart = ({ temperatures }) => {
    useEffect(() => {
      const ctx = document.getElementById("temperature-chart");
      let chartInstance = null;

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: temperatures.map((data, index) => index + 1),
          datasets: [
            {
              label: "Temperature Range",
              data: temperatures.map(
                (data) => (data.max_temp + data.min_temp) / 2
              ),
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      return () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      };
    }, [temperatures]);

    return <canvas id='temperature-chart' />;
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
              <Link to={`/Components/WDetail${data.city_name}`}>
                {data.city_name}
              </Link>
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
          <div>
            <TemperatureChart temperatures={data.data || []} />
          </div>
        </div>

        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default App;
