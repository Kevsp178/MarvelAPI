import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const MarvelInfo = ({ image, name, symbol }) => {
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);

  useEffect(() => {
    const fetchSubscriptionInfo = async () => {
      try {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/subscription/usage?key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch subscription information");
        }
        const data = await response.json();
        setSubscriptionInfo(data);
      } catch (error) {
        console.error("Error fetching subscription information:", error);
      }
    };

    fetchSubscriptionInfo();
  }, []);

  return (
    <div>
      {subscriptionInfo && (
        <div>
          <p>Calls Count: {subscriptionInfo.calls_count}</p>
          <p>Calls Remaining: {subscriptionInfo.calls_remaining}</p>
          <p>
            Calls Reset Time:{" "}
            {new Date(subscriptionInfo.calls_reset_ts * 1000).toLocaleString()}
          </p>
          <p>
            Historical Calls Count: {subscriptionInfo.historical_calls_count}
          </p>
          <p>
            Historical Calls Remaining:{" "}
            {subscriptionInfo.historical_calls_remaining}
          </p>
          <p>
            Historical Calls Reset Time:{" "}
            {new Date(
              subscriptionInfo.historical_calls_reset_ts * 1000
            ).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default MarvelInfo;
