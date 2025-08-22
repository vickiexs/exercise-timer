import styled from "styled-components/native";

import { Text } from "react-native";

export const StyledText = styled(Text)(({ theme }) => ({
  fontFamily: theme.fonts.family,
  fontWeight: theme.fonts.weights.medium,
}));

export const Heading = styled(StyledText)<{ color?: string }>(
  ({ theme, color }) => ({
    fontSize: theme.fontSize(7),
    color: color || theme.palette.white,
  })
);

export const SubHeading = styled(StyledText)<{ color?: string }>(
  ({ theme, color }) => ({
    fontSize: theme.fontSize(5),
    color: color || theme.palette.white,
  })
);

export const Body = styled(StyledText)<{ color?: string }>(
  ({ theme, color }) => ({
    fontSize: theme.fontSize(4),
    color: color || theme.palette.white,
  })
);
