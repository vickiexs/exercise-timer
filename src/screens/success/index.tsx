import React from "react";
import { View } from "react-native";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

import useCustomNavigateOnBack from "../../../lib/hooks/useCustomNavigateOnBack";
import { SCREENS } from "../../../lib/constants";

import Layout from "../../components/layout";
import Typography from "../../components/typography";
import Button from "../../components/button";

export default function SuccessScreen() {
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
          handleOnPress={() => navigation.navigate("SimpleTimer")}
          style={{ width: "100%" }}
        />
        <Button
          label="Home"
          handleOnPress={() => navigation.navigate("Home")}
          style={{ width: "100%" }}
        />
      </View>
    </Layout>
  );
}
