import * as React from 'react';
import { Rect } from '@shopify/react-native-skia';
import { hashCode, getRandomColor } from '../utilities';
import type { AvatarProps } from './types';
import { AvatarCanvas } from './avatar-canvas';

const ELEMENTS = 64;
const SIZE = 80;

// Order matters: pixelColors[i] maps onto POSITIONS[i], so a given name
// always paints the same square.
const POSITIONS: Array<[number, number]> = [
  [0, 0], [20, 0], [40, 0], [60, 0],
  [10, 0], [30, 0], [50, 0], [70, 0],
  [0, 10], [0, 20], [0, 30], [0, 40], [0, 50], [0, 60], [0, 70],
  [20, 10], [20, 20], [20, 30], [20, 40], [20, 50], [20, 60], [20, 70],
  [40, 10], [40, 20], [40, 30], [40, 40], [40, 50], [40, 60], [40, 70],
  [60, 10], [60, 20], [60, 30], [60, 40], [60, 50], [60, 60], [60, 70],
  [10, 10], [10, 20], [10, 30], [10, 40], [10, 50], [10, 60], [10, 70],
  [30, 10], [30, 20], [30, 30], [30, 40], [30, 50], [30, 60], [30, 70],
  [50, 10], [50, 20], [50, 30], [50, 40], [50, 50], [50, 60], [50, 70],
  [70, 10], [70, 20], [70, 30], [70, 40], [70, 50], [70, 60], [70, 70],
];

function generateColors(name: string, colors: string[]) {
  const numFromName = hashCode(name);
  const range = colors && colors.length;

  return Array.from({ length: ELEMENTS }, (_, i) => getRandomColor(numFromName % (i + 1), colors, range));
}

const AvatarPixel = ({ name, colors, title = false, square = false, size = 40, style }: AvatarProps) => {
  const pixelColors = generateColors(name, colors);

  return (
    <AvatarCanvas nativeSize={SIZE} size={size} square={square} title={title} name={name} style={style}>
      {POSITIONS.map(([x, y], i) => (
        <Rect key={i} x={x} y={y} width={10} height={10} color={pixelColors[i]} />
      ))}
    </AvatarCanvas>
  );
};

export default AvatarPixel;
