import { useState, useCallback } from 'react';
import { FormData, UseFormSubmitReturn } from '../types';

export const useFormSubmit = (endpoint?: string): UseFormSubmitReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(
    async (data: FormData) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        // If no endpoint provided, just mock the submission
        if (!endpoint) {
          // Simulate a slight delay
          await new Promise((resolve) => setTimeout(resolve, 500));
          setSuccess(true);
          return;
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || 'Submission failed');
        }

        setSuccess(true);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    },
    [endpoint]
  );

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  }, []);

  return { submit, loading, error, success, reset };
};

export default useFormSubmit;
