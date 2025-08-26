import styled from "styled-components/native";

import { View } from "react-native";

export const Container = styled(View)(({ theme }) => ({
  flex: 1,
  justifyContent: "space-between",
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(15),
}));

export const FormContainer = styled(View)(({ theme }) => ({
  gap: theme.spacing(5),
}));

export const ButtonContainer = styled(View)(({ theme }) => ({
  gap: theme.spacing(4),
  marginTop: theme.spacing(10),
}));
