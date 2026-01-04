import { QueryClient } from '@tanstack/react-query';
import FastImage from '@d11/react-native-fast-image';
import { resizePicsumImage } from './imageUtils';
import { listQueryKeys } from '../hooks/apis/list';
import { ListItemDTO } from '@core/api/list.types';

export type PrefetchOptions = {
  limit?: number;
  imageWidth: number;
  imageHeight: number;
  onComplete?: () => void;
  onError?: (error: Error) => void;
};

/**
 * Prefetch list data and preload images for better performance
 * @param queryClient - React Query client instance
 * @param options - Prefetch configuration options
 * @returns Promise that resolves when prefetch is complete
 */
export const prefetchListAndImages = async (
  queryClient: QueryClient,
  options: PrefetchOptions,
): Promise<void> => {
  const { limit = 100, imageWidth, imageHeight, onComplete, onError } = options;

  try {
    // Fetch list data using React Query
    const queryKey = listQueryKeys.list.getList(limit).queryKey;
    const data = await queryClient.fetchQuery<ListItemDTO[]>({
      queryKey,
      queryFn: async () => {
        const queryOptions = listQueryKeys.list.getList(limit);
        return (queryOptions as any).queryFn({ pageParam: 1 });
      },
    });

    if (data && Array.isArray(data) && data.length > 0) {
      // Preload images
      const imageUrls = data.map((item: ListItemDTO) =>
        resizePicsumImage(item.download_url, imageWidth, imageHeight),
      );

      // Preload all images using FastImage.preload
      FastImage.preload(imageUrls.map((url: string) => ({ uri: url })));
    }

    onComplete?.();
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Prefetch failed');
    console.error('Preload fetch error:', err);
    onError?.(err);
    // Re-throw to allow caller to handle
    throw err;
  }
};

/**
 * Hook-like function to prefetch with network awareness
 * Returns a handler object with prefetch function and completion state
 */
export const createPrefetchHandler = (
  queryClient: QueryClient,
  options: PrefetchOptions,
) => {
  const isPrefetchComplete = { current: false };

  const prefetch = async () => {
    if (isPrefetchComplete.current) return;

    try {
      await prefetchListAndImages(queryClient, {
        ...options,
        onComplete: () => {
          isPrefetchComplete.current = true;
          options.onComplete?.();
        },
        onError: (error) => {
          // On error, mark as complete anyway to proceed
          isPrefetchComplete.current = true;
          options.onError?.(error);
        },
      });
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error('Prefetch failed');
      console.error('Preload fetch error:', err);
      // Mark as complete even on error to prevent blocking
      isPrefetchComplete.current = true;
    }
  };

  return {
    prefetch,
    get isComplete() {
      return isPrefetchComplete.current;
    },
  };
};

