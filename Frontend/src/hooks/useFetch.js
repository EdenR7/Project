import { useState, useEffect } from "react";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (!url) return;

    const abortController = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          ...defaultOptions,
          ...options,
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      if (abortController) abortController.abort();
    };
  }, [url]);

  return { data, error, loading, setData };
};

export default useFetch;
