import * as React from 'react';
import { Circle, Line, Rect } from '@shopify/react-native-skia';
import { hashCode, getUnit, getRandomColor, getBoolean } from '../utilities';
import type { AvatarProps } from './types';
import { AvatarCanvas } from './avatar-canvas';
import { Transformed } from './transformed';

const ELEMENTS = 4;
const SIZE = 80;

function generateColors(name: string, colors: string[]) {
  const numFromName = hashCode(name);
  const range = colors && colors.length;

  return Array.from({ length: ELEMENTS }, (_, i) => ({
    color: getRandomColor(numFromName + i, colors, range),
    translateX: getUnit(numFromName * (i + 1), SIZE / 2 - (i + 17), 1),
    translateY: getUnit(numFromName * (i + 1), SIZE / 2 - (i + 17), 2),
    rotate: getUnit(numFromName * (i + 1), 360),
    isSquare: getBoolean(numFromName, 2),
  }));
}

const AvatarBauhaus = ({
  name,
  colors,
  title = false,
  square = false,
  size = 40,
  style,
}: AvatarProps) => {
  const properties = generateColors(name, colors);

  return (
    <AvatarCanvas nativeSize={SIZE} size={size} square={square} title={title} name={name} style={style}>
      <Rect x={0} y={0} width={SIZE} height={SIZE} color={properties[0].color} />

      <Transformed
        translateX={properties[1].translateX}
        translateY={properties[1].translateY}
        rotate={properties[1].rotate}
        pivot={SIZE / 2}
      >
        <Rect
          x={(SIZE - 60) / 2}
          y={(SIZE - 20) / 2}
          width={SIZE}
          height={properties[1].isSquare ? SIZE : SIZE / 8}
          color={properties[1].color}
        />
      </Transformed>

      <Transformed translateX={properties[2].translateX} translateY={properties[2].translateY}>
        <Circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 5} color={properties[2].color} />
      </Transformed>

      <Transformed
        translateX={properties[3].translateX}
        translateY={properties[3].translateY}
        rotate={properties[3].rotate}
        pivot={SIZE / 2}
      >
        <Line
          p1={{ x: 0, y: SIZE / 2 }}
          p2={{ x: SIZE, y: SIZE / 2 }}
          strokeWidth={2}
          style="stroke"
          color={properties[3].color}
        />
      </Transformed>
    </AvatarCanvas>
  );
};

export default AvatarBauhaus;
