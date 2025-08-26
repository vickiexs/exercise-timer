import React from "react";
import { View } from "react-native";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import useCustomNavigateOnBack from "@lib/hooks/useCustomNavigateOnBack";
import { SCREENS } from "@lib/constants";

import Layout from "@components/layout";
import Typography from "@components/typography";
import Button from "@components/button";

import { RootStackParamList } from "App";

export default function SuccessScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, SCREENS.SUCCESS>) {
  const { configType } = route.params;
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  useCustomNavigateOnBack(SCREENS.HOME);

  return (
    <Layout>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
        }}
      >
        <Typography variant="heading">Workout complete</Typography>
        <Button
          variant="secondary"
          label="Return to config screen"
          handleOnPress={() =>
            navigation.navigate(SCREENS.EXERCISE_TIMER, {
              configType: configType,
            })
          }
          style={{ width: "100%" }}
        />
        <Button
          label="Home"
          handleOnPress={() => navigation.navigate(SCREENS.HOME)}
          style={{ width: "100%" }}
        />
      </View>
    </Layout>
  );
}
