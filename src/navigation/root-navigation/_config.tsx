import { Routes } from '@navigation/navigation.types';
import { ROOT_ROUTES } from './_routes';
import { SwipeNavigation } from '@navigation/swipe-navigation';

const defaultConfig = {
  screenOptions: {
    freezeOnBlur: true,
    // Only show header if screen explicitly requests it via options
    headerShown: false,
  },
};

const bottomConfig: Routes = {
  name: ROOT_ROUTES.BOTTOM,
  components: SwipeNavigation,
  auth: false,
};

export const rootNavigationConfigs = {
  default: defaultConfig,
  [ROOT_ROUTES.BOTTOM]: bottomConfig,
};

export const rootRoutes: Routes[] = [
  rootNavigationConfigs[ROOT_ROUTES.BOTTOM],
];

