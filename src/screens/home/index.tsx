import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import { View } from "react-native";

import { SCREENS, CONFIG_TYPE } from "@lib/constants";

import Layout from "@components/layout";
import Button from "@components/button";

export default function HomeScreen() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <Layout>
      <View style={{ flex: 1, justifyContent: "center", gap: 40 }}>
        <Button
          label="Simple exercise timer"
          handleOnPress={() =>
            navigation.navigate(SCREENS.EXERCISE_TIMER, {
              configType: CONFIG_TYPE.SIMPLE,
            })
          }
        />
        <Button
          label="Workout plan timer"
          handleOnPress={() =>
            navigation.navigate(SCREENS.EXERCISE_TIMER, {
              configType: CONFIG_TYPE.WORKOUT_PLAN,
            })
          }
        />
      </View>
    </Layout>
  );
}
