# rn-random-avatars

> Ported from [boring-avatars](https://github.com/boringdesigners/boring-avatars) to React Native, rendered with Skia.

React Native library that generates deterministic, colorful, geometric avatars from any username and
color palette. Six variants, no image assets, no network requests, just math and Skia.

<p>
  <img src="https://raw.githubusercontent.com/sachithrrra/rn-random-avatars/master/docs/variants-round.png" width="24%" alt="All six variants, round" />
  <img src="https://raw.githubusercontent.com/sachithrrra/rn-random-avatars/master/docs/variants-square.png" width="24%" alt="All six variants, square" />
  <img src="https://raw.githubusercontent.com/sachithrrra/rn-random-avatars/master/docs/variants-default-palette.png" width="24%" alt="All six variants with the default palette" />
  <img src="https://raw.githubusercontent.com/sachithrrra/rn-random-avatars/master/docs/sizes.png" width="24%" alt="Marble variant at sizes 16 to 96" />
</p>

## Installation

### 1. Install the package and its peer dependency

Expo:

```sh
npx expo install @shopify/react-native-skia
npm install rn-random-avatars
```

Bare React Native:

```sh
npm install @shopify/react-native-skia rn-random-avatars
cd ios && pod install && cd ..
```

### 2. Rebuild the native app

`@shopify/react-native-skia` contains native code, so a JS-only reload is not enough after installing it.

Expo (development build; Expo Go is not supported by Skia):

```sh
npx expo run:ios
# or
npx expo run:android
```

Bare React Native:

```sh
npx react-native run-ios
# or
npx react-native run-android
```

### Requirements

- React Native 0.73 or newer
- React 18 or newer
- `@shopify/react-native-skia` 1.0 or newer

## Usage

```tsx
import Avatar from 'rn-random-avatars';

<Avatar
  size={40}
  name="Maria Mitchell"
  variant="beam"
  colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
/>;
```

### Props

| Prop      | Type        | Default              | Notes                                                                      |
| --------- | ----------- | -------------------- | --------------------------------------------------------------------------- |
| `name`    | `string`    | `'Clara Barton'`      | Seed for the deterministic hash.                                            |
| `colors`  | `string[]`  | 5-color default set   | Hex colors used to fill the generated shapes.                               |
| `variant` | `string`    | `'marble'`            | `marble`, `beam`, `pixel`, `sunset`, `bauhaus`, `ring`.                      |
| `size`    | `number`    | `40`                  | Pixel size (RN has no CSS units, so this must be a number).                  |
| `square`  | `boolean`   | `false`               | Square corners instead of the default fully-rounded clip.                   |
| `title`   | `boolean`   | `false`               | Exposes `name` as `accessibilityLabel` on the wrapping view.                 |
| `style`   | `ViewStyle` | none                  | Passed to the wrapping `View`.                                              |

Individual variants are also exported directly: `AvatarBeam`, `AvatarBauhaus`, `AvatarRing`,
`AvatarPixel`, `AvatarSunset`, `AvatarMarble`.

```tsx
import { AvatarMarble } from 'rn-random-avatars';

<AvatarMarble name="Maria Mitchell" colors={['#0A0310', '#49007E', '#FF005B', '#FF7D10', '#FFB238']} size={64} />;
```

## How it works

Each variant deterministically hashes `name` into a set of shapes, positions, rotations, and colors
(`src/utilities.ts`), then draws them on a Skia `Canvas`:

- Shapes: `Canvas`/`Group`/`Rect`/`Path`/`Circle`/`Line`.
- Rounded/square clipping: an antialiased `clip` on the root `Group`.
- Gradients: `<LinearGradient>`.
- Transform composition (translate, rotate around a pivot, scale): `src/components/transformed.tsx`.
- The `marble` variant's blur + overlay blend: a `layer` paint with `<Blur>` and `blendMode="overlay"`.

## Development

```sh
npm install
npm run build
```

## License

MIT
