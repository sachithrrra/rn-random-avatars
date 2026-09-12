import * as React from 'react';
import { Circle, Path } from '@shopify/react-native-skia';
import { hashCode, getRandomColor } from '../utilities';
import type { AvatarProps } from './types';
import { AvatarCanvas } from './avatar-canvas';

const SIZE = 90;
const COLORS = 5;

function generateColors(name: string, colors: string[]) {
  const numFromName = hashCode(name);
  const range = colors && colors.length;
  const colorsShuffle = Array.from({ length: COLORS }, (_, i) =>
    getRandomColor(numFromName + i, colors, range),
  );
  return [
    colorsShuffle[0],
    colorsShuffle[1],
    colorsShuffle[1],
    colorsShuffle[2],
    colorsShuffle[2],
    colorsShuffle[3],
    colorsShuffle[3],
    colorsShuffle[0],
    colorsShuffle[4],
  ];
}

const AvatarRing = ({ name, colors, title = false, square = false, size = 40, style }: AvatarProps) => {
  const ringColors = generateColors(name, colors);

  return (
    <AvatarCanvas nativeSize={SIZE} size={size} square={square} title={title} name={name} style={style}>
      <Path path="M0 0h90v45H0z" color={ringColors[0]} />
      <Path path="M0 45h90v45H0z" color={ringColors[1]} />
      <Path path="M83 45a38 38 0 00-76 0h76z" color={ringColors[2]} />
      <Path path="M83 45a38 38 0 01-76 0h76z" color={ringColors[3]} />
      <Path path="M77 45a32 32 0 10-64 0h64z" color={ringColors[4]} />
      <Path path="M77 45a32 32 0 11-64 0h64z" color={ringColors[5]} />
      <Path path="M71 45a26 26 0 00-52 0h52z" color={ringColors[6]} />
      <Path path="M71 45a26 26 0 01-52 0h52z" color={ringColors[7]} />
      <Circle cx={45} cy={45} r={23} color={ringColors[8]} />
    </AvatarCanvas>
  );
};

export default AvatarRing;
