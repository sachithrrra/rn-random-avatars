import type { StyleProp, ViewStyle } from 'react-native';

export type AvatarProps = {
  name: string;
  colors: string[];
  /** Renders an accessibilityLabel on the wrapping view (parity with the web <title>). */
  title?: boolean;
  square?: boolean;
  /** Pixel size of the avatar. Unlike the web package this must be a number (RN has no CSS units). */
  size?: number;
  style?: StyleProp<ViewStyle>;
};
