import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    palette: {
      primary: {
        main: string;
      };
      secondary: {
        main: string;
      };
      tertiary: {
        main: string;
      };
      background: string;
      text: string;
      white: string;
      black: string;
      grey: string;
    };
    fonts: {
      family: string;
      sizes: {
        large: string;
        medium: string;
        small: string;
      };
      weights: {
        regular: number;
        medium: number;
      };
    };
    spacing: (n: number) => string;
    fontSize: (n: number) => string;
    borderRadius: {
      small: string;
      medium: string;
      large: string;
    };
  }
}
