import * as React from 'react';
import { Blur, Group, Paint, Path, Rect } from '@shopify/react-native-skia';
import { hashCode, getUnit, getRandomColor } from '../utilities';
import type { AvatarProps } from './types';
import { AvatarCanvas } from './avatar-canvas';
import { Transformed } from './transformed';

const ELEMENTS = 3;
const SIZE = 80;

function generateColors(name: string, colors: string[]) {
  const numFromName = hashCode(name);
  const range = colors && colors.length;

  return Array.from({ length: ELEMENTS }, (_, i) => ({
    color: getRandomColor(numFromName + i, colors, range),
    translateX: getUnit(numFromName * (i + 1), SIZE / 10, 1),
    translateY: getUnit(numFromName * (i + 1), SIZE / 10, 2),
    scale: 1.2 + getUnit(numFromName * (i + 1), SIZE / 20) / 10,
    rotate: getUnit(numFromName * (i + 1), 360, 1),
  }));
}

// Blur + overlay blend give the marble texture its soft, layered look.
const AvatarMarble = ({ name, colors, title = false, square = false, size = 40, style }: AvatarProps) => {
  const properties = generateColors(name, colors);

  return (
    <AvatarCanvas nativeSize={SIZE} size={size} square={square} title={title} name={name} style={style}>
      <Rect x={0} y={0} width={SIZE} height={SIZE} color={properties[0].color} />

      <Group
        layer={
          <Paint>
            <Blur blur={7} />
          </Paint>
        }
      >
        <Transformed
          translateX={properties[1].translateX}
          translateY={properties[1].translateY}
          rotate={properties[1].rotate}
          scale={properties[2].scale}
          pivot={SIZE / 2}
        >
          <Path
            path="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
            color={properties[1].color}
          />
        </Transformed>
      </Group>

      <Group
        layer={
          <Paint blendMode="overlay">
            <Blur blur={7} />
          </Paint>
        }
      >
        <Transformed
          translateX={properties[2].translateX}
          translateY={properties[2].translateY}
          rotate={properties[2].rotate}
          scale={properties[2].scale}
          pivot={SIZE / 2}
        >
          <Path
            path="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
            color={properties[2].color}
          />
        </Transformed>
      </Group>
    </AvatarCanvas>
  );
};

export default AvatarMarble;
