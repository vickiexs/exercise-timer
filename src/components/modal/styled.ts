import styled from "styled-components/native";
import { View } from "react-native";

export const Background = styled(View)(({ theme }) => ({
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  height: "100%",
}));

export const ModalContent = styled(View)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "100%",
  padding: theme.spacing(6),
  backgroundColor: theme.palette.white,
}));
