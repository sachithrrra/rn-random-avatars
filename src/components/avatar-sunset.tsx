import * as React from 'react';
import { LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { hashCode, getRandomColor } from '../utilities';
import type { AvatarProps } from './types';
import { AvatarCanvas } from './avatar-canvas';

const ELEMENTS = 4;
const SIZE = 80;

function generateColors(name: string, colors: string[]) {
  const numFromName = hashCode(name);
  const range = colors && colors.length;

  return Array.from({ length: ELEMENTS }, (_, i) => getRandomColor(numFromName + i, colors, range));
}

const AvatarSunset = ({ name, colors, title = false, square = false, size = 40, style }: AvatarProps) => {
  const sunsetColors = generateColors(name, colors);

  return (
    <AvatarCanvas nativeSize={SIZE} size={size} square={square} title={title} name={name} style={style}>
      <Rect x={0} y={0} width={SIZE} height={SIZE / 2}>
        <LinearGradient
          start={vec(SIZE / 2, 0)}
          end={vec(SIZE / 2, SIZE / 2)}
          colors={[sunsetColors[0], sunsetColors[1]]}
        />
      </Rect>
      <Rect x={0} y={SIZE / 2} width={SIZE} height={SIZE / 2}>
        <LinearGradient
          start={vec(SIZE / 2, SIZE / 2)}
          end={vec(SIZE / 2, SIZE)}
          colors={[sunsetColors[2], sunsetColors[3]]}
        />
      </Rect>
    </AvatarCanvas>
  );
};

export default AvatarSunset;
