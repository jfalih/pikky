import { useMemo } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';

/**
 * Custom hook to detect network-related errors
 * Combines React Query error state with NetInfo network status
 */
export const useNetworkError = (error: Error | null | undefined) => {
  const netInfo = useNetInfo();

  const isNetworkError = useMemo(() => {
    // Check real-time network status first
    if (netInfo.isConnected === false) {
      return true;
    }
    // Fallback to error message check
    if (!error) return false;
    const errorMessage = error?.message?.toLowerCase() || '';
    return (
      errorMessage.includes('network') ||
      errorMessage.includes('fetch') ||
      errorMessage.includes('connection') ||
      errorMessage.includes('timeout') ||
      errorMessage.includes('failed to fetch')
    );
  }, [error, netInfo.isConnected]);

  const isOffline = netInfo.isConnected === false;

  return {
    isNetworkError,
    isOffline,
    isConnected: netInfo.isConnected === true,
  };
};

