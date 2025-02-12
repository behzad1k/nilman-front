import { useEffect, useState } from 'react';

export const useRequestBody = () => {
  const [requestBody, setRequestBody] = useState(null);

  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      const clone = response.clone();
      const body = await clone.json();
      setRequestBody(body);
      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return requestBody;
};
