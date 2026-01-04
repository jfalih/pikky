import React, { useCallback, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import { navigationTheme } from '../../components/atoms';
import SwipeNavigation from '@navigation/swipe-navigation';
import { useNetInfo } from '@react-native-community/netinfo';
import { useWindowDimensions } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { createPrefetchHandler } from '@services/helper/prefetchUtils';
import { toaster } from '@janfalih/toaster';

const PRELOAD_LIMIT = 100;
const OUTER_PADDING = 16;

export const RootNavigation = React.memo(() => {
  const netInfo = useNetInfo();
  const { width } = useWindowDimensions();
  const queryClient = useQueryClient();
  const normalizeWidth = Math.round(width / 2 - OUTER_PADDING);
  const normalizeHeight = 300;

  const prefetchHandler = useRef(
    createPrefetchHandler(queryClient, {
      limit: PRELOAD_LIMIT,
      imageWidth: normalizeWidth,
      imageHeight: normalizeHeight,
    }),
  ).current;

  useEffect(() => {
    // Start preloading immediately if online
    if (netInfo.isConnected !== false) {
      prefetchHandler.prefetch();
    } else {
      // If offline, mark as complete after short delay
      const timer = setTimeout(() => {
        // Force complete state by calling prefetch which will mark as complete on error
        prefetchHandler.prefetch().catch(() => {
          toaster.showToast('Failed to prefetch images');
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [prefetchHandler, netInfo.isConnected]);

  // Hide BootSplash when navigation is ready and preload is complete
  const onNavigationReady = useCallback(() => {
    const hideBootSplash = async () => {
      if (prefetchHandler.isComplete) {
        await RNBootSplash.hide({ fade: true });
      } else {
        // Wait a bit and check again
        setTimeout(hideBootSplash, 100);
      }
    };

    // Start checking after a short delay
    setTimeout(hideBootSplash, 100);
  }, [prefetchHandler]);

  return (
    <NavigationContainer onReady={onNavigationReady} theme={navigationTheme}>
      <SwipeNavigation />
    </NavigationContainer>
  );
});

RootNavigation.displayName = 'RootNavigation';
export default RootNavigation;
