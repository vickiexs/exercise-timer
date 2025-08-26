import styled from "styled-components/native";
import { View, Text } from "react-native";

import { StyledText } from "@components/typography/styled";

export const Container = styled(View)(({ theme }) => ({
  flex: 1,
  justifyContent: "center",
  gap: theme.spacing(6),
}));

export const ProgressContainer = styled(View)(({ theme }) => ({
  padding: theme.spacing(6),
  alignItems: "center",
  gap: theme.spacing(3),
}));

export const TimerContainer = styled(View)(({ theme }) => ({
  width: "100%",
  alignItems: "center",
}));

export const TimerValue = styled(Text)<{ color: string }>(
  ({ theme, color }) => ({
    fontFamily: theme.fonts.family,
    fontWeight: theme.fonts.weights.medium,
    fontSize: theme.fontSize(12),
    color: color,
  })
);

export const RepCount = styled(StyledText)<{ color: string }>(
  ({ theme, color }) => ({
    fontSize: theme.fontSize(8),
    color: color,
  })
);

export const ButtonContainer = styled(View)(({ theme }) => ({
  marginTop: theme.spacing(4),
  gap: theme.spacing(10),
}));

export const Controls = styled(View)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "center",
  gap: theme.spacing(12),
}));
