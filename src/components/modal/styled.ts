import styled from "styled-components/native";
import { View, Text, TouchableOpacity } from "react-native";

export const Background = styled(View)(() => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  height: "100%",
}));

export const ModalContent = styled(View)(() => ({
  width: 300,
  padding: 20,
  backgroundColor: "white",
  borderRadius: 10,
}));

export const CloseButton = styled(TouchableOpacity)(() => ({
  alignSelf: "flex-end",
}));
