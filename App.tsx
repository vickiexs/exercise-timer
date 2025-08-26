import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import styled from "styled-components/native";
import theme from "./theme";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/home";
import Workout from "./src/screens/workout";
import SimpleTimer from "./src/screens/simple-timer";
import SuccessScreen from "./src/screens/success";

import { SCREENS } from "./lib/constants";

const Stack = createNativeStackNavigator();

const Root = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.background,
}));

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
      <Root>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
            <Stack.Screen name={SCREENS.SIMPLE_TIMER} component={SimpleTimer} />
            <Stack.Screen name={SCREENS.WORKOUT} component={Workout} />
            <Stack.Screen name={SCREENS.SUCCESS} component={SuccessScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </ThemeProvider>
  );
}
