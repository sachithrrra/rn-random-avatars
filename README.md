# rn-random-avatars

> Ported from [boring-avatars](https://github.com/boringdesigners/boring-avatars) to React Native, rendered with Skia.

React Native library that generates deterministic, colorful, geometric avatars from any username and
color palette. Six variants, no image assets, no network requests, just math and Skia.

## Install

```sh
npm install rn-random-avatars @shopify/react-native-skia
```

`@shopify/react-native-skia` and `react-native` are peer dependencies, so install/link them per their own
setup instructions (works with bare React Native and Expo).

## Usage

```tsx
import Avatar from 'rn-random-avatars';

<Avatar
  size={40}
  name="Maria Mitchell"
  variant="beam" // 'marble' | 'beam' | 'pixel' | 'sunset' | 'bauhaus' | 'ring'
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
| `square`  | `boolean`   | `false`               | Square corners instead of the default fully-rounded mask.                   |
| `title`   | `boolean`   | `false`               | Exposes `name` as `accessibilityLabel` on the wrapping view.                 |
| `style`   | `ViewStyle` | none                  | Passed to the wrapping `View`.                                              |

Individual variants are also exported directly: `AvatarBeam`, `AvatarBauhaus`, `AvatarRing`,
`AvatarPixel`, `AvatarSunset`, `AvatarMarble`.

## How it works

Each variant deterministically hashes `name` into a set of shapes, positions, rotations, and colors
(`src/utilities.ts`), then draws them on a Skia `Canvas`:

- Shapes: `Canvas`/`Group`/`Rect`/`Path`/`Circle`/`Line`.
- Rounded/square clipping: `<Mask mode="alpha">`.
- Gradients: `<LinearGradient>`.
- Transform composition (translate → rotate around a pivot → scale): `src/components/transformed.tsx`.
- The `marble` variant's blur + overlay blend: Skia `<Blur>` + `<Group blendMode="overlay">`.

## Build

```sh
npm install
npm run build
```

## License

MIT
