import styled from "styled-components/native";
import { View, Text, TouchableOpacity } from "react-native";

export const Container = styled(View)(() => ({
  flex: 1,
  justifyContent: "center",
}));

export const Card = styled(View)(({ theme }) => ({
  backgroundColor: theme.palette.white,
  borderRadius: theme.borderRadius.medium,
  padding: theme.spacing(6),
  marginBottom: theme.spacing(6),
  shadowColor: theme.palette.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 4,
  elevation: 2,
}));

export const CardCenter = styled(View)(() => ({
  alignItems: "center",
}));

export const ProgressBarBackground = styled(View)(({ theme }) => ({
  height: "8px",
  backgroundColor: theme.palette.grey,
  borderRadius: 999,
  width: "100%",
  marginTop: theme.spacing(4),
}));

export const ProgressBarFill = styled(View)<{ widthPercent: number }>(
  ({ theme, widthPercent }) => ({
    height: "100%",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 999,
    width: `${Math.max(0, Math.min(100, widthPercent))}%`,
  })
);

export const TimerLabel = styled(Text)(({ theme }) => ({
  fontFamily: theme.fonts.family,
  fontWeight: theme.fonts.weights.medium as any,
  fontSize: theme.fontSize(4),
  color: theme.palette.text,
  backgroundColor: theme.palette.grey,
  paddingHorizontal: theme.spacing(2),
  paddingVertical: theme.spacing(1),
  borderRadius: theme.borderRadius.small,
  overflow: "hidden",
}));

export const TimerValue = styled(Text)(({ theme }) => ({
  fontFamily: theme.fonts.family,
  fontWeight: theme.fonts.weights.medium as any,
  fontSize: theme.fontSize(12),
  color: theme.palette.primary.main,
  marginTop: theme.spacing(4),
}));

export const ControlsRow = styled(View)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "center",
  gap: theme.spacing(6),
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(5),
}));

export const ControlButton = styled(TouchableOpacity)<{
  variant?: "primary" | "secondary";
}>(({ theme, variant = "primary" }) => ({
  paddingVertical: theme.spacing(3),
  paddingHorizontal: theme.spacing(5),
  borderRadius: theme.borderRadius.large,
  backgroundColor:
    variant === "primary" ? theme.palette.primary.main : theme.palette.white,
  borderWidth: variant === "secondary" ? "1px" : 0,
  borderColor: theme.palette.grey,
  alignItems: "center",
  justifyContent: "center",
}));

export const ControlButtonText = styled(Text)(({ theme }) => ({
  fontFamily: theme.fonts.family,
  fontWeight: theme.fonts.weights.medium as any,
  fontSize: theme.fontSize(5),
  color: theme.palette.white,
}));

export const SmallText = styled(Text)(({ theme }) => ({
  fontFamily: theme.fonts.family,
  fontWeight: theme.fonts.weights.medium as any,
  fontSize: theme.fontSize(4),
  color: theme.palette.text,
  marginTop: theme.spacing(3),
}));
