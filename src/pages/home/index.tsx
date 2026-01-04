import { FlashList } from '@shopify/flash-list';
import { Box, Text, theme, VStack, Flex, Pressable, HStack } from '../../components/atoms';
import { useCallback, useMemo } from 'react';
import { useWindowDimensions, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageCard } from '../../components/molecules';
import { useFavorites } from '../../hooks/use-favorites';
import { useGetList } from '../../services/hooks/apis/list';
import { ListItemDTO } from '../../core/api/list.types';
import { RefreshCircle } from 'iconsax-react-native';
import { StyleSheet } from 'react-native';
import { useNetworkError } from '../../services/hooks/utils';
import { resizePicsumImage } from '../../services/helper/imageUtils';

const OUTER_PADDING = 16;

const HomePage = () => {
  const { width } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const { toggleFavorite, isFavorite } = useFavorites();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useGetList(20);
  const { isNetworkError, isOffline } = useNetworkError(error);

  const flattenedData = useMemo(() => {
    if (!data || !('pages' in data)) {
      return [];
    }
    return (data as { pages: ListItemDTO[][] }).pages.flat();
  }, [data]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      const normalizeWidth = Math.round(width / 2 - OUTER_PADDING);
      const normalizeHeight = 300;
      const resizedUrl = resizePicsumImage(
        item.download_url,
        normalizeWidth,
        normalizeHeight,
      );

      return (
        <ImageCard
          item={item}
          width={normalizeWidth}
          height={normalizeHeight}
          imageUrl={resizedUrl}
          isFavorite={isFavorite(item.id)}
          onFavoritePress={toggleFavorite}
        />
      );
    },
    [width, isFavorite, toggleFavorite],
  );

  const ItemSeparatorComponent = useCallback(() => {
    return <Box height={theme.spacing.standard} />;
  }, []);

  const ListHeaderComponent = useCallback(() => {
    return (
      <VStack
        padding={{
          paddingHorizontal: theme.spacing.large,
          paddingBottom: theme.spacing.large,
        }}
      >
        <Text type="s1" weight="bold" color={theme.pallate.neutral['01']}>
          Discover Images
        </Text>
        <Text type="b2" color={theme.pallate.neutral['03']}>
          Explore the best images from around the world.
        </Text>
      </VStack>
    );
  }, []);

  const ListFooterComponent = useCallback(() => {
    if (!isFetchingNextPage) {
      return null;
    }
    return (
        <Flex justify="center" padding={{
          paddingVertical: theme.spacing.large,
        }} items="center">
          <ActivityIndicator size="small" color={theme.pallate.neutral['01']} />
        </Flex>
    );
  }, [isFetchingNextPage]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <Flex fill items="center" justify="center">
        <ActivityIndicator size="large" color={theme.pallate.neutral['01']} />
      </Flex>
    );
  }

  // Show offline/error UI if there's an error OR if device is offline
  if (isError || isOffline) {
    return (
      <Flex fill items="center" justify="center" padding={theme.spacing.large}>
        <VStack spacing={theme.spacing.large} items="center">
          <RefreshCircle
            size={64}
            color={theme.pallate.neutral['04']}
            variant="Bold"
          />
          <VStack spacing={theme.spacing.standard} items="center">
            <Text type="s2" weight="semibold" color={theme.pallate.neutral['01']}>
              {isNetworkError || isOffline ? 'You are offline' : 'Error loading images'}
            </Text>
            <Text
              type="b2"
              color={theme.pallate.neutral['03']}
              align="center"
              style={styles.errorMessage}
            >
              {isNetworkError || isOffline
                ? isOffline
                  ? 'No internet connection. Please check your network settings.'
                  : 'Please check your internet connection and try again.'
                : 'Something went wrong. Please try again later.'}
            </Text>
          </VStack>
          <Pressable
            onPress={handleRetry}
            disabled={isRefetching || isOffline}
            padding={{
              paddingHorizontal: theme.spacing.large,
              paddingVertical: theme.spacing.standard,
            }}
            style={styles.retryButton}
          >
            <HStack spacing={theme.spacing.small} items="center">
              {isRefetching ? (
                <ActivityIndicator size="small" color={theme.pallate.neutral['01']} />
              ) : (
                <RefreshCircle
                  size={20}
                  color={theme.pallate.neutral['01']}
                  variant="Bold"
                />
              )}
              <Text type="b1" weight="semibold" color={theme.pallate.neutral['01']}>
                {isRefetching ? 'Retrying...' : 'Retry'}
              </Text>
            </HStack>
          </Pressable>
        </VStack>
      </Flex>
    );
  }

  return (
    <FlashList
      data={flattenedData}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      keyExtractor={item => item.id}
      numColumns={2}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{
        paddingTop: top + theme.spacing.standard,
        paddingBottom: bottom + theme.spacing.extraLarge * 3,
      }}
      ItemSeparatorComponent={ItemSeparatorComponent}
      renderItem={renderItem}
    />
  );
};

export default HomePage;

const styles = StyleSheet.create({
  errorMessage: {
    maxWidth: 280,
  },
  networkStatus: {
    marginTop: theme.spacing.small,
  },
  retryButton: {
    backgroundColor: theme.pallate.neutral['04'],
    borderRadius: 8,
  },
});
