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
      disabled: string;
    };
    fonts: {
      family: string;
      weights: {
        regular: number;
        medium: number;
      };
    };
    spacing: (n: number) => number;
    fontSize: (n: number) => number;
    borderRadius: {
      small: string;
      medium: string;
      large: string;
    };
  }
}
