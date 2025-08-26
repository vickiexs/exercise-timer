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
import ExerciseTimer from "./src/screens/exercise-timer";
import SuccessScreen from "./src/screens/exercise-timer/success";

import { SCREENS, CONFIG_TYPE } from "./lib/constants";

export type RootStackParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.EXERCISE_TIMER]: {
    configType: CONFIG_TYPE;
  };
  [SCREENS.SUCCESS]: {
    configType: CONFIG_TYPE;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
            <Stack.Screen
              name={SCREENS.EXERCISE_TIMER}
              component={ExerciseTimer}
            />
            <Stack.Screen name={SCREENS.SUCCESS} component={SuccessScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </ThemeProvider>
  );
}
