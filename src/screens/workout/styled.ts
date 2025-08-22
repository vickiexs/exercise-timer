import styled from "styled-components/native";

import { View } from "react-native";

export const Container = styled(View)(({ theme }) => ({
  height: "100%",
  backgroundColor: theme.palette.background,
  padding: `${theme.spacing(15)} ${theme.spacing(12)}`,
}));
