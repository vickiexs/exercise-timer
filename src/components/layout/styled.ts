import styled from "styled-components/native";

import { View } from "react-native";

export const Container = styled(View)(({ theme }) => ({
  height: "100%",
  backgroundColor: theme.palette.background,
  paddingHorizontal: theme.spacing(12),
  paddingVertical: theme.spacing(15),
}));
