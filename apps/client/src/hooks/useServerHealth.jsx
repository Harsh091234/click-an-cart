import { useEffect, useState } from "react";
import axios from "axios";

const HEALTH_URL = `${import.meta.env.VITE_BASE_URI}/health`;
const MAX_WAIT_TIME = parseInt(import.meta.env.VITE_SERVER_WAIT_TIME); // 60 seconds

export const useServerHealth = () => {
  const [serverReady, setServerReady] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    let interval;
    const startTime = Date.now();

    const checkServer = async () => {
      // Stop after MAX_WAIT_TIME
      if (Date.now() - startTime >= MAX_WAIT_TIME) {
        clearInterval(interval);
        setTimedOut(true);  
        return;
      }

      try {
        await axios.get(HEALTH_URL, { 
          timeout: 3000,
        });

        setServerReady(true);
        clearInterval(interval);
      } catch {
        console.log(
          `Waiting for server... ${Math.floor(
            (Date.now() - startTime) / 1000,
          )}s`,
        );
      }
    };

    checkServer();

    interval = setInterval(checkServer, 2000);

    return () => clearInterval(interval);
  }, []);

  return { serverReady, timedOut };
};
