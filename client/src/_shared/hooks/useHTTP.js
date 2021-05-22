import { useState, useCallback, useEffect } from 'react';

export const useHTTP = (axios, url, method = 'GET', body = null) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const clearError = () => {
    setError('');
  };

  const AJAX = useCallback(async () => {
    try {
      const response = await axios(url, {
        method,
        data: body,
      });
      if (response.data.items.length === 0) throw Error('Could Not find Books');
      setData(response.data.items);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [axios, url, method, body]);

  useEffect(() => {
    AJAX();
  }, [AJAX]);

  return [data, error, loading, clearError];
};
