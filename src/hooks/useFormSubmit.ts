import { useState, useCallback } from 'react';
import { type FormData, UseFormSubmitReturn } from '../types';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzD__tDQgM8o7pF9Qg1IJhBCmVxLN-TONFzX2nYEYRPFq3vxXU3vTHlL9eXr7b5KdIoaQ/exec'

export const useFormSubmit = (): UseFormSubmitReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(
    async (data: FormData) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      console.log('trying to submit', GOOGLE_SCRIPT_URL)

      try {
        // If no endpoint provided, just mock the submission
        if (!GOOGLE_SCRIPT_URL) {
          // Simulate a slight delay
          await new Promise((resolve) => setTimeout(resolve, 500));
          setSuccess(true);
          return;
        }

        const formData = new FormData();
        console.log('check the data', data)
        formData.append('Name', data.name);
        formData.append('Email', data.email);

        console.log('check form data', formData)

        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        });

        setSuccess(true);

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        console.log('error', errorMessage)
        setError(errorMessage);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    },
    [GOOGLE_SCRIPT_URL]
  );

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  }, []);

  return { submit, loading, error, success, reset };
};

export default useFormSubmit;
