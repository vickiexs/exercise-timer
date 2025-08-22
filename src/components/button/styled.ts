import styled from "styled-components/native";

import { TouchableOpacity, Text } from "react-native";

export const Button = styled(TouchableOpacity)(({ theme }) => ({
  padding: theme.spacing(2.5),
  alignItems: "center",
  borderRadius: theme.borderRadius.large,
}));

export const ButtonText = styled(Text)(({ theme }) => ({
  fontFamily: theme.fonts.family,
  fontWeight: theme.fonts.weights.medium,
  fontSize: theme.fontSize(4),
  color: theme.palette.white,
  marginTop: "2px",
}));

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  borderWidth: "1px",
  borderColor: theme.palette.white,
}));
