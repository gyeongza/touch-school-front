import { useState, useCallback } from 'react';

export function useWebViewLoader() {
  const [loading, setLoading] = useState(false);

  const handleLoadStart = useCallback(() => {
    setLoading(true);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setLoading(false);
  }, []);

  return {
    loading,
    handleLoadStart,
    handleLoadEnd,
  };
}
