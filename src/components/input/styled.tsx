import styled from "styled-components/native";

import { TextInput } from "react-native";

export const Input = styled(TextInput)<{
  mode: "light" | "dark";
  centreText: boolean;
}>(({ theme, mode, centreText }) => ({
  width: "100%",
  height: "32px",
  borderWidth: "1px",
  borderColor: mode === "dark" ? theme.palette.white : theme.palette.text,
  borderRadius: theme.borderRadius.small,
  padding: "6px 10px",
  color: mode === "dark" ? theme.palette.white : theme.palette.text,
  backgroundColor: "transparent",
  fontFamily: theme.fonts.family,
  fontWeight: theme.fonts.weights.regular,
  fontSize: theme.fontSize(4),
  textAlign: centreText ? "center" : "left",
  paddingTop: 0,
  paddingBottom: 0,
}));
