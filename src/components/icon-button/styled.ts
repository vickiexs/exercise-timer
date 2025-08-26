import styled from "styled-components/native";

import { TouchableOpacity } from "react-native";

export const IconButton = styled(TouchableOpacity)(({ theme, disabled }) => ({
  padding: theme.spacing(3),
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.borderRadius.large,
  opacity: disabled ? 0.5 : 1,
}));
