import { Box, Pressable, Text, theme } from '../../atoms';
import { useCallback, useMemo, useEffect, useRef } from 'react';
import FastImage from '@d11/react-native-fast-image';
import { StyleSheet, View } from 'react-native';
import { Heart } from 'iconsax-react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  cancelAnimation,
} from 'react-native-reanimated';
import { ListItemDTO } from '@core/api/list.types';

const OUTER_PADDING = 16;

type ImageCardProps = {
  item: ListItemDTO;
  width: number;
  height: number;
  imageUrl: string;
  isFavorite?: boolean;
  onFavoritePress?: (item: ListItemDTO) => void;
};

const SPRING_CONFIG = {
  damping: 12,
  stiffness: 500,
  mass: 0.3,
};

export const ImageCard = ({
  item,
  width,
  height,
  imageUrl,
  isFavorite = false,
  onFavoritePress,
}: ImageCardProps) => {
  const scale = useSharedValue(1);
  const prevIsFavoriteRef = useRef(isFavorite);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      // Cancel any running animations when component unmounts
      cancelAnimation(scale);
    };
  }, [scale]);

  useEffect(() => {
    // Only animate when isFavorite changes from false to true and component is mounted
    if (isFavorite && !prevIsFavoriteRef.current && isMountedRef.current) {
      scale.value = withSequence(
        withSpring(1.3, SPRING_CONFIG),
        withSpring(1, SPRING_CONFIG),
      );
    }
    prevIsFavoriteRef.current = isFavorite;
  }, [isFavorite, scale]);

  const handleFavoritePress = useCallback(() => {
    if (!isMountedRef.current) return;
    
    // Trigger animation immediately on press
    scale.value = withSequence(
      withSpring(1.3, SPRING_CONFIG),
      withSpring(1, SPRING_CONFIG),
    );
    onFavoritePress?.(item);
  }, [item, onFavoritePress, scale]);

  const doubleTapGesture = useMemo(
    () =>
      Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
          if (onFavoritePress) {
            scheduleOnRN(onFavoritePress, item);
          }
        }),
    [item, onFavoritePress],
  );

  const animatedHeartStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Box style={[styles.itemContainer, { width, height }]}>
      <GestureDetector gesture={doubleTapGesture}>
        <View style={styles.imageContainer}>
          <FastImage
            source={{ uri: imageUrl }}
            style={[styles.image, { width, height }]}
            resizeMode="cover"
          />
        </View>
      </GestureDetector>
      <Pressable
        position={{
          top: 20,
          right: 20,
        }}
        onPress={handleFavoritePress}
      >
        <Animated.View style={animatedHeartStyle}>
          <Heart
            size={30}
            color={theme.pallate.neutral['01']}
            variant={isFavorite ? 'Bold' : 'Outline'}
          />
        </Animated.View>
      </Pressable>
      <Box
        style={styles.authorContainer}
        position={{
          bottom: 12,
          left: OUTER_PADDING / 2 + 12,
        }}
      >
        <Text
          type="b2"
          weight="medium"
          color={theme.pallate.neutral['01']}
          style={styles.authorText}
        >
          {item.author}
        </Text>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    position: 'relative',
  },
  imageContainer: {
    marginHorizontal: OUTER_PADDING / 2,
  },
  image: {
    borderRadius: 5,
    backgroundColor: theme.pallate.neutral['05'],
  },
  authorContainer: {
    position: 'absolute',
  },
  authorText: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});

