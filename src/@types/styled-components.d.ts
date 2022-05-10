import { CSSProperties } from 'react';
import 'styled-components';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline';

type Typography = Record<Variant, CSSProperties>;

type PaletteColor = {
  light: string;
  main: string;
  dark: string;
};

type TypeBackground = {
  primary: string;
  secondary: string;
};

type TypeText = {
  primary: string;
  secondary: string;
  disabled: string;
};

declare module 'styled-components' {
  interface DefaultTheme {
    palette: {
      primary: PaletteColor;
      secondary: PaletteColor;
      error: PaletteColor;
      warning: PaletteColor;
      success: PaletteColor;
      text: TypeText;
      background: TypeBackground;
      border: string;
    };
    typography: Typography;
  }
}
