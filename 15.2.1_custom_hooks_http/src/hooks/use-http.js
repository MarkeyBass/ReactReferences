import { useState, useCallback } from "react";

const useHttp = (requestConfig, applyDataCallback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    let response;
    try {
      response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyDataCallback(data);
      
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);;
  },[requestConfig, applyDataCallback]);
  
  return {
    isLoading,
    error,
    sendRequest
  };
};

export default useHttp;
