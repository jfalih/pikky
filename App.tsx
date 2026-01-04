import RootNavigation from '@navigation/root-navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from '@services/contexts/favorites-context';
import NetInfo from '@react-native-community/netinfo';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
      retry: (failureCount, error: any) => {
        // Don't retry if offline
        const isNetworkError =
          error?.message?.toLowerCase().includes('network') ||
          error?.message?.toLowerCase().includes('fetch') ||
          error?.message?.toLowerCase().includes('connection') ||
          error?.message?.toLowerCase().includes('timeout');
        // Retry up to 3 times for network errors, 1 time for other errors
        return isNetworkError ? failureCount < 3 : failureCount < 1;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

// Network status listener to refetch queries when network comes back online
const NetworkStatusHandler = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected === true) {
        // Refetch all queries when network comes back online
        queryClient.refetchQueries({ type: 'active' });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return null;
};
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NetworkStatusHandler />
      <FavoritesProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootNavigation />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}
