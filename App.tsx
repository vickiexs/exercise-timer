import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import theme from "./theme";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";

import Workout from "./src/screens/workout";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins: Poppins_400Regular,
    "Poppins-Medium": Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      <Workout />
    </ThemeProvider>
  );
}
