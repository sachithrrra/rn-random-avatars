import * as React from 'react';
import { Group } from '@shopify/react-native-skia';

type TransformedProps = {
  translateX?: number;
  translateY?: number;
  /** Degrees. Pivots around `pivot`, matching SVG `rotate(deg cx cy)`. */
  rotate?: number;
  /** Pivots around (0,0) after rotate, matching SVG `... rotate(...) scale(...)`. */
  scale?: number;
  pivot?: number;
  children: React.ReactNode;
};

/**
 * Applies translate → rotate (around `pivot`) → scale (around origin) in that
 * order, matching how `transform="translate(tx ty) rotate(deg cx cy) scale(s)"`
 * composes.
 */
export function Transformed({
  translateX = 0,
  translateY = 0,
  rotate,
  scale,
  pivot,
  children,
}: TransformedProps) {
  let node = children;

  if (scale !== undefined) {
    node = <Group transform={[{ scale }]}>{node}</Group>;
  }

  if (rotate !== undefined) {
    node = (
      <Group
        transform={[{ rotate: (rotate * Math.PI) / 180 }]}
        origin={pivot !== undefined ? { x: pivot, y: pivot } : undefined}
      >
        {node}
      </Group>
    );
  }

  if (translateX || translateY) {
    node = <Group transform={[{ translateX, translateY }]}>{node}</Group>;
  }

  return <>{node}</>;
}
