import { useState, useEffect } from 'react';
import { iDevice, ApiError } from '../types';

interface UseDeviceResult {
  device: iDevice | null;
  error: ApiError | null;
  refetch: () => Promise<void>;
}

export function useDevice(id: string): UseDeviceResult {
  const [device, setDevice] = useState<iDevice | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchDevice = async () => {
    try {
      setError(null); 
      const response = await fetch(
        `https://pzv500llz9.execute-api.eu-west-2.amazonaws.com/production/device/${id}`
      );
      if (!response.ok) {
        throw new ApiError('Failed to fetch device', response.status);
      }
      const data = await response.json();
      setDevice(data);
    } catch (err) {
      const apiError = err instanceof ApiError 
        ? err 
        : new ApiError('An unexpected error occurred');
      setError(apiError);
      setDevice(null);
    }
  };

  useEffect(() => {
    fetchDevice();
  }, [id]);

  return { device, error, refetch: fetchDevice };
}
