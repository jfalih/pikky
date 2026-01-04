import SWIPE_ROUTES from "./_routes";
import { SwipeNavigatorConfigProps, SwipeScreenConfigProps } from "./swipe.types";
import { VStack } from "@components/atoms";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import React, { useRef, useCallback, useEffect } from "react";
import { useDerivedValue } from "react-native-reanimated";
import { TabBar } from "@components/molecules/swipe-tab-bar";
import deviceUtils from "@services/helper/deviceUtils";
import { useHapticFeedback } from "@hooks/utils/useHapticFeedback";
import HomePage from "@pages/home";
import FavoritePage from "@pages/favorite";

const TabBarContainer = ({ descriptors, jumpTo, navigation, state }: MaterialTopTabBarProps) => {
    const descriptorsRef = useRef(descriptors);
    const stateRef = useRef(state);
  
    const focusedIndexRef = useRef<number | undefined>(state.index);
    const { triggerHaptic } = useHapticFeedback();
  
    const currentIndex = state.index;
    const activeIndex = useDerivedValue(() => currentIndex, [currentIndex]);
  
    stateRef.current = state;
    descriptorsRef.current = descriptors;
  
    useEffect(() => {
      if (focusedIndexRef.current !== state.index) {
        focusedIndexRef.current = state.index;
        triggerHaptic('light');
      }
    }, [state.index, triggerHaptic]);

  
    const getIsFocused = useCallback(
      (index: number) => {
        return focusedIndexRef.current === index;
      },
      [focusedIndexRef]
    );

    return (
        <TabBar
          activeIndex={activeIndex}
          descriptorsRef={descriptorsRef}
          getIsFocused={getIsFocused}
          jumpTo={jumpTo}
          navigation={navigation}
          stateRef={stateRef}
        />
    );
  };

const defaultConfig: Partial<SwipeNavigatorConfigProps> = {
    tabBar: TabBarContainer,
    tabBarPosition: 'bottom',
    initialLayout: deviceUtils.dimensions,
    initialRouteName: SWIPE_ROUTES.HOME,
    screenOptions: {
        lazy: true,
        animationEnabled: false,
        lazyPlaceholder: () => <VStack fill />,
    },
}

const favoriteConfig: SwipeScreenConfigProps = {
    name: SWIPE_ROUTES.FAVORITE,
    component: FavoritePage,
}

const homeConfig: SwipeScreenConfigProps = {
    name: SWIPE_ROUTES.HOME,
    component: HomePage,
}

// const mapsConfig: SwipeScreenConfigProps = {
//     name: SWIPE_ROUTES.MAPS,
//     component: Maps,
// }

const swipeConfigs = {
    default: defaultConfig,
    [SWIPE_ROUTES.FAVORITE]: favoriteConfig,
    [SWIPE_ROUTES.HOME]: homeConfig,
}

export default swipeConfigs;