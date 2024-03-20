import React, { useEffect, useState } from "react";
import "./App.css";
import MarvelInfo from "./Components/Marvel";

// Assuming you have API_KEY defined in your .env file
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) =>
        list.Data[item].FullName.toLowerCase().includes(
          searchValue.toLowerCase()
        )
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };

  useEffect(() => {
    const fetchAllCoinData = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/all/coinlist?&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setList(json);
        setFilteredResults(Object.keys(json.Data));
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchAllCoinData();

    // Clean-up function (if necessary)
    return () => {
      // Clean-up code (if needed)
    };
  }, []);

  return (
    <>
      <div className='whole-page'>
        <h1>Kevin's Crypto List</h1>
        <input
          className='in'
          type='text'
          placeholder='Search...'
          value={searchInput}
          onChange={(e) => searchItems(e.target.value)}
        />

        <ul>
          {searchInput
            ? filteredResults.map((coin) => (
                <MarvelInfo
                  key={list.Data[coin].Symbol}
                  image={list.Data[coin].ImageUrl}
                  name={list.Data[coin].FullName}
                  symbol={list.Data[coin].Symbol}
                />
              ))
            : list &&
              Object.entries(list.Data).map(([coin]) =>
                list.Data[coin].PlatformType === "blockchain" ? (
                  <MarvelInfo
                    key={list.Data[coin].Symbol}
                    image={list.Data[coin].ImageUrl}
                    name={list.Data[coin].FullName}
                    symbol={list.Data[coin].Symbol}
                  />
                ) : null
              )}
        </ul>
      </div>
    </>
  );
}

export default App;
