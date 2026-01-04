import { FlashList } from '@shopify/flash-list';
import { Box, Text, theme, VStack } from '../../components/atoms';
import { useCallback } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart } from 'iconsax-react-native';
import { ImageCard } from '../../components/molecules';
import { useFavorites } from '../../hooks/use-favorites';
import { resizePicsumImage } from '../../services/helper/imageUtils';

const OUTER_PADDING = 16;

const FavoritePage = () => {
  const { width } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

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
          Favorite Images
        </Text>
        <Text type="b2" color={theme.pallate.neutral['03']}>
          Your saved images will appear here.
        </Text>
      </VStack>
    );
  }, []);

  const ListEmptyComponent = useCallback(() => {
    return (
      <VStack
        fill
        items="center"
        justify="center"
        spacing={theme.spacing.standard}
        padding={{
          paddingHorizontal: theme.spacing.large,
          paddingTop: theme.spacing.extraLarge * 2,
        }}
      >
        <Heart size={64} color={theme.pallate.neutral['04']} variant="Bold" />
        <Text
          type="s2"
          weight="semibold"
          color={theme.pallate.neutral['01']}
        >
          No favorites yet
        </Text>
        <Text
          type="b2"
          color={theme.pallate.neutral['03']}
          align="center"
        >
          Start exploring and save your favorite images by tapping the heart icon.
        </Text>
      </VStack>
    );
  }, []);

  return (
    <FlashList
      data={favorites}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      keyExtractor={item => item.id}
      numColumns={2}
      contentContainerStyle={[
        styles.contentContainer,
        {
          paddingTop: top + theme.spacing.standard,
          paddingBottom: bottom + theme.spacing.extraLarge * 3,
        },
      ]}
      ItemSeparatorComponent={ItemSeparatorComponent}
      renderItem={renderItem}
    />
  );
};

export default FavoritePage;

const styles = StyleSheet.create({
  contentContainer: {
    minHeight: '100%',
  },
});
