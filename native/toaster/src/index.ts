import { getHybridObjectConstructor } from 'react-native-nitro-modules';
import type { Toaster } from './specs/Toaster.nitro';

export type { Toaster };

const ToasterConstructor = getHybridObjectConstructor<Toaster>('Toaster');

export const toaster = new ToasterConstructor();
