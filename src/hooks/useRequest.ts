import { useEffect, useState } from "react";

export default function useRequest(url, payload, deps: any[] = []) {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const makeRequest = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url, payload);
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    makeRequest();
  }, deps);

  return { makeRequest, response: data, isLoading };
}
