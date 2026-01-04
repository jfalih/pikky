declare module 'react-native-config' {
    export interface NativeConfig {
        APP_NAME?: string;
        API_GATEWAY_URL?: string;
    }
    
    export const Config: NativeConfig
    export default Config
  }