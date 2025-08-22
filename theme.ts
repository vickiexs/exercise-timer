import { DefaultTheme } from "styled-components/native";

export const theme: DefaultTheme = {
  palette: {
    primary: {
      main: "#3AB5C5",
    },
    secondary: {
      main: "#3DC8A1",
    },
    tertiary: {
      main: "#F87C5A",
    },
    background: "#111111",
    text: "#111111",
    white: "#ffffff",
    black: "#000000",
    grey: "#EAEAEA",
  },
  fonts: {
    family: "Poppins",
    sizes: {
      large: "28px",
      medium: "18px",
      small: "16px",
    },
    weights: {
      regular: 400,
      medium: 500,
    },
  },
  spacing: (n: number) => `${n * 4}px`,
  fontSize: (n: number) => `${n * 4}px`,
  borderRadius: {
    small: "7px",
    medium: "10px",
    large: "30px",
  },
};

export default theme;
