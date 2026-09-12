import * as React from 'react';
import { View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { Canvas, Group, rect, rrect } from '@shopify/react-native-skia';

type AvatarCanvasProps = {
  /** Coordinate space every child shape is drawn in (e.g. 36, 80, 90 to match upstream). */
  nativeSize: number;
  size: number;
  square?: boolean;
  title?: boolean;
  name: string;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

/** Shared shell: sizes the Canvas, scales the SIZE-unit drawing to it, and clips to a rounded/square mask. */
export function AvatarCanvas({
  nativeSize,
  size,
  square,
  title,
  name,
  style,
  children,
}: AvatarCanvasProps) {
  const scale = size / nativeSize;
  const radius = square ? 0 : nativeSize / 2;
  const clip = rrect(rect(0, 0, nativeSize, nativeSize), radius, radius);

  return (
    <View
      style={[{ width: size, height: size }, style]}
      accessible={!!title}
      accessibilityRole={title ? 'image' : undefined}
      accessibilityLabel={title ? name : undefined}
    >
      <Canvas style={{ width: size, height: size }} opaque={false}>
        <Group transform={[{ scale }]} clip={clip}>
          {children}
        </Group>
      </Canvas>
    </View>
  );
}
