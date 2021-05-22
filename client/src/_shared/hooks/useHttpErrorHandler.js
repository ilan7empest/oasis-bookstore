import { useState, useEffect } from 'react';

export const useHttpErrorHandler = (httpClient) => {
  const [error, setError] = useState(null);

  const reqIntr = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const resIntr = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err.data.message);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqIntr);
      httpClient.interceptors.response.eject(resIntr);
    };
  }, [
    reqIntr,
    resIntr,
    httpClient.interceptors.request,
    httpClient.interceptors.response,
  ]);

  const errorConfirmHandler = () => {
    setError(null);
  };

  return [error, errorConfirmHandler];
};
