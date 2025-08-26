import styled from "styled-components/native";
import { View } from "react-native";

export const Background = styled(View)(() => ({
  height: 8,
  backgroundColor: "transparent",
  borderRadius: 5,
  width: "100%",
}));

export const Fill = styled(View)<{ progress: number; fillColor: string }>(
  ({ theme, progress, fillColor }) => ({
    height: "100%",
    backgroundColor: fillColor || theme.palette.white,
    borderRadius: 5,
    width: `${Math.max(0, Math.min(100, progress))}%`,
  })
);
