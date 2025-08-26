import styled from "styled-components/native";

import { TouchableOpacity, Text } from "react-native";

export const Button = styled(TouchableOpacity)(({ theme }) => ({
  padding: theme.spacing(2.5),
  alignItems: "center",
  borderRadius: theme.borderRadius.large,
  flexDirection: "row",
  gap: theme.spacing(1),
  justifyContent: "center",
}));

export const ButtonText = styled(Text)(({ theme }) => ({
  fontFamily: theme.fonts.family,
  fontWeight: theme.fonts.weights.medium,
  fontSize: theme.fontSize(4),
  color: theme.palette.white,
  marginTop: "2px",
}));

export const PrimaryButton = styled(Button)<{ disabled?: boolean }>(
  ({ theme, disabled }) => ({
    backgroundColor: disabled
      ? theme.palette.disabled
      : theme.palette.primary.main,
    opacity: disabled ? 0.5 : 1,
  })
);

export const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  borderWidth: 1,
  borderColor: theme.palette.white,
}));

export const TertiaryButton = styled(Button)(() => ({
  backgroundColor: "transparent",
}));

export const TertiaryButtonText = styled(ButtonText)(({ theme }) => ({
  fontSize: theme.fontSize(3.5),
  color: theme.palette.white,
  marginTop: 0,
}));
