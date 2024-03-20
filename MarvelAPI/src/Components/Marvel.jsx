import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const MarvelInfo = ({ image, name, symbol }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const getCoinPrice = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setPrice(json);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    getCoinPrice().catch(console.error);

    // Clean-up function (if necessary)
    return () => {
      // Clean-up code (if needed)
    };
  }, [symbol]);

  return (
    <div>
      {price ? ( // rendering only if API call actually returned us data
        <li className='main-list' key={symbol}>
          <img
            className='icons'
            src={`https://www.cryptocompare.com${image}`}
            alt={`Small icon for ${name} crypto coin`}
          />
          {name} <span className='tab'></span> ${price.USD} USD
        </li>
      ) : null}
    </div>
  );
};
export default MarvelInfo;
