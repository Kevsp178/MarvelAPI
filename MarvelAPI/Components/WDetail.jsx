import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const WDetail = () => {
  let params = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getWDetail = async () => {
      try {
        const details = await fetch(
          `https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&city=${params.location}&start_date=2024-03-30&end_date=2024-04-07&units=imperial&key=${API_KEY}`
        );

        const detailsJson = await details.json();

        setFullDetails(detailsJson);
      } catch (error) {
        console.error("Error fetching weather details:", error);
      }
    };

    getWDetail();
  }, [params.location]);

  return (
    <div className='location'>
      {fullDetails && <p>{fullDetails.city_name}</p>}
    </div>
  );
};

export default WDetail;
