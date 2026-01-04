import type { HybridObject } from 'react-native-nitro-modules';

export interface Toaster extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  showToast(message: string): void
}