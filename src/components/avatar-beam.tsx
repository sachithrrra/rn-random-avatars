import * as React from 'react';
import { Path, Rect, RoundedRect } from '@shopify/react-native-skia';
import { hashCode, getUnit, getBoolean, getRandomColor, getContrast } from '../utilities';
import type { AvatarProps } from './types';
import { AvatarCanvas } from './avatar-canvas';
import { Transformed } from './transformed';

const SIZE = 36;

function generateData(name: string, colors: string[]) {
  const numFromName = hashCode(name);
  const range = colors && colors.length;
  const wrapperColor = getRandomColor(numFromName, colors, range);
  const preTranslateX = getUnit(numFromName, 10, 1);
  const wrapperTranslateX = preTranslateX < 5 ? preTranslateX + SIZE / 9 : preTranslateX;
  const preTranslateY = getUnit(numFromName, 10, 2);
  const wrapperTranslateY = preTranslateY < 5 ? preTranslateY + SIZE / 9 : preTranslateY;

  return {
    wrapperColor,
    faceColor: getContrast(wrapperColor),
    backgroundColor: getRandomColor(numFromName + 13, colors, range),
    wrapperTranslateX,
    wrapperTranslateY,
    wrapperRotate: getUnit(numFromName, 360),
    wrapperScale: 1 + getUnit(numFromName, SIZE / 12) / 10,
    isMouthOpen: getBoolean(numFromName, 2),
    isCircle: getBoolean(numFromName, 1),
    eyeSpread: getUnit(numFromName, 5),
    mouthSpread: getUnit(numFromName, 3),
    faceRotate: getUnit(numFromName, 10, 3),
    faceTranslateX:
      wrapperTranslateX > SIZE / 6 ? wrapperTranslateX / 2 : getUnit(numFromName, 8, 1),
    faceTranslateY:
      wrapperTranslateY > SIZE / 6 ? wrapperTranslateY / 2 : getUnit(numFromName, 7, 2),
  };
}

const AvatarBeam = ({ name, colors, title = false, square = false, size = 40, style }: AvatarProps) => {
  const data = generateData(name, colors);

  return (
    <AvatarCanvas nativeSize={SIZE} size={size} square={square} title={title} name={name} style={style}>
      <Rect x={0} y={0} width={SIZE} height={SIZE} color={data.backgroundColor} />

      <Transformed
        translateX={data.wrapperTranslateX}
        translateY={data.wrapperTranslateY}
        rotate={data.wrapperRotate}
        scale={data.wrapperScale}
        pivot={SIZE / 2}
      >
        <RoundedRect
          x={0}
          y={0}
          width={SIZE}
          height={SIZE}
          r={data.isCircle ? SIZE : SIZE / 6}
          color={data.wrapperColor}
        />
      </Transformed>

      <Transformed
        translateX={data.faceTranslateX}
        translateY={data.faceTranslateY}
        rotate={data.faceRotate}
        pivot={SIZE / 2}
      >
        {data.isMouthOpen ? (
          <Path
            path={'M15 ' + (19 + data.mouthSpread) + 'c2 1 4 1 6 0'}
            color={data.faceColor}
            style="stroke"
            strokeWidth={1}
            strokeCap="round"
          />
        ) : (
          <Path
            path={'M13,' + (19 + data.mouthSpread) + ' a1,0.75 0 0,0 10,0'}
            color={data.faceColor}
            style="fill"
          />
        )}
        <RoundedRect
          x={14 - data.eyeSpread}
          y={14}
          width={1.5}
          height={2}
          r={1}
          color={data.faceColor}
        />
        <RoundedRect
          x={20 + data.eyeSpread}
          y={14}
          width={1.5}
          height={2}
          r={1}
          color={data.faceColor}
        />
      </Transformed>
    </AvatarCanvas>
  );
};

export default AvatarBeam;
