import { CSSProperties } from 'react';
import 'styled-components';

declare module 'styled-components' {
  export type TypographyVariant =
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

  export type Typography = Record<TypographyVariant, CSSProperties>;

  export type PaletteColor = {
    light: string;
    main: string;
    dark: string;
    contrastText: string;
  };

  export type TypeBackground = {
    primary: string;
    secondary: string;
  };

  export type TypeText = {
    primary: string;
    secondary: string;
    disabled: string;
  };

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
    breakpoints: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    typography: Typography;
  }
}
