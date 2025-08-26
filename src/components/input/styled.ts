import styled from "styled-components/native";

import { View, TextInput } from "react-native";

import { StyledText } from "../typography/styled";

export const Container = styled(View)(({ theme }) => ({
  gap: theme.spacing(1),
}));

export const Label = styled(StyledText)<{
  mode: "light" | "dark";
}>(({ theme, mode }) => ({
  fontSize: theme.fontSize(4),
  color: mode === "light" ? theme.palette.text : theme.palette.white,
}));

export const Input = styled(TextInput)<{
  mode: "light" | "dark";
  centreText: boolean;
}>(({ theme, mode, centreText }) => ({
  width: "100%",
  height: 36,
  borderWidth: 1,
  borderColor: mode === "dark" ? theme.palette.white : theme.palette.text,
  borderRadius: theme.borderRadius.small,
  paddingHorizontal: 10,
  paddingVertical: 6,
  color: mode === "dark" ? theme.palette.white : theme.palette.text,
  backgroundColor: "transparent",
  fontFamily: theme.fonts.family,
  fontWeight: theme.fonts.weights.regular,
  fontSize: theme.fontSize(4),
  textAlign: centreText ? "center" : "left",
  paddingTop: 0,
  paddingBottom: 0,
}));
